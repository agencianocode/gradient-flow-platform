
import { useState } from "react"
import { Heart, MessageSquare, Share, MoreHorizontal, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ReactionPicker } from "./ReactionPicker"
import { CommentSection } from "./CommentSection"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    badge: string
    isOnline: boolean
  }
  content: string
  timestamp: string
  media?: string[]
  tags: string[]
  reactions: Record<string, number>
  comments: number
  shares: number
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showReactionPicker, setShowReactionPicker] = useState(false)

  const totalReactions = Object.values(post.reactions).reduce((sum, count) => sum + count, 0)

  return (
    <Card className="group bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-background shadow-md">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {post.author.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                <Badge variant="secondary" className="text-xs bg-gradient-primary text-white">
                  {post.author.badge}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-foreground leading-relaxed">{post.content}</p>
          
          {/* Media */}
          {post.media && (
            <div className="rounded-xl overflow-hidden">
              <img 
                src={post.media[0]} 
                alt="Post media"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Button
                key={tag}
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Reactions Summary */}
        {totalReactions > 0 && (
          <div className="flex items-center gap-2 py-2 border-b border-border/30">
            <div className="flex items-center -space-x-1">
              {Object.entries(post.reactions).slice(0, 3).map(([emoji]) => (
                <div
                  key={emoji}
                  className="w-6 h-6 bg-background rounded-full border border-border flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {totalReactions} reacciones
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 transition-colors ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                onClick={() => setIsLiked(!isLiked)}
                onMouseEnter={() => setShowReactionPicker(true)}
                onMouseLeave={() => setShowReactionPicker(false)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                Me gusta
              </Button>
              
              {showReactionPicker && (
                <ReactionPicker
                  onReaction={(emoji) => {
                    console.log('Reacted with:', emoji)
                    setShowReactionPicker(false)
                  }}
                />
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:text-blue-500"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="w-4 h-4" />
              {post.comments} comentarios
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-2 hover:text-green-500">
              <Share className="w-4 h-4" />
              {post.shares}
            </Button>
          </div>
        </div>

        {/* Comments */}
        {showComments && (
          <CommentSection postId={post.id} />
        )}
      </div>
    </Card>
  )
}
