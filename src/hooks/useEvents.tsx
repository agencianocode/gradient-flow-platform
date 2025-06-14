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

  const getEventById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          instructor:profiles!instructor_id(full_name, avatar_url)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
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

      if (error) {
        // Handle specific validation errors from triggers
        if (error.message.includes('capacidad máxima')) {
          throw new Error('El evento ha alcanzado su capacidad máxima de asistentes')
        }
        throw error
      }

      toast({
        title: "¡Registro exitoso!",
        description: "Te has registrado al evento correctamente.",
      })

      fetchEvents() // Refresh events (attendee count will be updated automatically by trigger)
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

  // New function to create an event with validation handling
  const createEvent = async (eventData: any) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single()

      if (error) {
        // Handle specific validation errors from triggers
        if (error.message.includes('fecha del evento no puede ser en el pasado')) {
          throw new Error('La fecha del evento debe ser futura')
        }
        if (error.message.includes('duración del evento debe ser al menos 1 minuto')) {
          throw new Error('La duración mínima del evento es 1 minuto')
        }
        if (error.message.includes('máximo de asistentes debe ser mayor a 0')) {
          throw new Error('La capacidad máxima debe ser mayor a 0')
        }
        throw error
      }

      toast({
        title: "Evento creado",
        description: "El evento se ha creado correctamente.",
      })

      await fetchEvents()
      return { data, error: null }
    } catch (error: any) {
      console.error('Error creating event:', error)
      toast({
        title: "Error al crear evento",
        description: error.message,
        variant: "destructive",
      })
      return { data: null, error: error.message }
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    events,
    loading,
    fetchEvents,
    getEventById,
    registerForEvent,
    createEvent,
  }
}
