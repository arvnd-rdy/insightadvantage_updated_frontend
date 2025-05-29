
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import ProfileForm from '@/components/ProfileForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrganizationProfile = () => {
  const { toast } = useToast();

  const handleProfileSubmit = (data: any) => {
    console.log('Profile data submitted:', data);
    toast({
      title: 'Profile Updated',
      description: 'Your organization profile has been updated successfully.',
    });
  };

  // Mock data for the organization profile
  const defaultValues = {
    companyName: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    email: 'contact@techsolutions.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA, USA',
    description: 'Tech Solutions is a leading provider of innovative software solutions for enterprises. We specialize in digital transformation, cloud migration, and custom software development. Our team of experts has decades of combined experience helping businesses leverage technology to achieve their strategic goals.',
    companySize: '51-200',
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="organization" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Tech Solutions Inc."
            userRole="organization"
          />
          
          <main className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Company Profile</h2>
              <p className="text-gray-600">
                Update your organization's information to help consultants learn about your company.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="w-32 h-32 border-4 border-white shadow">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-brand-blue text-white text-2xl">
                          TS
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="icon" 
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-xl font-medium">Tech Solutions Inc.</h3>
                    <p className="text-gray-500 text-sm">Member since May 2024</p>
                    
                    <div className="w-full mt-6 space-y-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="text-sm font-medium text-gray-700">Subscription Status</h4>
                        <p className="text-sm text-gray-600">Business Plan (Active)</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="text-sm font-medium text-gray-700">Consultant Searches</h4>
                        <p className="text-sm text-gray-600">45 of 50 used this month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardContent className="pt-6">
                  <ProfileForm 
                    role="organization"
                    onSubmit={handleProfileSubmit}
                    defaultValues={defaultValues}
                  />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OrganizationProfile;
