
import { useState } from "react"
import { Send, Heart, Reply } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface CommentSectionProps {
  postId: string
}

const mockComments = [
  {
    id: "1",
    author: {
      name: "Elena Vega",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    content: "¡Increíble trabajo! Me encanta cómo has implementado las transiciones.",
    timestamp: "hace 10 min",
    likes: 5,
    replies: []
  },
  {
    id: "2",
    author: {
      name: "Diego Morales",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },
    content: "¿Podrías compartir el tutorial? Sería genial aprender de tu experiencia.",
    timestamp: "hace 25 min",
    likes: 3,
    replies: [
      {
        id: "2-1",
        author: {
          name: "María González",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
        },
        content: "¡Por supuesto! Lo subiré este fin de semana. 😊",
        timestamp: "hace 20 min",
        likes: 2
      }
    ]
  }
]

export function CommentSection({ postId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    console.log('New comment:', newComment)
    setNewComment("")
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border/30 animate-fade-in">
      {/* Comments List */}
      <div className="space-y-4">
        {mockComments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            {/* Main Comment */}
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="w-3 h-3" />
                    {comment.likes}
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
                        <AvatarImage src={reply.author.avatar} />
                        <AvatarFallback>{reply.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-xs">{reply.author.name}</span>
                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                          </div>
                          <p className="text-xs text-foreground">{reply.content}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                            <Heart className="w-3 h-3" />
                            {reply.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="ml-8 animate-fade-in">
                <form onSubmit={handleSubmitComment} className="flex gap-2">
                  <Avatar className="w-7 h-7 flex-shrink-0">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                    <AvatarFallback>TU</AvatarFallback>
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
      <form onSubmit={handleSubmitComment} className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
          <AvatarFallback>TU</AvatarFallback>
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
    </div>
  )
}
