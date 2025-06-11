
import { Search, TrendingUp, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CommunityHeader() {
  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Comunidad
            </h1>
            
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="w-4 h-4" />
                Following
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Award className="w-4 h-4" />
                Leaderboard
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar en la comunidad..."
                className="w-64 pl-10 bg-background/50 border-border/50 focus:bg-background"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
