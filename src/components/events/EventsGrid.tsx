import { useState } from "react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Star, Calendar, Bookmark, Share2 } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Webflow Responsive: Diseños que se adaptan perfectamente",
    description: "Aprende a crear sitios web completamente responsivos usando las herramientas avanzadas de Webflow.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop",
    price: 199,
    originalPrice: 299,
    instructor: {
      name: "Laura Martín",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 4.8,
      students: 1250
    },
    date: "2024-06-20",
    time: "10:00 AM",
    duration: "6 horas",
    enrolled: 89,
    maxStudents: 120,
    level: "Intermedio",
    category: "Webflow",
    tags: ["Responsive", "CSS", "UX/UI"],
    badge: null,
    isBookmarked: false
  },
  {
    id: 2,
    title: "Bubble Database: Estructuras de datos profesionales",
    description: "Domina las bases de datos en Bubble y crea aplicaciones escalables con arquitecturas robustas.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop",
    price: 249,
    instructor: {
      name: "Diego Torres",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      rating: 4.9,
      students: 890
    },
    date: "2024-06-22",
    time: "2:00 PM",
    duration: "8 horas",
    enrolled: 156,
    maxStudents: 200,
    level: "Avanzado",
    category: "Bubble",
    tags: ["Database", "Backend", "APIs"],
    badge: "TRENDING",
    badgeColor: "bg-red-500",
    isBookmarked: true
  },
  {
    id: 3,
    title: "Zapier Workflows: Automatización empresarial",
    description: "Construye workflows complejos que conecten todas las herramientas de tu empresa.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=300&fit=crop",
    price: 149,
    instructor: {
      name: "Carmen Silva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      rating: 4.7,
      students: 650
    },
    date: "2024-06-25",
    time: "11:00 AM",
    duration: "4 horas",
    enrolled: 203,
    maxStudents: 250,
    level: "Intermedio",
    category: "Zapier",
    tags: ["Automation", "Integration", "Productivity"],
    badge: "CASI LLENO",
    badgeColor: "bg-orange-500",
    isBookmarked: false
  },
  // Add more events here...
]

export function EventsGrid() {
  const [bookmarked, setBookmarked] = useState<number[]>([2])
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'popularity'>('date')

  const toggleBookmark = (eventId: number) => {
    setBookmarked(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const sortedEvents = [...events].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price
      case 'popularity':
        return b.enrolled - a.enrolled
      case 'date':
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

  return (
    <div>
      {/* Sort Options */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Todos los eventos ({events.length})</h2>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="date">Fecha</option>
            <option value="price">Precio</option>
            <option value="popularity">Popularidad</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.map((event, index) => (
          <Card 
            key={event.id}
            className="group overflow-hidden card-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Top badges and actions */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex gap-2">
                  {event.badge && (
                    <Badge className={`${event.badgeColor} text-white font-semibold px-2 py-1 animate-pulse`}>
                      {event.badge}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {event.level}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 p-0 bg-white/90 hover:bg-white transition-colors"
                    onClick={() => toggleBookmark(event.id)}
                  >
                    <Bookmark 
                      className={`w-4 h-4 transition-colors ${
                        bookmarked.includes(event.id) 
                          ? 'fill-purple-500 text-purple-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 p-0 bg-white/90 hover:bg-white transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              
              {/* Price */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  {event.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${event.originalPrice}</span>
                  )}
                  <span className="text-lg font-bold text-purple-600">${event.price}</span>
                </div>
              </div>
              
              {/* Hover overlay info */}
              <div className="absolute bottom-3 left-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.enrolled}/{event.maxStudents}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              {/* Category and Tags */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
                {event.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {event.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {event.description}
              </p>
              
              {/* Instructor */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={event.instructor.avatar} />
                  <AvatarFallback>{event.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.instructor.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {event.instructor.rating}
                    </div>
                    <span>•</span>
                    <span>{event.instructor.students} estudiantes</span>
                  </div>
                </div>
              </div>
              
              {/* Date and CTA */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short' 
                  })} • {event.time}
                </div>
                
                <Link to={`/events/${event.id}`}>
                  <Button className="btn-primary px-4 py-2 text-sm">
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" className="px-8 py-3">
          Cargar más eventos
        </Button>
      </div>
    </div>
  )
}
