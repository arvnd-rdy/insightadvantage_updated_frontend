import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info, Calendar, Clock, Users, MapPin } from 'lucide-react';

const ENGAGEMENT_TYPES = [
  { value: 'project', label: 'Project-based', desc: 'Specific project with defined scope and deliverables' },
  { value: 'ongoing', label: 'Ongoing Support', desc: 'Continuous support and consultation services' },
  { value: 'retainer', label: 'Retainer', desc: 'Regular availability for consultation and support' },
  { value: 'consultation', label: 'One-time Consultation', desc: 'Single consultation or assessment session' }
];

const WORK_MODES = [
  { value: 'remote', label: 'Remote Only', icon: '🌐', desc: 'All work done remotely via video calls and online tools' },
  { value: 'onsite', label: 'On-site Only', icon: '🏢', desc: 'All work done at your location' },
  { value: 'hybrid', label: 'Hybrid', icon: '↔️', desc: 'Combination of remote and on-site work' },
  { value: 'flexible', label: 'Flexible', icon: '🎯', desc: 'Open to consultant\'s preferred work mode' }
];

const PROJECT_SCOPES = [
  { value: 'small', label: 'Small Scope', desc: '1-2 weeks, simple tasks or assessments' },
  { value: 'medium', label: 'Medium Scope', desc: '2-8 weeks, standard projects with clear deliverables' },
  { value: 'large', label: 'Large Scope', desc: '2-6 months, complex projects requiring extensive work' },
  { value: 'enterprise', label: 'Enterprise', desc: '6+ months, major initiatives or ongoing programs' }
];

const Step4cScopeDuration = () => {
  const navigate = useNavigate();
  const [engagementType, setEngagementType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!engagementType) {
      newErrors.engagementType = 'Select an engagement type.';
    }
    
    if (!workMode) {
      newErrors.workMode = 'Select a work mode.';
    }
    
    if (!projectScope) {
      newErrors.projectScope = 'Select a project scope.';
    }
    
    if (!startDate) {
      newErrors.startDate = 'Select a start date.';
    }
    
    if (endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = 'End date must be after start date.';
    }
    
    if (!applicationDeadline) {
      newErrors.applicationDeadline = 'Select an application deadline.';
    }
    
    if (new Date(applicationDeadline) <= new Date()) {
      newErrors.applicationDeadline = 'Application deadline must be in the future.';
    }
    
    if (workMode === 'onsite' && !location.trim()) {
      newErrors.location = 'Location is required for on-site work.';
    }
    
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  // Navigation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFooterError('');
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setFooterError('Please fill all required fields correctly to continue.');
      return;
    }
    setSubmitting(true);
    setBanner('');
    try {
      await new Promise(res => setTimeout(res, 1000));
      navigate('/onboarding/organization/step-4d');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setSubmitting(true);
    setBanner('');
    try {
      await new Promise(res => setTimeout(res, 500));
      navigate('/onboarding/organization/step-4d');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-4b');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b flex items-center h-16 px-6">
        <div className="flex-1 flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-3" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-gray-500 text-sm font-medium">Step 3 of 7 <span className="ml-2">●●●<span className="text-gray-300">○○○○</span></span></div>
        </div>
        <div className="flex-1"></div>
      </header>

      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow p-10 mt-8 mb-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Define project scope and timeline</h1>
          <p className="text-gray-500 text-center mb-8">Set the parameters for your engagement to help consultants understand the commitment required.</p>

          <div className="space-y-8">
            {/* Engagement Type */}
            <div>
              <Label className="text-base font-semibold">
                Engagement Type <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Choose how you want to engage with consultants for this project.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ENGAGEMENT_TYPES.map(type => (
                  <label 
                    key={type.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      engagementType === type.value
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        name="engagementType"
                        value={type.value}
                        checked={engagementType === type.value}
                        onChange={() => { 
                          setEngagementType(type.value); 
                          setErrors(prev => ({ ...prev, engagementType: '' })); 
                        }}
                        required
                        className="text-green-600"
                      />
                      <span className="font-semibold text-base">{type.label}</span>
                    </div>
                    <span className="text-sm text-gray-600 ml-6">{type.desc}</span>
                  </label>
                ))}
              </div>

              {errors.engagementType && <div className="text-red-500 text-xs mt-2">{errors.engagementType}</div>}
            </div>

            {/* Work Mode */}
            <div>
              <Label className="text-base font-semibold">
                Work Mode <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Specify how you prefer the consultant to work with your team.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WORK_MODES.map(mode => (
                  <label 
                    key={mode.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      workMode === mode.value
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        name="workMode"
                        value={mode.value}
                        checked={workMode === mode.value}
                        onChange={() => { 
                          setWorkMode(mode.value); 
                          setErrors(prev => ({ ...prev, workMode: '' })); 
                        }}
                        required
                        className="text-green-600"
                      />
                      <span className="text-2xl">{mode.icon}</span>
                      <span className="font-semibold text-base">{mode.label}</span>
                    </div>
                    <span className="text-sm text-gray-600 ml-6">{mode.desc}</span>
                  </label>
                ))}
              </div>

              {errors.workMode && <div className="text-red-500 text-xs mt-2">{errors.workMode}</div>}
            </div>

            {/* Project Scope */}
            <div>
              <Label className="text-base font-semibold">
                Project Scope <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Estimate the size and complexity of your project.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECT_SCOPES.map(scope => (
                  <label 
                    key={scope.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      projectScope === scope.value
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        name="projectScope"
                        value={scope.value}
                        checked={projectScope === scope.value}
                        onChange={() => { 
                          setProjectScope(scope.value); 
                          setErrors(prev => ({ ...prev, projectScope: '' })); 
                        }}
                        required
                        className="text-green-600"
                      />
                      <span className="font-semibold text-base">{scope.label}</span>
                    </div>
                    <span className="text-sm text-gray-600 ml-6">{scope.desc}</span>
                  </label>
                ))}
              </div>

              {errors.projectScope && <div className="text-red-500 text-xs mt-2">{errors.projectScope}</div>}
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startDate" className="text-base font-semibold">
                  Project Start Date <span className="text-red-500">*</span>
                </Label>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  When do you want the project to begin?
                </div>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={e => { 
                    setStartDate(e.target.value); 
                    setErrors(prev => ({ ...prev, startDate: '' })); 
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                {errors.startDate && <div className="text-red-500 text-xs mt-1">{errors.startDate}</div>}
              </div>

              <div>
                <Label htmlFor="endDate" className="text-base font-semibold">
                  Project End Date
                </Label>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  When do you expect the project to be completed?
                </div>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={e => { 
                    setEndDate(e.target.value); 
                    setErrors(prev => ({ ...prev, endDate: '' })); 
                  }}
                  min={startDate || new Date().toISOString().split('T')[0]}
                />
                {errors.endDate && <div className="text-red-500 text-xs mt-1">{errors.endDate}</div>}
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <Label htmlFor="applicationDeadline" className="text-base font-semibold">
                Application Deadline <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                When should consultants submit their applications?
              </div>
              <Input
                id="applicationDeadline"
                type="date"
                value={applicationDeadline}
                onChange={e => { 
                  setApplicationDeadline(e.target.value); 
                  setErrors(prev => ({ ...prev, applicationDeadline: '' })); 
                }}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              {errors.applicationDeadline && <div className="text-red-500 text-xs mt-1">{errors.applicationDeadline}</div>}
            </div>

            {/* Location (conditional) */}
            {workMode === 'onsite' && (
              <div>
                <Label htmlFor="location" className="text-base font-semibold">
                  Work Location <span className="text-red-500">*</span>
                </Label>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Where will the consultant need to work?
                </div>
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Toronto, ON or Remote with occasional travel to Toronto"
                  value={location}
                  onChange={e => { 
                    setLocation(e.target.value); 
                    setErrors(prev => ({ ...prev, location: '' })); 
                  }}
                  required
                />
                {errors.location && <div className="text-red-500 text-xs mt-1">{errors.location}</div>}
              </div>
            )}

            {/* Team Size */}
            <div>
              <Label htmlFor="teamSize" className="text-base font-semibold">
                Team Size
              </Label>
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <Users className="w-4 h-4" />
                How many people will the consultant be working with?
              </div>
              <Input
                id="teamSize"
                type="text"
                placeholder="e.g., 5-10 people, Department of 25, etc."
                value={teamSize}
                onChange={e => setTeamSize(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex flex-col z-20 shadow">
        {footerError && <div className="text-red-500 text-center text-sm mb-2">{footerError}</div>}
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
          <Button type="button" variant="ghost" onClick={handleSkip} disabled={submitting}>Skip for Now</Button>
          <Button
            type="submit"
            className={isValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            disabled={!isValid || submitting}
          >
            Save & Next
          </Button>
      </div>
      </footer>
    </div>
  );
};

export default Step4cScopeDuration; 