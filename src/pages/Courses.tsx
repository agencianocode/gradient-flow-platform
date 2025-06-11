
import { Layout } from "@/components/layout/Layout"
import { CourseCard } from "@/components/dashboard/CourseCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List } from "lucide-react"
import { useState } from "react"

const allCourses = [
  {
    id: "1",
    title: "Masterclass de Bubble.io: De Principiante a Experto",
    instructor: "Ana García",
    duration: "8h 30m",
    rating: 4.9,
    students: 1250,
    progress: 68,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    level: "Intermedio" as const,
    category: "No Code"
  },
  {
    id: "2", 
    title: "Webflow Avanzado: Diseño Web Sin Código",
    instructor: "Carlos Ruiz",
    duration: "12h 15m",
    rating: 4.8,
    students: 890,
    progress: 34,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    level: "Avanzado" as const,
    category: "Diseño Web"
  },
  {
    id: "3",
    title: "Automatización con Zapier y Make",
    instructor: "Laura Martínez",
    duration: "6h 45m", 
    rating: 4.7,
    students: 567,
    progress: 89,
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    level: "Principiante" as const,
    category: "Automatización"
  },
  {
    id: "4",
    title: "Airtable para Empresas: Gestión de Datos",
    instructor: "Miguel Fernández",
    duration: "5h 20m",
    rating: 4.9,
    students: 432,
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    level: "Intermedio" as const,
    category: "Bases de Datos"
  },
  {
    id: "5",
    title: "Notion Masterclass: Productividad Total",
    instructor: "Sofia López",
    duration: "9h 10m",
    rating: 4.8,
    students: 789,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    level: "Principiante" as const,
    category: "Productividad"
  },
  {
    id: "6",
    title: "Flutterflow: Apps Móviles Sin Código",
    instructor: "Roberto Sánchez",
    duration: "11h 40m",
    rating: 4.6,
    students: 623,
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    level: "Avanzado" as const,
    category: "Desarrollo Móvil"
  }
]

const categories = ["Todos", "No Code", "Diseño Web", "Automatización", "Bases de Datos", "Productividad", "Desarrollo Móvil"]
const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"]

const Courses = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedLevel, setSelectedLevel] = useState("Todos")

  const filteredCourses = allCourses.filter(course => {
    return (selectedCategory === "Todos" || course.category === selectedCategory) &&
           (selectedLevel === "Todos" || course.level === selectedLevel)
  })

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Mis Cursos
          </h1>
          <p className="text-muted-foreground">
            Explora y gestiona todos tus cursos de No Code
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cursos..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Categoría:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Nivel:</span>
              <div className="flex gap-2">
                {levels.map((level) => (
                  <Badge
                    key={level}
                    variant={selectedLevel === level ? "default" : "secondary"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
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
            Mostrando {filteredCourses.length} de {allCourses.length} cursos
          </p>
        </div>

        {/* Courses Grid */}
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {filteredCourses.map((course, index) => (
            <div key={course.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No se encontraron cursos con los filtros seleccionados
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setSelectedCategory("Todos")
                setSelectedLevel("Todos")
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Courses
