
import { useState, useEffect } from "react"
import { Send, Heart, Reply } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { CommunityComment } from "@/types/community"
import { useCommunity } from "@/hooks/useCommunity"
import { useAuth } from "@/hooks/useAuth"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommunityComment[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { fetchComments, createComment } = useCommunity()
  const { user } = useAuth()

  const loadComments = async () => {
    setLoading(true)
    const commentsData = await fetchComments(postId)
    setComments(commentsData)
    setLoading(false)
  }

  useEffect(() => {
    loadComments()
  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    const result = await createComment(postId, newComment, parentId)
    if (result.success) {
      setNewComment("")
      setReplyingTo(null)
      loadComments() // Refresh comments
    }
  }

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: es 
      })
    } catch {
      return "hace un momento"
    }
  }

  // Organize comments by parent/child relationship
  const organizeComments = (comments: CommunityComment[]) => {
    const parentComments = comments.filter(comment => !comment.parent_id)
    const childComments = comments.filter(comment => comment.parent_id)
    
    return parentComments.map(parent => ({
      ...parent,
      replies: childComments.filter(child => child.parent_id === parent.id)
    }))
  }

  const organizedComments = organizeComments(comments)

  if (loading) {
    return (
      <div className="space-y-4 pt-4 border-t border-border/30 animate-fade-in">
        <div className="text-sm text-muted-foreground">Cargando comentarios...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border/30 animate-fade-in">
      {/* Comments List */}
      <div className="space-y-4">
        {organizedComments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            {/* Main Comment */}
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={comment.author?.avatar_url || undefined} />
                <AvatarFallback>
                  {comment.author?.full_name?.slice(0, 2).toUpperCase() || 'AN'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {comment.author?.full_name || 'Usuario Anónimo'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="w-3 h-3" />
                    {comment.likes_count || 0}
                  </button>
                  <button 
                    className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="w-3 h-3" />
                    Responder
                  </button>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-8 space-y-3">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-border/50"></div>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="w-7 h-7 flex-shrink-0">
                        <AvatarImage src={reply.author?.avatar_url || undefined} />
                        <AvatarFallback>
                          {reply.author?.full_name?.slice(0, 2).toUpperCase() || 'AN'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-xs">
                              {reply.author?.full_name || 'Usuario Anónimo'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(reply.created_at)}
                            </span>
                          </div>
                          <p className="text-xs text-foreground whitespace-pre-wrap">
                            {reply.content}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                            <Heart className="w-3 h-3" />
                            {reply.likes_count || 0}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reply Input */}
            {replyingTo === comment.id && user && (
              <div className="ml-8 animate-fade-in">
                <form onSubmit={(e) => handleSubmitComment(e, comment.id)} className="flex gap-2">
                  <Avatar className="w-7 h-7 flex-shrink-0">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      {user.user_metadata?.full_name?.slice(0, 2).toUpperCase() || 'TU'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escribe una respuesta..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm" disabled={!newComment.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Comment Input */}
      {user ? (
        <form onSubmit={(e) => handleSubmitComment(e)} className="flex gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>
              {user.user_metadata?.full_name?.slice(0, 2).toUpperCase() || 'TU'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1"
            />
            <Button type="submit" size="sm" disabled={!newComment.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          <p>Inicia sesión para comentar</p>
        </div>
      )}
    </div>
  )
}
