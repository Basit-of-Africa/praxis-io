import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import BookAppointment from "./pages/BookAppointment";
import ClientDetails from "./pages/ClientDetails";
import AppointmentDetails from "./pages/AppointmentDetails"; // Import AppointmentDetails
import NotFound from "./pages/NotFound";
import { ClientProvider } from "./context/ClientContext";
import { AppointmentProvider } from "./context/AppointmentContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClientProvider>
          <AppointmentProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/:clientId" element={<ClientDetails />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/appointments/:appointmentId" element={<AppointmentDetails />} /> {/* New route */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AppointmentProvider>
        </ClientProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;