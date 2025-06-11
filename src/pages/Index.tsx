
import { Layout } from "@/components/layout/Layout"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { CourseCard } from "@/components/dashboard/CourseCard"
import { ProgressChart } from "@/components/dashboard/ProgressChart"
import { Book, Clock, Star, TrendingUp, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const statsData = [
  {
    title: "Cursos Completados",
    value: 12,
    change: { value: 15, trend: 'up' as const },
    icon: <Book className="w-6 h-6" />,
    gradient: 'primary' as const
  },
  {
    title: "Horas de Estudio",
    value: "84h",
    change: { value: 23, trend: 'up' as const },
    icon: <Clock className="w-6 h-6" />,
    gradient: 'secondary' as const
  },
  {
    title: "Certificaciones",
    value: 8,
    change: { value: 12, trend: 'up' as const },
    icon: <Star className="w-6 h-6" />,
    gradient: 'success' as const
  },
  {
    title: "Ranking Global",
    value: "#127",
    change: { value: 8, trend: 'up' as const },
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: 'warning' as const
  }
]

const enrolledCourses = [
  {
    id: "1",
    title: "Masterclass de Bubble.io: De Principiante a Experto",
    instructor: "Ana García",
    duration: "8h 30m",
    rating: 4.9,
    students: 1250,
    progress: 68,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    level: "Intermedio" as const,
    category: "No Code"
  },
  {
    id: "2", 
    title: "Webflow Avanzado: Diseño Web Sin Código",
    instructor: "Carlos Ruiz",
    duration: "12h 15m",
    rating: 4.8,
    students: 890,
    progress: 34,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    level: "Avanzado" as const,
    category: "Diseño Web"
  },
  {
    id: "3",
    title: "Automatización con Zapier y Make",
    instructor: "Laura Martínez",
    duration: "6h 45m", 
    rating: 4.7,
    students: 567,
    progress: 89,
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    level: "Principiante" as const,
    category: "Automatización"
  }
]

const recommendedCourses = [
  {
    id: "4",
    title: "Airtable para Empresas: Gestión de Datos",
    instructor: "Miguel Fernández",
    duration: "5h 20m",
    rating: 4.9,
    students: 432,
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    level: "Intermedio" as const,
    category: "Bases de Datos"
  },
  {
    id: "5",
    title: "Notion Masterclass: Productividad Total",
    instructor: "Sofia López",
    duration: "9h 10m",
    rating: 4.8,
    students: 789,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    level: "Principiante" as const,
    category: "Productividad"
  }
]

const upcomingEvents = [
  {
    title: "Workshop: Bubble.io para E-commerce",
    date: "15 Dic",
    time: "15:00",
    attendees: 45
  },
  {
    title: "Webinar: Tendencias No Code 2024",
    date: "18 Dic", 
    time: "18:00",
    attendees: 120
  },
  {
    title: "Masterclass: Webflow + CMS",
    date: "22 Dic",
    time: "16:30",
    attendees: 78
  }
]

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-primary rounded-3xl p-8 text-white">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">
              ¡Bienvenido de vuelta, Juan! 👋
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Continúa tu viaje de aprendizaje No Code. Tienes 3 cursos en progreso.
            </p>
            <Button
              size="lg" 
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8"
            >
              Continuar Aprendiendo
            </Button>
          </div>
          
          {/* Floating particles background */}
          <div className="absolute inset-0 bg-floating-particles opacity-30 animate-float" 
               style={{ backgroundSize: '100px 100px, 80px 80px, 120px 120px, 90px 90px' }} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div key={stat.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Progress Charts */}
        <ProgressChart />

        {/* Courses Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Mis Cursos en Progreso
              </h2>
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                Ver Todos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledCourses.map((course, index) => (
                <div key={course.id} className="animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <CourseCard {...course} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Recommended Courses */}
            <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recomendados para Ti
              </h3>
              
              <div className="space-y-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="group flex space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {course.instructor} • {course.duration}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{course.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Próximos Eventos
              </h3>
              
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">
                        {event.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.date} • {event.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 btn-secondary">
                Ver Calendario Completo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index
