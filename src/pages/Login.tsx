
import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular login
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 bg-floating-particles opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">E</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de vuelta</h1>
            <p className="text-white/70">Inicia sesión en tu cuenta de EduCommunity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/30 focus:ring-4 transition-all duration-300"
                required
              />
              <label className={`absolute left-10 transition-all duration-300 pointer-events-none ${
                email ? 'top-0 text-xs text-purple-300 bg-white/10 px-2 rounded' : 'top-1/2 -translate-y-1/2 text-white/50'
              }`}>
                {email && 'Correo electrónico'}
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/30 focus:ring-4 transition-all duration-300"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                )}
              </button>
              <label className={`absolute left-10 transition-all duration-300 pointer-events-none ${
                password ? 'top-0 text-xs text-purple-300 bg-white/10 px-2 rounded' : 'top-1/2 -translate-y-1/2 text-white/50'
              }`}>
                {password && 'Contraseña'}
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="sr-only" />
                <div className="w-4 h-4 bg-white/10 border border-white/20 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded opacity-0 transition-opacity"></div>
                </div>
                <span className="ml-2 text-sm text-white/70">Recordarme</span>
              </label>
              <Link to="#" className="text-sm text-purple-300 hover:text-purple-200 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-glow hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </form>

          {/* OAuth Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/70">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Github className="w-5 h-5 mr-2" />
                Github
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Google
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-white/70">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
