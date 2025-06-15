
import { Layout } from "@/components/layout/Layout"
import { AdminTabs } from "@/components/admin/AdminTabs"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"

const Admin = () => {
  const { profile } = useAuth()

  if (!profile || profile.user_type !== 'admin') {
    return <Navigate to="/" replace />
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">
            Gestiona usuarios, cursos, eventos y configuración del sistema
          </p>
        </div>

        <AdminTabs />
      </div>
    </Layout>
  )
}

export default Admin
