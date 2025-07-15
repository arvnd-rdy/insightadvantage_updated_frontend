import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Mail, Phone, MessageSquare } from 'lucide-react';

const PREFERRED_METHODS = [
  { value: 'email', label: 'Email', icon: <Mail className="inline w-4 h-4 mr-1" /> },
  { value: 'phone', label: 'Phone', icon: <Phone className="inline w-4 h-4 mr-1" /> },
  { value: 'message', label: 'In-platform Message', icon: <MessageSquare className="inline w-4 h-4 mr-1" /> },
];

interface ContactEntry {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  preferred: string;
}

const Step2Contacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    preferred: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName || form.firstName.length > 50) newErrors.firstName = 'First name required (1-50 chars)';
    if (!form.lastName || form.lastName.length > 50) newErrors.lastName = 'Last name required (1-50 chars)';
    if (!form.jobTitle) newErrors.jobTitle = 'Job title required';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.phone) newErrors.phone = 'Phone required';
    if (!form.preferred) newErrors.preferred = 'Select preferred method';
    return newErrors;
  };
  const isFormValid = Object.keys(validate()).length === 0;

  // Add contact
  const handleAddContact = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitting(true);
    setBanner('');
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 500));
      setContacts([...contacts, { ...form, id: Math.random().toString(36).slice(2) }]);
      setForm({ firstName: '', lastName: '', jobTitle: '', email: '', phone: '', preferred: '' });
      setErrors({});
    } catch {
      setBanner('Unable to save—please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete contact
  const handleDelete = async () => {
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 300));
      setContacts(contacts.filter(c => c.id !== deleteId));
      setDeleteId(null);
    } finally {
      setSubmitting(false);
    }
  };

  // Navigation
  const handleNext = () => {
    setFooterError('');
    if (contacts.length === 0) {
      setFooterError('Please add at least one contact to continue.');
      return;
    }
    navigate('/onboarding/organization/step-3a');
  };
  const handleBack = () => navigate('/onboarding/organization/step-1');
  const handleSkip = () => navigate('/onboarding/organization/step-3a');

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
            <span className="text-green-600 font-bold">Step 2</span>
            <span className="text-gray-400">/ 7</span>
            <span className="ml-4 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
              <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
              {[...Array(5)].map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-gray-200 inline-block" />
              ))}
            </span>
          </div>
        </div>
        <div className="flex-1" />
      </header>
      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 md:px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-0 md:p-0 mt-10 mb-10 overflow-hidden">
          <div className="px-8 pt-10 pb-2">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Who should we connect with?</h1>
            <p className="text-gray-500 text-center mb-10 text-base">Add the primary contact for your organization. You can add more later.</p>
          </div>
          {/* Inline Add Contact Form (always visible at the top) */}
          <div className="px-8 pb-10">
            <form
              className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm p-5 mb-6"
              onSubmit={e => {
                e.preventDefault();
                handleAddContact();
              }}
              role="form"
              aria-describedby={Object.keys(errors).length ? 'contact-form-errors' : undefined}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-base font-semibold mb-1">First Name <span className="text-red-500">*</span></Label>
                  <Input
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    maxLength={50}
                    required
                  />
                  {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
                </div>
                <div>
                  <Label className="text-base font-semibold mb-1">Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    maxLength={50}
                    required
                  />
                  {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
                </div>
                <div className="md:col-span-2">
                  <Label className="text-base font-semibold mb-1">Job Title <span className="text-red-500">*</span></Label>
                  <Input
                    value={form.jobTitle}
                    onChange={e => setForm(f => ({ ...f, jobTitle: e.target.value }))}
                    required
                  />
                  {errors.jobTitle && <div className="text-red-500 text-xs mt-1">{errors.jobTitle}</div>}
                </div>
                <div>
                  <Label className="text-base font-semibold mb-1">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                  {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                </div>
                <div>
                  <Label className="text-base font-semibold mb-1">Phone Number <span className="text-red-500">*</span></Label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                  />
                  {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                </div>
                <div className="md:col-span-2">
                  <Label className="text-base font-semibold mb-1">Preferred Communication Method <span className="text-red-500">*</span></Label>
                  <div className="flex gap-6 mt-2">
                    {PREFERRED_METHODS.map(m => (
                      <label key={m.value} className="flex items-center gap-2 cursor-pointer text-base">
                        <input
                          type="radio"
                          name="preferred"
                          value={m.value}
                          checked={form.preferred === m.value}
                          onChange={() => setForm(f => ({ ...f, preferred: m.value }))}
                          required
                        />
                        {m.icon}
                        {m.label}
                      </label>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">We’ll send important alerts via this channel.</div>
                  {errors.preferred && <div className="text-red-500 text-xs mt-1">{errors.preferred}</div>}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <Button type="submit" disabled={!isFormValid || submitting} className={isFormValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}>
                  Add Contact
                </Button>
              </div>
              {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium mt-2" id="contact-form-errors">{banner}</div>}
            </form>
            {/* Contacts List or Empty State */}
            {contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 text-gray-400 bg-gray-50">
                <Plus className="w-12 h-12 mb-2" />
                <div className="font-medium mb-1 text-lg">Add the primary contact for your organization.</div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {contacts.map((c, idx) => (
                  <div key={c.id} className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-semibold text-lg mb-1 flex items-center gap-2">
                        {c.firstName} {c.lastName}, {c.jobTitle}
                      </div>
                      <div className="text-gray-700 text-base mb-1">{c.email} • {c.phone}</div>
                      <Badge variant="secondary" className="text-xs">
                        Preferred: {PREFERRED_METHODS.find(m => m.value === c.preferred)?.label}
                      </Badge>
                    </div>
                    {/* Inline edit/delete buttons can be added here if needed, but no modals/dialogs */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-5 px-8 flex flex-col z-20 shadow-lg">
        {footerError && <div className="text-red-500 text-center text-sm mb-2">{footerError}</div>}
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
          <Button type="button" variant="ghost" onClick={handleSkip}>Skip for Now</Button>
          <Button
            type="button"
            className={contacts.length === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}
            onClick={handleNext}
            disabled={contacts.length === 0}
          >
            Save & Next
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Step2Contacts;