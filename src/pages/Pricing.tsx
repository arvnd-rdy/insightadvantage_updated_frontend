
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      period: "per month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Access to 10 consultant profiles",
        "Basic matching algorithm",
        "Email support",
        "1 project at a time"
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$249",
      period: "per month",
      description: "Ideal for growing businesses with regular needs",
      features: [
        "Access to 50 consultant profiles",
        "Advanced matching algorithm",
        "Priority email and chat support",
        "5 concurrent projects",
        "Consultant verification"
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$599",
      period: "per month",
      description: "For organizations with complex consulting needs",
      features: [
        "Unlimited consultant access",
        "Premium matching with AI recommendations",
        "Dedicated account manager",
        "Unlimited projects",
        "Custom contract templates",
        "Analytics dashboard"
      ],
      cta: "Contact Sales",
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <circle cx="20" cy="20" r="15" fill="currentColor" opacity="0.5"></circle>
              <circle cx="80" cy="80" r="20" fill="currentColor" opacity="0.5"></circle>
              <rect x="50" y="10" width="10" height="10" fill="currentColor" opacity="0.5"></rect>
            </svg>
          </div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-up">Simple, Transparent Pricing</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Choose the plan that fits your organization's needs. All plans include access to our platform and consultant network.
            </p>
          </div>
        </section>

        <section className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col justify-between p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-6 flex items-center justify-center">
                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-xl text-gray-500 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <Check className="text-green-500 h-6 w-6 mr-3 flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="mt-8">
                  <Link to="/subscription/plans">
                    <Button className={`w-full py-3 text-lg font-semibold ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
