
import { Layout } from "@/components/layout/Layout"

const Notifications = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Notificaciones
          </h1>
          <p className="text-muted-foreground">
            Mantente al día con todas tus notificaciones
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Centro de Notificaciones
          </h2>
          <p className="text-muted-foreground">
            Próximamente: Centro completo de notificaciones y alertas.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Notifications
