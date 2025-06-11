
import { useState } from "react"
import { Plus, Image, Hash, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CreatePostFab() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const menuItems = [
    { icon: Image, label: "Foto", color: "text-blue-500" },
    { icon: Hash, label: "Pregunta", color: "text-green-500" },
    { icon: User, label: "Encuesta", color: "text-purple-500" },
    { icon: Settings, label: "Evento", color: "text-orange-500" }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Radial Menu Items */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-scale-in">
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-3"
              style={{
                transform: `translateY(-${(index + 1) * 60}px)`,
                animationDelay: `${index * 50}ms`
              }}
            >
              <span className="bg-background border border-border rounded-lg px-3 py-1 text-sm font-medium shadow-lg">
                {item.label}
              </span>
              <Button
                size="sm"
                className={`w-12 h-12 rounded-full shadow-lg ${item.color} bg-background hover:bg-accent border border-border`}
                onClick={() => {
                  console.log(`Creating ${item.label}`)
                  setIsExpanded(false)
                }}
              >
                <item.icon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={toggleExpanded}
        className={`w-14 h-14 rounded-full shadow-lg bg-gradient-primary hover:opacity-90 transition-all duration-300 ${
          isExpanded ? 'rotate-45' : 'hover:scale-110'
        }`}
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>
    </div>
  )
}
