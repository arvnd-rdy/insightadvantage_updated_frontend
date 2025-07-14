import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CURRENCIES = [
  { code: 'USD', label: 'USD ($)' },
  { code: 'CAD', label: 'CAD ($)' },
  { code: 'EUR', label: 'EUR (€)' },
  { code: 'GBP', label: 'GBP (£)' },
];
const MIN_WAGE = 15; // Example minimum wage for validation

const Step8PreferencesPricing = () => {
  const navigate = useNavigate();
  // Example state for preferences and pricing
  const [workType, setWorkType] = useState('');
  const [workMode, setWorkMode] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState('');
  const [pricing, setPricing] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [projectMin, setProjectMin] = useState('');
  const [projectMax, setProjectMax] = useState('');
  const [retainer, setRetainer] = useState('');
  const [currency, setCurrency] = useState(() => {
    // Try to get from localStorage or default to USD
    return localStorage.getItem('userCurrency') || 'USD';
  });
  const [paymentPrefs, setPaymentPrefs] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-7');
  const handleSkip = () => navigate('/onboarding/consultant/step-9');
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    // TODO: Save preferences/pricing
    navigate('/onboarding/consultant/step-9');
  };

  const paymentOptions = ['Bank Transfer', 'Cheque', 'Credit Card', 'PayPal'];
  const workModeOptions = ['Remote', 'In-Person', 'Hybrid'];

  const handlePaymentChange = (option: string) => {
    setPaymentPrefs((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };
  const handleWorkModeChange = (option: string) => {
    setWorkMode((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  // Validation
  const validateAll = () => {
    const newErrors: Record<string, string> = {};
    if (!workType) newErrors.workType = 'Please select a work type.';
    if (workMode.length === 0) newErrors.workMode = 'Select at least one work mode.';
    if (!workingHours) newErrors.workingHours = 'Please select working hours.';
    if (!pricing) newErrors.pricing = 'Please select a pricing structure.';
    if (pricing === 'Hourly rate') {
      if (!hourlyRate) newErrors.hourlyRate = 'Enter your hourly rate.';
      else if (isNaN(Number(hourlyRate)) || Number(hourlyRate) < MIN_WAGE) newErrors.hourlyRate = `Hourly rate must be at least $${MIN_WAGE}.`;
    }
    if (pricing === 'Per-project') {
      if (!projectMin) newErrors.projectMin = 'Enter minimum project rate.';
      else if (isNaN(Number(projectMin)) || Number(projectMin) < 0) newErrors.projectMin = 'Enter a valid minimum.';
      if (!projectMax) newErrors.projectMax = 'Enter maximum project rate.';
      else if (isNaN(Number(projectMax)) || Number(projectMax) < 0) newErrors.projectMax = 'Enter a valid maximum.';
      if (projectMin && projectMax && Number(projectMin) > Number(projectMax)) newErrors.projectMax = 'Max must be greater than or equal to min.';
    }
    if (pricing === 'Monthly retainer') {
      if (!retainer) newErrors.retainer = 'Enter your monthly retainer fee.';
      else if (isNaN(Number(retainer)) || Number(retainer) < 0) newErrors.retainer = 'Enter a valid amount.';
    }
    if (paymentPrefs.length === 0) newErrors.paymentPrefs = 'Select at least one payment method.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateAll();
  };
  const canProceed =
    workType &&
    workMode.length > 0 &&
    workingHours &&
    pricing &&
    ((pricing === 'Hourly rate' && hourlyRate && !errors.hourlyRate) ||
      (pricing === 'Per-project' && projectMin && projectMax && !errors.projectMin && !errors.projectMax) ||
      (pricing === 'Monthly retainer' && retainer && !errors.retainer)) &&
    paymentPrefs.length > 0 &&
    Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">Step 8 of 9</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Set your work preferences & pricing</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          Let us know how you prefer to work and your pricing structure. This helps us match you with the right opportunities.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Preferences & Pricing form */}
          <div className="flex-1 grid grid-cols-1 gap-6">
            <div>
              <Label className="mb-2 block">Preferred Work Type</Label>
              <div className="flex gap-2 flex-wrap">
                {['Freelance', 'Contract', 'Full-time'].map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={workType === type ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => setWorkType(type)}
                    onBlur={() => handleBlur('workType')}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              {touched.workType && errors.workType && <p className="text-red-500 text-sm mt-1">{errors.workType}</p>}
            </div>
            <div>
              <Label className="mb-2 block">Preferred Work Mode</Label>
              <div className="flex gap-2 flex-wrap">
                {workModeOptions.map((mode) => (
                  <Button
                    key={mode}
                    type="button"
                    variant={workMode.includes(mode) ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => handleWorkModeChange(mode)}
                    onBlur={() => handleBlur('workMode')}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
              <p className="text-gray-600 text-xs mt-1">Choose where and how you prefer to deliver your services.</p>
              {touched.workMode && errors.workMode && <p className="text-red-500 text-sm mt-1">{errors.workMode}</p>}
            </div>
            <div>
              <Label className="mb-2 block">Preferred Working Hours</Label>
              <div className="flex gap-2 flex-wrap">
                {['Full-time', 'Part-time', 'Flexible'].map((hours) => (
                  <Button
                    key={hours}
                    type="button"
                    variant={workingHours === hours ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => setWorkingHours(hours)}
                    onBlur={() => handleBlur('workingHours')}
                  >
                    {hours}
                  </Button>
                ))}
              </div>
              {touched.workingHours && errors.workingHours && <p className="text-red-500 text-sm mt-1">{errors.workingHours}</p>}
            </div>
            <div>
              <Label className="mb-2 block">Pricing Structure</Label>
              <div className="flex gap-2 flex-wrap mb-2">
                {['Hourly rate', 'Per-project', 'Monthly retainer'].map((p) => (
                  <Button
                    key={p}
                    type="button"
                    variant={pricing === p ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => setPricing(p)}
                    onBlur={() => handleBlur('pricing')}
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <p className="text-gray-600 text-xs mt-1">Set competitive rates that reflect your expertise.</p>
              {touched.pricing && errors.pricing && <p className="text-red-500 text-sm mt-1">{errors.pricing}</p>}
              {pricing === 'Hourly rate' && (
                <div className="mt-2 flex gap-2 items-end">
                  <div className="flex-1">
                    <Label className="mb-1 block">Hourly Rate</Label>
                    <Input
                      type="number"
                      min={MIN_WAGE}
                      placeholder={`e.g. ${MIN_WAGE}+`}
                      value={hourlyRate}
                      onChange={e => setHourlyRate(e.target.value)}
                      onBlur={() => handleBlur('hourlyRate')}
                      className={errors.hourlyRate ? 'border-red-500' : ''}
                    />
                    {touched.hourlyRate && errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                  </div>
                  <div>
                    <Label className="mb-1 block">Currency</Label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      className="border rounded-md px-2 py-2"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {pricing === 'Per-project' && (
                <div className="mt-2 flex gap-2 items-end">
                  <div className="flex-1">
                    <Label className="mb-1 block">Min Rate</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 1000"
                      value={projectMin}
                      onChange={e => setProjectMin(e.target.value)}
                      onBlur={() => handleBlur('projectMin')}
                      className={errors.projectMin ? 'border-red-500' : ''}
                    />
                    {touched.projectMin && errors.projectMin && <p className="text-red-500 text-sm mt-1">{errors.projectMin}</p>}
                  </div>
                  <div className="flex-1">
                    <Label className="mb-1 block">Max Rate</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 5000"
                      value={projectMax}
                      onChange={e => setProjectMax(e.target.value)}
                      onBlur={() => handleBlur('projectMax')}
                      className={errors.projectMax ? 'border-red-500' : ''}
                    />
                    {touched.projectMax && errors.projectMax && <p className="text-red-500 text-sm mt-1">{errors.projectMax}</p>}
                  </div>
                  <div>
                    <Label className="mb-1 block">Currency</Label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      className="border rounded-md px-2 py-2"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {pricing === 'Monthly retainer' && (
                <div className="mt-2 flex gap-2 items-end">
                  <div className="flex-1">
                    <Label className="mb-1 block">Retainer Fee</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 2000"
                      value={retainer}
                      onChange={e => setRetainer(e.target.value)}
                      onBlur={() => handleBlur('retainer')}
                      className={errors.retainer ? 'border-red-500' : ''}
                    />
                    {touched.retainer && errors.retainer && <p className="text-red-500 text-sm mt-1">{errors.retainer}</p>}
                  </div>
                  <div>
                    <Label className="mb-1 block">Currency</Label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      className="border rounded-md px-2 py-2"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Label className="mb-2 block">Payment Preferences</Label>
              <div className="flex gap-2 flex-wrap">
                {paymentOptions.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={paymentPrefs.includes(option) ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => handlePaymentChange(option)}
                    onBlur={() => handleBlur('paymentPrefs')}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <p className="text-gray-600 text-xs mt-1">We’ll use these methods to send your payouts.</p>
              {touched.paymentPrefs && errors.paymentPrefs && <p className="text-red-500 text-sm mt-1">{errors.paymentPrefs}</p>}
            </div>
          </div>
          {/* Right-side tip card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <div className="font-semibold text-sm mb-2">Pro Tip</div>
              <div className="text-gray-700 text-sm">
                Setting clear preferences and pricing helps us match you with the best opportunities and makes it easier for clients to choose you.
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <Button variant="ghost" type="button" onClick={handleSkip}>Skip for Now</Button>
        <Button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700 text-white" 
          onClick={handleNext}
          disabled={!canProceed}
        >
          Save & Next
        </Button>
      </footer>
    </div>
  );
};

export default Step8PreferencesPricing;