
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Grid, List } from "lucide-react"
import { useCourses } from "@/hooks/useCourses"
import { CourseCard } from "./CourseCard"
import { Skeleton } from "@/components/ui/skeleton"

const categories = ["Todos", "No Code", "Diseño Web", "Automatización", "Bases de Datos", "Productividad", "Desarrollo Móvil"]
const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"]

export function CourseList() {
  const { courses, loading } = useCourses()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || course.category?.name === selectedCategory
    const matchesLevel = selectedLevel === "Todos" || 
                        (course.level === 'beginner' && selectedLevel === 'Principiante') ||
                        (course.level === 'intermediate' && selectedLevel === 'Intermedio') ||
                        (course.level === 'advanced' && selectedLevel === 'Avanzado')
    return matchesSearch && matchesCategory && matchesLevel
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
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
            placeholder="Buscar cursos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          Mostrando {filteredCourses.length} de {courses.length} cursos
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
            <CourseCard course={course} viewMode={viewMode} />
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
