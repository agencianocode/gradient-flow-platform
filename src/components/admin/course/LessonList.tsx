
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Video, FileText, HelpCircle, Clipboard, Eye, EyeOff, Trash2, GripVertical, Clock } from 'lucide-react'
import { LessonForm } from './LessonForm'
import type { Lesson, LessonFormData } from '@/hooks/useLessons'

interface LessonListProps {
  lessons: Lesson[]
  courseId: string
  onUpdateLesson: (lessonId: string, data: Partial<LessonFormData>) => Promise<boolean>
  onDeleteLesson: (lessonId: string) => Promise<boolean>
  onReorderLessons: (lessons: Lesson[]) => Promise<boolean>
}

export function LessonList({
  lessons,
  courseId,
  onUpdateLesson,
  onDeleteLesson,
  onReorderLessons
}: LessonListProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'text':
        return <FileText className="h-4 w-4" />
      case 'quiz':
        return <HelpCircle className="h-4 w-4" />
      case 'assignment':
        return <Clipboard className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video'
      case 'text':
        return 'Texto'
      case 'quiz':
        return 'Quiz'
      case 'assignment':
        return 'Tarea'
      default:
        return 'Desconocido'
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedItem === null) return

    const reorderedLessons = [...lessons]
    const draggedLesson = reorderedLessons[draggedItem]
    
    // Remove the dragged item
    reorderedLessons.splice(draggedItem, 1)
    
    // Insert at new position
    reorderedLessons.splice(dropIndex, 0, draggedLesson)
    
    // Update order indices
    const updatedLessons = reorderedLessons.map((lesson, index) => ({
      ...lesson,
      order_index: index + 1
    }))

    onReorderLessons(updatedLessons)
    setDraggedItem(null)
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  if (lessons.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No hay lecciones creadas aún.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => (
        <Card
          key={lesson.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className={`transition-all ${
            draggedItem === index ? 'opacity-50' : 'opacity-100'
          } hover:shadow-md cursor-move`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getContentTypeIcon(lesson.content_type)}
                    {getContentTypeLabel(lesson.content_type)}
                  </Badge>
                  {lesson.is_preview && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Vista Previa
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LessonForm
                  courseId={courseId}
                  lesson={lesson}
                  onSubmit={(data) => onUpdateLesson(lesson.id, data)}
                  trigger={
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  }
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar lección?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. La lección "{lesson.title}" será eliminada permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeleteLesson(lesson.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                {lesson.description && (
                  <p className="text-muted-foreground text-sm mt-1">{lesson.description}</p>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDuration(lesson.duration_minutes)}
                </div>
                <div>
                  Posición: {lesson.order_index}
                </div>
                {lesson.video_url && (
                  <Badge variant="outline" className="text-xs">
                    Video disponible
                  </Badge>
                )}
              </div>

              {lesson.content && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm line-clamp-3">{lesson.content}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
