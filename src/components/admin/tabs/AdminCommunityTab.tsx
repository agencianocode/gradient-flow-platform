
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Search, MessageSquare, Eye, Heart, MessageCircle, Pin, Trash2 } from "lucide-react"
import type { CommunityPost } from "@/hooks/useCommunity"

export function AdminCommunityTab() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles!author_id(full_name, avatar_url),
          category:categories(name, color)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error: any) {
      console.error('Error fetching posts:', error)
      toast({
        title: "Error al cargar publicaciones",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const togglePinPost = async (postId: string, currentPinned: boolean) => {
    try {
      const { error } = await supabase
        .from('community_posts')
        .update({ is_pinned: !currentPinned })
        .eq('id', postId)

      if (error) throw error

      toast({
        title: currentPinned ? "Post despinned" : "Post pinned",
        description: `La publicación ha sido ${currentPinned ? 'despinned' : 'pinned'} correctamente.`,
      })

      fetchPosts()
    } catch (error: any) {
      toast({
        title: "Error al modificar pin",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const deletePost = async (postId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) return

    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId)

      if (error) throw error

      toast({
        title: "Publicación eliminada",
        description: "La publicación se ha eliminado correctamente.",
      })

      fetchPosts()
    } catch (error: any) {
      toast({
        title: "Error al eliminar publicación",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || post.post_type === typeFilter
    return matchesSearch && matchesType
  })

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-red-100 text-red-800'
      case 'question': return 'bg-blue-100 text-blue-800'
      case 'discussion': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Moderación de Comunidad ({posts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar publicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="discussion">Discusiones</SelectItem>
              <SelectItem value="question">Preguntas</SelectItem>
              <SelectItem value="announcement">Anuncios</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Publicación</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estadísticas</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {post.is_pinned && (
                          <Pin className="h-4 w-4 text-yellow-500" />
                        )}
                        <div className="font-medium">{post.title}</div>
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {post.content.slice(0, 100)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {post.author?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="font-medium">
                        {post.author?.full_name || 'Usuario anónimo'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeBadgeColor(post.post_type || 'discussion')}>
                      {post.post_type === 'announcement' ? 'Anuncio' : 
                       post.post_type === 'question' ? 'Pregunta' : 'Discusión'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.category && (
                      <Badge 
                        style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                      >
                        {post.category.name}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        {post.views_count || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-400" />
                        {post.likes_count || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-blue-400" />
                        {post.comments_count || 0}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => togglePinPost(post.id, post.is_pinned || false)}
                      >
                        <Pin className={`h-4 w-4 ${post.is_pinned ? 'text-yellow-500' : 'text-gray-400'}`} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron publicaciones con los filtros aplicados.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
