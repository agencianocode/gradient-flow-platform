
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "¿Necesito experiencia previa en programación?",
    answer: "No, este curso está diseñado para principiantes completos. Comenzamos desde lo más básico y avanzamos paso a paso."
  },
  {
    question: "¿Qué incluye el precio del evento?",
    answer: "Incluye acceso al evento en vivo, grabaciones, materiales de apoyo, acceso a la comunidad privada y certificado de finalización."
  },
  {
    question: "¿Puedo ver las grabaciones después?",
    answer: "Sí, tendrás acceso de por vida a todas las grabaciones y materiales del curso."
  },
  {
    question: "¿Hay garantía de devolución?",
    answer: "Ofrecemos una garantía de devolución completa de 30 días sin preguntas."
  },
  {
    question: "¿El certificado tiene validez oficial?",
    answer: "Es un certificado de finalización emitido por nuestra academia, reconocido en la industria No-Code."
  }
]

export function EventFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mb-12">
      <h3 className="text-3xl font-bold text-center mb-8">Preguntas frecuentes</h3>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-6 pt-0 text-gray-700">
                {faq.answer}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
