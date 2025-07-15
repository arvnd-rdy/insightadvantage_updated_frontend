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
    // 20 more mock jobs
    {
        id: '4',
        title: 'Rehabilitation Case Manager',
        organization: 'HealthFirst',
        location: 'Ottawa, ON',
        workMode: 'Remote',
        budget: '$50/hour',
        posted: '5d ago',
        applicants: 5,
        isNew: false,
        isSaved: false,
        description: 'Coordinate rehabilitation plans for injured workers.',
        skills: ['Case Management', 'Rehabilitation', 'Client Coordination'],
    },
    {
        id: '5',
        title: 'Occupational Therapist',
        organization: 'Active Life',
        location: 'Edmonton, AB',
        workMode: 'On-site',
        budget: '$60/hour',
        posted: '1w ago',
        applicants: 7,
        isNew: false,
        isSaved: false,
        description: 'Assist clients in regaining daily living skills.',
        skills: ['Occupational Therapy', 'Client Assessment', 'Rehabilitation'],
    },
    {
        id: '6',
        title: 'Return-to-Work Coordinator',
        organization: 'WorkSafe Solutions',
        location: 'Halifax, NS',
        workMode: 'Hybrid',
        budget: '$52/hour',
        posted: '2w ago',
        applicants: 3,
        isNew: false,
        isSaved: false,
        description: 'Coordinate return-to-work programs for employees.',
        skills: ['Return-to-Work', 'Program Coordination', 'HR'],
    },
    {
        id: '7',
        title: 'Vocational Evaluator',
        organization: 'Pathways Consulting',
        location: 'Montreal, QC',
        workMode: 'Remote',
        budget: '$58/hour',
        posted: '4d ago',
        applicants: 4,
        isNew: true,
        isSaved: false,
        description: 'Conduct vocational evaluations for disability claims.',
        skills: ['Vocational Evaluation', 'Report Writing', 'Assessment'],
    },
    {
        id: '8',
        title: 'Job Placement Specialist',
        organization: 'CareerBridge',
        location: 'Winnipeg, MB',
        workMode: 'On-site',
        budget: '$48/hour',
        posted: '3d ago',
        applicants: 6,
        isNew: false,
        isSaved: false,
        description: 'Help clients secure suitable employment.',
        skills: ['Job Placement', 'Employer Relations', 'Interview Coaching'],
    },
    {
        id: '9',
        title: 'Ergonomics Consultant',
        organization: 'ErgoPro',
        location: 'Victoria, BC',
        workMode: 'Hybrid',
        budget: '$70/hour',
        posted: '1w ago',
        applicants: 2,
        isNew: false,
        isSaved: false,
        description: 'Assess and improve workplace ergonomics.',
        skills: ['Ergonomics', 'Workplace Assessment', 'Injury Prevention'],
    },
    {
        id: '10',
        title: 'Labour Market Analyst',
        organization: 'Market Insights',
        location: 'Toronto, ON',
        workMode: 'Remote',
        budget: '$62/hour',
        posted: '2w ago',
        applicants: 1,
        isNew: false,
        isSaved: false,
        description: 'Analyze labour market trends for consulting clients.',
        skills: ['Labour Market Analysis', 'Data Analysis', 'Reporting'],
    },
    {
        id: '11',
        title: 'Disability Claims Consultant',
        organization: 'ClaimCare',
        location: 'Calgary, AB',
        workMode: 'On-site',
        budget: '$66/hour',
        posted: '3d ago',
        applicants: 8,
        isNew: false,
        isSaved: false,
        description: 'Advise on complex disability claims.',
        skills: ['Disability Claims', 'Case Review', 'Client Advocacy'],
    },
    {
        id: '12',
        title: 'Medical-Legal Expert',
        organization: 'LegalMed',
        location: 'Vancouver, BC',
        workMode: 'Remote',
        budget: '$120/hour',
        posted: '1w ago',
        applicants: 2,
        isNew: false,
        isSaved: false,
        description: 'Provide expert testimony for legal cases.',
        skills: ['Medical-Legal', 'Expert Testimony', 'Report Writing'],
    },
    {
        id: '13',
        title: 'Rehabilitation Support Worker',
        organization: 'Supportive Steps',
        location: 'Ottawa, ON',
        workMode: 'On-site',
        budget: '$35/hour',
        posted: '2w ago',
        applicants: 5,
        isNew: false,
        isSaved: false,
        description: 'Support clients in rehabilitation programs.',
        skills: ['Rehabilitation', 'Client Support', 'Documentation'],
    },
    {
        id: '14',
        title: 'Functional Capacity Evaluator',
        organization: 'Capacity Assessors',
        location: 'Edmonton, AB',
        workMode: 'Hybrid',
        budget: '$75/hour',
        posted: '1w ago',
        applicants: 3,
        isNew: false,
        isSaved: false,
        description: 'Conduct functional capacity evaluations for insurance claims.',
        skills: ['Functional Capacity', 'Assessment', 'Insurance'],
    },
    {
        id: '15',
        title: 'Job Coach',
        organization: 'EmpowerWorks',
        location: 'Halifax, NS',
        workMode: 'Remote',
        budget: '$40/hour',
        posted: '3d ago',
        applicants: 4,
        isNew: false,
        isSaved: false,
        description: 'Coach clients through job search and onboarding.',
        skills: ['Job Coaching', 'Resume Writing', 'Interview Prep'],
    },
    {
        id: '16',
        title: 'Workplace Accommodation Specialist',
        organization: 'Inclusive Solutions',
        location: 'Montreal, QC',
        workMode: 'On-site',
        budget: '$68/hour',
        posted: '2w ago',
        applicants: 2,
        isNew: false,
        isSaved: false,
        description: 'Advise employers on workplace accommodations.',
        skills: ['Accommodation', 'Accessibility', 'HR Consulting'],
    },
    {
        id: '17',
        title: 'Life Care Planner',
        organization: 'FutureCare',
        location: 'Toronto, ON',
        workMode: 'Remote',
        budget: '$110/hour',
        posted: '1w ago',
        applicants: 1,
        isNew: false,
        isSaved: false,
        description: 'Develop life care plans for clients with disabilities.',
        skills: ['Life Care Planning', 'Disability', 'Client Advocacy'],
    },
    {
        id: '18',
        title: 'Case Management Supervisor',
        organization: 'HealthFirst',
        location: 'Calgary, AB',
        workMode: 'Hybrid',
        budget: '$80/hour',
        posted: '3d ago',
        applicants: 6,
        isNew: false,
        isSaved: false,
        description: 'Supervise a team of case managers.',
        skills: ['Supervision', 'Case Management', 'Team Leadership'],
    },
    {
        id: '19',
        title: 'Expert Witness (Rehabilitation)',
        organization: 'LegalMed',
        location: 'Vancouver, BC',
        workMode: 'Remote',
        budget: '$130/hour',
        posted: '2w ago',
        applicants: 2,
        isNew: false,
        isSaved: false,
        description: 'Provide expert witness services for rehabilitation cases.',
        skills: ['Expert Witness', 'Rehabilitation', 'Legal'],
    },
    {
        id: '20',
        title: 'Coaching Specialist',
        organization: 'EmpowerWorks',
        location: 'Ottawa, ON',
        workMode: 'On-site',
        budget: '$42/hour',
        posted: '1w ago',
        applicants: 3,
        isNew: false,
        isSaved: false,
        description: 'Provide coaching for career transitions.',
        skills: ['Coaching', 'Career Transition', 'Client Support'],
    },
    {
        id: '21',
        title: 'Labour Market Surveyor',
        organization: 'Market Insights',
        location: 'Edmonton, AB',
        workMode: 'Hybrid',
        budget: '$60/hour',
        posted: '3d ago',
        applicants: 2,
        isNew: false,
        isSaved: false,
        description: 'Conduct labour market surveys for consulting projects.',
        skills: ['Labour Market Survey', 'Data Collection', 'Reporting'],
    },
    {
        id: '22',
        title: 'Disability Management Advisor',
        organization: 'Workplace Solutions',
        location: 'Halifax, NS',
        workMode: 'Remote',
        budget: '$72/hour',
        posted: '2w ago',
        applicants: 1,
        isNew: false,
        isSaved: false,
        description: 'Advise organizations on disability management best practices.',
        skills: ['Disability Management', 'Consulting', 'Policy'],
    },
    {
        id: '23',
        title: 'Psycho Vocational Evaluator',
        organization: 'Pathways Consulting',
        location: 'Montreal, QC',
        workMode: 'On-site',
        budget: '$90/hour',
        posted: '1w ago',
        applicants: 2,
        isNew: false,
        isSaved: false,
        description: 'Conduct psycho-vocational evaluations for clients.',
        skills: ['Psycho Vocational', 'Assessment', 'Reporting'],
    },
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
    const [currentPage, setCurrentPage] = useState(1);
    const JOBS_PER_PAGE = 20;

    // Filter jobs based on tab
    const filteredJobs = activeTab === 'search' ? jobs : jobs.filter(j => j.isSaved);
    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
    const paginatedJobs = filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

    // Handle page change
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        // Optionally, scroll to top of job list
    };

    // Reset to page 1 when tab changes or filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gray-50">
            <ConsultantTopNav />
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto py-4 px-4">
                    {/* Filters Bar - make sticky */}
                    <div className="sticky top-16 z-20 bg-white pb-2">
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
                            {paginatedJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isSelected={selectedJob?.id === job.id}
                                    onClick={() => setSelectedJob(job)}
                                />
                            ))}
                        </div>
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-4">
                                <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt; Prev</Button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <Button
                                        key={i + 1}
                                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => goToPage(i + 1)}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next &gt;</Button>
                            </div>
                        )}
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