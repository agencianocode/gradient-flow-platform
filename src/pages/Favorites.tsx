
import { Layout } from "@/components/layout/Layout"

const Favorites = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Favoritos
          </h1>
          <p className="text-muted-foreground">
            Tus cursos y contenido favorito
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Contenido Favorito
          </h2>
          <p className="text-muted-foreground">
            Próximamente: Lista de cursos y contenido marcado como favorito.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Favorites
