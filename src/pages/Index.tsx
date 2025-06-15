
import React from 'react'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, Users, Star } from 'lucide-react'

const Index = () => {
  return (
    <SimpleLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Aprende sin límites
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre cursos, eventos y una comunidad vibrante de aprendizaje continuo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">Comenzar Ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/courses">Explorar Cursos</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto" />
              <CardTitle>Cursos</CardTitle>
              <CardDescription>
                Aprende con expertos de la industria
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-12 w-12 text-blue-600 mx-auto" />
              <CardTitle>Eventos</CardTitle>
              <CardDescription>
                Participa en eventos en vivo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto" />
              <CardTitle>Comunidad</CardTitle>
              <CardDescription>
                Conecta con otros estudiantes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Star className="h-12 w-12 text-yellow-600 mx-auto" />
              <CardTitle>Certificados</CardTitle>
              <CardDescription>
                Obtén reconocimiento oficial
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white/50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">10,000+</div>
              <div className="text-gray-600">Estudiantes Activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Cursos Disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600">Satisfacción</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            ¿Listo para comenzar tu viaje de aprendizaje?
          </h2>
          <p className="text-gray-600">
            Únete a miles de estudiantes que ya están transformando sus carreras
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Crear Cuenta Gratis</Link>
          </Button>
        </div>
      </div>
    </SimpleLayout>
  )
}

export default Index
