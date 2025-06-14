
import { Layout } from "@/components/layout/Layout"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { CourseList } from "@/components/courses/CourseList"

const Courses = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Mis Cursos
            </h1>
            <p className="text-muted-foreground">
              Explora y gestiona todos tus cursos de No Code
            </p>
          </div>

          <CourseList />
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

export default Courses
