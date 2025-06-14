
import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
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

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  profileError: string | null
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ success: boolean; error?: string }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const { toast } = useToast()
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    console.log('🔄 AuthProvider - Inicializando')
    
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 AuthProvider - Cambio de estado:', event, session ? 'Sesión activa' : 'Sin sesión')
      
      const newUser = session?.user ?? null
      setUser(newUser)
      
      if (newUser) {
        console.log('👤 AuthProvider - Usuario detectado, cargando perfil:', newUser.email)
        await loadProfile(newUser.id)
      } else {
        console.log('🚫 AuthProvider - Sin usuario, limpiando estado')
        setProfile(null)
        setProfileError(null)
        setLoading(false)
      }
    })

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('❌ AuthProvider - Error obteniendo sesión:', error)
          setLoading(false)
          return
        }
        
        console.log('📋 AuthProvider - Sesión inicial:', session ? 'Activa' : 'Inactiva')
        
        const initialUser = session?.user ?? null
        setUser(initialUser)
        
        if (initialUser) {
          await loadProfile(initialUser.id)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('❌ AuthProvider - Error en inicialización:', error)
        setLoading(false)
      }
    }

    initializeAuth()

    return () => {
      subscription.unsubscribe()
      initialized.current = false
    }
  }, [])

  const loadProfile = async (userId: string) => {
    try {
      console.log('👥 AuthProvider - Cargando perfil para:', userId)
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('👥 AuthProvider - Perfil no encontrado, creando...')
          await createProfile(userId)
          return
        }
        throw error
      }
      
      console.log('✅ AuthProvider - Perfil cargado:', data)
      setProfile(data)
      setProfileError(null)
    } catch (error: any) {
      console.error('❌ AuthProvider - Error cargando perfil:', error)
      setProfileError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      
      if (!user) throw new Error('No se pudo obtener datos del usuario')

      const newProfile = {
        id: userId,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || 'Usuario',
        user_type: 'student' as const
      }

      const { data, error } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single()

      if (error) throw error

      console.log('✅ AuthProvider - Perfil creado:', data)
      setProfile(data)
      setProfileError(null)
    } catch (error: any) {
      console.error('❌ AuthProvider - Error creando perfil:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('📝 AuthProvider - Registro para:', email)
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })

      if (error) throw error

      toast({
        title: "¡Registro exitoso!",
        description: "Por favor revisa tu email para confirmar tu cuenta.",
      })
      
      return { success: true }
    } catch (error: any) {
      console.error('❌ AuthProvider - Error en registro:', error)
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
      console.log('🔑 AuthProvider - Login para:', email)
      
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
      console.error('❌ AuthProvider - Error en login:', error)
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
      console.log('🚪 AuthProvider - Cerrando sesión')
      
      // Clear state first
      setUser(null)
      setProfile(null)
      setProfileError(null)
      setLoading(false)

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })

      // Force redirect to home
      window.location.href = '/'
    } catch (error: any) {
      console.error('❌ AuthProvider - Error cerrando sesión:', error)
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
      console.log('✏️ AuthProvider - Actualizando perfil:', updates)
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      await loadProfile(user.id)

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil se ha actualizado correctamente.",
      })

      return { success: true }
    } catch (error: any) {
      console.error('❌ AuthProvider - Error actualizando perfil:', error)
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
    console.log('🔄 AuthProvider - Refrescando perfil')
    setLoading(true)
    await loadProfile(user.id)
  }

  const value = {
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
