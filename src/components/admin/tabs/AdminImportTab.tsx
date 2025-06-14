
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BulkImportDialog } from '@/components/admin/BulkImportDialog'
import { Upload, FileText, Users, BookOpen, FolderOpen } from 'lucide-react'

export function AdminImportTab() {
  const importTypes = [
    {
      type: 'categories',
      title: 'Categorías',
      description: 'Importar categorías de cursos',
      icon: FolderOpen,
      fields: ['name', 'description', 'color', 'icon']
    },
    {
      type: 'courses',
      title: 'Cursos',
      description: 'Importar cursos completos',
      icon: BookOpen,
      fields: ['title', 'description', 'instructor_id', 'category_id', 'level', 'price', 'duration_hours']
    },
    {
      type: 'lessons',
      title: 'Lecciones',
      description: 'Importar lecciones de cursos',
      icon: FileText,
      fields: ['title', 'description', 'course_id', 'content_type', 'duration_minutes', 'is_preview']
    },
    {
      type: 'users',
      title: 'Usuarios',
      description: 'Importar usuarios y perfiles',
      icon: Users,
      fields: ['email', 'password', 'full_name', 'user_type']
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Importación Masiva</h2>
          <p className="text-muted-foreground">
            Importa datos en lotes utilizando archivos CSV
          </p>
        </div>
        <BulkImportDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {importTypes.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.type}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {item.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Campos requeridos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.fields.map((field) => (
                        <span
                          key={field}
                          className="px-2 py-1 bg-muted text-xs rounded"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                  <BulkImportDialog
                    trigger={
                      <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Importar {item.title}
                      </button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instrucciones de Uso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Preparar datos</h4>
            <p className="text-sm text-muted-foreground">
              Descarga la plantilla CSV correspondiente al tipo de datos que quieres importar.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">2. Llenar información</h4>
            <p className="text-sm text-muted-foreground">
              Completa la plantilla con tus datos, asegurándote de incluir todos los campos requeridos.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">3. Validar datos</h4>
            <p className="text-sm text-muted-foreground">
              Antes de importar, usa la función de validación para detectar errores.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">4. Importar</h4>
            <p className="text-sm text-muted-foreground">
              Ejecuta la importación y revisa el resultado para verificar que todo se haya procesado correctamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
