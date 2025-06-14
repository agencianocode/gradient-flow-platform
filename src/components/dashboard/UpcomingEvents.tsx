
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useEvents } from "@/hooks/useEvents"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function UpcomingEvents() {
  const { events, loading } = useEvents()

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const upcomingEvents = events.slice(0, 4)

  if (upcomingEvents.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              No hay eventos programados en este momento. ¡Mantente atento a nuevas fechas!
            </p>
            <Button asChild variant="outline">
              <Link to="/events">Ver Todos los Eventos</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participa en workshops, masterclasses y eventos exclusivos de nuestra comunidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant={event.status === 'live' ? 'destructive' : 'default'}>
                    {event.status === 'live' ? 'En Vivo' : 'Próximamente'}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {event.price === 0 ? 'Gratis' : `$${event.price}`}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(event.event_date), "d 'de' MMMM, yyyy", { locale: es })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(new Date(event.event_date), "HH:mm")} - {event.duration_minutes} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.current_attendees}{event.max_attendees ? `/${event.max_attendees}` : ''} participantes
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link to={`/events/${event.id}`}>
                    {event.status === 'live' ? 'Unirse Ahora' : 'Registrarse'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/events">
              Ver Todos los Eventos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
