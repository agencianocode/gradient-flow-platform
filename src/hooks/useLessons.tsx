
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface Lesson {
  id: string
  course_id: string
  title: string
  description: string | null
  content_type: 'video' | 'text' | 'quiz' | 'assignment'
  video_url: string | null
  content: string | null
  duration_minutes: number
  order_index: number
  is_preview: boolean
  created_at: string
}

export interface LessonFormData {
  title: string
  description?: string
  content_type: 'video' | 'text' | 'quiz' | 'assignment'
  video_url?: string
  content?: string
  duration_minutes: number
  is_preview?: boolean
}

export interface CreateLessonData extends LessonFormData {
  order_index: number
}

export function useLessons(courseId: string) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

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

  const createLesson = async (lessonData: LessonFormData & { nextOrderIndex: number }): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .insert({
          ...lessonData,
          course_id: courseId,
          order_index: lessonData.nextOrderIndex,
        })
        .select()
        .single()

      if (error) {
        // Handle specific validation errors from triggers
        if (error.message.includes('índice de orden debe ser mayor a 0')) {
          throw new Error('El orden de la lección debe ser mayor a 0')
        }
        if (error.message.includes('Ya existe una lección con este orden')) {
          throw new Error('Ya existe una lección con este número de orden. Por favor, elige otro.')
        }
        throw error
      }

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

  const updateLesson = async (lessonId: string, updates: Partial<LessonFormData>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('lessons')
        .update(updates)
        .eq('id', lessonId)

      if (error) {
        // Handle specific validation errors from triggers
        if (error.message.includes('índice de orden debe ser mayor a 0')) {
          throw new Error('El orden de la lección debe ser mayor a 0')
        }
        if (error.message.includes('Ya existe una lección con este orden')) {
          throw new Error('Ya existe una lección con este número de orden. Por favor, elige otro.')
        }
        throw error
      }

      toast({
        title: "Lección actualizada",
        description: "Los cambios se han guardado correctamente.",
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
      // Update order_index for each lesson
      const updates = reorderedLessons.map((lesson, index) => ({
        id: lesson.id,
        order_index: index + 1
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
        description: "El orden de las lecciones se ha actualizado correctamente.",
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

  useEffect(() => {
    if (courseId) {
      fetchLessons()
    }
  }, [courseId])

  return {
    lessons,
    loading,
    createLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
    fetchLessons,
  }
}
