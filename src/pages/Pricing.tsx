
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your organization's needs. All plans include access to our platform and consultant network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`border rounded-lg overflow-hidden ${plan.popular ? 'ring-2 ring-brand-blue' : ''}`}>
              {plan.popular && (
                <div className="bg-brand-blue text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-end">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Link to="/subscription/plans">
                    <Button className="w-full">{plan.cta}</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
