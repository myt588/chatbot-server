import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinebotModule } from './linebot/linebot.module';
import { SupabaseModule } from './supabase/supabase.module';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { BotModule } from './discordbot/discordbot.module';

@Module({
  imports: [
    LinebotModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_TOKEN'),
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            // You must allow message content for your application in discord developers
            // https://support-dev.discord.com/hc/en-us/articles/4404772028055
            GatewayIntentBits.MessageContent,
          ],
        },
      }),
      inject: [ConfigService],
    }),
    SupabaseModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
