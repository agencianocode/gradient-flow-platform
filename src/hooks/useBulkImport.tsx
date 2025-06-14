
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface BulkImportOptions {
  updateExisting?: boolean
  skipErrors?: boolean
}

export interface ImportResult {
  success: boolean
  imported: number
  errors: Array<{ index: number; error: string; data: any }>
  warnings: string[]
}

export function useBulkImport() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const importData = async (
    type: 'courses' | 'lessons' | 'categories' | 'users',
    data: any[],
    options: BulkImportOptions = {}
  ): Promise<ImportResult | null> => {
    try {
      setLoading(true)

      const { data: result, error } = await supabase.functions.invoke('bulk-import', {
        body: {
          type,
          data,
          options
        }
      })

      if (error) throw error

      toast({
        title: "Importación completada",
        description: `Se importaron ${result.imported} registros exitosamente${result.errors.length > 0 ? ` con ${result.errors.length} errores` : ''}`,
        variant: result.errors.length > 0 ? "destructive" : "default"
      })

      return result
    } catch (error: any) {
      console.error('Import error:', error)
      toast({
        title: "Error en la importación",
        description: error.message,
        variant: "destructive",
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.trim().split('\n')
    if (lines.length < 2) return []

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const data = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
      const row: any = {}
      
      headers.forEach((header, index) => {
        let value: any = values[index] || ''
        
        // Try to parse as JSON for arrays
        if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value)
          } catch {
            // Keep as string if JSON parsing fails
          }
        }
        
        // Convert numeric strings to numbers
        if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
          value = Number(value)
        }
        
        // Convert boolean strings
        if (value === 'true') value = true
        if (value === 'false') value = false
        
        row[header] = value === '' ? null : value
      })
      
      data.push(row)
    }

    return data
  }

  const validateData = (type: string, data: any[]): { valid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!data || data.length === 0) {
      errors.push('No hay datos para importar')
      return { valid: false, errors }
    }

    switch (type) {
      case 'categories':
        data.forEach((item, index) => {
          if (!item.name) errors.push(`Fila ${index + 1}: Nombre de categoría requerido`)
        })
        break
      case 'courses':
        data.forEach((item, index) => {
          if (!item.title) errors.push(`Fila ${index + 1}: Título del curso requerido`)
          if (!item.instructor_id) errors.push(`Fila ${index + 1}: ID del instructor requerido`)
        })
        break
      case 'lessons':
        data.forEach((item, index) => {
          if (!item.title) errors.push(`Fila ${index + 1}: Título de la lección requerido`)
          if (!item.course_id) errors.push(`Fila ${index + 1}: ID del curso requerido`)
        })
        break
      case 'users':
        data.forEach((item, index) => {
          if (!item.email) errors.push(`Fila ${index + 1}: Email requerido`)
          if (!item.password) errors.push(`Fila ${index + 1}: Contraseña requerida`)
        })
        break
    }

    return { valid: errors.length === 0, errors }
  }

  return {
    loading,
    importData,
    parseCSV,
    validateData
  }
}
