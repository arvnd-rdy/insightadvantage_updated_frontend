import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

const REQUIRED_SKILLS = [
  'Transferable Skills Analysis', 'Vocational Evaluation', 'Psycho Vocational Evaluation', 'Labour Market Survey',
  'Case Management', 'Job Development', 'Job Placement', 'Career Counselling', 'Return to Work Planning',
  'Disability Management', 'Functional Capacity Evaluation', 'Ergonomic Assessment', 'Medical-Legal Assessment',
  'Expert Testimony', 'Workplace Accommodation', 'Rehabilitation Planning', 'Life Care Planning', 'Coaching',
  'Workers Compensation', 'Insurance Claims', 'Legal Support', 'Medical Documentation', 'Assessment Tools',
  'Report Writing', 'Client Communication', 'Project Management', 'Data Analysis', 'Research Methods'
];

const EXPERTISE_LEVELS = [
  { value: 'entry', label: 'Entry Level', desc: '1-3 years experience, suitable for basic tasks and support roles.' },
  { value: 'intermediate', label: 'Intermediate', desc: '3-7 years experience, can handle most standard projects independently.' },
  { value: 'senior', label: 'Senior Level', desc: '7+ years experience, expert-level skills for complex or high-stakes projects.' },
  { value: 'expert', label: 'Expert/Specialist', desc: '10+ years experience, recognized authority in specific areas.' }
];

const Step4bSkillsExpertise = () => {
  const navigate = useNavigate();
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [otherSkill, setOtherSkill] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [expertiseLevel, setExpertiseLevel] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (requiredSkills.length === 0) {
      newErrors.requiredSkills = 'Select at least one required skill.';
    }
    if (showOtherInput && !otherSkill.trim()) {
      newErrors.otherSkill = 'Please specify the additional skill.';
    }
    if (!expertiseLevel) {
      newErrors.expertiseLevel = 'Select an expertise level.';
    }
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  // Handlers
  const handleSkillClick = (skill: string) => {
    if (skill === 'Other') {
      setShowOtherInput(true);
      if (!requiredSkills.includes('Other')) {
        setRequiredSkills([...requiredSkills, 'Other']);
      }
    } else {
      setRequiredSkills(prev => 
        prev.includes(skill) 
          ? prev.filter(s => s !== skill) 
          : [...prev, skill]
      );
    }
    setErrors(prev => ({ ...prev, requiredSkills: '' }));
  };

  const handleOtherAdd = () => {
    if (otherSkill.trim()) {
      setRequiredSkills(prev => 
        prev.includes(otherSkill.trim()) 
          ? prev 
          : [...prev, otherSkill.trim()]
      );
      setOtherSkill('');
      setShowOtherInput(false);
      setErrors(prev => ({ ...prev, otherSkill: '' }));
    }
  };

  const removeSkill = (skill: string) => {
    setRequiredSkills(prev => prev.filter(s => s !== skill));
    if (skill === 'Other') {
      setShowOtherInput(false);
      setOtherSkill('');
    }
  };

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
      navigate('/onboarding/organization/step-4c');
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
      navigate('/onboarding/organization/step-4c');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-4a');

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
          <h1 className="text-2xl font-bold mb-2 text-center">What skills and expertise do you need?</h1>
          <p className="text-gray-500 text-center mb-8">Specify the required skills and experience level to help us match you with the right consultants.</p>

          <div className="space-y-8">
            {/* Required Skills */}
            <div>
              <Label className="text-base font-semibold">
                Required Skills <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Select all the skills that are essential for your project. You can add custom skills if needed.
              </div>

              {/* Selected Skills */}
              {requiredSkills.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Selected Skills ({requiredSkills.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {requiredSkills.map(skill => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          type="button"
                          className="ml-1 text-gray-500 hover:text-red-500"
                          onClick={() => removeSkill(skill)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {REQUIRED_SKILLS.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className={`px-3 py-2 rounded-lg border text-sm text-left transition-colors ${
                      requiredSkills.includes(skill)
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    } ${skill === 'Other' ? 'font-semibold' : ''}`}
                    onClick={() => handleSkillClick(skill)}
                  >
                    {skill === 'Other' ? '+ Add Custom Skill' : skill}
                  </button>
                ))}
              </div>

              {/* Custom Skill Input */}
              {showOtherInput && (
                <div className="flex gap-2 items-center mb-4">
                  <Input
                    value={otherSkill}
                    onChange={e => setOtherSkill(e.target.value)}
                    placeholder="Enter custom skill"
                    className="flex-1"
                    maxLength={50}
                  />
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={handleOtherAdd} 
                    disabled={!otherSkill.trim()}
                  >
                    Add
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => { 
                      setShowOtherInput(false); 
                      setOtherSkill(''); 
                      setRequiredSkills(prev => prev.filter(s => s !== 'Other')); 
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {errors.requiredSkills && <div className="text-red-500 text-xs mt-1">{errors.requiredSkills}</div>}
              {errors.otherSkill && <div className="text-red-500 text-xs mt-1">{errors.otherSkill}</div>}
            </div>

            {/* Expertise Level */}
            <div>
              <Label className="text-base font-semibold">
                Required Expertise Level <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Choose the experience level that best matches your project requirements and budget.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPERTISE_LEVELS.map(level => (
                  <label 
                    key={level.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      expertiseLevel === level.value
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        name="expertiseLevel"
                        value={level.value}
                        checked={expertiseLevel === level.value}
                        onChange={() => { 
                          setExpertiseLevel(level.value); 
                          setErrors(prev => ({ ...prev, expertiseLevel: '' })); 
                        }}
                        required
                        className="text-green-600"
                      />
                      <span className="font-semibold text-base">{level.label}</span>
                    </div>
                    <span className="text-sm text-gray-600 ml-6">{level.desc}</span>
                  </label>
                ))}
              </div>

              {errors.expertiseLevel && <div className="text-red-500 text-xs mt-2">{errors.expertiseLevel}</div>}
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-900 mb-1">Matching Tips</div>
                  <div className="text-sm text-blue-800">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Be specific about required skills to get better matches</li>
                      <li>Consider your budget when selecting expertise level</li>
                      <li>You can always adjust requirements after posting</li>
                      <li>More specific requirements often lead to better consultant matches</li>
                    </ul>
                  </div>
                </div>
              </div>
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

export default Step4bSkillsExpertise; 