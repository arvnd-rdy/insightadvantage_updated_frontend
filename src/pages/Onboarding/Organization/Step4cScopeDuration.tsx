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
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Form Content */}
      <main className="flex-1 container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8 pb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Define project scope and timeline</h1>
            <p className="text-gray-600 text-lg">Set the parameters for your engagement to help consultants understand the commitment required.</p>
          </div>
          <form id="onboarding-form" onSubmit={handleSubmit} className="p-8 pt-0">
            <div className="space-y-8">
            {/* Engagement Type */}
            <div>
              <Label htmlFor="engagementType" className="text-sm font-medium text-gray-700 mb-1">
                Engagement Type <span className="text-red-500">*</span>
              </Label>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Choose how you want to engage with consultants for this project.
              </p>

              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {ENGAGEMENT_TYPES.map(type => (
                  <label 
                    key={type.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors duration-200 ease-in-out ${
                      engagementType === type.value
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                        : 'border-gray-300 bg-white hover:border-gray-400'
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="font-semibold text-base text-gray-900">{type.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{type.desc}</p>
                  </label>
                ))}
              </div>

              {errors.engagementType && <p className="mt-2 text-sm text-red-600">{errors.engagementType}</p>}
            </div>

            {/* Work Mode */}
            <div>
              <Label htmlFor="workMode" className="text-sm font-medium text-gray-700 mb-1">
                Work Mode <span className="text-red-500">*</span>
              </Label>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Specify how you prefer the consultant to work with your team.
              </p>

              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {WORK_MODES.map(mode => (
                  <label 
                    key={mode.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors duration-200 ease-in-out ${
                      workMode === mode.value
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                        : 'border-gray-300 bg-white hover:border-gray-400'
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-2xl">{mode.icon}</span>
                      <span className="font-semibold text-base text-gray-900">{mode.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{mode.desc}</p>
                  </label>
                ))}
              </div>

              {errors.workMode && <p className="mt-2 text-sm text-red-600">{errors.workMode}</p>}
            </div>

            {/* Project Scope */}
            <div>
              <Label htmlFor="projectScope" className="text-sm font-medium text-gray-700 mb-1">
                Project Scope <span className="text-red-500">*</span>
              </Label>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Estimate the size and complexity of your project.
              </p>

              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECT_SCOPES.map(scope => (
                  <label 
                    key={scope.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors duration-200 ease-in-out ${
                      projectScope === scope.value
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                        : 'border-gray-300 bg-white hover:border-gray-400'
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="font-semibold text-base text-gray-900">{scope.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{scope.desc}</p>
                  </label>
                ))}
              </div>

              {errors.projectScope && <p className="mt-2 text-sm text-red-600">{errors.projectScope}</p>}
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
                  Project Start Date <span className="text-red-500">*</span>
                </Label>
                <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  When do you want the project to begin?
                </p>
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
                  className="mt-2"
                />
                {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>}
              </div>

              <div>
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
                  Project End Date
                </Label>
                <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  When do you expect the project to be completed?
                </p>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={e => { 
                    setEndDate(e.target.value); 
                    setErrors(prev => ({ ...prev, endDate: '' })); 
                  }}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  className="mt-2"
                />
                {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>}
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <Label htmlFor="applicationDeadline" className="text-sm font-medium text-gray-700 mb-1">
                Application Deadline <span className="text-red-500">*</span>
              </Label>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                When should consultants submit their applications?
              </p>
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
                className="mt-2"
              />
              {errors.applicationDeadline && <p className="mt-2 text-sm text-red-600">{errors.applicationDeadline}</p>}
            </div>

            {/* Location (conditional) */}
            {workMode === 'onsite' && (
              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">
                  Work Location <span className="text-red-500">*</span>
                </Label>
                <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Where will the consultant need to work?
                </p>
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
                  className="mt-2"
                />
                {errors.location && <p className="mt-2 text-sm text-red-600">{errors.location}</p>}
              </div>
            )}

            {/* Team Size */}
            <div>
              <Label htmlFor="teamSize" className="text-sm font-medium text-gray-700 mb-1">
                Team Size
              </Label>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <Users className="w-4 h-4" />
                How many people will the consultant be working with?
              </p>
              <Input
                id="teamSize"
                type="text"
                placeholder="e.g., 5-10 people, Department of 25, etc."
                value={teamSize}
                onChange={e => setTeamSize(e.target.value)}
                className="mt-2"
              />
            </div>
            </div>
          </form>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 z-40 w-full bg-white border-t shadow-lg">
        {footerError && <div className="text-red-500 text-center text-sm mb-2">{footerError}</div>}
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button variant="outline" type="button" onClick={handleBack} className="text-gray-600 border-gray-300 hover:bg-gray-50">
            Back
          </Button>
          <div className="flex space-x-4">
            <Button type="button" variant="ghost" onClick={handleSkip} disabled={submitting} className="text-gray-600 hover:bg-gray-50">
              Skip for Now
            </Button>
            <Button
              type="submit"
              className={isValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
              disabled={!isValid || submitting}
              form="onboarding-form"
            >
              Save & Next
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Step4cScopeDuration; 