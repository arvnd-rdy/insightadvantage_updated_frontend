
import React from 'react';
import OrganizationNavBar from '@/components/OrganizationNavBar';



import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PostRequestForm from '@/components/PostRequestForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PostConsultingRequest = () => {
  return (
    <main className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Link to="/organization/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-2">Post a Consulting Request</h1>
              <p className="text-gray-600">
                Create a detailed request to find the right consultant for your vocational rehabilitation needs.
              </p>
            </div>
            
            <Card className="max-w-4xl">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <PostRequestForm />
              </CardContent>
            </Card>
          </main>
  );
};

const PageWithNav = () => (
  <>
    <OrganizationNavBar />
    <PostConsultingRequest />
  </>
);

export default PageWithNav;
