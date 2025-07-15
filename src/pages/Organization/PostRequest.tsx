import React from 'react';
import OrganizationNavBar from '@/components/OrganizationNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewPostRequestForm from '@/components/NewPostRequestForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PostConsultingRequest = () => {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/organization/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900">Post a New Consulting Request</h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to create a detailed request and find the perfect consultant for your needs.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          <NewPostRequestForm />
        </div>
      </main>
    </div>
  );
};

const PageWithNav = () => (
  <>
    <OrganizationNavBar />
    <PostConsultingRequest />
  </>
);

export default PageWithNav;
