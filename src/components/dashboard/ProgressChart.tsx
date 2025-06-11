
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const weeklyData = [
  { day: 'Lun', horas: 2.5 },
  { day: 'Mar', horas: 3.2 },
  { day: 'Mié', horas: 1.8 },
  { day: 'Jue', horas: 4.1 },
  { day: 'Vie', horas: 2.9 },
  { day: 'Sáb', horas: 5.2 },
  { day: 'Dom', horas: 3.8 },
]

const skillsData = [
  { name: 'No Code', value: 45, color: '#8B5CF6' },
  { name: 'Bubble.io', value: 25, color: '#06B6D4' },
  { name: 'Webflow', value: 20, color: '#F97316' },
  { name: 'Zapier', value: 10, color: '#EC4899' },
]

export function ProgressChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Learning Hours */}
      <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Horas de Estudio Semanal
        </h3>
        
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="colorHoras" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)'
              }}
              labelStyle={{ color: '#1e293b' }}
            />
            <Area 
              type="monotone" 
              dataKey="horas" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorHoras)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Skills Distribution */}
      <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Distribución de Habilidades
        </h3>
        
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={skillsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {skillsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {skillsData.map((skill) => (
            <div key={skill.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              <span className="text-sm text-muted-foreground">
                {skill.name} ({skill.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
