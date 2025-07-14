import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const VOCATIONAL_SKILLS = [
  'Vocational Evaluation',
  'Psycho Vocational Evaluation',
  'Transferable Skills Analysis',
  'Labour Market Survey',
  'Case Management',
  'Job Development',
  'Job Placement',
  'Career Counselling',
  'Return to Work Planning',
  'Disability Management',
  'Functional Capacity Evaluation',
  'Ergonomic Assessment',
  'Medical-Legal Assessment',
  'Expert Testimony',
  'Workplace Accommodation',
  'Rehabilitation Planning',
  'Life Care Planning',
  'Coaching',
];
const COUNTRY_OPTIONS = [
  { code: 'CA', name: 'Canada' },
  { code: 'US', name: 'United States' },
];
const TIMEZONE_OPTIONS = [
  'America/Toronto', 'America/Vancouver', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'UTC'
];

const Step1BasicInfo = () => {
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [otherServiceArea, setOtherServiceArea] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [timezone, setTimezone] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState('');
  const [footerError, setFooterError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation helpers
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!orgName.trim() || orgName.length < 1 || orgName.length > 100) newErrors.orgName = 'Organization name is required (1-100 chars).';
    if (!companySize) newErrors.companySize = 'Company size is required.';
    if (serviceAreas.length < 1) newErrors.serviceAreas = 'Select at least one service area.';
    if (website && !/^https?:\/\/.+\..+/.test(website)) newErrors.website = 'Enter a valid URL.';
    if (!country) newErrors.country = 'Country is required.';
    if (!state) newErrors.state = 'State/Province is required.';
    if (!city) newErrors.city = 'City is required.';
    if (!street) newErrors.street = 'Street address is required.';
    if (!zip) newErrors.zip = 'ZIP/Postal code is required.';
    if (!timezone) newErrors.timezone = 'Time zone is required.';
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  // Logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 5 * 1024 * 1024) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, logo: '' }));
    } else if (file) {
      setErrors(prev => ({ ...prev, logo: 'Only JPG/PNG files ≤5MB allowed.' }));
    }
  };
  const handleLogoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 5 * 1024 * 1024) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, logo: '' }));
    } else if (file) {
      setErrors(prev => ({ ...prev, logo: 'Only JPG/PNG files ≤5MB allowed.' }));
    }
  };

  // Multi-select for industry
  // Remove the old handleIndustryChange function and all references to setIndustry

  // Form submit
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
      navigate('/onboarding/organization/step-2');
    } catch {
      setBanner('There was a problem saving. Please try again.');
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
      navigate('/onboarding/organization/step-2');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm flex items-center h-20 px-8">
        <div className="flex-1 flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-10 w-10 mr-4" />
          <span className="text-xl font-bold tracking-tight text-gray-800">Organization Onboarding</span>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">Step 1</span>
            <span className="text-gray-400">/ 7</span>
            <span className="ml-4 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-gray-200 inline-block" />
              ))}
            </span>
          </div>
        </div>
        <div className="flex-1" />
      </header>
      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}
      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-2 md:px-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-0 md:p-0 mt-10 mb-10 overflow-hidden">
          <div className="px-8 pt-10 pb-2">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Tell us about your organization</h1>
            <p className="text-gray-500 text-center mb-10 text-base">This information helps us personalize your experience and connect you with the right consultants.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 px-8 pb-10">
            {/* Left: Logo, Industry, Website */}
            <div className="flex flex-col gap-8">
              {/* Logo Upload */}
              <div>
                <Label className="text-base font-semibold mb-1">Organization Logo</Label>
                <div
                  className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 min-h-[140px] transition"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleLogoDrop}
                  onDragOver={e => e.preventDefault()}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="h-20 w-20 object-contain mb-2 rounded-lg shadow" />
                  ) : (
                    <span className="text-gray-400 text-sm">Click or drop a JPG/PNG logo <span className="font-medium">(≤5MB)</span></span>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">Max 5MB. PNG or JPG only.</div>
                {errors.logo && <div className="text-red-500 text-xs mt-1">{errors.logo}</div>}
              </div>
              {/* Primary Service Areas */}
              <div>
                <Label className="text-base font-semibold mb-1">
                  Primary Service Areas <span className="text-red-500">*</span>
                </Label>
                {/* Chips for selected */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {serviceAreas.map(area => (
                    <span key={area} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs flex items-center">
                      {area}
                      <button type="button" className="ml-1 text-gray-500 hover:text-red-500" onClick={() => setServiceAreas(prev => prev.filter(a => a !== area))} aria-label={`Remove ${area}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {/* Dropdown trigger */}
                <div className="relative mb-2">
                  <button
                    type="button"
                    className="w-full border rounded px-3 py-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
                    onClick={() => setServiceDropdownOpen(v => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={serviceDropdownOpen}
                  >
                    {serviceAreas.length === 0 ? 'Select service areas…' : 'Add more service areas'}
                  </button>
                  {serviceDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow-lg max-h-64 overflow-y-auto" role="listbox">
                      {VOCATIONAL_SKILLS.filter(skill => !serviceAreas.includes(skill)).map(skill => (
                        <label key={skill} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => setServiceAreas(prev => [...prev, skill])}
                            className="mr-2"
                          />
                          {skill}
                        </label>
                      ))}
                      {/* Free-text Other */}
                      <div className="flex items-center px-3 py-2 border-t">
                        <input
                          type="text"
                          className="flex-1 border rounded px-2 py-1 text-xs"
                          placeholder="Other…"
                          value={otherServiceArea}
                          onChange={e => setOtherServiceArea(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && otherServiceArea.trim()) {
                              setServiceAreas(prev => prev.includes(otherServiceArea.trim()) ? prev : [...prev, otherServiceArea.trim()]);
                              setOtherServiceArea('');
                              e.preventDefault();
                            }
                          }}
                          aria-label="Other service area"
                        />
                        <button
                          type="button"
                          className="ml-2 text-green-600 text-xs font-semibold"
                          disabled={!otherServiceArea.trim()}
                          onClick={() => {
                            if (otherServiceArea.trim()) {
                              setServiceAreas(prev => prev.includes(otherServiceArea.trim()) ? prev : [...prev, otherServiceArea.trim()]);
                              setOtherServiceArea('');
                            }
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">Which types of vocational consulting will you hire most often?</div>
                {errors.serviceAreas && <div className="text-red-500 text-xs mt-1" id="serviceAreas-error">{errors.serviceAreas}</div>}
              </div>
              {/* Website URL */}
              <div>
                <Label htmlFor="website" className="text-base font-semibold mb-1">Website URL</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.example.com"
                    value={website}
                    onChange={e => { setWebsite(e.target.value); setErrors(prev => ({ ...prev, website: '' })); }}
                    onBlur={() => setErrors(prev => ({ ...prev, website: (website && !/^https?:\/\/.+\..+/.test(website)) ? 'Enter a valid URL.' : '' }))}
                  />
                  {website && /^https?:\/\/.+\..+/.test(website) && <span className="text-green-600 text-lg">✔️</span>}
                  {website && !/^https?:\/\/.+\..+/.test(website) && <span className="text-yellow-600 text-lg">⚠️</span>}
                </div>
                <div className="text-xs text-gray-400 mt-1">Optional. Must start with https://</div>
                {errors.website && <div className="text-red-500 text-xs mt-1">{errors.website}</div>}
              </div>
            </div>
            {/* Right: Main fields */}
            <div className="flex flex-col gap-8">
              {/* Organization Name */}
              <div>
                <Label htmlFor="orgName" className="text-base font-semibold mb-1">Organization Name <span className="text-red-500">*</span></Label>
                <Input
                  id="orgName"
                  type="text"
                  placeholder="Acme Rehabilitation Services"
                  value={orgName}
                  onChange={e => { setOrgName(e.target.value); setErrors(prev => ({ ...prev, orgName: '' })); }}
                  onBlur={() => setErrors(prev => ({ ...prev, orgName: (!orgName.trim() || orgName.length > 100) ? 'Organization name is required (1-100 chars).' : '' }))}
                  maxLength={100}
                  required
                />
                {errors.orgName && <div className="text-red-500 text-xs mt-1">{errors.orgName}</div>}
              </div>
              {/* Company Size */}
              <div>
                <Label className="text-base font-semibold mb-1">Company Size <span className="text-red-500">*</span></Label>
                <div className="flex gap-4 mt-2">
                  {['Small (1–50)', 'Medium (51–500)', 'Large (501+)'].map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${companySize === size ? 'bg-green-600 text-white border-green-600 shadow' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50'}`}
                      onClick={() => { setCompanySize(size); setErrors(prev => ({ ...prev, companySize: '' })); }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.companySize && <div className="text-red-500 text-xs mt-1">{errors.companySize}</div>}
              </div>
              {/* Office Address */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="font-semibold mb-3 text-gray-800">Office Address</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">Country <span className="text-red-500">*</span></Label>
                    <select
                      id="country"
                      className="w-full border rounded px-2 py-2 bg-white"
                      value={country}
                      onChange={e => { setCountry(e.target.value); setErrors(prev => ({ ...prev, country: '' })); }}
                      onBlur={() => setErrors(prev => ({ ...prev, country: !country ? 'Country is required.' : '' }))}
                      required
                    >
                      <option value="">Select Country</option>
                      {COUNTRY_OPTIONS.map(opt => (
                        <option key={opt.code} value={opt.name}>{opt.name}</option>
                      ))}
                    </select>
                    {errors.country && <div className="text-red-500 text-xs mt-1">{errors.country}</div>}
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium">State/Province <span className="text-red-500">*</span></Label>
                    <Input
                      id="state"
                      type="text"
                      value={state}
                      onChange={e => { setState(e.target.value); setErrors(prev => ({ ...prev, state: '' })); }}
                      onBlur={() => setErrors(prev => ({ ...prev, state: !state ? 'State/Province is required.' : '' }))}
                      required
                    />
                    {errors.state && <div className="text-red-500 text-xs mt-1">{errors.state}</div>}
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium">City <span className="text-red-500">*</span></Label>
                    <Input
                      id="city"
                      type="text"
                      value={city}
                      onChange={e => { setCity(e.target.value); setErrors(prev => ({ ...prev, city: '' })); }}
                      onBlur={() => setErrors(prev => ({ ...prev, city: !city ? 'City is required.' : '' }))}
                      required
                    />
                    {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
                  </div>
                  <div>
                    <Label htmlFor="street" className="text-sm font-medium">Street Address <span className="text-red-500">*</span></Label>
                    <Input
                      id="street"
                      type="text"
                      value={street}
                      onChange={e => { setStreet(e.target.value); setErrors(prev => ({ ...prev, street: '' })); }}
                      onBlur={() => setErrors(prev => ({ ...prev, street: !street ? 'Street address is required.' : '' }))}
                      required
                    />
                    {errors.street && <div className="text-red-500 text-xs mt-1">{errors.street}</div>}
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-sm font-medium">ZIP/Postal Code <span className="text-red-500">*</span></Label>
                    <Input
                      id="zip"
                      type="text"
                      value={zip}
                      onChange={e => { setZip(e.target.value); setErrors(prev => ({ ...prev, zip: '' })); }}
                      onBlur={() => setErrors(prev => ({ ...prev, zip: !zip ? 'ZIP/Postal code is required.' : '' }))}
                      required
                    />
                    {errors.zip && <div className="text-red-500 text-xs mt-1">{errors.zip}</div>}
                  </div>
                </div>
              </div>
              {/* Time Zone */}
              <div>
                <Label className="text-base font-semibold mb-1">
                  Time Zone <span className="text-red-500">*</span>
                  <span className="ml-1 text-gray-400 cursor-pointer" title="We use this to schedule meetings and deadlines in your local time.">ℹ️</span>
                </Label>
                <select
                  className="w-full border rounded px-2 py-2 bg-white"
                  value={timezone}
                  onChange={e => { setTimezone(e.target.value); setErrors(prev => ({ ...prev, timezone: '' })); }}
                  onBlur={() => setErrors(prev => ({ ...prev, timezone: !timezone ? 'Time zone is required.' : '' }))}
                  required
                >
                  <option value="">Select Time Zone</option>
                  {TIMEZONE_OPTIONS.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
                <div className="text-xs text-gray-400 mt-1">Used for scheduling meetings and deadlines in your local time.</div>
                {errors.timezone && <div className="text-red-500 text-xs mt-1">{errors.timezone}</div>}
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-5 px-8 flex flex-col z-20 shadow-lg">
        {footerError && <div className="text-red-500 text-center text-sm mb-2">{footerError}</div>}
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" type="button" disabled>Back</Button>
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

export default Step1BasicInfo; 