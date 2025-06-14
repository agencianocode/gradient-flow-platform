
import { useState } from "react"
import { Heart, MessageSquare, Share, MoreHorizontal, Hash, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommentSection } from "./CommentSection"
import { CommunityPost } from "@/types/community"
import { useCommunity } from "@/hooks/useCommunity"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface PostCardProps {
  post: CommunityPost
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const { likePost } = useCommunity()

  const handleLike = async () => {
    await likePost(post.id)
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

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'question': return 'Pregunta'
      case 'announcement': return 'Anuncio'
      default: return 'Discusión'
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-500'
      case 'announcement': return 'bg-orange-500'
      default: return 'bg-green-500'
    }
  }

  return (
    <Card className="group bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-background shadow-md">
              <AvatarImage src={post.author?.avatar_url || undefined} />
              <AvatarFallback>
                {post.author?.full_name?.slice(0, 2).toUpperCase() || 'AN'}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {post.author?.full_name || 'Usuario Anónimo'}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`text-xs text-white ${getPostTypeColor(post.post_type)}`}
                >
                  {getPostTypeLabel(post.post_type)}
                </Badge>
                {post.is_pinned && (
                  <Pin className="w-4 h-4 text-orange-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatTimeAgo(post.created_at)}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {post.title && (
            <h4 className="text-lg font-semibold text-foreground leading-tight">
              {post.title}
            </h4>
          )}
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
          
          {/* Category */}
          {post.category && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                style={{ color: post.category.color }}
              >
                <Hash className="w-3 h-3 mr-1" />
                {post.category.name}
              </Button>
            </div>
          )}
        </div>

        {/* Reactions Summary */}
        {post.likes_count > 0 && (
          <div className="flex items-center gap-2 py-2 border-b border-border/30">
            <div className="flex items-center -space-x-1">
              <div className="w-6 h-6 bg-red-500 rounded-full border border-border flex items-center justify-center text-sm">
                ❤️
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {post.likes_count} {post.likes_count === 1 ? 'me gusta' : 'me gusta'}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 transition-colors ${
                post.user_has_liked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'hover:text-red-500'
              }`}
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 ${post.user_has_liked ? 'fill-current' : ''}`} />
              Me gusta
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:text-blue-500"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="w-4 h-4" />
              {post.comments_count} comentarios
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-2 hover:text-green-500">
              <Share className="w-4 h-4" />
              Compartir
            </Button>
          </div>

          {post.views_count > 0 && (
            <div className="text-xs text-muted-foreground">
              {post.views_count} visualizaciones
            </div>
          )}
        </div>

        {/* Comments */}
        {showComments && (
          <CommentSection postId={post.id} />
        )}
      </div>
    </Card>
  )
}
