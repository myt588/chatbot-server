import { DiscordModule } from '@discord-nestjs/core';
import { Module, forwardRef } from '@nestjs/common';

import { DiscordBotGateway } from './discordbot.gateway';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { LinebotModule } from 'src/linebot/linebot.module';
import { DiscordBotService } from './discordbot.service';

@Module({
  imports: [
    DiscordModule.forFeature(),
    SupabaseModule,
    forwardRef(() => LinebotModule),
  ],
  providers: [DiscordBotService, DiscordBotGateway],
  exports: [DiscordBotService],
})
export class DiscordBotModule {}
