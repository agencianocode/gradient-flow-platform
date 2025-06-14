
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, Save, Database, Mail, Bell, Shield } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function AdminSettingsTab() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    siteName: "Learning Platform",
    siteDescription: "Plataforma de aprendizaje online con cursos y eventos",
    contactEmail: "admin@platform.com",
    allowRegistrations: true,
    requireEmailVerification: true,
    moderateComments: false,
    enableNotifications: true,
    maintenanceMode: false,
  })

  const saveSettings = () => {
    // Here you would normally save to a settings table in Supabase
    toast({
      title: "Configuración guardada",
      description: "Los cambios se han guardado correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nombre del Sitio</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email de Contacto</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Descripción del Sitio</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Configuración de Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowRegistrations">Permitir Registros</Label>
              <div className="text-sm text-gray-500">
                Permite que nuevos usuarios se registren en la plataforma
              </div>
            </div>
            <Switch
              id="allowRegistrations"
              checked={settings.allowRegistrations}
              onCheckedChange={(checked) => setSettings({...settings, allowRegistrations: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="requireEmailVerification">Verificación de Email Requerida</Label>
              <div className="text-sm text-gray-500">
                Los usuarios deben verificar su email antes de acceder
              </div>
            </div>
            <Switch
              id="requireEmailVerification"
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) => setSettings({...settings, requireEmailVerification: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="moderateComments">Moderar Comentarios</Label>
              <div className="text-sm text-gray-500">
                Los comentarios requieren aprobación antes de publicarse
              </div>
            </div>
            <Switch
              id="moderateComments"
              checked={settings.moderateComments}
              onCheckedChange={(checked) => setSettings({...settings, moderateComments: checked})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configuración de Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableNotifications">Habilitar Notificaciones</Label>
              <div className="text-sm text-gray-500">
                Enviar notificaciones por email a los usuarios
              </div>
            </div>
            <Switch
              id="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Mantenimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenanceMode">Modo Mantenimiento</Label>
              <div className="text-sm text-gray-500">
                Deshabilita el acceso para usuarios no administradores
              </div>
            </div>
            <Switch
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Acciones de Mantenimiento</h4>
              <p className="text-sm text-gray-500 mb-4">
                Estas acciones pueden afectar el rendimiento de la plataforma
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Limpiar Cache
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Emails Pendientes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
