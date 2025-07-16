
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, User } from 'lucide-react';
import ConsultantLayout from '@/components/ConsultantLayout';
import { MapPin as MapPinIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

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

const mockProfile = {
  name: 'Aravind Reddy',
  title: 'Master’s in Applied Computing | University of Windsor | Focused on AI,XR, Software Development & Real-World Applications',
  location: 'Windsor, Ontario, Canada',
  email: 'reddyaravind898@gmail.com',
  phone: '+1 555-123-4567',
  banner: '',
  photo: '',
  pronouns: 'He/Him',
  about: `Hey there! I'm currently in my 3rd semester of the Master of Applied Computing program at the University of Windsor.\nI enjoy building cool stuff with code — whether it’s AI-powered tools, smart web apps, or anything that solves real-world problems.\nI’m always exploring new tech, playing around with AI tools, and learning by doing.`,
  skills: ['Python', 'Django', 'Machine Learning', 'React.js', 'Scikit-Learn'],
  portfolio: [
    { title: 'AI Chatbot Project using Dialogflow', url: '#', description: 'Designed and developed an AI chatbot using Dialogflow.' },
    { title: 'Web Scraping Amazon E-commerce', url: '#', description: 'Automated web scraping for Amazon using AutoScrapper.' },
  ],
  experience: [
    {
      id: 1,
      title: 'Technical Recruiter',
      company: 'Dexian',
      type: 'Full-time',
      start: 'May 2023',
      end: 'Aug 2023',
      location: 'Pune, Maharashtra, India',
      onsite: 'On-site',
      description: '',
      skills: ['HTML5', 'CSS', 'Recruitment'],
      certificate: 'certificate.pdf',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'EPAM Systems',
      type: 'Apprenticeship',
      start: 'Jan 2023',
      end: 'May 2023',
      location: 'Remote',
      onsite: 'Remote',
      description: '',
      skills: ['HTML5', 'CSS', 'JavaScript'],
      certificate: 'certificate.pdf',
    },
  ],
  education: [
    {
      id: 1,
      school: 'University of Windsor',
      degree: 'Master’s degree, Applied computing',
      start: 'Sep 2024',
      end: 'Sep 2026',
      description: 'You are free: to share – to copy, distribute and transmit the work…',
      logo: '',
    },
    {
      id: 2,
      school: 'Lovely Professional University',
      degree: 'Bachelor of Technology - BTech, Computer Science',
      start: '2019',
      end: '2023',
      description: 'Grade: 8.6',
      logo: '',
    },
  ],
  licenses: [
    {
      id: 1,
      name: 'Getting Started with Microsoft Azure',
      issuer: 'LinkedIn',
      issued: 'Mar 2025',
      credentialUrl: '#',
      skills: ['Microsoft Azure'],
    },
    {
      id: 2,
      name: 'Learning Hadoop',
      issuer: 'LinkedIn',
      issued: 'Feb 2025',
      credentialUrl: '#',
      skills: ['Hadoop', 'Large-scale Data Processing'],
    },
  ],
  certifications: [
    {
      id: 1,
      name: 'Certified Project Manager',
      body: 'Project Management Institute',
      issueMonth: 'January',
      issueYear: '2020',
      expirationMonth: 'January',
      expirationYear: '2025',
      credentialId: 'PMI-123456',
      url: '#',
      description: 'Certification for advanced project management skills.',
    },
  ],
  testimonials: [
    { author: 'Jane Smith', text: 'Aravind is a fantastic collaborator and engineer.' },
    { author: 'John Doe', text: 'Great work on the AI chatbot project!' },
  ],
};

const ConsultantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const queryParams = new URLSearchParams(window.location.search);
  const jobId = queryParams.get('jobId');

  const consultant = mockConsultants.find(c => c.id === id);
  const [modalOpen, setModalOpen] = React.useState(false);

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
    <ConsultantLayout>
      {/* Banner and Profile Pic */}
      <div className="relative mb-8">
        <div className="h-40 md:h-56 bg-gradient-to-r from-blue-200 to-green-200 rounded-b-2xl overflow-hidden relative">
          {mockProfile.banner && <img src={mockProfile.banner} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />}
        </div>
        <div className="absolute left-8 -bottom-12 flex items-end gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center text-5xl font-bold text-gray-500 overflow-hidden relative">
            {mockProfile.photo ? <img src={mockProfile.photo} alt="Profile" className="w-full h-full object-cover" /> : mockProfile.name[0]}
          </div>
        </div>
      </div>
      {/* Name, Title, Location, Request Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-16 mb-6 gap-4 px-4">
        <div>
          <div className="text-2xl font-bold flex items-center gap-2">{mockProfile.name} <span className="text-base font-normal text-gray-400">{mockProfile.pronouns}</span></div>
          <div className="text-gray-700 font-medium mt-1">{mockProfile.title}</div>
          <div className="text-gray-500 mt-1 flex items-center gap-2">
            <MapPin size={16} /> {mockProfile.location}
          </div>
        </div>
        <div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition" onClick={() => setModalOpen(true)}>
            Request Engagement
          </button>
        </div>
      </div>
      {/* About/Bio Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">About</h3>
        </div>
        <div className="text-gray-700 whitespace-pre-line">{mockProfile.about}</div>
      </div>
      {/* Skills */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <h3 className="font-semibold text-lg mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {mockProfile.skills.map(skill => (
            <span key={skill} className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">{skill}</span>
          ))}
        </div>
      </div>
      {/* Portfolio Section (Slider) */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <h3 className="font-semibold text-2xl mb-4">Portfolio</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProfile.portfolio.map((item, idx) => (
            <div key={idx} className="portfolio-card bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
              <div className="portfolio-content p-4 flex flex-col flex-1">
                <h3 className="portfolio-title text-lg font-semibold mb-1 line-clamp-2">{item.title}</h3>
                <p className="portfolio-snippet text-gray-700 text-sm mb-3">{item.description}</p>
                {item.url && <a href={item.url} className="text-blue-600 underline text-xs" target="_blank" rel="noopener noreferrer">View Project</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Work Experience */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <h3 className="font-semibold text-lg mb-2">Experience</h3>
        <ul className="space-y-4">
          {mockProfile.experience.map((exp, idx) => (
            <li key={exp.id} className="flex gap-4 items-start border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                <Briefcase size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{exp.title}</div>
                <div className="text-gray-600">{exp.company}</div>
                <div className="text-gray-500 text-sm mb-1">{exp.start} - {exp.end}</div>
                {exp.description && <div className="text-gray-700 text-sm mt-1">{exp.description}</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Education */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <h3 className="font-semibold text-lg mb-2">Education</h3>
        <ul className="space-y-4">
          {mockProfile.education.map((edu, idx) => (
            <li key={edu.id} className="flex gap-4 items-start border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                <User size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{edu.school}</div>
                <div className="text-gray-600">{edu.degree}</div>
                <div className="text-gray-500 text-sm mb-1">{edu.start} - {edu.end}</div>
                {edu.description && <div className="text-gray-700 text-sm">{edu.description}</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Licenses */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <h3 className="font-semibold text-lg mb-2">Licenses</h3>
        <ul className="space-y-4">
          {mockProfile.licenses.map((lic, idx) => (
            <li key={lic.id} className="flex gap-4 items-start border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                <User size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{lic.name}</div>
                <div className="text-gray-600">{lic.issuer}</div>
                <div className="text-gray-500 text-sm mb-1">Issued {lic.issued}</div>
                {lic.credentialUrl && <a href={lic.credentialUrl} className="text-blue-600 text-xs underline" target="_blank" rel="noopener noreferrer">Show credential</a>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Certifications */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <h3 className="font-semibold text-lg mb-2">Certifications</h3>
        <ul className="space-y-4">
          {mockProfile.certifications.map((cert, idx) => (
            <li key={cert.id} className="flex gap-4 items-start border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                <User size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{cert.name}</div>
                <div className="text-gray-600">{cert.body}</div>
                <div className="text-gray-500 text-sm mb-1">Issued {cert.issueMonth} {cert.issueYear}</div>
                {cert.url && <a href={cert.url} className="text-blue-600 text-xs underline" target="_blank" rel="noopener noreferrer">Show credential</a>}
                <div className="text-gray-700 text-sm mt-1">{cert.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Testimonials */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <h3 className="font-semibold text-lg mb-2">Testimonials</h3>
        <ul className="space-y-4">
          {mockProfile.testimonials.map((t, idx) => (
            <li key={idx} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="text-gray-700">"{t.text}"</div>
              <div className="text-gray-500 text-sm mt-1">- {t.author}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* Request Engagement Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Sent</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6 text-lg">Your engagement request has been sent to this consultant.</div>
          <DialogClose asChild>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold w-full mt-4">Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </ConsultantLayout>
  );
};

export default ConsultantProfile;
