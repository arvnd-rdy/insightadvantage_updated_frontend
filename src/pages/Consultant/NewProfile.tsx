import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import CertificationCard from '@/components/CertificationCard';
import { Pencil, Plus } from 'lucide-react';

// Mock data for all sections
const mockProfile = {
  name: 'Alex Johnson',
  title: 'Senior Business Consultant',
  photo: '',
  location: 'Toronto, ON, Canada',
  hourlyRate: 120,
  email: 'alex.johnson@email.com',
  phone: '+1 416-555-1234',
  bio: 'Experienced business consultant with a passion for helping organizations grow and succeed. Specialized in strategy, operations, and digital transformation.',
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'French', level: 'Intermediate' },
  ],
  skills: ['Strategy', 'Operations', 'Digital Transformation', 'Leadership'],
  portfolio: [
    { title: 'Growth Strategy for Tech Startup', url: '#' },
  ],
  testimonials: [
    { author: 'Jane Smith', text: 'Alex helped us double our revenue in 6 months!' },
  ],
};

const mockCertifications = [
  {
    id: 1,
    name: 'Certified Project Manager',
    body: 'Project Management Institute',
    issueMonth: 'January',
    issueYear: '2020',
    expirationMonth: 'January',
    expirationYear: '2025',
    credentialId: 'PMI-123456',
    url: 'https://verify.example.com/credential',
    description: 'Certification for advanced project management skills.',
  },
];

const mockLicenses = [
  {
    id: 1,
    name: 'Licensed Professional Counselor (LPC)',
    body: 'Ontario College of Social Workers',
    number: 'LPC-987654',
    issueMonth: 'March',
    issueYear: '2018',
    expiryMonth: 'March',
    expiryYear: '2024',
    jurisdiction: 'Ontario, Canada',
    restrictions: 'Supervision required for first year.',
    url: 'https://verify.example.com/license',
  },
];

const mockEducation = [
  {
    id: 1,
    degree: 'MBA',
    institution: 'University of Toronto',
    location: 'Toronto, ON',
    startYear: '2015',
    endYear: '2017',
    description: 'Focused on strategy and leadership.',
  },
];

const mockExperience = [
  {
    id: 1,
    title: 'Business Consultant',
    company: 'Tech Solutions Inc.',
    location: 'Toronto, ON',
    startMonth: 'June',
    startYear: '2018',
    endMonth: 'Present',
    endYear: '',
    description: 'Led digital transformation projects for Fortune 500 clients.',
  },
];

const NewProfile: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="consultant" />
        <div className="flex-1">
          <DashboardHeader userName={mockProfile.name} userRole="consultant" />
          <main className="p-8 max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Left column: summary */}
              <div className="w-full md:w-1/3 flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500 mb-2">
                    {mockProfile.photo ? (
                      <img src={mockProfile.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      mockProfile.name[0]
                    )}
                  </div>
                  <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" title="Edit Photo">
                    <Pencil size={18} />
                  </button>
                  <div className="text-xl font-bold text-center">{mockProfile.name}</div>
                  <div className="text-gray-600 text-center">{mockProfile.location}</div>
                  <div className="text-green-700 font-semibold text-lg mt-2">${mockProfile.hourlyRate}/hr</div>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">See public view</button>
                </div>
                {/* Languages */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Languages</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Languages">
                      <Pencil size={16} />
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {mockProfile.languages.map(lang => (
                      <li key={lang.name} className="flex justify-between text-gray-700">
                        <span>{lang.name}</span>
                        <span className="text-gray-500 text-sm">{lang.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Skills */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Skills</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Skills">
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.skills.map(skill => (
                      <span key={skill} className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right column: main content */}
              <div className="w-full md:w-2/3 flex flex-col gap-6">
                {/* About/Bio */}
                <div className="bg-white rounded-xl shadow p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">About</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Bio">
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className="text-gray-700 whitespace-pre-line">{mockProfile.bio}</div>
                </div>
                {/* Portfolio */}
                <div className="bg-white rounded-xl shadow p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Portfolio</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Add Portfolio Item">
                      <Plus size={18} />
                    </button>
                  </div>
                  {mockProfile.portfolio.length === 0 ? (
                    <div className="text-gray-400">No portfolio items yet.</div>
                  ) : (
                    <ul className="space-y-2">
                      {mockProfile.portfolio.map(item => (
                        <li key={item.title} className="flex items-center gap-2">
                          <span className="text-blue-600 underline cursor-pointer">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Work Experience */}
                <div className="bg-white rounded-xl shadow p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Work Experience</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Add Experience">
                      <Plus size={18} />
                    </button>
                  </div>
                  {mockExperience.length === 0 ? (
                    <div className="text-gray-400">No work experience added yet.</div>
                  ) : (
                    <ul className="space-y-4">
                      {mockExperience.map(exp => (
                        <li key={exp.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">{exp.title}</div>
                            <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Experience">
                              <Pencil size={16} />
                            </button>
                          </div>
                          <div className="text-gray-600">{exp.company} &bull; {exp.location}</div>
                          <div className="text-gray-500 text-sm mb-1">{exp.startMonth} {exp.startYear} - {exp.endMonth} {exp.endYear}</div>
                          <div className="text-gray-700 text-sm">{exp.description}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Education */}
                <div className="bg-white rounded-xl shadow p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Education</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Add Education">
                      <Plus size={18} />
                    </button>
                  </div>
                  {mockEducation.length === 0 ? (
                    <div className="text-gray-400">No education added yet.</div>
                  ) : (
                    <ul className="space-y-4">
                      {mockEducation.map(edu => (
                        <li key={edu.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">{edu.degree}</div>
                            <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Education">
                              <Pencil size={16} />
                            </button>
                          </div>
                          <div className="text-gray-600">{edu.institution} &bull; {edu.location}</div>
                          <div className="text-gray-500 text-sm mb-1">{edu.startYear} - {edu.endYear}</div>
                          <div className="text-gray-700 text-sm">{edu.description}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Certifications */}
                <div className="bg-white rounded-xl shadow p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Certifications</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Add Certification">
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {mockCertifications.map(cert => (
                      <CertificationCard key={cert.id} {...cert} />
                    ))}
                  </div>
                </div>
                {/* Licenses */}
                <div className="bg-white rounded-xl shadow p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Licenses</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Add License">
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {mockLicenses.map(lic => (
                      <div key={lic.id} className="flex w-full bg-white rounded-xl shadow-md p-6 mb-4 items-start border border-gray-100 hover:shadow-lg transition-shadow relative">
                        <div className="w-16 h-16 flex-shrink-0 mr-6">
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
                            <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6l4 2' /></svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold truncate">{lic.name}</h3>
                          </div>
                          <div className="text-gray-600 font-medium mt-1 truncate">{lic.body}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {lic.number && <>License #: {lic.number} | </>}
                            {lic.issueMonth && lic.issueYear && <>Issued: {lic.issueMonth} {lic.issueYear} </>}
                            {lic.expiryMonth && lic.expiryYear && <>| Expires: {lic.expiryMonth} {lic.expiryYear}</>}
                          </div>
                          {lic.jurisdiction && (
                            <div className="text-sm text-gray-500">Jurisdiction: {lic.jurisdiction}</div>
                          )}
                          {lic.url && (
                            <div className="text-sm text-blue-600 underline truncate">
                              <a href={lic.url} target="_blank" rel="noopener noreferrer">View Credential</a>
                            </div>
                          )}
                          {lic.restrictions && (
                            <div className="mt-2 text-gray-700 text-sm">
                              {lic.restrictions}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Testimonials */}
                <div className="bg-white rounded-xl shadow p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Testimonials</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100" title="Add Testimonial">
                      <Plus size={18} />
                    </button>
                  </div>
                  {mockProfile.testimonials.length === 0 ? (
                    <div className="text-gray-400">No testimonials yet.</div>
                  ) : (
                    <ul className="space-y-4">
                      {mockProfile.testimonials.map((t, i) => (
                        <li key={i} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="text-gray-700">"{t.text}"</div>
                          <div className="text-gray-500 text-sm mt-1">- {t.author}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NewProfile; 