
import { ReactNode } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down'
  }
  icon: ReactNode
  gradient: 'primary' | 'secondary' | 'success' | 'warning'
}

export function StatsCard({ title, value, change, icon, gradient }: StatsCardProps) {
  const gradientClasses = {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary', 
    success: 'bg-gradient-success',
    warning: 'bg-gradient-warning',
  }

  const glowClasses = {
    primary: 'hover:shadow-purple-500/20',
    secondary: 'hover:shadow-orange-500/20',
    success: 'hover:shadow-green-500/20', 
    warning: 'hover:shadow-yellow-500/20',
  }

  return (
    <div className={`
      group relative overflow-hidden
      bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-6
      transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${glowClasses[gradient]}
    `}>
      {/* Background gradient effect */}
      <div className={`
        absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-2xl
        ${gradientClasses[gradient]}
        group-hover:opacity-20 transition-opacity duration-300
      `} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${gradientClasses[gradient]}
            shadow-lg group-hover:scale-110 transition-transform duration-300
          `}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          
          {change && (
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
              ${change.trend === 'up' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              }
            `}>
              {change.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{change.value}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {value}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            {title}
          </p>
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </div>
  )
}
