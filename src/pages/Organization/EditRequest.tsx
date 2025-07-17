import React, { useEffect } from 'react';
import OrganizationNavBar from '@/components/OrganizationNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewPostRequestForm from '@/components/NewPostRequestForm';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditRequest = () => {
  const { id } = useParams();

  useEffect(() => {
    // Fetch and load existing request details using id
    // Populate form default values if needed

  }, [id]);

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/organization/manage-requests">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Manage Requests
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900">Edit Request</h1>
          <p className="text-lg text-gray-600">
            Modify the details of your consulting request below.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          <NewPostRequestForm isEditMode={true} requestId={id} />
        </div>
      </main>
    </div>
  );
};

const PageWithNav = () => (
  <>
    <OrganizationNavBar />
    <EditRequest />
  </>
);

export default PageWithNav;

