
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText } from 'lucide-react';

// Mock data for a consultant's profile
const mockConsultants = [
  {
    id: 'app1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '555-111-2222',
    location: 'Toronto, ON',
    bio: 'Experienced vocational rehabilitation consultant with a passion for helping individuals achieve their career goals. Specializes in transferable skills analysis and return-to-work planning.',
    skills: ['Vocational Evaluation', 'Transferable Skills Analysis', 'Return to Work Planning', 'Case Management', 'Report Writing'],
    experience: [
      {
        title: 'Senior Vocational Consultant',
        company: 'Rehab Solutions Inc.',
        years: '2018 - Present',
        description: 'Conducting vocational assessments, developing rehabilitation plans, and providing expert testimony.'
      },
      {
        title: 'Case Manager',
        company: 'Pathways Support',
        years: '2015 - 2018',
        description: 'Managed caseloads, coordinated services, and facilitated client progress.'
      }
    ],
    education: [
      {
        degree: 'Master of Arts in Counselling Psychology',
        university: 'University of Toronto',
        years: '2013 - 2015'
      },
      {
        degree: 'Bachelor of Science in Psychology',
        university: 'York University',
        years: '2009 - 2013'
      }
    ],
    certifications: [
      { name: 'Certified Vocational Professional (CVP)', issuingBody: 'Vocational Institute', year: '2016' }
    ],
    licenses: [
      { name: 'Registered Rehabilitation Professional (RRP)', issuingBody: 'Rehab Board', number: 'RRP12345' }
    ],
    resumeUrl: '/mock-docs/alice_resume.pdf',
    coverLetterUrl: '/mock-docs/alice_coverletter.pdf',
  },
  {
    id: 'app2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    phone: '555-333-4444',
    location: 'Vancouver, BC',
    bio: 'Dedicated professional with expertise in ergonomic assessments and workplace accommodation. Committed to creating safe and productive work environments.',
    skills: ['Ergonomic Assessment', 'Workplace Accommodation', 'Safety Audits', 'Injury Prevention'],
    experience: [
      {
        title: 'Ergonomics Specialist',
        company: 'ErgoHealth Solutions',
        years: '2017 - Present',
        description: 'Performing on-site ergonomic evaluations and recommending solutions.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Kinesiology',
        university: 'University of British Columbia',
        years: '2012 - 2016'
      }
    ],
    certifications: [
      { name: 'Certified Professional Ergonomist (CPE)', issuingBody: 'Ergonomics Society', year: '2018' }
    ],
    licenses: [],
    resumeUrl: '/mock-docs/bob_resume.pdf',
    portfolioUrl: 'http://bobwilliams.com/portfolio',
  },
];

const ConsultantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');

  const consultant = mockConsultants.find(c => c.id === id);

  if (!consultant) {
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/organization/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Consultant Not Found</h1>
        <p>The consultant you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to={jobId ? `/organization/request/${jobId}/applicants` : "/organization/dashboard"}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {jobId ? "Back to Applicants" : "Back to Dashboard"}
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">{consultant.name}</h1>
        <p className="text-gray-600">Consultant Profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Information */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex items-center"><Mail className="h-4 w-4 mr-2" /> {consultant.email}</p>
            <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> {consultant.phone}</p>
            <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> {consultant.location}</p>
          </CardContent>
        </Card>

        {/* Bio and Skills */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About {consultant.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{consultant.bio}</p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {consultant.skills.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center"><Briefcase className="h-5 w-5 mr-2" /> Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultant.experience.length > 0 ? (
              consultant.experience.map((exp, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{exp.title} at {exp.company}</h3>
                  <p className="text-sm text-gray-600">{exp.years}</p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No work experience listed.</p>
            )}
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center"><GraduationCap className="h-5 w-5 mr-2" /> Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultant.education.length > 0 ? (
              consultant.education.map((edu, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.university}, {edu.years}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education listed.</p>
            )}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2" /> Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultant.certifications.length > 0 ? (
              consultant.certifications.map((cert, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-gray-600">Issuing Body: {cert.issuingBody}, Year: {cert.year}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No certifications listed.</p>
            )}
          </CardContent>
        </Card>

        {/* Licenses */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2" /> Licenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultant.licenses.length > 0 ? (
              consultant.licenses.map((license, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{license.name}</h3>
                  <p className="text-sm text-gray-600">Issuing Body: {license.issuingBody}, Number: {license.number}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No licenses listed.</p>
            )}
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2" /> Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultant.resumeUrl && (
              <Button variant="outline" asChild>
                <a href={consultant.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" /> View Resume
                </a>
              </Button>
            )}
            {consultant.coverLetterUrl && (
              <Button variant="outline" asChild className="ml-2">
                <a href={consultant.coverLetterUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" /> View Cover Letter
                </a>
              </Button>
            )}
            {consultant.portfolioUrl && (
              <Button variant="outline" asChild className="ml-2">
                <a href={consultant.portfolioUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" /> View Portfolio
                </a>
              </Button>
            )}
            {(!consultant.resumeUrl && !consultant.coverLetterUrl && !consultant.portfolioUrl) && (
              <p className="text-gray-500">No documents available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ConsultantProfile;
