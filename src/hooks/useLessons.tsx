
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface Lesson {
  id: string
  title: string
  description: string | null
  content: string | null
  video_url: string | null
  duration_minutes: number
  order_index: number
  is_preview: boolean
  content_type: 'video' | 'text' | 'quiz' | 'assignment'
  course_id: string
  created_at: string
}

export interface LessonFormData {
  title: string
  description: string
  content: string
  video_url: string
  duration_minutes: number
  is_preview: boolean
  content_type: 'video' | 'text' | 'quiz' | 'assignment'
}

export function useLessons(courseId: string) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (courseId) {
      fetchLessons()
    }
  }, [courseId])

  const fetchLessons = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true })

      if (error) throw error
      setLessons(data || [])
    } catch (error: any) {
      console.error('Error fetching lessons:', error)
      toast({
        title: "Error al cargar lecciones",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createLesson = async (lessonData: LessonFormData): Promise<boolean> => {
    try {
      // Get the next order index
      const nextOrderIndex = lessons.length > 0 
        ? Math.max(...lessons.map(l => l.order_index)) + 1 
        : 1

      const { error } = await supabase
        .from('lessons')
        .insert({
          ...lessonData,
          course_id: courseId,
          order_index: nextOrderIndex,
        })

      if (error) throw error

      toast({
        title: "Lección creada",
        description: "La lección se ha creado correctamente.",
      })

      await fetchLessons()
      return true
    } catch (error: any) {
      console.error('Error creating lesson:', error)
      toast({
        title: "Error al crear lección",
        description: error.message,
        variant: "destructive",
      })
      return false
    }
  }

  const updateLesson = async (lessonId: string, lessonData: Partial<LessonFormData>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('lessons')
        .update(lessonData)
        .eq('id', lessonId)

      if (error) throw error

      toast({
        title: "Lección actualizada",
        description: "La lección se ha actualizado correctamente.",
      })

      await fetchLessons()
      return true
    } catch (error: any) {
      console.error('Error updating lesson:', error)
      toast({
        title: "Error al actualizar lección",
        description: error.message,
        variant: "destructive",
      })
      return false
    }
  }

  const deleteLesson = async (lessonId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId)

      if (error) throw error

      toast({
        title: "Lección eliminada",
        description: "La lección se ha eliminado correctamente.",
      })

      await fetchLessons()
      return true
    } catch (error: any) {
      console.error('Error deleting lesson:', error)
      toast({
        title: "Error al eliminar lección",
        description: error.message,
        variant: "destructive",
      })
      return false
    }
  }

  const reorderLessons = async (reorderedLessons: Lesson[]): Promise<boolean> => {
    try {
      const updates = reorderedLessons.map((lesson, index) => ({
        id: lesson.id,
        order_index: index + 1,
      }))

      for (const update of updates) {
        const { error } = await supabase
          .from('lessons')
          .update({ order_index: update.order_index })
          .eq('id', update.id)

        if (error) throw error
      }

      toast({
        title: "Orden actualizado",
        description: "El orden de las lecciones se ha actualizado.",
      })

      await fetchLessons()
      return true
    } catch (error: any) {
      console.error('Error reordering lessons:', error)
      toast({
        title: "Error al reordenar lecciones",
        description: error.message,
        variant: "destructive",
      })
      return false
    }
  }

  return {
    lessons,
    loading,
    fetchLessons,
    createLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
  }
}
