
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Calendar, MessageSquare } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Cursos Disponibles",
      value: "100+",
      description: "Cursos de alta calidad",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Estudiantes Activos",
      value: "5,000+",
      description: "Comunidad en crecimiento",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Eventos Mensuales",
      value: "20+",
      description: "Workshops y masterclasses",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Discusiones Activas",
      value: "1,000+",
      description: "Conversaciones en la comunidad",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <section className="py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-lg mb-4`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-lg font-medium text-gray-700 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
