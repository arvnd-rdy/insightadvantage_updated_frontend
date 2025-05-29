
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardCard from '@/components/DashboardCard';
import ConsultantCard from '@/components/ConsultantCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Search, Clock, Building, Users, Plus, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrganizationDashboard = () => {
  // Mock organization data
  const organizationData = {
    name: "Emma Rodriguez",
    companyName: "TechVision Inc.",
    profileCompletion: 80,
    recentSearches: [
      { id: "1", query: "Strategy consultants in Boston", date: "2 days ago" },
      { id: "2", query: "Digital marketing experts", date: "Last week" },
    ],
    recentConsultants: [
      {
        id: "1",
        name: "John Mitchell",
        title: "Strategy Consultant",
        location: "Boston, MA",
        hourlyRate: "$180",
        availability: "Full-time",
        expertise: ["Strategy", "Business Development", "Market Research"],
      },
      {
        id: "2",
        name: "Lisa Chen",
        title: "Digital Marketing Specialist",
        location: "San Francisco, CA",
        hourlyRate: "$150",
        availability: "Part-time",
        expertise: ["SEO", "Social Media", "Content Strategy"],
      },
    ],
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="organization" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName={organizationData.name}
            userRole="organization"
          />
          
          <main className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome, {organizationData.name}
                  </h2>
                  <p className="text-gray-600">
                    Find the perfect consultant for your organization's needs.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/organization/manage-requests">
                    <Button variant="outline">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Manage Requests
                    </Button>
                  </Link>
                  <Link to="/organization/post-request">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Request
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard 
                title="Company Profile" 
                description="Complete your company profile"
                icon={<Building size={20} />}
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{organizationData.profileCompletion}% Complete</span>
                    <span className="text-muted-foreground">20% to go</span>
                  </div>
                  <Progress value={organizationData.profileCompletion} className="h-2" />
                  <Link to="/organization/profile">
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
              
              <DashboardCard 
                title="Recent Searches" 
                description="Your recent consultant searches"
                icon={<Search size={20} />}
              >
                <div className="space-y-3">
                  {organizationData.recentSearches.map((search) => (
                    <div key={search.id} className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="font-medium">{search.query}</p>
                        <p className="text-gray-500 text-xs">{search.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                  <Link to="/organization/search">
                    <Button variant="link" className="p-0 h-auto text-sm">
                      New Search
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
              
              <DashboardCard 
                title="Subscription Status" 
                description="Your current plan and usage"
                icon={<Clock size={20} />}
              >
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">Enterprise Plan</p>
                    <p className="text-sm text-green-600 font-medium">Active</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Renews on June 15, 2023</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile views</span>
                      <span>25/100</span>
                    </div>
                    <Progress value={25} className="h-1.5" />
                  </div>
                  <Link to="/organization/subscription">
                    <Button variant="link" className="p-0 h-auto text-sm mt-4">
                      Manage Subscription
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Recently Viewed Consultants</h3>
                <Link to="/organization/search">
                  <Button variant="outline">Find More Consultants</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organizationData.recentConsultants.map((consultant) => (
                  <ConsultantCard 
                    key={consultant.id}
                    id={consultant.id}
                    name={consultant.name}
                    title={consultant.title}
                    location={consultant.location}
                    hourlyRate={consultant.hourlyRate}
                    availability={consultant.availability}
                    expertise={consultant.expertise}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <DashboardCard 
                title="Insight Advantage Inc. Team" 
                description="Have questions? Our team is here to help."
                icon={<Users size={20} />}
              >
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                  <p className="text-sm">
                    Need help finding the perfect consultant? Our team can assist you with personalized recommendations.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline">Contact Support</Button>
                  <Button>Schedule a Call</Button>
                </div>
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OrganizationDashboard;
