
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { Category, CourseLevel, CourseFormData } from "@/types/course"

interface CourseFormProps {
  categories: Category[]
  onCourseCreated: () => void
}

export function CourseForm({ categories, onCourseCreated }: CourseFormProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    category_id: "",
    level: "beginner",
    price: 0,
    duration_hours: 0,
    thumbnail_url: "",
    preview_video_url: "",
    requirements: "",
    what_you_learn: "",
  })

  const createCourse = async () => {
    try {
      const { data: profile } = await supabase.auth.getUser()
      if (!profile.user) throw new Error('No user found')

      const requirements = formData.requirements ? formData.requirements.split('\n').filter(r => r.trim()) : null
      const whatYouLearn = formData.what_you_learn ? formData.what_you_learn.split('\n').filter(w => w.trim()) : null

      const { error } = await supabase
        .from('courses')
        .insert({
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id || null,
          level: formData.level,
          price: formData.price,
          duration_hours: formData.duration_hours,
          thumbnail_url: formData.thumbnail_url || null,
          preview_video_url: formData.preview_video_url || null,
          requirements,
          what_you_learn: whatYouLearn,
          instructor_id: profile.user.id,
          status: 'published'
        })

      if (error) throw error

      toast({
        title: "Curso creado",
        description: "El curso se ha creado correctamente.",
      })

      setIsCreateDialogOpen(false)
      setFormData({
        title: "",
        description: "",
        category_id: "",
        level: "beginner",
        price: 0,
        duration_hours: 0,
        thumbnail_url: "",
        preview_video_url: "",
        requirements: "",
        what_you_learn: "",
      })
      onCourseCreated()
    } catch (error: any) {
      toast({
        title: "Error al crear curso",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Crear Curso
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Curso</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Curso</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Título del curso"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Descripción del curso"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Nivel</Label>
              <Select value={formData.level} onValueChange={(value: CourseLevel) => setFormData({...formData, level: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="advanced">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Precio ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (horas)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration_hours}
                onChange={(e) => setFormData({...formData, duration_hours: Number(e.target.value)})}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thumbnail">URL de Imagen</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preview">URL del Video Preview</Label>
              <Input
                id="preview"
                value={formData.preview_video_url}
                onChange={(e) => setFormData({...formData, preview_video_url: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requisitos (uno por línea)</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              placeholder="Conocimientos básicos de..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learn">Qué aprenderás (uno por línea)</Label>
            <Textarea
              id="learn"
              value={formData.what_you_learn}
              onChange={(e) => setFormData({...formData, what_you_learn: e.target.value})}
              placeholder="Crear aplicaciones web..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={createCourse}>
              Crear Curso
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
