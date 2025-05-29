import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

// Public pages
import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import NotFound from "@/pages/NotFound";
import ForgotPassword from "@/pages/ForgotPassword";

// Static pages
import About from "@/pages/About";
import Solutions from "@/pages/Solutions";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

// Account pages
import AccountSettings from "@/pages/Account/Settings";

// Consultant pages
import ConsultantDashboard from "@/pages/Consultant/Dashboard";
import ConsultantProfile from "@/pages/Consultant/Profile";
import ConsultantDocuments from "@/pages/Consultant/Documents";
import ConsultantAvailability from "@/pages/Consultant/Availability";
import ConsultantPreferences from "@/pages/Consultant/Preferences";
import ConsultantMessages from "@/pages/Consultant/Messages";
import ConsultantOrganizations from "@/pages/Consultant/Organizations";
import ConsultantGigDetail from "@/pages/Consultant/GigDetail";

// Organization pages
import OrganizationDashboard from "@/pages/Organization/Dashboard";
import OrganizationProfile from "@/pages/Organization/Profile";
import ConsultantSearch from "@/pages/Organization/Search";
import ConsultantDetail from "@/pages/Organization/ConsultantDetail";
import OrganizationPreferences from "@/pages/Organization/Preferences";
import OrganizationMessages from "@/pages/Organization/Messages";
import OrganizationConsultants from "@/pages/Organization/Consultants";
import PostConsultingRequest from "@/pages/Organization/PostRequest";
import ManageRequests from "@/pages/Organization/ManageRequests";
import RequestDetail from "@/pages/Organization/RequestDetail";

// Admin pages
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminUsers from "@/pages/Admin/Users";
import AdminSubscriptions from "@/pages/Admin/Subscriptions";
import AdminAnalytics from "@/pages/Admin/Analytics";
import AdminSettings from "@/pages/Admin/Settings";

// Subscription pages
import SubscriptionPlans from "@/pages/Subscription/Plans";
import SubscriptionBilling from "@/pages/Subscription/Billing";
import SubscriptionSuccess from "@/pages/Subscription/Success";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Account Management */}
            <Route path="/account/settings" element={<AccountSettings />} />
            
            {/* Consultant Routes */}
            <Route path="/consultant/dashboard" element={<ConsultantDashboard />} />
            <Route path="/consultant/profile" element={<ConsultantProfile />} />
            <Route path="/consultant/documents" element={<ConsultantDocuments />} />
            <Route path="/consultant/availability" element={<ConsultantAvailability />} />
            <Route path="/consultant/preferences" element={<ConsultantPreferences />} />
            <Route path="/consultant/messages" element={<ConsultantMessages />} />
            <Route path="/consultant/organizations" element={<ConsultantOrganizations />} />
            <Route path="/consultant/gig/:gigId" element={<ConsultantGigDetail />} />
            
            {/* Organization Routes */}
            <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
            <Route path="/organization/profile" element={<OrganizationProfile />} />
            <Route path="/organization/search" element={<ConsultantSearch />} />
            <Route path="/organization/consultant/:id" element={<ConsultantDetail />} />
            <Route path="/organization/preferences" element={<OrganizationPreferences />} />
            <Route path="/organization/messages" element={<OrganizationMessages />} />
            <Route path="/organization/consultants" element={<OrganizationConsultants />} />
            <Route path="/organization/post-request" element={<PostConsultingRequest />} />
            <Route path="/organization/manage-requests" element={<ManageRequests />} />
            <Route path="/organization/request/:id" element={<RequestDetail />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* Subscription Routes */}
            <Route path="/subscription/plans" element={<SubscriptionPlans />} />
            <Route path="/subscription/billing" element={<SubscriptionBilling />} />
            <Route path="/subscription/success" element={<SubscriptionSuccess />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
