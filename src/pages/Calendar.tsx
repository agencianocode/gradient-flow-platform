
import { Layout } from "@/components/layout/Layout"

const Calendar = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Calendario
          </h1>
          <p className="text-muted-foreground">
            Organiza tu aprendizaje con eventos y recordatorios
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Calendario de Aprendizaje
          </h2>
          <p className="text-muted-foreground">
            Próximamente: Vista de calendario completa con eventos, deadlines y recordatorios.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Calendar
