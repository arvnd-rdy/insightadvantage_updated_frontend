import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Settings, Users, MessageSquare, Shield, FileText, Bell } from 'lucide-react';

const COMMUNICATION_PREFERENCES = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video Call' },
  { value: 'platform', label: 'Platform Messages' },
  { value: 'in-person', label: 'In-Person' }
];

const REPORTING_FREQUENCIES = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'project-end', label: 'Project End Only' },
  { value: 'custom', label: 'Custom Schedule' }
];

const Step3bDefaults = () => {
  const navigate = useNavigate();
  const [defaultBudget, setDefaultBudget] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState('CAD');
  const [defaultPaymentTerms, setDefaultPaymentTerms] = useState('');
  const [communicationPreferences, setCommunicationPreferences] = useState<string[]>([]);
  const [reportingFrequency, setReportingFrequency] = useState('');
  const [customReportingSchedule, setCustomReportingSchedule] = useState('');
  const [ndaRequired, setNdaRequired] = useState(false);
  const [ndaTemplate, setNdaTemplate] = useState('');
  const [contractTemplate, setContractTemplate] = useState('');
  const [autoApprove, setAutoApprove] = useState(false);
  const [approvalThreshold, setApprovalThreshold] = useState('');
  const [notifications, setNotifications] = useState({
    newApplications: true,
    consultantMessages: true,
    projectUpdates: true,
    paymentReminders: true,
    systemAlerts: true
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (communicationPreferences.length === 0) newErrors.communicationPreferences = 'Select at least one communication preference.';
    if (!reportingFrequency) newErrors.reportingFrequency = 'Select a reporting frequency.';
    if (reportingFrequency === 'custom' && !customReportingSchedule.trim()) newErrors.customReportingSchedule = 'Please specify the custom reporting schedule.';
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  const handleCommunicationPreference = (pref: string) => {
    setCommunicationPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
    setErrors(prev => ({ ...prev, communicationPreferences: '' }));
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
      navigate('/onboarding/organization/step-4a');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => navigate('/onboarding/organization/step-4a');
  const handleBack = () => navigate('/onboarding/organization/step-3a');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Set Your Defaults</h1>
            <p className="text-lg text-gray-600">Configure default settings for your future consulting engagements to save time.</p>
          </div>

          <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-10">
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 flex items-center gap-3"><MessageSquare className="w-6 h-6 text-blue-600" /> Communication</h2>
              <div>
                <Label className="text-base font-medium text-gray-700">Preferred Communication Methods <span className="text-red-500">*</span></Label>
                <p className="mt-1 text-sm text-gray-500">Select all preferred methods for consultant interactions.</p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {COMMUNICATION_PREFERENCES.map(pref => (
                    <Label key={pref.value} htmlFor={`comm-${pref.value}`} className="flex items-center p-3 rounded-md border has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                      <Checkbox id={`comm-${pref.value}`} checked={communicationPreferences.includes(pref.value)} onCheckedChange={() => handleCommunicationPreference(pref.value)} className="mr-3" />
                      {pref.label}
                    </Label>
                  ))}
                </div>
                {errors.communicationPreferences && <p className="mt-2 text-sm text-red-600">{errors.communicationPreferences}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 flex items-center gap-3"><FileText className="w-6 h-6 text-blue-600" /> Reporting & Documentation</h2>
              <div>
                <Label className="text-base font-medium text-gray-700">Default Reporting Frequency <span className="text-red-500">*</span></Label>
                <p className="mt-1 text-sm text-gray-500">How often should consultants typically provide updates?</p>
                <RadioGroup value={reportingFrequency} onValueChange={(value) => { setReportingFrequency(value); setErrors(prev => ({ ...prev, reportingFrequency: '' })); }} className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {REPORTING_FREQUENCIES.map(freq => (
                    <Label key={freq.value} htmlFor={`freq-${freq.value}`} className="flex items-center p-3 rounded-md border has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                      <RadioGroupItem value={freq.value} id={`freq-${freq.value}`} className="mr-3" />
                      {freq.label}
                    </Label>
                  ))}
                </RadioGroup>
                {errors.reportingFrequency && <p className="mt-2 text-sm text-red-600">{errors.reportingFrequency}</p>}
              </div>
              {reportingFrequency === 'custom' && (
                <div>
                  <Label htmlFor="customReportingSchedule" className="text-base font-medium text-gray-700">Custom Reporting Schedule <span className="text-red-500">*</span></Label>
                  <Textarea id="customReportingSchedule" value={customReportingSchedule} onChange={e => { setCustomReportingSchedule(e.target.value); setErrors(prev => ({ ...prev, customReportingSchedule: '' })); }} placeholder="e.g., Every 2 weeks on Monday, Monthly on the 15th, etc." rows={2} required className="mt-2" />
                  {errors.customReportingSchedule && <p className="mt-2 text-sm text-red-600">{errors.customReportingSchedule}</p>}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 flex items-center gap-3"><Shield className="w-6 h-6 text-blue-600" /> Legal & Compliance</h2>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-white">
                <div>
                  <Label htmlFor="ndaRequired" className="text-base font-medium text-gray-700">Require NDA by Default</Label>
                  <p className="text-sm text-gray-500">Automatically require a Non-Disclosure Agreement for all new projects.</p>
                </div>
                <Switch id="ndaRequired" checked={ndaRequired} onCheckedChange={setNdaRequired} />
              </div>
              {ndaRequired && (
                <div>
                  <Label htmlFor="ndaTemplate" className="text-base font-medium text-gray-700">Default NDA Template/Terms</Label>
                  <Textarea id="ndaTemplate" value={ndaTemplate} onChange={e => { setNdaTemplate(e.target.value); setErrors(prev => ({ ...prev, ndaTemplate: '' })); }} placeholder="Enter your standard NDA terms or paste the template here..." rows={4} className="mt-2" />
                  {errors.ndaTemplate && <p className="mt-2 text-sm text-red-600">{errors.ndaTemplate}</p>}
                </div>
              )}
              <div>
                <Label htmlFor="contractTemplate" className="text-base font-medium text-gray-700">Default Contract Template</Label>
                <p className="mt-1 text-sm text-gray-500">Provide standard contract terms to be used for new projects.</p>
                <Textarea id="contractTemplate" value={contractTemplate} onChange={e => setContractTemplate(e.target.value)} placeholder="Enter your standard contract terms or paste the template here..." rows={4} className="mt-2" />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 flex items-center gap-3"><Bell className="w-6 h-6 text-blue-600" /> Notifications</h2>
              <p className="text-sm text-gray-600">Choose which email notifications you want to receive.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={`notification-${key}`} className="font-medium text-gray-700 cursor-pointer">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                    <Switch id={`notification-${key}`} checked={value} onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [key]: checked }))} />
                  </div>
                ))}
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

export default Step3bDefaults; 