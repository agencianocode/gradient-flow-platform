
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Eye, Pencil, Trash2, Users, Clock, DollarSign } from "lucide-react"
import { Link } from "react-router-dom"
import type { Course } from "@/hooks/useCourses"

interface CourseTableProps {
  courses: Course[]
  onDeleteCourse: (courseId: string) => void
}

export function CourseTable({ courses, onDeleteCourse }: CourseTableProps) {
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

  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No se encontraron cursos.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Curso</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Estadísticas</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {course.description}
                    </p>
                    {course.category && (
                      <Badge variant="outline" className="text-xs">
                        {course.category.name}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {course.instructor?.avatar_url ? (
                      <img 
                        src={course.instructor.avatar_url}
                        alt={course.instructor.full_name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                        {course.instructor?.full_name?.charAt(0) || 'I'}
                      </div>
                    )}
                    <span className="text-sm">{course.instructor?.full_name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={levelColors[course.level]}>
                    {levelLabels[course.level]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[course.status]}>
                    {statusLabels[course.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.total_students} estudiantes
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration_hours}h
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {course.price > 0 ? `$${course.price}` : 'Gratis'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/course/${course.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/admin/course/${course.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar curso?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. El curso "{course.title}" será eliminado permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDeleteCourse(course.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
