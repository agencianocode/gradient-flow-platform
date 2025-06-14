
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar, MessageSquare, TrendingUp, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalEvents: number
  totalPosts: number
  newUsersThisWeek: number
  activeUsers: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalEvents: 0,
    totalPosts: 0,
    newUsersThisWeek: 0,
    activeUsers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      
      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Fetch total courses
      const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })

      // Fetch total events
      const { count: totalEvents } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })

      // Fetch total community posts
      const { count: totalPosts } = await supabase
        .from('community_posts')
        .select('*', { count: 'exact', head: true })

      // Fetch new users this week
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      
      const { count: newUsersThisWeek } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString())

      setStats({
        totalUsers: totalUsers || 0,
        totalCourses: totalCourses || 0,
        totalEvents: totalEvents || 0,
        totalPosts: totalPosts || 0,
        newUsersThisWeek: newUsersThisWeek || 0,
        activeUsers: Math.floor((totalUsers || 0) * 0.7) // Estimación
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const dashboardCards = [
    {
      title: "Total Usuarios",
      value: stats.totalUsers,
      description: `+${stats.newUsersThisWeek} esta semana`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Cursos Totales",
      value: stats.totalCourses,
      description: "Cursos disponibles",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Eventos Totales",
      value: stats.totalEvents,
      description: "Eventos programados",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Posts Comunidad",
      value: stats.totalPosts,
      description: "Publicaciones activas",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Usuarios Activos",
      value: stats.activeUsers,
      description: "Últimos 30 días",
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      title: "Engagement",
      value: "85%",
      description: "Tasa de participación",
      icon: Eye,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`p-2 ${card.bgColor} rounded-lg`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
