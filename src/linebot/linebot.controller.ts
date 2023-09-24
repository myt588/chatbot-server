import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService as NestConfigService } from './config/config.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Controller('linebot')
export class LinebotController {
  constructor(
    private configService: NestConfigService,
    private supabaseService: SupabaseService,
  ) {}

  @Post()
  async handler(@Body() req: WebhookRequestBody) {
    const events: WebhookEvent[] = req.events;
    events.map(async (event) => {
      if (event.type === 'message') {
        // check if it is an message to pass to another platform

        let profile;
        // check if source type is user
        if (event.source.type === 'user') {
          // check if current user is already in db
          const profiles = await this.supabaseService.getProfileByLineId(
            event.source.userId,
          );
          // insert user to db
          if (profiles.length === 0) {
            const lineUser = await this.configService
              .createLinebotClient()
              .getProfile(event.source.userId);
            profile = await this.supabaseService.createProfile({
              line_id: lineUser.userId,
              username: lineUser.displayName,
            });
          } else {
            profile = profiles[0];
          }
        }
        if (event.message.type === 'text') {
          // save the message
          try {
            await this.supabaseService.createMessage({
              content: event.message.text,
              profile_id: profile.id,
            });
          } catch (error) {
            console.log(error);
          }
        }
        // check the other user in other platform can be reached (followed our other bot or added other bot as friend)

        // find the correct user in db

        // send the message with correct api
        const returnMessage =
          event.message.type === 'text'
            ? event.message.text
            : 'テキストではありませんでした。';
        return this.configService
          .createLinebotClient()
          .replyMessage(event.replyToken, {
            type: 'text',
            text: returnMessage,
          });
      }
    });
  }
}
