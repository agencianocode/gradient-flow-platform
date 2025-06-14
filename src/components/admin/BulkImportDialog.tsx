
import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Download, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { useBulkImport, type ImportResult } from '@/hooks/useBulkImport'

interface BulkImportDialogProps {
  trigger?: React.ReactNode
}

export function BulkImportDialog({ trigger }: BulkImportDialogProps) {
  const [open, setOpen] = useState(false)
  const [importType, setImportType] = useState<string>('')
  const [csvData, setCsvData] = useState('')
  const [updateExisting, setUpdateExisting] = useState(false)
  const [skipErrors, setSkipErrors] = useState(true)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { loading, importData, parseCSV, validateData } = useBulkImport()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setCsvData(text)
      }
      reader.readAsText(file)
    }
  }

  const handleValidation = () => {
    if (!importType || !csvData) return

    const data = parseCSV(csvData)
    const validation = validateData(importType, data)
    setValidationErrors(validation.errors)
  }

  const handleImport = async () => {
    if (!importType || !csvData) return

    const data = parseCSV(csvData)
    const result = await importData(importType as any, data, {
      updateExisting,
      skipErrors
    })

    if (result) {
      setImportResult(result)
    }
  }

  const downloadTemplate = (type: string) => {
    let headers: string[] = []
    let example: string[] = []

    switch (type) {
      case 'categories':
        headers = ['name', 'description', 'color', 'icon']
        example = ['Programación', 'Cursos de desarrollo de software', '#3b82f6', 'code']
        break
      case 'courses':
        headers = ['title', 'description', 'instructor_id', 'category_id', 'level', 'price', 'duration_hours']
        example = ['Curso de React', 'Aprende React desde cero', 'uuid-del-instructor', 'uuid-de-categoria', 'beginner', '99.99', '10']
        break
      case 'lessons':
        headers = ['title', 'description', 'course_id', 'content_type', 'duration_minutes', 'is_preview']
        example = ['Introducción a React', 'Primera lección del curso', 'uuid-del-curso', 'video', '30', 'true']
        break
      case 'users':
        headers = ['email', 'password', 'full_name', 'user_type']
        example = ['usuario@example.com', 'password123', 'Juan Pérez', 'student']
        break
    }

    const csv = [headers.join(','), example.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `template_${type}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setImportType('')
    setCsvData('')
    setUpdateExisting(false)
    setSkipErrors(true)
    setValidationErrors([])
    setImportResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen)
      if (!newOpen) reset()
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Importación Masiva
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importación Masiva de Datos</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tipo de importación */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de datos</label>
            <Select value={importType} onValueChange={setImportType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de datos a importar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="categories">Categorías</SelectItem>
                <SelectItem value="courses">Cursos</SelectItem>
                <SelectItem value="lessons">Lecciones</SelectItem>
                <SelectItem value="users">Usuarios</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Descargar template */}
          {importType && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Plantilla CSV</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Descarga la plantilla CSV para el tipo de datos seleccionado
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadTemplate(importType)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Plantilla
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Subir archivo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Archivo CSV</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            <p className="text-xs text-muted-foreground">
              O pega el contenido CSV directamente en el campo de abajo
            </p>
          </div>

          {/* Contenido CSV */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Contenido CSV</label>
            <Textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              placeholder="Pega aquí el contenido de tu archivo CSV..."
              rows={8}
            />
          </div>

          {/* Opciones */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="updateExisting"
                checked={updateExisting}
                onCheckedChange={setUpdateExisting}
              />
              <label htmlFor="updateExisting" className="text-sm">
                Actualizar registros existentes (requiere ID)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipErrors"
                checked={skipErrors}
                onCheckedChange={setSkipErrors}
              />
              <label htmlFor="skipErrors" className="text-sm">
                Continuar aunque haya errores
              </label>
            </div>
          </div>

          {/* Validación */}
          {csvData && importType && (
            <div className="space-y-3">
              <Button onClick={handleValidation} variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Validar Datos
              </Button>

              {validationErrors.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-red-600 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Errores de Validación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-600">
                          • {error}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Resultado de importación */}
          {importResult && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Resultado de Importación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Badge variant="default">
                    {importResult.imported} importados
                  </Badge>
                  {importResult.errors.length > 0 && (
                    <Badge variant="destructive">
                      {importResult.errors.length} errores
                    </Badge>
                  )}
                </div>

                {importResult.errors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Errores:</h4>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {importResult.errors.map((error, index) => (
                        <div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                          Fila {error.index + 1}: {error.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleImport}
              disabled={!csvData || !importType || loading || validationErrors.length > 0}
              loading={loading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Importar Datos
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
