
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ProfileForm from '@/components/ProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MapPin, User, Briefcase, Phone, Mail, Plus, Calendar } from 'lucide-react';

const ConsultantProfile = () => {
  const { toast } = useToast();

  // Mock consultant data for profile
  const consultantData = {
    fullName: 'Alex Johnson',
    title: 'Strategy Consultant',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    location: 'Boston, MA',
    bio: 'Experienced strategy consultant with over 10 years of experience in management consulting. Specialized in operational efficiency and digital transformation for Fortune 500 companies.',
    hourlyRate: '150',
    expertise: 'Strategy, Digital Transformation, Operations',
    avatarUrl: '',
  };

  const handleProfileUpdate = (data: any) => {
    console.log('Profile data:', data);
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated successfully.',
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Photo upload logic would go here
    toast({
      title: 'Photo Uploaded',
      description: 'Your profile photo has been updated successfully.',
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="consultant" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName={consultantData.fullName}
            userRole="consultant"
          />
          
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">My Profile</h2>
              <p className="text-gray-600">
                Manage your personal information and consulting profile.
              </p>
            </div>
            
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="preview">Profile Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Profile Photo</CardTitle>
                    <CardDescription>
                      Upload a professional photo to make your profile stand out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={consultantData.avatarUrl} />
                      <AvatarFallback className="bg-brand-blue text-white text-xl">
                        {consultantData.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor="picture" className="mb-2 block">
                        Upload photo
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          id="picture"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended size: 400x400px. Max file size: 2MB.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your profile information visible to organizations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProfileForm 
                      role="consultant" 
                      onSubmit={handleProfileUpdate} 
                      defaultValues={consultantData}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preview">
                <Card className="border-0 shadow-md">
                  <div className="relative">
                    <div className="h-40 bg-gradient-to-r from-brand-blue to-brand-navy"></div>
                    <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
                      <Avatar className="h-24 w-24 border-4 border-white">
                        <AvatarImage src={consultantData.avatarUrl} />
                        <AvatarFallback className="bg-brand-blue text-white text-xl">
                          {consultantData.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  <CardContent className="pt-16 pb-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold">{consultantData.fullName}</h3>
                        <p className="text-gray-600">{consultantData.title}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {consultantData.expertise.split(',').map((skill, i) => (
                          <Badge key={i} variant="secondary">{skill.trim()}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">About Me</h4>
                        <p className="text-gray-600 whitespace-pre-line">{consultantData.bio}</p>
                        
                        <div className="mt-8">
                          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{consultantData.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{consultantData.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{consultantData.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Consulting Details</h4>
                        <div className="space-y-6">
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Hourly Rate</h5>
                            <p className="text-xl font-semibold">${consultantData.hourlyRate}/hr</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Availability</h5>
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                              <span>Available for projects</span>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Documents</h5>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="flex gap-1">
                                <Briefcase className="h-3 w-3" /> 
                                Resume
                              </Badge>
                              <Badge variant="outline" className="flex gap-1">
                                <User className="h-3 w-3" /> 
                                Certifications
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button variant="outline">Edit Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantProfile;
