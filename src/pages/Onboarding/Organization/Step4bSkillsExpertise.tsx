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
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Form Content */}
      <main className="flex-1 container mx-auto py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">What skills and expertise do you need?</h1>
            <p className="text-gray-600 text-lg">Specify the required skills and experience level to help us match you with the right consultants.</p>
          </div>
          <form id="onboarding-form" onSubmit={handleSubmit} className="p-8 pt-0">
            <div className="space-y-8">
            {/* Required Skills */}
            <div>
              <Label htmlFor="requiredSkills" className="text-sm font-medium text-gray-700 mb-1">
                Required Skills <span className="text-red-500">*</span>
              </Label>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Select all the skills that are essential for your project. You can add custom skills if needed.
              </p>

              {/* Selected Skills */}
              {requiredSkills.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Skills ({requiredSkills.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {requiredSkills.map(skill => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1 pr-1 bg-blue-100 text-blue-800">
                        {skill}
                        <button
                          type="button"
                          className="ml-1 text-gray-500 hover:text-red-500"
                          onClick={() => removeSkill(skill)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Grid - Refined Tag Style */}
              <div className="mt-4 flex flex-wrap gap-2">
                {REQUIRED_SKILLS.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillClick(skill)}
                    className={`
                      px-4 py-2 rounded-full border text-sm font-medium
                      transition-colors duration-200 ease-in-out
                      ${requiredSkills.includes(skill)
                        ? 'bg-blue-600 text-white border-blue-600' // Selected state
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200' // Unselected state
                      }
                      ${skill === 'Other' ? 'font-semibold' : ''}
                    `}
                  >
                    {skill === 'Other' ? '+ Add Custom Skill' : skill}
                  </button>
                ))}
              </div>

              {/* Custom Skill Input */}
              {showOtherInput && (
                <div className="mt-4 flex gap-3 items-center">
                  <Input
                    value={otherSkill}
                    onChange={e => setOtherSkill(e.target.value)}
                    placeholder="Enter custom skill (e.g., 'Change Management')"
                    className="flex-grow"
                    maxLength={50}
                  />
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={handleOtherAdd} 
                    disabled={!otherSkill.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={() => { 
                      setShowOtherInput(false); 
                      setOtherSkill(''); 
                      setRequiredSkills(prev => prev.filter(s => s !== 'Other')); 
                    }}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {errors.requiredSkills && <p className="mt-2 text-sm text-red-600">{errors.requiredSkills}</p>}
              {errors.otherSkill && <p className="mt-2 text-sm text-red-600">{errors.otherSkill}</p>}
            </div>

            {/* Expertise Level */}
            <div>
              <Label htmlFor="expertiseLevel" className="text-sm font-medium text-gray-700 mb-1">
                Required Expertise Level <span className="text-red-500">*</span>
              </Label>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Choose the experience level that best matches your project requirements and budget.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Increased top margin */}
                {EXPERTISE_LEVELS.map(level => (
                  <label
                    key={level.value}
                    className={`
                      relative flex flex-col p-5 rounded-lg border-2 cursor-pointer
                      transition-all duration-200 ease-in-out
                      ${expertiseLevel === level.value
                        ? 'border-blue-600 bg-blue-50 shadow-md' // Selected state with subtle shadow
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm' // Unselected state with hover effects
                      }
                    `}
                  >
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
                      className="absolute top-4 right-4 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" // Positioned top-right
                    />
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-lg text-gray-900">{level.label}</span> {/* Larger label */}
                    </div>
                    <p className="text-sm text-gray-600">{level.desc}</p>
                  </label>
                ))}
              </div>

              {errors.expertiseLevel && <p className="mt-2 text-sm text-red-600">{errors.expertiseLevel}</p>}
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">Matching Tips</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                    <li>Be specific about required skills to get better matches</li>
                    <li>Consider your budget when selecting expertise level</li>
                    <li>You can always adjust requirements after posting</li>
                    <li>More specific requirements often lead to better consultant matches</li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
          </form>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 z-40 w-full bg-white border-t shadow-md">
        {footerError && <div className="text-red-500 text-center text-sm py-2">{footerError}</div>}
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

export default Step4bSkillsExpertise; 