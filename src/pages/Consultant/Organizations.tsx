
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, Building, Heart, Bookmark, DollarSign, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultantOrganizations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for gigs...');
  };

  const clearFilters = () => {
    setSelectedSpecialization('');
    setSelectedLocation('');
    setSelectedBudget('');
    setSelectedDuration('');
    setSelectedWorkMode('');
  };

  const GigCard = ({ gig, showSaveButton = true }: { gig: any, showSaveButton?: boolean }) => (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group mb-4">
      <CardContent className="p-6">
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

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {gig.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {gig.workMode}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {gig.budget}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {gig.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {gig.applicants} applicants
              </div>
            </div>

            <p className="text-gray-700 mb-3 line-clamp-2">
              {gig.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {gig.specializations.map((spec: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Posted {gig.posted} • Deadline: {new Date(gig.applicationDeadline).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                {showSaveButton && (
                  <Button variant="outline" size="sm">
                    <Heart className={`h-4 w-4 mr-2 ${gig.isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    {gig.isSaved ? 'Saved' : 'Save'}
                  </Button>
                )}
                <Button size="sm">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="consultant" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Alex Johnson"
            userRole="consultant"
          />
          
          <main className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Find Gigs</h2>
              <p className="text-gray-600">
                Discover opportunities posted by organizations in vocational rehabilitation.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
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
            </div>

            {/* Horizontal Filters Bar */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vocational-assessment">Vocational Assessment</SelectItem>
                    <SelectItem value="career-counseling">Career Counseling</SelectItem>
                    <SelectItem value="disability-management">Disability Management</SelectItem>
                    <SelectItem value="ergonomics">Ergonomics</SelectItem>
                    <SelectItem value="return-to-work">Return-to-Work</SelectItem>
                    <SelectItem value="transition-services">Transition Services</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toronto">Toronto, ON</SelectItem>
                    <SelectItem value="vancouver">Vancouver, BC</SelectItem>
                    <SelectItem value="calgary">Calgary, AB</SelectItem>
                    <SelectItem value="montreal">Montreal, QC</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                    <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000+">$10,000+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="1-3-months">1-3 Months</SelectItem>
                    <SelectItem value="3-6-months">3-6 Months</SelectItem>
                    <SelectItem value="6-12-months">6-12 Months</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedWorkMode} onValueChange={setSelectedWorkMode}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Work Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="recommended" className="space-y-6">
              <TabsList>
                <TabsTrigger value="recommended">Recommended Gigs</TabsTrigger>
                <TabsTrigger value="saved">Saved Gigs</TabsTrigger>
                <TabsTrigger value="all">All Gigs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommended" className="space-y-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Top gig picks for you</h3>
                  <p className="text-gray-600 text-sm">Based on your profile, preferences, and activity</p>
                </div>
                {recommendedGigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} />
                ))}
              </TabsContent>
              
              <TabsContent value="saved" className="space-y-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Your Saved Gigs</h3>
                  <p className="text-gray-600 text-sm">Gigs you've bookmarked for later</p>
                </div>
                {savedGigs.length > 0 ? (
                  savedGigs.map((gig) => (
                    <GigCard key={gig.id} gig={gig} showSaveButton={false} />
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No saved gigs yet</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Start saving gigs you're interested in to easily find them later.
                    </p>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="all">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">All Available Gigs</h3>
                  <p className="text-gray-600 text-sm">{recommendedGigs.length + savedGigs.length} gigs found</p>
                </div>
                {[...recommendedGigs, ...savedGigs].map((gig) => (
                  <GigCard key={gig.id} gig={gig} />
                ))}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantOrganizations;
