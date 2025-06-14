
import { Layout } from "@/components/layout/Layout"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { AdminTabs } from "@/components/admin/AdminTabs"
import { AdminDebugPanel } from "@/components/admin/AdminDebugPanel"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useEffect } from "react"

const Admin = () => {
  const { profile, loading, user } = useAuth()

  useEffect(() => {
    console.log('🏠 Admin page - Estado actual:')
    console.log('  - Loading:', loading)
    console.log('  - User:', user ? `${user.email} (${user.id})` : 'null')
    console.log('  - Profile:', profile ? `${profile.user_type} - ${profile.full_name}` : 'null')
  }, [loading, user, profile])

  if (loading) {
    console.log('⏳ Admin page - Mostrando estado de carga')
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-muted-foreground">Cargando panel de administración...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!user) {
    console.log('🚫 Admin page - Sin usuario, redirigiendo a login')
    return <Navigate to="/login" replace />
  }

  if (!profile) {
    console.log('❌ Admin page - Sin datos de perfil')
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="max-w-md">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Error al cargar el perfil</h2>
                <p className="text-muted-foreground">
                  No se pudo cargar la información del perfil. Intenta recargar la página.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Panel de debug siempre visible cuando hay problemas */}
          <AdminDebugPanel />
        </div>
      </Layout>
    )
  }

  if (profile.user_type !== 'admin') {
    console.log('🔒 Admin page - Usuario no es admin:', profile.user_type)
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="max-w-md">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Acceso Denegado</h2>
                <p className="text-muted-foreground">
                  No tienes permisos para acceder al panel de administración.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Tipo de usuario actual: {profile.user_type}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Panel de debug para usuarios que no son admin */}
          <AdminDebugPanel />
        </div>
      </Layout>
    )
  }

  console.log('✅ Admin page - Renderizando panel de administración')

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona toda la plataforma desde aquí</p>
          </div>
          <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  Acceso de Administrador - {profile.full_name}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de debug solo visible para admins */}
        <AdminDebugPanel />

        <AdminDashboard />
        <AdminTabs />
      </div>
    </Layout>
  )
}

export default Admin
