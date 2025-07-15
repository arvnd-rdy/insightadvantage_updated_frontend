import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from 'lucide-react';

const VOCATIONAL_SKILLS = [
  'Vocational Evaluation', 'Psycho Vocational Evaluation', 'Transferable Skills Analysis', 'Labour Market Survey',
  'Case Management', 'Job Development', 'Job Placement', 'Career Counselling', 'Return to Work Planning',
  'Disability Management', 'Functional Capacity Evaluation', 'Ergonomic Assessment', 'Medical-Legal Assessment',
  'Expert Testimony', 'Workplace Accommodation', 'Rehabilitation Planning', 'Life Care Planning', 'Coaching',
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
      navigate('/onboarding/organization/step-2');
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
      navigate('/onboarding/organization/step-2');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Tell us about your organization</h1>
            <p className="text-lg text-gray-600">This information helps us personalize your experience and connect you with the right consultants.</p>
          </div>

          <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Basic Information</h2>
              
              <div>
                <Label htmlFor="orgName" className="text-base font-medium text-gray-700">Organization Name <span className="text-red-500">*</span></Label>
                <Input id="orgName" type="text" placeholder="e.g., Acme Rehabilitation Services" value={orgName} onChange={e => { setOrgName(e.target.value); setErrors(prev => ({ ...prev, orgName: '' })); }} maxLength={100} required className="mt-2"/>
                {errors.orgName && <p className="mt-2 text-sm text-red-600">{errors.orgName}</p>}
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700">Company Size <span className="text-red-500">*</span></Label>
                <RadioGroup value={companySize} onValueChange={(value) => { setCompanySize(value); setErrors(prev => ({ ...prev, companySize: '' })); }} className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Small (1–50)', 'Medium (51–500)', 'Large (501+)'].map(size => (
                    <Label key={size} htmlFor={size} className={`flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer ${companySize === size ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}>
                      <RadioGroupItem value={size} id={size} className="sr-only" />
                      {size}
                    </Label>
                  ))}
                </RadioGroup>
                {errors.companySize && <p className="mt-2 text-sm text-red-600">{errors.companySize}</p>}
              </div>

              <div>
                <Label htmlFor="website" className="text-base font-medium text-gray-700">Website URL</Label>
                <Input id="website" type="url" placeholder="https://www.example.com" value={website} onChange={e => { setWebsite(e.target.value); setErrors(prev => ({ ...prev, website: '' })); }} className="mt-2"/>
                <p className="mt-2 text-sm text-gray-500">Optional. Must start with http:// or https://</p>
                {errors.website && <p className="mt-2 text-sm text-red-600">{errors.website}</p>}
              </div>
            </div>

            {/* Section 2: Branding and Services */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Branding & Services</h2>
              <div>
                <Label htmlFor="logo-upload" className="text-base font-medium text-gray-700">Organization Logo</Label>
                <div className="mt-2 flex items-center gap-6">
                  <div className="shrink-0">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="h-20 w-20 object-cover rounded-full shadow-sm" />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center border">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div
                    className="flex-grow flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-8 hover:border-gray-400 transition-colors duration-200 ease-in-out cursor-pointer"
                    onClick={() => fileInputRef.current?.click()} onDrop={handleLogoDrop} onDragOver={e => e.preventDefault()}
                  >
                    <div className="text-center">
                      <div className="flex text-sm text-gray-600">
                        <span className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none hover:text-blue-500">Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/jpeg,image/png" ref={fileInputRef} onChange={handleLogoChange} />
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
                {errors.logo && <p className="mt-2 text-sm text-red-600">{errors.logo}</p>}
              </div>

              <div>
                <Label htmlFor="service-areas" className="text-base font-medium text-gray-700">Primary Service Areas <span className="text-red-500">*</span></Label>
                <p className="mt-1 text-sm text-gray-500">Which types of vocational consulting will you hire most often?</p>
                {/* This is a simplified version. A proper multi-select dropdown would be better. */}
                <Select onValueChange={(value) => setServiceAreas(value ? [value] : [])}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select a service area..." />
                    </SelectTrigger>
                    <SelectContent>
                        {VOCATIONAL_SKILLS.map(skill => (
                            <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.serviceAreas && <p className="mt-2 text-sm text-red-600">{errors.serviceAreas}</p>}
              </div>
            </div>

            {/* Section 3: Location */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Office Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="country" className="text-base font-medium text-gray-700">Country <span className="text-red-500">*</span></Label>
                  <Select value={country} onValueChange={(value) => { setCountry(value); setErrors(prev => ({ ...prev, country: '' })); }}>
                    <SelectTrigger className="w-full mt-2"><SelectValue placeholder="Select Country" /></SelectTrigger>
                    <SelectContent>
                      {COUNTRY_OPTIONS.map(opt => (<SelectItem key={opt.code} value={opt.name}>{opt.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
                </div>
                <div>
                  <Label htmlFor="state" className="text-base font-medium text-gray-700">State/Province <span className="text-red-500">*</span></Label>
                  <Input id="state" type="text" value={state} onChange={e => { setState(e.target.value); setErrors(prev => ({ ...prev, state: '' })); }} required className="mt-2"/>
                  {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="street" className="text-base font-medium text-gray-700">Street Address <span className="text-red-500">*</span></Label>
                <Input id="street" type="text" value={street} onChange={e => { setStreet(e.target.value); setErrors(prev => ({ ...prev, street: '' })); }} required className="mt-2"/>
                {errors.street && <p className="mt-2 text-sm text-red-600">{errors.street}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city" className="text-base font-medium text-gray-700">City <span className="text-red-500">*</span></Label>
                  <Input id="city" type="text" value={city} onChange={e => { setCity(e.target.value); setErrors(prev => ({ ...prev, city: '' })); }} required className="mt-2"/>
                  {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="zip" className="text-base font-medium text-gray-700">ZIP/Postal Code <span className="text-red-500">*</span></Label>
                  <Input id="zip" type="text" value={zip} onChange={e => { setZip(e.target.value); setErrors(prev => ({ ...prev, zip: '' })); }} required className="mt-2"/>
                  {errors.zip && <p className="mt-2 text-sm text-red-600">{errors.zip}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="timezone" className="text-base font-medium text-gray-700">Time Zone <span className="text-red-500">*</span></Label>
                <Select value={timezone} onValueChange={(value) => { setTimezone(value); setErrors(prev => ({ ...prev, timezone: '' })); }}>
                    <SelectTrigger className="w-full mt-2"><SelectValue placeholder="Select Time Zone" /></SelectTrigger>
                    <SelectContent>
                        {TIMEZONE_OPTIONS.map(tz => (<SelectItem key={tz} value={tz}>{tz}</SelectItem>))}
                    </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-gray-500">Used for scheduling meetings and deadlines in your local time.</p>
                {errors.timezone && <p className="mt-2 text-sm text-red-600">{errors.timezone}</p>}
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 w-full bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <Button variant="outline" type="button" disabled>
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

export default Step1BasicInfo; 