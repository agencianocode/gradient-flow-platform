
export interface CommunityPost {
  id: string
  author_id: string
  title: string
  content: string
  post_type: 'discussion' | 'question' | 'announcement'
  category_id: string | null
  is_pinned: boolean
  likes_count: number
  comments_count: number
  views_count: number
  created_at: string
  updated_at: string
  author?: {
    full_name: string
    avatar_url: string | null
  }
  category?: {
    name: string
    color: string
  }
  user_has_liked?: boolean
}

export interface CommunityComment {
  id: string
  post_id: string
  author_id: string
  content: string
  parent_id: string | null
  likes_count: number
  created_at: string
  author?: {
    full_name: string
    avatar_url: string | null
  }
  user_has_liked?: boolean
  replies?: CommunityComment[]
}

export interface CreatePostData {
  title: string
  content: string
  post_type: 'discussion' | 'question' | 'announcement'
  category_id?: string
}
