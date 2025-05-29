
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate redirect if someone tries to access this page directly
    const hasSubscribed = sessionStorage.getItem('subscriptionComplete');
    if (!hasSubscribed) {
      navigate('/subscription/plans');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Subscription Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for subscribing to InsightAdvantage. Your account has been successfully upgraded and you now have access to all premium features.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium">Next Steps</h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>Complete your profile to increase visibility</li>
                <li>Upload required documents for verification</li>
                <li>Set your availability calendar</li>
                <li>Start exploring organizations or consultants</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button className="w-full" asChild>
              <Link to="/consultant/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/subscription/billing">Manage Subscription</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubscriptionSuccess;
