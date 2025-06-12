
import { Search, TrendingUp, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "all", label: "Todos", count: 24 },
  { name: "tutorial", label: "Tutoriales", count: 8 },
  { name: "tendencias", label: "Tendencias", count: 5 },
  { name: "automatización", label: "Automatización", count: 6 },
  { name: "diseño", label: "Diseño", count: 5 }
]

const popularTags = [
  { name: "No-Code", count: 15 },
  { name: "Bubble", count: 8 },
  { name: "Zapier", count: 6 },
  { name: "Webflow", count: 9 },
  { name: "Airtable", count: 4 },
  { name: "Automation", count: 7 }
]

const trendingArticles = [
  {
    id: 1,
    title: "Cómo monetizar tu app No-Code",
    views: 4200,
    readingTime: 5
  },
  {
    id: 2,
    title: "Integración con APIs externas",
    views: 3800,
    readingTime: 8
  },
  {
    id: 3,
    title: "Optimización de performance",
    views: 3200,
    readingTime: 6
  }
]

interface BlogSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function BlogSidebar({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar artículos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar por título o contenido..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Categorías</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedCategory === category.name
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                  : 'hover:bg-muted'
              }`}
            >
              <span className="font-medium">{category.label}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Trending Articles */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingArticles.map((article, index) => (
            <div key={article.id} className="flex items-start gap-3 group cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm leading-tight group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{article.views} vistas</span>
                  <span>•</span>
                  <span>{article.readingTime} min</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Tags populares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag.name}
                variant="outline"
                className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors"
              >
                #{tag.name} ({tag.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
