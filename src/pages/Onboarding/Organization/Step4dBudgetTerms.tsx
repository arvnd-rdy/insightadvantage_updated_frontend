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
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Form Content */}
      <main className="flex-1 container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8 pb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Set budget and terms</h1>
            <p className="text-gray-600 text-lg">Define your budget structure and any legal requirements for the engagement.</p>
          </div>
          <form id="onboarding-form" onSubmit={handleSubmit} className="p-8 pt-0">
            <div className="space-y-8">
              {/* Budget Structure */}
              <div>
                <Label htmlFor="budgetStructure" className="text-sm font-medium text-gray-700 mb-1">
                  Budget Structure <span className="text-red-500">*</span>
                </Label>
                <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Choose how you want to structure payment for this project.
                </p>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BUDGET_STRUCTURES.map(structure => (
                    <label 
                      key={structure.value} 
                      className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors duration-200 ease-in-out ${
                        budgetStructure === structure.value
                          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                          : 'border-gray-300 bg-white hover:border-gray-400'
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
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="font-semibold text-base text-gray-900">{structure.label}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">{structure.desc}</p>
                    </label>
                  ))}
                </div>
                {errors.budgetStructure && <p className="mt-2 text-sm text-red-600">{errors.budgetStructure}</p>}
              </div>

              {/* Budget Amount */}
              {budgetStructure && budgetStructure !== 'milestone' && (
                <div>
                  <Label htmlFor="budgetAmount" className="text-sm font-medium text-gray-700 mb-1">
                    Budget Amount <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-700">{currency}</span>
                    <Input
                      id="budgetAmount"
                      type="number"
                      min="1"
                      value={budgetAmount}
                      onChange={e => { 
                        setBudgetAmount(e.target.value); 
                        setErrors(prev => ({ ...prev, budgetAmount: '' })); 
                      }}
                      className="flex-grow"
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
                  {errors.budgetAmount && <p className="mt-2 text-sm text-red-600">{errors.budgetAmount}</p>}
                </div>
              )}

              {/* Budget Range for Milestone */}
              {budgetStructure === 'milestone' && (
                <div>
                  <Label htmlFor="budgetRangeMin" className="text-sm font-medium text-gray-700 mb-1">
                    Budget Range <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-700">{currency}</span>
                    <Input
                      id="budgetRangeMin"
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
                      id="budgetRangeMax"
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
                  {errors.budgetRange && <p className="mt-2 text-sm text-red-600">{errors.budgetRange}</p>}
                </div>
              )}

              {/* Currency */}
              <div>
                <Label htmlFor="currency" className="text-sm font-medium text-gray-700 mb-1">
                  Currency
                </Label>
                <select
                  id="currency"
                  className="mt-2 block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ndaRequired" className="text-sm font-medium text-gray-700">Non-Disclosure Agreement (NDA)</Label>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Shield className="w-4 h-4" />
                      Require consultants to sign an NDA before starting work
                    </p>
                  </div>
                  <Switch
                    id="ndaRequired"
                    checked={ndaRequired}
                    onCheckedChange={setNdaRequired}
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
                  />
                </div>
                {ndaRequired && (
                  <div className="mt-4 space-y-4">
                    {ndaFile ? (
                      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <FileCheck className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm text-gray-900">{ndaFile.name}</p>
                            <p className="text-xs text-gray-500">{(ndaFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={removeNdaFile}
                          className="text-red-500 hover:bg-red-50/50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:border-gray-400 transition-colors duration-200 ease-in-out cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleNdaDrop}
                        onDragOver={e => e.preventDefault()}
                      >
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="nda-file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input id="nda-file-upload" name="nda-file-upload" type="file" className="sr-only" accept=".pdf,.doc,.docx" ref={fileInputRef} onChange={handleNdaUpload} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX files up to 5MB</p>
                        </div>
                      </div>
                    )}
                    {errors.ndaFile && <p className="mt-2 text-sm text-red-600">{errors.ndaFile}</p>}
                  </div>
                )}
              </div>

              {/* Payment Terms */}
              <div>
                <Label htmlFor="paymentTerms" className="text-sm font-medium text-gray-700 mb-1">
                  Payment Terms <span className="text-red-500">*</span>
                </Label>
                <p className="mt-1 text-sm text-gray-500">
                  Specify when and how payments will be made (e.g., "Net 30", "50% upfront, 50% on completion").
                </p>
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
                  className="mt-2"
                />
                {errors.paymentTerms && <p className="mt-2 text-sm text-red-600">{errors.paymentTerms}</p>}
              </div>

              {/* Additional Terms */}
              <div>
                <Label htmlFor="additionalTerms" className="text-sm font-medium text-gray-700 mb-1">
                  Additional Terms & Conditions
                </Label>
                <p className="mt-1 text-sm text-gray-500">
                  Any additional terms, conditions, or special requirements for this engagement.
                </p>
                <Textarea
                  id="additionalTerms"
                  placeholder="e.g., Travel expenses covered, specific reporting requirements, etc."
                  value={additionalTerms}
                  onChange={e => setAdditionalTerms(e.target.value)}
                  rows={4}
                  className="mt-2 resize-none"
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

export default Step4dBudgetTerms; 