
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Solutions = () => {
  const solutionsList = [
    {
      title: "Strategy Consulting",
      description: "Expert guidance on business strategy, market analysis, and growth opportunities",
      features: ["Competitive analysis", "Market entry strategies", "Growth planning", "Strategic roadmapping"],
    },
    {
      title: "Digital Transformation",
      description: "Navigate and accelerate your organization's digital journey with expert guidance",
      features: ["Technology assessment", "Digital roadmap creation", "Implementation support", "Change management"],
    },
    {
      title: "Operations Excellence",
      description: "Optimize your operational processes to increase efficiency and reduce costs",
      features: ["Process optimization", "Supply chain management", "Quality improvement", "Cost reduction"],
    },
    {
      title: "Marketing & Growth",
      description: "Develop and execute marketing strategies that drive sustainable growth",
      features: ["Brand strategy", "Digital marketing", "Customer acquisition", "Retention strategies"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Solutions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how InsightAdvantage can help your organization solve complex challenges with our expert consultants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutionsList.map((solution, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription>{solution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
