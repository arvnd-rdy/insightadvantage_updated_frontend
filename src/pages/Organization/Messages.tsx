
import React, { useState } from 'react';
import OrganizationNavBar from '@/components/OrganizationNavBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  Search,
  Send,
  Paperclip,
  ArrowLeft,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Image,
  File,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Calendar,
  UserPlus,
  X,
  Star
} from 'lucide-react';

const engagements = {
  requests: [
    {
      id: 'req1',
      consultantName: 'Alex Johnson',
      contactPerson: 'Alex Johnson',
      role: 'Senior Digital Transformation Consultant',
      projectTitle: 'Digital Transformation Project',
      budget: '$120,000',
      duration: '6 months',
      location: 'Remote (Global)',
      requestMessage: "We are interested in your digital transformation expertise for our upcoming enterprise modernization project. Your experience with similar transformations aligns perfectly with our requirements.",
      timestamp: '2 hours ago',
      status: 'pending',
      urgency: 'high',
      projectStart: '2024-04-01',
      requirements: ['8+ years experience', 'Digital transformation expertise', 'Enterprise systems integration'],
      consultantSize: 'Independent',
      specialty: 'Digital Transformation',
      sentDate: '2024-03-16'
    },
    {
      id: 'req2',
      consultantName: 'Sarah Williams',
      contactPerson: 'Sarah Williams',
      role: 'UX/UI Design Specialist',
      projectTitle: 'Mobile App Redesign',
      budget: '$45,000',
      duration: '3 months',
      location: 'San Francisco, CA',
      requestMessage: "We would like to invite you to work on our mobile app redesign project. Your portfolio and expertise in user experience design make you an ideal candidate for this initiative.",
      timestamp: '1 day ago',
      status: 'pending',
      urgency: 'medium',
      projectStart: '2024-03-15',
      requirements: ['5+ years UX/UI experience', 'Mobile app design', 'User research'],
      consultantSize: 'Independent',
      specialty: 'UX/UI Design',
      sentDate: '2024-03-15'
    },
    {
      id: 'req3',
      consultantName: 'Michael Chen',
      contactPerson: 'Michael Chen',
      role: 'Data Science Consultant',
      projectTitle: 'Analytics Dashboard Development',
      budget: '$80,000',
      duration: '4 months',
      location: 'New York, NY',
      requestMessage: "We are seeking your expertise for our analytics dashboard development project. Your background in machine learning and data visualization makes you a perfect fit for this role.",
      timestamp: '3 days ago',
      status: 'pending',
      urgency: 'low',
      projectStart: '2024-05-01',
      requirements: ['Machine learning expertise', 'Data visualization', 'Dashboard development'],
      consultantSize: 'Independent',
      specialty: 'Data Science',
      sentDate: '2024-03-13'
    }
  ],
  active: [
    {
      id: '1',
      consultantName: 'Alex Johnson',
      contactPerson: 'Alex Johnson',
      role: 'Senior Digital Transformation Consultant',
      projectTitle: 'Digital Transformation Project',
      budget: '$120,000',
      duration: '6 months',
      location: 'Remote (Global)',
      lastMessage: "That sounds like a project that aligns well with my expertise. I've worked on similar transformations in the tech sector.",
      timestamp: '2 hours ago',
      unread: 2,
      status: 'in_progress',
      messages: [
        {
          id: '1',
          sender: 'me',
          content: "Hi Alex, we came across your profile and are interested in your consulting services for our upcoming digital transformation project.",
          timestamp: 'Today, 9:00 AM'
        },
        {
          id: '2',
          sender: 'them',
          content: "Hello! Thank you for reaching out. I'd be happy to discuss your digital transformation project. Could you provide more details about your needs and timeline?",
          timestamp: 'Today, 9:15 AM'
        },
        {
          id: '3',
          sender: 'me',
          content: "Of course. We're looking to modernize our customer management systems and integrate with our existing ERP. The project timeline is approximately 6 months, starting next quarter.",
          timestamp: 'Today, 9:30 AM'
        },
        {
          id: '4',
          sender: 'them',
          content: "That sounds like a project that aligns well with my expertise. I've worked on similar transformations in the tech sector. Would you be available for a call this week to discuss further?",
          timestamp: 'Today, 10:00 AM'
        }
      ]
    },
    {
      id: '2',
      consultantName: 'Sarah Williams',
      contactPerson: 'Sarah Williams',
      role: 'UX/UI Design Specialist',
      projectTitle: 'Mobile App Redesign',
      budget: '$45,000',
      duration: '3 months',
      location: 'San Francisco, CA',
      lastMessage: "I would be interested in discussing your redesign project further. My portfolio includes several similar cases.",
      timestamp: '1 day ago',
      unread: 1,
      status: 'negotiating',
      messages: [
        {
          id: '5',
          sender: 'me',
          content: "We need a UX/UI designer for our mobile app redesign project.",
          timestamp: 'Yesterday, 2:00 PM'
        },
        {
          id: '6',
          sender: 'them',
          content: "I'm very interested! Can you provide more details about the scope?",
          timestamp: 'Yesterday, 2:30 PM'
        },
        {
          id: '7',
          sender: 'me',
          content: "The app serves 50,000+ users and needs a complete UX overhaul.",
          timestamp: 'Yesterday, 4:00 PM'
        }
      ]
    }
  ],
  previous: [
    {
      id: '3',
      consultantName: 'Michael Chen',
      contactPerson: 'Michael Chen',
      role: 'Data Science Consultant',
      projectTitle: 'Analytics Dashboard Development',
      budget: '$80,000',
      duration: '4 months',
      location: 'New York, NY',
      lastMessage: "Thank you for the successful project completion! The analytics dashboard exceeded our expectations.",
      timestamp: '2 weeks ago',
      unread: 0,
      status: 'completed',
      completedDate: '2024-03-01',
      messages: [
        {
          id: '8',
          sender: 'me',
          content: "We need an analytics dashboard for our data insights.",
          timestamp: '3 weeks ago'
        },
        {
          id: '9',
          sender: 'them',
          content: "I can help with that. Let me review your data requirements.",
          timestamp: '3 weeks ago'
        },
        {
          id: '10',
          sender: 'me',
          content: "Thank you for the successful project completion! The analytics dashboard exceeded our expectations.",
          timestamp: '2 weeks ago'
        }
      ]
    }
  ],
  closed: [
    {
      id: '4',
      consultantName: 'Emily Rodriguez',
      contactPerson: 'Emily Rodriguez',
      role: 'Marketing Strategy Expert',
      projectTitle: 'Digital Marketing Campaign',
      budget: '$25,000',
      duration: '2 months',
      location: 'Los Angeles, CA',
      lastMessage: "Project completed successfully. Digital presence increased by 45% as promised.",
      timestamp: '1 month ago',
      unread: 0,
      status: 'closed',
      closedDate: '2024-02-15',
      messages: [
        {
          id: '11',
          sender: 'me',
          content: "We need help with our digital marketing strategy.",
          timestamp: '2 months ago'
        },
        {
          id: '12',
          sender: 'them',
          content: "I have extensive experience in digital marketing. Let's discuss your goals.",
          timestamp: '2 months ago'
        },
        {
          id: '13',
          sender: 'me',
          content: "Project completed successfully. Digital presence increased by 45% as promised.",
          timestamp: '1 month ago'
        }
      ]
    }
  ]
};

const OrganizationMessages = () => {
  const [selectedEngagementId, setSelectedEngagementId] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [showCloseEngagementModal, setShowCloseEngagementModal] = useState(false);
  const [closeFeedback, setCloseFeedback] = useState({
    rating: '',
    projectOutcome: '',
    consultantPerformance: '',
    communicationQuality: '',
    wouldRecommend: '',
    improvements: '',
    additionalComments: ''
  });

  const selectEngagement = (id) => {
    setSelectedEngagementId(id);
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Here you would typically call an API to withdraw/cancel the request
    // For now, we'll just log the action
    if (action === 'withdraw') {
      // Withdraw engagement request from consultant
      alert('Engagement request withdrawn successfully!');
    }
  };

  const handleCloseEngagement = () => {
    setShowCloseEngagementModal(true);
  };

  const handleCloseFeedbackSubmit = () => {
    console.log('Feedback submitted:', closeFeedback);
    // Here you would typically send the feedback to your API
    alert('Engagement closed successfully! Thank you for your feedback.');
    setShowCloseEngagementModal(false);
    setCloseFeedback({
      rating: '',
      projectOutcome: '',
      consultantPerformance: '',
      communicationQuality: '',
      wouldRecommend: '',
      improvements: '',
      additionalComments: ''
    });
  };

  const handleFeedbackChange = (field, value) => {
    setCloseFeedback(prev => ({ ...prev, [field]: value }));
  };

  const currentEngagement = engagements[activeTab]?.find(e => e.id === selectedEngagementId);
  const currentRequest = activeTab === 'requests' ? engagements.requests?.find(r => r.id === selectedEngagementId) : null;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <TabsList className="mb-6 flex-shrink-0">
          <TabsTrigger value="requests" className="relative">
            Requests Sent
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          </TabsTrigger>
          <TabsTrigger value="active">Active Engagements</TabsTrigger>
          <TabsTrigger value="previous">Previous Engagements</TabsTrigger>
          <TabsTrigger value="closed">Closed Engagements</TabsTrigger>
        </TabsList>
        
        <div className="flex gap-6 flex-1 min-h-0">
          <ScrollArea className="w-1/3 border rounded-lg bg-white shadow">
            <div className="p-2">
              {activeTab === 'requests' ? (
                engagements.requests?.map((request) => (
                  <div key={request.id} onClick={() => selectEngagement(request.id)}
                        className={cn("p-4 mb-2 cursor-pointer card-modern hover-scale border-l-4", 
                          { "bg-blue-50": request.id === selectedEngagementId },
                          {
                            "border-l-red-500": request.urgency === 'high',
                            "border-l-yellow-500": request.urgency === 'medium',
                            "border-l-green-500": request.urgency === 'low'
                          }
                        )}
                  >
                    <div className="flex items-center mb-3">
                      <Avatar className="mr-3">
                        <AvatarFallback>{request.consultantName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{request.consultantName}</h3>
                        <p className="text-sm text-gray-500">{request.projectTitle}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserPlus className="h-4 w-4 text-blue-500" />
                        <span className={cn("w-2 h-2 rounded-full", {
                          "bg-red-500": request.urgency === 'high',
                          "bg-yellow-500": request.urgency === 'medium',
                          "bg-green-500": request.urgency === 'low'
                        })}></span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{request.requestMessage}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{request.timestamp}</span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{request.budget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                engagements[activeTab]?.map((engagement) => (
                  <div key={engagement.id} onClick={() => selectEngagement(engagement.id)}
                        className={cn("p-4 mb-2 cursor-pointer card-modern hover-scale", { "bg-blue-50": engagement.id === selectedEngagementId })}
                  >
                    <div className="flex items-center mb-3">
                      <Avatar className="mr-3">
                        <AvatarFallback>{engagement.consultantName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{engagement.consultantName}</h3>
                        <p className="text-sm text-gray-500">{engagement.projectTitle}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">{engagement.lastMessage}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{engagement.timestamp}</span>
                        <Badge variant="outline" className="text-xs">{engagement.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="flex-1 bg-white border rounded-lg shadow card-modern flex flex-col">
            {activeTab === 'requests' ? (
              !currentRequest ? (
                <div className="p-6 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                  <Mail className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-lg font-medium">Select a request to view details</p>
                  <p className="text-sm text-gray-400 mt-2">Review your sent requests and manage them</p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {currentRequest.consultantName}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">{currentRequest.projectTitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("text-xs", {
                          "border-red-500 text-red-700": currentRequest.urgency === 'high',
                          "border-yellow-500 text-yellow-700": currentRequest.urgency === 'medium',
                          "border-green-500 text-green-700": currentRequest.urgency === 'low'
                        })}>
                          {currentRequest.urgency} priority
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {currentRequest.location}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" /> {currentRequest.budget}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" /> {currentRequest.duration}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Start: {currentRequest.projectStart}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Consultant: {currentRequest.contactPerson}</span>
                      <span className="text-sm text-gray-500">({currentRequest.role})</span>
                    </div>
                  </div>
                  <ScrollArea className="flex-1 min-h-0">
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Request Message Sent</h3>
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                          <p className="text-gray-700">{currentRequest.requestMessage}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Project Requirements</h3>
                        <ul className="space-y-2">
                          {currentRequest.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Request Status</h3>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Pending Response
                          </span>
                          <span className="text-sm text-gray-500">Sent on {currentRequest.sentDate}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Consultant Type</h4>
                          <p className="text-sm text-gray-600">{currentRequest.consultantSize}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Specialty</h4>
                          <p className="text-sm text-gray-600">{currentRequest.specialty}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="p-6 border-t bg-gray-50 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Request sent {currentRequest.timestamp}
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => handleRequestAction(currentRequest.id, 'withdraw')}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Withdraw Request
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : !currentEngagement ? (
              <div className="p-6 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-lg font-medium">Select an engagement to view messages</p>
                <p className="text-sm text-gray-400 mt-2">Choose from your active, previous, or closed engagements</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {currentEngagement.consultantName}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">{currentEngagement.projectTitle}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {currentEngagement.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {currentEngagement.location}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" /> {currentEngagement.budget}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" /> {currentEngagement.duration}
                    </p>
                  </div>
                </div>
                <ScrollArea className="flex-1 min-h-0">
                  <div className="p-4 space-y-4">
                    {currentEngagement.messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'me' 
                            ? 'bg-blue-500 text-white ml-auto' 
                            : 'bg-gray-200 text-gray-800 mr-auto'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <span className={`block mt-1 text-xs ${
                            message.sender === 'me' ? 'text-blue-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
                  {/* Close Engagement Button - Only show for active engagements */}
                  {activeTab === 'active' && (
                    <div className="mb-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        onClick={handleCloseEngagement}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Close Engagement Thread
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="h-12 w-12">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <h4 className="font-medium">Attach Files</h4>
                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="h-16 flex-col">
                              <File className="h-5 w-5 mb-1" />
                              <span className="text-xs">Document</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex-col">
                              <Image className="h-5 w-5 mb-1" />
                              <span className="text-xs">Image</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex-col">
                              <FileText className="h-5 w-5 mb-1" />
                              <span className="text-xs">PDF</span>
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input placeholder="Type a message..." className="input-modern flex-1" />
                    <Button size="icon" className="btn-modern h-12 w-12">
                      <Send className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Tabs>
      
      {/* Close Engagement Feedback Modal */}
      <Dialog open={showCloseEngagementModal} onOpenChange={setShowCloseEngagementModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <X className="h-6 w-6 text-red-500" />
              Close Engagement Thread
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Engagement:</strong> {currentEngagement?.projectTitle || 'Current Project'}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Consultant:</strong> {currentEngagement?.consultantName || 'Consultant'}
              </p>
            </div>
            
            {/* Overall Rating */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Overall Rating *</Label>
              <RadioGroup
                value={closeFeedback.rating}
                onValueChange={(value) => handleFeedbackChange('rating', value)}
                className="flex gap-4"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {rating}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Project Outcome */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Project Outcome *</Label>
              <RadioGroup
                value={closeFeedback.projectOutcome}
                onValueChange={(value) => handleFeedbackChange('projectOutcome', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exceeded" id="exceeded" />
                  <Label htmlFor="exceeded">Exceeded expectations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="met" id="met" />
                  <Label htmlFor="met">Met expectations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="below" id="below" />
                  <Label htmlFor="below">Below expectations</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Consultant Performance */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Consultant Performance *</Label>
              <RadioGroup
                value={closeFeedback.consultantPerformance}
                onValueChange={(value) => handleFeedbackChange('consultantPerformance', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="excellent" />
                  <Label htmlFor="excellent">Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" />
                  <Label htmlFor="good">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="average" />
                  <Label htmlFor="average">Average</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="poor" />
                  <Label htmlFor="poor">Poor</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Communication Quality */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Communication Quality *</Label>
              <RadioGroup
                value={closeFeedback.communicationQuality}
                onValueChange={(value) => handleFeedbackChange('communicationQuality', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="comm-excellent" />
                  <Label htmlFor="comm-excellent">Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="comm-good" />
                  <Label htmlFor="comm-good">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="comm-average" />
                  <Label htmlFor="comm-average">Average</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="comm-poor" />
                  <Label htmlFor="comm-poor">Poor</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Would Recommend */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Would you recommend this consultant? *</Label>
              <RadioGroup
                value={closeFeedback.wouldRecommend}
                onValueChange={(value) => handleFeedbackChange('wouldRecommend', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="recommend-yes" />
                  <Label htmlFor="recommend-yes">Yes, definitely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="recommend-maybe" />
                  <Label htmlFor="recommend-maybe">Maybe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="recommend-no" />
                  <Label htmlFor="recommend-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Improvements */}
            <div className="space-y-3">
              <Label htmlFor="improvements" className="text-base font-semibold">Areas for Improvement</Label>
              <Textarea
                id="improvements"
                placeholder="What could the consultant have done better?"
                value={closeFeedback.improvements}
                onChange={(e) => handleFeedbackChange('improvements', e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            {/* Additional Comments */}
            <div className="space-y-3">
              <Label htmlFor="comments" className="text-base font-semibold">Additional Comments</Label>
              <Textarea
                id="comments"
                placeholder="Any additional feedback or comments?"
                value={closeFeedback.additionalComments}
                onChange={(e) => handleFeedbackChange('additionalComments', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowCloseEngagementModal(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCloseFeedbackSubmit}
              disabled={!closeFeedback.rating || !closeFeedback.projectOutcome || !closeFeedback.consultantPerformance || !closeFeedback.communicationQuality || !closeFeedback.wouldRecommend}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <X className="h-4 w-4 mr-2" />
              Close Engagement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PageWithNav = () => (
  <>
    <OrganizationNavBar />
    <div className="p-6">
      <OrganizationMessages />
    </div>
  </>
);

export default PageWithNav;
