
import { useState } from "react"
import { Share2, Copy, Facebook, Twitter, Linkedin, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface ShareModalProps {
  url?: string
  title?: string
  className?: string
}

export function ShareModal({ 
  url = window.location.href, 
  title = "Compartir contenido",
  className = ""
}: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace se ha copiado al portapapeles.",
      })
    } catch (err) {
      console.error('Error copying to clipboard:', err)
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace.",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`transition-all duration-300 hover:scale-105 ${className}`}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Compartir contenido
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Social Share Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                onClick={() => window.open(option.url, '_blank', 'noopener,noreferrer')}
                className={`${option.color} text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <option.icon className="h-5 w-5 mr-2" />
                {option.name}
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Copiar enlace</label>
            <div className="flex gap-2">
              <Input
                value={url}
                readOnly
                className="bg-muted"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
