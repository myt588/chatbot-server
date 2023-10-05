import { Module } from '@nestjs/common';
import { LinebotController } from './linebot.controller';
import { LinebotService } from './linebot.service';
import { ConfigService } from './config/config.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { DiscordBotModule } from 'src/discordbot/discordbot.module';

@Module({
  imports: [SupabaseModule, DiscordBotModule],
  controllers: [LinebotController],
  providers: [LinebotService, ConfigService],
  exports: [LinebotService],
})
export class LinebotModule {}
