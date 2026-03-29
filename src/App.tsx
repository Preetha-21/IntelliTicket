import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import BookTicket from "./pages/BookTicket.tsx";
import Chatbot from "./pages/Chatbot.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";

import Confirmation from "./pages/Confirmation.tsx";
import Payment from "./pages/Payment.tsx";
import Shows from "./pages/Shows.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<BookTicket />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="/payment" element={<Payment />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
