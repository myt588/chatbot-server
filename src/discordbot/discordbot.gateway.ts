import {
  On,
  Once,
  UseCollectors,
  InjectDiscordClient,
} from '@discord-nestjs/core';
import { CollectorInterceptor } from '@discord-nestjs/common';
import { Injectable, Logger, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmbedBuilder, Message, Client } from 'discord.js';

import { DiscordBotCollector } from './discordbot.collector';
import { MessageFromUserGuard } from './guards/message-from-user.guard';
import { QuizCommandGuard } from './guards/quiz-commnad.guard';

@Injectable()
export class DiscordBotGateway {
  private readonly logger = new Logger(DiscordBotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady(): void {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  @UseGuards(MessageFromUserGuard, QuizCommandGuard)
  @UseCollectors(DiscordBotCollector)
  @UseInterceptors(CollectorInterceptor)
  async onMessage(message: Message): Promise<void> {
    const quizEmbed = new EmbedBuilder()
      .setTitle('Who was first man in space?')
      .setFields([
        { name: 'A)', value: 'Neil Armstrong' },
        { name: 'B)', value: 'Yuri Gagarin' },
        { name: 'C)', value: 'Allan Shepard' },
        { name: 'D)', value: 'Kalpana Chawla' },
      ]);

    await message.reply({
      embeds: [quizEmbed],
    });
  }
}
