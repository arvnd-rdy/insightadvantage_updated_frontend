import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SPECIALIZED_SKILLS = [
  'Transferable Skills Analysis (TSA)',
  'Vocational Evaluation (VE)',
  'Psycho Vocational Evaluation (PVoc)',
  'Psycho Educational Evaluation (PEd)',
  'Neuro Psych Evaluation (NPVoc)',
  'Cognitive Job Coaching',
  'Physical Job Coaching',
  'Functional Evaluation',
  'Cognitive Functional Evaluation',
  'Ergonomic Assessment',
  'Worksite Analysis',
  'Progressive Goal Attainment',
  'Reactivation Services',
  'Home Assessment',
  'Cognitive Behaviour Therapy',
  'Case Management',
  'Job Search Training',
  'Job Placement Services',
];

const SERVICE_CATEGORIES = [
  'Assessment & Evaluation',
  'Coaching & Training',
  'Placement & Reactivation',
  'Case Management & Support',
];

const Step5SkillsServices = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillsInput, setSkillsInput] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [servicesInput, setServicesInput] = useState('');
  const [otherService, setOtherService] = useState('');
  const [errors, setErrors] = useState<{ skills?: string; services?: string }>({});

  // Tag picker logic for skills
  const filteredSkills = SPECIALIZED_SKILLS.filter(
    s => s.toLowerCase().includes(skillsInput.toLowerCase()) && !skills.includes(s)
  );
  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setSkillsInput('');
    }
  };
  const handleRemoveSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  // Tag picker logic for services
  const filteredServices = SERVICE_CATEGORIES.filter(
    s => s.toLowerCase().includes(servicesInput.toLowerCase()) && !services.includes(s)
  );
  const handleAddService = (service: string) => {
    if (service && !services.includes(service)) {
      setServices(prev => [...prev, service]);
      setServicesInput('');
    }
  };
  const handleRemoveService = (service: string) => {
    setServices(prev => prev.filter(s => s !== service));
  };

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-4');
  const handleSkip = () => navigate('/onboarding/consultant/step-6');
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { skills?: string; services?: string } = {};
    if (skills.length === 0) newErrors.skills = 'Select at least one specialized skill.';
    if (services.length === 0) newErrors.services = 'Select at least one service offering.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // TODO: Save skills/services data
    navigate('/onboarding/consultant/step-6');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">Step 5 of 9</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Select your specialized skills and services</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          Choose the areas where you have demonstrable expertise. These drive your match recommendations.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Skills selection */}
          <div className="flex-1">
            <Label htmlFor="skills-input" className="mb-2 block">Select Your Specialized Skills</Label>
            <div className="text-xs text-gray-500 mb-2">Choose the areas where you have demonstrable expertise. These drive your match recommendations.</div>
            <Input
              id="skills-input"
              placeholder="Type to filter..."
              value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && filteredSkills.length > 0) { e.preventDefault(); handleAddSkill(filteredSkills[0]); } }}
              className="mb-2"
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map(skill => (
                <span key={skill} className="bg-green-100 text-green-800 rounded-full px-3 py-1 flex items-center text-sm">
                  {skill}
                  <button type="button" className="ml-2 text-green-700 hover:text-green-900" onClick={() => handleRemoveSkill(skill)}>&times;</button>
                </span>
              ))}
            </div>
            {filteredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {filteredSkills.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:bg-green-50 transition"
                    onClick={() => handleAddSkill(skill)}
                    disabled={skills.includes(skill)}
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            )}
            {errors.skills && <div className="text-red-500 text-xs mb-2">{errors.skills}</div>}
            <Label htmlFor="services-input" className="mb-2 block mt-6">Available Services</Label>
            <div className="text-xs text-gray-500 mb-2">Select the service offerings you provide. Clients can filter by these when searching.</div>
            <Input
              id="services-input"
              placeholder="Type to filter..."
              value={servicesInput}
              onChange={e => setServicesInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && filteredServices.length > 0) { e.preventDefault(); handleAddService(filteredServices[0]); } }}
              className="mb-2"
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {services.map(service => (
                <span key={service} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center text-sm">
                  {service}
                  <button type="button" className="ml-2 text-blue-700 hover:text-blue-900" onClick={() => handleRemoveService(service)}>&times;</button>
                </span>
              ))}
            </div>
            {filteredServices.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {filteredServices.map(service => (
                  <button
                    key={service}
                    type="button"
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:bg-blue-50 transition"
                    onClick={() => handleAddService(service)}
                    disabled={services.includes(service)}
                  >
                    + {service}
                  </button>
                ))}
              </div>
            )}
            {errors.services && <div className="text-red-500 text-xs mb-2">{errors.services}</div>}
            <Label htmlFor="other-service" className="mb-2 block mt-6">Other Services</Label>
            <div className="text-xs text-gray-500 mb-2">Tell us about any niche offerings not covered above.</div>
            <Input
              id="other-service"
              placeholder="Describe other services (optional)"
              value={otherService}
              onChange={e => setOtherService(e.target.value)}
              className="mb-2"
            />
          </div>
          {/* Right-side tip card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Pro Tip" className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-sm">Upwork Pro Tip</span>
              </div>
              <div className="text-gray-700 text-sm">
                “Your selected skills and services drive your match recommendations and help clients find you. Choose carefully!”
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <Button variant="ghost" type="button" onClick={handleSkip}>Skip for now</Button>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNext} disabled={skills.length === 0 || services.length === 0}>Save & Next</Button>
      </footer>
    </div>
  );
};

export default Step5SkillsServices; 