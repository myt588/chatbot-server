import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';

import { DiscordBotGateway } from './discordbot.gateway';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { LinebotModule } from 'src/linebot/linebot.module';

@Module({
  imports: [DiscordModule.forFeature(), SupabaseModule, LinebotModule],
  providers: [DiscordBotGateway],
})
export class DiscordBotModule {}
