
import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Settings, FileImage, Video, BookOpen } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import type { Course } from '@/hooks/useCourses'
import { CourseFileManager } from './CourseFileManager'
import { LessonManager } from './LessonManager'

export function CourseDetailView() {
  const { courseId } = useParams<{ courseId: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  const fetchCourse = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!instructor_id(full_name, avatar_url),
          category:categories(name, color)
        `)
        .eq('id', courseId)
        .single()

      if (error) throw error
      setCourse(data)
    } catch (error: any) {
      console.error('Error fetching course:', error)
      toast({
        title: "Error al cargar curso",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!courseId) {
    return <Navigate to="/admin" replace />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Curso no encontrado</h2>
        <Button onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    )
  }

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

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    published: "bg-green-100 text-green-800",
    archived: "bg-red-100 text-red-800"
  }

  const statusLabels = {
    draft: "Borrador",
    published: "Publicado",
    archived: "Archivado"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">
              Instructor: {course.instructor?.full_name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={levelColors[course.level || 'beginner']}>
            {levelLabels[course.level || 'beginner']}
          </Badge>
          <Badge className={statusColors[course.status || 'draft']}>
            {statusLabels[course.status || 'draft']}
          </Badge>
        </div>
      </div>

      {/* Course Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Información del Curso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Precio</label>
              <p className="text-lg font-semibold">
                {course.price > 0 ? `$${course.price}` : 'Gratis'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Duración</label>
              <p className="text-lg font-semibold">{course.duration_hours} horas</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estudiantes</label>
              <p className="text-lg font-semibold">{course.total_students}</p>
            </div>
          </div>
          {course.description && (
            <div className="mt-4">
              <label className="text-sm font-medium text-muted-foreground">Descripción</label>
              <p className="mt-1">{course.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course Management Tabs */}
      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Lecciones
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            Archivos
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <LessonManager courseId={course.id} />
        </TabsContent>

        <TabsContent value="files">
          <CourseFileManager 
            courseId={course.id} 
            instructorId={course.instructor_id} 
          />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidad de configuración disponible próximamente.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
