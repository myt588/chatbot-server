export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          profile_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          profile_id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          id: string;
          line_id: string | null;
          username: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          line_id?: string | null;
          username: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          line_id?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
