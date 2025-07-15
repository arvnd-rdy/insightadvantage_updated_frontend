
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';

import DashboardCard from '@/components/DashboardCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, File, Bell, Calendar, Mail, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import ConsultantTopNav from '@/components/ConsultantTopNav';
import ConsultantLayout from '@/components/ConsultantLayout';

const ConsultantDashboard = () => {
  // Mock consultant data
  const consultantData = {
    name: "Alex Johnson",
    profileCompletion: 75,
    documentsToUpload: ["Professional Insurance", "Certifications"],
    upcomingActions: [
      { title: "Complete profile", completed: false, link: "/consultant/profile" },
      { title: "Upload required documents", completed: false, link: "/consultant/documents" },
      { title: "Set availability schedule", completed: true, link: "/consultant/availability" },
    ],
    messages: [
      { 
        id: "1", 
        sender: "Sarah Miller", 
        company: "Tech Solutions Inc.", 
        preview: "We're interested in your expertise for our upcoming project...", 
        time: "2 hours ago",
        read: false
      },
      { 
        id: "2", 
        sender: "David Wilson", 
        company: "Global Finance", 
        preview: "Following up on our discussion about the consulting opportunity...", 
        time: "Yesterday",
        read: true
      },
    ],
  };

  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    // Show modal if onboarding just completed
    if (localStorage.getItem('onboardingComplete') === 'true') {
      setShowCongrats(true);
      localStorage.removeItem('onboardingComplete');
    }
  }, []);

  const handleCloseCongrats = () => setShowCongrats(false);

  return (
    <ConsultantLayout>
      {/* Congratulatory modal */}
      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="max-w-md w-full p-0">
          <DialogHeader className="p-8 pb-0">
            <DialogTitle className="text-2xl mb-4 text-center">Congratulations!</DialogTitle>
          </DialogHeader>
          <div className="p-8 pt-4 flex flex-col items-center justify-center">
            <span className="mb-4">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" stroke="#fff" /></svg>
            </span>
            <div className="text-green-700 font-semibold text-lg mb-2 text-center">Your profile is now complete and verified.</div>
            <div className="text-gray-600 text-center mb-6">Welcome to Insight Advantage! You can now explore jobs, connect with organizations, and make the most of your new account.</div>
            <DialogFooter className="w-full flex justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={handleCloseCongrats}>Get Started</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {consultantData.name}!</h1>
          <p className="text-gray-600">
            Here's a quick overview of your profile and recent activity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Completion Card */}
          <DashboardCard
            title="Profile Completion"
            description="Increase your visibility by completing your profile."
            icon={<BarChart2 size={20} />}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{consultantData.profileCompletion}% Complete</span>
                <span className="text-muted-foreground">{100 - consultantData.profileCompletion}% to go</span>
              </div>
              <Progress value={consultantData.profileCompletion} className="h-2" />
              <Link to="/consultant/profile">
                <Button className="w-full mt-4">Complete Profile</Button>
              </Link>
            </div>
          </DashboardCard>

          {/* Documents Needed Card */}
          <DashboardCard
            title="Documents Needed"
            description="Upload required documents to verify your profile."
            icon={<File size={20} />}
          >
            <div className="space-y-3">
              {consultantData.documentsToUpload.length > 0 ? (
                consultantData.documentsToUpload.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{doc}</span>
                    <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
                      Required
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">All required documents uploaded!</p>
              )}
              <Link to="/consultant/documents">
                <Button variant="link" className="p-0 h-auto text-sm">
                  Upload Documents
                </Button>
              </Link>
            </div>
          </DashboardCard>

          {/* Quick Actions Card */}
          <DashboardCard
            title="Quick Actions"
            description="Jump to common tasks."
            icon={<Clock size={20} />}
          >
            <div className="grid grid-cols-2 gap-3">
              <Link to="/consultant/my-jobs">
                <Button variant="outline" className="w-full">Find Jobs</Button>
              </Link>
              <Link to="/consultant/profile">
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </Link>
              <Link to="/consultant/messages">
                <Button variant="outline" className="w-full">View Messages</Button>
              </Link>
              <Link to="/consultant/availability">
                <Button variant="outline" className="w-full">Set Availability</Button>
              </Link>
            </div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Next Steps Card */}
          <DashboardCard
            title="Next Steps"
            description="Important actions to get you started."
            icon={<Bell size={20} />}
          >
            <div className="space-y-3">
              {consultantData.upcomingActions.map((action, index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex-shrink-0 p-1 rounded-full mr-3 ${
                    action.completed ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {action.completed ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-brand-blue" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {action.title}
                      {action.completed && (
                        <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                          Complete
                        </Badge>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Recent Messages Card */}
          <DashboardCard
            title="Recent Messages"
            description="Your latest communications."
            icon={<Mail size={20} />}
          >
            <div className="space-y-3">
              {consultantData.messages.length > 0 ? (
                consultantData.messages.slice(0, 2).map((message) => ( // Show only top 2 messages
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-2 h-2 rounded-full ${message.read ? 'bg-gray-300' : 'bg-brand-blue'}`}></div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        {message.sender} <span className="font-normal text-gray-500">({message.company})</span>
                      </p>
                      <p className="text-gray-500 truncate">{message.preview}</p>
                      <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No new messages.</p>
              )}
              <Link to="/consultant/messages">
                <Button variant="link" className="p-0 h-auto text-sm">
                  View All Messages
                </Button>
              </Link>
            </div>
          </DashboardCard>
        </div>
      </main>
    </ConsultantLayout>
  );
};

export default ConsultantDashboard;
