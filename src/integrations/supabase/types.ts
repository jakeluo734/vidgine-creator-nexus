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
      business_users: {
        Row: {
          company_name: string
          contact_name: string
          created_at: string
          email: string
          id: string
          subscription_active: boolean | null
          subscription_expires_at: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          subscription_active?: boolean | null
          subscription_expires_at?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          subscription_active?: boolean | null
          subscription_expires_at?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      creator_views: {
        Row: {
          business_user_id: string | null
          creator_id: string
          id: string
          viewed_at: string
          viewer_type: string
        }
        Insert: {
          business_user_id?: string | null
          creator_id: string
          id?: string
          viewed_at?: string
          viewer_type: string
        }
        Update: {
          business_user_id?: string | null
          creator_id?: string
          id?: string
          viewed_at?: string
          viewer_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_views_business_user_id_fkey"
            columns: ["business_user_id"]
            isOneToOne: false
            referencedRelation: "business_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_views_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          bio: string
          cover_image_url: string | null
          created_at: string
          demo_video_url: string | null
          featured: boolean | null
          id: string
          location: string | null
          name: string
          portfolio_url: string | null
          profile_image_url: string | null
          rate_range_max: number | null
          rate_range_min: number | null
          slug: string
          specialties: Database["public"]["Enums"]["creator_specialty"][]
          title: string
          tools_used: string[] | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          bio: string
          cover_image_url?: string | null
          created_at?: string
          demo_video_url?: string | null
          featured?: boolean | null
          id?: string
          location?: string | null
          name: string
          portfolio_url?: string | null
          profile_image_url?: string | null
          rate_range_max?: number | null
          rate_range_min?: number | null
          slug: string
          specialties?: Database["public"]["Enums"]["creator_specialty"][]
          title: string
          tools_used?: string[] | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          bio?: string
          cover_image_url?: string | null
          created_at?: string
          demo_video_url?: string | null
          featured?: boolean | null
          id?: string
          location?: string | null
          name?: string
          portfolio_url?: string | null
          profile_image_url?: string | null
          rate_range_max?: number | null
          rate_range_min?: number | null
          slug?: string
          specialties?: Database["public"]["Enums"]["creator_specialty"][]
          title?: string
          tools_used?: string[] | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          author: string
          content: string
          created_at: string
          excerpt: string
          featured: boolean | null
          featured_image_url: string | null
          id: string
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          excerpt: string
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      creator_specialty:
        | "explainer_videos"
        | "product_demos"
        | "social_media"
        | "corporate_training"
        | "marketing_campaigns"
        | "educational_content"
        | "testimonials"
        | "animations"
      subscription_tier: "free" | "basic" | "premium"
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
    Enums: {
      creator_specialty: [
        "explainer_videos",
        "product_demos",
        "social_media",
        "corporate_training",
        "marketing_campaigns",
        "educational_content",
        "testimonials",
        "animations",
      ],
      subscription_tier: ["free", "basic", "premium"],
    },
  },
} as const
