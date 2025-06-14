
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

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
}

export function useCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles!author_id(full_name, avatar_url),
          category:categories(name, color)
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error: any) {
      console.error('Error fetching posts:', error)
      toast({
        title: "Error al cargar publicaciones",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData: {
    title: string
    content: string
    post_type: 'discussion' | 'question' | 'announcement'
    category_id?: string
    author_id: string
  }) => {
    try {
      const { error } = await supabase
        .from('community_posts')
        .insert(postData)

      if (error) throw error

      toast({
        title: "¡Publicación creada!",
        description: "Tu publicación se ha creado correctamente.",
      })

      fetchPosts() // Refresh posts
      return { success: true }
    } catch (error: any) {
      toast({
        title: "Error al crear publicación",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const likePost = async (postId: string, userId: string) => {
    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single()

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId)

        if (error) throw error
      } else {
        // Like
        const { error } = await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: userId,
          })

        if (error) throw error
      }

      fetchPosts() // Refresh posts
      return { success: true }
    } catch (error: any) {
      console.error('Error toggling like:', error)
      return { success: false, error: error.message }
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    loading,
    fetchPosts,
    createPost,
    likePost,
  }
}
