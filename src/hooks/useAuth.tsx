
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  user_type: 'student' | 'instructor' | 'admin'
  location: string | null
  website: string | null
  created_at: string
  updated_at: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      toast({
        title: "¡Registro exitoso!",
        description: "Por favor revisa tu email para confirmar tu cuenta.",
      })
      
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

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      })

      return { success: true }
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { success: false, error: 'No user logged in' }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      // Refresh profile
      await loadProfile(user.id)

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil se ha actualizado correctamente.",
      })

      return { success: true }
    } catch (error: any) {
      toast({
        title: "Error al actualizar perfil",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }
}
