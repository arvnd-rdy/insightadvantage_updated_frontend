import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const timeZones = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'Europe/London', 'Europe/Paris', 'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney',
];

const canadianTimeZones = [
  { value: 'America/Vancouver', label: 'Pacific Time (PT)' },
  { value: 'America/Edmonton', label: 'Mountain Time (MT)' },
  { value: 'America/Winnipeg', label: 'Central Time (CT)' },
  { value: 'America/Toronto', label: 'Eastern Time (ET)' },
  { value: 'America/Halifax', label: 'Atlantic Time (AT)' },
  { value: 'America/St_Johns', label: 'Newfoundland Time (NT)' },
];

const canadianProvinces = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 
  'Saskatchewan', 'Yukon'
];

// Sample Canadian cities for auto-complete (in real app, this would come from an API)
const canadianCities = [
  'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa',
  'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria',
  'Halifax', 'St. John\'s', 'Saskatoon', 'Regina', 'Windsor', 'Sherbrooke'
];

interface FormErrors {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  province?: string;
  zip?: string;
  timeZone?: string;
  languages?: string;
  website?: string;
}

const Step1PersonalDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    street: '',
    zip: '',
    timeZone: '',
    languages: [] as { language: string; fluency: string }[],
    newLanguage: '',
    newFluency: 'Basic',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [fileError, setFileError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        if (!value) return 'First name is required';
        if (value.length < 2) return 'First name must be at least 2 characters';
        if (value.length > 50) return 'First name must be less than 50 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'First name can only contain letters';
        return '';
      
      case 'lastName':
        if (!value) return 'Last name is required';
        if (value.length < 2) return 'Last name must be at least 2 characters';
        if (value.length > 50) return 'Last name must be less than 50 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Last name can only contain letters';
        return '';
      
      case 'middleName':
        if (value && !/^[a-zA-Z\s]+$/.test(value)) return 'Middle name can only contain letters';
        return '';
      
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value) return 'Phone number is required';
        if (value.length < 10) return 'Please enter a valid phone number';
        return '';
      
      case 'street':
        if (!value) return 'Street address is required';
        if (value.length < 5) return 'Street address must be at least 5 characters';
        if (value.length > 100) return 'Street address must be less than 100 characters';
        return '';
      
      case 'city':
        if (!value) return 'City is required';
        return '';
      
      case 'province':
        if (!value) return 'Province is required';
        return '';
      
      case 'zip':
        if (!value) return 'Postal code is required';
        // Canadian postal code format: A1A 1A1
        if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value)) {
          return 'Please enter a valid Canadian postal code (e.g., A1A 1A1)';
        }
        return '';
      
      case 'timeZone':
        if (!value) return 'Time zone is required';
        return '';
      
      case 'website':
        if (value && !/^https?:\/\/.+/.test(value)) {
          return 'Please enter a valid URL starting with http:// or https://';
        }
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    // Validate all fields
    Object.keys(form).forEach(key => {
      if (key !== 'languages' && key !== 'newLanguage' && key !== 'newFluency') {
        const error = validateField(key, form[key as keyof typeof form] as string);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });
    // Validate languages
    if (form.languages.length === 0) {
      newErrors.languages = 'At least one language is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pure function: checks if all required fields are filled and there are no errors
  const isFormValid = (): boolean => {
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'province', 'city', 'street', 'zip', 'timeZone'
    ];
    for (const field of requiredFields) {
      if (!form[field]) return false;
    }
    if (form.languages.length === 0) return false;
    // No errors
    for (const key in errors) {
      if (errors[key as keyof FormErrors]) return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Auto-complete for city
    if (name === 'city' && value.length > 1) {
      const filtered = canadianCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filtered.slice(0, 5));
      setShowCitySuggestions(true);
    } else if (name === 'city') {
      setShowCitySuggestions(false);
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, form[name as keyof typeof form] as string);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCitySelect = (city: string) => {
    setForm(prev => ({ ...prev, city }));
    setShowCitySuggestions(false);
    setErrors(prev => ({ ...prev, city: undefined }));
  };

  // Update language add/remove handlers
  const handleAddLanguage = () => {
    if (form.newLanguage && !form.languages.some(l => l.language.toLowerCase() === form.newLanguage.toLowerCase())) {
      setForm((f) => ({
        ...f,
        languages: [...f.languages, { language: f.newLanguage, fluency: f.newFluency }],
        newLanguage: '',
        newFluency: 'Basic',
      }));
      setErrors(prev => ({ ...prev, languages: undefined }));
    }
  };
  
  const handleRemoveLanguage = (lang: string) => {
    setForm((f) => ({ ...f, languages: f.languages.filter((l) => l.language !== lang) }));
  };

  // Enhanced avatar upload logic with file validation
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    
    if (file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setFileError('Please select a JPG or PNG file');
        return;
      }
      
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be less than 5MB');
        return;
      }
      
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };
  
  const handleAvatarSave = () => {
    setAvatarModalOpen(false);
  };
  
  const handleAvatarRemove = () => {
    setAvatar(null);
    setAvatarFile(null);
    setAvatarModalOpen(false);
    setFileError('');
  };

  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.toUpperCase();
    setForm((f) => ({ ...f, zip }));
    
    // Clear error when user starts typing
    if (errors.zip) {
      setErrors(prev => ({ ...prev, zip: undefined }));
    }
    
    // Only trigger for 6-character Canadian postal codes (with or without space)
    const cleaned = zip.replace(/\s/g, '');
    if (cleaned.length === 6) {
      try {
        const resp = await fetch(`https://api.zippopotam.us/ca/${cleaned}`);
        if (resp.ok) {
          const data = await resp.json();
          const place = data.places?.[0];
          if (place) {
            setForm((f) => ({
              ...f,
              city: place["place name"] || f.city,
              province: place["state"] || f.province,
            }));
          }
        }
      } catch {}
    }
  };

  // Navigation handlers
  const handleBack = () => navigate('/register');
  const handleSkip = () => {
    if (window.confirm('Your profile will be incomplete until you finish this step. Are you sure you want to skip?')) {
      navigate('/onboarding/consultant/step-2');
    }
  };
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // TODO: Save form data
      navigate('/onboarding/consultant/step-2');
    }
  };

  // Validate form on mount and when form changes

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">1/11</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Tell us about yourself</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          This information helps us personalize your experience and connect you with the right opportunities.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Left: Avatar and portfolio */}
          <div className="flex flex-col items-center md:w-1/3 mb-8 md:mb-0 gap-6">
            {/* Avatar upload */}
            <Dialog open={avatarModalOpen} onOpenChange={setAvatarModalOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-32 h-32 rounded-full border-4 border-green-500 bg-gray-100 flex items-center justify-center mb-4 overflow-hidden shadow hover:shadow-lg transition"
                  aria-label="Upload profile photo"
                >
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl text-gray-400">+</span>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-full p-8 flex flex-col items-center">
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-4">Upload Profile Photo</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center w-full">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <div
                    className="w-32 h-32 rounded-full border-4 border-green-500 bg-gray-100 flex items-center justify-center mb-4 overflow-hidden shadow"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    {avatar ? (
                      <img src={avatar} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl text-gray-400">+</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 text-center mb-4">
                    Optional, but profiles with photos get 40% more views.
                  </div>
                  {fileError && (
                    <div className="text-red-500 text-sm mb-4">{fileError}</div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Choose Photo
                    </Button>
                    {avatar && (
                      <Button type="button" variant="destructive" onClick={handleAvatarRemove}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                <DialogFooter className="mt-6 flex justify-between w-full">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={handleAvatarSave} disabled={!avatarFile}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="text-gray-700 font-medium">Profile Photo</div>
            {/* Portfolio link below avatar */}
            <div className="w-full">
              <Label htmlFor="website">Personal Website / LinkedIn URL (optional)</Label>
              <Input 
                id="website" 
                name="website" 
                value={form.website} 
                onChange={handleChange}
                onBlur={() => handleBlur('website')}
                placeholder="https://linkedin.com/in/yourprofile"
              />
              {touched.website && errors.website && (
                <div className="text-red-500 text-sm mt-1">{errors.website}</div>
              )}
            </div>
          </div>
          {/* Right: Main form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={form.firstName} 
                onChange={handleChange}
                onBlur={() => handleBlur('firstName')}
                required 
              />
              {touched.firstName && errors.firstName && (
                <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">2–50 characters, letters only</div>
            </div>
            {/* Middle Name field removed as per request */}
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={form.lastName} 
                onChange={handleChange}
                onBlur={() => handleBlur('lastName')}
                required 
              />
              {touched.lastName && errors.lastName && (
                <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">2–50 characters, letters only</div>
            </div>
            {/* Email and Phone side by side, with consistent spacing */}
            <div className="md:col-span-2">
              <div className="flex flex-row gap-4 w-full">
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    required 
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">Must be valid format; will be used for login and notifications</div>
                </div>
                <div className="w-64 min-w-0 flex flex-col gap-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <PhoneInput
                    country={'ca'}
                    value={form.phone}
                    onChange={phone => setForm(f => ({ ...f, phone }))}
                    inputProps={{ 
                      name: 'phone', 
                      required: true,
                      onBlur: () => handleBlur('phone')
                    }}
                    inputStyle={{ width: '100%', height: '40px', borderRadius: '0.5rem', border: '1px solid #e5e7eb', background: 'var(--background, #fff)', fontSize: '1rem', paddingLeft: '48px' }}
                    buttonStyle={{ border: 'none', background: 'transparent', paddingLeft: '8px' }}
                    containerStyle={{ width: '100%' }}
                    specialLabel=""
                  />
                  {touched.phone && errors.phone && (
                    <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">Auto-format by locale; allow country code dropdown</div>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="province">Province *</Label>
              <select
                id="province"
                name="province"
                value={form.province}
                onChange={e => setForm(f => ({ ...f, province: e.target.value }))}
                onBlur={() => handleBlur('province')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                required
              >
                <option value="">Select province</option>
                {canadianProvinces.map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
              {touched.province && errors.province && (
                <div className="text-red-500 text-sm mt-1">{errors.province}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">Dropdown or free-text with suggestions</div>
            </div>
            <div className="relative">
              <Label htmlFor="city">City *</Label>
              <Input 
                id="city" 
                name="city" 
                value={form.city} 
                onChange={handleChange}
                onBlur={() => {
                  setTimeout(() => setShowCitySuggestions(false), 200);
                  handleBlur('city');
                }}
                required 
              />
              {showCitySuggestions && citySuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                  {citySuggestions.map((city) => (
                    <div
                      key={city}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
              {touched.city && errors.city && (
                <div className="text-red-500 text-sm mt-1">{errors.city}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">Auto-complete suggestions</div>
            </div>
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input 
                id="street" 
                name="street" 
                value={form.street} 
                onChange={handleChange}
                onBlur={() => handleBlur('street')}
                required 
              />
              {touched.street && errors.street && (
                <div className="text-red-500 text-sm mt-1">{errors.street}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">5–100 characters</div>
            </div>
            <div>
              <Label htmlFor="zip">Postal Code *</Label>
              <Input 
                id="zip" 
                name="zip" 
                value={form.zip} 
                onChange={handleZipChange}
                onBlur={() => handleBlur('zip')}
                placeholder="A1A 1A1"
                required 
              />
              {touched.zip && errors.zip && (
                <div className="text-red-500 text-sm mt-1">{errors.zip}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">Validate format per selected country</div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="timeZone">Time Zone *</Label>
              <select
                id="timeZone"
                name="timeZone"
                value={form.timeZone}
                onChange={e => setForm(f => ({ ...f, timeZone: e.target.value }))}
                onBlur={() => handleBlur('timeZone')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                required
              >
                <option value="">Select time zone</option>
                {canadianTimeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
              <div className="text-sm text-gray-600 mt-1">Helps us show you accurate appointment times.</div>
              {touched.timeZone && errors.timeZone && (
                <div className="text-red-500 text-sm mt-1">{errors.timeZone}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">List of IANA zones (e.g. “America/Toronto”)</div>
            </div>
            {/* Languages Spoken with fluency */}
            <div className="md:col-span-2">
              <Label>Languages Spoken *</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.languages.map((lang) => (
                  <span key={lang.language} className="bg-green-100 text-green-800 rounded-full px-3 py-1 flex items-center text-sm">
                    {lang.language} ({lang.fluency})
                    <button type="button" className="ml-2 text-green-700 hover:text-green-900" onClick={() => handleRemoveLanguage(lang.language)}>&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                <Input
                  placeholder="Add language"
                  value={form.newLanguage}
                  onChange={e => setForm(f => ({ ...f, newLanguage: e.target.value }))}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddLanguage(); } }}
                  className="w-40"
                />
                <select
                  value={form.newFluency}
                  onChange={e => setForm(f => ({ ...f, newFluency: e.target.value }))}
                  className="h-10 rounded-md border border-input bg-background px-2 text-base"
                >
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Fluent">Fluent</option>
                </select>
                <Button type="button" variant="secondary" onClick={handleAddLanguage}>Add</Button>
              </div>
              {errors.languages && (
                <div className="text-red-500 text-sm mt-1">{errors.languages}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">“Add Language” opens small modal to choose: Language + Proficiency. Min 1 required.</div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <Button variant="ghost" type="button" onClick={handleSkip}>Skip for now</Button>
        <Button 
          type="submit" 
          formAction="submit" 
          formMethod="post" 
          className="bg-green-600 hover:bg-green-700 text-white" 
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          Next
        </Button>
      </footer>
    </div>
  );
};

export default Step1PersonalDetails;