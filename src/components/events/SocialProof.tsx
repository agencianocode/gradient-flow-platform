
import { Users, TrendingUp, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

export function SocialProof({ enrolled, maxStudents }) {
  const enrollmentPercentage = (enrolled / maxStudents) * 100

  return (
    <Card className="p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">¿Por qué elegir este evento?</h3>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="font-semibold text-lg">{enrolled} estudiantes inscritos</div>
            <div className="text-gray-600">Se llenan rápido nuestros eventos</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-lg">98% de satisfacción</div>
            <div className="text-gray-600">Valoraciones reales de estudiantes</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <div className="font-semibold text-lg">Certificado incluido</div>
            <div className="text-gray-600">Acredita tu conocimiento</div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Plazas ocupadas</span>
          <span className="text-sm text-gray-600">{enrolled}/{maxStudents}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${enrollmentPercentage}%` }}
          ></div>
        </div>
      </div>
    </Card>
  )
}
