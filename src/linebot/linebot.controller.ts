import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService as NestConfigService } from './config/config.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { assembleMessage, parseMessage } from 'src/utils/message.parser';
import { DiscordBotService } from 'src/discordbot/discordbot.service';

@Controller('linebot')
export class LinebotController {
  constructor(
    private configService: NestConfigService,
    private supabaseService: SupabaseService,
    private discordBotService: DiscordBotService,
  ) {}

  @Post()
  async handler(@Body() req: WebhookRequestBody) {
    const events: WebhookEvent[] = req.events;
    events.map(async (event) => {
      try {
        if (event.type === 'message') {
          // check if it is an message to pass to another platform

          let fromProfile;
          // check if source type is user
          if (event.source.type === 'user') {
            // check if current user is already in db
            const fromProfiles = await this.supabaseService.getProfileByLineId(
              event.source.userId,
            );
            // insert user to db
            if (fromProfiles.length === 0) {
              const lineUser = await this.configService
                .createLinebotClient()
                .getProfile(event.source.userId);
              fromProfile = await this.supabaseService.createProfile({
                line_id: lineUser.userId,
                username: lineUser.displayName,
              });
            } else {
              fromProfile = fromProfiles[0];
            }
          }
          if (event.message.type === 'text') {
            // save the message
            await this.supabaseService.createMessage({
              content: event.message.text,
              profile_id: fromProfile.id,
            });
            // parse the message
            const parsedMessage = parseMessage(event.message.text);
            // find the correct user
            const toProfiles = await this.supabaseService.getProfileByUsername(
              parsedMessage.name,
            );
            if (toProfiles.length > 0) {
              const newMessage = assembleMessage(
                fromProfile.username,
                'Line',
                parsedMessage.message,
              );
              // send message to user
              await this.discordBotService.sendMessage(
                toProfiles[0].discord_id,
                newMessage,
              );
            }
          }

          // send the message with correct api
          return this.configService
            .createLinebotClient()
            .replyMessage(event.replyToken, {
              type: 'text',
              text: 'understood',
            });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}
