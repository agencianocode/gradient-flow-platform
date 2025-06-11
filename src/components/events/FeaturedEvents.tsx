
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Star } from "lucide-react"

const featuredEvents = [
  {
    id: 1,
    title: "Bubble Masterclass: Apps sin código en 24 horas",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
    price: 299,
    originalPrice: 499,
    instructor: {
      name: "Ana García",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      rating: 4.9
    },
    date: "15 Jun",
    duration: "8 horas",
    enrolled: 234,
    badge: "TRENDING",
    badgeColor: "bg-red-500"
  },
  {
    id: 2,
    title: "Webflow Avanzado: E-commerce profesional",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    price: 199,
    instructor: {
      name: "Carlos Ruiz",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: 4.8
    },
    date: "22 Jun",
    duration: "6 horas",
    enrolled: 156,
    badge: "CASI LLENO",
    badgeColor: "bg-orange-500"
  },
  {
    id: 3,
    title: "Zapier & Make: Automatización total",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop",
    price: 149,
    instructor: {
      name: "María López",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      rating: 4.9
    },
    date: "28 Jun",
    duration: "4 horas",
    enrolled: 89,
    badge: "NUEVO",
    badgeColor: "bg-green-500"
  }
]

export function FeaturedEvents() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Eventos <span className="gradient-primary bg-clip-text text-transparent">Destacados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Los eventos más populares y mejor valorados por nuestra comunidad
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden card-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image with overlay */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge */}
                <Badge className={`absolute top-4 left-4 ${event.badgeColor} text-white font-semibold px-3 py-1 animate-pulse`}>
                  {event.badge}
                </Badge>
                
                {/* Price */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    {event.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${event.originalPrice}</span>
                    )}
                    <span className="text-lg font-bold text-purple-600">${event.price}</span>
                  </div>
                </div>
                
                {/* Hover info */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-4 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.enrolled} inscritos
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {event.title}
                </h3>
                
                {/* Instructor */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={event.instructor.avatar} />
                    <AvatarFallback>{event.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{event.instructor.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{event.instructor.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Date and CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{event.date}</span>
                  <Button className="btn-primary px-6">
                    Inscribirse
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
