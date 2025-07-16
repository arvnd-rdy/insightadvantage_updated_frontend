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
import ConsultantMyJobs from "@/pages/Consultant/MyJobs";
import ConsultantOrganizations from "@/pages/Consultant/Organizations";
import ConsultantGigDetail from "@/pages/Consultant/GigDetail";
import ConsultantNewProfile from '@/pages/Consultant/NewProfile';
import Jobs from './pages/Consultant/LinkedInJobs';

// Onboarding - Consultant
import ConsultantStep1PersonalDetails from "@/pages/Onboarding/Consultant/Step1PersonalDetails";
import ConsultantStep2Education from "@/pages/Onboarding/Consultant/Step2Education";
import ConsultantStep3WorkExperience from "@/pages/Onboarding/Consultant/Step3WorkExperience";
import ConsultantStep4ProfessionalBio from "@/pages/Onboarding/Consultant/Step4ProfessionalBio";
import ConsultantStep5SkillsServices from "@/pages/Onboarding/Consultant/Step5SkillsServices";
import ConsultantStep6Certifications from "@/pages/Onboarding/Consultant/Step6Certifications";
import ConsultantStep7Licenses from "@/pages/Onboarding/Consultant/Step7Licenses";
import ConsultantStep8PreferencesPricing from "@/pages/Onboarding/Consultant/Step8PreferencesPricing";
import ConsultantStep9Review from "@/pages/Onboarding/Consultant/Step9Review";
import ConsultantStep10Verification from "@/pages/Onboarding/Consultant/Step10Verification";
import ConsultantStep11CompleteRegistration from "@/pages/Onboarding/Consultant/Step11CompleteRegistration";

// Onboarding - Organization
import OrganizationStep1BasicInfo from "@/pages/Onboarding/Organization/Step1BasicInfo";
import OrganizationStep2Contacts from "@/pages/Onboarding/Organization/Step2Contacts";
import OrganizationStep3aJobBasics from "@/pages/Onboarding/Organization/Step3aJobBasics";
import OrganizationStep3bDefaults from "@/pages/Onboarding/Organization/Step3bDefaults";
import OrganizationStep4aJobDescription from "@/pages/Onboarding/Organization/Step4aJobDescription";
import OrganizationStep4bSkillsExpertise from "@/pages/Onboarding/Organization/Step4bSkillsExpertise";
import OrganizationStep4cScopeDuration from "@/pages/Onboarding/Organization/Step4cScopeDuration";
import OrganizationStep4dBudgetTerms from "@/pages/Onboarding/Organization/Step4dBudgetTerms";
import OrganizationStep5Review from "@/pages/Onboarding/Organization/Step5Review";
import OrganizationStep6Verification from "@/pages/Onboarding/Organization/Step6Verification";
import OrganizationStep7CompleteRegistration from "@/pages/Onboarding/Organization/Step7CompleteRegistration";

// Organization pages
import OrganizationDashboard from "@/pages/Organization/Dashboard";
import OrganizationProfile from "@/pages/Organization/Profile";
import ConsultantSearch from "@/pages/Organization/FindConsultants";
import ConsultantDetail from "@/pages/Organization/ConsultantDetail";
import OrganizationPreferences from "@/pages/Organization/Preferences";
import OrganizationMessages from "@/pages/Organization/Messages";
import OrganizationConsultants from "@/pages/Organization/Consultants";
import PostConsultingRequest from "@/pages/Organization/PostRequest";
import PostJob from "@/pages/Organization/PostJob";
import ManageJobs from "@/pages/Organization/ManageJobs";
import ManageRequests from "@/pages/Organization/ManageRequests";
import RequestDetail from "@/pages/Organization/RequestDetail";
import ApplicantsList from "@/pages/Organization/ApplicantsList";

// Admin pages
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminUsers from "@/pages/Admin/Users";
import AdminSubscriptions from "@/pages/Admin/Subscriptions";
import AdminAnalytics from "@/pages/Admin/Analytics";
import AdminSettings from "@/pages/Admin/Settings";

// People page
import People from "@/pages/Organization/People";

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
            <Route path="/logout" element={<Home />} />
            
            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<SubscriptionPlans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Account Management */}
            <Route path="/account/settings" element={<AccountSettings />} />
            
            {/* Onboarding - Consultant */}
            <Route path="/onboarding/consultant/step-1" element={<ConsultantStep1PersonalDetails />} />
            <Route path="/onboarding/consultant/step-2" element={<ConsultantStep2Education />} />
            <Route path="/onboarding/consultant/step-3" element={<ConsultantStep3WorkExperience />} />
            <Route path="/onboarding/consultant/step-4" element={<ConsultantStep4ProfessionalBio />} />
            <Route path="/onboarding/consultant/step-5" element={<ConsultantStep5SkillsServices />} />
            <Route path="/onboarding/consultant/step-6" element={<ConsultantStep6Certifications />} />
            <Route path="/onboarding/consultant/step-7" element={<ConsultantStep7Licenses />} />
            <Route path="/onboarding/consultant/step-8" element={<ConsultantStep8PreferencesPricing />} />
            <Route path="/onboarding/consultant/step-9" element={<ConsultantStep9Review />} />
            <Route path="/onboarding/consultant/step-10" element={<ConsultantStep10Verification />} />
            <Route path="/onboarding/consultant/step-11" element={<ConsultantStep11CompleteRegistration />} />
            {/* Onboarding - Organization */}
            <Route path="/onboarding/organization/step-1" element={<OrganizationStep1BasicInfo />} />
            <Route path="/onboarding/organization/step-2" element={<OrganizationStep2Contacts />} />
            <Route path="/onboarding/organization/step-3a" element={<OrganizationStep3aJobBasics />} />
            <Route path="/onboarding/organization/step-3b" element={<OrganizationStep3bDefaults />} />
            <Route path="/onboarding/organization/step-4a" element={<OrganizationStep4aJobDescription />} />
            <Route path="/onboarding/organization/step-4b" element={<OrganizationStep4bSkillsExpertise />} />
            <Route path="/onboarding/organization/step-4c" element={<OrganizationStep4cScopeDuration />} />
            <Route path="/onboarding/organization/step-4d" element={<OrganizationStep4dBudgetTerms />} />
            <Route path="/onboarding/organization/step-5" element={<OrganizationStep5Review />} />
            <Route path="/onboarding/organization/step-6" element={<OrganizationStep6Verification />} />
            <Route path="/onboarding/organization/step-7" element={<OrganizationStep7CompleteRegistration />} />
            
            {/* Consultant Routes */}
            <Route path="/consultant/dashboard" element={<ConsultantDashboard />} />
            <Route path="/consultant/profile" element={<ConsultantProfile />} />
            <Route path="/consultant/new-profile" element={<ConsultantNewProfile />} />
            <Route path="/consultant/documents" element={<ConsultantDocuments />} />
            <Route path="/consultant/availability" element={<ConsultantAvailability />} />
            <Route path="/consultant/preferences" element={<ConsultantPreferences />} />
            <Route path="/consultant/messages" element={<ConsultantMessages />} />
            <Route path="/consultant/my-jobs" element={<ConsultantMyJobs />} />
            <Route path="/consultant/gig/:gigId" element={<ConsultantGigDetail />} />
            <Route path="/consultant/jobs" element={<Jobs />} />
            
            {/* Organization Routes */}
            <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
            <Route path="/organization/profile" element={<OrganizationProfile />} />
            <Route path="/organization/find-consultants" element={<ConsultantSearch />} />
            <Route path="/organization/consultant/:id" element={<ConsultantDetail />} />
            <Route path="/organization/consultants/:id" element={<ConsultantProfile />} />
            <Route path="/organization/preferences" element={<OrganizationPreferences />} />
            <Route path="/organization/messages" element={<OrganizationMessages />} />
            <Route path="/organization/consultants" element={<OrganizationConsultants />} />
            <Route path="/organization/post-request" element={<PostConsultingRequest />} />
            <Route path="/organization/manage-requests" element={<ManageRequests />} />
            <Route path="/organization/request/:id" element={<RequestDetail />} />
            <Route path="/organization/request/:id/applicants" element={<ApplicantsList />} />
            <Route path="/organization/people" element={<People />} />
            
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
