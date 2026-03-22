// Generated TypeScript types for Supabase database
// This file should be regenerated after running migrations

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          phone_number: string | null
          mobile_number: string | null
          email_address: string | null
          company_name: string | null
          job_title: string | null
          occupation: string | null
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          phone_number?: string | null
          mobile_number?: string | null
          email_address?: string | null
          company_name?: string | null
          job_title?: string | null
          occupation?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          phone_number?: string | null
          mobile_number?: string | null
          email_address?: string | null
          company_name?: string | null
          job_title?: string | null
          occupation?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

// Contact type for application use
export type Contact = Database['public']['Tables']['contacts']['Row']
export type ContactInsert = Database['public']['Tables']['contacts']['Insert']
export type ContactUpdate = Database['public']['Tables']['contacts']['Update']