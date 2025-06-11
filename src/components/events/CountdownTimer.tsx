
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endDate).getTime()
      const difference = end - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <Card className="p-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <h3 className="text-2xl font-bold mb-6">¡Evento en vivo pronto!</h3>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="text-4xl font-bold mb-2 bg-white/20 rounded-lg py-4">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm uppercase tracking-wider opacity-80">
              {unit === 'days' ? 'Días' : 
               unit === 'hours' ? 'Horas' : 
               unit === 'minutes' ? 'Min' : 'Seg'}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
