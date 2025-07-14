import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';

const STEP_CONFIG = [
  { key: 'personal', label: 'Personal Details' },
  { key: 'education', label: 'Education' },
  { key: 'work', label: 'Work Experience' },
  { key: 'bio', label: 'Bio & Title' },
  { key: 'skills', label: 'Skills & Services' },
  { key: 'certs', label: 'Certifications' },
  { key: 'licenses', label: 'Licenses' },
  { key: 'prefs', label: 'Preferences & Pricing' },
];

const STEP_ROUTES = [
  '/onboarding/consultant/step-1',
  '/onboarding/consultant/step-2',
  '/onboarding/consultant/step-3',
  '/onboarding/consultant/step-4',
  '/onboarding/consultant/step-5',
  '/onboarding/consultant/step-6',
  '/onboarding/consultant/step-7',
  '/onboarding/consultant/step-8',
];

const getDraft = () => {
  // Simulate fetching from localStorage
  try {
    const data = localStorage.getItem('onboardingDraft');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const isStepComplete = (stepKey, draft) => {
  // Simulate required field check for each step
  switch (stepKey) {
    case 'personal': return draft.personal && draft.personal.name;
    case 'education': return draft.education && draft.education.length > 0;
    case 'work': return draft.work && draft.work.length > 0;
    case 'bio': return draft.bio && draft.bio.title;
    case 'skills': return draft.skills && draft.skills.length > 0;
    case 'certs': return draft.certs && draft.certs.length > 0;
    case 'licenses': return draft.licenses && draft.licenses.length > 0;
    case 'prefs': return draft.prefs && draft.prefs.workType;
    default: return false;
  }
};

const getStepSummary = (stepKey, draft) => {
  // Simulate summary text for each step
  switch (stepKey) {
    case 'personal': return draft.personal ? `${draft.personal.name}, ${draft.personal.city} • ${draft.personal.languages?.length || 0} languages selected` : 'No details';
    case 'education': return draft.education ? `${draft.education.length} entr${draft.education.length === 1 ? 'y' : 'ies'}` : 'No entries';
    case 'work': return draft.work ? `${draft.work.length} roles, latest: ${draft.work[0]?.title || ''}` : 'No roles';
    case 'bio': return draft.bio ? `${draft.bio.title}, ${draft.bio.degrees?.join(', ')}` : 'No bio';
    case 'skills': return draft.skills ? draft.skills.join(', ') : 'No skills';
    case 'certs': return draft.certs ? `${draft.certs.length} cert${draft.certs.length === 1 ? '' : 's'}` : 'No certs';
    case 'licenses': return draft.licenses ? `${draft.licenses[0]?.type || ''} #${draft.licenses[0]?.number || ''} (exp. ${draft.licenses[0]?.expiry || 'N/A'})` : 'No licenses';
    case 'prefs': return draft.prefs ? `${draft.prefs.pricingType}: $${draft.prefs.rate}/${draft.prefs.pricingType === 'Hourly' ? 'hr' : draft.prefs.pricingType === 'Monthly' ? 'mo' : ''} • ${draft.prefs.workMode?.join(', ')} • ${draft.prefs.payment?.join(', ')}` : 'No preferences';
    default: return '';
  }
};

const getStepDetails = (stepKey, draft) => {
  // Simulate label-value pairs for each step
  switch (stepKey) {
    case 'personal':
      return draft.personal ? Object.entries(draft.personal).map(([k, v]) => [k, v]) : [];
    case 'education':
      return draft.education ? draft.education.map((e, i) => [`Entry ${i + 1}`, `${e.degree}, ${e.institution} (${e.year})`]) : [];
    case 'work':
      return draft.work ? draft.work.map((w, i) => [`Role ${i + 1}`, `${w.title} at ${w.org} (${w.years})`]) : [];
    case 'bio':
      return draft.bio ? Object.entries(draft.bio).map(([k, v]) => [k, v]) : [];
    case 'skills':
      return draft.skills ? draft.skills.map((s, i) => [`Skill ${i + 1}`, s]) : [];
    case 'certs':
      return draft.certs ? draft.certs.map((c, i) => [`Cert ${i + 1}`, `${c.name} (${c.years})`]) : [];
    case 'licenses':
      return draft.licenses ? draft.licenses.map((l, i) => [`License ${i + 1}`, `${l.type} #${l.number} (exp. ${l.expiry})`]) : [];
    case 'prefs':
      return draft.prefs ? Object.entries(draft.prefs).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v]) : [];
    default:
      return [];
  }
};

const Step9Review = () => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState({});
  const [openPanel, setOpenPanel] = useState('personal');
  const [missingSteps, setMissingSteps] = useState([]);

  useEffect(() => {
    // Autosave: fetch draft on load
    const d = getDraft();
    setDraft(d);
    // Check for missing steps
    const missing = STEP_CONFIG.filter(s => !isStepComplete(s.key, d)).map(s => s.label);
    setMissingSteps(missing);
  }, []);

  const handleEdit = (idx) => {
    navigate(STEP_ROUTES[idx]);
  };

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-8');
  const handleNext = (e) => {
    e.preventDefault();
    // TODO: Save review/submit via API
    navigate('/onboarding/consultant/step-10');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">Step 9 of 9</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Review your information</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          Everything look good? Review your information below. You can expand each section to make changes before continuing.
        </p>
      </header>
      {/* Warning banner for missing steps */}
      {missingSteps.length > 0 && (
        <Alert variant="destructive" className="max-w-2xl mx-auto mb-4">
          <strong>You have missing information in: {missingSteps.join(', ')}.</strong> Profiles with missing data may be less discoverable.
        </Alert>
      )}
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Accordion summary */}
          <div className="flex-1">
            <Accordion type="single" collapsible value={openPanel} onValueChange={setOpenPanel} className="w-full">
              {STEP_CONFIG.map((step, idx) => (
                <AccordionItem key={step.key} value={step.key}>
                  <AccordionTrigger className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{idx + 1}. {step.label}</span>
                      <span className="text-xs text-gray-500 ml-2">{getStepSummary(step.key, draft)}</span>
                    </div>
                    <button
                      type="button"
                      className="ml-2 p-1 rounded hover:bg-gray-100"
                      title="Edit"
                      onClick={e => { e.stopPropagation(); handleEdit(idx); }}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.415 1.415-4.243a4 4 0 01.828-1.414z" /></svg>
                    </button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-gray-50 rounded">
                      {getStepDetails(step.key, draft).length === 0 ? (
                        <div className="text-gray-400 text-sm">No data entered for this step.</div>
                      ) : (
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          {getStepDetails(step.key, draft).map(([label, value], i) => (
                            <React.Fragment key={i}>
                              <dt className="font-medium text-gray-700">{label}</dt>
                              <dd className="text-gray-900">{value}</dd>
                            </React.Fragment>
                          ))}
                        </dl>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* Right-side tip card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <div className="font-semibold text-sm mb-2">Pro Tip</div>
              <div className="text-gray-700 text-sm">
                Double-check your information for accuracy. A complete and accurate profile increases your chances of getting noticed by clients!
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <span></span>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNext}>Save & Continue to Verification</Button>
      </footer>
    </div>
  );
};

export default Step9Review; 