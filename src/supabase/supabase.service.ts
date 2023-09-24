import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
}
