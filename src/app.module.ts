import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinebotModule } from './linebot/linebot.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    LinebotModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
