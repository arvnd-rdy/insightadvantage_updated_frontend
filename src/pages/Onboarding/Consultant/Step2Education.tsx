import React, { useState } from 'react';
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

interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  city: string;
  country: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentlyStudying: boolean;
  description: string;
}

const institutionSuggestions = [
  'University of Toronto', 'York University', 'McGill University', 'University of British Columbia',
  'University of Alberta', 'Western University', 'Queen’s University', 'University of Ottawa',
  'Simon Fraser University', 'University of Calgary', 'Dalhousie University', 'Concordia University',
  'Carleton University', 'University of Manitoba', 'University of Waterloo', 'Université de Montréal',
];

const Step2Education = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState({
    degree: '',
    institution: '',
    fieldOfStudy: '',
    city: '',
    country: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    currentlyStudying: false,
    description: '',
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [instSuggestions, setInstSuggestions] = useState<string[]>([]);
  const [showInstSuggestions, setShowInstSuggestions] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState('');
  const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});

  const openAddModal = () => {
    setEditIndex(null);
    setForm({
      degree: '',
      institution: '',
      fieldOfStudy: '',
      city: '',
      country: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      currentlyStudying: false,
      description: '',
    });
    setFormErrors({});
    setTouched({});
    setDuplicateWarning('');
    setModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    setEditIndex(idx);
    setForm({
      degree: education[idx].degree,
      institution: education[idx].institution,
      fieldOfStudy: education[idx].fieldOfStudy || '',
      city: education[idx].city,
      country: education[idx].country,
      startMonth: education[idx].startMonth,
      startYear: education[idx].startYear,
      endMonth: education[idx].endMonth,
      endYear: education[idx].endYear,
      currentlyStudying: education[idx].currentlyStudying,
      description: education[idx].description,
    });
    setFormErrors({});
    setTouched({});
    setDuplicateWarning('');
    setModalOpen(true);
  };

  // Validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'degree':
        if (!value) return 'Degree title is required';
        return '';
      case 'institution':
        if (!value) return 'Institution is required';
        return '';
      case 'graduationYear':
        if (form.startYear && value && parseInt(value) < parseInt(form.startYear)) {
          return 'Graduation year must be after or equal to start year';
        }
        return '';
      case 'description':
        if (value && value.length > 150) return 'Description must be 150 characters or less';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const errors: any = {};
    errors.degree = validateField('degree', form.degree);
    errors.institution = validateField('institution', form.institution);
    errors.graduationYear = validateField('graduationYear', form.endYear);
    errors.description = validateField('description', form.description);
    setFormErrors(errors);
    return !errors.degree && !errors.institution && !errors.graduationYear && !errors.description;
  };

  const handleBlur = (name: string) => {
    setTouched((prev: any) => ({ ...prev, [name]: true }));
    setFormErrors((prev: any) => ({ ...prev, [name]: validateField(name, form[name as keyof typeof form]) }));
  };

  const handleModalSave = () => {
    setTouched({ degree: true, institution: true, graduationYear: true, description: true });
    if (!validateForm()) return;
    // Duplicate prevention
    if (education.some((e, i) => i !== editIndex && e.degree === form.degree && e.institution === form.institution)) {
      setDuplicateWarning('This institution and degree already exist.');
      return;
    }
    setDuplicateWarning('');
    if (editIndex !== null) {
      setEducation((prev) => prev.map((e, i) => i === editIndex ? { ...e, ...form } : e));
    } else {
      setEducation((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (idx: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== idx));
  };

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-1');
  const handleSkip = () => navigate('/onboarding/consultant/step-3');
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (education.length === 0) return;
    // TODO: Save education data
    navigate('/onboarding/consultant/step-3');
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 70 }, (_, i) => `${new Date().getFullYear() - i}`);

  // Sort education by end date (most recent first)
  const sortedEducation = [...education].sort((a, b) => {
    // If currently studying, treat as most recent
    if (a.currentlyStudying && !b.currentlyStudying) return -1;
    if (!a.currentlyStudying && b.currentlyStudying) return 1;
    // Compare end year, then end month
    const aYear = parseInt(a.endYear || a.startYear || '0', 10);
    const bYear = parseInt(b.endYear || b.startYear || '0', 10);
    if (bYear !== aYear) return bYear - aYear;
    const monthIndex = (m: string) => months.indexOf(m);
    const aMonth = monthIndex(a.endMonth || a.startMonth || '');
    const bMonth = monthIndex(b.endMonth || b.startMonth || '');
    return bMonth - aMonth;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">Step 2 of 9</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Tell us about your education</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          List your educational background. This helps clients understand your expertise and qualifications.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
          {/* Education list and header */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 w-full">
              <Label className="text-lg font-semibold">Education</Label>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="secondary" onClick={openAddModal}>Add Education</Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl w-full p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl mb-4">{editIndex !== null ? 'Edit Education' : 'Add Education'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="degree">Degree Title</Label>
                      <Input id="degree" value={form.degree} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} onBlur={() => handleBlur('degree')} required />
                      {touched.degree && formErrors.degree && <div className="text-red-500 text-xs mt-1">{formErrors.degree}</div>}
                    </div>
                    <div>
                      <Label htmlFor="institution">Institution</Label>
                      <div className="relative">
                        <Input id="institution" value={form.institution} onChange={e => {
                          setForm(f => ({ ...f, institution: e.target.value }));
                          if (e.target.value.length > 1) {
                            setInstSuggestions(institutionSuggestions.filter(inst => inst.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5));
                            setShowInstSuggestions(true);
                          } else {
                            setShowInstSuggestions(false);
                          }
                        }}
                        onBlur={() => setTimeout(() => setShowInstSuggestions(false), 200)}
                        required />
                        {showInstSuggestions && instSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                            {instSuggestions.map(inst => (
                              <div key={inst} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                                setForm(f => ({ ...f, institution: inst }));
                                setShowInstSuggestions(false);
                              }}>{inst}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      {touched.institution && formErrors.institution && <div className="text-red-500 text-xs mt-1">{formErrors.institution}</div>}
                    </div>
                    <div>
                      <Label htmlFor="fieldOfStudy">Field of Study (optional)</Label>
                      <Input id="fieldOfStudy" value={form.fieldOfStudy} onChange={e => setForm(f => ({ ...f, fieldOfStudy: e.target.value }))} />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="currentlyStudying"
                        checked={form.currentlyStudying}
                        onChange={e => setForm(f => ({ ...f, currentlyStudying: e.target.checked, endMonth: '', endYear: '' }))}
                      />
                      <Label htmlFor="currentlyStudying">I am currently studying here</Label>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label>Start Date</Label>
                        <div className="flex gap-2">
                          <select
                            value={form.startMonth}
                            onChange={e => setForm(f => ({ ...f, startMonth: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required
                          >
                            <option value="">Month</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <select
                            value={form.startYear}
                            onChange={e => setForm(f => ({ ...f, startYear: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required
                          >
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Label>End Date</Label>
                        <div className="flex gap-2">
                          <select
                            value={form.endMonth}
                            onChange={e => setForm(f => ({ ...f, endMonth: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required={!!(!form.currentlyStudying)}
                            disabled={form.currentlyStudying}
                          >
                            <option value="">Month</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <select
                            value={form.endYear}
                            onChange={e => setForm(f => ({ ...f, endYear: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required={!!(!form.currentlyStudying)}
                            disabled={form.currentlyStudying}
                            onBlur={() => handleBlur('graduationYear')}
                          >
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                        {touched.graduationYear && formErrors.graduationYear && <div className="text-red-500 text-xs mt-1">{formErrors.graduationYear}</div>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description / Key Coursework (optional)</Label>
                      <textarea
                        id="description"
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value.slice(0, 150) }))}
                        rows={4}
                        className="w-full border rounded-md px-3 py-2 text-base"
                        onBlur={() => handleBlur('description')}
                      />
                      <div className="text-xs text-gray-500 text-right">{form.description.length}/150</div>
                      {touched.description && formErrors.description && <div className="text-red-500 text-xs mt-1">{formErrors.description}</div>}
                    </div>
                    {duplicateWarning && <div className="text-red-500 text-xs mt-2">{duplicateWarning}</div>}
                  </div>
                  <DialogFooter className="mt-4 flex justify-between">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={handleModalSave}>{editIndex !== null ? 'Save Changes' : 'Save'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {/* Cards fill the same width as header/button */}
            <div className="w-full flex flex-col gap-6">
              {sortedEducation.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 w-full border rounded-lg">
                  {/* You can replace this with your own SVG or illustration */}
                  <div className="mb-4 text-6xl" role="img" aria-label="graduation cap">🎓</div>
                  <div className="text-gray-500 text-center">Add your highest completed (or ongoing) degree to get started!</div>
                </div>
              ) : (
                sortedEducation.map((edu, idx) => {
                  const firstLetter = edu.institution?.[0]?.toUpperCase() || '?';
                  const firstLine = edu.description ? edu.description.split('\n')[0] : '';
                  const isLong = edu.description && edu.description.length > firstLine.length;
                  const isExpanded = expanded[edu.id];
                  return (
                    <div
                      key={edu.id}
                      className="relative bg-white border rounded-xl px-10 py-7 shadow-md hover:shadow-lg transition w-full"
                    >
                        {/* Edit/Delete icons - top right */}
                        <div className="absolute top-5 right-5 flex gap-2 opacity-70 hover:opacity-100">
                          <Button type="button" variant="outline" size="icon" className="p-0.5 w-8 h-8" onClick={() => openEditModal(education.findIndex(e => e.id === edu.id))}>
                            <span role="img" aria-label="edit" style={{ fontSize: '1.1rem' }}>✏️</span>
                          </Button>
                          <Button type="button" variant="destructive" size="icon" className="p-0.5 w-8 h-8" onClick={() => handleDelete(education.findIndex(e => e.id === edu.id))}>
                            <span role="img" aria-label="delete" style={{ fontSize: '1.1rem' }}>🗑️</span>
                          </Button>
                        </div>
                        {/* Top row: Avatar/Logo and main info */}
                        <div className="flex flex-row items-center gap-6">
                          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700">
                            {firstLetter}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="font-bold text-lg text-gray-900 truncate">{edu.institution}</div>
                            <div className="text-gray-800 text-base truncate">{edu.degree}</div>
                            {edu.fieldOfStudy && <div className="text-gray-700 text-sm truncate">{edu.fieldOfStudy}</div>}
                            <div className="text-gray-500 text-sm">{edu.startMonth} {edu.startYear} - {edu.currentlyStudying ? 'Present' : `${edu.endMonth} ${edu.endYear}`}</div>
                          </div>
                        </div>
                        {/* Location below */}
                        <div className="text-gray-600 text-sm mt-2 ml-20">{[edu.city, edu.country].filter(Boolean).join(', ')}</div>
                        {/* Description below */}
                        {edu.description && (
                          <div className="text-gray-700 text-base mt-3 ml-20">
                            {!isExpanded ? (
                              <>
                                <span className="truncate inline-block max-w-full align-top" style={{ maxWidth: '90%' }}>
                                  {firstLine.length > 100 ? firstLine.slice(0, 100) + '...' : firstLine}
                                </span>
                                {isLong && (
                                  <button
                                    type="button"
                                    className="text-green-700 text-xs ml-2 hover:underline focus:outline-none"
                                    onClick={() => setExpanded(exp => ({ ...exp, [edu.id]: true }))}
                                  >
                                    See more
                                  </button>
                                )}
                              </>
                            ) : (
                              <>
                                <span>{edu.description}</span>
                                <button
                                  type="button"
                                  className="text-green-700 text-xs ml-2 hover:underline focus:outline-none"
                                  onClick={() => setExpanded(exp => ({ ...exp, [edu.id]: false }))}
                                >
                                  See less
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Right-side tip card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <div className="font-semibold text-sm mb-2">Pro Tip</div>
              <div className="text-gray-700 text-sm">
                Adding your education helps clients understand your background and expertise. Include your most relevant degrees or coursework.
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <Button variant="ghost" type="button" onClick={handleSkip}>Skip for now</Button>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNext} disabled={education.length === 0}>Next, add your experience</Button>
      </footer>
    </div>
  );
};

export default Step2Education; 