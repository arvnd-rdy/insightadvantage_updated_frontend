
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageSquare, 
  Calendar, 
  User, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle
} from 'lucide-react';

const OrganizationConsultants = () => {
  // Mock data for saved consultants
  const savedConsultants = [
    {
      id: '1',
      name: 'Alex Johnson',
      title: 'Strategy Consultant',
      avatar: '',
      location: 'Boston, MA',
      rate: '150',
      expertise: ['Strategy', 'Digital Transformation', 'Operations'],
      status: 'connected',
      rating: 4.9,
      reviews: 27,
    },
    {
      id: '2',
      name: 'Sarah Williams',
      title: 'Digital Marketing Specialist',
      avatar: '',
      location: 'New York, NY',
      rate: '125',
      expertise: ['Marketing', 'Social Media', 'Content Strategy'],
      status: 'pending',
      rating: 4.7,
      reviews: 18,
    },
    {
      id: '3',
      name: 'Michael Chen',
      title: 'IT Security Consultant',
      avatar: '',
      location: 'San Francisco, CA',
      rate: '175',
      expertise: ['Cybersecurity', 'Risk Management', 'Compliance'],
      status: 'saved',
      rating: 4.8,
      reviews: 32,
    },
  ];

  const pastConsultants = [
    {
      id: '4',
      name: 'Emily Rodriguez',
      title: 'Project Management Consultant',
      avatar: '',
      location: 'Chicago, IL',
      rate: '140',
      expertise: ['Project Management', 'Agile', 'Process Optimization'],
      status: 'completed',
      rating: 4.6,
      reviews: 15,
      projectDate: 'Jan 2023 - Mar 2023',
    },
    {
      id: '5',
      name: 'David Lee',
      title: 'Financial Advisor',
      avatar: '',
      location: 'Miami, FL',
      rate: '200',
      expertise: ['Financial Analysis', 'Investment Strategy', 'Risk Assessment'],
      status: 'completed',
      rating: 4.9,
      reviews: 24,
      projectDate: 'Aug 2022 - Dec 2022',
    },
  ];

  // Helper function to render status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Invitation Sent</Badge>;
      case 'saved':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Saved</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed Project</Badge>;
      default:
        return null;
    }
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
              <h2 className="text-2xl font-bold mb-2">Saved Consultants</h2>
              <p className="text-gray-600">
                Manage your saved and connected consultants.
              </p>
            </div>
            
            <Tabs defaultValue="saved" className="space-y-6">
              <TabsList>
                <TabsTrigger value="saved">Saved Consultants</TabsTrigger>
                <TabsTrigger value="past">Past Engagements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="saved" className="space-y-6">
                {savedConsultants.map((consultant) => (
                  <Card key={consultant.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/4 bg-gray-50 flex flex-col items-center justify-center text-center">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={consultant.avatar} />
                            <AvatarFallback className="bg-brand-blue text-white text-xl">
                              {consultant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold">{consultant.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{consultant.title}</p>
                          
                          <div className="flex items-center justify-center mt-1">
                            <span className="text-yellow-500 font-bold">{consultant.rating}</span>
                            <div className="w-4 h-4 text-yellow-500 ml-1">★</div>
                            <span className="text-gray-500 text-sm ml-1">({consultant.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="p-6 md:w-3/4">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{consultant.location}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <DollarSign className="h-4 w-4 mr-1" />
                                <span>${consultant.rate}/hr</span>
                              </div>
                            </div>
                            {renderStatusBadge(consultant.status)}
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {consultant.expertise.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mt-6">
                            {consultant.status === 'connected' && (
                              <Button className="gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Message
                              </Button>
                            )}
                            
                            {consultant.status === 'connected' && (
                              <Button variant="outline" className="gap-2">
                                <Calendar className="h-4 w-4" />
                                Schedule Meeting
                              </Button>
                            )}
                            
                            {consultant.status === 'saved' && (
                              <Button className="gap-2">
                                <User className="h-4 w-4" />
                                Invite to Connect
                              </Button>
                            )}
                            
                            {consultant.status === 'pending' && (
                              <div className="flex items-center text-yellow-600 gap-2">
                                <Clock className="h-4 w-4" />
                                Awaiting Response
                              </div>
                            )}
                            
                            <Button variant="outline" className="gap-2">
                              <User className="h-4 w-4" />
                              View Full Profile
                            </Button>
                            
                            <Button variant="outline" className="text-red-600 border-red-100 hover:bg-red-50 gap-2">
                              <Heart className="h-4 w-4 fill-red-600" />
                              Unsave
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-6">
                {pastConsultants.map((consultant) => (
                  <Card key={consultant.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/4 bg-gray-50 flex flex-col items-center justify-center text-center">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={consultant.avatar} />
                            <AvatarFallback className="bg-brand-blue text-white text-xl">
                              {consultant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold">{consultant.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{consultant.title}</p>
                          
                          <div className="flex items-center justify-center mt-1">
                            <span className="text-yellow-500 font-bold">{consultant.rating}</span>
                            <div className="w-4 h-4 text-yellow-500 ml-1">★</div>
                            <span className="text-gray-500 text-sm ml-1">({consultant.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="p-6 md:w-3/4">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                              <div className="flex items-center text-gray-600 mb-2">
                                <Briefcase className="h-4 w-4 mr-1" />
                                <span>Project Duration: {consultant.projectDate}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{consultant.location}</span>
                              </div>
                            </div>
                            {renderStatusBadge(consultant.status)}
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {consultant.expertise.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mt-6">
                            <Button className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Message
                            </Button>
                            
                            <Button variant="outline" className="gap-2">
                              <User className="h-4 w-4" />
                              View Full Profile
                            </Button>
                            
                            <Button variant="outline" className="gap-2">
                              <Heart className="h-4 w-4" />
                              Save Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OrganizationConsultants;
