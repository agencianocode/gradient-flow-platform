
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Share2, Bookmark, Star, Users, Clock, Calendar } from "lucide-react"

export function EventHero({ event }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {showVideo ? (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="text-white text-center">
              <Play className="w-16 h-16 mx-auto mb-4" />
              <p>Video player would be here</p>
            </div>
          </div>
        ) : (
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Floating Video Button */}
        {!showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full 
                     flex items-center justify-center hover:scale-110 transition-all duration-300
                     border border-white/30 shadow-2xl animate-pulse"
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container max-w-screen-xl mx-auto px-4 h-full flex items-end pb-20">
        <div className="max-w-4xl text-white">
          {/* Badges */}
          <div className="flex gap-3 mb-6">
            <Badge className="bg-red-500 text-white font-semibold px-4 py-2 animate-pulse">
              TRENDING
            </Badge>
            <Badge className="bg-orange-500 text-white font-semibold px-4 py-2">
              CASI LLENO
            </Badge>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {event.title}
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl leading-relaxed">
            {event.description}
          </p>
          
          {/* Event Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>20 Jun 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{event.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{event.enrolled} inscritos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{event.instructor.rating}</span>
            </div>
          </div>
          
          {/* Instructor */}
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="w-16 h-16 border-2 border-white/30">
              <AvatarImage src={event.instructor.avatar} />
              <AvatarFallback>{event.instructor.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{event.instructor.name}</p>
              <p className="text-white/80">{event.instructor.title}</p>
              <p className="text-sm text-white/60">{event.instructor.students} estudiantes</p>
            </div>
          </div>
          
          {/* Price and CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-white/60 line-through">{event.currency}{event.originalPrice}</span>
              <span className="text-4xl font-bold text-white">{event.currency}{event.price}</span>
              <Badge className="bg-green-500 text-white">
                {Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}% OFF
              </Badge>
            </div>
            
            <div className="flex gap-4">
              <Button className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform">
                Inscribirse Ahora
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handleBookmark}
                className="text-white border-white/30 hover:bg-white/10"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handleShare}
                className="text-white border-white/30 hover:bg-white/10"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
