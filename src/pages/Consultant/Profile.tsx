
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import CertificationCard from '@/components/CertificationCard';
import { Pencil, Plus, Mail, MapPin, Phone, User, Briefcase, ArrowLeft, ArrowRight } from 'lucide-react';
import EducationModal, { EducationEntry } from '@/components/EducationModal';
import WorkExperienceModal, { WorkExperienceEntry } from '@/components/WorkExperienceModal';
import CertificationModal, { CertificationEntry } from '@/components/CertificationModal';
import LicenseModal, { LicenseEntry } from '@/components/LicenseModal';
import PortfolioModal, { PortfolioEntry } from '@/components/PortfolioModal';
import ConsultantTopNav from '@/components/ConsultantTopNav';
import ConsultantLayout from '@/components/ConsultantLayout';

const mockProfile = {
  name: 'Aravind Reddy',
  title: 'Master’s in Applied Computing | University of Windsor | Focused on AI,XR, Software Development & Real-World Applications',
  location: 'Windsor, Ontario, Canada',
  email: 'reddyaravind898@gmail.com',
  phone: '+1 555-123-4567',
  banner: '',
  photo: '',
  pronouns: 'He/Him',
  openTo: 'Open to Co-op Roles',
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
  // Education modal state
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [educationEditIndex, setEducationEditIndex] = useState<number | null>(null);
  const [educationList, setEducationList] = useState<EducationEntry[]>([
    {
      id: 1,
      degree: 'Master’s degree, Applied computing',
      institution: 'University of Windsor',
      city: '',
      country: '',
      startMonth: '',
      startYear: '2024',
      endMonth: '',
      endYear: '2026',
      currentlyStudying: false,
      description: 'You are free: to share – to copy, distribute and transmit the work…',
    },
    {
      id: 2,
      degree: 'Bachelor of Technology - BTech, Computer Science',
      institution: 'Lovely Professional University',
      city: '',
      country: '',
      startMonth: '',
      startYear: '2019',
      endMonth: '',
      endYear: '2023',
      currentlyStudying: false,
      description: 'Grade: 8.6',
    },
  ]);

  const handleAddEducation = () => {
    setEducationEditIndex(null);
    setEducationModalOpen(true);
  };
  const handleEditEducation = (idx: number) => {
    setEducationEditIndex(idx);
    setEducationModalOpen(true);
  };
  const handleSaveEducation = (entry: EducationEntry) => {
    if (educationEditIndex !== null) {
      setEducationList(prev => prev.map((e, i) => i === educationEditIndex ? { ...entry, id: e.id } : e));
    } else {
      setEducationList(prev => [...prev, { ...entry, id: Date.now() }]);
    }
  };

  // Add state for modals
  const [workExpModalOpen, setWorkExpModalOpen] = useState(false);
  const [workExpModalMode, setWorkExpModalMode] = useState<'add' | 'edit'>('add');
  const [workExpEditIndex, setWorkExpEditIndex] = useState<number | null>(null);
  const [workExpModalInitial, setWorkExpModalInitial] = useState<Partial<WorkExperienceEntry>>({});
  // Map mockProfile.experience to WorkExperienceEntry[]
  const [experienceList, setExperienceList] = useState<WorkExperienceEntry[]>(
    mockProfile.experience.map(exp => ({
      id: exp.id,
      title: exp.title,
      company: exp.company,
      city: '',
      country: '',
      startMonth: '',
      startYear: exp.start.split(' ')[1] || '',
      endMonth: '',
      endYear: exp.end.split(' ')[1] || '',
      isCurrent: false,
      description: exp.description || '',
    }))
  );
  // Add this near the other useState hooks
  const [expandedExperience, setExpandedExperience] = React.useState<{ [id: number]: boolean }>({});
  // Map mockProfile.licenses to LicenseEntry[]
  const [licenseList, setLicenseList] = useState<LicenseEntry[]>(
    mockProfile.licenses.map(lic => ({
      id: lic.id,
      name: lic.name,
      body: lic.issuer,
      number: '',
      issueMonth: lic.issued.split(' ')[0] || '',
      issueYear: lic.issued.split(' ')[1] || '',
      expiryMonth: '',
      expiryYear: '',
      jurisdiction: '',
      restrictions: '',
      url: lic.credentialUrl,
      fileName: '',
    }))
  );
  // Map mockProfile.certifications to CertificationEntry[]
  const [certList, setCertList] = useState<CertificationEntry[]>(
    mockProfile.certifications.map(cert => ({
      id: cert.id,
      name: cert.name,
      body: cert.body,
      issueMonth: cert.issueMonth,
      issueYear: cert.issueYear,
      expirationMonth: cert.expirationMonth,
      expirationYear: cert.expirationYear,
      credentialId: cert.credentialId,
      url: cert.url,
      description: cert.description,
      fileName: '',
    }))
  );

  const handleAddWorkExperience = () => {
    setWorkExpModalMode('add');
    setWorkExpModalInitial({});
    setWorkExpEditIndex(null);
    setWorkExpModalOpen(true);
  };
  const handleEditWorkExperience = (idx: number) => {
    setWorkExpModalMode('edit');
    setWorkExpModalInitial(experienceList[idx]);
    setWorkExpEditIndex(idx);
    setWorkExpModalOpen(true);
  };
  const handleSaveWorkExperience = (entry: WorkExperienceEntry) => {
    if (workExpModalMode === 'edit' && workExpEditIndex !== null) {
      setExperienceList(prev => prev.map((e, i) => i === workExpEditIndex ? { ...e, ...entry } : e));
    } else {
      setExperienceList(prev => [...prev, { id: Date.now(), ...entry }]);
    }
    setWorkExpModalOpen(false);
    setWorkExpEditIndex(null);
  };

  const [licenseModalOpen, setLicenseModalOpen] = useState(false);
  const [licenseModalMode, setLicenseModalMode] = useState<'add' | 'edit'>('add');
  const [licenseEditIndex, setLicenseEditIndex] = useState<number | null>(null);
  const [licenseModalInitial, setLicenseModalInitial] = useState<Partial<LicenseEntry>>({});
  // const [licenseList, setLicenseList] = useState(mockProfile.licenses); // This line is now redundant
  const handleAddLicense = () => {
    setLicenseModalMode('add');
    setLicenseModalInitial({});
    setLicenseEditIndex(null);
    setLicenseModalOpen(true);
  };
  const handleEditLicense = (idx: number) => {
    setLicenseModalMode('edit');
    setLicenseModalInitial(licenseList[idx]);
    setLicenseEditIndex(idx);
    setLicenseModalOpen(true);
  };
  const handleSaveLicense = (entry: LicenseEntry, file?: File | null) => {
    if (licenseModalMode === 'edit' && licenseEditIndex !== null) {
      setLicenseList(prev => prev.map((e, i) => i === licenseEditIndex ? { ...e, ...entry } : e));
    } else {
      setLicenseList(prev => [...prev, { id: Date.now(), ...entry }]);
    }
    setLicenseModalOpen(false);
    setLicenseEditIndex(null);
  };

  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certModalMode, setCertModalMode] = useState<'add' | 'edit'>('add');
  const [certEditIndex, setCertEditIndex] = useState<number | null>(null);
  const [certModalInitial, setCertModalInitial] = useState<Partial<CertificationEntry>>({});
  // const [certList, setCertList] = useState(mockProfile.certifications); // This line is now redundant
  const handleAddCertification = () => {
    setCertModalMode('add');
    setCertModalInitial({});
    setCertEditIndex(null);
    setCertModalOpen(true);
  };
  const handleEditCertification = (idx: number) => {
    setCertModalMode('edit');
    setCertModalInitial(certList[idx]);
    setCertEditIndex(idx);
    setCertModalOpen(true);
  };
  const handleSaveCertification = (entry: CertificationEntry, file?: File | null) => {
    if (certModalMode === 'edit' && certEditIndex !== null) {
      setCertList(prev => prev.map((e, i) => i === certEditIndex ? { ...e, ...entry } : e));
    } else {
      setCertList(prev => [...prev, { id: Date.now(), ...entry }]);
    }
    setCertModalOpen(false);
    setCertEditIndex(null);
  };

  // Portfolio state and modal logic
  const [portfolioList, setPortfolioList] = useState<PortfolioEntry[]>([
    {
      id: 1,
      title: 'AI Chatbot Project using Dialogflow',
      projectType: 'App',
      client: '',
      dateCompleted: '',
      description: 'Designed and developed an AI chatbot using Dialogflow.',
      role: '',
      skills: [],
      file: undefined,
      fileName: '',
      externalLink: '#',
      thumbnail: undefined,
      thumbnailUrl: '',
      visibility: 'public',
      tags: [],
    },
    {
      id: 2,
      title: 'Web Scraping Amazon E-commerce',
      projectType: 'App',
      client: '',
      dateCompleted: '',
      description: 'Automated web scraping for Amazon using AutoScrapper.',
      role: '',
      skills: [],
      file: undefined,
      fileName: '',
      externalLink: '#',
      thumbnail: undefined,
      thumbnailUrl: '',
      visibility: 'public',
      tags: [],
    },
  ]);
  const [portfolioIdx, setPortfolioIdx] = useState(0);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [portfolioModalMode, setPortfolioModalMode] = useState<'add' | 'edit'>('add');
  const [portfolioEditIndex, setPortfolioEditIndex] = useState<number | null>(null);
  const [portfolioModalInitial, setPortfolioModalInitial] = useState<Partial<PortfolioEntry>>({});

  const handleAddPortfolio = () => {
    setPortfolioModalMode('add');
    setPortfolioModalInitial({});
    setPortfolioEditIndex(null);
    setPortfolioModalOpen(true);
  };
  const handleEditPortfolio = (idx: number) => {
    setPortfolioModalMode('edit');
    setPortfolioModalInitial(portfolioList[idx]);
    setPortfolioEditIndex(idx);
    setPortfolioModalOpen(true);
  };
  const handleSavePortfolio = (entry: PortfolioEntry, file?: File | null, thumbnail?: File | null) => {
    if (portfolioModalMode === 'edit' && portfolioEditIndex !== null) {
      setPortfolioList(prev => prev.map((e, i) => i === portfolioEditIndex ? { ...e, ...entry } : e));
    } else {
      setPortfolioList(prev => [...prev, { id: Date.now(), ...entry }]);
    }
    setPortfolioModalOpen(false);
    setPortfolioEditIndex(null);
  };

  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const nextPortfolio = () => setPortfolioIdx((i) => (i + 1) % portfolioList.length);
  const prevPortfolio = () => setPortfolioIdx((i) => (i - 1 + portfolioList.length) % portfolioList.length);
  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % mockProfile.testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((i) => (i - 1 + mockProfile.testimonials.length) % mockProfile.testimonials.length);

  // Add at the top with other useState hooks
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutText, setAboutText] = useState(mockProfile.about);
  const [aboutDraft, setAboutDraft] = useState(aboutText);

  // Add state for expanded descriptions
  const [expandedPortfolioDesc, setExpandedPortfolioDesc] = useState<{ [id: number]: boolean }>({});
  // Add state for expanded education descriptions
  const [expandedEducationDesc, setExpandedEducationDesc] = useState<{ [id: number]: boolean }>({});

  // Add state for profile photo and banner
  const [profilePhoto, setProfilePhoto] = useState<string>(mockProfile.photo || '');
  const [bannerImage, setBannerImage] = useState<string>(mockProfile.banner || '');
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Add state for profile photo modal
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const cardsPerPage = 3;
  const maxStartIdx = Math.max(0, portfolioList.length - cardsPerPage);
  const clampedPortfolioIdx = Math.min(portfolioIdx, maxStartIdx);
  const canGoLeft = clampedPortfolioIdx > 0;
  const canGoRight = clampedPortfolioIdx < maxStartIdx;

  // Sort experienceList by endYear, endMonth, startYear, startMonth (latest first)
  const sortedExperienceList = [...experienceList].sort((a, b) => {
    const getYear = (exp: WorkExperienceEntry) => parseInt(exp.endYear || exp.startYear || '0', 10);
    const getMonth = (exp: WorkExperienceEntry) => {
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      return months.indexOf(exp.endMonth || exp.startMonth || '');
    };
    const aYear = getYear(a);
    const bYear = getYear(b);
    if (bYear !== aYear) return bYear - aYear;
    return getMonth(b) - getMonth(a);
  });
  // Sort educationList by endYear, startYear (latest first)
  const sortedEducationList = [...educationList].sort((a, b) => {
    const aYear = parseInt(a.endYear || a.startYear || '0', 10);
    const bYear = parseInt(b.endYear || b.startYear || '0', 10);
    return bYear - aYear;
  });
  // Sort licenseList by issueYear (latest first)
  const sortedLicenseList = [...licenseList].sort((a, b) => {
    const aYear = parseInt(a.issueYear || '0', 10);
    const bYear = parseInt(b.issueYear || '0', 10);
    return bYear - aYear;
  });
  // Sort certList by issueYear (latest first)
  const sortedCertList = [...certList].sort((a, b) => {
    const aYear = parseInt(a.issueYear || '0', 10);
    const bYear = parseInt(b.issueYear || '0', 10);
    return bYear - aYear;
  });

  return (
    <ConsultantLayout>
      {/* Banner and Profile Pic */}
      <div className="relative mb-8">
        <div className="h-40 md:h-56 bg-gradient-to-r from-blue-200 to-green-200 rounded-b-2xl overflow-hidden relative">
          {bannerImage && <img src={bannerImage} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />}
          <label className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 cursor-pointer shadow hover:bg-opacity-100 transition" title="Edit Banner">
            <Pencil size={20} />
            <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
          </label>
        </div>
        <div className="absolute left-8 -bottom-12 flex items-end gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center text-5xl font-bold text-gray-500 overflow-hidden relative cursor-pointer" onClick={() => setPhotoModalOpen(true)}>
            {profilePhoto ? <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" /> : mockProfile.name[0]}
          </div>
        </div>
      </div>
      {/* Name, Title, Location, Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-16 mb-6 gap-4 px-4">
        <div>
          <div className="text-2xl font-bold flex items-center gap-2">{mockProfile.name} <span className="text-base font-normal text-gray-400">{mockProfile.pronouns}</span></div>
          <div className="text-gray-700 font-medium mt-1">{mockProfile.title}</div>
          <div className="text-gray-500 mt-1 flex items-center gap-2">
            <MapPin size={16} /> {mockProfile.location}
          </div>
          <div className="flex gap-2 mt-3">
            <button className="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-100" title="Contact Info">Contact Info</button>
            <button className="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-100" title="Preferences">Preferences</button>
          </div>
        </div>
      </div>
      {/* About/Bio Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">About</h3>
          <button className="p-1 rounded-full hover:bg-gray-100" title="Edit About" onClick={() => { setAboutDraft(aboutText); setAboutModalOpen(true); }}><Pencil size={16} /></button>
        </div>
        <div className="text-gray-700 whitespace-pre-line">{aboutText}</div>
        {aboutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-2xl">
              <h2 className="text-2xl font-semibold mb-6">Edit About</h2>
              <textarea
                className="w-full border rounded-lg p-3 mb-6 min-h-[220px] text-base"
                value={aboutDraft}
                onChange={e => setAboutDraft(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button className="px-5 py-2.5 rounded-lg border text-base" onClick={() => setAboutModalOpen(false)}>Cancel</button>
                <button
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-base font-semibold"
                  onClick={() => { setAboutText(aboutDraft); setAboutModalOpen(false); }}
                >Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Portfolio Section (Slider) */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-2xl">Portfolio</h3>
          <button className="bg-blue-700 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-blue-800 transition" onClick={handleAddPortfolio}>+ Add Item</button>
        </div>
        {/* Carousel logic: show 3 at a time, arrows if more */}
        <div className="relative">
          {portfolioList.length > cardsPerPage && canGoLeft && (
            <button onClick={prevPortfolio} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-gray-100"><ArrowLeft size={20} /></button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioList.slice(clampedPortfolioIdx, clampedPortfolioIdx + cardsPerPage).map((item, idx) => (
              <div key={item.id || idx} className="portfolio-card bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
                {item.thumbnailUrl && (
                  <img className="portfolio-thumb w-full aspect-[4/3] object-cover" src={item.thumbnailUrl} alt={item.title || 'Project Thumbnail'} />
                )}
                <div className="portfolio-content p-4 flex flex-col flex-1">
                  {item.projectType && <span className="badge inline-block bg-gray-200 text-blue-800 text-xs font-semibold rounded px-2 py-0.5 mb-2 w-fit">{item.projectType}</span>}
                  <h3 className="portfolio-title text-lg font-semibold mb-1 line-clamp-2">{item.title}</h3>
                  {(item.client || item.dateCompleted) && (
                    <div className="portfolio-meta text-gray-500 text-sm mb-2">{item.client}{item.client && item.dateCompleted ? ' · ' : ''}{item.dateCompleted}</div>
                  )}
                  {item.description && (
                    <p className="portfolio-snippet text-gray-700 text-sm mb-3">
                      {expandedPortfolioDesc[item.id] || item.description.length <= 120
                        ? item.description
                        : item.description.slice(0, 120) + '...'}
                      {item.description.length > 120 && (
                        <button
                          className="ml-2 text-blue-600 underline text-xs"
                          onClick={() => setExpandedPortfolioDesc(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                          type="button"
                        >
                          {expandedPortfolioDesc[item.id] ? 'See less' : 'See more'}
                        </button>
                      )}
                    </p>
                  )}
                  <button
                    className="portfolio-button border border-blue-700 text-blue-700 rounded px-3 py-1 text-sm font-medium hover:bg-blue-50 transition w-fit mt-auto"
                    onClick={() => handleEditPortfolio(portfolioIdx + idx)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
          {portfolioList.length > cardsPerPage && canGoRight && (
            <button onClick={nextPortfolio} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-gray-100"><ArrowRight size={20} /></button>
          )}
        </div>
        <PortfolioModal
          open={portfolioModalOpen}
          onOpenChange={setPortfolioModalOpen}
          initialData={portfolioModalInitial}
          onSave={handleSavePortfolio}
          mode={portfolioModalMode}
          allSkills={mockProfile.skills}
        />
      </div>
      {/* Work Experience */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Experience</h3>
          <div className="flex gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100" title="Add Experience" onClick={handleAddWorkExperience}><Plus size={18} /></button>
            <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Experience" onClick={() => handleEditWorkExperience(0)}><Pencil size={16} /></button>
          </div>
        </div>
        <ul className="space-y-4">
          {sortedExperienceList.map((exp, idx) => {
            const maxLength = 200;
            const isLong = exp.description && exp.description.length > maxLength;
            const expanded = expandedExperience[exp.id] || false;
            const displayText = !expanded && isLong ? exp.description.slice(0, maxLength) + '...' : exp.description;
            return (
              <li key={exp.id} className="flex gap-4 items-start border-b pb-4 last:border-b-0 last:pb-0">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                  <Briefcase size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{exp.title}</div>
                  <div className="text-gray-600">{exp.company}</div>
                  {(exp.city || exp.country) && (
                    <div className="text-gray-500 text-sm">{[exp.city, exp.country].filter(Boolean).join(', ')}</div>
                  )}
                  <div className="text-gray-500 text-sm mb-1">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}</div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm mt-1">
                      {displayText}
                      {isLong && (
                        <button
                          className="ml-2 text-blue-600 underline cursor-pointer text-xs"
                          onClick={() => setExpandedExperience(prev => ({ ...prev, [exp.id]: !expanded }))}
                          type="button"
                        >
                          {expanded ? 'See less' : 'See more'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100 self-start" title="Edit" onClick={() => handleEditWorkExperience(idx)}><Pencil size={16} /></button>
              </li>
            );
          })}
        </ul>
        <WorkExperienceModal
          open={workExpModalOpen}
          onOpenChange={setWorkExpModalOpen}
          initialData={workExpModalInitial}
          onSave={handleSaveWorkExperience}
          mode={workExpModalMode}
        />
      </div>
      {/* Education */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Education</h3>
          <button
            className="p-1 rounded-full hover:bg-blue-100"
            title="Add Education"
            onClick={handleAddEducation}
          >
            <Plus size={20} className="text-blue-700" />
          </button>
        </div>
        <ul className="space-y-4">
          {sortedEducationList.map((edu, idx) => (
            <li key={edu.id} className="flex gap-4 items-start border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                <User size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{edu.institution}</div>
                <div className="text-gray-600">{edu.degree}</div>
                {(edu.city || edu.country) && (
                  <div className="text-gray-500 text-sm">{[edu.city, edu.country].filter(Boolean).join(', ')}</div>
                )}
                <div className="text-gray-500 text-sm mb-1">{edu.startYear} - {edu.endYear}</div>
                {edu.description && (
                  <div className="text-gray-700 text-sm">
                    {expandedEducationDesc[edu.id] || edu.description.length <= 120
                      ? edu.description
                      : edu.description.slice(0, 120) + '...'}
                    {edu.description.length > 120 && (
                      <button
                        className="ml-2 text-blue-600 underline text-xs"
                        onClick={() => setExpandedEducationDesc(prev => ({ ...prev, [edu.id]: !prev[edu.id] }))}
                        type="button"
                      >
                        {expandedEducationDesc[edu.id] ? 'See less' : 'See more'}
                      </button>
                    )}
                  </div>
                )}
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100 self-start" title="Edit" onClick={() => handleEditEducation(idx)}><Pencil size={16} /></button>
            </li>
          ))}
        </ul>
        <EducationModal
          open={educationModalOpen}
          onOpenChange={setEducationModalOpen}
          initialData={educationEditIndex !== null ? educationList[educationEditIndex] : undefined}
          onSave={handleSaveEducation}
          mode={educationEditIndex !== null ? 'edit' : 'add'}
        />
      </div>
      {/* Licenses Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Licenses</h3>
          <div className="flex gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100" title="Add License" onClick={handleAddLicense}><Plus size={18} /></button>
            <button className="p-1 rounded-full hover:bg-gray-100" title="Edit License" onClick={() => handleEditLicense(0)}><Pencil size={16} /></button>
          </div>
        </div>
        <ul className="space-y-4">
          {sortedLicenseList.map(lic => (
            <li key={lic.id} className="flex gap-4 items-start border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                <User size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{lic.name}</div>
                <div className="text-gray-600">{lic.body}</div>
                <div className="text-gray-500 text-sm mb-1">Issued {lic.issueMonth} {lic.issueYear}</div>
                {lic.url && <a href={lic.url} className="text-blue-600 text-xs underline" target="_blank" rel="noopener noreferrer">Show credential</a>}
              </div>
            </li>
          ))}
        </ul>
        <LicenseModal
          open={licenseModalOpen}
          onOpenChange={setLicenseModalOpen}
          initialData={licenseModalInitial}
          onSave={handleSaveLicense}
          mode={licenseModalMode}
        />
      </div>
      {/* Certifications Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Certifications</h3>
          <div className="flex gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100" title="Add Certification" onClick={handleAddCertification}><Plus size={18} /></button>
            <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Certification" onClick={() => handleEditCertification(0)}><Pencil size={16} /></button>
          </div>
        </div>
        <ul className="space-y-4">
          {sortedCertList.map(cert => (
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
        <CertificationModal
          open={certModalOpen}
          onOpenChange={setCertModalOpen}
          initialData={certModalInitial}
          onSave={handleSaveCertification}
          mode={certModalMode}
        />
      </div>
      {/* Skills Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Skills</h3>
          <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Skills"><Pencil size={16} /></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {mockProfile.skills.map(skill => (
            <span key={skill} className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">{skill}</span>
          ))}
        </div>
      </div>
      {/* Testimonials Section (Slider) */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 md:mx-0 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Testimonials</h3>
          <button className="p-1 rounded-full hover:bg-gray-100" title="Add Testimonial"><Plus size={18} /></button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={prevTestimonial} className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft size={20} /></button>
          <div className="flex-1">
            <div className="text-gray-700">"{mockProfile.testimonials[testimonialIdx].text}"</div>
            <div className="text-gray-500 text-sm mt-1">- {mockProfile.testimonials[testimonialIdx].author}</div>
          </div>
          <button onClick={nextTestimonial} className="p-2 rounded-full hover:bg-gray-100"><ArrowRight size={20} /></button>
        </div>
      </div>
    </ConsultantLayout>
  );
};

export default ConsultantProfile;
