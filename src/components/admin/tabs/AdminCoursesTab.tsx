
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { BookOpen } from "lucide-react"
import type { Course } from "@/hooks/useCourses"
import type { Category } from "@/types/course"
import { CourseForm } from "../course/CourseForm"
import { CourseFilters } from "../course/CourseFilters"
import { CourseTable } from "../course/CourseTable"

export function AdminCoursesTab() {
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchCourses()
    fetchCategories()
  }, [])

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

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, color')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error: any) {
      console.error('Error fetching categories:', error)
    }
  }

  const deleteCourse = async (courseId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este curso?')) return

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)

      if (error) throw error

      toast({
        title: "Curso eliminado",
        description: "El curso se ha eliminado correctamente.",
      })

      fetchCourses()
    } catch (error: any) {
      toast({
        title: "Error al eliminar curso",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Gestión de Cursos ({courses.length})
          </CardTitle>
          <CourseForm categories={categories} onCourseCreated={fetchCourses} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <CourseFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
        />

        <CourseTable
          courses={filteredCourses}
          onDeleteCourse={deleteCourse}
        />
      </CardContent>
    </Card>
  )
}
