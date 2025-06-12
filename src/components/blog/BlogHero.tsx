
import { Calendar, Clock, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredArticle = {
  id: 1,
  title: "El Futuro del No-Code: Tendencias 2024",
  excerpt: "Descubre las últimas tendencias en desarrollo No-Code que están revolucionando la forma en que construimos aplicaciones web.",
  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
  author: {
    name: "Ana García",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    role: "Desarrolladora No-Code"
  },
  publishedAt: "2024-03-15",
  readingTime: 8,
  category: "Tendencias",
  tags: ["No-Code", "Desarrollo", "Futuro"]
}

export function BlogHero() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="absolute inset-0">
        <img 
          src={featuredArticle.image}
          alt={featuredArticle.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-4xl">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Artículo Destacado
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {featuredArticle.title}
          </h1>
          
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            {featuredArticle.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <img 
                src={featuredArticle.author.avatar}
                alt={featuredArticle.author.name}
                className="w-8 h-8 rounded-full border-2 border-white/30"
              />
              <div>
                <div className="font-medium text-white">{featuredArticle.author.name}</div>
                <div className="text-xs">{featuredArticle.author.role}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>15 Mar 2024</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{featuredArticle.readingTime} min lectura</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {featuredArticle.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/30 text-white">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
