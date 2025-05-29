
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const consultantPlans = [
    {
      id: 'consultant-basic',
      name: 'Basic',
      price: '0',
      description: 'For consultants just getting started.',
      features: [
        {
          name: 'Create a professional profile',
          included: true,
        },
        {
          name: 'Upload up to 2 documents',
          included: true,
        },
        {
          name: 'Apply to up to 3 organizations monthly',
          included: true,
        },
        {
          name: 'Basic availability management',
          included: true,
        },
        {
          name: 'Upload unlimited documents',
          included: false,
        },
        {
          name: 'Priority profile visibility',
          included: false,
        },
        {
          name: 'Unlimited organization applications',
          included: false,
        },
      ],
      popular: false,
    },
    {
      id: 'consultant-pro',
      name: 'Professional',
      price: '29',
      description: 'For established consultants seeking more opportunities.',
      features: [
        {
          name: 'Create a professional profile',
          included: true,
        },
        {
          name: 'Upload unlimited documents',
          included: true,
        },
        {
          name: 'Apply to up to 10 organizations monthly',
          included: true,
        },
        {
          name: 'Advanced availability management',
          included: true,
        },
        {
          name: 'Priority profile visibility',
          included: true,
        },
        {
          name: 'Advanced analytics on profile views',
          included: true,
        },
        {
          name: 'Featured profile status',
          included: false,
        },
      ],
      popular: true,
    },
    {
      id: 'consultant-premium',
      name: 'Premium',
      price: '79',
      description: 'For elite consultants wanting maximum exposure.',
      features: [
        {
          name: 'All Professional tier features',
          included: true,
        },
        {
          name: 'Unlimited organization applications',
          included: true,
        },
        {
          name: 'Featured profile status',
          included: true,
        },
        {
          name: 'Direct introduction to organizations',
          included: true,
        },
        {
          name: 'Dedicated account manager',
          included: true,
        },
        {
          name: 'Early access to premium organizations',
          included: true,
        },
      ],
      popular: false,
    },
  ];
  
  const organizationPlans = [
    {
      id: 'org-basic',
      name: 'Basic',
      price: '0',
      description: 'For small businesses testing the waters.',
      features: [
        {
          name: 'Create company profile',
          included: true,
        },
        {
          name: 'Basic consultant search',
          included: true,
        },
        {
          name: 'Contact up to 3 consultants monthly',
          included: true,
        },
        {
          name: 'View public consultant profiles',
          included: true,
        },
        {
          name: 'Advanced filtering options',
          included: false,
        },
        {
          name: 'Unlimited consultant messaging',
          included: false,
        },
      ],
      popular: false,
    },
    {
      id: 'org-business',
      name: 'Business',
      price: '99',
      description: 'For growing companies with regular consulting needs.',
      features: [
        {
          name: 'Create enhanced company profile',
          included: true,
        },
        {
          name: 'Advanced consultant search & filtering',
          included: true,
        },
        {
          name: 'Contact up to 15 consultants monthly',
          included: true,
        },
        {
          name: 'Access to consultant documents',
          included: true,
        },
        {
          name: 'Team account (up to 5 users)',
          included: true,
        },
        {
          name: 'Premium consultant access',
          included: false,
        },
      ],
      popular: true,
    },
    {
      id: 'org-enterprise',
      name: 'Enterprise',
      price: '299',
      description: 'For organizations with extensive consulting requirements.',
      features: [
        {
          name: 'All Business tier features',
          included: true,
        },
        {
          name: 'Unlimited consultant contacts',
          included: true,
        },
        {
          name: 'Team account (up to 20 users)',
          included: true,
        },
        {
          name: 'Premium consultant access',
          included: true,
        },
        {
          name: 'Dedicated account manager',
          included: true,
        },
        {
          name: 'Custom integration options',
          included: true,
        },
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (plan) => {
    toast({
      title: "Plan Selected",
      description: `You've selected the ${plan.name} plan. Proceeding to billing.`,
    });
    navigate('/subscription/billing', { state: { plan } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the subscription that best fits your needs and unlock the full potential of InsightAdvantage.
            </p>
          </div>
          
          <Tabs defaultValue="consultant" className="space-y-12">
            <div className="flex justify-center">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="consultant">For Consultants</TabsTrigger>
                <TabsTrigger value="organization">For Organizations</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="consultant">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {consultantPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`flex flex-col ${
                      plan.popular ? 'border-brand-blue shadow-lg relative' : ''
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute top-4 right-4 bg-brand-blue">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        {plan.price !== '0' && <span className="text-gray-500">/month</span>}
                      </div>
                      <CardDescription className="mt-4">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            {feature.included ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={feature.included ? '' : 'text-gray-500'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handleSelectPlan(plan)} 
                        className={`w-full ${
                          plan.popular ? 'bg-brand-blue hover:bg-brand-blue/90' : ''
                        }`}
                      >
                        {plan.price === '0' ? 'Get Started' : 'Subscribe Now'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="organization">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {organizationPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`flex flex-col ${
                      plan.popular ? 'border-brand-blue shadow-lg relative' : ''
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute top-4 right-4 bg-brand-blue">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        {plan.price !== '0' && <span className="text-gray-500">/month</span>}
                      </div>
                      <CardDescription className="mt-4">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            {feature.included ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={feature.included ? '' : 'text-gray-500'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handleSelectPlan(plan)} 
                        className={`w-full ${
                          plan.popular ? 'bg-brand-blue hover:bg-brand-blue/90' : ''
                        }`}
                      >
                        {plan.price === '0' ? 'Get Started' : 'Subscribe Now'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Need a custom plan?</h3>
                <p className="text-gray-600">
                  Contact us for enterprise-level solutions tailored to your specific needs.
                </p>
              </div>
              <Link to="/contact">
                <Button variant="outline" className="mt-4 md:mt-0">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPlans;
