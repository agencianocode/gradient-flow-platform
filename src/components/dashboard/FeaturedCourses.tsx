
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCourses } from "@/hooks/useCourses"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedCourses() {
  const { courses, loading } = useCourses()

  if (loading) {
    return (
      <section className="py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const featuredCourses = courses.slice(0, 6)

  return (
    <section className="py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cursos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Aprende las habilidades más demandadas con nuestros cursos mejor valorados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img
                  src={course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" style={{ backgroundColor: course.category?.color || '#8B5CF6' }}>
                    {course.category?.name || 'General'}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90">
                    {course.level === 'beginner' ? 'Principiante' : 
                     course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.total_students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration_hours}h</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    {course.price === 0 ? 'Gratis' : `$${course.price}`}
                  </div>
                  <Button asChild size="sm">
                    <Link to={`/courses/${course.id}`}>
                      Ver Curso
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/courses">
              Ver Todos los Cursos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
