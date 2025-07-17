
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizationNavBar from '@/components/OrganizationNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileForm from '@/components/ProfileForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Building2, Users, Globe, Calendar, Star, Shield, TrendingUp, Award, MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { OrganizationProfileSchema } from '@/components/ProfileForm';

const OrganizationProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProfileSubmit = (data: z.infer<typeof OrganizationProfileSchema>) => {
    console.log('Profile data submitted:', data);
    toast({
      title: 'Profile Updated',
      description: 'Your organization profile has been updated successfully.',
    });
  };

  const handleViewPublicProfile = () => {
    navigate('/organization/profile/public');
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-10 animate-ping"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Organization
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your organization's presence and connect with elite consultants worldwide
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Company Overview */}
          <div className="xl:col-span-1 space-y-6">
            {/* Company Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-4 ring-blue-100">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-3xl font-bold">
                        TS
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tech Solutions Inc.</h2>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      <Calendar className="h-3 w-3 mr-1" />
                      Since May 2024
                    </Badge>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center">
                    <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-800">150+</p>
                    <p className="text-sm text-blue-600">Employees</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-center">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-800">25</p>
                    <p className="text-sm text-purple-600">Active Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Subscription Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Plan</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Business Pro</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Searches Used</span>
                    <span className="font-semibold">45/50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Form */}
          <div className="xl:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <ProfileForm 
                  role="organization"
                  onSubmit={handleProfileSubmit}
                  defaultValues={defaultValues}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button 
            onClick={handleViewPublicProfile}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Globe className="h-5 w-5 mr-2" />
            View Public Profile
          </Button>
          <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-2xl font-semibold">
            <TrendingUp className="h-5 w-5 mr-2" />
            Analytics Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

const PageWithNav = () => (
  <>
    <OrganizationNavBar />
    <OrganizationProfile />
  </>
);

export default PageWithNav;
