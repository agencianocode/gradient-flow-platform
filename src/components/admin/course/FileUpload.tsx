
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, File, Image, Video } from 'lucide-react'
import { useFileUpload, type FileType } from '@/hooks/useFileUpload'

interface FileUploadProps {
  type: FileType
  onUploadComplete: (url: string) => void
  currentFile?: string
  courseId?: string
  lessonId?: string
  className?: string
}

export function FileUpload({ 
  type, 
  onUploadComplete, 
  currentFile, 
  courseId, 
  lessonId,
  className = ""
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { uploads, uploadFile, deleteFile } = useFileUpload()

  const getIcon = () => {
    switch (type) {
      case 'thumbnail':
        return <Image className="h-8 w-8" />
      case 'video':
        return <Video className="h-8 w-8" />
      case 'material':
        return <File className="h-8 w-8" />
    }
  }

  const getAcceptTypes = () => {
    switch (type) {
      case 'thumbnail':
        return 'image/jpeg,image/png,image/webp'
      case 'video':
        return 'video/mp4,video/webm,video/quicktime'
      case 'material':
        return 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain'
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case 'thumbnail':
        return 'imagen'
      case 'video':
        return 'video'
      case 'material':
        return 'material'
    }
  }

  const handleFileSelect = async (file: File) => {
    const url = await uploadFile(file, type, courseId, lessonId)
    if (url) {
      onUploadComplete(url)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveCurrent = async () => {
    if (currentFile) {
      const success = await deleteFile(currentFile, type)
      if (success) {
        onUploadComplete('')
      }
    }
  }

  const isUploading = Object.values(uploads).some(upload => upload.uploading)
  const uploadProgress = Object.values(uploads).find(upload => upload.uploading)?.progress || 0

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptTypes()}
        onChange={handleInputChange}
        className="hidden"
      />

      {currentFile ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getIcon()}
                <div>
                  <p className="text-sm font-medium">Archivo actual</p>
                  <p className="text-xs text-muted-foreground">
                    {currentFile.split('/').pop()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveCurrent}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-gray-400'
          } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              {getIcon()}
              <div>
                <p className="text-sm font-medium">
                  Subir {getTypeLabel()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Arrastra aquí o haz clic para seleccionar
                </p>
              </div>
              {isUploading && (
                <div className="w-full max-w-xs">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Subiendo... {uploadProgress}%
                  </p>
                </div>
              )}
              <Button variant="outline" size="sm" disabled={isUploading}>
                <Upload className="h-4 w-4 mr-2" />
                Seleccionar archivo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
