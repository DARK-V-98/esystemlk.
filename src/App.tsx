import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminPricing from "@/pages/admin/AdminPricing";
import AdminQuotation from "@/pages/admin/AdminQuotation";
import AdminUsers from "@/pages/admin/AdminUsers";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Signup from "@/pages/Signup";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import FounderMessagePage from "@/pages/FounderMessage";
import PortfolioPage from "@/pages/Portfolio";
import PricingPage from "@/pages/Pricing";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy";
import ServicesPage from "@/pages/Services";
import TestimonialsPage from "@/pages/Testimonials";


const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="founder-message" element={<FounderMessagePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="quotation" element={<AdminQuotation />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
