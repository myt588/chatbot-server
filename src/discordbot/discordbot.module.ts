import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';

import { DiscordBotGateway } from './discordbot.gateway';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [DiscordModule.forFeature(), SupabaseModule],
  providers: [DiscordBotGateway],
})
export class BotModule {}
