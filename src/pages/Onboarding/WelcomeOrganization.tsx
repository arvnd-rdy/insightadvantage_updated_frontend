import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WelcomeOrganization = () => {
  const navigate = useNavigate();
  const orgName = 'Acme Corp'; // Replace with actual org name from context/auth

  const handleGetStarted = () => {
    navigate('/onboarding/organization/step-1');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Left: Welcome Steps */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Welcome, {orgName}! Ready to find top consulting talent?</h1>
          <ul className="mb-8 space-y-6">
            <li className="flex items-center gap-4 text-lg"><span className="inline-block"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#888" strokeWidth="2"/></svg></span>Tell us about your organization and project needs</li>
            <li className="flex items-center gap-4 text-lg"><span className="inline-block"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#888" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="#888" strokeWidth="2"/></svg></span>Get matched with vetted consultants or post a job</li>
            <li className="flex items-center gap-4 text-lg"><span className="inline-block"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" stroke="#888" strokeWidth="2"/><path d="M12 7v4" stroke="#888" strokeWidth="2"/></svg></span>Manage projects and payments securely in one place</li>
          </ul>
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg" onClick={handleGetStarted}>Get started</Button>
            <span className="text-gray-500 text-sm">It only takes a few minutes to get set up.<br/>You can edit your info later and we’ll save as you go.</span>
          </div>
        </div>
        {/* Right: Testimonial Card */}
        <div className="flex-1 flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Testimonial" className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-xl font-bold mb-1">Michael T.</h3>
          <p className="text-gray-600 mb-2">Director of Operations, TechNova</p>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-blue-500 font-bold">5.0</span>
            <span className="text-gray-500">$200k+ spent</span>
            <span className="text-gray-500">8 projects</span>
          </div>
          <blockquote className="text-gray-700 italic text-center">“Insight Advantage made it easy to find the right experts for our projects. The process was seamless and the results exceeded our expectations.”</blockquote>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOrganization; 