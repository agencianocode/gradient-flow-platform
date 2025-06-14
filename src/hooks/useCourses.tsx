
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface Course {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  instructor_id: string
  category_id: string | null
  level: 'beginner' | 'intermediate' | 'advanced'
  status: 'draft' | 'published' | 'archived'
  price: number
  duration_hours: number
  rating: number
  total_students: number
  total_lessons: number
  preview_video_url: string | null
  requirements: string[] | null
  what_you_learn: string[] | null
  created_at: string
  updated_at: string
  instructor?: {
    full_name: string
    avatar_url: string | null
    bio?: string | null
  }
  category?: {
    name: string
    color: string
  }
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!instructor_id(full_name, avatar_url),
          category:categories(name, color)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error: any) {
      console.error('Error fetching courses:', error)
      toast({
        title: "Error al cargar cursos",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getCourseById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!instructor_id(full_name, avatar_url, bio),
          category:categories(name, color),
          lessons(id, title, duration_minutes, is_preview)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  const enrollInCourse = async (courseId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: userId,
          course_id: courseId,
        })

      if (error) throw error

      toast({
        title: "¡Inscripción exitosa!",
        description: "Te has inscrito al curso correctamente.",
      })

      return { success: true }
    } catch (error: any) {
      toast({
        title: "Error en la inscripción",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  // New function to create a course with validation handling
  const createCourse = async (courseData: any) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select()
        .single()

      if (error) {
        // Handle specific validation errors from triggers
        if (error.message.includes('precio del curso no puede ser negativo')) {
          throw new Error('El precio del curso debe ser 0 o mayor')
        }
        if (error.message.includes('duración del curso debe ser al menos 1 hora')) {
          throw new Error('La duración mínima del curso es 1 hora')
        }
        throw error
      }

      toast({
        title: "Curso creado",
        description: "El curso se ha creado correctamente.",
      })

      return { data, error: null }
    } catch (error: any) {
      console.error('Error creating course:', error)
      toast({
        title: "Error al crear curso",
        description: error.message,
        variant: "destructive",
      })
      return { data: null, error: error.message }
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return {
    courses,
    loading,
    fetchCourses,
    getCourseById,
    enrollInCourse,
    createCourse,
  }
}
