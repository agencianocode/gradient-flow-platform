import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
