
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardCard from '@/components/DashboardCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, BarChart2, Check, X, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock admin data
  const adminData = {
    name: "Admin User",
    pendingApprovals: [
      { 
        id: "1", 
        name: "Robert Clark", 
        role: "consultant", 
        title: "Supply Chain Consultant", 
        date: "2023-05-20",
        avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      { 
        id: "2", 
        name: "TechSolutions Inc.", 
        role: "organization", 
        industry: "Technology", 
        date: "2023-05-19",
        avatarUrl: ""
      },
    ],
    recentSubscriptions: [
      {
        id: "1",
        name: "Green Consulting Group",
        role: "organization",
        plan: "Enterprise",
        amount: "$199",
        date: "2023-05-18",
        status: "active"
      },
      {
        id: "2",
        name: "Sarah Johnson",
        role: "consultant",
        plan: "Professional",
        amount: "$99",
        date: "2023-05-17",
        status: "active"
      },
      {
        id: "3",
        name: "Michael Chen",
        role: "consultant",
        plan: "Basic",
        amount: "$49",
        date: "2023-05-15",
        status: "trial"
      },
    ],
    analytics: {
      activeUsers: 487,
      newUsersThisMonth: 56,
      totalRevenue: "$45,320",
      averageRating: 4.8,
    },
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="admin" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName={adminData.name}
            userRole="admin"
          />
          
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
              <p className="text-gray-600">
                Manage users, subscriptions, and platform analytics.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard 
                title="Active Users" 
                icon={<Users size={20} />}
              >
                <div className="text-3xl font-bold">{adminData.analytics.activeUsers}</div>
                <p className="text-sm text-gray-500 mt-1">
                  +{adminData.analytics.newUsersThisMonth} this month
                </p>
              </DashboardCard>
              
              <DashboardCard 
                title="Total Revenue" 
                icon={<DollarSign size={20} />}
              >
                <div className="text-3xl font-bold">{adminData.analytics.totalRevenue}</div>
                <p className="text-sm text-gray-500 mt-1">
                  Monthly recurring
                </p>
              </DashboardCard>
              
              <DashboardCard 
                title="Average Rating" 
                icon={<BarChart2 size={20} />}
              >
                <div className="text-3xl font-bold">{adminData.analytics.averageRating}</div>
                <p className="text-sm text-gray-500 mt-1">
                  Out of 5.0
                </p>
              </DashboardCard>
              
              <DashboardCard 
                title="Pending Approvals" 
                icon={<Clock size={20} />}
              >
                <div className="text-3xl font-bold">{adminData.pendingApprovals.length}</div>
                <p className="text-sm text-gray-500 mt-1">
                  Requiring attention
                </p>
              </DashboardCard>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard 
                title="Pending Approvals" 
                description="New registrations awaiting verification"
              >
                <div className="space-y-4">
                  {adminData.pendingApprovals.length > 0 ? (
                    adminData.pendingApprovals.map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          <Avatar className="mr-4">
                            <AvatarImage src={approval.avatarUrl} />
                            <AvatarFallback className={approval.role === 'consultant' ? 'bg-brand-blue' : 'bg-brand-teal'}>
                              {approval.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{approval.name}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={approval.role === 'consultant' ? 'border-brand-blue text-brand-blue' : 'border-brand-teal text-brand-teal'}>
                                {approval.role === 'consultant' ? 'Consultant' : 'Organization'}
                              </Badge>
                              <p className="text-sm text-gray-500">
                                {approval.role === 'consultant' ? approval.title : approval.industry}
                              </p>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              Applied on {new Date(approval.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                            <X size={16} className="mr-1" /> Decline
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check size={16} className="mr-1" /> Approve
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No pending approvals</p>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <Link to="/admin/users">
                      <Button variant="link" className="mx-auto">
                        View All User Management
                      </Button>
                    </Link>
                  </div>
                </div>
              </DashboardCard>
              
              <DashboardCard 
                title="Recent Subscriptions" 
                description="Latest subscription activity"
              >
                <Tabs defaultValue="active">
                  <TabsList className="mb-4 grid w-full grid-cols-3">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="trial">Trial</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="space-y-4">
                    {adminData.recentSubscriptions.filter(sub => sub.status === 'active').map((subscription) => (
                      <div key={subscription.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{subscription.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={subscription.role === 'consultant' ? 'border-brand-blue text-brand-blue' : 'border-brand-teal text-brand-teal'}>
                              {subscription.role === 'consultant' ? 'Consultant' : 'Organization'}
                            </Badge>
                            <p className="text-sm text-gray-500">{subscription.plan} Plan</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Subscribed on {new Date(subscription.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{subscription.amount}</p>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center">
                      <Link to="/admin/subscriptions">
                        <Button variant="link" className="mx-auto">
                          View All Subscriptions
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trial" className="space-y-4">
                    {adminData.recentSubscriptions.filter(sub => sub.status === 'trial').map((subscription) => (
                      <div key={subscription.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{subscription.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={subscription.role === 'consultant' ? 'border-brand-blue text-brand-blue' : 'border-brand-teal text-brand-teal'}>
                              {subscription.role === 'consultant' ? 'Consultant' : 'Organization'}
                            </Badge>
                            <p className="text-sm text-gray-500">{subscription.plan} Plan</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Trial started on {new Date(subscription.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{subscription.amount}</p>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            Trial
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="expired" className="space-y-4">
                    <div className="text-center py-6">
                      <p className="text-gray-500">No expired subscriptions in the last 30 days</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
