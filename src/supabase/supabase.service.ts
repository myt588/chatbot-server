import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPA_NODE_PROJECT_URL,
      process.env.SUPA_NODE_PROJECT_API_KEY,
    );
  }

  async getAllProfiles() {
    const { data, error } = await this.supabase.from('profiles').select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  async getProfileByUsername(
    username: string,
  ): Promise<Array<Database['public']['Tables']['profiles']['Update']>> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('username', username);

    if (error) {
      throw error;
    }

    return data as Array<Database['public']['Tables']['profiles']['Update']>;
  }

  async getProfileByLineId(
    line_id: string,
  ): Promise<Array<Database['public']['Tables']['profiles']['Update']>> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('line_id', line_id);

    if (error) {
      throw error;
    }

    return data as Array<Database['public']['Tables']['profiles']['Update']>;
  }

  async getProfileByDiscordId(
    discord_id: string,
  ): Promise<Array<Database['public']['Tables']['profiles']['Update']>> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('discord_id', discord_id);

    if (error) {
      throw error;
    }

    return data as Array<Database['public']['Tables']['profiles']['Update']>;
  }

  async createProfile({
    id = uuidv4(),
    username,
    line_id,
    discord_id,
  }: Database['public']['Tables']['profiles']['Update']) {
    const { data, error } = await this.supabase
      .from('profiles')
      .insert({ id, username, line_id, discord_id });

    if (error) {
      throw error;
    }
    return data;
  }

  async updateProfile({
    id,
    username,
    line_id,
    discord_id,
  }: Database['public']['Tables']['profiles']['Update']) {
    const { error } = await this.supabase
      .from('profiles')
      .update({ username, line_id, discord_id })
      .eq('id', id);

    if (error) {
      throw error;
    }
    return true;
  }

  async getMessages() {
    const { data, error } = await this.supabase.from('messages').select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  async createMessage({
    content,
    profile_id,
  }: Database['public']['Tables']['messages']['Insert']) {
    const uuid = uuidv4();
    const { error } = await this.supabase
      .from('messages')
      .insert({ id: uuid, content, profile_id });

    if (error) {
      throw error;
    }
    return true;
  }
}
