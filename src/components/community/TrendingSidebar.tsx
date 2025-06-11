
import { TrendingUp, Hash, Users, Award, User } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const trendingTags = [
  { name: "webflow", posts: 45, growth: "+12%" },
  { name: "bubble", posts: 38, growth: "+8%" },
  { name: "flutterflow", posts: 29, growth: "+15%" },
  { name: "zapier", posts: 24, growth: "+5%" },
  { name: "notion", posts: 21, growth: "+10%" }
]

const topUsers = [
  {
    rank: 1,
    name: "Ana Torres",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    points: 2847,
    badge: "🥇",
    change: "+15"
  },
  {
    rank: 2,
    name: "Carlos Ruiz",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    points: 2635,
    badge: "🥈",
    change: "+8"
  },
  {
    rank: 3,
    name: "María González",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    points: 2401,
    badge: "🥉",
    change: "+12"
  }
]

const activeUsers = [
  {
    name: "Diego M.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "Creando en Bubble..."
  },
  {
    name: "Elena V.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    status: "Trabajando en Figma"
  },
  {
    name: "Luis R.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    status: "Construyendo con Webflow"
  }
]

export function TrendingSidebar() {
  return (
    <div className="space-y-6">
      {/* Trending Tags */}
      <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTags.map((tag, index) => (
            <div key={tag.name} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Hash className="w-3 h-3 text-muted-foreground" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {tag.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{tag.posts} posts</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-green-600 bg-green-100">
                {tag.growth}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="w-5 h-5 text-yellow-500" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topUsers.map((user) => (
            <div key={user.rank} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <Avatar className="w-10 h-10 ring-2 ring-background">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 text-lg">
                  {user.badge}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {user.name}
                  </span>
                  <Badge variant="outline" className="text-green-600">
                    +{user.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {user.points.toLocaleString()} puntos
                </p>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            Ver Leaderboard Completo
          </Button>
        </CardContent>
      </Card>

      {/* Active Now */}
      <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-green-500" />
            Activos Ahora
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeUsers.map((user) => (
            <div key={user.name} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-background"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.status}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
