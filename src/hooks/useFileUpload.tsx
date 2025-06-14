
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'

export type FileType = 'thumbnail' | 'video' | 'material'

interface UploadProgress {
  progress: number
  uploading: boolean
  error: string | null
}

export function useFileUpload() {
  const [uploads, setUploads] = useState<Record<string, UploadProgress>>({})
  const { toast } = useToast()
  const { user } = useAuth()

  const getBucketName = (type: FileType): string => {
    switch (type) {
      case 'thumbnail':
        return 'course-thumbnails'
      case 'video':
        return 'course-videos'
      case 'material':
        return 'course-materials'
    }
  }

  const validateFile = (file: File, type: FileType): boolean => {
    const limits = {
      thumbnail: { size: 5 * 1024 * 1024, types: ['image/jpeg', 'image/png', 'image/webp'] },
      video: { size: 500 * 1024 * 1024, types: ['video/mp4', 'video/webm', 'video/quicktime'] },
      material: { size: 50 * 1024 * 1024, types: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'] }
    }

    const limit = limits[type]
    
    if (file.size > limit.size) {
      toast({
        title: "Archivo muy grande",
        description: `El archivo debe ser menor a ${limit.size / (1024 * 1024)}MB`,
        variant: "destructive",
      })
      return false
    }

    if (!limit.types.includes(file.type)) {
      toast({
        title: "Tipo de archivo no válido",
        description: `Tipos permitidos: ${limit.types.join(', ')}`,
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const uploadFile = async (
    file: File,
    type: FileType,
    courseId?: string,
    lessonId?: string
  ): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Error de autenticación",
        description: "Debes estar logueado para subir archivos",
        variant: "destructive",
      })
      return null
    }

    if (!validateFile(file, type)) {
      return null
    }

    const uploadId = `${Date.now()}-${file.name}`
    const bucket = getBucketName(type)
    
    // Create file path with user folder structure
    let filePath = `${user.id}/${uploadId}`
    if (courseId) {
      filePath = `${user.id}/courses/${courseId}/${uploadId}`
      if (lessonId) {
        filePath = `${user.id}/courses/${courseId}/lessons/${lessonId}/${uploadId}`
      }
    }

    setUploads(prev => ({
      ...prev,
      [uploadId]: { progress: 0, uploading: true, error: null }
    }))

    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) throw error

      setUploads(prev => ({
        ...prev,
        [uploadId]: { progress: 100, uploading: false, error: null }
      }))

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      toast({
        title: "Archivo subido exitosamente",
        description: file.name,
      })

      return urlData.publicUrl
    } catch (error: any) {
      console.error('Upload error:', error)
      setUploads(prev => ({
        ...prev,
        [uploadId]: { progress: 0, uploading: false, error: error.message }
      }))

      toast({
        title: "Error al subir archivo",
        description: error.message,
        variant: "destructive",
      })

      return null
    }
  }

  const deleteFile = async (url: string, type: FileType): Promise<boolean> => {
    try {
      const bucket = getBucketName(type)
      // Extract path from URL
      const urlParts = url.split(`/storage/v1/object/public/${bucket}/`)
      if (urlParts.length < 2) throw new Error('Invalid URL format')
      
      const filePath = urlParts[1]

      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath])

      if (error) throw error

      toast({
        title: "Archivo eliminado",
        description: "El archivo se ha eliminado correctamente",
      })

      return true
    } catch (error: any) {
      console.error('Delete error:', error)
      toast({
        title: "Error al eliminar archivo",
        description: error.message,
        variant: "destructive",
      })
      return false
    }
  }

  return {
    uploads,
    uploadFile,
    deleteFile,
  }
}
