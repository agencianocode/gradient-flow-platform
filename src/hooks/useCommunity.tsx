
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'

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
}

export function useCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchPosts = async () => {
    try {
      setLoading(true)
      
      // First get posts with author and category info
      const { data: postsData, error: postsError } = await supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles!author_id(full_name, avatar_url),
          category:categories(name, color)
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })

      if (postsError) throw postsError

      // If user is authenticated, check which posts they've liked
      let postsWithLikes = postsData || []
      if (user) {
        const postIds = postsData?.map(post => post.id) || []
        if (postIds.length > 0) {
          const { data: likesData } = await supabase
            .from('post_likes')
            .select('post_id')
            .eq('user_id', user.id)
            .in('post_id', postIds)

          const likedPostIds = new Set(likesData?.map(like => like.post_id) || [])
          postsWithLikes = postsData?.map(post => ({
            ...post,
            user_has_liked: likedPostIds.has(post.id)
          })) || []
        }
      }

      setPosts(postsWithLikes)
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
  }) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear una publicación",
        variant: "destructive",
      })
      return { success: false, error: "Not authenticated" }
    }

    try {
      const { error } = await supabase
        .from('community_posts')
        .insert({
          ...postData,
          author_id: user.id
        })

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

  const likePost = async (postId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para dar me gusta",
        variant: "destructive",
      })
      return { success: false, error: "Not authenticated" }
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)

        if (error) throw error

        // Update likes count
        const { error: updateError } = await supabase.rpc('decrement_post_likes', {
          post_id: postId
        })

        if (updateError) throw updateError
      } else {
        // Like
        const { error } = await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user.id,
          })

        if (error) throw error

        // Update likes count
        const { error: updateError } = await supabase.rpc('increment_post_likes', {
          post_id: postId
        })

        if (updateError) throw updateError
      }

      fetchPosts() // Refresh posts
      return { success: true }
    } catch (error: any) {
      console.error('Error toggling like:', error)
      return { success: false, error: error.message }
    }
  }

  const fetchComments = async (postId: string): Promise<CommunityComment[]> => {
    try {
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:profiles!author_id(full_name, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error

      // If user is authenticated, check which comments they've liked
      let commentsWithLikes = commentsData || []
      if (user && commentsData && commentsData.length > 0) {
        const commentIds = commentsData.map(comment => comment.id)
        const { data: likesData } = await supabase
          .from('comment_likes')
          .select('comment_id')
          .eq('user_id', user.id)
          .in('comment_id', commentIds)

        const likedCommentIds = new Set(likesData?.map(like => like.comment_id) || [])
        commentsWithLikes = commentsData.map(comment => ({
          ...comment,
          user_has_liked: likedCommentIds.has(comment.id)
        }))
      }

      return commentsWithLikes
    } catch (error: any) {
      console.error('Error fetching comments:', error)
      return []
    }
  }

  const createComment = async (postId: string, content: string, parentId?: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para comentar",
        variant: "destructive",
      })
      return { success: false, error: "Not authenticated" }
    }

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content,
          parent_id: parentId || null
        })

      if (error) throw error

      // Update comments count
      const { error: updateError } = await supabase.rpc('increment_post_comments', {
        post_id: postId
      })

      if (updateError) throw updateError

      toast({
        title: "¡Comentario agregado!",
        description: "Tu comentario se ha publicado correctamente.",
      })

      return { success: true }
    } catch (error: any) {
      toast({
        title: "Error al crear comentario",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [user])

  return {
    posts,
    loading,
    fetchPosts,
    createPost,
    likePost,
    fetchComments,
    createComment,
  }
}
