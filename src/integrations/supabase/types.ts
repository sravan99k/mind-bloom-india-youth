export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessment_responses: {
        Row: {
          categories: string[]
          completed_at: string
          id: string
          responses: Json
          results: Json | null
          user_id: string
        }
        Insert: {
          categories: string[]
          completed_at?: string
          id?: string
          responses: Json
          results?: Json | null
          user_id: string
        }
        Update: {
          categories?: string[]
          completed_at?: string
          id?: string
          responses?: Json
          results?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      buddysafe_reports: {
        Row: {
          additional_info: string | null
          created_at: string
          email: string | null
          feelings: string[] | null
          id: string
          incident: string
          is_anonymous: boolean
          location: string
          name: string | null
          people_involved: string | null
        }
        Insert: {
          additional_info?: string | null
          created_at?: string
          email?: string | null
          feelings?: string[] | null
          id?: string
          incident: string
          is_anonymous: boolean
          location: string
          name?: string | null
          people_involved?: string | null
        }
        Update: {
          additional_info?: string | null
          created_at?: string
          email?: string | null
          feelings?: string[] | null
          id?: string
          incident?: string
          is_anonymous?: boolean
          location?: string
          name?: string | null
          people_involved?: string | null
        }
        Relationships: []
      }
      counselor_requests: {
        Row: {
          created_at: string
          id: string
          message: string
          status: string
          subject: string
          urgency_level: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: string
          subject: string
          urgency_level?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: string
          subject?: string
          urgency_level?: string
          user_id?: string
        }
        Relationships: []
      }
      demographics: {
        Row: {
          branch: string | null
          city: string | null
          class: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          full_name: string | null
          gender: string | null
          id: string
          parent_name: string | null
          parent_phone: string | null
          pincode: string | null
          role: string | null
          roll_no: string | null
          school_name: string | null
          state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          branch?: string | null
          city?: string | null
          class?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          full_name?: string | null
          gender?: string | null
          id?: string
          parent_name?: string | null
          parent_phone?: string | null
          pincode?: string | null
          role?: string | null
          roll_no?: string | null
          school_name?: string | null
          state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          branch?: string | null
          city?: string | null
          class?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          full_name?: string | null
          gender?: string | null
          id?: string
          parent_name?: string | null
          parent_phone?: string | null
          pincode?: string | null
          role?: string | null
          roll_no?: string | null
          school_name?: string | null
          state?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feedback_reports: {
        Row: {
          assessment_id: string
          created_at: string | null
          id: string
          message: string
          user_id: string
        }
        Insert: {
          assessment_id: string
          created_at?: string | null
          id?: string
          message: string
          user_id: string
        }
        Update: {
          assessment_id?: string
          created_at?: string | null
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_reports_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          is_anonymous: boolean
          is_approved: boolean
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_approved?: boolean
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_approved?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string
          id: string
          is_anonymous: boolean
          is_approved: boolean
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_approved?: boolean
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_approved?: boolean
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_progress: {
        Row: {
          completed_date: string
          created_at: string
          goal_id: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed_date?: string
          created_at?: string
          goal_id: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed_date?: string
          created_at?: string
          goal_id?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_progress_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "wellness_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          id: string
          is_private: boolean
          prompt: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_private?: boolean
          prompt: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_private?: boolean
          prompt?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          created_at: string
          id: string
          mood_label: string
          mood_score: number
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood_label: string
          mood_score: number
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood_label?: string
          mood_score?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_feedback: {
        Row: {
          category: string
          created_at: string
          id: string
          message: string
          rating: number | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          message: string
          rating?: number | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          message?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_consents: {
        Row: {
          consent_granted: boolean
          consent_type: string
          granted_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          consent_granted: boolean
          consent_type: string
          granted_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          consent_granted?: boolean
          consent_type?: string
          granted_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_demographics: {
        Row: {
          city: string
          class: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          full_name: string
          gender: string | null
          id: string
          parent_name: string | null
          parent_phone: string | null
          pincode: string | null
          role: string
          rollno: string | null
          school_branch: string | null
          school_name: string | null
          state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          city: string
          class?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          full_name: string
          gender?: string | null
          id?: string
          parent_name?: string | null
          parent_phone?: string | null
          pincode?: string | null
          role: string
          rollno?: string | null
          school_branch?: string | null
          school_name?: string | null
          state: string
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string
          class?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          full_name?: string
          gender?: string | null
          id?: string
          parent_name?: string | null
          parent_phone?: string | null
          pincode?: string | null
          role?: string
          rollno?: string | null
          school_branch?: string | null
          school_name?: string | null
          state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wellness_goals: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          is_completed: boolean
          target_frequency: string
          title: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          target_frequency: string
          title: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          target_frequency?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_user_profile: {
        Args: {
          p_user_id: string
          p_full_name: string
          p_email: string
          p_role: string
          p_school_name: string
          p_school_branch: string
          p_state: string
          p_city: string
          p_pincode: string
          p_date_of_birth?: string
          p_gender?: string
          p_class?: string
          p_rollno?: string
          p_parent_name?: string
          p_parent_phone?: string
        }
        Returns: Json
      }
      get_user_demographics: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
