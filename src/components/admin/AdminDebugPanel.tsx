
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, User, Shield, Database, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'

export function AdminDebugPanel() {
  const { user, profile, loading, profileError, refreshProfile } = useAuth()
  const [checking, setChecking] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const runDiagnostics = async () => {
    setChecking(true)
    console.log('🔍 Ejecutando diagnósticos...')
    
    try {
      const diagnostics: any = {
        timestamp: new Date().toISOString(),
        session: null,
        user: null,
        profile: null,
        supabaseConnection: false,
        profileQuery: null,
        errors: []
      }

      // Verificar sesión actual
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        diagnostics.session = {
          exists: !!sessionData.session,
          userId: sessionData.session?.user?.id,
          email: sessionData.session?.user?.email,
          error: sessionError?.message
        }
      } catch (error: any) {
        diagnostics.errors.push(`Error obteniendo sesión: ${error.message}`)
      }

      // Verificar usuario
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser()
        diagnostics.user = {
          exists: !!userData.user,
          id: userData.user?.id,
          email: userData.user?.email,
          error: userError?.message
        }
      } catch (error: any) {
        diagnostics.errors.push(`Error obteniendo usuario: ${error.message}`)
      }

      // Verificar conexión a Supabase
      try {
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        diagnostics.supabaseConnection = !error
        if (error) {
          diagnostics.errors.push(`Error conectando a Supabase: ${error.message}`)
        }
      } catch (error: any) {
        diagnostics.errors.push(`Error de conexión: ${error.message}`)
      }

      // Verificar perfil específico si hay usuario
      if (user?.id) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          diagnostics.profileQuery = {
            success: !profileError,
            data: profileData,
            error: profileError?.message,
            userType: profileData?.user_type
          }
        } catch (error: any) {
          diagnostics.errors.push(`Error obteniendo perfil: ${error.message}`)
        }
      }

      setDebugInfo(diagnostics)
      console.log('✅ Diagnósticos completados:', diagnostics)
      
    } catch (error: any) {
      console.error('❌ Error en diagnósticos:', error)
      setDebugInfo({ 
        error: error.message, 
        timestamp: new Date().toISOString() 
      })
    } finally {
      setChecking(false)
    }
  }

  const refreshAuth = async () => {
    console.log('🔄 Refrescando autenticación...')
    try {
      await supabase.auth.refreshSession()
      if (refreshProfile) {
        await refreshProfile()
      }
    } catch (error: any) {
      console.error('❌ Error refrescando sesión:', error)
    }
  }

  return (
    <Card className="border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <Shield className="h-5 w-5" />
          Panel de Diagnóstico Admin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Estado actual */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Estado de Autenticación</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {loading ? (
                  <Badge variant="secondary">
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Cargando...
                  </Badge>
                ) : user ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Autenticado
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="h-3 w-3 mr-1" />
                    No autenticado
                  </Badge>
                )}
              </div>
              {user && (
                <p className="text-xs text-muted-foreground">
                  Email: {user.email}
                </p>
              )}
              {profileError && (
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-600">Error de perfil</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Perfil de Usuario</h4>
            <div className="space-y-1">
              {profile ? (
                <div>
                  <Badge 
                    variant={profile.user_type === 'admin' ? 'default' : 'secondary'}
                    className={profile.user_type === 'admin' ? 'bg-purple-100 text-purple-800' : ''}
                  >
                    <User className="h-3 w-3 mr-1" />
                    {profile.user_type}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {profile.full_name}
                  </p>
                </div>
              ) : profileError ? (
                <Badge variant="destructive">Error en perfil</Badge>
              ) : (
                <Badge variant="outline">Cargando perfil...</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Información de debug */}
        {debugInfo && (
          <div className="space-y-2">
            <h4 className="font-medium">Información de Diagnóstico</h4>
            <div className="bg-muted p-3 rounded text-xs space-y-2">
              <div><strong>Timestamp:</strong> {debugInfo.timestamp}</div>
              
              {debugInfo.session && (
                <div>
                  <strong>Sesión:</strong> {debugInfo.session.exists ? 'Activa' : 'Inactiva'}
                  {debugInfo.session.error && (
                    <span className="text-red-600"> - Error: {debugInfo.session.error}</span>
                  )}
                </div>
              )}

              {debugInfo.profileQuery && (
                <div>
                  <strong>Consulta Perfil:</strong> {debugInfo.profileQuery.success ? 'Exitosa' : 'Fallida'}
                  {debugInfo.profileQuery.userType && (
                    <span> - Tipo: {debugInfo.profileQuery.userType}</span>
                  )}
                  {debugInfo.profileQuery.error && (
                    <span className="text-red-600"> - Error: {debugInfo.profileQuery.error}</span>
                  )}
                </div>
              )}

              <div>
                <strong>Conexión DB:</strong> {debugInfo.supabaseConnection ? 'OK' : 'Error'}
              </div>

              {debugInfo.errors.length > 0 && (
                <div className="text-red-600">
                  <strong>Errores:</strong>
                  <ul className="list-disc list-inside ml-2">
                    {debugInfo.errors.map((error: string, index: number) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controles */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={runDiagnostics} 
            disabled={checking}
            variant="outline"
            size="sm"
          >
            {checking ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Ejecutar Diagnóstico
              </>
            )}
          </Button>
          
          <Button 
            onClick={refreshAuth}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refrescar Sesión
          </Button>

          {refreshProfile && (
            <Button 
              onClick={refreshProfile}
              variant="outline"
              size="sm"
            >
              <User className="h-4 w-4 mr-2" />
              Recargar Perfil
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
