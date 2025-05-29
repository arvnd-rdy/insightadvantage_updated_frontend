
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const AdminUsers = () => {
  // Mock user data
  const users = [
    {
      id: '1',
      name: 'John Mitchell',
      email: 'john@example.com',
      role: 'Consultant',
      status: 'active',
      lastActive: '2 hours ago',
      joinDate: 'Jan 12, 2024',
    },
    {
      id: '2',
      name: 'Tech Solutions Inc.',
      email: 'contact@techsolutions.com',
      role: 'Organization',
      status: 'active',
      lastActive: '1 day ago',
      joinDate: 'Feb 23, 2024',
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma@example.com',
      role: 'Consultant',
      status: 'inactive',
      lastActive: '3 weeks ago',
      joinDate: 'Nov 05, 2023',
    },
    {
      id: '4',
      name: 'Innovate Labs',
      email: 'info@innovatelabs.com',
      role: 'Organization',
      status: 'active',
      lastActive: '5 hours ago',
      joinDate: 'Mar 10, 2024',
    },
    {
      id: '5',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Admin',
      status: 'active',
      lastActive: 'Just now',
      joinDate: 'Dec 08, 2023',
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
              <h2 className="text-2xl font-bold mb-2">User Management</h2>
              <p className="text-gray-600">
                View and manage all users in the system.
              </p>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Users</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-9 w-[250px]"
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-gray-200">
                              {user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            user.role === 'Admin' ? 'default' :
                            user.role === 'Consultant' ? 'secondary' : 'outline'
                          }>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center space-x-2`}>
                            <div className={`h-2 w-2 rounded-full ${
                              user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            <span className="capitalize">{user.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
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

export default AdminUsers;
