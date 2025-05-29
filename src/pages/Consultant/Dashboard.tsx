
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardCard from '@/components/DashboardCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, File, Bell, Calendar, Mail, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultantDashboard = () => {
  // Mock consultant data
  const consultantData = {
    name: "Alex Johnson",
    profileCompletion: 75,
    documentsToUpload: ["Professional Insurance", "Certifications"],
    upcomingActions: [
      { title: "Complete profile", completed: false, link: "/consultant/profile" },
      { title: "Upload required documents", completed: false, link: "/consultant/documents" },
      { title: "Set availability schedule", completed: true, link: "/consultant/availability" },
    ],
    messages: [
      { 
        id: "1", 
        sender: "Sarah Miller", 
        company: "Tech Solutions Inc.", 
        preview: "We're interested in your expertise for our upcoming project...", 
        time: "2 hours ago",
        read: false
      },
      { 
        id: "2", 
        sender: "David Wilson", 
        company: "Global Finance", 
        preview: "Following up on our discussion about the consulting opportunity...", 
        time: "Yesterday",
        read: true
      },
    ],
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="consultant" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName={consultantData.name}
            userRole="consultant"
          />
          
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome, {consultantData.name}</h2>
              <p className="text-gray-600">
                Here's an overview of your consultant profile and activity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <DashboardCard 
                title="Profile Completion" 
                description="Complete your profile to increase visibility"
                icon={<BarChart2 size={20} />}
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{consultantData.profileCompletion}% Complete</span>
                    <span className="text-muted-foreground">25% to go</span>
                  </div>
                  <Progress value={consultantData.profileCompletion} className="h-2" />
                  <Link to="/consultant/profile">
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
              
              <DashboardCard 
                title="Documents Needed" 
                description="Required documents to verify your profile"
                icon={<File size={20} />}
              >
                <div className="space-y-3">
                  {consultantData.documentsToUpload.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{doc}</span>
                      <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
                        Required
                      </Badge>
                    </div>
                  ))}
                  <Link to="/consultant/documents">
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Upload Documents
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
              
              <DashboardCard 
                title="Recent Messages" 
                description="Your recent communications"
                icon={<Mail size={20} />}
              >
                <div className="space-y-3">
                  {consultantData.messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-2 h-2 rounded-full ${message.read ? 'bg-gray-300' : 'bg-brand-blue'}`}></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">
                          {message.sender} <span className="font-normal text-gray-500">({message.company})</span>
                        </p>
                        <p className="text-gray-500 truncate">{message.preview}</p>
                        <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                  <Link to="/consultant/messages">
                    <Button variant="link" className="p-0 h-auto text-sm">
                      View All Messages
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard 
                title="Next Steps" 
                description="Complete these actions to get started"
                icon={<Bell size={20} />}
              >
                <div className="space-y-3">
                  {consultantData.upcomingActions.map((action, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`flex-shrink-0 p-1 rounded-full mr-3 ${
                        action.completed ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {action.completed ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-brand-blue" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {action.title}
                          {action.completed && (
                            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                              Complete
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
              
              <DashboardCard 
                title="Upcoming Schedule" 
                description="Your calendar for the next 7 days"
                icon={<Calendar size={20} />}
              >
                <div className="space-y-4">
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No upcoming meetings</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Your schedule is clear for the next 7 days
                    </p>
                  </div>
                  <Link to="/consultant/availability">
                    <Button className="w-full">Set Availability</Button>
                  </Link>
                </div>
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantDashboard;
