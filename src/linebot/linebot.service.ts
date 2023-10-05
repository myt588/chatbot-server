import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from './config/config.service';

@Injectable()
export class LinebotService {
  constructor(private configService: NestConfigService) {}
  sendMessage(toUserId: string, message: string) {
    return this.configService.createLinebotClient().pushMessage(
      toUserId,
      {
        type: 'text',
        text: message,
      },
      true,
    );
  }
}
