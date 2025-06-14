
import { Layout } from "@/components/layout/Layout"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { AdminTabs } from "@/components/admin/AdminTabs"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

const Admin = () => {
  const { profile, loading } = useAuth()

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    )
  }

  if (!profile || profile.user_type !== 'admin') {
    return <Navigate to="/" replace />
  }

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
                  Acceso de Administrador
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdminDashboard />
        <AdminTabs />
      </div>
    </Layout>
  )
}

export default Admin
