import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DESIGNATIONS = [
  'CVRP', 'CVRP(p)', 'RTWDM', 'CCVE', 'ICVE', 'CCRC', 'OT', 'Reg Psychologist', 'RRP', 'RVP', 'PH.D', 'Psych D', 'MA', 'CCPE', 'PT', 'Kin', 'CPE'
];

const Step4ProfessionalBio = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [designations, setDesignations] = useState<string[]>([]);
  const [regNumbers, setRegNumbers] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-3');
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate reg # for OT and Reg Psychologist
    let newErrors: { [key: string]: string } = {};
    designations.forEach(d => {
      if ((d === 'OT' || d === 'Reg Psychologist') && !regNumbers[d]) {
        newErrors[d] = 'Registration number required';
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // TODO: Save bio/title/designations
    navigate('/onboarding/consultant/step-5');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">4/11</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Great. Now write a bio to tell the world about yourself.</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points. You can always edit later; just make sure you proofread now.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Bio form */}
          <div className="flex-1">
            <Label htmlFor="title" className="mb-2 block">Your professional role</Label>
            <Input
              id="title"
              placeholder="Example: Accounting & Consulting"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mb-6"
            />
            <label className="mb-2 block font-medium">Professional Designations</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {DESIGNATIONS.map(des => (
                <label key={des} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={designations.includes(des)}
                    onChange={e => {
                      if (e.target.checked) setDesignations(prev => [...prev, des]);
                      else setDesignations(prev => prev.filter(d => d !== des));
                    }}
                  />
                  {des}
                  {designations.includes(des) && (
                    <>
                      <span className="ml-1">Reg#</span>
                      <Input
                        type="text"
                        value={regNumbers[des] || ''}
                        onChange={e => setRegNumbers(prev => ({ ...prev, [des]: e.target.value }))}
                        className="w-24 h-7 px-2 text-xs"
                        placeholder="Number"
                      />
                      {(des === 'OT' || des === 'Reg Psychologist') && errors[des] && (
                        <span className="text-red-500 text-xs ml-1">{errors[des]}</span>
                      )}
                    </>
                  )}
                </label>
              ))}
            </div>
            <Label htmlFor="bio" className="mb-2 block">Professional Summary</Label>
            <textarea
              id="bio"
              placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mb-2"
              maxLength={1000}
            />
            <div className="text-xs text-gray-500 text-right mb-4">At least 100 characters</div>
          </div>
          {/* Right-side preview card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-16 h-16 rounded-full mb-2" />
              <div className="font-bold text-lg mb-1">Marti G.</div>
              <div className="text-green-700 font-medium mb-1">
                {title || 'Rehabilitation Counselor'}
                {designations.length > 0 && (
                  <span>, {designations.map(des => des + (regNumbers[des] ? ` (Reg# ${regNumbers[des]})` : '')).join(', ')}</span>
                )}
              </div>
              <div className="text-gray-700 text-sm mb-2 text-center">
                {bio || 'I’m a developer experienced in building websites for small and medium-sized businesses. Whether you’re trying to win work, list your services, or create a new online store, I can help.'}
              </div>
              
              {designations.length > 0 && (
                <div className="mt-2 text-xs text-gray-700 w-full">
                  <div className="font-semibold mb-1">Designations:</div>
                  <ul className="list-disc pl-4">
                    {designations.map(des => (
                      <li key={des}>{des}{regNumbers[des] ? ` (Reg# ${regNumbers[des]})` : ''}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <span></span>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNext}>Next, add your experience</Button>
      </footer>
    </div>
  );
};

export default Step4ProfessionalBio;