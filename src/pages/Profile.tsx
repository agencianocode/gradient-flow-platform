
import { Layout } from "@/components/layout/Layout"

const Profile = () => {
  return (
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

        <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Perfil de Usuario
          </h2>
          <p className="text-muted-foreground">
            Próximamente: Configuración completa del perfil de usuario.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
