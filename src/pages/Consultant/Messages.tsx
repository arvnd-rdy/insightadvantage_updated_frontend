
import React, { useState } from 'react';
import ConsultantLayout from '@/components/ConsultantLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import DocumentUploader from '@/components/DocumentUploader';
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
  Calendar
} from 'lucide-react';

const engagements = {
  requests: [
    {
      id: 'req1',
      organizationName: 'Global Tech Solutions',
      contactPerson: 'Jennifer Miller',
      role: 'Talent Acquisition Manager',
      jobTitle: 'Senior UX/UI Design Consultant',
      budget: '$85,000',
      duration: '4 months',
      location: 'Remote (Toronto-based)',
      requestMessage: "We're looking for a senior UX/UI consultant to lead our digital transformation project. Your portfolio and experience in healthcare applications caught our attention. We'd love to discuss this opportunity with you.",
      timestamp: '3 hours ago',
      status: 'pending',
      urgency: 'high',
      projectStart: '2024-04-15',
      requirements: ['5+ years UX/UI experience', 'Healthcare domain knowledge', 'Figma/Adobe Creative Suite'],
      companySize: '500-1000 employees',
      industry: 'Healthcare Technology'
    },
    {
      id: 'req2',
      organizationName: 'StartupHub Inc',
      contactPerson: 'Alex Thompson',
      role: 'CEO',
      jobTitle: 'Product Strategy Consultant',
      budget: '$60,000',
      duration: '2 months',
      location: 'Vancouver, BC',
      requestMessage: "Hi! We're a fast-growing fintech startup and need strategic guidance on our product roadmap. Your background in financial services and product management would be invaluable.",
      timestamp: '1 day ago',
      status: 'pending',
      urgency: 'medium',
      projectStart: '2024-04-01',
      requirements: ['Product strategy experience', 'Fintech knowledge', 'Agile methodologies'],
      companySize: '50-100 employees',
      industry: 'Financial Technology'
    },
    {
      id: 'req3',
      organizationName: 'Manufacturing Excellence Corp',
      contactPerson: 'Robert Kim',
      role: 'Operations Director',
      jobTitle: 'Lean Manufacturing Consultant',
      budget: '$45,000',
      duration: '3 months',
      location: 'Calgary, AB',
      requestMessage: "Our manufacturing facility needs optimization. We've heard great things about your lean manufacturing expertise and would like to explore a consultation engagement.",
      timestamp: '2 days ago',
      status: 'pending',
      urgency: 'low',
      projectStart: '2024-05-01',
      requirements: ['Lean Six Sigma certification', 'Manufacturing experience', 'Process optimization'],
      companySize: '200-500 employees',
      industry: 'Manufacturing'
    }
  ],
  active: [
    {
      id: '1',
      organizationName: 'Innovatech Solutions',
      contactPerson: 'Sarah Johnson',
      role: 'HR Manager',
      jobTitle: 'Senior Ergonomic Assessment Specialist',
      budget: '$75,000',
      duration: '3 months',
      location: 'Toronto, ON',
      lastMessage: "Thanks for your proposal. We'd like to schedule a call to discuss the timeline.",
      timestamp: '2 hours ago',
      unread: 2,
      status: 'negotiating',
      messages: [
        { 
          id: '1', 
          sender: 'them', 
          content: "Hi Aravind, we reviewed your profile and are interested in discussing our ergonomic assessment project.", 
          timestamp: 'Today, 9:00 AM'
        },
        { 
          id: '2', 
          sender: 'me', 
          content: "Hello Sarah! Thank you for reaching out. I'd be happy to discuss the project details with you.", 
          timestamp: 'Today, 9:15 AM'
        },
        { 
          id: '3', 
          sender: 'them', 
          content: "Great! We need someone to assess 50 workstations across our Toronto office. The project timeline is 3 months with a budget of $75,000.", 
          timestamp: 'Today, 9:30 AM'
        },
        { 
          id: '4', 
          sender: 'me', 
          content: "That sounds like a perfect fit for my expertise. I have extensive experience in workplace ergonomics and can definitely work within your timeline and budget.", 
          timestamp: 'Today, 10:00 AM'
        },
        { 
          id: '5', 
          sender: 'them', 
          content: "Thanks for your proposal. We'd like to schedule a call to discuss the timeline.", 
          timestamp: 'Today, 2:00 PM'
        },
      ]
    },
    {
      id: '2',
      organizationName: 'HealthFirst Clinic',
      contactPerson: 'Dr. Michael Chen',
      role: 'Medical Director',
      jobTitle: 'Workplace Wellness Consultant',
      budget: '$45,000',
      duration: '2 months',
      location: 'Vancouver, BC',
      lastMessage: "When can you start? We're looking to begin next month.",
      timestamp: '1 day ago',
      unread: 1,
      status: 'pending_start',
      messages: [
        { 
          id: '6', 
          sender: 'them', 
          content: "We need a wellness consultant for our new employee health program.", 
          timestamp: 'Yesterday, 2:00 PM'
        },
        { 
          id: '7', 
          sender: 'me', 
          content: "I'm very interested! Can you provide more details about the scope?", 
          timestamp: 'Yesterday, 2:30 PM'
        },
        { 
          id: '8', 
          sender: 'them', 
          content: "When can you start? We're looking to begin next month.", 
          timestamp: 'Yesterday, 4:00 PM'
        },
      ]
    }
  ],
  previous: [
    {
      id: '3',
      organizationName: 'TechCorp Industries',
      contactPerson: 'Lisa Rodriguez',
      role: 'HR Business Partner',
      jobTitle: 'Workplace Safety Audit',
      budget: '$25,000',
      duration: '1 month',
      location: 'Calgary, AB',
      lastMessage: "Thank you for the excellent work! The audit report was comprehensive.",
      timestamp: '2 weeks ago',
      unread: 0,
      status: 'completed',
      completedDate: '2024-03-01',
      messages: [
        { 
          id: '9', 
          sender: 'them', 
          content: "We need a safety audit for our manufacturing facility.", 
          timestamp: '3 weeks ago'
        },
        { 
          id: '10', 
          sender: 'me', 
          content: "I can help with that. Let me review the facility details.", 
          timestamp: '3 weeks ago'
        },
        { 
          id: '11', 
          sender: 'them', 
          content: "Thank you for the excellent work! The audit report was comprehensive.", 
          timestamp: '2 weeks ago'
        },
      ]
    }
  ],
  closed: [
    {
      id: '4',
      organizationName: 'Manufacturing Plus',
      contactPerson: 'James Wilson',
      role: 'Operations Manager',
      jobTitle: 'Return-to-Work Program Design',
      budget: '$35,000',
      duration: '6 weeks',
      location: 'Edmonton, AB',
      lastMessage: "Project delivered successfully. Thank you!",
      timestamp: '1 month ago',
      unread: 0,
      status: 'closed',
      closedDate: '2024-02-15',
      messages: [
        { 
          id: '12', 
          sender: 'them', 
          content: "We need help designing a return-to-work program.", 
          timestamp: '2 months ago'
        },
        { 
          id: '13', 
          sender: 'me', 
          content: "I have extensive experience in this area. Let's discuss your requirements.", 
          timestamp: '2 months ago'
        },
        { 
          id: '14', 
          sender: 'them', 
          content: "Project delivered successfully. Thank you!", 
          timestamp: '1 month ago'
        },
      ]
    }
  ]
};

const MessagesPage = () => {
  const [selectedEngagementId, setSelectedEngagementId] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  const selectEngagement = (id) => {
    setSelectedEngagementId(id);
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Here you would typically call an API to accept/reject the request
    // For now, we'll just log the action
    if (action === 'accept') {
      // Move to active engagements
      alert('Engagement request accepted! You can now start messaging.');
    } else if (action === 'reject') {
      // Remove from requests or mark as rejected
      alert('Engagement request rejected.');
    }
  };

  const currentEngagement = engagements[activeTab]?.find(e => e.id === selectedEngagementId);
  const currentRequest = activeTab === 'requests' ? engagements.requests?.find(r => r.id === selectedEngagementId) : null;

  return (
    <ConsultantLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <TabsList className="mb-6 flex-shrink-0">
            <TabsTrigger value="requests" className="relative">
              Engagement Requests
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
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
                          <AvatarFallback>{request.organizationName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{request.organizationName}</h3>
                          <p className="text-sm text-gray-500">{request.jobTitle}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-blue-500" />
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
                          <AvatarFallback>{engagement.organizationName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{engagement.organizationName}</h3>
                          <p className="text-sm text-gray-500">{engagement.jobTitle}</p>
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
                    <p className="text-sm text-gray-400 mt-2">Review and respond to engagement requests</p>
                  </div>
                ) : (
                  <>
                    <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">
                            {currentRequest.organizationName}
                          </h2>
                          <p className="text-sm text-gray-600 mt-1">{currentRequest.jobTitle}</p>
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
                        <span className="text-sm text-gray-600">Contact: {currentRequest.contactPerson}</span>
                        <span className="text-sm text-gray-500">({currentRequest.role})</span>
                      </div>
                    </div>
                    <ScrollArea className="flex-1 min-h-0">
                      <div className="p-6 space-y-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-3">Request Message</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">{currentRequest.requestMessage}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-3">Requirements</h3>
                          <ul className="space-y-2">
                            {currentRequest.requirements.map((req, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Company Size</h4>
                            <p className="text-sm text-gray-600">{currentRequest.companySize}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Industry</h4>
                            <p className="text-sm text-gray-600">{currentRequest.industry}</p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="p-6 border-t bg-gray-50 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Request received {currentRequest.timestamp}
                        </div>
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="outline" 
                            onClick={() => handleRequestAction(currentRequest.id, 'reject')}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <ThumbsDown className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                          <Button 
                            onClick={() => handleRequestAction(currentRequest.id, 'accept')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Accept Request
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
                          {currentEngagement.organizationName}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">{currentEngagement.jobTitle}</p>
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
      </div>
    </ConsultantLayout>
  );
};

export default MessagesPage;
