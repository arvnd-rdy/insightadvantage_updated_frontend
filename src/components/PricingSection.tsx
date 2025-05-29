
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface PricingTier {
  name: string;
  role: 'consultant' | 'organization';
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface PricingSectionProps {
  tiers: PricingTier[];
}

const PricingSection = ({ tiers }: PricingSectionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you or your organization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`border ${
                tier.isPopular ? 'border-brand-teal shadow-lg ring-1 ring-brand-teal' : 'border-gray-200'
              } hover-scale`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3">
                  <span className="bg-brand-teal text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <Check 
                          size={18} 
                          className={`${tier.isPopular ? 'text-brand-teal' : 'text-brand-blue'}`}
                        />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link 
                  to={`/register?role=${tier.role}&plan=${tier.name.toLowerCase()}`} 
                  className="w-full"
                >
                  <Button 
                    variant={tier.isPopular ? 'default' : 'outline'} 
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
