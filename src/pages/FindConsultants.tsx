import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookmarkIcon } from '@/components/icons/bookmark';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Consultant {
  id: number;
  name: string;
  title: string;
  location: string;
  bio: string;
  skills: string[];
  rating: number;
  reviews: number;
  avatar?: string;
  saved?: boolean;
}

// Mock data for consultants
const mockConsultants: Consultant[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Certified Rehabilitation Counselor',
    location: 'Toronto, Ontario',
    bio: 'Experienced rehabilitation counselor with 10+ years helping individuals overcome workplace challenges. Specializes in cognitive assessments and job coaching with a focus on sustainable employment outcomes.',
    skills: ['Vocational Assessment', 'Career Counseling', 'Cognitive Evaluation', 'Job Coaching'],
    rating: 4.8,
    reviews: 24,
    saved: false
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Occupational Therapist',
    location: 'Vancouver, BC',
    bio: 'Licensed OT with expertise in workplace ergonomics and functional capacity evaluations. Passionate about helping clients return to meaningful work through evidence-based interventions.',
    skills: ['Ergonomic Assessment', 'Functional Evaluation', 'Return-to-Work', 'Workplace Accommodation'],
    rating: 4.9,
    reviews: 31,
    saved: true
  },
  {
    id: 3,
    name: 'Jennifer Martinez',
    title: 'Vocational Rehabilitation Specialist',
    location: 'Calgary, Alberta',
    bio: 'Dedicated to empowering individuals with disabilities to achieve their career goals. Extensive experience in job placement services and disability management programs.',
    skills: ['Job Placement', 'Disability Management', 'Case Management', 'Skills Training'],
    rating: 4.7,
    reviews: 18,
    saved: false
  },
  {
    id: 4,
    name: 'Robert Thompson',
    title: 'Registered Psychologist',
    location: 'Montreal, Quebec',
    bio: 'Clinical psychologist specializing in vocational psychology and career development. Helps clients navigate career transitions and overcome psychological barriers to employment.',
    skills: ['Psycho-Vocational Assessment', 'Career Development', 'Psychological Counseling', 'Transition Support'],
    rating: 4.6,
    reviews: 22,
    saved: false
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    title: 'Certified Vocational Evaluator',
    location: 'Ottawa, Ontario',
    bio: 'Expert in comprehensive vocational evaluations and transferable skills analysis. Committed to providing thorough assessments that guide effective rehabilitation planning.',
    skills: ['Transferable Skills Analysis', 'Vocational Evaluation', 'Report Writing', 'Assessment Planning'],
    rating: 4.8,
    reviews: 29,
    saved: true
  },
  {
    id: 6,
    name: 'David Kim',
    title: 'Rehabilitation Coordinator',
    location: 'Winnipeg, Manitoba',
    bio: 'Skilled coordinator with a track record of successful rehabilitation outcomes. Specializes in complex case management and multi-disciplinary team coordination.',
    skills: ['Case Coordination', 'Team Management', 'Program Development', 'Client Advocacy'],
    rating: 4.5,
    reviews: 16,
    saved: false
  }
];

const FindConsultants = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [consultants, setConsultants] = useState(mockConsultants);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [expandedBios, setExpandedBios] = useState<number[]>([]);
  
  const itemsPerPage = 12;

  // Filter consultants based on active tab
  const getFilteredConsultants = () => {
    let filtered = consultants;
    
    if (activeTab === 'recommended') {
      // For demo, show consultants with high ratings
      filtered = consultants.filter(c => c.rating >= 4.7);
    } else if (activeTab === 'saved') {
      filtered = consultants.filter(c => c.saved);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const filteredConsultants = getFilteredConsultants();
  const totalPages = Math.ceil(filteredConsultants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentConsultants = filteredConsultants.slice(startIndex, startIndex + itemsPerPage);

  const toggleSaved = (id: number) => {
    setConsultants(prev => prev.map(c => 
      c.id === id ? { ...c, saved: !c.saved } : c
    ));
  };

  const toggleBio = (id: number) => {
    setExpandedBios(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const truncateBio = (bio: string, maxLength: number = 120) => {
    if (bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Consultants</h1>
          <p className="text-gray-600">Discover qualified professionals for your rehabilitation needs</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
              className={`px-6 py-2 ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
            >
              All Consultants
            </Button>
            <Button 
              variant={activeTab === 'recommended' ? 'default' : 'ghost'}
              onClick={() => { setActiveTab('recommended'); setCurrentPage(1); }}
              className={`px-6 py-2 ${activeTab === 'recommended' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
            >
              Recommended
            </Button>
            <Button 
              variant={activeTab === 'saved' ? 'default' : 'ghost'}
              onClick={() => { setActiveTab('saved'); setCurrentPage(1); }}
              className={`px-6 py-2 ${activeTab === 'saved' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
            >
              Saved
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex gap-4 w-full lg:w-auto">
            <Input 
              placeholder="Search by name, skills, or title..." 
              className="w-full lg:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog open={showFiltersModal} onOpenChange={setShowFiltersModal}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  All Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Filter Consultants</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Languages</Label>
                    <div className="space-y-2">
                      {['English', 'French', 'Spanish', 'Mandarin'].map(lang => (
                        <label key={lang} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Certifications</Label>
                    <div className="space-y-2">
                      {['CRC', 'CDMS', 'CCM', 'CVE'].map(cert => (
                        <label key={cert} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Pricing Range</Label>
                    <Input type="range" className="w-full" min="50" max="200" step="10" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Availability</Label>
                    <select className="w-full p-2 border rounded">
                      <option>Available Now</option>
                      <option>Available in 1 week</option>
                      <option>Available in 1 month</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowFiltersModal(false)}>Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowFiltersModal(false)}>Apply Filters</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Primary Filters */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="text-sm">
              📍 Location
            </Button>
            <Button variant="outline" className="text-sm">
              🔧 Skills
            </Button>
            <Button variant="outline" className="text-sm">
              💼 Services
            </Button>
            <Button variant="outline" className="text-sm">
              ⭐ Experience
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {currentConsultants.length} of {filteredConsultants.length} consultants
          </p>
        </div>

        {/* Consultant Cards Grid */}
        {currentConsultants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentConsultants.map((consultant) => {
              const isExpanded = expandedBios.includes(consultant.id);
              return (
                <div key={consultant.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  {/* Header with avatar, name, and bookmark */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-700">
                          {getInitials(consultant.name)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                          {consultant.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {consultant.title}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaved(consultant.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <BookmarkIcon 
                        className={`w-5 h-5 ${consultant.saved ? 'text-blue-600' : 'text-gray-400'}`}
                        filled={consultant.saved}
                      />
                    </button>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {consultant.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {consultant.skills.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{consultant.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <p className="text-sm text-gray-600 mb-4 flex items-center">
                    <span className="mr-1">📍</span>
                    {consultant.location}
                  </p>

                  {/* Bio */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {isExpanded ? consultant.bio : truncateBio(consultant.bio)}
                      {consultant.bio.length > 120 && (
                        <button
                          onClick={() => toggleBio(consultant.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm ml-1 font-medium"
                        >
                          {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                      )}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(consultant.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {consultant.rating} ({consultant.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No consultants found</h3>
            <p className="text-gray-500 mb-4">
              Sorry, we couldn't find any consultants matching your current filters.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
                setCurrentPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 ${currentPage === page ? 'bg-blue-600 text-white' : ''}`}
              >
                {page}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindConsultants;
