
import { Layout } from "@/components/layout/Layout"
import { SettingsForm } from "@/components/settings/SettingsForm"

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

        <SettingsForm />
      </div>
    </Layout>
  )
}

export default Settings
