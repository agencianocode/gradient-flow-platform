
import { Layout } from "@/components/layout/Layout"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { ProfileForm } from "@/components/profile/ProfileForm"

const Profile = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Mi Perfil
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu información personal y preferencias
            </p>
          </div>

          <ProfileForm />
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

export default Profile
