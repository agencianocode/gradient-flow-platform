
import { useState } from "react"
import { Image, Hash, Settings, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export function CreatePostCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [content, setContent] = useState("")

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg">
      <div className="flex gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          <div 
            className={`relative min-h-[56px] p-4 bg-muted/50 rounded-xl border border-border/30 cursor-text transition-all duration-300 ${
              isExpanded ? 'bg-background shadow-inner' : 'hover:bg-muted/70'
            }`}
            onClick={() => setIsExpanded(true)}
          >
            {!isExpanded ? (
              <div className="text-muted-foreground">
                ¿Qué quieres compartir con la comunidad?
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe algo increíble... Usa / para comandos, @ para menciones"
                className="w-full min-h-[100px] bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
            )}
          </div>
          
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
                  onClick={() => {
                    setIsExpanded(false)
                    setContent("")
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  disabled={!content.trim()}
                >
                  Publicar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
