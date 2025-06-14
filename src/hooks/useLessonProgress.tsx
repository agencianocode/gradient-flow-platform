
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  is_completed: boolean
  watch_time_seconds: number
  completed_at: string | null
  created_at: string
}

export function useLessonProgress(userId: string, courseId?: string) {
  const [progress, setProgress] = useState<LessonProgress[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchProgress = async () => {
    if (!userId) return

    try {
      setLoading(true)
      let query = supabase
        .from('lesson_progress')
        .select(`
          *,
          lesson:lessons(course_id, title)
        `)
        .eq('user_id', userId)

      if (courseId) {
        query = query.eq('lesson.course_id', courseId)
      }

      const { data, error } = await query

      if (error) throw error
      setProgress(data || [])
    } catch (error: any) {
      console.error('Error fetching lesson progress:', error)
      toast({
        title: "Error al cargar progreso",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (lessonId: string, watchTimeSeconds: number, completed = false) => {
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          watch_time_seconds: watchTimeSeconds,
          is_completed: completed,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .select()

      if (error) throw error

      if (completed) {
        toast({
          title: "¡Lección completada!",
          description: "Has completado esta lección exitosamente.",
        })
      }

      await fetchProgress()
      return data
    } catch (error: any) {
      console.error('Error updating lesson progress:', error)
      toast({
        title: "Error al actualizar progreso",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const markAsCompleted = async (lessonId: string) => {
    return updateProgress(lessonId, 0, true)
  }

  useEffect(() => {
    fetchProgress()
  }, [userId, courseId])

  return {
    progress,
    loading,
    updateProgress,
    markAsCompleted,
    fetchProgress,
  }
}
