
import { useState } from "react"
import { Image, Hash, Settings, Smile, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCommunity } from "@/hooks/useCommunity"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

export function CreatePostCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [postType, setPostType] = useState<'discussion' | 'question' | 'announcement'>('discussion')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { createPost } = useCommunity()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear una publicación",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "El contenido no puede estar vacío",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    const result = await createPost({
      title: title.trim() || "Sin título",
      content: content.trim(),
      post_type: postType
    })

    if (result.success) {
      setTitle("")
      setContent("")
      setPostType('discussion')
      setIsExpanded(false)
    }
    
    setIsSubmitting(false)
  }

  const handleCancel = () => {
    setIsExpanded(false)
    setTitle("")
    setContent("")
    setPostType('discussion')
  }

  if (!user) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg">
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Inicia sesión para participar en la comunidad
          </p>
          <Button variant="outline" size="sm">
            Iniciar Sesión
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg">
      <div className="flex gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback>
            {user.user_metadata?.full_name?.slice(0, 2).toUpperCase() || 'TU'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          {!isExpanded ? (
            <div 
              className="min-h-[56px] p-4 bg-muted/50 rounded-xl border border-border/30 cursor-text transition-all duration-300 hover:bg-muted/70 flex items-center"
              onClick={() => setIsExpanded(true)}
            >
              <div className="text-muted-foreground">
                ¿Qué quieres compartir con la comunidad?
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Select value={postType} onValueChange={(value: any) => setPostType(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo de publicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discussion">💬 Discusión</SelectItem>
                  <SelectItem value="question">❓ Pregunta</SelectItem>
                  <SelectItem value="announcement">📢 Anuncio</SelectItem>
                </SelectContent>
              </Select>

              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la publicación (opcional)"
                className="text-lg font-semibold"
              />
              
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe algo increíble... Comparte tus ideas, haz preguntas o ayuda a otros"
                  className="w-full min-h-[120px] p-4 bg-background rounded-xl border border-border/30 resize-none outline-none text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
            </div>
          )}
          
          {isExpanded && (
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <Image className="w-4 h-4" />
                  Imagen
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <Hash className="w-4 h-4" />
                  Tag
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <Smile className="w-4 h-4" />
                  Emoji
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <Settings className="w-4 h-4" />
                  Opciones
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
                  disabled={!content.trim() || isSubmitting}
                  onClick={handleSubmit}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Publicando...' : 'Publicar'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
