import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { ConfigService } from '@nestjs/config';
import { SupabaseController } from './supabase.controller';

@Module({
  providers: [SupabaseService, ConfigService],
  controllers: [SupabaseController],
})
export class SupabaseModule {}
