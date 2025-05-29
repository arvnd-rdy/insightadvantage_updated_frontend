
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalytics = () => {
  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', consultants: 65, organizations: 40 },
    { month: 'Feb', consultants: 75, organizations: 45 },
    { month: 'Mar', consultants: 90, organizations: 53 },
    { month: 'Apr', consultants: 110, organizations: 62 },
    { month: 'May', consultants: 125, organizations: 70 },
    { month: 'Jun', consultants: 150, organizations: 85 },
  ];
  
  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 14200 },
    { month: 'Mar', revenue: 15800 },
    { month: 'Apr', revenue: 17500 },
    { month: 'May', revenue: 19200 },
    { month: 'Jun', revenue: 22500 },
  ];
  
  const platformActivityData = [
    { name: 'Search', value: 35 },
    { name: 'Profile Views', value: 25 },
    { name: 'Connections', value: 20 },
    { name: 'Messages', value: 15 },
    { name: 'Document Views', value: 5 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="admin" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Admin"
            userRole="admin"
          />
          
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Platform Analytics</h2>
                <p className="text-gray-600">
                  Monitor key performance metrics and user activity.
                </p>
              </div>
              
              <Select defaultValue="last30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last3months">Last 3 months</SelectItem>
                  <SelectItem value="last6months">Last 6 months</SelectItem>
                  <SelectItem value="lastyear">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4,325</div>
                  <p className="text-sm text-green-600">+15% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Consultants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,154</div>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Organizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,267</div>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Connections Made</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">789</div>
                  <p className="text-sm text-green-600">+23% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="growth" className="space-y-6">
              <TabsList>
                <TabsTrigger value="growth">User Growth</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="activity">Platform Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="growth">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={userGrowthData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="consultants" stroke="#8884d8" activeDot={{ r: 8 }} name="Consultants" />
                          <Line type="monotone" dataKey="organizations" stroke="#82ca9d" name="Organizations" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="revenue">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={revenueData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Activity Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={platformActivityData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 60,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          <Legend />
                          <Bar dataKey="value" fill="#82ca9d" name="Percentage" />
                        </BarChart>
                      </ResponsiveContainer>
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

export default AdminAnalytics;
