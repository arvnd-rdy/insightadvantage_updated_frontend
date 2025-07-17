import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Globe, MapPin, Calendar, Shield, ExternalLink, Briefcase, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicOrganizationProfile = () => {
  const navigate = useNavigate();
  // Mock data for public profile - only basic company info
  const organizationData = {
    companyName: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    location: 'San Francisco, CA, USA',
    website: 'https://techsolutions.com',
    description: 'Tech Solutions is a leading provider of innovative software solutions for enterprises. We specialize in digital transformation, cloud migration, and custom software development. Our team of experts has decades of combined experience helping businesses leverage technology to achieve their strategic goals.',
    companySize: '51-200',
    employeeCount: '150+',
    activeProjects: '25',
    foundedYear: '2015',
    isVerified: true,
    memberSince: 'May 2024'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-10 animate-ping"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Public Profile
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our organization and explore partnership opportunities
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Company Overview */}
          <div className="space-y-6">
            {/* Company Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-6">
                    <Avatar className="w-28 h-28 border-4 border-white shadow-xl ring-4 ring-blue-100">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold">
                        {organizationData.companyName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{organizationData.companyName}</h2>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {organizationData.isVerified && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      <Calendar className="h-3 w-3 mr-1" />
                      Since {organizationData.memberSince}
                    </Badge>
                  </div>
                </div>

                {/* Company Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-800">{organizationData.employeeCount}</p>
                    <p className="text-sm text-blue-600">Employees</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-center">
                    <Briefcase className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-800">{organizationData.activeProjects}</p>
                    <p className="text-sm text-purple-600">Active Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Details */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-semibold">{organizationData.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{organizationData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Company Size</p>
                    <p className="font-semibold">{organizationData.companySize} employees</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Founded</p>
                    <p className="font-semibold">{organizationData.foundedYear}</p>
                  </div>
                </div>
                {organizationData.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a 
                        href={organizationData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        {organizationData.website}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - About */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  About {organizationData.companyName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {organizationData.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Interested in Working With Us?</h3>
                <p className="text-blue-100 mb-6">
                  We're always looking for talented consultants to join our network and help us deliver exceptional results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl"
                  >
                    View Open Positions
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl"
                  >
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicOrganizationProfile;
