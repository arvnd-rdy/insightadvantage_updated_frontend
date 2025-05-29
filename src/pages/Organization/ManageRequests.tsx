
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Filter, Eye, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for requests
const mockRequests = [
  {
    id: '1',
    title: 'Vocational Assessment Expert for Return-to-Work Program',
    datePosted: '2024-01-15',
    status: 'Open',
    applicants: 8,
    deadline: '2024-02-15',
    type: 'Vocational Assessment Services',
  },
  {
    id: '2',
    title: 'Career Counselor for Youth Transition Services',
    datePosted: '2024-01-10',
    status: 'Hiring',
    applicants: 12,
    deadline: '2024-02-10',
    type: 'Career Exploration and Planning',
  },
  {
    id: '3',
    title: 'Disability Accommodation Specialist',
    datePosted: '2024-01-08',
    status: 'Closed',
    applicants: 5,
    deadline: '2024-01-25',
    type: 'Disability Accommodation Consulting',
  },
  {
    id: '4',
    title: 'Job Placement Coordinator - Remote',
    datePosted: '2024-01-20',
    status: 'Draft',
    applicants: 0,
    deadline: '2024-02-20',
    type: 'Job Placement and Support',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-green-100 text-green-800';
    case 'Closed': return 'bg-gray-100 text-gray-800';
    case 'Hiring': return 'bg-blue-100 text-blue-800';
    case 'Filled': return 'bg-purple-100 text-purple-800';
    case 'Draft': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ManageRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('datePosted');

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            <div className="mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Manage Consulting Requests</h1>
                  <p className="text-gray-600">
                    Track, manage, and review all your posted consulting opportunities.
                  </p>
                </div>
                <Link to="/organization/post-request">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Request
                  </Button>
                </Link>
              </div>

              {/* Filters and Search */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search requests by title or type..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="hiring">Hiring</SelectItem>
                          <SelectItem value="filled">Filled</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="datePosted">Date Posted</SelectItem>
                          <SelectItem value="title">Title</SelectItem>
                          <SelectItem value="applicants">Applicants</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requests Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Consulting Requests ({filteredRequests.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date Posted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applicants</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <Link 
                              to={`/organization/request/${request.id}`}
                              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {request.title}
                            </Link>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {request.type}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              {new Date(request.datePosted).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">{request.applicants}</span>
                              <span className="text-gray-500 ml-1">applicants</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              {new Date(request.deadline).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Link to={`/organization/request/${request.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ManageRequests;
