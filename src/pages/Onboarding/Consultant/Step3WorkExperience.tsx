import React, { useState, useRef } from 'react';
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
import WorkExperienceModal, { WorkExperienceEntry } from '@/components/WorkExperienceModal';

interface ExperienceEntry {
  id: number;
  title: string;
  company: string;
  city: string;
  country: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  bullets: string[];
  file?: File | null;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = Array.from({ length: 70 }, (_, i) => `${new Date().getFullYear() - i}`);

const orgSuggestions = [
  'RehabWorks Inc.', 'Vocational Solutions', 'WorkAbility', 'Career Pathways',
  'Remote', 'Acme Corp', 'ABC Consulting', 'XYZ Group', 'Global Talent',
];

const Step3WorkExperience = () => {
  const navigate = useNavigate();
  const [experience, setExperience] = useState<ExperienceEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalInitialData, setModalInitialData] = useState<WorkExperienceEntry>({
    title: '',
    company: '',
    city: '',
    country: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isCurrent: false,
    bullets: [],
    file: null,
  });
  interface FormErrors {
    title?: string;
    company?: string;
    location?: string;
    startMonth?: string;
    startYear?: string;
    endYear?: string;
    bullets?: string;
    file?: string;
  }
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [orgSuggestionsList, setOrgSuggestionsList] = useState<string[]>([]);
  const [showOrgSuggestions, setShowOrgSuggestions] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAddModal = () => {
    setModalMode('add');
    setModalInitialData({
      title: '',
      company: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrent: false,
      bullets: [''],
      file: null,
    });
    setFormErrors({});
    setTouched({});
    setDuplicateWarning('');
    setModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    setModalMode('edit');
    setModalInitialData({ ...experience[idx] });
    setEditIndex(idx);
    setFormErrors({});
    setTouched({});
    setDuplicateWarning('');
    setModalOpen(true);
  };

  // Validation
  const validateField = (name: string, value: string | string[] | File | null): string => {
    switch (name) {
      case 'title':
        if (!value) return 'Job title is required';
        return '';
      case 'company':
        if (!value) return 'Organization name is required';
        return '';
      case 'location':
        if (!value) return 'Location is required';
        return '';
      case 'startMonth':
      case 'startYear':
        if (!value) return 'Start date is required';
        return '';
      case 'endYear':
        if (!modalInitialData.isCurrent && modalInitialData.startYear && value && parseInt(value as string) < parseInt(modalInitialData.startYear)) {
          return 'End year must be after or equal to start year';
        }
        return '';
      case 'bullets':
        if (!value || value.length === 0 || value.filter((b: string) => b.trim()).length === 0) return 'At least one responsibility/achievement is required';
        if (value.length > 5) return 'Maximum 5 bullets allowed';
        return '';
      case 'file':
        if (value && value.size > 10 * 1024 * 1024) return 'File must be less than 10MB';
        if (value && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(value.type)) return 'Only PDF or DOCX files allowed';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    errors.title = validateField('title', modalInitialData.title);
    errors.company = validateField('company', modalInitialData.company);
    errors.location = validateField('location', modalInitialData.location);
    errors.startMonth = validateField('startMonth', modalInitialData.startMonth);
    errors.startYear = validateField('startYear', modalInitialData.startYear);
    errors.endYear = validateField('endYear', modalInitialData.endYear);
    errors.bullets = validateField('bullets', modalInitialData.bullets);
    errors.file = validateField('file', modalInitialData.file);
    setFormErrors(errors);
    return !errors.title && !errors.company && !errors.location && !errors.startMonth && !errors.startYear && !errors.endYear && !errors.bullets && !errors.file;
  };

  const handleBlur = (name: keyof typeof modalInitialData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, modalInitialData[name] as string) }));
  };

  const handleModalSave = (entry: WorkExperienceEntry) => {
    setTouched({ title: true, company: true, location: true, startMonth: true, startYear: true, endYear: true, bullets: true, file: true });
    if (!validateForm()) return;
    // Duplicate prevention
    if (experience.some((e, i) => i !== editIndex && e.title === entry.title && e.company === entry.company && e.startMonth === entry.startMonth && e.startYear === entry.startYear)) {
      setDuplicateWarning('This job/organization/date already exists.');
      return;
    }
    setDuplicateWarning('');
    if (modalMode === 'edit' && editIndex !== null) {
      setExperience(prev => prev.map((e, i) => i === editIndex ? { ...e, ...entry } : e));
    } else {
      setExperience(prev => [...prev, { id: Date.now(), ...entry }]);
    }
    setModalOpen(false);
    setEditIndex(null);
  };

  const handleDelete = (idx: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== idx));
  };

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-2');
  const handleSkip = () => navigate('/onboarding/consultant/step-4');
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (experience.length === 0) return;
    // TODO: Save experience data
    navigate('/onboarding/consultant/step-4');
  };

  // Sort experience by end date (most recent first)
  const sortedExperience = [...experience].sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
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
        <div className="text-sm text-gray-500 mb-2">Step 3 of 9</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Tell us about your work experience</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          List your relevant work experience. This helps clients understand your background and expertise.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
          {/* Experience list and header */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 w-full">
              <Label className="text-lg font-semibold">Work Experience</Label>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="secondary" onClick={openAddModal}>Add Experience</Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl w-full p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl mb-4">{editIndex !== null ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" value={modalInitialData.title} onChange={e => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, title: e.target.value }))} onBlur={() => handleBlur('title')} required />
                      {touched.title && formErrors.title && <div className="text-red-500 text-xs mt-1">{formErrors.title}</div>}
                    </div>
                    <div>
                      <Label htmlFor="company">Organization Name</Label>
                      <div className="relative">
                        <Input id="company" value={modalInitialData.company} onChange={e => {
                          setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, company: e.target.value }));
                          if (e.target.value.length > 1) {
                            setOrgSuggestionsList(orgSuggestions.filter(org => org.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5));
                            setShowOrgSuggestions(true);
                          } else {
                            setShowOrgSuggestions(false);
                          }
                        }}
                        onBlur={() => setTimeout(() => setShowOrgSuggestions(false), 200)}
                        required />
                        {showOrgSuggestions && orgSuggestionsList.length > 0 && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                            {orgSuggestionsList.map(org => (
                              <div key={org} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                                setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, company: org }));
                                setShowOrgSuggestions(false);
                              }}>{org}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      {touched.company && formErrors.company && <div className="text-red-500 text-xs mt-1">{formErrors.company}</div>}
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={modalInitialData.location} onChange={e => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, location: e.target.value }))} onBlur={() => handleBlur('location')} placeholder="City / Province or 'Remote'" required />
                      {touched.location && formErrors.location && <div className="text-red-500 text-xs mt-1">{formErrors.location}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isCurrent"
                        checked={modalInitialData.isCurrent}
                        onChange={e => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, isCurrent: e.target.checked, endMonth: '', endYear: '' }))}
                      />
                      <Label htmlFor="isCurrent">I am currently working in this role</Label>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label>Start Date</Label>
                        <div className="flex gap-2">
                          <select
                            value={modalInitialData.startMonth}
                            onChange={e => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, startMonth: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required
                          >
                            <option value="">Month</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <select
                            value={modalInitialData.startYear}
                            onChange={e => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, startYear: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required
                          >
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                        {touched.startMonth && formErrors.startMonth && <div className="text-red-500 text-xs mt-1">{formErrors.startMonth}</div>}
                        {touched.startYear && formErrors.startYear && <div className="text-red-500 text-xs mt-1">{formErrors.startYear}</div>}
                      </div>
                      <div className="flex-1">
                        <Label>End Date</Label>
                        <div className="flex gap-2">
                          <select
                            value={modalInitialData.endMonth}
                            onChange={e => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, endMonth: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required={!modalInitialData.isCurrent}
                            disabled={modalInitialData.isCurrent}
                          >
                            <option value="">Month</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <select
                            value={modalInitialData.endYear}
                            onChange={e => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, endYear: e.target.value }))}
                            className="border rounded-md px-2 py-2 w-1/2"
                            required={!modalInitialData.isCurrent}
                            disabled={modalInitialData.isCurrent}
                            onBlur={() => handleBlur('endYear')}
                          >
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                        {touched.endYear && formErrors.endYear && <div className="text-red-500 text-xs mt-1">{formErrors.endYear}</div>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bullets">Key Responsibilities & Achievements</Label>
                      <div className="flex flex-col gap-2">
                        {modalInitialData.bullets && modalInitialData.bullets.map((b: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-lg">•</span>
                            <Input
                              value={b}
                              onChange={e => {
                                const newBullets = [...modalInitialData.bullets];
                                newBullets[idx] = e.target.value;
                                setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, bullets: newBullets }));
                              }}
                              onBlur={() => handleBlur('bullets')}
                              placeholder={`Responsibility or achievement #${idx + 1}`}
                              maxLength={120}
                            />
                            {modalInitialData.bullets.length > 1 && (
                              <Button type="button" variant="destructive" size="icon" onClick={() => {
                                setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, bullets: prev.bullets.filter((_: string, i: number) => i !== idx) }));
                              }}>–</Button>
                            )}
                          </div>
                        ))}
                        {modalInitialData.bullets && modalInitialData.bullets.length < 5 && (
                          <Button type="button" variant="secondary" onClick={() => setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, bullets: [...prev.bullets, ''] }))}>+ Add Bullet</Button>
                        )}
                      </div>
                      {touched.bullets && formErrors.bullets && <div className="text-red-500 text-xs mt-1">{formErrors.bullets}</div>}
                    </div>
                    <div>
                      <Label htmlFor="file">Upload Supporting Document (optional)</Label>
                      <input
                        ref={fileInputRef}
                        id="file"
                        type="file"
                        accept=".pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          setModalInitialData((prev: WorkExperienceEntry) => ({ ...prev, file }));
                          handleBlur('file');
                        }}
                      />
                      {modalInitialData.file && (
                        <div className="text-xs mt-1">Selected: {modalInitialData.file.name}</div>
                      )}
                      {touched.file && formErrors.file && <div className="text-red-500 text-xs mt-1">{formErrors.file}</div>}
                    </div>
                    {duplicateWarning && <div className="text-red-500 text-xs mt-2">{duplicateWarning}</div>}
                  </div>
                  <DialogFooter className="mt-4 flex justify-between">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={() => handleModalSave(modalInitialData)}>{editIndex !== null ? 'Save Changes' : 'Save'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {/* Experience cards - wide, LinkedIn style */}
            <div className="w-full flex flex-col gap-6">
              {sortedExperience.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 w-full border rounded-lg">
                  <div className="mb-4 text-6xl" role="img" aria-label="briefcase">💼</div>
                  <div className="text-gray-500 text-center">Add your most recent role to showcase your expertise.</div>
                </div>
              ) : (
                sortedExperience.map((exp, idx) => {
                  const firstLetter = exp.company?.[0]?.toUpperCase() || '?';
                  return (
                    <div
                      key={exp.id}
                      className="relative bg-white border rounded-xl px-10 py-7 shadow-md hover:shadow-lg transition w-full"
                    >
                      {/* Edit/Delete icons - top right */}
                      <div className="absolute top-5 right-5 flex gap-2 opacity-70 hover:opacity-100">
                        <Button type="button" variant="outline" size="icon" className="p-0.5 w-8 h-8" onClick={() => openEditModal(sortedExperience.findIndex(e => e.id === exp.id))}>
                          <span role="img" aria-label="edit" style={{ fontSize: '1.1rem' }}>✏️</span>
                        </Button>
                        <Button type="button" variant="destructive" size="icon" className="p-0.5 w-8 h-8" onClick={() => handleDelete(sortedExperience.findIndex(e => e.id === exp.id))}>
                          <span role="img" aria-label="delete" style={{ fontSize: '1.1rem' }}>🗑️</span>
                        </Button>
                      </div>
                      {/* Top row: Avatar/Logo and main info */}
                      <div className="flex flex-row items-center gap-6">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
                          {firstLetter}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="font-bold text-lg text-gray-900 truncate">{exp.company}</div>
                          <div className="text-gray-800 text-base truncate">{exp.title}</div>
                          <div className="text-gray-500 text-sm">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}</div>
                        </div>
                      </div>
                      {/* Location below */}
                      <div className="text-gray-600 text-sm mt-2 ml-20">{exp.location}</div>
                      {/* Bullets below */}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="text-gray-700 text-base mt-3 ml-20 list-disc pl-4">
                          {exp.bullets.slice(0, 2).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                          {exp.bullets.length > 2 && <li className="text-xs text-gray-500">...and more</li>}
                        </ul>
                      )}
                      {/* File below */}
                      {exp.file && (
                        <div className="text-xs text-blue-700 mt-2 ml-20">Supporting document: {exp.file.name}</div>
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
                Adding your work experience helps clients understand your background and expertise. Include your most relevant roles and achievements.
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <Button variant="ghost" type="button" onClick={handleSkip}>Skip for now</Button>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNext} disabled={experience.length === 0}>Save & Next</Button>
      </footer>
    </div>
  );
};



export default Step3WorkExperience; 