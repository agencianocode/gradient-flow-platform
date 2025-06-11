
import { Button } from "@/components/ui/button"
import { Search, Play } from "lucide-react"

export function EventsHero() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-pink-900/90">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Simulated video background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 floating-particles"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            Eventos que
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
              Transforman
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
            Masterclasses exclusivas, workshops prácticos y networking premium 
            con los mejores especialistas en No Code del mundo.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Explorar Eventos
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10">
              Ver Calendario
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating CTA */}
      <div className="absolute bottom-8 right-8 animate-float">
        <Button className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition-transform duration-300 shadow-glow">
          <Play className="w-6 h-6" />
        </Button>
      </div>
    </section>
  )
}
