import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WelcomeOnboarding = () => {
  const navigate = useNavigate();
  const userName = 'Ara'; // Replace with actual user name from context/auth
  const userType = 'consultant'; // or 'organization', from context/auth

  const handleGetStarted = () => {
    if (userType === 'consultant') {
      navigate('/onboarding/consultant/step-1');
    } else {
      navigate('/onboarding/organization/step-1');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Left: Welcome Steps */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Hey {userName}. Ready for your next big opportunity?</h1>
          <ul className="mb-8 space-y-6">
            <li className="flex items-center gap-4 text-lg"><span className="inline-block"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#888" strokeWidth="2"/></svg></span>Answer a few questions and start building your profile</li>
            <li className="flex items-center gap-4 text-lg"><span className="inline-block"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#888" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="#888" strokeWidth="2"/></svg></span>Apply for open roles or list services for clients to buy</li>
            <li className="flex items-center gap-4 text-lg"><span className="inline-block"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" stroke="#888" strokeWidth="2"/><path d="M12 7v4" stroke="#888" strokeWidth="2"/></svg></span>Get paid safely and know we’re there to help</li>
          </ul>
          <div className="flex items-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg" onClick={handleGetStarted}>Get started</Button>
            <span className="text-gray-500 text-sm">It only takes 5-10 minutes and you can edit it later.<br/>We’ll save as you go.</span>
          </div>
        </div>
        {/* Right: Testimonial Card */}
        <div className="flex-1 flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Testimonial" className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-xl font-bold mb-1">Sasheen M.</h3>
          <p className="text-gray-600 mb-2">Customer Experience Consultant</p>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-pink-500 font-bold">5.0</span>
            <span className="text-gray-500">$65.00/hr</span>
            <span className="text-gray-500">14 jobs</span>
          </div>
          <blockquote className="text-gray-700 italic text-center">“Upwork has enabled me to increase my rates. I know what I'm bringing to the table and love the feeling of being able to help a variety of clients.”</blockquote>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOnboarding; 