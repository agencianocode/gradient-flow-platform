
import { useState } from "react"
import { CalendarPlus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

interface CalendarEvent {
  title: string
  startDate: string
  endDate: string
  description?: string
  location?: string
}

interface CalendarIntegrationProps {
  event: CalendarEvent
  className?: string
}

export function CalendarIntegration({ event, className = "" }: CalendarIntegrationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const generateICS = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EduCommunity//Event//EN
BEGIN:VEVENT
DTSTART:${formatDate(event.startDate)}
DTEND:${formatDate(event.endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || ''}
END:VEVENT
END:VCALENDAR`
    
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${event.title.replace(/\s/g, '_')}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  const addToGoogleCalendar = () => {
    const startDate = formatDate(event.startDate)
    const endDate = formatDate(event.endDate)
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`
    window.open(url, '_blank')
  }

  const addToOutlook = () => {
    const startDate = new Date(event.startDate).toISOString()
    const endDate = new Date(event.endDate).toISOString()
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${startDate}&enddt=${endDate}&body=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`
    window.open(url, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`transition-all duration-300 hover:scale-105 hover:shadow-md ${className}`}
        >
          <CalendarPlus className="h-4 w-4 mr-2" />
          Añadir al calendario
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5" />
            Añadir al calendario
          </DialogTitle>
        </DialogHeader>
        
        {/* Event Preview */}
        <Card className="p-4 bg-muted/50">
          <h3 className="font-semibold mb-2">{event.title}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>📅 {new Date(event.startDate).toLocaleString('es-ES')}</p>
            {event.location && <p>📍 {event.location}</p>}
            {event.description && <p>📝 {event.description}</p>}
          </div>
        </Card>
        
        <div className="space-y-3">
          <Button
            onClick={addToGoogleCalendar}
            className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105"
          >
            <img 
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlecalendar.svg" 
              alt="Google Calendar"
              className="h-5 w-5 mr-3 filter invert"
            />
            Google Calendar
          </Button>
          
          <Button
            onClick={addToOutlook}
            className="w-full justify-start bg-blue-700 hover:bg-blue-800 text-white transition-all duration-300 hover:scale-105"
          >
            <img 
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftoutlook.svg" 
              alt="Outlook"
              className="h-5 w-5 mr-3 filter invert"
            />
            Outlook
          </Button>
          
          <Button
            onClick={generateICS}
            variant="outline"
            className="w-full justify-start transition-all duration-300 hover:scale-105"
          >
            <Download className="h-5 w-5 mr-3" />
            Descargar archivo .ics
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
