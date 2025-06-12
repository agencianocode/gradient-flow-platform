
import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookmarkButtonProps {
  isBookmarked?: boolean
  onToggle?: (bookmarked: boolean) => void
  className?: string
}

export function BookmarkButton({ 
  isBookmarked = false, 
  onToggle,
  className = ""
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setBookmarked(!bookmarked)
    onToggle?.(!bookmarked)
    
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-300 ${className} ${
        bookmarked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'
      }`}
    >
      <Heart 
        className={`h-5 w-5 transition-all duration-300 ${
          bookmarked ? 'fill-current scale-110' : 'scale-100'
        } ${isAnimating ? 'animate-bounce' : ''}`} 
      />
      
      {/* Particle effect */}
      {isAnimating && bookmarked && (
        <>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full animate-ping -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
            <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
          </div>
        </>
      )}
    </Button>
  )
}
