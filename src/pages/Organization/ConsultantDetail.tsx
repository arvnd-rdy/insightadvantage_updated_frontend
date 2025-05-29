
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Heart, 
  Share2,
  ArrowLeft,
  Calendar,
  Award,
  TrendingUp,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ConsultantDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock detailed consultant data
  const consultant = {
    id: "1",
    name: "John Mitchell",
    username: "johnmitchell",
    title: "Strategic Business Consultant & Growth Specialist",
    location: "Boston, MA",
    avatar: "",
    rating: 5.0,
    reviewCount: 119,
    level: "Top Rated Plus",
    memberSince: "Mar 2022",
    lastDelivery: "about 2 hours",
    responseTime: "1 hour",
    languages: ["English", "Spanish"],
    skills: ["Strategic Planning", "Business Development", "Market Research", "Financial Modeling", "Competitive Analysis"],
    description: "I'm a senior strategy consultant with over 8 years of experience helping businesses scale and grow. I've worked with Fortune 500 companies and startups alike, developing comprehensive business strategies that drive results. My approach combines data-driven insights with creative problem-solving to deliver actionable plans that your team can implement immediately.",
    education: [
      { degree: "MBA in Strategy", school: "Harvard Business School", year: "2018" },
      { degree: "BS in Economics", school: "MIT", year: "2014" }
    ],
    certifications: ["Certified Management Consultant (CMC)", "Six Sigma Black Belt"],
    hourlyRate: 150,
    email: "john.mitchell@example.com",
    phone: "+1 (555) 123-4567",
    website: "johnmitchell.consulting",
    reviews: [
      {
        id: 1,
        author: "Sarah K.",
        rating: 5,
        date: "1 week ago",
        comment: "Exceptional work! John delivered a comprehensive business strategy that exceeded our expectations. The market analysis was thorough and the financial projections were spot-on. Highly recommended!",
        helpful: 12
      },
      {
        id: 2,
        author: "Mike R.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Working with John was a game-changer for our startup. His strategic insights helped us pivot our business model and secure funding. Professional, timely, and incredibly knowledgeable.",
        helpful: 8
      },
      {
        id: 3,
        author: "Lisa M.",
        rating: 4,
        date: "1 month ago",
        comment: "Great strategic thinking and clear communication throughout the process. The deliverables were well-structured and actionable. Would definitely work with John again.",
        helpful: 5
      }
    ],
    portfolio: [
      {
        id: 1,
        title: "Tech Startup Growth Strategy",
        description: "Helped a SaaS startup develop a go-to-market strategy that resulted in 300% user growth",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "E-commerce Expansion Plan",
        description: "Created international expansion strategy for e-commerce company entering European markets",
        image: "/placeholder.svg"
      }
    ],
    faq: [
      {
        question: "What information do you need to get started?",
        answer: "I'll need basic information about your business, current challenges, target market, and financial goals. I'll send you a detailed questionnaire once you place your order."
      },
      {
        question: "Do you provide ongoing support after delivery?",
        answer: "Yes! All packages include post-delivery support. Premium packages include 4 weeks of weekly check-ins to help with implementation."
      },
      {
        question: "Can you work with startups and established businesses?",
        answer: "Absolutely! I have experience with both early-stage startups and Fortune 500 companies. My approach adapts to your business size and stage."
      }
    ]
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleContact = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to John Mitchell. They typically respond within 1 hour.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Consultant Saved",
      description: "John Mitchell has been added to your saved consultants.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar role="organization" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Emma Rodriguez"
            userRole="organization"
          />
          
          <main className="p-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link to="/organization/search" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to search results
              </Link>
            </div>

            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"></div>
                <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src={consultant.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl font-semibold">
                      {consultant.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <div className="pt-20 pb-8 px-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-3xl font-bold text-gray-900">{consultant.name}</h1>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{consultant.level}</Badge>
                    </div>
                    <p className="text-xl text-gray-600 mb-4">{consultant.title}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        {renderStars(Math.floor(consultant.rating))}
                        <span className="font-semibold text-gray-900">{consultant.rating}</span>
                        <span>({consultant.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {consultant.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Responds in {consultant.responseTime}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {consultant.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      ${consultant.hourlyRate}/hour
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={handleSave} className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="lg" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button size="lg" onClick={handleContact} className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Contact Consultant
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-12 p-1 bg-gray-100 rounded-xl">
                    <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-lg">Reviews ({consultant.reviewCount})</TabsTrigger>
                    <TabsTrigger value="portfolio" className="rounded-lg">Portfolio</TabsTrigger>
                    <TabsTrigger value="faq" className="rounded-lg">FAQ</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6 mt-8">
                    <Card className="border-0 shadow-sm bg-white rounded-xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl">About this consultant</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed text-lg">{consultant.description}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white rounded-xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl">Education & Certifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-900">Education</h4>
                          <div className="space-y-3">
                            {consultant.education.map((edu, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">{edu.degree}</p>
                                  <p className="text-gray-600">{edu.school}, {edu.year}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-gray-900">Certifications</h4>
                          <div className="space-y-2">
                            {consultant.certifications.map((cert, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <Award className="h-5 w-5 text-yellow-500" />
                                <span className="text-gray-700">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="space-y-6 mt-8">
                    {consultant.reviews.map((review) => (
                      <Card key={review.id} className="border-0 shadow-sm bg-white rounded-xl">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-gray-900">{review.author}</span>
                                <div className="flex items-center gap-1">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                          <p className="text-xs text-gray-500">👍 Helpful ({review.helpful})</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="portfolio" className="space-y-6 mt-8">
                    {consultant.portfolio.map((item) => (
                      <Card key={item.id} className="border-0 shadow-sm bg-white rounded-xl overflow-hidden">
                        <CardContent className="pt-6">
                          <div className="flex gap-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex-shrink-0"></div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-xl mb-3 text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="faq" className="space-y-6 mt-8">
                    {consultant.faq.map((item, index) => (
                      <Card key={index} className="border-0 shadow-sm bg-white rounded-xl">
                        <CardContent className="pt-6">
                          <h4 className="font-semibold text-lg mb-3 text-gray-900">{item.question}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <Card className="border-0 shadow-sm bg-white rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{consultant.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{consultant.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Globe className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <p className="font-medium">{consultant.website}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="border-0 shadow-sm bg-white rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Professional Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{consultant.reviewCount}</p>
                        <p className="text-sm text-gray-600">Reviews</p>
                      </div>
                      <div className="text-center p-3 bg-emerald-50 rounded-lg">
                        <p className="text-2xl font-bold text-emerald-600">{consultant.rating}</p>
                        <p className="text-sm text-gray-600">Rating</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Member since</span>
                        <span className="font-medium">{consultant.memberSince}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Response time</span>
                        <span className="font-medium">{consultant.responseTime}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-600">Languages</span>
                        <span className="font-medium">{consultant.languages.join(", ")}</span>
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

export default ConsultantDetail;
