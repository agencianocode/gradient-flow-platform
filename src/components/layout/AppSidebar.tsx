
import { NavLink, useLocation } from "react-router-dom"
import { 
  Home, 
  Book, 
  User, 
  Settings, 
  Calendar,
  Bell,
  Star,
  Grid
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Mis Cursos", url: "/courses", icon: Book },
  { title: "Calendario", url: "/calendar", icon: Calendar },
  { title: "Notificaciones", url: "/notifications", icon: Bell },
]

const accountItems = [
  { title: "Perfil", url: "/profile", icon: User },
  { title: "Favoritos", url: "/favorites", icon: Star },
  { title: "Configuración", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  const getNavClassName = (path: string) => {
    const active = isActive(path)
    return `
      group relative flex items-center px-3 py-2.5 rounded-xl transition-all duration-300
      ${active 
        ? 'bg-gradient-primary text-white shadow-lg shadow-purple-500/25' 
        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
      }
      ${!collapsed ? 'justify-start' : 'justify-center'}
    `
  }

  return (
    <Sidebar
      className={`
        ${collapsed ? 'w-16' : 'w-64'} 
        transition-all duration-300 ease-in-out
        border-r border-sidebar-border/50
        bg-gradient-to-b from-sidebar-background to-sidebar-background/80
        backdrop-blur-lg
      `}
      collapsible="icon"
    >
      {/* Logo y trigger */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border/50">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Grid className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
              NoCode
            </span>
          </div>
        )}
        <SidebarTrigger className="ml-auto" />
      </div>

      <SidebarContent className="px-3 py-4">
        {/* Navegación principal */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? 'sr-only' : ''} text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2`}>
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'} flex-shrink-0`} />
                      {!collapsed && (
                        <span className="font-medium truncate">{item.title}</span>
                      )}
                      {isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-10" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Cuenta */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={`${collapsed ? 'sr-only' : ''} text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2`}>
            Cuenta
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'} flex-shrink-0`} />
                      {!collapsed && (
                        <span className="font-medium truncate">{item.title}</span>
                      )}
                      {isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-10" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Progreso del usuario (solo visible cuando no está colapsado) */}
        {!collapsed && (
          <div className="mt-8 p-4 bg-gradient-secondary/10 rounded-xl border border-orange-200/20">
            <div className="text-sm font-semibold text-foreground mb-2">
              Progreso Mensual
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div className="bg-gradient-secondary h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground">
              68% completado este mes
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
