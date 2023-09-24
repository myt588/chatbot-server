import { Module } from '@nestjs/common';
import { LinebotController } from './linebot.controller';
import { LinebotService } from './linebot.service';
import { ConfigService } from './config/config.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [LinebotController],
  providers: [LinebotService, ConfigService],
})
export class LinebotModule {}
