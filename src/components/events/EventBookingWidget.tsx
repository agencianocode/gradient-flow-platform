
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Star, Shield, Gift } from "lucide-react"

export function EventBookingWidget({ event }) {
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBooking = async () => {
    setIsProcessing(true)
    // Simulate booking process
    setTimeout(() => {
      setIsProcessing(false)
      // Show success message
    }, 2000)
  }

  const totalPrice = event.price * quantity
  const savings = (event.originalPrice - event.price) * quantity

  return (
    <div className="sticky top-8">
      <Card className="p-6 shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
        {/* Price Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl text-gray-500 line-through">${event.originalPrice}</span>
            <Badge className="bg-green-500 text-white">
              {Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}% OFF
            </Badge>
          </div>
          <div className="text-4xl font-bold text-purple-600 mb-2">
            ${event.price}
          </div>
          <p className="text-sm text-gray-600">Por persona</p>
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>20 de Junio, 2024</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>10:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{event.enrolled}/{event.maxStudents} inscritos</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>4.9/5 ({event.instructor.students} reviews)</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Cantidad de tickets</label>
          <div className="flex items-center justify-between border rounded-lg p-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              -
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({quantity} tickets)</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Descuento</span>
            <span>-${savings}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleBooking}
          disabled={isProcessing}
          className="w-full btn-primary text-lg py-4 mb-4 hover:scale-105 transition-transform"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Procesando...
            </div>
          ) : (
            'Inscribirse Ahora'
          )}
        </Button>

        {/* Guarantees */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3" />
            <span>Garantía de devolución 30 días</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-3 h-3" />
            <span>Acceso de por vida al material</span>
          </div>
        </div>

        {/* Urgency Indicator */}
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2 text-orange-700">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              Solo quedan {event.maxStudents - event.enrolled} plazas
            </span>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(event.enrolled / event.maxStudents) * 100}%` }}
            ></div>
          </div>
        </div>
      </Card>
    </div>
  )
}
