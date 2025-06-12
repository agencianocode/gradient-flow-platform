
import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular registro
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 bg-floating-particles opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">E</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Únete a EduCommunity</h1>
            <p className="text-white/70">Crea tu cuenta y comienza a aprender</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/30 focus:ring-4 transition-all duration-300"
                required
              />
              <label className={`absolute left-10 transition-all duration-300 pointer-events-none ${
                formData.name ? 'top-0 text-xs text-orange-300 bg-white/10 px-2 rounded' : 'top-1/2 -translate-y-1/2 text-white/50'
              }`}>
                {formData.name && 'Nombre completo'}
              </label>
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/30 focus:ring-4 transition-all duration-300"
                required
              />
              <label className={`absolute left-10 transition-all duration-300 pointer-events-none ${
                formData.email ? 'top-0 text-xs text-orange-300 bg-white/10 px-2 rounded' : 'top-1/2 -translate-y-1/2 text-white/50'
              }`}>
                {formData.email && 'Correo electrónico'}
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/30 focus:ring-4 transition-all duration-300"
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
                formData.password ? 'top-0 text-xs text-orange-300 bg-white/10 px-2 rounded' : 'top-1/2 -translate-y-1/2 text-white/50'
              }`}>
                {formData.password && 'Contraseña'}
              </label>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/30 focus:ring-4 transition-all duration-300"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                )}
              </button>
              <label className={`absolute left-10 transition-all duration-300 pointer-events-none ${
                formData.confirmPassword ? 'top-0 text-xs text-orange-300 bg-white/10 px-2 rounded' : 'top-1/2 -translate-y-1/2 text-white/50'
              }`}>
                {formData.confirmPassword && 'Confirmar contraseña'}
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-secondary hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-glow hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Crear Cuenta'
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
                <span className="px-2 bg-transparent text-white/70">O regístrate con</span>
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
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-orange-300 hover:text-orange-200 font-semibold transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
