import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Upload, FileText, X, DollarSign, Shield, FileCheck } from 'lucide-react';

const BUDGET_STRUCTURES = [
  { value: 'hourly', label: 'Hourly Rate', desc: 'Pay per hour of work completed' },
  { value: 'fixed', label: 'Fixed Project Fee', desc: 'Set price for the entire project' },
  { value: 'retainer', label: 'Monthly Retainer', desc: 'Regular monthly payment for ongoing support' },
  { value: 'milestone', label: 'Milestone-based', desc: 'Payment tied to project milestones' }
];

const CURRENCIES = ['CAD', 'USD', 'EUR', 'GBP'];

const Step4dBudgetTerms = () => {
  const navigate = useNavigate();
  const [budgetStructure, setBudgetStructure] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [currency, setCurrency] = useState('CAD');
  const [budgetRange, setBudgetRange] = useState({ min: '', max: '' });
  const [ndaRequired, setNdaRequired] = useState(false);
  const [ndaFile, setNdaFile] = useState<File | null>(null);
  const [ndaFilePreview, setNdaFilePreview] = useState<string | null>(null);
  const [paymentTerms, setPaymentTerms] = useState('');
  const [additionalTerms, setAdditionalTerms] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!budgetStructure) {
      newErrors.budgetStructure = 'Select a budget structure.';
    }
    
    if (budgetStructure === 'hourly' || budgetStructure === 'fixed' || budgetStructure === 'retainer') {
      if (!budgetAmount || isNaN(Number(budgetAmount)) || Number(budgetAmount) <= 0) {
        newErrors.budgetAmount = 'Enter a valid budget amount.';
      }
    }
    
    if (budgetStructure === 'milestone') {
      if (!budgetRange.min || !budgetRange.max || 
          isNaN(Number(budgetRange.min)) || isNaN(Number(budgetRange.max)) ||
          Number(budgetRange.min) <= 0 || Number(budgetRange.max) <= 0 ||
          Number(budgetRange.min) >= Number(budgetRange.max)) {
        newErrors.budgetRange = 'Enter valid minimum and maximum budget amounts.';
      }
    }
    
    if (ndaRequired && !ndaFile) {
      newErrors.ndaFile = 'Please upload an NDA document.';
    }
    
    if (!paymentTerms.trim()) {
      newErrors.paymentTerms = 'Payment terms are required.';
    }
    
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  // NDA file handling
  const handleNdaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && file.size <= 5 * 1024 * 1024) {
      setNdaFile(file);
      setNdaFilePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, ndaFile: '' }));
    } else if (file) {
      setErrors(prev => ({ ...prev, ndaFile: 'Only PDF, DOC, DOCX files ≤5MB allowed.' }));
    }
  };

  const handleNdaDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && file.size <= 5 * 1024 * 1024) {
      setNdaFile(file);
      setNdaFilePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, ndaFile: '' }));
    } else if (file) {
      setErrors(prev => ({ ...prev, ndaFile: 'Only PDF, DOC, DOCX files ≤5MB allowed.' }));
    }
  };

  const removeNdaFile = () => {
    setNdaFile(null);
    setNdaFilePreview(null);
    if (ndaFilePreview) {
      URL.revokeObjectURL(ndaFilePreview);
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
      navigate('/onboarding/organization/step-4');
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
      navigate('/onboarding/organization/step-5');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-4c');

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
          <h1 className="text-2xl font-bold mb-2 text-center">Set budget and terms</h1>
          <p className="text-gray-500 text-center mb-8">Define your budget structure and any legal requirements for the engagement.</p>

          <div className="space-y-8">
            {/* Budget Structure */}
            <div>
              <Label className="text-base font-semibold">
                Budget Structure <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Choose how you want to structure payment for this project.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BUDGET_STRUCTURES.map(structure => (
                  <label 
                    key={structure.value} 
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      budgetStructure === structure.value
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        name="budgetStructure"
                        value={structure.value}
                        checked={budgetStructure === structure.value}
                        onChange={() => { 
                          setBudgetStructure(structure.value); 
                          setErrors(prev => ({ ...prev, budgetStructure: '', budgetAmount: '', budgetRange: '' })); 
                        }}
                        required
                        className="text-green-600"
                      />
                      <span className="font-semibold text-base">{structure.label}</span>
                    </div>
                    <span className="text-sm text-gray-600 ml-6">{structure.desc}</span>
                  </label>
                ))}
              </div>

              {errors.budgetStructure && <div className="text-red-500 text-xs mt-2">{errors.budgetStructure}</div>}
            </div>

            {/* Budget Amount */}
            {budgetStructure && budgetStructure !== 'milestone' && (
              <div>
                <Label className="text-base font-semibold">
                  Budget Amount <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium">{currency}</span>
                  <Input
                    type="number"
                    min="1"
                    value={budgetAmount}
                    onChange={e => { 
                      setBudgetAmount(e.target.value); 
                      setErrors(prev => ({ ...prev, budgetAmount: '' })); 
                    }}
                    className="w-48"
                    placeholder={
                      budgetStructure === 'hourly' ? 'Hourly rate' :
                      budgetStructure === 'fixed' ? 'Total project fee' :
                      budgetStructure === 'retainer' ? 'Monthly retainer amount' : ''
                    }
                  />
                  <span className="text-sm text-gray-500">
                    {budgetStructure === 'hourly' && 'per hour'}
                    {budgetStructure === 'fixed' && 'total'}
                    {budgetStructure === 'retainer' && 'per month'}
                  </span>
                </div>
                {errors.budgetAmount && <div className="text-red-500 text-xs mt-1">{errors.budgetAmount}</div>}
              </div>
            )}

            {/* Budget Range for Milestone */}
            {budgetStructure === 'milestone' && (
              <div>
                <Label className="text-base font-semibold">
                  Budget Range <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium">{currency}</span>
                  <Input
                    type="number"
                    min="1"
                    value={budgetRange.min}
                    onChange={e => { 
                      setBudgetRange(prev => ({ ...prev, min: e.target.value })); 
                      setErrors(prev => ({ ...prev, budgetRange: '' })); 
                    }}
                    className="w-32"
                    placeholder="Min"
                  />
                  <span className="text-sm text-gray-500">to</span>
                  <Input
                    type="number"
                    min="1"
                    value={budgetRange.max}
                    onChange={e => { 
                      setBudgetRange(prev => ({ ...prev, max: e.target.value })); 
                      setErrors(prev => ({ ...prev, budgetRange: '' })); 
                    }}
                    className="w-32"
                    placeholder="Max"
                  />
                  <span className="text-sm text-gray-500">total</span>
                </div>
                {errors.budgetRange && <div className="text-red-500 text-xs mt-1">{errors.budgetRange}</div>}
              </div>
            )}

            {/* Currency */}
            <div>
              <Label htmlFor="currency" className="text-base font-semibold">
                Currency
              </Label>
              <select
                id="currency"
                className="w-32 border rounded px-3 py-2"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                {CURRENCIES.map(cur => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>

            {/* NDA Requirement */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label className="text-base font-semibold">
                    Non-Disclosure Agreement (NDA)
                  </Label>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Require consultants to sign an NDA before starting work
                  </div>
                </div>
                <Switch
                  checked={ndaRequired}
                  onCheckedChange={setNdaRequired}
                />
              </div>

              {ndaRequired && (
                <div className="space-y-4">
                  {ndaFile ? (
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-sm">{ndaFile.name}</div>
                          <div className="text-xs text-gray-500">{(ndaFile.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={removeNdaFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleNdaDrop}
                      onDragOver={e => e.preventDefault()}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <div className="text-gray-600 font-medium mb-1">Upload NDA Document</div>
                      <div className="text-xs text-gray-400">PDF, DOC, DOCX files up to 5MB</div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleNdaUpload}
                      />
                    </div>
                  )}
                  {errors.ndaFile && <div className="text-red-500 text-xs">{errors.ndaFile}</div>}
                </div>
              )}
            </div>

            {/* Payment Terms */}
            <div>
              <Label htmlFor="paymentTerms" className="text-base font-semibold">
                Payment Terms <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-2">
                Specify when and how payments will be made (e.g., "Net 30", "50% upfront, 50% on completion").
              </div>
              <Input
                id="paymentTerms"
                type="text"
                placeholder="e.g., Net 30 days, 50% upfront and 50% upon completion"
                value={paymentTerms}
                onChange={e => { 
                  setPaymentTerms(e.target.value); 
                  setErrors(prev => ({ ...prev, paymentTerms: '' })); 
                }}
                required
              />
              {errors.paymentTerms && <div className="text-red-500 text-xs mt-1">{errors.paymentTerms}</div>}
            </div>

            {/* Additional Terms */}
            <div>
              <Label htmlFor="additionalTerms" className="text-base font-semibold">
                Additional Terms & Conditions
              </Label>
              <div className="text-xs text-gray-500 mb-2">
                Any additional terms, conditions, or special requirements for this engagement.
              </div>
              <Textarea
                id="additionalTerms"
                placeholder="e.g., Travel expenses covered, specific reporting requirements, etc."
                value={additionalTerms}
                onChange={e => setAdditionalTerms(e.target.value)}
                rows={4}
                className="resize-none"
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

export default Step4dBudgetTerms; 