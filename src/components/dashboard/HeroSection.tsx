
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, BookOpen, Users } from "lucide-react"
import { Link } from "react-router-dom"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-20">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Aprende{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  sin límites
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Descubre cursos de No Code, automatización y herramientas digitales. 
                Únete a nuestra comunidad y transforma tu carrera profesional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/courses">
                  Explorar Cursos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/events">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Eventos
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                <p className="text-gray-600">Cursos Disponibles</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">5,000+</h3>
                <p className="text-gray-600">Estudiantes Activos</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Estudiantes aprendiendo"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
