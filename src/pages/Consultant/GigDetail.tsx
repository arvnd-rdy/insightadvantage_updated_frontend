
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Clock, 
  Building, 
  DollarSign, 
  Users, 
  Calendar,
  Heart,
  Share2,
  CheckCircle,
  AlertTriangle,
  MessageCircle
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const GigDetail = () => {
  const { gigId } = useParams();

  // Mock gig data - in real app this would be fetched based on gigId
  const gig = {
    id: '1',
    title: 'Vocational Assessment Specialist Needed',
    organization: {
      name: 'TechCare Rehabilitation Services',
      logo: '',
      size: '50-250 employees',
      industry: 'Healthcare',
      location: 'Toronto, ON',
      description: 'TechCare Rehabilitation Services is a leading provider of vocational rehabilitation services across Canada, specializing in helping individuals return to meaningful employment after injury or illness.',
      founded: '2010',
      website: 'www.techcare-rehab.com'
    },
    location: 'Toronto, ON',
    workMode: 'Remote',
    budget: '$3,000 - $5,000',
    duration: '3-6 months',
    posted: '2 days ago',
    applicants: 15,
    views: 127,
    applicationDeadline: '2024-06-15',
    isUrgent: false,
    isSaved: false,
    specializations: ['Vocational Assessment', 'Return-to-Work'],
    description: 'We are seeking an experienced vocational assessment specialist to conduct comprehensive evaluations for our clients returning to work after injury. This role involves working with a diverse client base and collaborating with multidisciplinary teams.',
    responsibilities: [
      'Conduct comprehensive vocational assessments using standardized tools',
      'Prepare detailed assessment reports with recommendations',
      'Collaborate with case managers, physicians, and other professionals',
      'Provide expert testimony when required',
      'Maintain accurate case documentation and records'
    ],
    requirements: [
      'Master\'s degree in Rehabilitation Counseling or related field',
      'CRC (Certified Rehabilitation Counselor) certification required',
      'Minimum 5 years of experience in vocational assessment',
      'Experience with psychological and vocational testing',
      'Strong report writing and communication skills',
      'Knowledge of disability legislation and workplace accommodation'
    ],
    preferredQualifications: [
      'CDMS certification',
      'Experience with expert witness testimony',
      'Bilingual (English/French) capabilities',
      'Experience with specific assessment tools (TOWER, VALPAR, etc.)'
    ],
    benefits: [
      'Competitive project-based compensation',
      'Flexible working arrangements',
      'Professional development opportunities',
      'Access to latest assessment tools and resources'
    ]
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="consultant" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Alex Johnson"
            userRole="consultant"
          />
          
          <main className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
              <Link to="/consultant/organizations" className="text-blue-600 hover:text-blue-800 text-sm">
                ← Back to Gigs
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h1 className="text-2xl font-bold text-gray-900">{gig.title}</h1>
                          {gig.isUrgent && (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Building className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{gig.organization.name}</h3>
                            <p className="text-sm text-gray-600">{gig.organization.industry} • {gig.organization.size}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{gig.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{gig.workMode}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>{gig.budget}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{gig.duration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {gig.specializations.map((spec, index) => (
                            <Badge key={index} variant="secondary">{spec}</Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Posted {gig.posted}</span>
                          <span>•</span>
                          <span>{gig.applicants} applicants</span>
                          <span>•</span>
                          <span>{gig.views} views</span>
                          <span>•</span>
                          <span>Deadline: {new Date(gig.applicationDeadline).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className={`h-4 w-4 mr-2 ${gig.isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About this gig</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{gig.description}</p>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
                        <ul className="space-y-2">
                          {gig.responsibilities.map((responsibility, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                        <ul className="space-y-2">
                          {gig.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Preferred Qualifications</h3>
                        <ul className="space-y-2">
                          {gig.preferredQualifications.map((qualification, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{qualification}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">What We Offer</h3>
                        <ul className="space-y-2">
                          {gig.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* About Organization */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {gig.organization.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{gig.organization.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Founded:</span>
                        <span className="text-gray-600 ml-2">{gig.organization.founded}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Website:</span>
                        <span className="text-blue-600 ml-2">{gig.organization.website}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Industry:</span>
                        <span className="text-gray-600 ml-2">{gig.organization.industry}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Location:</span>
                        <span className="text-gray-600 ml-2">{gig.organization.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Application Card */}
                <Card className="sticky top-6">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{gig.budget}</div>
                      <div className="text-sm text-gray-600">Project Budget</div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{gig.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Work Mode:</span>
                        <span className="font-medium">{gig.workMode}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Applicants:</span>
                        <span className="font-medium">{gig.applicants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Deadline:</span>
                        <span className="font-medium">{new Date(gig.applicationDeadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        Apply for this Gig
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Organization
                      </Button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                        <div className="text-xs text-yellow-800">
                          <strong>Application Tip:</strong> Make sure your profile highlights your vocational assessment experience and relevant certifications.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GigDetail;
