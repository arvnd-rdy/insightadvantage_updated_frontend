import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Info, Settings, Users, MessageSquare, Calendar, Shield, FileText } from 'lucide-react';

const COMMUNICATION_PREFERENCES = [
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'phone', label: 'Phone', icon: '📞' },
  { value: 'video', label: 'Video Call', icon: '📹' },
  { value: 'platform', label: 'Platform Messages', icon: '💬' },
  { value: 'in-person', label: 'In-Person', icon: '🤝' }
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
  const [defaultTerms, setDefaultTerms] = useState('');
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

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!defaultBudget || isNaN(Number(defaultBudget)) || Number(defaultBudget) <= 0) {
      newErrors.defaultBudget = 'Enter a valid default budget amount.';
    }
    
    if (!defaultPaymentTerms.trim()) {
      newErrors.defaultPaymentTerms = 'Default payment terms are required.';
    }
    
    if (communicationPreferences.length === 0) {
      newErrors.communicationPreferences = 'Select at least one communication preference.';
    }
    
    if (!reportingFrequency) {
      newErrors.reportingFrequency = 'Select a reporting frequency.';
    }
    
    if (reportingFrequency === 'custom' && !customReportingSchedule.trim()) {
      newErrors.customReportingSchedule = 'Please specify the custom reporting schedule.';
    }
    
    if (ndaRequired && !ndaTemplate.trim()) {
      newErrors.ndaTemplate = 'Please provide an NDA template or terms.';
    }
    
    if (autoApprove && (!approvalThreshold || isNaN(Number(approvalThreshold)) || Number(approvalThreshold) <= 0)) {
      newErrors.approvalThreshold = 'Enter a valid approval threshold amount.';
    }
    
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  // Handlers
  const handleCommunicationPreference = (pref: string) => {
    setCommunicationPreferences(prev => 
      prev.includes(pref) 
        ? prev.filter(p => p !== pref) 
        : [...prev, pref]
    );
    setErrors(prev => ({ ...prev, communicationPreferences: '' }));
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
      navigate('/onboarding/organization/step-4a');
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
      navigate('/onboarding/organization/step-4a');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-3a');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b flex items-center h-16 px-6">
        <div className="flex-1 flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-3" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-gray-500 text-sm font-medium">Step 4 of 7 <span className="ml-2">●●●●<span className="text-gray-300">○○○</span></span></div>
        </div>
        <div className="flex-1"></div>
      </header>

      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow p-10 mt-8 mb-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Set your service defaults</h1>
          <p className="text-gray-500 text-center mb-8">Configure default settings that will apply to all your future consulting engagements.</p>

          <div className="space-y-8">
            {/* Financial Defaults */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Financial Defaults</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="defaultBudget" className="text-base font-semibold">
                    Default Budget <span className="text-red-500">*</span>
                  </Label>
                  <div className="text-xs text-gray-500 mb-2">Default budget amount for new projects</div>
                  <div className="flex items-center gap-2">
                    <select
                      className="border rounded px-2 py-1"
                      value={defaultCurrency}
                      onChange={e => setDefaultCurrency(e.target.value)}
                    >
                      <option value="CAD">CAD</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <Input
                      id="defaultBudget"
                      type="number"
                      min="1"
                      value={defaultBudget}
                      onChange={e => { 
                        setDefaultBudget(e.target.value); 
                        setErrors(prev => ({ ...prev, defaultBudget: '' })); 
                      }}
                      placeholder="5000"
                      required
                    />
                  </div>
                  {errors.defaultBudget && <div className="text-red-500 text-xs mt-1">{errors.defaultBudget}</div>}
                </div>

                <div>
                  <Label htmlFor="defaultPaymentTerms" className="text-base font-semibold">
                    Default Payment Terms <span className="text-red-500">*</span>
                  </Label>
                  <div className="text-xs text-gray-500 mb-2">Standard payment terms for all projects</div>
                  <Input
                    id="defaultPaymentTerms"
                    type="text"
                    value={defaultPaymentTerms}
                    onChange={e => { 
                      setDefaultPaymentTerms(e.target.value); 
                      setErrors(prev => ({ ...prev, defaultPaymentTerms: '' })); 
                    }}
                    placeholder="Net 30 days"
                    required
                  />
                  {errors.defaultPaymentTerms && <div className="text-red-500 text-xs mt-1">{errors.defaultPaymentTerms}</div>}
                </div>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Communication Preferences</h2>
              </div>
              
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Select your preferred communication methods for consultant interactions
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {COMMUNICATION_PREFERENCES.map(pref => (
                  <label 
                    key={pref.value} 
                    className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      communicationPreferences.includes(pref.value)
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={pref.value}
                      checked={communicationPreferences.includes(pref.value)}
                      onChange={() => handleCommunicationPreference(pref.value)}
                      className="sr-only"
                    />
                    <span className="text-2xl mb-1">{pref.icon}</span>
                    <span className="text-sm font-medium text-center">{pref.label}</span>
                  </label>
                ))}
              </div>

              {errors.communicationPreferences && <div className="text-red-500 text-xs mt-2">{errors.communicationPreferences}</div>}
            </div>

            {/* Reporting & Documentation */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Reporting & Documentation</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">
                    Default Reporting Frequency <span className="text-red-500">*</span>
                  </Label>
                  <div className="text-xs text-gray-500 mb-2">How often should consultants provide updates?</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {REPORTING_FREQUENCIES.map(freq => (
                      <label 
                        key={freq.value} 
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          reportingFrequency === freq.value
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reportingFrequency"
                          value={freq.value}
                          checked={reportingFrequency === freq.value}
                          onChange={() => { 
                            setReportingFrequency(freq.value); 
                            setErrors(prev => ({ ...prev, reportingFrequency: '' })); 
                          }}
                          required
                          className="text-green-600 mr-2"
                        />
                        <span className="text-sm font-medium">{freq.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.reportingFrequency && <div className="text-red-500 text-xs mt-1">{errors.reportingFrequency}</div>}
                </div>

                {reportingFrequency === 'custom' && (
                  <div>
                    <Label htmlFor="customReportingSchedule" className="text-base font-semibold">
                      Custom Reporting Schedule <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="customReportingSchedule"
                      value={customReportingSchedule}
                      onChange={e => { 
                        setCustomReportingSchedule(e.target.value); 
                        setErrors(prev => ({ ...prev, customReportingSchedule: '' })); 
                      }}
                      placeholder="e.g., Every 2 weeks on Monday, Monthly on the 15th, etc."
                      rows={3}
                      required
                    />
                    {errors.customReportingSchedule && <div className="text-red-500 text-xs mt-1">{errors.customReportingSchedule}</div>}
                  </div>
                )}
              </div>
            </div>

            {/* Legal & Compliance */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Legal & Compliance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Require NDA by Default</Label>
                    <div className="text-xs text-gray-500">Automatically require NDA for all projects</div>
                  </div>
                  <Switch
                    checked={ndaRequired}
                    onCheckedChange={setNdaRequired}
                  />
                </div>

                {ndaRequired && (
                  <div>
                    <Label htmlFor="ndaTemplate" className="text-base font-semibold">
                      NDA Template/Terms <span className="text-red-500">*</span>
                    </Label>
                    <div className="text-xs text-gray-500 mb-2">Standard NDA terms or template to use</div>
                    <Textarea
                      id="ndaTemplate"
                      value={ndaTemplate}
                      onChange={e => { 
                        setNdaTemplate(e.target.value); 
                        setErrors(prev => ({ ...prev, ndaTemplate: '' })); 
                      }}
                      placeholder="Enter your standard NDA terms or template..."
                      rows={4}
                      required
                    />
                    {errors.ndaTemplate && <div className="text-red-500 text-xs mt-1">{errors.ndaTemplate}</div>}
                  </div>
                )}

                <div>
                  <Label htmlFor="contractTemplate" className="text-base font-semibold">
                    Contract Template
                  </Label>
                  <div className="text-xs text-gray-500 mb-2">Standard contract terms for projects</div>
                  <Textarea
                    id="contractTemplate"
                    value={contractTemplate}
                    onChange={e => setContractTemplate(e.target.value)}
                    placeholder="Enter your standard contract terms..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Approval & Notifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Approval & Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Auto-approve Projects</Label>
                    <div className="text-xs text-gray-500">Automatically approve projects under a certain amount</div>
                  </div>
                  <Switch
                    checked={autoApprove}
                    onCheckedChange={setAutoApprove}
                  />
                </div>

                {autoApprove && (
                  <div>
                    <Label htmlFor="approvalThreshold" className="text-base font-semibold">
                      Approval Threshold <span className="text-red-500">*</span>
                    </Label>
                    <div className="text-xs text-gray-500 mb-2">Maximum amount for auto-approval</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium">{defaultCurrency}</span>
                      <Input
                        id="approvalThreshold"
                        type="number"
                        min="1"
                        value={approvalThreshold}
                        onChange={e => { 
                          setApprovalThreshold(e.target.value); 
                          setErrors(prev => ({ ...prev, approvalThreshold: '' })); 
                        }}
                        placeholder="1000"
                        required
                      />
                    </div>
                    {errors.approvalThreshold && <div className="text-red-500 text-xs mt-1">{errors.approvalThreshold}</div>}
                  </div>
                )}

                <div>
                  <Label className="text-base font-semibold">Notification Preferences</Label>
                  <div className="text-xs text-gray-500 mb-3">Choose what notifications you want to receive</div>
                  <div className="space-y-2">
                    {Object.entries(notifications).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2">
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                        <span className="text-sm">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </label>
                    ))}
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

export default Step3bDefaults; 