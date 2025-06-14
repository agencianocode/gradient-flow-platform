import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Settings, Bell, Shield, Trash2, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SettingsForm() {
  const { signOut } = useAuth()
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseReminders: true,
    eventNotifications: true,
    communityUpdates: false,
    darkMode: false,
    publicProfile: true,
    showProgress: true
  })

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast({
      title: "Configuración actualizada",
      description: "Los cambios se han guardado correctamente.",
    })
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Funcionalidad no disponible",
      description: "La eliminación de cuenta estará disponible próximamente.",
      variant: "destructive"
    })
  }

  return (
    <div className="space-y-6">
      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificaciones
          </CardTitle>
          <CardDescription>
            Configura cómo y cuándo quieres recibir notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones por email</Label>
              <p className="text-sm text-muted-foreground">
                Recibe actualizaciones importantes por correo
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(value) => handleSettingChange("emailNotifications", value)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones push</Label>
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones en tiempo real
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(value) => handleSettingChange("pushNotifications", value)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recordatorios de cursos</Label>
              <p className="text-sm text-muted-foreground">
                Avisos sobre nuevas lecciones y deadlines
              </p>
            </div>
            <Switch
              checked={settings.courseReminders}
              onCheckedChange={(value) => handleSettingChange("courseReminders", value)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones de eventos</Label>
              <p className="text-sm text-muted-foreground">
                Alertas sobre eventos próximos
              </p>
            </div>
            <Switch
              checked={settings.eventNotifications}
              onCheckedChange={(value) => handleSettingChange("eventNotifications", value)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Actualizaciones de comunidad</Label>
              <p className="text-sm text-muted-foreground">
                Notificaciones sobre actividad en posts
              </p>
            </div>
            <Switch
              checked={settings.communityUpdates}
              onCheckedChange={(value) => handleSettingChange("communityUpdates", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacidad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacidad
          </CardTitle>
          <CardDescription>
            Controla la visibilidad de tu información
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Perfil público</Label>
              <p className="text-sm text-muted-foreground">
                Permite que otros usuarios vean tu perfil
              </p>
            </div>
            <Switch
              checked={settings.publicProfile}
              onCheckedChange={(value) => handleSettingChange("publicProfile", value)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mostrar progreso</Label>
              <p className="text-sm text-muted-foreground">
                Muestra tu progreso en cursos públicamente
              </p>
            </div>
            <Switch
              checked={settings.showProgress}
              onCheckedChange={(value) => handleSettingChange("showProgress", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Acciones de cuenta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Cuenta
          </CardTitle>
          <CardDescription>
            Gestiona tu cuenta y datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full justify-start"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Cuenta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminarán permanentemente
                  todos tus datos y tu acceso a la plataforma.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>
                  Eliminar Cuenta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
