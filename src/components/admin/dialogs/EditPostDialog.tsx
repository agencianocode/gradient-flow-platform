
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { CommunityPost } from "@/types/community"

interface EditPostDialogProps {
  post: CommunityPost | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onPostUpdated: () => void
}

export function EditPostDialog({ post, open, onOpenChange, onPostUpdated }: EditPostDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [postType, setPostType] = useState<'discussion' | 'question' | 'announcement'>('discussion')
  const [categoryId, setCategoryId] = useState<string>("")
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setPostType(post.post_type)
      setCategoryId(post.category_id || "")
    }
  }, [post])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error: any) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSave = async () => {
    if (!post) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('community_posts')
        .update({
          title,
          content,
          post_type: postType,
          category_id: categoryId || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id)

      if (error) throw error

      toast({
        title: "Post actualizado",
        description: "El post se ha actualizado correctamente.",
      })

      onPostUpdated()
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error al actualizar post",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Publicación</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la publicación"
            />
          </div>

          <div>
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenido de la publicación"
              rows={6}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="post-type">Tipo de publicación</Label>
              <Select value={postType} onValueChange={(value: any) => setPostType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discussion">Discusión</SelectItem>
                  <SelectItem value="question">Pregunta</SelectItem>
                  <SelectItem value="announcement">Anuncio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin categoría</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
