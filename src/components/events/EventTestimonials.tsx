
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Emprendedora",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    rating: 5,
    text: "Increíble la calidad del contenido. En solo 8 horas aprendí más de lo que esperaba. Ahora tengo mi propia app funcionando.",
    course: "Bubble Masterclass"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    role: "Desarrollador",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "Ana es una excelente instructora. Los ejemplos prácticos me ayudaron a entender conceptos complejos de forma sencilla.",
    course: "Bubble Masterclass"
  },
  {
    id: 3,
    name: "Laura Martín",
    role: "Diseñadora UX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "Perfecto para comenzar en el mundo No-Code. La metodología es clara y los proyectos muy bien pensados.",
    course: "Bubble Masterclass"
  }
]

export function EventTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="mb-12">
      <h3 className="text-3xl font-bold text-center mb-8">Lo que dicen nuestros estudiantes</h3>
      
      <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-xl">
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-300" />
          
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={testimonials[currentIndex].avatar} />
                <AvatarFallback>{testimonials[currentIndex].name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                <div className="text-yellow-500">
                  {'★'.repeat(testimonials[currentIndex].rating)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-purple-500 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
