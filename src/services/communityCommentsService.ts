
import { supabase } from '@/integrations/supabase/client'
import { CommunityComment } from '@/types/community'

export const fetchComments = async (postId: string, userId?: string): Promise<CommunityComment[]> => {
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
  if (userId && commentsData && commentsData.length > 0) {
    const commentIds = commentsData.map(comment => comment.id)
    const { data: likesData } = await supabase
      .from('comment_likes')
      .select('comment_id')
      .eq('user_id', userId)
      .in('comment_id', commentIds)

    const likedCommentIds = new Set(likesData?.map(like => like.comment_id) || [])
    commentsWithLikes = commentsData.map(comment => ({
      ...comment,
      user_has_liked: likedCommentIds.has(comment.id)
    }))
  }

  return commentsWithLikes
}

export const createComment = async (postId: string, content: string, userId: string, parentId?: string) => {
  const { error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: userId,
      content,
      parent_id: parentId || null
    })

  if (error) throw error

  // Update comments count
  const { error: updateError } = await supabase.rpc('increment_post_comments', {
    post_id: postId
  })

  if (updateError) throw updateError

  return { success: true }
}
