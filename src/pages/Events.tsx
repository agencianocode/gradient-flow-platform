
import { Layout } from "@/components/layout/Layout"
import { EventsHero } from "@/components/events/EventsHero"
import { EventsList } from "@/components/events/EventsList"

const Events = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <EventsHero />
        <div className="container max-w-screen-2xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Próximos Eventos
              </h2>
              <p className="text-muted-foreground">
                Descubre masterclasses exclusivas, workshops y eventos en vivo
              </p>
            </div>
            <EventsList />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Events
