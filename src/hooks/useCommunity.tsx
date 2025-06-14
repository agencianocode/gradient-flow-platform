
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { CommunityPost, CommunityComment, CreatePostData } from '@/types/community'
import { fetchPosts, createPost as createPostService, togglePostLike } from '@/services/communityPostsService'
import { fetchComments as fetchCommentsService, createComment as createCommentService } from '@/services/communityCommentsService'

export function useCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchPostsData = async () => {
    try {
      setLoading(true)
      const postsData = await fetchPosts(user?.id)
      setPosts(postsData)
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

  const createPost = async (postData: CreatePostData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear una publicación",
        variant: "destructive",
      })
      return { success: false, error: "Not authenticated" }
    }

    try {
      await createPostService(postData, user.id)
      toast({
        title: "¡Publicación creada!",
        description: "Tu publicación se ha creado correctamente.",
      })
      fetchPostsData() // Refresh posts
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
      await togglePostLike(postId, user.id)
      fetchPostsData() // Refresh posts
      return { success: true }
    } catch (error: any) {
      console.error('Error toggling like:', error)
      return { success: false, error: error.message }
    }
  }

  const fetchComments = async (postId: string): Promise<CommunityComment[]> => {
    try {
      return await fetchCommentsService(postId, user?.id)
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
      await createCommentService(postId, content, user.id, parentId)
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
    fetchPostsData()
  }, [user])

  return {
    posts,
    loading,
    fetchPosts: fetchPostsData,
    createPost,
    likePost,
    fetchComments,
    createComment,
  }
}
