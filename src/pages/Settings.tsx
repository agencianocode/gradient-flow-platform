
import { Layout } from "@/components/layout/Layout"

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Configuración
          </h1>
          <p className="text-muted-foreground">
            Personaliza tu experiencia de aprendizaje
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Configuración de la Plataforma
          </h2>
          <p className="text-muted-foreground">
            Próximamente: Configuración completa de preferencias y ajustes.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
