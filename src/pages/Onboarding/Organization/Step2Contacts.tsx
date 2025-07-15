import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Mail, Phone, MessageSquare, Trash2, User, Briefcase } from 'lucide-react';

const PREFERRED_METHODS = [
  { value: 'email', label: 'Email', icon: <Mail className="inline w-4 h-4 mr-2" /> },
  { value: 'phone', label: 'Phone', icon: <Phone className="inline w-4 h-4 mr-2" /> },
  { value: 'message', label: 'In-platform Message', icon: <MessageSquare className="inline w-4 h-4 mr-2" /> },
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
  const [form, setForm] = useState<Omit<ContactEntry, 'id'>>({
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

  const validate = (contactForm: Omit<ContactEntry, 'id'>) => {
    const newErrors: { [key: string]: string } = {};
    if (!contactForm.firstName.trim() || contactForm.firstName.length > 50) newErrors.firstName = 'First name is required (1-50 chars).';
    if (!contactForm.lastName.trim() || contactForm.lastName.length > 50) newErrors.lastName = 'Last name is required (1-50 chars).';
    if (!contactForm.jobTitle.trim()) newErrors.jobTitle = 'Job title is required.';
    if (!contactForm.email.trim() || !/^\S+@\S+\.\S+$/.test(contactForm.email)) newErrors.email = 'A valid email address is required.';
    if (!contactForm.phone.trim()) newErrors.phone = 'A phone number is required.';
    if (!contactForm.preferred) newErrors.preferred = 'Please select a preferred communication method.';
    return newErrors;
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setBanner('');
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 500));
      setContacts(prev => [...prev, { ...form, id: Date.now().toString() }]);
      setForm({ firstName: '', lastName: '', jobTitle: '', email: '', phone: '', preferred: '' }); // Reset form
      setErrors({});
    } catch {
      setBanner('Could not add contact. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleNext = () => {
    if (contacts.length === 0) {
      setFooterError('Please add at least one contact to continue.');
      return;
    }
    navigate('/onboarding/organization/step-3a');
  };

  const handleBack = () => navigate('/onboarding/organization/step-1');
  const handleSkip = () => navigate('/onboarding/organization/step-3a');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Who are the key contacts?</h1>
            <p className="text-lg text-gray-600">Add the primary contacts for your organization. You can add more later.</p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleAddContact} className="space-y-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Add a New Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-base font-medium text-gray-700">First Name <span className="text-red-500">*</span></Label>
                  <Input id="firstName" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required className="mt-2" />
                  {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-base font-medium text-gray-700">Last Name <span className="text-red-500">*</span></Label>
                  <Input id="lastName" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required className="mt-2" />
                  {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="jobTitle" className="text-base font-medium text-gray-700">Job Title <span className="text-red-500">*</span></Label>
                <Input id="jobTitle" value={form.jobTitle} onChange={e => setForm({ ...form, jobTitle: e.target.value })} required className="mt-2" />
                {errors.jobTitle && <p className="mt-2 text-sm text-red-600">{errors.jobTitle}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-base font-medium text-gray-700">Email Address <span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="mt-2" />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required className="mt-2" />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <Label className="text-base font-medium text-gray-700">Preferred Communication Method <span className="text-red-500">*</span></Label>
                <RadioGroup value={form.preferred} onValueChange={(value) => setForm({ ...form, preferred: value })} className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PREFERRED_METHODS.map(method => (
                    <Label key={method.value} htmlFor={method.value} className={`flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer ${form.preferred === method.value ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}>
                      <RadioGroupItem value={method.value} id={method.value} className="sr-only" />
                      {method.icon} {method.label}
                    </Label>
                  ))}
                </RadioGroup>
                {errors.preferred && <p className="mt-2 text-sm text-red-600">{errors.preferred}</p>}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                <Plus className="h-5 w-5 mr-2" /> {submitting ? 'Adding...' : 'Add Contact'}
              </Button>
            </div>
          </form>

          {/* Contacts List */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">Your Contacts</h2>
            {contacts.length === 0 ? (
              <div className="text-center py-10 px-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No contacts added yet</h3>
                <p className="mt-1 text-sm text-gray-500">Use the form above to add your key contacts.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map(contact => (
                  <div key={contact.id} className="flex items-start justify-between p-5 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <p className="text-lg font-semibold text-gray-900">{contact.firstName} {contact.lastName}</p>
                        <Badge variant="secondary" className="ml-3">{contact.jobTitle}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" />{contact.email}</span>
                        <span className="flex items-center gap-2 mt-1 sm:mt-0"><Phone className="h-4 w-4 text-gray-400" />{contact.phone}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Preferred: <span className="font-medium text-gray-700">{contact.preferred}</span></p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 w-full bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <Button variant="outline" type="button" onClick={handleBack}>
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
                type="button"
                onClick={handleNext}
                disabled={contacts.length === 0 || submitting}
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

export default Step2Contacts;