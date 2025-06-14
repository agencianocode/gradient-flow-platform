
import { useAuth } from "@/hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom"
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, profile, loading, profileError, refreshProfile } = useAuth()
  const location = useLocation()

  // Mostrar loading mientras se inicializa la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Redirigir al login si no hay usuario
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Manejar error de perfil
  if (profileError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Error al cargar perfil</h2>
            <p className="text-muted-foreground mb-4">
              {profileError}
            </p>
            <div className="space-y-2">
              <Button onClick={refreshProfile} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Recargar página
              </Button>
            </div>
            <div className="mt-4 p-3 bg-muted rounded text-xs text-left">
              <div><strong>Usuario:</strong> {user.email}</div>
              <div><strong>ID:</strong> {user.id}</div>
              <div><strong>Error:</strong> {profileError}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Si no hay perfil pero tampoco hay error, seguir esperando
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-muted-foreground">Cargando perfil de usuario...</p>
        </div>
      </div>
    )
  }

  // Todo está bien, mostrar el contenido protegido
  return <>{children}</>
}
