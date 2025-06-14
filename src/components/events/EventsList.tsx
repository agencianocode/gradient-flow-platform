
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Grid, List, Calendar } from "lucide-react"
import { useEvents } from "@/hooks/useEvents"
import { EventCard } from "./EventCard"
import { Skeleton } from "@/components/ui/skeleton"

const statusFilters = ["Todos", "Próximos", "En Vivo", "Completados"]
const typeFilters = ["Todos", "Masterclass", "Workshop", "Webinar", "Networking"]

export function EventsList() {
  const { events, loading } = useEvents()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [selectedType, setSelectedType] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "Todos" || 
                         (selectedStatus === "Próximos" && event.status === 'upcoming') ||
                         (selectedStatus === "En Vivo" && event.status === 'live') ||
                         (selectedStatus === "Completados" && event.status === 'completed')
    const matchesType = selectedType === "Todos" // We'll implement event types later
    return matchesSearch && matchesStatus && matchesType
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar eventos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">Estado:</span>
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((status) => (
                <Badge
                  key={status}
                  variant={selectedStatus === status ? "default" : "secondary"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-border/50 p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredEvents.length} de {events.length} eventos
        </p>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Ver Calendario
        </Button>
      </div>

      {/* Events Grid */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {filteredEvents.map((event, index) => (
          <div key={event.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <EventCard event={event} viewMode={viewMode} />
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No se encontraron eventos con los filtros seleccionados
          </div>
          <Button 
            variant="outline"
            onClick={() => {
              setSelectedStatus("Todos")
              setSelectedType("Todos")
              setSearchTerm("")
            }}
          >
            Limpiar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
