
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BookOpen, Plus } from 'lucide-react'
import { useLessons } from '@/hooks/useLessons'
import { LessonForm } from './LessonForm'
import { LessonList } from './LessonList'

interface LessonManagerProps {
  courseId: string
}

export function LessonManager({ courseId }: LessonManagerProps) {
  const {
    lessons,
    loading,
    createLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
  } = useLessons(courseId)

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalDuration = lessons.reduce((total, lesson) => total + lesson.duration_minutes, 0)
  const formatTotalDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Gestión de Lecciones ({lessons.length})
          </CardTitle>
          <LessonForm
            courseId={courseId}
            onSubmit={createLesson}
            nextOrderIndex={lessons.length + 1}
            trigger={
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Lección
              </button>
            }
          />
        </div>
        {lessons.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Duración total: {formatTotalDuration(totalDuration)}
            <span className="ml-4">
              Nota: La duración del curso se actualiza automáticamente
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <LessonList
          lessons={lessons}
          courseId={courseId}
          onUpdateLesson={updateLesson}
          onDeleteLesson={deleteLesson}
          onReorderLessons={reorderLessons}
        />
      </CardContent>
    </Card>
  )
}
