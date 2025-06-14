
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Star, Users } from "lucide-react"
import type { Course } from "@/hooks/useCourses"

interface CourseTableProps {
  courses: Course[]
  onDeleteCourse: (courseId: string) => void
}

export function CourseTable({ courses, onDeleteCourse }: CourseTableProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No se encontraron cursos con los filtros aplicados.
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Curso</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Estadísticas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop'}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-gray-500">
                      ${course.price} • {course.duration_hours}h
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {course.instructor?.full_name || 'Sin instructor'}
                </div>
              </TableCell>
              <TableCell>
                {course.category && (
                  <Badge 
                    style={{ backgroundColor: course.category.color + '20', color: course.category.color }}
                  >
                    {course.category.name}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(course.status || 'draft')}>
                  {course.status === 'published' ? 'Publicado' : 
                   course.status === 'draft' ? 'Borrador' : 'Archivado'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {course.rating?.toFixed(1) || '0.0'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    {course.total_students || 0}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
