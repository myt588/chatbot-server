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
import { SupabaseService } from 'src/supabase/supabase.service';
import { assembleMessage, parseMessage } from 'src/utils/message.parser';
import { LinebotService } from 'src/linebot/linebot.service';
import { Database } from 'database.types';

@Injectable()
export class DiscordBotGateway {
  private readonly logger = new Logger(DiscordBotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private supabaseService: SupabaseService,
    private linebotSerivce: LinebotService,
  ) {}

  @Once('ready')
  onReady(): void {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  @UseGuards(MessageFromUserGuard)
  async onMessage(message: Message): Promise<void> {
    try {
      let fromProfile: Database['public']['Tables']['profiles']['Update'];
      // check if current user is already in db
      const fromProfiles = await this.supabaseService.getProfileByDiscordId(
        message.author.id,
      );
      // insert user to db
      if (fromProfiles.length === 0) {
        fromProfile = await this.supabaseService.createProfile({
          username: message.author.displayName,
          discord_id: message.author.id,
        });
      } else {
        fromProfile = fromProfiles[0];
      }
      // save the message
      await this.supabaseService.createMessage({
        content: message.content,
        profile_id: fromProfile.id,
      });
      // parse the message
      const parsedMessage = parseMessage(message.content);
      // find the correct user
      const toProfiles = await this.supabaseService.getProfileByUsername(
        parsedMessage.name,
      );
      if (toProfiles.length > 0) {
        const newMessage = assembleMessage(
          fromProfile.username,
          'Discord',
          parsedMessage.message,
        );
        // send message to user
        await this.linebotSerivce.sendMessage(
          toProfiles[0].line_id,
          newMessage,
        );
      }
      // reply message
      await message.reply('understood');
    } catch (error) {
      console.log(error);
    }
  }

  // @On('messageCreate')
  // @UseGuards(MessageFromUserGuard, QuizCommandGuard)
  // @UseCollectors(DiscordBotCollector)
  // @UseInterceptors(CollectorInterceptor)
  // async onMessage(message: Message): Promise<void> {
  //   const quizEmbed = new EmbedBuilder()
  //     .setTitle('Who was first man in space?')
  //     .setFields([
  //       { name: 'A)', value: 'Neil Armstrong' },
  //       { name: 'B)', value: 'Yuri Gagarin' },
  //       { name: 'C)', value: 'Allan Shepard' },
  //       { name: 'D)', value: 'Kalpana Chawla' },
  //     ]);

  //   await message.reply({
  //     embeds: [quizEmbed],
  //   });
  // }
}
