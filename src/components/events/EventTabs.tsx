
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, Play, Download, ExternalLink, Twitter, Linkedin } from "lucide-react"

export function EventTabs({ event }) {
  const [activeTab, setActiveTab] = useState('descripcion')

  const tabs = [
    { id: 'descripcion', label: 'Descripción', count: null },
    { id: 'agenda', label: 'Agenda', count: event.agenda.length },
    { id: 'instructor', label: 'Instructor', count: null },
    { id: 'reviews', label: 'Reviews', count: '4.9' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'descripcion' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">¿Qué aprenderás?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Descripción completa</h3>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Este masterclass intensivo te llevará desde cero hasta crear aplicaciones web completas 
                  usando Bubble, sin necesidad de escribir código. Aprenderás las mejores prácticas, 
                  patrones de diseño y técnicas avanzadas utilizadas por los profesionales.
                </p>
                <p className="mb-4">
                  Durante las 8 horas del evento, construiremos juntos 3 aplicaciones reales: 
                  un marketplace, una plataforma de cursos online y una app de productividad. 
                  Cada proyecto está diseñado para enseñarte diferentes aspectos de Bubble.
                </p>
                <p>
                  Al finalizar, tendrás el conocimiento y la confianza para crear tus propias 
                  aplicaciones y potencialmente convertir esto en una carrera profesional.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agenda' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Agenda del evento</h3>
            <div className="space-y-4">
              {event.agenda.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-purple-600 font-mono text-sm bg-white px-3 py-1 rounded-full">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'instructor' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Conoce a tu instructor</h3>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="w-32 h-32 mx-auto md:mx-0">
                  <AvatarImage src={event.instructor.avatar} />
                  <AvatarFallback className="text-2xl">{event.instructor.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold mb-2">{event.instructor.name}</h4>
                  <p className="text-lg text-purple-600 mb-4">{event.instructor.title}</p>
                  <p className="text-gray-700 mb-6">{event.instructor.bio}</p>
                  
                  <div className="flex justify-center md:justify-start gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{event.instructor.rating}</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{event.instructor.students}</div>
                      <div className="text-sm text-gray-600">Estudiantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">5+</div>
                      <div className="text-sm text-gray-600">Años exp.</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center md:justify-start gap-3">
                    <Button variant="outline" size="sm">
                      <Twitter className="w-4 h-4 mr-2" />
                      {event.instructor.socialLinks.twitter}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Lo que dicen nuestros estudiantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={`https://images.unsplash.com/photo-150000000${i}?w=100&h=100&fit=crop`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Usuario {i}</div>
                      <div className="text-sm text-gray-600">Hace 2 semanas</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">
                    "Excelente masterclass, muy bien estructurada y con ejemplos prácticos. 
                    Ahora puedo crear mis propias aplicaciones sin problemas."
                  </p>
                  <div className="text-yellow-500">★★★★★</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
