import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Building, DollarSign, Users, Calendar, Heart, Filter, ChevronDown, Search, Briefcase } from 'lucide-react';
import ConsultantTopNav from '@/components/ConsultantTopNav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for jobs
const jobs = [
    {
        id: '0',
        title: 'Cloud Data Engineer SUBCONTRACTOR',
        organization: 'Realist AI',
        location: 'Remote',
        workMode: 'Remote',
        budget: 'Competitive',
        posted: 'Just now',
        applicants: 0,
        isNew: true,
        isSaved: false,
        isSuggested: true,
        description: `About the job\nRole: Cloud Data Engineer SUBCONTRACTOR\n\nRealist AI, an industry leader in data and cloud solutions, is seeking data engineers to join our growing network of subcontractors. We are looking for professionals with a passion for building scalable, reliable data pipelines to support cutting-edge Cloud applications and to support the many data offerings Realist AI has for Google Cloud Platform (GCP).\n\nKey Responsibilities\n- Design, develop, and maintain robust data pipelines to ingest, process, and transform large datasets from various sources.\n- Build and optimize data warehouses and data lakes to support data-driven decision-making and AI model development.\n- Collaborate with data scientists and AI engineers to create efficient data workflows and implement data-related features.\n- Ensure data quality, consistency, and security throughout the data lifecycle.\n- Contribute to the development and implementation of data governance policies and procedures.\n- Stay up-to-date with the latest technologies and trends in data engineering and GCP.\n\nKey Requirements\n- Minimum 2 years of production experience in data engineering, with a demonstrated ability to deliver data solutions for real-world problems.\n- Strong proficiency in SQL and at least one programming language commonly used for data engineering (e.g., Python, Java).\n- Experience with data processing frameworks (e.g., Apache Spark, Apache Beam) and data orchestration tools (e.g., Apache Airflow).\n- Deep understanding of data modelling techniques and experience designing scalable data architectures.\n- Familiarity with Google Cloud Platform (GCP) and its data-related services (e.g., BigQuery, Dataflow, Cloud Storage).\n- At a minimum, Google Cloud Professional Cloud Developer certification.\n- Preferred: Google Cloud Professional Data Engineer certification.\n- Registered business number and ability to provide insurance upon request.\n\nSoft Skills\n- Excellent communication and collaboration skills: You will be working closely with cross-functional teams at Realist AI and will need to effectively communicate complex technical concepts.\n- Strong Critical Thinking and Root Cause Analysis: You will be tasked with solving challenging data-related problems and will need to be able to think critically and creatively.\n- Self-motivated and proactive: You will need to be able to work independently and take ownership of your tasks.\n\nWhy Realist AI?\nAt Realist AI, we are at the forefront of cloud solutions, committed to delivering innovative and secure solutions built on Google Cloud. We offer a stimulating and collaborative work environment where you will have the opportunity to make a real impact on the development of cutting-edge applications. As a subcontractor, you will enjoy the flexibility to work on a variety of projects and the potential to grow your skills and expertise in the dynamic field of data engineering.\n\nReady to Join the Team?\nIf you are a talented and motivated data engineer with a passion for building innovative data solutions on the Google Cloud Platform, we encourage you to apply! Please submit your resume, a brief cover letter highlighting your relevant experience.`,
        skills: [
            'Cloud Data Engineering',
            'Google Cloud Platform',
            'Data Pipelines',
            'SQL',
            'Python',
            'Apache Spark',
            'Data Warehousing',
            'Collaboration',
            'Critical Thinking'
        ]
    },
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
        isSuggested: false,
        description: `About the Role\nJoin TechCare Rehabilitation as a Vocational Assessment Specialist and help clients return to work with confidence.\n\nResponsibilities\n- Conduct comprehensive vocational assessments for clients with diverse backgrounds.\n- Develop individualized rehabilitation and return-to-work plans.\n- Collaborate with multidisciplinary teams to ensure holistic client care.\n- Prepare detailed reports and recommendations for clients and stakeholders.\n\nRequirements\n- Degree in vocational rehabilitation, counseling, or related field.\n- Experience with vocational assessment tools and methodologies.\n- Strong communication and analytical skills.\n\nAbout TechCare\nTechCare Rehabilitation is dedicated to empowering individuals through innovative rehabilitation solutions. We value teamwork, compassion, and professional growth.`,
        skills: ['Vocational Assessment', 'Return-to-Work Planning', 'Career Counseling']
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
        isSuggested: false,
        description: `About the Role\nFuture Pathways Inc. is seeking a dedicated Career Counselor to guide youth through career exploration and planning.\n\nResponsibilities\n- Provide one-on-one and group career counseling sessions for youth.\n- Develop and deliver workshops on career readiness and job search strategies.\n- Assist with educational planning and transitions to employment.\n- Maintain records and track client progress.\n\nRequirements\n- Degree in counseling, education, or related field.\n- Experience working with youth populations.\n- Strong mentorship and communication skills.\n\nAbout Future Pathways\nWe are committed to empowering young people to achieve their career goals through innovative programs and personalized support.`,
        skills: ['Career Counseling', 'Youth Services', 'Transition Planning']
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
        isSuggested: false,
        description: `About the Role\nWorkplace Solutions is looking for a Disability Management Consultant to support our corporate clients.\n\nResponsibilities\n- Develop and implement disability management programs.\n- Conduct workplace assessments and recommend accommodations.\n- Liaise with healthcare providers, employees, and management.\n- Deliver training on disability inclusion and prevention.\n\nRequirements\n- Knowledge of disability legislation and best practices.\n- Experience in disability management or HR.\n- Excellent problem-solving and communication skills.\n\nAbout Workplace Solutions\nWe help organizations create inclusive workplaces and support employees with disabilities through expert consulting and training.`,
        skills: ['Disability Management', 'Workplace Accommodation', 'Program Development']
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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
        isSuggested: false,
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

// Update JobDetails component to render formatted sections:
const JobDetails = ({ job }) => {
    const navigate = useNavigate();
    
    if (!job) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a job to see details</p>
            </div>
        );
    }
    
    const handleOrganizationClick = () => {
        navigate('/organization/profile/public');
    };

    // Helper to render sections from description
    const renderDescription = (desc) => {
        // Split by double newlines for sections
        const sections = desc.split(/\n\n+/);
        return sections.map((section, idx) => {
            // Section title: bold if starts with 'About', 'Key', 'Soft', 'Why', 'Ready', etc.
            const match = section.match(/^(About the job|About the Role|Key Responsibilities|Key Requirements|Soft Skills|Why [^\n]+|About [^\n]+|Ready to Join the Team\?|Responsibilities|Requirements|About [^\n]+)/i);
            if (match) {
                const title = match[1];
                const rest = section.replace(title, '').trim();
                return (
                    <div key={idx} className="mb-4">
                        <div className="font-semibold text-lg text-gray-900 mb-1">{title}</div>
                        {rest && rest.startsWith('-') ? (
                            <ul className="list-disc pl-6 text-gray-700">
                                {rest.split(/\n-/).map((item, i) => i === 0 ? null : <li key={i}>{item.trim()}</li>)}
                            </ul>
                        ) : rest && rest.startsWith('*') ? (
                            <ul className="list-disc pl-6 text-gray-700">
                                {rest.split(/\n\*/).map((item, i) => i === 0 ? null : <li key={i}>{item.trim()}</li>)}
                            </ul>
                        ) : rest ? (
                            <p className="text-gray-700 whitespace-pre-line">{rest}</p>
                        ) : null}
                    </div>
                );
            }
            // Otherwise, just render as paragraph
            return <p key={idx} className="text-gray-700 mb-4 whitespace-pre-line">{section}</p>;
        });
    };

    return (
        <Card className="h-full shadow-lg flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-gray-900">{job.title}</CardTitle>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                        Apply Now
                    </Button>
                </div>
                <p className="text-md text-gray-700 font-semibold">{job.organization}</p>
                <p className="text-sm text-gray-500 flex items-center"><MapPin className="h-4 w-4 mr-2" />{job.location}</p>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden flex flex-col">
                {/* Scrollable job description */}
                <style>{`
                  .hide-scrollbar::-webkit-scrollbar { display: none; }
                  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <div className="flex-1 overflow-y-auto mb-6 max-h-[60vh] hide-scrollbar">
                     <div className="space-y-4">
                        {renderDescription(job.description)}
                    </div>
                    {/* Company Card at the bottom */}
                    <Card 
                      className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
                      onClick={handleOrganizationClick}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{job.organization}</h4>
                            <p className="text-sm text-gray-600">{job.location}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">
                          {/* Mock company description, replace with job.companyDescription if available */}
                          {job.companyDescription || 'This organization is a leader in its field, committed to innovation and excellence. Learn more about their mission, values, and opportunities for growth.'}
                        </p>
                      </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Jobs() {
    const [selectedJob, setSelectedJob] = useState(jobs[0]);
    const [activeTab, setActiveTab] = useState('search'); // 'search', 'saved', 'suggested'
    const [currentPage, setCurrentPage] = useState(1);
    const JOBS_PER_PAGE = 20;

    // Filter jobs based on tab
    const filteredJobs =
        activeTab === 'search'
            ? jobs
            : activeTab === 'saved'
            ? jobs.filter(j => j.isSaved)
            : jobs.filter(j => j.isSuggested);
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
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
            <ConsultantTopNav />
            <header className="bg-white shadow-sm flex-shrink-0">
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
            <main className="container mx-auto px-4 py-4 flex-1 min-h-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                    {/* Left Column: Job List */}
                    <div className="lg:col-span-1 flex flex-col h-full">
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
                            <button
                                className={`py-2 px-4 text-sm font-medium ${activeTab === 'suggested' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('suggested')}
                            >
                                Suggested Jobs ({jobs.filter(j => j.isSuggested).length})
                            </button>
                        </div>

                        <ScrollArea className="flex-1 mt-4">
                            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                                {paginatedJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isSelected={selectedJob?.id === job.id}
                                    onClick={() => setSelectedJob(job)}
                                />
                            ))}
                        </div>
                        </ScrollArea>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-4 flex-shrink-0">
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