
import { useEffect, useState, useRef } from 'react'
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
  const initialized = useRef(false)

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) return
    initialized.current = true

    console.log('🔄 useAuth - Inicializando estado de autenticación')
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('❌ useAuth - Error obteniendo sesión:', error)
        setLoading(false)
        return
      }
      
      console.log('📋 useAuth - Sesión inicial:', session ? 'Activa' : 'Inactiva')
      if (session?.user) {
        console.log('👤 useAuth - Usuario encontrado:', session.user.email)
      }
      
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
      console.log('🔄 useAuth - Cambio de estado:', event, session ? 'Sesión activa' : 'Sin sesión')
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
      initialized.current = false
    }
  }, [])

  const loadProfile = async (userId: string) => {
    try {
      console.log('👥 useAuth - Cargando perfil para usuario:', userId)
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('❌ useAuth - Error cargando perfil:', error)
        
        // Si el perfil no existe, intentar crearlo
        if (error.code === 'PGRST116') {
          console.log('👥 useAuth - Perfil no encontrado, intentando crear...')
          await createProfile(userId)
          return
        }
        
        throw error
      }
      
      console.log('✅ useAuth - Perfil cargado:', {
        id: data.id,
        email: data.email,
        user_type: data.user_type,
        full_name: data.full_name
      })
      setProfile(data)
    } catch (error: any) {
      console.error('❌ useAuth - Error en loadProfile:', error)
      toast({
        title: "Error al cargar perfil",
        description: "No se pudo cargar la información del perfil. Intenta refrescar la página.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (userId: string) => {
    try {
      console.log('👥 useAuth - Creando perfil para usuario:', userId)
      
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user?.email || '',
          full_name: user?.user_metadata?.full_name || 'Usuario',
          user_type: 'student'
        })
        .select()
        .single()

      if (error) {
        console.error('❌ useAuth - Error creando perfil:', error)
        throw error
      }

      console.log('✅ useAuth - Perfil creado:', data)
      setProfile(data)
    } catch (error: any) {
      console.error('❌ useAuth - Error en createProfile:', error)
      toast({
        title: "Error creando perfil",
        description: "No se pudo crear el perfil de usuario.",
        variant: "destructive",
      })
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('📝 useAuth - Intentando registro para:', email)
      
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
      console.error('❌ useAuth - Error en registro:', error)
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
      console.log('🔑 useAuth - Intentando login para:', email)
      
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
      console.error('❌ useAuth - Error en login:', error)
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
      console.log('🚪 useAuth - Cerrando sesión')
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })
    } catch (error: any) {
      console.error('❌ useAuth - Error cerrando sesión:', error)
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
      console.log('✏️ useAuth - Actualizando perfil:', updates)
      
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
      console.error('❌ useAuth - Error actualizando perfil:', error)
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
