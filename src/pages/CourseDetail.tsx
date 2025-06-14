
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Users, Star, BookOpen, Play, ArrowLeft, CheckCircle } from "lucide-react"
import { useCourses, Course } from "@/hooks/useCourses"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { getCourseById, enrollInCourse } = useCourses()
  const { user } = useAuth()
  const { toast } = useToast()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    if (id) {
      loadCourse(id)
    }
  }, [id])

  const loadCourse = async (courseId: string) => {
    try {
      setLoading(true)
      const { data, error } = await getCourseById(courseId)
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar el curso",
          variant: "destructive"
        })
        return
      }
      setCourse(data)
      // TODO: Check if user is enrolled
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!user || !course) return
    
    try {
      setEnrolling(true)
      const result = await enrollInCourse(course.id, user.id)
      if (result.success) {
        setIsEnrolled(true)
      }
    } catch (error) {
      console.error('Error enrolling:', error)
    } finally {
      setEnrolling(false)
    }
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

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="space-y-6 animate-fade-in">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  if (!course) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
            <Button asChild>
              <Link to="/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Cursos
              </Link>
            </Button>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 animate-fade-in">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground">Cursos</Link>
            <span>/</span>
            <span className="text-foreground">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className={levelColors[course.level]}>
                    {levelLabels[course.level]}
                  </Badge>
                  <Badge variant="outline">
                    {course.category?.name || "General"}
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold">{course.title}</h1>
                
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration_hours} horas
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.total_students} estudiantes
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {course.rating} ({course.total_students} reseñas)
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.total_lessons} lecciones
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground">
                  Instructor: <span className="font-medium text-foreground">{course.instructor?.full_name}</span>
                </p>
              </div>

              {/* Course Video */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    {course.preview_video_url ? (
                      <video 
                        src={course.preview_video_url}
                        poster={course.thumbnail_url || undefined}
                        controls
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={course.thumbnail_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Play className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Descripción del Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </CardContent>
              </Card>

              {/* What You'll Learn */}
              {course.what_you_learn && course.what_you_learn.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Lo que aprenderás</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.what_you_learn.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requisitos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {course.price > 0 ? `$${course.price}` : 'Gratis'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEnrolled ? (
                    <div className="space-y-3">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="font-medium">¡Ya estás inscrito!</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Progreso</span>
                          <span className="text-sm font-medium">0%</span>
                        </div>
                        <Progress value={0} className="h-3" />
                      </div>
                      <Button asChild className="w-full">
                        <Link to={`/course/${course.id}/learn`}>
                          <Play className="w-4 h-4 mr-2" />
                          Continuar Aprendiendo
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full"
                    >
                      {enrolling ? "Inscribiendo..." : "Inscribirse Ahora"}
                    </Button>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duración:</span>
                      <span>{course.duration_hours} horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lecciones:</span>
                      <span>{course.total_lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nivel:</span>
                      <span>{levelLabels[course.level]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificado:</span>
                      <span>Sí</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructor Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                      {course.instructor?.avatar_url ? (
                        <img 
                          src={course.instructor.avatar_url}
                          alt={course.instructor.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-medium">
                          {course.instructor?.full_name?.charAt(0) || 'I'}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{course.instructor?.full_name}</p>
                      <p className="text-sm text-muted-foreground">Experto en No Code</p>
                    </div>
                  </div>
                  {course.instructor?.bio && (
                    <p className="text-sm text-muted-foreground">
                      {course.instructor.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

export default CourseDetail
