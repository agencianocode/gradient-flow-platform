import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Edit } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: string
  name: string
  color: string
  description?: string
}

interface CategoryManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoryManagementDialog({ open, onOpenChange }: CategoryManagementDialogProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState({ name: "", color: "#3b82f6", description: "" })
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchCategories()
    }
  }, [open])

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

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('categories')
        .insert({
          name: newCategory.name,
          color: newCategory.color,
          description: newCategory.description || null
        })

      if (error) throw error

      toast({
        title: "Categoría creada",
        description: "La categoría se ha creado correctamente.",
      })

      setNewCategory({ name: "", color: "#3b82f6", description: "" })
      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Error al crear categoría",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('categories')
        .update({
          name: editingCategory.name,
          color: editingCategory.color,
          description: editingCategory.description || null
        })
        .eq('id', editingCategory.id)

      if (error) throw error

      toast({
        title: "Categoría actualizada",
        description: "La categoría se ha actualizado correctamente.",
      })

      setEditingCategory(null)
      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Error al actualizar categoría",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) return

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)

      if (error) throw error

      toast({
        title: "Categoría eliminada",
        description: "La categoría se ha eliminado correctamente.",
      })

      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Error al eliminar categoría",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestión de Categorías</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create new category */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">Crear nueva categoría</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category-name">Nombre</Label>
                <Input
                  id="category-name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div>
                <Label htmlFor="category-color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="category-color"
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={newCategory.color}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="category-description">Descripción (opcional)</Label>
              <Input
                id="category-description"
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción de la categoría"
              />
            </div>
            <Button onClick={handleCreateCategory} disabled={loading || !newCategory.name.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Crear categoría
            </Button>
          </div>

          {/* Existing categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categorías existentes</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between border rounded-lg p-3">
                  {editingCategory?.id === category.id ? (
                    <div className="flex-1 grid grid-cols-3 gap-2 mr-4">
                      <Input
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory(prev => prev ? { ...prev, name: e.target.value } : null)}
                        placeholder="Nombre"
                      />
                      <Input
                        type="color"
                        value={editingCategory.color}
                        onChange={(e) => setEditingCategory(prev => prev ? { ...prev, color: e.target.value } : null)}
                        className="w-full"
                      />
                      <Input
                        value={editingCategory.description || ""}
                        onChange={(e) => setEditingCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                        placeholder="Descripción"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 flex-1">
                      <Badge style={{ backgroundColor: category.color + '20', color: category.color }}>
                        {category.name}
                      </Badge>
                      {category.description && (
                        <span className="text-sm text-gray-500">{category.description}</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {editingCategory?.id === category.id ? (
                      <>
                        <Button size="sm" onClick={handleUpdateCategory} disabled={loading}>
                          Guardar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingCategory(null)}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setEditingCategory(category)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
