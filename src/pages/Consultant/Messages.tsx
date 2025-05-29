
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, Clock, CheckCircle } from 'lucide-react';

const ConsultantMessages = () => {
  // Mock data for messages
  const conversations = [
    {
      id: '1',
      name: 'Tech Solutions Inc.',
      avatar: '',
      lastMessage: "Thanks for your response. When would you be available for an interview?",
      timestamp: '10:32 AM',
      unread: true,
    },
    {
      id: '2',
      name: 'Global Finance',
      avatar: '',
      lastMessage: "We have reviewed your profile and would like to discuss a potential project.",
      timestamp: 'Yesterday',
      unread: false,
    },
    {
      id: '3',
      name: 'Healthcare Innovations',
      avatar: '',
      lastMessage: "Your experience in the healthcare sector is exactly what we need.",
      timestamp: 'Mar 15',
      unread: false,
    },
    {
      id: '4',
      name: 'Creative Solutions',
      avatar: '',
      lastMessage: "Could you share more details about your previous design project?",
      timestamp: 'Mar 12',
      unread: false,
    },
  ];

  const activeConversation = {
    id: '1',
    name: 'Tech Solutions Inc.',
    avatar: '',
    messages: [
      {
        id: '1',
        sender: 'them',
        content: "Hi Alex, we came across your profile and are interested in your consulting services for our upcoming digital transformation project.",
        timestamp: 'Mar 16, 9:30 AM',
        read: true,
      },
      {
        id: '2',
        sender: 'me',
        content: "Hello! Thank you for reaching out. I'd be happy to discuss your digital transformation project. Could you provide more details about your needs and timeline?",
        timestamp: 'Mar 16, 10:15 AM',
        read: true,
      },
      {
        id: '3',
        sender: 'them',
        content: "Of course. We're looking to modernize our customer management systems and integrate with our existing ERP. The project timeline is approximately 6 months, starting next quarter.",
        timestamp: 'Mar 16, 10:25 AM',
        read: true,
      },
      {
        id: '4',
        sender: 'me',
        content: "That sounds like a project that aligns well with my expertise. I've worked on similar transformations in the tech sector. Would you be available for a call this week to discuss further?",
        timestamp: 'Mar 16, 10:30 AM',
        read: true,
      },
      {
        id: '5',
        sender: 'them',
        content: "Thanks for your response. When would you be available for an interview?",
        timestamp: 'Today, 10:32 AM',
        read: false,
      },
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
          
          <main className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Messages</h2>
              <p className="text-gray-600">
                Communicate with organizations about potential opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 border overflow-hidden">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search conversations..." 
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className={`flex items-start p-4 gap-3 cursor-pointer hover:bg-gray-50 ${
                        conversation.id === activeConversation.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      <Avatar>
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback className="bg-brand-blue text-white">
                          {conversation.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium truncate">{conversation.name}</h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <span className="w-2 h-2 bg-brand-blue rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="lg:col-span-2 flex flex-col border overflow-hidden">
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeConversation.avatar} />
                    <AvatarFallback className="bg-brand-blue text-white">
                      {activeConversation.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    <div className="flex items-center text-xs text-green-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                      Online now
                    </div>
                  </div>
                </div>
                
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'me' 
                            ? 'bg-brand-blue text-white rounded-br-none' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div 
                          className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                            message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.sender === 'me' && (
                            message.read 
                              ? <CheckCircle className="h-3 w-3" /> 
                              : <Clock className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      className="flex-1"
                    />
                    <Button>
                      <Send className="h-4 w-4 mr-1" /> Send
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantMessages;
