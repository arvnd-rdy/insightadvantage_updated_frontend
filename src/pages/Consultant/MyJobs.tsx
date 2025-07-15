import React from 'react';
import ConsultantLayout from '@/components/ConsultantLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MessageSquare, Clock, CheckCircle, FileText, ArrowRight } from 'lucide-react';

// Mock Data
const activeGigs = [
  {
    id: 'gig1',
    title: 'Ongoing Ergonomic Assessment',
    organization: 'Innovatech Solutions',
    status: 'Active',
    duration: 'Jan 2024 - Jun 2024',
    rate: '$75/hr',
  },
];

const applications = [
  {
    id: 'app1',
    title: 'Vocational Rehabilitation Counselor',
    organization: 'HealthBridge Wellness',
    status: 'Application Submitted',
    date: '2 days ago',
  },
  {
    id: 'app2',
    title: 'Disability Management Specialist',
    organization: 'CorporateCare Inc.',
    status: 'Under Review',
    date: '1 week ago',
  },
];

const pastGigs = [
  {
    id: 'past1',
    title: 'Career Transition Coaching',
    organization: 'NextStep Careers',
    status: 'Completed',
    duration: 'Oct 2023 - Dec 2023',
    rate: '$60/hr',
  },
];

const JobCard = ({ job }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">{job.title}</CardTitle>
          <CardDescription>{job.organization}</CardDescription>
        </div>
        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>{job.status}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center text-sm text-gray-500">
        <Clock className="h-4 w-4 mr-2" />
        <span>{job.duration || job.date}</span>
        {job.rate && 
          <>
            <span className="mx-2">|</span>
            <span>{job.rate}</span>
          </>
        }
      </div>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-2"/>Message</Button>
        <Button size="sm">View Details <ArrowRight className="h-4 w-4 ml-2"/></Button>
    </CardFooter>
  </Card>
);

const EmptyState = ({ title, description }) => (
    <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 mt-2">{description}</p>
        <Button className="mt-4">Find New Opportunities</Button>
    </div>
);

const ConsultantMyJobs = () => {
  return (
    <ConsultantLayout>
      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
            <p className="text-gray-600 mt-1">Track and manage your job applications and contracts.</p>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Gigs ({activeGigs.length})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
            <TabsTrigger value="past">Past Gigs ({pastGigs.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid gap-6 mt-6">
              {activeGigs.length > 0 ? (
                activeGigs.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <EmptyState title="No Active Gigs" description="Your active projects will appear here once a contract starts." />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="applications">
            <div className="grid gap-6 mt-6">
              {applications.length > 0 ? (
                applications.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <EmptyState title="No Applications" description="When you apply for jobs, you can track their status here." />
              )}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 mt-6">
              {pastGigs.length > 0 ? (
                pastGigs.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <EmptyState title="No Past Gigs" description="Your completed projects and work history will be stored here." />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConsultantLayout>
  );
};

export default ConsultantMyJobs; 