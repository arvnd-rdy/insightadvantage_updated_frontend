import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Building, DollarSign, Users, Calendar, Heart, Filter, ChevronDown, Search, Briefcase } from 'lucide-react';
import ConsultantTopNav from '@/components/ConsultantTopNav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for jobs
const jobs = [
    {
        id: '1',
        title: 'Vocational Assessment Specialist',
        organization: 'TechCare Rehabilitation',
        location: 'Toronto, ON',
        workMode: 'Remote',
        budget: '$55/hour',
        posted: '3d ago',
        applicants: 2,
        isNew: true,
        isSaved: false,
        description: 'Seeking a specialist for comprehensive vocational assessments for clients returning to work.',
        skills: ['Vocational Assessment', 'Return-to-Work Planning', 'Career Counseling'],
    },
    {
        id: '2',
        title: 'Career Counselor (Youth)',
        organization: 'Future Pathways Inc.',
        location: 'Vancouver, BC',
        workMode: 'Hybrid',
        budget: '$45/hour',
        posted: '1w ago',
        applicants: 8,
        isNew: false,
        isSaved: true,
        description: 'Provide career counseling to youth transitioning from education to employment.',
        skills: ['Career Counseling', 'Youth Services', 'Transition Planning'],
    },
    {
        id: '3',
        title: 'Disability Management Consultant',
        organization: 'Workplace Solutions',
        location: 'Calgary, AB',
        workMode: 'On-site',
        budget: '$65/hour',
        posted: '2d ago',
        applicants: 12,
        isNew: true,
        isSaved: false,
        description: 'Develop and implement disability management programs for corporate clients.',
        skills: ['Disability Management', 'Workplace Accommodation', 'Program Development'],
    },
    // Add more mock jobs as needed
];

const JobCard = ({ job, isSelected, onClick }) => (
    <Card
        className={`cursor-pointer transition-all duration-200 ${isSelected ? 'border-blue-500 shadow-md' : 'border-transparent hover:shadow-lg'}`}
        onClick={onClick}
    >
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">{job.title}</CardTitle>
                    <p className="text-sm text-gray-600">{job.organization}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); /* Handle save */ }}>
                    <Heart className={`h-5 w-5 ${job.isSaved ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center text-sm text-gray-500 mb-3">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>{job.workMode}</span>
                <span className="mx-2">|</span>
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{job.budget}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{job.posted}</span>
                <span>{job.applicants} applicants</span>
            </div>
        </CardContent>
    </Card>
);

const JobDetails = ({ job }) => {
    if (!job) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a job to see details</p>
            </div>
        );
    }

    return (
        <Card className="h-full shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-gray-900">{job.title}</CardTitle>
                    <Button>Apply Now</Button>
                </div>
                <p className="text-md text-gray-700 font-semibold">{job.organization}</p>
                <p className="text-sm text-gray-500 flex items-center"><MapPin className="h-4 w-4 mr-2" />{job.location}</p>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700 mb-6">{job.description}</p>
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                </div>
                <Separator />
                <div className="mt-6 text-sm text-gray-600">
                    <div className="flex items-center mb-2"><Briefcase className="h-4 w-4 mr-2" /> {job.workMode}</div>
                    <div className="flex items-center mb-2"><DollarSign className="h-4 w-4 mr-2" /> {job.budget}</div>
                    <div className="flex items-center"><Users className="h-4 w-4 mr-2" /> {job.applicants} applicants</div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function LinkedInJobs() {
    const [selectedJob, setSelectedJob] = useState(jobs[0]);
    const [activeTab, setActiveTab] = useState('search'); // 'search' or 'saved'

    return (
        <div className="min-h-screen bg-gray-50">
            <ConsultantTopNav />
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Input placeholder="Job title, keyword, or company" className="pl-10 w-full" />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="toronto">Toronto, ON</SelectItem>
                                    <SelectItem value="vancouver">Vancouver, BC</SelectItem>
                                    <SelectItem value="calgary">Calgary, AB</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Work Mode" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="remote">Remote</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="on-site">On-site</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Salary" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="50">$50k+</SelectItem>
                                    <SelectItem value="75">$75k+</SelectItem>
                                    <SelectItem value="100">$100k+</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline">All Filters</Button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Job List */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex border-b">
                            <button
                                className={`py-2 px-4 text-sm font-medium ${activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('search')}
                            >
                                All Jobs ({jobs.length})
                            </button>
                            <button
                                className={`py-2 px-4 text-sm font-medium ${activeTab === 'saved' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('saved')}
                            >
                                Saved Jobs ({jobs.filter(j => j.isSaved).length})
                            </button>
                        </div>

                        <div className="space-y-4 h-[calc(100vh-16rem)] overflow-y-auto pr-2">
                            {(activeTab === 'search' ? jobs : jobs.filter(j => j.isSaved)).map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isSelected={selectedJob?.id === job.id}
                                    onClick={() => setSelectedJob(job)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Job Details */}
                    <div className="lg:col-span-2">
                        <JobDetails job={selectedJob} />
                    </div>
                </div>
            </main>
        </div>
    );
} 