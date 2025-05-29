
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Search, MessageSquare, FileText, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const consultantSteps = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Build a comprehensive professional profile showcasing your expertise, certifications, and experience.",
      icon: <Users className="h-8 w-8 text-brand-blue" />
    },
    {
      step: 2,
      title: "Browse Opportunities",
      description: "Search and filter consulting opportunities that match your skills and availability.",
      icon: <Search className="h-8 w-8 text-brand-blue" />
    },
    {
      step: 3,
      title: "Apply & Connect",
      description: "Submit applications and communicate directly with organizations through our secure platform.",
      icon: <MessageSquare className="h-8 w-8 text-brand-blue" />
    },
    {
      step: 4,
      title: "Deliver Excellence",
      description: "Complete projects, get paid securely, and build your reputation through client reviews.",
      icon: <Star className="h-8 w-8 text-brand-blue" />
    }
  ];

  const organizationSteps = [
    {
      step: 1,
      title: "Post Your Project",
      description: "Create detailed project descriptions with requirements, budget, and timeline.",
      icon: <FileText className="h-8 w-8 text-brand-blue" />
    },
    {
      step: 2,
      title: "Review Applications",
      description: "Browse qualified consultant profiles and review their applications to your projects.",
      icon: <Users className="h-8 w-8 text-brand-blue" />
    },
    {
      step: 3,
      title: "Select & Hire",
      description: "Choose the right consultant and manage contracts through our secure platform.",
      icon: <CheckCircle className="h-8 w-8 text-brand-blue" />
    },
    {
      step: 4,
      title: "Collaborate & Success",
      description: "Work together to achieve your goals and provide feedback to build the community.",
      icon: <Star className="h-8 w-8 text-brand-blue" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How Insight Advantage Works</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform connects expert consultants with organizations in need of specialized skills. 
            Here's how the process works for both consultants and organizations.
          </p>
        </div>

        {/* For Consultants */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">For Consultants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultantSteps.map((step) => (
              <Card key={step.step} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-blue-50 rounded-full w-fit">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-brand-blue mb-2">
                    Step {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/register">
              <Button size="lg">Start as a Consultant</Button>
            </Link>
          </div>
        </div>

        {/* For Organizations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">For Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {organizationSteps.map((step) => (
              <Card key={step.step} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-blue-50 rounded-full w-fit">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-brand-blue mb-2">
                    Step {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/register">
              <Button size="lg">Start as an Organization</Button>
            </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Insight Advantage?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All consultants undergo thorough verification and background checks.</p>
            </div>
            <div className="text-center">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">End-to-end security with encrypted communications and secure payments.</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">Rating and review system ensures high-quality outcomes for all projects.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
