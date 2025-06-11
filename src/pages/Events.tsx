
import { Layout } from "@/components/layout/Layout"
import { EventsHero } from "@/components/events/EventsHero"
import { EventsFilters } from "@/components/events/EventsFilters"
import { EventsGrid } from "@/components/events/EventsGrid"
import { FeaturedEvents } from "@/components/events/FeaturedEvents"

const Events = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <EventsHero />
        <FeaturedEvents />
        <div className="container max-w-screen-2xl mx-auto px-4 py-8">
          <EventsFilters />
          <EventsGrid />
        </div>
      </div>
    </Layout>
  )
}

export default Events
