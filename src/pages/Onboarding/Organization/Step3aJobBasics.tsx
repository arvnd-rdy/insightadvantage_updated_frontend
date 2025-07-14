import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  { value: 'hourly', label: 'Hourly' },
  { value: 'fixed', label: 'Fixed Project' },
  { value: 'retainer', label: 'Retainer' },
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

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (consultingTypes.length === 0) newErrors.consultingTypes = 'Select at least one type.';
    if (showOtherInput && !otherType.trim()) newErrors.otherType = 'Please specify your other need.';
    if (!duration) newErrors.duration = 'Select a duration.';
    if (!budgetType) newErrors.budgetType = 'Select a budget structure.';
    if (!budgetValue || isNaN(Number(budgetValue)) || Number(budgetValue) <= 0) newErrors.budgetValue = 'Enter a valid amount.';
    if (!currency) newErrors.currency = 'Select a currency.';
    if (workModes.length === 0) newErrors.workModes = 'Select at least one work mode.';
    if (!expertiseLevel) newErrors.expertiseLevel = 'Select an expertise level.';
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  // Handlers
  const handleTypeClick = (type: string) => {
    if (type === 'Other') {
      setShowOtherInput(true);
      if (!consultingTypes.includes('Other')) setConsultingTypes([...consultingTypes, 'Other']);
    } else {
      setConsultingTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    }
    setErrors(prev => ({ ...prev, consultingTypes: '' }));
  };
  const handleOtherAdd = () => {
    if (otherType.trim()) {
      setConsultingTypes(prev => prev.includes(otherType.trim()) ? prev : [...prev, otherType.trim()]);
      setOtherType('');
      setShowOtherInput(false);
      setErrors(prev => ({ ...prev, otherType: '' }));
    }
  };
  const handleWorkMode = (mode: string) => {
    setWorkModes(prev => prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]);
    setErrors(prev => ({ ...prev, workModes: '' }));
  };

  // Save & Next
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
    // Simulate API call
    try {
      // Replace with real API call
      await new Promise(res => setTimeout(res, 1000));
      navigate('/onboarding/organization/step-3b');
    } catch {
      setBanner('Couldn’t save your preferences—please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  // Skip for now
  const handleSkip = async () => {
    setSubmitting(true);
    setBanner('');
    try {
      // Replace with real draft API call
      await new Promise(res => setTimeout(res, 500));
      navigate('/onboarding/organization/step-3b');
    } catch {
      setBanner('Couldn’t save your preferences—please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  const handleBack = () => navigate('/onboarding/organization/step-2');

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
          <h1 className="text-2xl font-bold mb-2 text-center">What consulting services do you need?</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* Type of Consulting Required */}
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold">Type of Consulting Required <span className="text-red-500">*</span></Label>
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Info className="w-4 h-4" />Select all the types of evaluations or coaching you need. If you don’t see your need, choose ‘Other’.</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {CONSULTING_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-xs ${consultingTypes.includes(type) ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-700 border-gray-200'} ${type === 'Other' ? 'font-semibold' : ''}`}
                    onClick={() => handleTypeClick(type)}
                  >
                    {type === 'Other' ? '+ Other' : type}
                  </button>
                ))}
              </div>
              {showOtherInput && (
                <div className="flex gap-2 items-center mb-2">
                  <Input
                    value={otherType}
                    onChange={e => setOtherType(e.target.value)}
                    placeholder="Describe your need"
                    className="w-48"
                  />
                  <Button type="button" size="sm" onClick={handleOtherAdd} disabled={!otherType.trim()}>Add</Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => { setShowOtherInput(false); setOtherType(''); setConsultingTypes(consultingTypes.filter(t => t !== 'Other')); }}>Cancel</Button>
                </div>
              )}
              {errors.consultingTypes && <div className="text-red-500 text-xs mt-1">{errors.consultingTypes}</div>}
              {errors.otherType && <div className="text-red-500 text-xs mt-1">{errors.otherType}</div>}
            </div>
            {/* Engagement Duration */}
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold">Expected Engagement Duration <span className="text-red-500">*</span></Label>
              <div className="flex gap-4 mt-2">
                {DURATIONS.map(d => (
                  <label key={d.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      value={d.value}
                      checked={duration === d.value}
                      onChange={() => { setDuration(d.value); setErrors(prev => ({ ...prev, duration: '' })); }}
                      required
                    />
                    {d.label}
                  </label>
                ))}
              </div>
              {errors.duration && <div className="text-red-500 text-xs mt-1">{errors.duration}</div>}
            </div>
            {/* Budget Structure */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label className="text-base font-semibold">Budget Structure <span className="text-red-500">*</span></Label>
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Info className="w-4 h-4" />Set a budget that works for your project—consultants will see only your selected structure.</div>
              <div className="flex flex-col gap-2">
                {BUDGET_TYPES.map(b => (
                  <label key={b.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="budgetType"
                      value={b.value}
                      checked={budgetType === b.value}
                      onChange={() => { setBudgetType(b.value); setErrors(prev => ({ ...prev, budgetType: '' })); setBudgetValue(''); }}
                      required
                    />
                    {b.label}
                  </label>
                ))}
              </div>
              {/* Conditional Inputs */}
              {budgetType && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">$</span>
                  <Input
                    type="number"
                    min={1}
                    value={budgetValue}
                    onChange={e => setBudgetValue(e.target.value)}
                    className="w-32"
                    placeholder={budgetType === 'hourly' ? 'Hourly rate' : budgetType === 'fixed' ? 'Total fee' : 'Monthly fee'}
                  />
                  <select
                    className="border rounded px-2 py-1"
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                  >
                    {CURRENCIES.map(cur => (
                      <option key={cur} value={cur}>{cur}</option>
                    ))}
                  </select>
                  <span className="text-xs text-gray-500 ml-2">
                    {budgetType === 'hourly' && 'per hour'}
                    {budgetType === 'fixed' && 'total'}
                    {budgetType === 'retainer' && 'per month'}
                  </span>
                </div>
              )}
              {errors.budgetType && <div className="text-red-500 text-xs mt-1">{errors.budgetType}</div>}
              {errors.budgetValue && <div className="text-red-500 text-xs mt-1">{errors.budgetValue}</div>}
              {errors.currency && <div className="text-red-500 text-xs mt-1">{errors.currency}</div>}
            </div>
            {/* Work Mode Preferences */}
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold">Work Mode Preferences <span className="text-red-500">*</span></Label>
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Info className="w-4 h-4" />Choose how you’d like to engage: fully remote, on-site, or a mix.</div>
              <div className="flex gap-4 mt-2">
                {WORK_MODES.map(m => (
                  <label key={m.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="workModes"
                      value={m.value}
                      checked={workModes.includes(m.value)}
                      onChange={() => handleWorkMode(m.value)}
                    />
                    <span className="text-lg">{m.icon}</span> {m.label}
                  </label>
                ))}
              </div>
              {errors.workModes && <div className="text-red-500 text-xs mt-1">{errors.workModes}</div>}
            </div>
            {/* Expertise Level Desired */}
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold">Expertise Level Desired <span className="text-red-500">*</span></Label>
              <div className="flex gap-4 mt-2">
                {EXPERTISE_LEVELS.map(lvl => (
                  <label key={lvl.value} className="flex flex-col items-start cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="expertiseLevel"
                        value={lvl.value}
                        checked={expertiseLevel === lvl.value}
                        onChange={() => { setExpertiseLevel(lvl.value); setErrors(prev => ({ ...prev, expertiseLevel: '' })); }}
                        required
                      />
                      <span className="font-medium">{lvl.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-6">{lvl.desc}</span>
                  </label>
                ))}
              </div>
              {errors.expertiseLevel && <div className="text-red-500 text-xs mt-1">{errors.expertiseLevel}</div>}
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

export default Step3aJobBasics; 