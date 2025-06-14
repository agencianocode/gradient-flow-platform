
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star, Play, BookOpen } from "lucide-react"
import { Course } from "@/hooks/useCourses"
import { Link } from "react-router-dom"

interface CourseCardProps {
  course: Course
  viewMode?: 'grid' | 'list'
}

export function CourseCard({ course, viewMode = 'grid' }: CourseCardProps) {
  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800", 
    advanced: "bg-red-100 text-red-800"
  }

  const levelLabels = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado"
  }

  if (viewMode === 'list') {
    return (
      <Card className="flex items-center p-4 hover:shadow-md transition-shadow">
        <div className="w-24 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img 
            src={course.thumbnail_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg truncate">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {course.instructor?.full_name}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Badge className={levelColors[course.level]}>
                {levelLabels[course.level]}
              </Badge>
              <Badge variant="outline">
                {course.category?.name || "General"}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration_hours}h
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.total_students}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.total_lessons} lecciones
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-4">
          <Button asChild>
            <Link to={`/course/${course.id}`}>
              <Play className="w-4 h-4 mr-2" />
              Ver Curso
            </Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img 
          src={course.thumbnail_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge className={levelColors[course.level]}>
            {levelLabels[course.level]}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90">
            {course.category?.name || "General"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground">
          {course.instructor?.full_name}
        </p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration_hours}h
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.total_students}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Progreso</span>
            <span className="text-sm font-medium">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/course/${course.id}`}>
            <Play className="w-4 h-4 mr-2" />
            Continuar Curso
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
