import { MessageEventCollector, On, Once } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import { Message } from 'discord.js';

@MessageEventCollector({ time: 15000 })
export class DiscordBotCollector {
  private readonly logger = new Logger(DiscordBotCollector.name);

  @On('collect')
  onCollect({ author, content }: Message): void {
    this.logger.log(`User "${author.username}" answered ${content}`);
  }

  @Once('end')
  onEnd(): void {
    this.logger.log('Message is over!');
  }
}
