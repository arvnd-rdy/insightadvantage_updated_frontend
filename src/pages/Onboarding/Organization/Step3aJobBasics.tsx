import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from 'lucide-react';

const CONSULTING_TYPES = [
  'Transferable Skills Analysis', 'Vocational Evaluation', 'Psycho Vocational Evaluation', 'Labour Market Survey',
  'Case Management', 'Job Development', 'Job Placement', 'Career Counselling', 'Return to Work Planning',
  'Disability Management', 'Functional Capacity Evaluation', 'Ergonomic Assessment', 'Medical-Legal Assessment',
  'Expert Testimony', 'Workplace Accommodation', 'Rehabilitation Planning', 'Life Care Planning', 'Coaching', 'Other'
];
const CURRENCIES = ['CAD', 'USD', 'EUR', 'GBP'];
const DURATIONS = [
  { value: 'short', label: 'Short-term (< 3 mo)' },
  { value: 'medium', label: 'Medium (3–6 mo)' },
  { value: 'long', label: 'Long (> 6 mo)' },
];
const BUDGET_TYPES = [
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'fixed', label: 'Fixed Project Fee' },
  { value: 'retainer', label: 'Monthly Retainer' },
];
const WORK_MODES = [
  { value: 'remote', label: 'Remote', icon: '🌐' },
  { value: 'on-site', label: 'On-site', icon: '🏢' },
  { value: 'hybrid', label: 'Hybrid', icon: '↔️' },
];
const EXPERTISE_LEVELS = [
  { value: 'entry', label: 'Entry', desc: 'Suitable for basic tasks or support.' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Solid experience, can handle most needs.' },
  { value: 'advanced', label: 'Advanced', desc: 'Expert-level, for complex or high-stakes projects.' },
];

const Step3aJobBasics = () => {
  const navigate = useNavigate();
  const [consultingTypes, setConsultingTypes] = useState<string[]>([]);
  const [otherType, setOtherType] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [duration, setDuration] = useState('');
  const [budgetType, setBudgetType] = useState('');
  const [budgetValue, setBudgetValue] = useState('');
  const [currency, setCurrency] = useState('CAD');
  const [workModes, setWorkModes] = useState<string[]>([]);
  const [expertiseLevel, setExpertiseLevel] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (consultingTypes.length === 0) newErrors.consultingTypes = 'Select at least one type of consulting service.';
    if (showOtherInput && !otherType.trim()) newErrors.otherType = 'Please specify the other service type.';
    if (!duration) newErrors.duration = 'Please select an expected engagement duration.';
    if (!budgetType) newErrors.budgetType = 'Please select a budget structure.';
    if (!budgetValue || isNaN(Number(budgetValue)) || Number(budgetValue) <= 0) newErrors.budgetValue = 'Please enter a valid budget amount.';
    if (workModes.length === 0) newErrors.workModes = 'Select at least one preferred work mode.';
    if (!expertiseLevel) newErrors.expertiseLevel = 'Please select the desired expertise level.';
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  const handleTypeClick = (type: string) => {
    if (type === 'Other') {
      setShowOtherInput(true);
      if (!consultingTypes.includes('Other')) {
        setConsultingTypes(prev => [...prev, 'Other']);
      }
    } else {
      setConsultingTypes(prev =>
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
    }
    setErrors(prev => ({ ...prev, consultingTypes: '' }));
  };

  const handleOtherAdd = () => {
    if (otherType.trim()) {
      setConsultingTypes(prev => [...prev.filter(t => t !== 'Other'), otherType.trim(), 'Other']);
      setOtherType('');
      setShowOtherInput(false);
    }
  };

  const handleWorkMode = (mode: string) => {
    setWorkModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
    setErrors(prev => ({ ...prev, workModes: '' }));
  };

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
      navigate('/onboarding/organization/step-3b');
    } catch {
      setBanner('Couldn’t save your preferences—please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => navigate('/onboarding/organization/step-3b');
  const handleBack = () => navigate('/onboarding/organization/step-2');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Consulting Service Basics</h1>
            <p className="text-lg text-gray-600">Tell us about the types of consultants you're looking for.</p>
          </div>

          <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-10">
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Service Details</h2>
              <div>
                <Label className="text-base font-medium text-gray-700">Type of Consulting Required <span className="text-red-500">*</span></Label>
                <p className="mt-1 text-sm text-gray-500">Select all that apply. If you don’t see your need, choose ‘Other’.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {CONSULTING_TYPES.map(type => (
                    <button key={type} type="button" onClick={() => handleTypeClick(type)} className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${consultingTypes.includes(type) ? 'bg-blue-100 text-blue-700 border-blue-300 ring-2 ring-blue-200' : 'bg-white hover:bg-gray-100 border-gray-300'}`}>
                      {type}
                    </button>
                  ))}
                </div>
                {showOtherInput && (
                  <div className="mt-4 flex gap-2">
                    <Input value={otherType} onChange={e => setOtherType(e.target.value)} placeholder="Describe your specific need..." className="flex-grow" />
                    <Button type="button" onClick={handleOtherAdd} disabled={!otherType.trim()}>Add</Button>
                  </div>
                )}
                {errors.consultingTypes && <p className="mt-2 text-sm text-red-600">{errors.consultingTypes}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Engagement & Budget</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-base font-medium text-gray-700">Expected Engagement Duration <span className="text-red-500">*</span></Label>
                  <RadioGroup value={duration} onValueChange={(value) => { setDuration(value); setErrors(prev => ({ ...prev, duration: '' })); }} className="mt-3 space-y-2">
                    {DURATIONS.map(d => (
                      <Label key={d.value} htmlFor={`duration-${d.value}`} className="flex items-center p-3 rounded-md border has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                        <RadioGroupItem value={d.value} id={`duration-${d.value}`} className="mr-3" />
                        {d.label}
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.duration && <p className="mt-2 text-sm text-red-600">{errors.duration}</p>}
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700">Budget Structure <span className="text-red-500">*</span></Label>
                  <RadioGroup value={budgetType} onValueChange={(value) => { setBudgetType(value); setErrors(prev => ({ ...prev, budgetType: '' })); }} className="mt-3 space-y-2">
                    {BUDGET_TYPES.map(b => (
                      <Label key={b.value} htmlFor={`budget-${b.value}`} className="flex items-center p-3 rounded-md border has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                        <RadioGroupItem value={b.value} id={`budget-${b.value}`} className="mr-3" />
                        {b.label}
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.budgetType && <p className="mt-2 text-sm text-red-600">{errors.budgetType}</p>}
                </div>
              </div>
              {budgetType && (
                <div>
                  <Label htmlFor="budgetValue" className="text-base font-medium text-gray-700">Budget Amount <span className="text-red-500">*</span></Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map(cur => (<SelectItem key={cur} value={cur}>{cur}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Input id="budgetValue" type="number" min="1" value={budgetValue} onChange={e => setBudgetValue(e.target.value)} className="flex-1" placeholder="e.g., 5000" />
                  </div>
                  {errors.budgetValue && <p className="mt-2 text-sm text-red-600">{errors.budgetValue}</p>}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Work Environment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-base font-medium text-gray-700">Work Mode Preferences <span className="text-red-500">*</span></Label>
                  <p className="mt-1 text-sm text-gray-500">Choose how you’d like to engage.</p>
                  <div className="mt-3 space-y-2">
                    {WORK_MODES.map(m => (
                      <Label key={m.value} htmlFor={`work-${m.value}`} className="flex items-center p-3 rounded-md border has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                        <Checkbox id={`work-${m.value}`} checked={workModes.includes(m.value)} onCheckedChange={() => handleWorkMode(m.value)} className="mr-3" />
                        <span className="mr-2 text-lg">{m.icon}</span> {m.label}
                      </Label>
                    ))}
                  </div>
                  {errors.workModes && <p className="mt-2 text-sm text-red-600">{errors.workModes}</p>}
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700">Desired Expertise Level <span className="text-red-500">*</span></Label>
                  <p className="mt-1 text-sm text-gray-500">Select the required experience level.</p>
                  <RadioGroup value={expertiseLevel} onValueChange={(value) => { setExpertiseLevel(value); setErrors(prev => ({ ...prev, expertiseLevel: '' })); }} className="mt-3 space-y-2">
                    {EXPERTISE_LEVELS.map(lvl => (
                      <Label key={lvl.value} htmlFor={`level-${lvl.value}`} className="flex flex-col p-3 rounded-md border has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                        <div className="flex items-center">
                          <RadioGroupItem value={lvl.value} id={`level-${lvl.value}`} className="mr-3" />
                          <span className="font-medium text-gray-900">{lvl.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-7">{lvl.desc}</p>
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.expertiseLevel && <p className="mt-2 text-sm text-red-600">{errors.expertiseLevel}</p>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 w-full bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            </div>
            <div className="text-center">
              {footerError && <p className="text-sm font-medium text-red-600">{footerError}</p>}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleSkip} disabled={submitting}>
                Skip for Now
              </Button>
              <Button
                type="submit"
                form="onboarding-form"
                disabled={!isValid || submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {submitting ? 'Saving...' : 'Save & Next'}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Step3aJobBasics; 