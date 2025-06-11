
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { EventHero } from "@/components/events/EventHero"
import { EventBookingWidget } from "@/components/events/EventBookingWidget"
import { EventTabs } from "@/components/events/EventTabs"
import { EventTestimonials } from "@/components/events/EventTestimonials"
import { EventFAQ } from "@/components/events/EventFAQ"
import { CountdownTimer } from "@/components/events/CountdownTimer"
import { SocialProof } from "@/components/events/SocialProof"

const EventLanding = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)

  // Mock event data - in real app this would come from API
  useEffect(() => {
    const mockEvent = {
      id: id,
      title: "Bubble Masterclass: Apps sin código en 24 horas",
      description: "Aprende a crear aplicaciones web completas sin escribir una sola línea de código usando Bubble, la plataforma No-Code más poderosa del mercado.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
      video: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
      price: 299,
      originalPrice: 499,
      currency: "$",
      date: "2024-06-20T10:00:00Z",
      duration: "8 horas",
      enrolled: 234,
      maxStudents: 300,
      instructor: {
        name: "Ana García",
        title: "Bubble Expert & No-Code Consultant",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
        bio: "Más de 5 años creando aplicaciones No-Code para startups y empresas Fortune 500.",
        rating: 4.9,
        students: 1250,
        socialLinks: {
          twitter: "@anagarcia",
          linkedin: "ana-garcia-nocode"
        }
      },
      benefits: [
        "Domina Bubble desde cero hasta nivel avanzado",
        "Crea 3 aplicaciones reales durante la masterclass",
        "Acceso de por vida a la comunidad privada",
        "Certificado oficial de finalización"
      ],
      agenda: [
        { time: "10:00", title: "Introducción a Bubble", duration: "1h" },
        { time: "11:00", title: "Database & Data Types", duration: "2h" },
        { time: "13:00", title: "Break", duration: "1h" },
        { time: "14:00", title: "Workflows & Logic", duration: "2h" },
        { time: "16:00", title: "UI/UX Best Practices", duration: "1h" },
        { time: "17:00", title: "Deployment & Publishing", duration: "1h" }
      ]
    }
    setEvent(mockEvent)
  }, [id])

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <EventHero event={event} />
        
        {/* Countdown & Social Proof Section */}
        <section className="py-8 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <CountdownTimer endDate={event.date} />
              <SocialProof enrolled={event.enrolled} maxStudents={event.maxStudents} />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container max-w-screen-xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <EventTabs event={event} />
              <EventTestimonials />
              <EventFAQ />
            </div>
            
            {/* Booking Widget */}
            <div className="lg:col-span-1">
              <EventBookingWidget event={event} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EventLanding
