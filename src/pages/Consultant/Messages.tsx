
import React, { useState } from 'react';
import ConsultantLayout from '@/components/ConsultantLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, Paperclip, Smile, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const conversations = [
  {
    id: '1',
    name: 'Innovatech Solutions',
    avatar: '',
    lastMessage: "Sounds great! Let's schedule a call for tomorrow.",
    timestamp: '10:45 AM',
    unread: 2,
    messages: [
      { id: '1', sender: 'them', content: "Hi Aravind, thanks for your interest in the Ergonomic Assessment project.", timestamp: '9:30 AM' },
      { id: '2', sender: 'me', content: "Hello! Thanks for reaching out. I'm very interested. Can you share more details?", timestamp: '9:32 AM' },
      { id: '3', sender: 'them', content: "We need a consultant to assess 50 workstations over 3 months. The budget is $X.", timestamp: '9:35 AM' },
      { id: '4', sender: 'me', content: "That aligns perfectly with my expertise. I can start as early as next week.", timestamp: '9:38 AM' },
      { id: '5', sender: 'them', content: "Sounds great! Let's schedule a call for tomorrow.", timestamp: '10:45 AM' },
    ]
  },
  {
    id: '2',
    name: 'HealthBridge Wellness',
    avatar: '',
    lastMessage: "We have reviewed your application and...",
    timestamp: 'Yesterday',
    unread: 0,
    messages: [
      { id: '6', sender: 'them', content: "We have reviewed your application and would like to invite you for an interview.", timestamp: 'Yesterday, 3:00 PM' },
      { id: '7', sender: 'me', content: "Thank you! I'm available on Tuesday or Wednesday.", timestamp: 'Yesterday, 3:05 PM' },
    ]
  },
  // ... more conversations
];

const ConversationList = ({ conversations, selectedId, onSelect, isMobile }) => (
    <div className={cn("h-full flex flex-col", { 'hidden md:flex': !isMobile, 'flex': isMobile } )}>
        <div className="p-4">
            <h1 className="text-2xl font-bold">Messages</h1>
            <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeholder="Search or start new chat" className="pl-10" />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto border-t">
            {conversations.map(convo => (
                <div
                    key={convo.id}
                    className={cn(
                        "flex items-center gap-3 p-3 cursor-pointer border-l-4",
                        selectedId === convo.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-transparent hover:bg-gray-50'
                    )}
                    onClick={() => onSelect(convo.id)}
                >
                    <Avatar>
                        <AvatarImage src={convo.avatar} />
                        <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold truncate">{convo.name}</p>
                            <p className="text-xs text-gray-500">{convo.timestamp}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                            {convo.unread > 0 && (
                                <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {convo.unread}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ChatWindow = ({ conversation, isMobile, onBack }) => {
    if (!conversation) return null;

    return (
        <div className={cn("h-full flex flex-col bg-white", { 'absolute inset-0 md:static': isMobile } )}>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-3 border-b">
                {isMobile && <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft /></Button>}
                <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{conversation.name}</p>
                    <p className="text-xs text-green-500">Online</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.messages.map(msg => (
                    <div key={msg.id} className={cn("flex", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                        <div className={cn(
                            "max-w-[70%] rounded-lg px-4 py-2",
                            msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                        )}>
                            <p>{msg.content}</p>
                            <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-gray-50">
                <div className="relative">
                    <Input placeholder="Type a message..." className="pr-24" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                        <Button variant="ghost" size="icon"><Smile className="h-5 w-5 text-gray-500" /></Button>
                        <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5 text-gray-500" /></Button>
                        <Button size="sm" className="ml-2">Send <Send className="h-4 w-4 ml-2" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConsultantMessages = () => {
    const [selectedConversationId, setSelectedConversationId] = useState(conversations[0].id);
    const [isMobileView, setIsMobileView] = useState(false);

    const handleSelectConversation = (id) => {
        setSelectedConversationId(id);
        setIsMobileView(true);
    }

    return (
        <ConsultantLayout>
            <div className="h-[calc(100vh-5rem)] border bg-gray-50 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <div className={cn("col-span-1 h-full border-r", { 'hidden md:block': isMobileView } )}>
                    <ConversationList 
                        conversations={conversations} 
                        selectedId={selectedConversationId} 
                        onSelect={handleSelectConversation}
                        isMobile={false}
                    />
                </div>
                <div className={cn("col-span-1 md:col-span-2 lg:col-span-3 h-full", { 'block': isMobileView, 'hidden md:block': !isMobileView } )}>
                    <ChatWindow 
                        conversation={conversations.find(c => c.id === selectedConversationId)} 
                        isMobile={isMobileView}
                        onBack={() => setIsMobileView(false)}
                    />
                </div>
            </div>
        </ConsultantLayout>
    );
};

export default ConsultantMessages;
