
import React from 'react';
import { useParams } from 'react-router-dom';
import ConsultantLayout from '@/components/ConsultantLayout';
import { MapPin, Briefcase, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

const mockProfile = {
  name: 'John Mitchell',
  title: 'Strategic Business Consultant & Growth Specialist',
  location: 'Boston, MA',
  email: 'john.mitchell@example.com',
  phone: '+1 (555) 123-4567',
  banner: '',
  photo: '',
  pronouns: 'He/Him',
  about: `I'm a senior strategy consultant with over 8 years of experience helping businesses scale and grow. I've worked with Fortune 500 companies and startups alike, developing comprehensive business strategies that drive results. My approach combines data-driven insights with creative problem-solving to deliver actionable plans that your team can implement immediately.`,
  skills: ['Strategic Planning', 'Business Development', 'Market Research', 'Financial Modeling', 'Competitive Analysis'],
  portfolio: [
    { title: 'Tech Startup Growth Strategy', url: '#', description: 'Helped a SaaS startup develop a go-to-market strategy that resulted in 300% user growth' },
    { title: 'E-commerce Expansion Plan', url: '#', description: 'Created international expansion strategy for e-commerce company entering European markets' },
  ],
  experience: [
    {
      id: 1,
      title: 'Senior Strategy Consultant',
      company: 'Boston Consulting Group',
      start: 'Jan 2020',
      end: 'Present',
      description: 'Leading strategic projects for Fortune 500 clients.'
    },
    {
      id: 2,
      title: 'Business Analyst',
      company: 'Deloitte',
      start: 'Jun 2016',
      end: 'Dec 2019',
      description: 'Supported business transformation initiatives.'
    },
  ],
  education: [
    {
      id: 1,
      school: 'Harvard Business School',
      degree: 'MBA in Strategy',
      start: '2014',
      end: '2016',
      description: '',
    },
    {
      id: 2,
      school: 'MIT',
      degree: 'BS in Economics',
      start: '2010',
      end: '2014',
      description: '',
    },
  ],
  licenses: [
    {
      id: 1,
      name: 'Certified Management Consultant (CMC)',
      issuer: 'IMC USA',
      issued: '2017',
      credentialUrl: '#',
    },
  ],
  certifications: [
    {
      id: 1,
      name: 'Six Sigma Black Belt',
      body: 'ASQ',
      issueMonth: 'March',
      issueYear: '2018',
      url: '#',
      description: 'Certification for advanced process improvement skills.'
    },
  ],
  testimonials: [
    { author: 'Sarah K.', text: 'Exceptional work! John delivered a comprehensive business strategy that exceeded our expectations.' },
    { author: 'Mike R.', text: 'Working with John was a game-changer for our startup.' },
  ],
};

const ConsultantDetail = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <ConsultantLayout>
      {/* Banner and Profile Pic */}
      <div className="relative mb-8">
        <div className="h-40 md:h-56 bg-gradient-to-r from-blue-200 to-purple-400 rounded-b-2xl overflow-hidden relative">
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
      {/* Portfolio Section */}
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

export default ConsultantDetail;
