import { Injectable } from '@nestjs/common';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';

@Injectable()
export class DiscordBotService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}
  async sendMessage(toUserId: string, message: string) {
    const user = await this.client.users.fetch(toUserId);
    await user.send(message);
  }
}
