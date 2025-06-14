
import { supabase } from '@/integrations/supabase/client'
import { CommunityPost, CreatePostData } from '@/types/community'

export const fetchPosts = async (userId?: string): Promise<CommunityPost[]> => {
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
  if (userId) {
    const postIds = postsData?.map(post => post.id) || []
    if (postIds.length > 0) {
      const { data: likesData } = await supabase
        .from('post_likes')
        .select('post_id')
        .eq('user_id', userId)
        .in('post_id', postIds)

      const likedPostIds = new Set(likesData?.map(like => like.post_id) || [])
      postsWithLikes = postsData?.map(post => ({
        ...post,
        user_has_liked: likedPostIds.has(post.id)
      })) || []
    }
  }

  return postsWithLikes
}

export const createPost = async (postData: CreatePostData, userId: string) => {
  const { error } = await supabase
    .from('community_posts')
    .insert({
      ...postData,
      author_id: userId
    })

  if (error) throw error
  return { success: true }
}

export const togglePostLike = async (postId: string, userId: string) => {
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
        user_id: userId,
      })

    if (error) throw error

    // Update likes count
    const { error: updateError } = await supabase.rpc('increment_post_likes', {
      post_id: postId
    })

    if (updateError) throw updateError
  }

  return { success: true }
}
