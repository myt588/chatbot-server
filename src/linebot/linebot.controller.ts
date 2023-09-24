import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService as NestConfigService } from './config/config.service';

@Controller('linebot')
export class LinebotController {
  constructor(private configService: NestConfigService) {}

  @Post()
  async handler(@Body() req: WebhookRequestBody) {
    const events: WebhookEvent[] = req.events;
    events.map((event) => {
      if (event.type === 'message') {
        // check if it is an message to pass to another platform

        // check if current user is already in db

        // insert user to db

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
