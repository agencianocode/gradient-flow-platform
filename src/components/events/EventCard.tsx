
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, MapPin, Play, Star } from "lucide-react"
import { Event } from "@/hooks/useEvents"
import { Link } from "react-router-dom"
import { useEvents } from "@/hooks/useEvents"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface EventCardProps {
  event: Event
  viewMode?: 'grid' | 'list'
}

export function EventCard({ event, viewMode = 'grid' }: EventCardProps) {
  const { registerForEvent } = useEvents()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isRegistering, setIsRegistering] = useState(false)

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    live: "bg-red-100 text-red-800 animate-pulse",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800"
  }

  const statusLabels = {
    upcoming: "Próximo",
    live: "En Vivo",
    completed: "Completado",
    cancelled: "Cancelado"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      }),
      time: date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para registrarte en eventos.",
        variant: "destructive",
      })
      return
    }

    setIsRegistering(true)
    const result = await registerForEvent(event.id, user.id)
    setIsRegistering(false)

    if (result.success) {
      // Registration successful toast is handled in the hook
    }
  }

  const { date, time } = formatDate(event.event_date)

  if (viewMode === 'list') {
    return (
      <Card className="flex items-center p-4 hover:shadow-md transition-shadow">
        <div className="w-24 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img 
            src={event.thumbnail_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg truncate">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {event.instructor?.full_name}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Badge className={statusColors[event.status]}>
                {statusLabels[event.status]}
              </Badge>
              {event.price > 0 && (
                <Badge variant="outline">
                  ${event.price}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {time} ({event.duration_minutes}min)
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {event.current_attendees}/{event.max_attendees || '∞'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-4">
          <Button asChild variant="outline">
            <Link to={`/event/${event.id}`}>
              Ver Detalles
            </Link>
          </Button>
          {event.status === 'upcoming' && (
            <Button 
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? "Registrando..." : "Registrarse"}
            </Button>
          )}
          {event.status === 'live' && (
            <Button className="bg-red-500 hover:bg-red-600">
              <Play className="w-4 h-4 mr-2" />
              Unirse Ahora
            </Button>
          )}
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img 
          src={event.thumbnail_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge className={statusColors[event.status]}>
            {statusLabels[event.status]}
          </Badge>
        </div>
        {event.price > 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white/90">
              ${event.price}
            </Badge>
          </div>
        )}
        {event.status === 'live' && (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold animate-pulse">
              🔴 EN VIVO
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={event.instructor?.avatar_url || ""} />
            <AvatarFallback className="text-xs">
              {event.instructor?.full_name?.charAt(0) || "I"}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">
            {event.instructor?.full_name}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{time} ({event.duration_minutes} minutos)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{event.current_attendees} registrados</span>
            {event.max_attendees && (
              <span className="text-muted-foreground">/ {event.max_attendees} max</span>
            )}
          </div>
          {event.meeting_url && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Evento Online</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/event/${event.id}`}>
              Ver Detalles
            </Link>
          </Button>
          {event.status === 'upcoming' && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={handleRegister}
              disabled={isRegistering || (event.max_attendees && event.current_attendees >= event.max_attendees)}
            >
              {isRegistering ? "..." : "Registrarse"}
            </Button>
          )}
          {event.status === 'live' && (
            <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
              <Play className="w-4 h-4 mr-1" />
              Unirse
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
