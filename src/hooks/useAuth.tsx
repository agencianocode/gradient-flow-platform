
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
  const [profileError, setProfileError] = useState<string | null>(null)
  const { toast } = useToast()
  const initialized = useRef(false)
  const retryCount = useRef(0)
  const maxRetries = 3

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) return
    initialized.current = true

    console.log('🔄 useAuth - Inicializando estado de autenticación')
    
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 useAuth - Cambio de estado:', event, session ? 'Sesión activa' : 'Sin sesión')
      
      const newUser = session?.user ?? null
      setUser(newUser)
      
      if (newUser) {
        console.log('👤 useAuth - Usuario detectado, cargando perfil:', newUser.email)
        await loadProfileWithRetry(newUser.id)
      } else {
        console.log('🚫 useAuth - No hay usuario, limpiando estado')
        setProfile(null)
        setProfileError(null)
        setLoading(false)
      }
    })

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('❌ useAuth - Error obteniendo sesión:', error)
        setLoading(false)
        return
      }
      
      console.log('📋 useAuth - Sesión inicial:', session ? 'Activa' : 'Inactiva')
      if (session?.user) {
        console.log('👤 useAuth - Usuario encontrado en sesión inicial:', session.user.email)
      }
      
      const initialUser = session?.user ?? null
      setUser(initialUser)
      
      if (initialUser) {
        loadProfileWithRetry(initialUser.id)
      } else {
        setLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
      initialized.current = false
    }
  }, [])

  const loadProfileWithRetry = async (userId: string) => {
    console.log(`🔄 useAuth - Intento ${retryCount.current + 1}/${maxRetries} de cargar perfil para:`, userId)
    
    try {
      const profile = await loadProfile(userId)
      if (profile) {
        setProfile(profile)
        setProfileError(null)
        retryCount.current = 0
        console.log('✅ useAuth - Perfil cargado exitosamente')
      } else {
        throw new Error('Perfil no encontrado después de intentar crearlo')
      }
    } catch (error: any) {
      console.error(`❌ useAuth - Error en intento ${retryCount.current + 1}:`, error)
      
      if (retryCount.current < maxRetries - 1) {
        retryCount.current++
        console.log(`🔄 useAuth - Reintentando en 1 segundo...`)
        setTimeout(() => {
          loadProfileWithRetry(userId)
        }, 1000)
        return
      }
      
      // Después de todos los reintentos fallidos
      console.error('❌ useAuth - Todos los reintentos fallaron')
      setProfileError(error.message)
      toast({
        title: "Error de perfil",
        description: "No se pudo cargar el perfil de usuario. Intenta refrescar la página.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadProfile = async (userId: string): Promise<Profile | null> => {
    console.log('👥 useAuth - Consultando perfil en base de datos para:', userId)
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('❌ useAuth - Error consultando perfil:', error)
      
      // Si el perfil no existe, intentar crearlo
      if (error.code === 'PGRST116') {
        console.log('👥 useAuth - Perfil no encontrado, intentando crear...')
        return await createProfile(userId)
      }
      
      throw error
    }
    
    console.log('✅ useAuth - Perfil encontrado:', {
      id: data.id,
      email: data.email,
      user_type: data.user_type,
      full_name: data.full_name
    })
    
    return data
  }

  const createProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log('👥 useAuth - Creando perfil automáticamente para:', userId)
      
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      
      if (!user) {
        throw new Error('No se pudo obtener datos del usuario para crear perfil')
      }

      const newProfile = {
        id: userId,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'Usuario',
        user_type: 'student' as const
      }

      console.log('👥 useAuth - Datos para nuevo perfil:', newProfile)
      
      const { data, error } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single()

      if (error) {
        console.error('❌ useAuth - Error creando perfil:', error)
        throw error
      }

      console.log('✅ useAuth - Perfil creado exitosamente:', data)
      return data
    } catch (error: any) {
      console.error('❌ useAuth - Error en createProfile:', error)
      throw error
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

      // Limpiar estado local
      setUser(null)
      setProfile(null)
      setProfileError(null)
      retryCount.current = 0

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
      await loadProfileWithRetry(user.id)

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

  const refreshProfile = async () => {
    if (!user) return
    console.log('🔄 useAuth - Refrescando perfil manualmente')
    setLoading(true)
    retryCount.current = 0
    await loadProfileWithRetry(user.id)
  }

  return {
    user,
    profile,
    loading,
    profileError,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  }
}
