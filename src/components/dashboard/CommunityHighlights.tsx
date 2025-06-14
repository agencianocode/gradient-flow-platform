
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Heart, Eye, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCommunity } from "@/hooks/useCommunity"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export function CommunityHighlights() {
  const { posts, loading } = useCommunity()

  if (loading) {
    return (
      <section className="py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const highlights = posts.slice(0, 6)

  return (
    <section className="py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Destacados de la Comunidad
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre las conversaciones más interesantes y únete a nuestra comunidad de aprendizaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {highlights.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author?.avatar_url || ''} />
                    <AvatarFallback>
                      {post.author?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {post.author?.full_name || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(post.created_at), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: post.category?.color || '#8B5CF6',
                      color: post.category?.color || '#8B5CF6'
                    }}
                  >
                    {post.post_type === 'discussion' ? 'Discusión' : 
                     post.post_type === 'question' ? 'Pregunta' : 'Anuncio'}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views_count}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/community">
              Ver Toda la Comunidad
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
