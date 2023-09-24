import { Client } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  createLinebotClient() {
    const configService = new NestConfigService();
    const tokens = {
      channelAccessToken: configService.get<string>('CHANNEL_ACCESS_TOKEN'),
      channelSecret: configService.get<string>('CHANNEL_SECRET'),
      supaNodeProjectUrl: configService.get<string>('SUPA_NODE_PROJECT_URL'),
      supaNodeProjectApiKey: configService.get<string>(
        'SUPA_NODE_PROJECT_API_KEY',
      ),
    };
    return new Client(tokens);
  }
}
