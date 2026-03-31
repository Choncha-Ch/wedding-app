import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from './components/ScrollToTop';

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Welcome from "./pages/Welcome"; 
import Index from "./pages/Index";
import RSVP from "./pages/RSVP";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Calendar from "./pages/Calendar";
import Venues from "./pages/Venues";
import VenueDetail from "./pages/VenueDetail";
import Travel from "./pages/Travel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Welcome />} />

        {/* PROTECTED ROUTES: Only accessible after verification */}
        <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/rsvp" element={<ProtectedRoute><RSVP /></ProtectedRoute>} />
        <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
        <Route path="/activities/:id" element={<ProtectedRoute><ActivityDetail /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/venues" element={<ProtectedRoute><Venues /></ProtectedRoute>} />
        <Route path="/venues/:id" element={<ProtectedRoute><VenueDetail /></ProtectedRoute>} />
        <Route path="/travel" element={<ProtectedRoute><Travel /></ProtectedRoute>} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" expand={false} duration={3000} />
      <BrowserRouter>
        <ScrollToTop /> 
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;