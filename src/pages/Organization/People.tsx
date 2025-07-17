import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Users, TrendingUp, MapPin } from 'lucide-react';
import ConsultantCard from '@/components/ConsultantCard';
import OrganizationNavBar from '@/components/OrganizationNavBar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


interface Consultant {
  id: string;
  name: string;
  title: string;
  location: string;
  availability: string;
  expertise: string[];
  hourlyRate: string;
  avatarUrl?: string;
  description: string;
}

const mockConsultants: Consultant[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Certified Rehabilitation Counselor',
    location: 'Toronto, ON',
    availability: 'Full-time',
    expertise: ['Vocational Assessment', 'Career Counseling', 'Cognitive Evaluation'],
    hourlyRate: '120',
    avatarUrl: '',
    description: 'Dr. Johnson is a certified rehabilitation counselor with over 15 years of experience in vocational assessment and career counseling.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Occupational Therapist',
    location: 'Vancouver, BC',
    availability: 'Part-time',
    expertise: ['Ergonomic Assessment', 'Functional Evaluation', 'Return-to-Work'],
    hourlyRate: '110',
    avatarUrl: '',
    description: 'Michael is an occupational therapist specializing in ergonomic assessments and return-to-work programs for injured workers.',
  },
  {
    id: '3',
    name: 'Jennifer Martinez',
    title: 'Vocational Rehabilitation Specialist',
    location: 'Calgary, AB',
    availability: 'Full-time',
    expertise: ['Job Placement', 'Disability Management', 'Case Management'],
    hourlyRate: '95',
    avatarUrl: '',
    description: 'Jennifer is a vocational rehabilitation specialist with a passion for helping individuals with disabilities find meaningful employment.',
  },
  {
    id: '4',
    name: 'Robert Thompson',
    title: 'Registered Psychologist',
    location: 'Montreal, QC',
    availability: 'Flexible',
    expertise: ['Psycho-Vocational Assessment', 'Career Development', 'Counseling'],
    hourlyRate: '130',
    avatarUrl: '',
    description: 'Robert is a registered psychologist with expertise in psycho-vocational assessments and career development counseling.',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    title: 'Certified Vocational Evaluator',
    location: 'Ottawa, ON',
    availability: 'Full-time',
    expertise: ['Transferable Skills Analysis', 'Vocational Evaluation', 'Report Writing'],
    hourlyRate: '105',
    avatarUrl: '',
    description: 'Lisa is a certified vocational evaluator with a strong background in transferable skills analysis and vocational evaluation.',
  },
  {
    id: '6',
    name: 'David Kim',
    title: 'Rehabilitation Coordinator',
    location: 'Winnipeg, MB',
    availability: 'Part-time',
    expertise: ['Case Coordination', 'Team Management', 'Program Development'],
    hourlyRate: '85',
    avatarUrl: '',
    description: 'David is a rehabilitation coordinator with experience in case coordination, team management, and program development.',
  },
  {
    id: '7',
    name: 'Emma Wilson',
    title: 'Kinesiologist',
    location: 'Halifax, NS',
    availability: 'Full-time',
    expertise: ['Functional Assessment', 'Exercise Therapy', 'Injury Prevention'],
    hourlyRate: '90',
    avatarUrl: '',
    description: 'Emma is a kinesiologist specializing in functional assessments, exercise therapy, and injury prevention programs.',
  },
  {
    id: '8',
    name: 'James Miller',
    title: 'Certified Disability Management Professional',
    location: 'Edmonton, AB',
    availability: 'Flexible',
    expertise: ['Disability Management', 'Return-to-Work', 'Workplace Assessment'],
    hourlyRate: '115',
    avatarUrl: '',
    description: 'James is a certified disability management professional with expertise in return-to-work planning and workplace assessments.',
  },
  {
    id: '9',
    name: 'Rachel Davis',
    title: 'Physiotherapist',
    location: 'Victoria, BC',
    availability: 'Part-time',
    expertise: ['Physical Rehabilitation', 'Ergonomic Assessment', 'Pain Management'],
    hourlyRate: '100',
    avatarUrl: '',
    description: 'Rachel is a physiotherapist with a focus on physical rehabilitation, ergonomic assessments, and pain management.',
  },
  {
    id: '10',
    name: 'Thomas Garcia',
    title: 'Vocational Counselor',
    location: 'Saskatoon, SK',
    availability: 'Full-time',
    expertise: ['Career Counseling', 'Job Search Training', 'Skills Assessment'],
    hourlyRate: '80',
    avatarUrl: '',
    description: 'Thomas is a vocational counselor who provides career counseling, job search training, and skills assessments.',
  },
  {
    id: '11',
    name: 'Maria Rodriguez',
    title: 'Certified Case Manager',
    location: 'London, ON',
    availability: 'Full-time',
    expertise: ['Case Management', 'Client Advocacy', 'Service Coordination'],
    hourlyRate: '95',
    avatarUrl: '',
    description: 'Maria is a certified case manager with a background in client advocacy and service coordination.',
  },
  {
    id: '12',
    name: 'Kevin Brown',
    title: 'Ergonomist',
    location: 'Quebec City, QC',
    availability: 'Flexible',
    expertise: ['Workplace Ergonomics', 'Risk Assessment', 'Injury Prevention'],
    hourlyRate: '110',
    avatarUrl: '',
    description: 'Kevin is an ergonomist who specializes in workplace ergonomics, risk assessments, and injury prevention.',
  },
  {
    id: '13',
    name: 'Amanda Taylor',
    title: 'Rehabilitation Nurse',
    location: "St. John's, NL",
    availability: 'Part-time',
    expertise: ['Medical Assessment', 'Care Planning', 'Patient Education'],
    hourlyRate: '75',
    avatarUrl: '',
    description: 'Amanda is a rehabilitation nurse with experience in medical assessments, care planning, and patient education.',
  },
  {
    id: '14',
    name: 'Christopher Lee',
    title: 'Certified Rehabilitation Counselor',
    location: 'Regina, SK',
    availability: 'Full-time',
    expertise: ['Vocational Rehabilitation', 'Counseling', 'Program Development'],
    hourlyRate: '100',
    avatarUrl: '',
    description: 'Christopher is a certified rehabilitation counselor with a focus on vocational rehabilitation and program development.',
  },
  {
    id: '15',
    name: 'Nicole White',
    title: 'Social Worker',
    location: 'Charlottetown, PE',
    availability: 'Part-time',
    expertise: ['Case Management', 'Crisis Intervention', 'Resource Coordination'],
    hourlyRate: '70',
    avatarUrl: '',
    description: 'Nicole is a social worker with experience in case management, crisis intervention, and resource coordination.',
  },
  {
    id: '16',
    name: 'Daniel Moore',
    title: 'Occupational Health Specialist',
    location: 'Fredericton, NB',
    availability: 'Full-time',
    expertise: ['Workplace Safety', 'Health Assessment', 'Return-to-Work'],
    hourlyRate: '105',
    avatarUrl: '',
    description: 'Daniel is an occupational health specialist with a focus on workplace safety and return-to-work programs.',
  },
  {
    id: '17',
    name: 'Jessica Clark',
    title: 'Certified Vocational Rehabilitation Counselor',
    location: 'Yellowknife, NT',
    availability: 'Flexible',
    expertise: ['Vocational Assessment', 'Job Coaching', 'Career Planning'],
    hourlyRate: '125',
    avatarUrl: '',
    description: 'Jessica is a certified vocational rehabilitation counselor with expertise in vocational assessments and career planning.',
  },
  {
    id: '18',
    name: 'Ryan Hall',
    title: 'Disability Consultant',
    location: 'Whitehorse, YT',
    availability: 'Part-time',
    expertise: ['Disability Assessment', 'Accommodation Planning', 'Advocacy'],
    hourlyRate: '115',
    avatarUrl: '',
    description: 'Ryan is a disability consultant with a background in disability assessments and accommodation planning.',
  },
  {
    id: '19',
    name: 'Laura Young',
    title: 'Certified Professional Ergonomist',
    location: 'Iqaluit, NU',
    availability: 'Full-time',
    expertise: ['Ergonomic Assessment', 'Workplace Design', 'Training'],
    hourlyRate: '120',
    avatarUrl: '',
    description: 'Laura is a certified professional ergonomist with expertise in workplace design and ergonomic assessments.',
  },
  {
    id: '20',
    name: 'Matthew King',
    title: 'Rehabilitation Specialist',
    location: 'Thunder Bay, ON',
    availability: 'Flexible',
    expertise: ['Rehabilitation Planning', 'Assessment', 'Program Coordination'],
    hourlyRate: '90',
    avatarUrl: '',
    description: 'Matthew is a rehabilitation specialist with a focus on rehabilitation planning and program coordination.',
  },
  {
    id: '21',
    name: 'Stephanie Wright',
    title: 'Certified Disability Management Specialist',
    location: 'Windsor, ON',
    availability: 'Full-time',
    expertise: ['Disability Management', 'Return-to-Work', 'Case Coordination'],
    hourlyRate: '100',
    avatarUrl: '',
    description: 'Stephanie is a certified disability management specialist with expertise in return-to-work programs and case coordination.',
  },
  {
    id: '22',
    name: 'Andrew Lopez',
    title: 'Vocational Expert',
    location: 'Kelowna, BC',
    availability: 'Part-time',
    expertise: ['Expert Testimony', 'Labor Market Analysis', 'Vocational Assessment'],
    hourlyRate: '150',
    avatarUrl: '',
    description: 'Andrew is a vocational expert with a background in expert testimony and labor market analysis.',
  },,
];

const People = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [savedConsultants, setSavedConsultants] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Primary filters
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');
  
  // Advanced filters
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState('all');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState('all');

  const filteredConsultants = mockConsultants.filter(c => {
    // Tab filter
    if (activeTab === 'saved' && !savedConsultants.includes(c.id)) {
      return false;
    }
    
    // Search filter
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !c.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Location filter
    if (selectedLocation && selectedLocation !== 'all' && !c.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }
    
    // Skills filter
    if (selectedSkills.length > 0 && !selectedSkills.some(skill => 
        c.expertise.some(exp => exp.toLowerCase().includes(skill.toLowerCase())))) {
      return false;
    }
    
    // Price range filter
    if (selectedPriceRange && selectedPriceRange !== 'all') {
      const rate = parseInt(c.hourlyRate);
      switch (selectedPriceRange) {
        case '0-75':
          if (rate > 75) return false;
          break;
        case '75-100':
          if (rate < 75 || rate > 100) return false;
          break;
        case '100-125':
          if (rate < 100 || rate > 125) return false;
          break;
        case '125+':
          if (rate < 125) return false;
          break;
      }
    }
    
    // Work mode filter (availability)
    if (selectedWorkMode && selectedWorkMode !== 'all' && c.availability !== selectedWorkMode) {
      return false;
    }
    
    return true;
  });

  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(filteredConsultants.length / ITEMS_PER_PAGE);

  const paginatedConsultants = filteredConsultants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const toggleSaved = (consultantId: string) => {
    setSavedConsultants(prev => 
      prev.includes(consultantId) 
        ? prev.filter(id => id !== consultantId)
        : [...prev, consultantId]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setSelectedSkills([]);
    setSelectedDesignations([]);
    setSelectedPriceRange('all');
    setSelectedWorkMode('all');
    setSelectedAvailability('all');
    setSelectedLanguages([]);
    setSelectedEducation('all');
    setSelectedCertifications([]);
    setSelectedExperience('all');
    setCurrentPage(1);
  };

  return (
    <>
      <OrganizationNavBar />
      <div className="min-h-screen w-full bg-gray-50/50">
        {/* Sticky Container for Filters */}
        <div className="sticky top-[4.5rem] z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex justify-between items-center py-3">
              {/* Search and Primary Filters */}
              <div className="flex flex-col lg:flex-row gap-3 items-center w-full">
                {/* Search Bar */}
                <div className="relative flex-grow">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search by name, skills, or title..." 
                    className="pl-10 w-full h-10 rounded-full bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Primary Filters */}
                <div className="flex flex-wrap gap-2 items-center">
                  {/* Location Filter */}
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-10 rounded-full bg-gray-100 border-transparent hover:bg-gray-200/80 transition-all w-40">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="ontario">Ontario</SelectItem>
                      <SelectItem value="british columbia">British Columbia</SelectItem>
                      <SelectItem value="alberta">Alberta</SelectItem>
                      <SelectItem value="quebec">Quebec</SelectItem>
                      <SelectItem value="manitoba">Manitoba</SelectItem>
                      <SelectItem value="nova scotia">Nova Scotia</SelectItem>
                      <SelectItem value="new brunswick">New Brunswick</SelectItem>
                      <SelectItem value="saskatchewan">Saskatchewan</SelectItem>
                      <SelectItem value="newfoundland">Newfoundland</SelectItem>
                      <SelectItem value="prince edward island">Prince Edward Island</SelectItem>
                      <SelectItem value="northwest territories">Northwest Territories</SelectItem>
                      <SelectItem value="yukon">Yukon</SelectItem>
                      <SelectItem value="nunavut">Nunavut</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Skills Filter */}
                  <Select value={selectedSkills[0] || 'all'} onValueChange={(value) => setSelectedSkills(value === 'all' ? [] : [value])}>
                    <SelectTrigger className="h-10 rounded-full bg-gray-100 border-transparent hover:bg-gray-200/80 transition-all w-40">
                      <SelectValue placeholder="Skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      <SelectItem value="vocational assessment">Vocational Assessment</SelectItem>
                      <SelectItem value="career counseling">Career Counseling</SelectItem>
                      <SelectItem value="case management">Case Management</SelectItem>
                      <SelectItem value="ergonomic assessment">Ergonomic Assessment</SelectItem>
                      <SelectItem value="job placement">Job Placement</SelectItem>
                      <SelectItem value="disability management">Disability Management</SelectItem>
                      <SelectItem value="return-to-work">Return-to-Work</SelectItem>
                      <SelectItem value="functional evaluation">Functional Evaluation</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Price Range Filter */}
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger className="h-10 rounded-full bg-gray-100 border-transparent hover:bg-gray-200/80 transition-all w-32">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rates</SelectItem>
                      <SelectItem value="0-75">$0 - $75</SelectItem>
                      <SelectItem value="75-100">$75 - $100</SelectItem>
                      <SelectItem value="100-125">$100 - $125</SelectItem>
                      <SelectItem value="125+">$125+</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Work Mode Filter */}
                  <Select value={selectedWorkMode} onValueChange={setSelectedWorkMode}>
                    <SelectTrigger className="h-10 rounded-full bg-gray-100 border-transparent hover:bg-gray-200/80 transition-all w-36">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* All Filters Button */}
                  <Button 
                    onClick={() => setShowFiltersModal(true)} 
                    variant="outline" 
                    className="h-10 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    More
                  </Button>
                  
                  {/* Clear Filters */}
                  {(searchTerm || selectedLocation !== 'all' || selectedSkills.length > 0 || selectedPriceRange !== 'all' || selectedWorkMode !== 'all') && (
                    <Button 
                      onClick={clearAllFilters} 
                      variant="ghost" 
                      className="text-gray-500 hover:text-gray-800 rounded-full"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          {/* Tab Navigation & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 mb-6">
            {/* Modern Toggle Bar - now on the left */}
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <div className="bg-gray-100 rounded-full p-1 shadow-inner">
                <Button 
                  variant={activeTab === 'all' ? 'default' : 'ghost'} 
                  onClick={() => setActiveTab('all')}
                  size="sm"
                  className={`rounded-full h-8 px-4 text-xs font-semibold transition-all ${activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'}`}
                >
                  All
                </Button>
                <Button 
                  variant={activeTab === 'suggested' ? 'default' : 'ghost'} 
                  onClick={() => setActiveTab('suggested')}
                  size="sm"
                  className={`rounded-full h-8 px-4 text-xs font-semibold transition-all ${activeTab === 'suggested' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'}`}
                >
                  Suggested
                </Button>
                <Button 
                  variant={activeTab === 'saved' ? 'default' : 'ghost'} 
                  onClick={() => setActiveTab('saved')}
                  size="sm"
                  className={`rounded-full h-8 px-4 text-xs font-semibold transition-all ${activeTab === 'saved' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'}`}
                >
                  Saved
                </Button>
              </div>
            </div>
            {/* Meta Info - now to the right of the toggle */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <strong>{filteredConsultants.length}</strong> consultants found
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                Avg. response time: <strong>2 hours</strong>
              </div>
            </div>
          </div>

          {/* Consultant Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedConsultants.map(consultant => (
              <ConsultantCard
                key={consultant.id}
                {...consultant}
                onSave={toggleSaved}
                isSaved={savedConsultants.includes(consultant.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(Math.max(1, currentPage - 1)); }} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(Math.min(totalPages, currentPage + 1)); }} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>

        {/* Advanced Filters Modal */}
        <Dialog open={showFiltersModal} onOpenChange={setShowFiltersModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Advanced Filters</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-6">
              {/* Languages */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Languages</Label>
                <div className="space-y-2 pt-1">
                  {['English', 'French', 'Spanish', 'Mandarin', 'German'].map(lang => (
                    <div key={lang} className="flex items-center space-x-3">
                      <Checkbox 
                        id={lang}
                        checked={selectedLanguages.includes(lang)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLanguages([...selectedLanguages, lang]);
                          } else {
                            setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                          }
                        }}
                        className="rounded-md"
                      />
                      <Label htmlFor={lang} className="text-sm font-normal text-gray-700">{lang}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Professional Designations */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Professional Designations</Label>
                <div className="space-y-2 pt-1">
                  {['CVRP', 'CVRP(p)', 'RTWDM', 'CCVE', 'ICVE', 'CCRC', 'OT', 'Reg Psychologist', 'RRP', 'RVP'].map(cert => (
                    <div key={cert} className="flex items-center space-x-3">
                      <Checkbox 
                        id={cert}
                        checked={selectedDesignations.includes(cert)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDesignations([...selectedDesignations, cert]);
                          } else {
                            setSelectedDesignations(selectedDesignations.filter(c => c !== cert));
                          }
                        }}
                        className="rounded-md"
                      />
                      <Label htmlFor={cert} className="text-sm font-normal text-gray-700">{cert}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Education Level */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Education Level</Label>
                <Select value={selectedEducation} onValueChange={setSelectedEducation}>
                  <SelectTrigger className="w-full h-10 rounded-md">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Education</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Experience Level */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Experience Level</Label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger className="w-full h-10 rounded-md">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Experience</SelectItem>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                    <SelectItem value="expert">Expert Level (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Certifications */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Certifications</Label>
                <div className="space-y-2 pt-1">
                  {['First Aid/CPR', 'Ergonomic Assessment', 'Functional Capacity Evaluation', 'Vocational Evaluation', 'Case Management'].map(cert => (
                    <div key={cert} className="flex items-center space-x-3">
                      <Checkbox 
                        id={cert}
                        checked={selectedCertifications.includes(cert)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCertifications([...selectedCertifications, cert]);
                          } else {
                            setSelectedCertifications(selectedCertifications.filter(c => c !== cert));
                          }
                        }}
                        className="rounded-md"
                      />
                      <Label htmlFor={cert} className="text-sm font-normal text-gray-700">{cert}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Availability */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Availability</Label>
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger className="w-full h-10 rounded-md">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Availability</SelectItem>
                    <SelectItem value="immediate">Available Immediately</SelectItem>
                    <SelectItem value="week">Available within 1 week</SelectItem>
                    <SelectItem value="month">Available within 1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-5 border-t mt-2">
              <Button 
                variant="ghost" 
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-blue-600 transition-all rounded-full"
              >
                Clear All Filters
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setShowFiltersModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowFiltersModal(false)} className="bg-blue-600 hover:bg-blue-700 rounded-full">
                  Apply Filters ({filteredConsultants.length} results)
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default People;

