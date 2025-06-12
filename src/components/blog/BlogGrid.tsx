
import { useState, useEffect } from "react"
import { Calendar, Clock, Eye, Heart, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const articles = [
  {
    id: 2,
    title: "Guía Completa de Bubble.io",
    excerpt: "Aprende a crear aplicaciones web complejas sin escribir código con esta guía paso a paso.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    author: {
      name: "Carlos López",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    publishedAt: "2024-03-10",
    readingTime: 12,
    category: "Tutorial",
    views: 2400,
    likes: 89,
    comments: 23
  },
  {
    id: 3,
    title: "Automatización con Zapier",
    excerpt: "Optimiza tu flujo de trabajo conectando diferentes aplicaciones sin código.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop",
    author: {
      name: "María Rodríguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    publishedAt: "2024-03-08",
    readingTime: 6,
    category: "Automatización",
    views: 1800,
    likes: 67,
    comments: 15
  },
  {
    id: 4,
    title: "Diseño UX para No-Code",
    excerpt: "Principios de diseño de experiencia de usuario aplicados a herramientas No-Code.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=250&fit=crop",
    author: {
      name: "Diego Silva",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    publishedAt: "2024-03-05",
    readingTime: 10,
    category: "Diseño",
    views: 3200,
    likes: 124,
    comments: 31
  }
]

interface BlogGridProps {
  category: string
  searchQuery: string
}

export function BlogGrid({ category, searchQuery }: BlogGridProps) {
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [likedArticles, setLikedArticles] = useState<Set<number>>(new Set())

  useEffect(() => {
    let filtered = articles

    if (category !== "all") {
      filtered = filtered.filter(article => 
        article.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredArticles(filtered)
  }, [category, searchQuery])

  const toggleLike = (articleId: number) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(articleId)) {
        newSet.delete(articleId)
      } else {
        newSet.add(articleId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {category === "all" ? "Todos los artículos" : `Categoría: ${category}`}
        </h2>
        <span className="text-muted-foreground">
          {filteredArticles.length} artículos encontrados
        </span>
      </div>

      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="md:flex">
              <div className="md:w-1/3 relative overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                  {article.category}
                </Badge>
              </div>
              
              <CardContent className="md:w-2/3 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <img 
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{article.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>10 Mar 2024</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readingTime} min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views}</span>
                      </div>
                      
                      <button 
                        onClick={() => toggleLike(article.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          likedArticles.has(article.id) ? 'text-red-500' : 'hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedArticles.has(article.id) ? 'fill-current' : ''}`} />
                        <span>{article.likes + (likedArticles.has(article.id) ? 1 : 0)}</span>
                      </button>
                      
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{article.comments}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-300">
                      Leer más
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
