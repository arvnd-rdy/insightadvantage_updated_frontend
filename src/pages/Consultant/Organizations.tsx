
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MapPin, Clock, Building, Heart, DollarSign, Users, Calendar, Filter, List, Grid, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsultantLayout from '@/components/ConsultantLayout';

const ConsultantOrganizations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  // Mock data for gigs
  const recommendedGigs = [
    {
      id: '1',
      title: 'Vocational Assessment Specialist Needed',
      organization: 'TechCare Rehabilitation Services',
      organizationLogo: '',
      location: 'Toronto, ON',
      workMode: 'Remote',
      budget: '$3,000 - $5,000',
      duration: '3-6 months',
      posted: '2 days ago',
      applicants: 15,
      description: 'We are seeking an experienced vocational assessment specialist to conduct comprehensive evaluations for our clients returning to work after injury.',
      specializations: ['Vocational Assessment', 'Return-to-Work'],
      isUrgent: false,
      isSaved: false,
      applicationDeadline: '2024-06-15',
      requirements: ['CRC Certification', '5+ years experience', 'Experience with psychological assessments'],
    },
    {
      id: '2',
      title: 'Career Counseling for Youth Transition Program',
      organization: 'Future Pathways Inc.',
      organizationLogo: '',
      location: 'Vancouver, BC',
      workMode: 'Hybrid',
      budget: '$2,500 - $4,000',
      duration: '6-12 months',
      posted: '1 week ago',
      applicants: 8,
      description: 'Join our team to provide career counseling services for youth transitioning from education to employment.',
      specializations: ['Career Counseling', 'Transition Services'],
      isUrgent: true,
      isSaved: true,
      applicationDeadline: '2024-06-20',
      requirements: ['Master\'s in Counseling', 'Youth counseling experience', 'Group facilitation skills'],
    },
    {
      id: '3',
      title: 'Disability Management Consultant',
      organization: 'Workplace Solutions Ltd.',
      organizationLogo: '',
      location: 'Calgary, AB',
      workMode: 'On-site',
      budget: '$4,000 - $6,000',
      duration: '1-3 months',
      posted: '3 days ago',
      applicants: 23,
      description: 'Looking for a CDMS certified consultant to develop and implement disability management programs for our corporate clients.',
      specializations: ['Disability Management', 'Workplace Accommodation'],
      isUrgent: false,
      isSaved: false,
      applicationDeadline: '2024-06-25',
      requirements: ['CDMS Certification', 'Corporate experience', 'Program development skills'],
    },
  ];
  const savedGigs = [
    {
      id: '4',
      title: 'Ergonomic Assessment Project',
      organization: 'SafeWork Consulting',
      organizationLogo: '',
      location: 'Montreal, QC',
      workMode: 'On-site',
      budget: '$1,500 - $2,500',
      duration: '1 month',
      posted: '5 days ago',
      applicants: 12,
      description: 'Conduct ergonomic assessments for office environments and provide recommendations for workplace improvements.',
      specializations: ['Ergonomics', 'Workplace Assessment'],
      isUrgent: false,
      isSaved: true,
      applicationDeadline: '2024-06-18',
      requirements: ['Ergonomics certification', 'Report writing skills', 'Experience with office assessments'],
    },
  ];
  const allGigs = [...recommendedGigs, ...savedGigs];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const clearFilters = () => {
    setSelectedSpecialization('');
    setSelectedLocation('');
    setSelectedBudget('');
    setSelectedDuration('');
    setSelectedWorkMode('');
  };
  const applyFilters = () => {
    setSidebarOpen(false);
  };

  const GigCard = ({ gig }: { gig: any }) => (
    <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group w-full max-w-[440px] min-w-[360px] aspect-square mx-auto">
      <CardContent className="p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Link to={`/consultant/gig/${gig.id}`}>
                  <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    {gig.title}
                  </h3>
                </Link>
                {gig.isUrgent && (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Urgent</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Building className="h-4 w-4 text-gray-400" />
                </div>
                <span className="font-medium text-gray-900">{gig.organization}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{gig.location}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{gig.workMode}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{gig.budget}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{gig.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{gig.applicants} applicants</span>
              </div>
              <p className="text-gray-700 mb-3 line-clamp-2">{gig.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {gig.specializations.map((spec: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">{spec}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500 block mb-2">Posted {gig.posted} • Deadline: {new Date(gig.applicationDeadline).toLocaleDateString()}</span>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm">
              <Heart className={`h-4 w-4 mr-2 ${gig.isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              {gig.isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Apply Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Sidebar filter content
  const FilterContent = (
    <div className="flex flex-col h-full text-sm gap-3">
      {/* Skills Filter */}
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="font-semibold mb-2">Skills</div>
        <select
          className="w-full border rounded px-2 py-1"
          value={selectedSpecialization}
          onChange={e => setSelectedSpecialization(e.target.value)}
        >
          <option value="">All Skills</option>
          <option value="vocational-assessment">Vocational Assessment</option>
          <option value="career-counseling">Career Counseling</option>
          <option value="disability-management">Disability Management</option>
          <option value="ergonomics">Ergonomics</option>
          <option value="return-to-work">Return-to-Work</option>
          <option value="transition-services">Transition Services</option>
        </select>
      </div>
      {/* Location Filter */}
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="font-semibold mb-2">Location</div>
        <div className="max-h-32 overflow-y-auto flex flex-col gap-1">
          {['Toronto, ON', 'Vancouver, BC', 'Calgary, AB', 'Montreal, QC', 'Remote'].map(loc => (
            <label key={loc} className="flex items-center gap-2">
              <input
                type="radio"
                name="location"
                value={loc}
                checked={selectedLocation === loc}
                onChange={() => setSelectedLocation(loc)}
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Budget Filter */}
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="font-semibold mb-2">Budget</div>
        <div className="flex flex-col gap-1">
          {['$1,000 - $2,500', '$2,500 - $5,000', '$5,000 - $10,000', '$10,000+'].map(budget => (
            <label key={budget} className="flex items-center gap-2">
              <input
                type="radio"
                name="budget"
                value={budget}
                checked={selectedBudget === budget}
                onChange={() => setSelectedBudget(budget)}
              />
              <span>{budget}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Duration Filter */}
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="font-semibold mb-2">Duration</div>
        <div className="flex flex-col gap-1">
          {['1 Month', '1-3 Months', '3-6 Months', '6-12 Months', 'Ongoing'].map(duration => (
            <label key={duration} className="flex items-center gap-2">
              <input
                type="radio"
                name="duration"
                value={duration}
                checked={selectedDuration === duration}
                onChange={() => setSelectedDuration(duration)}
              />
              <span>{duration}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Work Mode Filter */}
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="font-semibold mb-2">Work Mode</div>
        <div className="flex flex-col gap-1">
          {['Remote', 'On-site', 'Hybrid'].map(mode => (
            <label key={mode} className="flex items-center gap-2">
              <input
                type="radio"
                name="workmode"
                value={mode}
                checked={selectedWorkMode === mode}
                onChange={() => setSelectedWorkMode(mode)}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-auto flex gap-2 pt-4 mb-6">
        <Button variant="outline" className="flex-1" onClick={clearFilters}>Clear All</Button>
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={applyFilters}>Apply</Button>
      </div>
    </div>
  );

  // Responsive: sidebar on desktop, modal on mobile
  return (
    <ConsultantLayout>
      <div className="min-h-screen flex w-full">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:fixed lg:flex flex-col w-72 p-4 bg-gray-50 rounded-xl shadow-md left-0 top-[88px] max-h-[calc(100vh-104px)] overflow-y-auto z-20">
          <div className="mb-4 pb-2 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Filters</h2>
          </div>
          <div className="flex-1 flex flex-col gap-2 text-sm">
            {FilterContent}
          </div>
        </aside>
        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-80">
          {/* Sticky header (unchanged) */}
          <DashboardHeader userName="Alex Johnson" userRole="consultant" />
          <main className="p-4 md:p-6 flex-1">
            {/* Mobile filter button */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
              <span className="text-sm text-gray-500">Showing {allGigs.length} jobs</span>
            </div>
            {/* Filters modal (mobile) */}
            <Dialog open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <DialogTrigger asChild>
                <span></span>
              </DialogTrigger>
              <DialogContent className="max-w-xs w-full p-6">
                <h2 className="text-lg font-bold mb-4">Filters</h2>
                {FilterContent}
              </DialogContent>
            </Dialog>
            {/* View controls */}
            <div className="flex flex-wrap items-center gap-2 mb-6 justify-between">
              <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input 
                    placeholder="Search gigs by title, organization, or skills..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden md:inline">View:</span>
                <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}><List /></Button>
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}><Grid /></Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Newest</SelectItem>
                    <SelectItem value="budget-high">Budget (High to Low)</SelectItem>
                    <SelectItem value="budget-low">Budget (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Job count (desktop) */}
            <div className="hidden lg:block text-sm text-gray-500 mb-4">Showing {allGigs.length} jobs</div>
            {/* Job cards grid/list */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 justify-center' : 'flex flex-col gap-4'}>
              {allGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </ConsultantLayout>
  );
};

export default ConsultantOrganizations;
