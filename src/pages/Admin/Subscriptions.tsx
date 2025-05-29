
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Download, MoreHorizontal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AdminSubscriptions = () => {
  // Mock subscription data
  const subscriptions = [
    {
      id: '1',
      user: 'John Mitchell',
      plan: 'Professional',
      status: 'active',
      amount: '$29/month',
      renewDate: 'Jun 15, 2024',
      usagePercent: 70,
    },
    {
      id: '2',
      user: 'Tech Solutions Inc.',
      plan: 'Business',
      status: 'active',
      amount: '$99/month',
      renewDate: 'May 30, 2024',
      usagePercent: 45,
    },
    {
      id: '3',
      user: 'Emma Rodriguez',
      plan: 'Basic',
      status: 'canceled',
      amount: '$0',
      renewDate: 'N/A',
      usagePercent: 100,
    },
    {
      id: '4',
      user: 'Innovate Labs',
      plan: 'Enterprise',
      status: 'active',
      amount: '$299/month',
      renewDate: 'Jul 05, 2024',
      usagePercent: 25,
    },
    {
      id: '5',
      user: 'Sarah Williams',
      plan: 'Premium',
      status: 'past_due',
      amount: '$79/month',
      renewDate: 'May 10, 2024',
      usagePercent: 90,
    },
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Subscription Management</h2>
              <p className="text-gray-600">
                Monitor and manage user subscriptions and billing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">325</div>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$15,843</div>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.4%</div>
                  <p className="text-sm text-red-600">+0.3% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Subscriptions</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search subscriptions..." 
                      className="pl-9 w-[250px]"
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Next Renewal</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div className="font-medium">{sub.user}</div>
                        </TableCell>
                        <TableCell>{sub.plan}</TableCell>
                        <TableCell>
                          <Badge variant={
                            sub.status === 'active' ? 'default' :
                            sub.status === 'canceled' ? 'destructive' : 'outline'
                          }>
                            <span className="capitalize">
                              {sub.status === 'past_due' ? 'Past Due' : sub.status}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>{sub.amount}</TableCell>
                        <TableCell>{sub.renewDate}</TableCell>
                        <TableCell>
                          <div className="w-full space-y-1">
                            <Progress value={sub.usagePercent} className="h-1.5" />
                            <div className="text-xs text-gray-500">{sub.usagePercent}%</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminSubscriptions;
