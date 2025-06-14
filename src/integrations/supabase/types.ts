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
      alert_rules: {
        Row: {
          check_interval: number
          condition: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          last_checked: string | null
          last_triggered: string | null
          metric_type: string
          name: string
          notification_type: string
          threshold_value: number
          updated_at: string
          user_id: string
        }
        Insert: {
          check_interval?: number
          condition: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          last_checked?: string | null
          last_triggered?: string | null
          metric_type: string
          name: string
          notification_type?: string
          threshold_value: number
          updated_at?: string
          user_id: string
        }
        Update: {
          check_interval?: number
          condition?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          last_checked?: string | null
          last_triggered?: string | null
          metric_type?: string
          name?: string
          notification_type?: string
          threshold_value?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      alert_triggers: {
        Row: {
          alert_rule_id: string
          created_at: string
          id: string
          metric_value: number
          resolved_at: string | null
          status: string
          triggered_at: string
        }
        Insert: {
          alert_rule_id: string
          created_at?: string
          id?: string
          metric_value: number
          resolved_at?: string | null
          status?: string
          triggered_at?: string
        }
        Update: {
          alert_rule_id?: string
          created_at?: string
          id?: string
          metric_value?: number
          resolved_at?: string | null
          status?: string
          triggered_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_triggers_alert_rule_id_fkey"
            columns: ["alert_rule_id"]
            isOneToOne: false
            referencedRelation: "alert_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          country: string | null
          created_at: string
          event_data: Json | null
          event_name: string
          event_type: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          event_data?: Json | null
          event_name: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          event_data?: Json | null
          event_name?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_metrics: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          metric_date: string
          metric_name: string
          metric_type: string
          metric_value: number
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_date: string
          metric_name: string
          metric_type: string
          metric_value: number
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_date?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_featured: boolean | null
          likes_count: number | null
          published_at: string | null
          read_time: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          author_name: string
          category?: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          published_at?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          published_at?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      budget_templates: {
        Row: {
          base_cost: number
          category: string
          cost_per_feature: number | null
          cost_per_user: number | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          base_cost: number
          category: string
          cost_per_feature?: number | null
          cost_per_user?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          base_cost?: number
          category?: string
          cost_per_feature?: number | null
          cost_per_user?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge_description: string
          company_logo: string | null
          company_name: string
          created_at: string
          featured_image: string | null
          id: string
          industry: string
          is_featured: boolean | null
          metrics: Json | null
          results_description: string
          slug: string
          solution_description: string
          testimonial: string | null
          testimonial_author: string | null
          testimonial_position: string | null
          title: string
          tools_used: Json
          updated_at: string
          views_count: number | null
        }
        Insert: {
          challenge_description: string
          company_logo?: string | null
          company_name: string
          created_at?: string
          featured_image?: string | null
          id?: string
          industry: string
          is_featured?: boolean | null
          metrics?: Json | null
          results_description: string
          slug: string
          solution_description: string
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          title: string
          tools_used?: Json
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          challenge_description?: string
          company_logo?: string | null
          company_name?: string
          created_at?: string
          featured_image?: string | null
          id?: string
          industry?: string
          is_featured?: boolean | null
          metrics?: Json | null
          results_description?: string
          slug?: string
          solution_description?: string
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          title?: string
          tools_used?: Json
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      generated_budgets: {
        Row: {
          budget_items: Json
          created_at: string
          id: string
          monthly_cost: number
          project_details: Json | null
          project_name: string
          total_cost: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget_items: Json
          created_at?: string
          id?: string
          monthly_cost: number
          project_details?: Json | null
          project_name: string
          total_cost: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget_items?: Json
          created_at?: string
          id?: string
          monthly_cost?: number
          project_details?: Json | null
          project_name?: string
          total_cost?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      guide_progress: {
        Row: {
          completed_at: string | null
          completed_sections: Json | null
          guide_id: string
          id: string
          last_accessed: string | null
          progress_percentage: number | null
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_sections?: Json | null
          guide_id: string
          id?: string
          last_accessed?: string | null
          progress_percentage?: number | null
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_sections?: Json | null
          guide_id?: string
          id?: string
          last_accessed?: string | null
          progress_percentage?: number | null
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_progress_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          author_id: string | null
          author_name: string
          category: string
          completion_count: number | null
          content: string
          created_at: string
          description: string | null
          difficulty_level: string
          estimated_time: number | null
          featured_image: string | null
          id: string
          is_featured: boolean | null
          is_premium: boolean | null
          learning_objectives: string[] | null
          prerequisites: string[] | null
          published_at: string | null
          rating: number | null
          reviews_count: number | null
          slug: string
          title: string
          tools_covered: string[] | null
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          author_name: string
          category: string
          completion_count?: number | null
          content: string
          created_at?: string
          description?: string | null
          difficulty_level?: string
          estimated_time?: number | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          learning_objectives?: string[] | null
          prerequisites?: string[] | null
          published_at?: string | null
          rating?: number | null
          reviews_count?: number | null
          slug: string
          title: string
          tools_covered?: string[] | null
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          author_name?: string
          category?: string
          completion_count?: number | null
          content?: string
          created_at?: string
          description?: string | null
          difficulty_level?: string
          estimated_time?: number | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          learning_objectives?: string[] | null
          prerequisites?: string[] | null
          published_at?: string | null
          rating?: number | null
          reviews_count?: number | null
          slug?: string
          title?: string
          tools_covered?: string[] | null
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      notification_history: {
        Row: {
          channel: string
          content: string
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          metadata: Json | null
          notification_type: string
          sent_at: string | null
          status: string
          title: string
          user_id: string | null
        }
        Insert: {
          channel: string
          content: string
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          notification_type: string
          sent_at?: string | null
          status?: string
          title: string
          user_id?: string | null
        }
        Update: {
          channel?: string
          content?: string
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          notification_type?: string
          sent_at?: string | null
          status?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          alert_notifications: boolean | null
          created_at: string
          daily_digest: boolean | null
          email_new_tools: boolean | null
          email_reviews: boolean | null
          email_roadmap_updates: boolean | null
          email_weekly_digest: boolean | null
          id: string
          marketing_emails: boolean | null
          push_notifications: boolean | null
          push_subscription: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_notifications?: boolean | null
          created_at?: string
          daily_digest?: boolean | null
          email_new_tools?: boolean | null
          email_reviews?: boolean | null
          email_roadmap_updates?: boolean | null
          email_weekly_digest?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          push_notifications?: boolean | null
          push_subscription?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_notifications?: boolean | null
          created_at?: string
          daily_digest?: boolean | null
          email_new_tools?: boolean | null
          email_reviews?: boolean | null
          email_roadmap_updates?: boolean | null
          email_weekly_digest?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          push_notifications?: boolean | null
          push_subscription?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          location: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          is_active: boolean
          keys: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          is_active?: boolean
          keys: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          is_active?: boolean
          keys?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
          uses_count: number | null
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
          uses_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
          uses_count?: number | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referral_code: string
          referred_id: string | null
          referrer_id: string | null
          reward_amount: number | null
          reward_claimed: boolean | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code: string
          referred_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          reward_claimed?: boolean | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          referral_code?: string
          referred_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          reward_claimed?: boolean | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      review_reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          reason: string
          reporter_id: string
          review_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason: string
          reporter_id: string
          review_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          review_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_reports_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "tool_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_votes: {
        Row: {
          created_at: string
          id: string
          is_helpful: boolean
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_helpful: boolean
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_helpful?: boolean
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "tool_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_templates: {
        Row: {
          author_id: string | null
          author_name: string | null
          author_type: string | null
          category: string
          created_at: string | null
          demo_url: string | null
          description: string | null
          difficulty_level: string | null
          downloads_count: number | null
          estimated_timeline: string | null
          id: string
          implementation_time: string | null
          industry: string
          is_featured: boolean | null
          is_premium: boolean | null
          last_updated: string | null
          preview_image: string | null
          preview_images: string[] | null
          price: number | null
          rating: number | null
          reviews_count: number | null
          roi_metrics: Json | null
          success_stories: string[] | null
          support_level: string | null
          tags: string[] | null
          template_data: Json
          title: string
          tools_included: Json
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string | null
          category: string
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          difficulty_level?: string | null
          downloads_count?: number | null
          estimated_timeline?: string | null
          id?: string
          implementation_time?: string | null
          industry: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          last_updated?: string | null
          preview_image?: string | null
          preview_images?: string[] | null
          price?: number | null
          rating?: number | null
          reviews_count?: number | null
          roi_metrics?: Json | null
          success_stories?: string[] | null
          support_level?: string | null
          tags?: string[] | null
          template_data: Json
          title: string
          tools_included: Json
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string | null
          category?: string
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          difficulty_level?: string | null
          downloads_count?: number | null
          estimated_timeline?: string | null
          id?: string
          implementation_time?: string | null
          industry?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          last_updated?: string | null
          preview_image?: string | null
          preview_images?: string[] | null
          price?: number | null
          rating?: number | null
          reviews_count?: number | null
          roi_metrics?: Json | null
          success_stories?: string[] | null
          support_level?: string | null
          tags?: string[] | null
          template_data?: Json
          title?: string
          tools_included?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      roadmaps: {
        Row: {
          budget_range: string | null
          created_at: string | null
          custom_name: string | null
          description: string | null
          id: string
          is_favorite: boolean | null
          project_type: string | null
          questionnaire_answers: Json | null
          roadmap_data: Json
          selected_tools: Json | null
          skill_level: string | null
          status: string | null
          timeline: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget_range?: string | null
          created_at?: string | null
          custom_name?: string | null
          description?: string | null
          id?: string
          is_favorite?: boolean | null
          project_type?: string | null
          questionnaire_answers?: Json | null
          roadmap_data: Json
          selected_tools?: Json | null
          skill_level?: string | null
          status?: string | null
          timeline?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget_range?: string | null
          created_at?: string | null
          custom_name?: string | null
          description?: string | null
          id?: string
          is_favorite?: boolean | null
          project_type?: string | null
          questionnaire_answers?: Json | null
          roadmap_data?: Json
          selected_tools?: Json | null
          skill_level?: string | null
          status?: string | null
          timeline?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      template_purchases: {
        Row: {
          id: string
          purchase_price: number
          purchased_at: string | null
          stripe_payment_intent_id: string | null
          template_id: string
          user_id: string
        }
        Insert: {
          id?: string
          purchase_price: number
          purchased_at?: string | null
          stripe_payment_intent_id?: string | null
          template_id: string
          user_id: string
        }
        Update: {
          id?: string
          purchase_price?: number
          purchased_at?: string | null
          stripe_payment_intent_id?: string | null
          template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_purchases_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "roadmap_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_reviews: {
        Row: {
          created_at: string | null
          helpful_count: number | null
          id: string
          is_verified: boolean | null
          rating: number
          review_content: string | null
          review_title: string | null
          template_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating: number
          review_content?: string | null
          review_title?: string | null
          template_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating?: number
          review_content?: string | null
          review_title?: string | null
          template_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_reviews_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "roadmap_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_reviews: {
        Row: {
          created_at: string
          helpful_count: number | null
          id: string
          is_verified: boolean | null
          rating: number
          review_content: string | null
          review_title: string | null
          tool_id: string
          tool_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating: number
          review_content?: string | null
          review_title?: string | null
          tool_id: string
          tool_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating?: number
          review_content?: string | null
          review_title?: string | null
          tool_id?: string
          tool_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_description: string | null
          activity_title: string
          activity_type: string
          created_at: string
          id: string
          metadata: Json | null
          related_id: string | null
          user_id: string
        }
        Insert: {
          activity_description?: string | null
          activity_title: string
          activity_type: string
          created_at?: string
          id?: string
          metadata?: Json | null
          related_id?: string | null
          user_id: string
        }
        Update: {
          activity_description?: string | null
          activity_title?: string
          activity_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          related_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_favorite_tools: {
        Row: {
          created_at: string
          id: string
          tool_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tool_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tool_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          completed_roadmaps: number | null
          created_at: string
          id: string
          last_activity: string | null
          total_roadmaps: number | null
          total_tools_explored: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_roadmaps?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          total_roadmaps?: number | null
          total_tools_explored?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_roadmaps?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          total_roadmaps?: number | null
          total_tools_explored?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: { _user_id: string; _role: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
