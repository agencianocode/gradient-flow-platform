
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, MapPin, Globe, Save } from "lucide-react"

export function ProfileForm() {
  const { profile, updateProfile, loading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    user_type: profile?.user_type || "student"
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await updateProfile(formData)
    setIsSubmitting(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="h-32 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Información del Perfil
        </CardTitle>
        <CardDescription>
          Actualiza tu información personal y preferencias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-lg">
                {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">Foto de perfil</p>
              <p className="text-sm text-muted-foreground">
                Próximamente: Subida de avatar personalizado
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nombre completo</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {profile?.email}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Cuéntanos sobre ti..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">
                <MapPin className="h-4 w-4 inline mr-1" />
                Ubicación
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Tu ciudad, país"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">
                <Globe className="h-4 w-4 inline mr-1" />
                Sitio web
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://tusitio.com"
                type="url"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo de usuario</Label>
            <Select
              value={formData.user_type}
              onValueChange={(value) => handleChange("user_type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Estudiante</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
