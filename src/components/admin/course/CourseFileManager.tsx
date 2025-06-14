import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { FileUpload } from './FileUpload'
import { Folder, Image, Video, File, Download, Trash2 } from 'lucide-react'
import { useFileUpload } from '@/hooks/useFileUpload'

interface CourseFile {
  name: string
  url: string
  size: number
  type: string
  bucket: string
  created_at: string
}

interface CourseFileManagerProps {
  courseId: string
  instructorId: string
}

export function CourseFileManager({ courseId, instructorId }: CourseFileManagerProps) {
  const [files, setFiles] = useState<CourseFile[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { deleteFile } = useFileUpload()

  useEffect(() => {
    loadCourseFiles()
  }, [courseId])

  const loadCourseFiles = async () => {
    try {
      setLoading(true)
      
      // Get files from all buckets for this course
      const buckets = ['course-thumbnails', 'course-videos', 'course-materials']
      const allFiles: CourseFile[] = []

      for (const bucket of buckets) {
        const { data, error } = await supabase.storage
          .from(bucket)
          .list(`${instructorId}/courses/${courseId}`, {
            limit: 100,
            offset: 0,
          })

        if (error) {
          console.error(`Error loading files from ${bucket}:`, error)
          continue
        }

        if (data) {
          const bucketFiles = data
            .filter(file => file.name !== '.emptyFolderPlaceholder')
            .map(file => ({
              name: file.name,
              url: `https://mopzwfrbqbtrpcqnyzad.supabase.co/storage/v1/object/public/${bucket}/${instructorId}/courses/${courseId}/${file.name}`,
              size: file.metadata?.size || 0,
              type: file.metadata?.mimetype || 'unknown',
              bucket,
              created_at: file.created_at || '',
            }))

          allFiles.push(...bucketFiles)
        }
      }

      setFiles(allFiles)
    } catch (error: any) {
      console.error('Error loading course files:', error)
      toast({
        title: "Error al cargar archivos",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFile = async (file: CourseFile) => {
    const fileType = file.bucket === 'course-thumbnails' ? 'thumbnail' : 
                    file.bucket === 'course-videos' ? 'video' : 'material'
    
    const success = await deleteFile(file.url, fileType)
    if (success) {
      loadCourseFiles()
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (bucket: string) => {
    switch (bucket) {
      case 'course-thumbnails':
        return <Image className="h-5 w-5" />
      case 'course-videos':
        return <Video className="h-5 w-5" />
      case 'course-materials':
        return <File className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  const groupedFiles = {
    thumbnails: files.filter(f => f.bucket === 'course-thumbnails'),
    videos: files.filter(f => f.bucket === 'course-videos'),
    materials: files.filter(f => f.bucket === 'course-materials'),
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
          <Folder className="h-5 w-5" />
          Archivos del Curso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="thumbnails" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="thumbnails">
              Imágenes ({groupedFiles.thumbnails.length})
            </TabsTrigger>
            <TabsTrigger value="videos">
              Videos ({groupedFiles.videos.length})
            </TabsTrigger>
            <TabsTrigger value="materials">
              Materiales ({groupedFiles.materials.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="thumbnails" className="space-y-4">
            <FileUpload
              type="thumbnail"
              courseId={courseId}
              onUploadComplete={loadCourseFiles}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedFiles.thumbnails.map((file, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.bucket)}
                          <div>
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(file.url, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFile(file)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <FileUpload
              type="video"
              courseId={courseId}
              onUploadComplete={loadCourseFiles}
            />
            <div className="space-y-2">
              {groupedFiles.videos.map((file, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.bucket)}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)} • {file.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <FileUpload
              type="material"
              courseId={courseId}
              onUploadComplete={loadCourseFiles}
            />
            <div className="space-y-2">
              {groupedFiles.materials.map((file, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.bucket)}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)} • {file.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
