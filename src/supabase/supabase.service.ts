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

  async createProfile({
    username,
    line_id,
  }: Database['public']['Tables']['profiles']['Insert']) {
    const uuid = uuidv4();
    const { error } = await this.supabase
      .from('profiles')
      .insert({ id: uuid, username, line_id });

    if (error) {
      throw error;
    }
    return true;
  }

  async updateProfile({
    id,
    username,
    line_id,
  }: Database['public']['Tables']['profiles']['Update']) {
    const { error } = await this.supabase
      .from('profiles')
      .update({ username, line_id })
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
