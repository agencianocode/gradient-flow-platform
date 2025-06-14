
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import Settings from '@/pages/Settings'
import Courses from '@/pages/Courses'
import Events from '@/pages/Events'
import EventLanding from '@/pages/EventLanding'
import Community from '@/pages/Community'
import Blog from '@/pages/Blog'
import Favorites from '@/pages/Favorites'
import Notifications from '@/pages/Notifications'
import Calendar from '@/pages/Calendar'
import Admin from '@/pages/Admin'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="lovable-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventLanding />} />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
