
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import CallToAction from '@/components/CallToAction';
import { Search, Shield, Users, Briefcase, CheckCircle, Clock } from 'lucide-react';

const Home = () => {
  // Feature section data
  const features = [
    {
      title: 'Find Expert Consultants',
      description: 'Search, filter, and connect with qualified consultants who match your specific project needs.',
      icon: <Search className="h-6 w-6 text-brand-blue" />
    },
    {
      title: 'Secure Document Handling',
      description: 'All documents and sensitive information are stored securely with industry-leading encryption.',
      icon: <Shield className="h-6 w-6 text-brand-blue" />
    },
    {
      title: 'Vetted Professionals',
      description: 'All consultants on our platform undergo a thorough verification process to ensure quality.',
      icon: <CheckCircle className="h-6 w-6 text-brand-blue" />
    },
    {
      title: 'Flexible Availability',
      description: 'Find consultants available for full-time engagements, part-time projects, or hourly consultations.',
      icon: <Clock className="h-6 w-6 text-brand-blue" />
    },
    {
      title: 'One-to-One Matching',
      description: 'Our platform connects you directly to consultants who match your specific requirements.',
      icon: <Users className="h-6 w-6 text-brand-blue" />
    },
    {
      title: 'Enterprise Solutions',
      description: 'Custom solutions for large organizations with ongoing consulting needs.',
      icon: <Briefcase className="h-6 w-6 text-brand-blue" />
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      quote: "Insight Advantage has transformed how we engage with consultants. We've found top talent quickly and efficiently.",
      author: "Sarah Johnson",
      role: "HR Director",
      company: "TechVision Inc.",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "As a financial consultant, this platform has connected me with quality clients that match my expertise perfectly.",
      author: "Michael Chen",
      role: "Financial Consultant",
      company: "Independent",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The security and ease of document handling gives both our company and our consultants peace of mind.",
      author: "Emma Rodriguez",
      role: "Operations Manager",
      company: "Global Retail Group",
      avatarUrl: "https://randomuser.me/api/portraits/women/23.jpg"
    }
  ];

  // Pricing data
  const pricingTiers = [
    {
      name: "Basic",
      role: "consultant" as const,
      price: "$49",
      description: "Perfect for independent consultants just getting started",
      features: [
        "Create professional profile",
        "Upload up to 5 documents",
        "Basic search visibility",
        "Message potential clients",
        "Standard support"
      ]
    },
    {
      name: "Professional",
      role: "consultant" as const,
      price: "$99",
      description: "Designed for active consultants seeking more opportunities",
      features: [
        "Everything in Basic",
        "Featured search placement",
        "Upload up to 20 documents",
        "Advanced analytics",
        "Priority support"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      role: "organization" as const,
      price: "$199",
      description: "For organizations with ongoing consulting needs",
      features: [
        "Full consultant database access",
        "Advanced filtering and search",
        "Multiple user accounts",
        "API integration",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <HeroSection 
          title="Connect with Expert Consultants on Demand"
          subtitle="Insight Advantage connects organizations with top independent consultants across all industries. Find the perfect match for your projects, securely and efficiently."
        />
        
        <FeatureSection 
          title="Why Choose Insight Advantage"
          subtitle="Our platform offers everything you need to find the right consultant or connect with new clients."
          features={features}
        />
        
        <TestimonialSection testimonials={testimonials} />
        
        <PricingSection tiers={pricingTiers} />
        
        <CallToAction 
          title="Ready to Get Started?"
          subtitle="Join our platform today and transform how you connect with consultants or find new clients."
          buttonText="Sign Up Now"
          buttonLink="/register"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
