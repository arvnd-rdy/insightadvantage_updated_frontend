
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MessageSquare, 
  User, 
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Eye
} from 'lucide-react';

// Mock data for request details
const mockRequest = {
  id: '1',
  title: 'Vocational Assessment Expert for Return-to-Work Program',
  type: 'Vocational Assessment Services',
  description: 'We are seeking an experienced vocational assessment specialist to help develop and implement a comprehensive return-to-work program for our clients with disabilities. The ideal candidate will have extensive experience in conducting vocational evaluations, developing individualized rehabilitation plans, and collaborating with multidisciplinary teams.',
  expertiseLevel: 'Advanced',
  duration: 'Long-term (3+ months)',
  budgetType: 'Hourly Rate',
  budgetMin: 150,
  budgetMax: 250,
  workModes: ['Remote', 'Hybrid'],
  location: 'Boston, MA',
  deadline: '2024-02-15',
  contactPerson: 'Emma Rodriguez',
  contactEmail: 'emma@techvision.com',
  contactPhone: '(555) 123-4567',
  status: 'Open',
  datePosted: '2024-01-15',
  applicants: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Senior Vocational Rehabilitation Counselor',
      experience: 'Expert-Level (15+ years)',
      specializations: ['Vocational Assessment', 'Return-to-Work', 'Disability Management'],
      appliedDate: '2024-01-16',
      status: 'Shortlisted',
      location: 'Boston, MA',
      hourlyRate: '$180',
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Vocational Assessment Specialist',
      experience: 'Advanced (10 years)',
      specializations: ['Vocational Assessment', 'Career Planning', 'Job Placement'],
      appliedDate: '2024-01-17',
      status: 'Applied',
      location: 'Cambridge, MA',
      hourlyRate: '$165',
    },
    {
      id: '3',
      name: 'Lisa Thompson',
      title: 'Rehabilitation Counselor',
      experience: 'Senior-Level (8 years)',
      specializations: ['Vocational Assessment', 'Assistive Technology', 'Case Management'],
      appliedDate: '2024-01-18',
      status: 'Viewed',
      location: 'Remote',
      hourlyRate: '$155',
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Applied': return 'bg-blue-100 text-blue-800';
    case 'Viewed': return 'bg-yellow-100 text-yellow-800';
    case 'Shortlisted': return 'bg-green-100 text-green-800';
    case 'Interviewing': return 'bg-purple-100 text-purple-800';
    case 'Hired': return 'bg-emerald-100 text-emerald-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const RequestDetail = () => {
  const { id } = useParams();
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);

  const handleStatusUpdate = (applicantId: string, newStatus: string) => {
    console.log(`Updating applicant ${applicantId} status to ${newStatus}`);
    // Here you would update the status in your backend
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
              <Link to="/organization/manage-requests">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Requests
                </Button>
              </Link>
              
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{mockRequest.title}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>Posted on {new Date(mockRequest.datePosted).toLocaleDateString()}</span>
                    <Badge className={getStatusColor(mockRequest.status)}>
                      {mockRequest.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Request
                  </Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Request Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Type of Consulting</h4>
                      <p className="text-gray-600">{mockRequest.type}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600">{mockRequest.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Expertise Level</h4>
                        <p className="text-gray-600">{mockRequest.expertiseLevel}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                        <p className="text-gray-600">{mockRequest.duration}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Budget Range</h4>
                        <p className="text-gray-600">
                          ${mockRequest.budgetMin} - ${mockRequest.budgetMax} ({mockRequest.budgetType})
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Work Mode</h4>
                        <p className="text-gray-600">{mockRequest.workModes.join(', ')}</p>
                      </div>
                    </div>
                    
                    {mockRequest.location && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {mockRequest.location}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Applicants Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Applicants ({mockRequest.applicants.length})
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="viewed">Viewed</SelectItem>
                          <SelectItem value="shortlisted">Shortlisted</SelectItem>
                          <SelectItem value="interviewing">Interviewing</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Consultant</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockRequest.applicants.map((applicant) => (
                          <TableRow key={applicant.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>
                                    {applicant.name.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{applicant.name}</p>
                                  <p className="text-sm text-gray-600">{applicant.title}</p>
                                  <p className="text-sm text-gray-500">{applicant.hourlyRate}/hour</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{applicant.experience}</p>
                                <p className="text-sm text-gray-600">
                                  {applicant.specializations.slice(0, 2).join(', ')}
                                  {applicant.specializations.length > 2 && '...'}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(applicant.appliedDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Select 
                                value={applicant.status}
                                onValueChange={(value) => handleStatusUpdate(applicant.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Applied">Applied</SelectItem>
                                  <SelectItem value="Viewed">Viewed</SelectItem>
                                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                                  <SelectItem value="Hired">Hired</SelectItem>
                                  <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <User className="h-4 w-4 mr-1" />
                                  Profile
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with quick stats and contact info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Applicants</span>
                      <span className="font-bold text-2xl">{mockRequest.applicants.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Shortlisted</span>
                      <span className="font-bold text-green-600">
                        {mockRequest.applicants.filter(a => a.status === 'Shortlisted').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Days Remaining</span>
                      <span className="font-bold text-blue-600">
                        {Math.ceil((new Date(mockRequest.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">{mockRequest.contactPerson}</p>
                      <p className="text-sm text-gray-600">{mockRequest.contactEmail}</p>
                      <p className="text-sm text-gray-600">{mockRequest.contactPhone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Deadline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="font-medium">
                        {new Date(mockRequest.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RequestDetail;
