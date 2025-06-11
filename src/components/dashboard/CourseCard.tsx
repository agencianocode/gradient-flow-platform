
import { Clock, Star, Users, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  duration: string
  rating: number
  students: number
  progress?: number
  thumbnail: string
  level: 'Principiante' | 'Intermedio' | 'Avanzado'
  category: string
}

export function CourseCard({
  title,
  instructor,
  duration,
  rating,
  students,
  progress,
  thumbnail,
  level,
  category
}: CourseCardProps) {
  const levelColors = {
    'Principiante': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    'Intermedio': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Avanzado': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  }

  return (
    <div className="group relative overflow-hidden bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay con botón de play */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="lg"
            className="bg-white/20 backdrop-blur-lg text-white border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <Play className="w-5 h-5 mr-2" />
            Continuar
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          <Badge className={levelColors[level]}>
            {level}
          </Badge>
          <Badge variant="secondary" className="bg-black/20 text-white border-white/20">
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and instructor */}
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            por {instructor}
          </p>
        </div>

        {/* Progress bar (if enrolled) */}
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{students.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>

        {/* Action button */}
        <Button 
          className="w-full btn-primary"
          size="lg"
        >
          {progress !== undefined ? 'Continuar Curso' : 'Comenzar Curso'}
        </Button>
      </div>

      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
