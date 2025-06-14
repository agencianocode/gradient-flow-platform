
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface Event {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  instructor_id: string
  event_date: string
  duration_minutes: number
  max_attendees: number | null
  current_attendees: number
  price: number
  status: 'upcoming' | 'live' | 'completed' | 'cancelled'
  meeting_url: string | null
  created_at: string
  instructor?: {
    full_name: string
    avatar_url: string | null
  }
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          instructor:profiles!instructor_id(full_name, avatar_url)
        `)
        .in('status', ['upcoming', 'live'])
        .order('event_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error: any) {
      console.error('Error fetching events:', error)
      toast({
        title: "Error al cargar eventos",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const registerForEvent = async (eventId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          user_id: userId,
          event_id: eventId,
        })

      if (error) throw error

      // Update current attendees count manually
      const { data: currentEvent, error: fetchError } = await supabase
        .from('events')
        .select('current_attendees')
        .eq('id', eventId)
        .single()

      if (fetchError) throw fetchError

      const { error: updateError } = await supabase
        .from('events')
        .update({ 
          current_attendees: (currentEvent?.current_attendees || 0) + 1 
        })
        .eq('id', eventId)

      if (updateError) throw updateError

      toast({
        title: "¡Registro exitoso!",
        description: "Te has registrado al evento correctamente.",
      })

      fetchEvents() // Refresh events
      return { success: true }
    } catch (error: any) {
      toast({
        title: "Error en el registro",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    events,
    loading,
    fetchEvents,
    registerForEvent,
  }
}
