import React, { useState, useEffect } from 'react';
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
import LicenseModal, { LicenseEntry } from '@/components/LicenseModal';

const Step7Licenses = () => {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState<LicenseEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalInitialData, setModalInitialData] = useState<Partial<LicenseEntry>>({});
  const [showRestrictionsFull, setShowRestrictionsFull] = useState<number | null>(null);

  // Check if user has regulated designations from Step 4
  const hasRegulatedDesignations = () => {
    // This would typically come from a global state or API
    // For now, we'll simulate this check
    const regulatedDesignations = ['OT', 'Reg Psychologist'];
    const userDesignations = localStorage.getItem('userDesignations');
    if (userDesignations) {
      const designations = JSON.parse(userDesignations);
      return designations.some((d: string) => regulatedDesignations.includes(d));
    }
    return false;
  };

  const requiresLicense = hasRegulatedDesignations();
  const canProceed = licenses.length > 0 || !requiresLicense;

  const openAddModal = () => {
    setModalMode('add');
    setModalInitialData({});
    setModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    setModalMode('edit');
    setModalInitialData(licenses[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleModalSave = (entry: LicenseEntry, file?: File | null) => {
    if (modalMode === 'edit' && editIndex !== null) {
      setLicenses(prev => prev.map((e, i) => i === editIndex ? { ...e, ...entry } : e));
    } else {
      setLicenses(prev => [...prev, { id: Date.now(), ...entry }]);
    }
    setModalOpen(false);
    setEditIndex(null);
  };

  const handleDelete = (idx: number) => {
    setLicenses((prev) => prev.filter((_, i) => i !== idx));
  };

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-6');
  const handleSkip = () => navigate('/onboarding/consultant/step-8');
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save licenses data to API
    navigate('/onboarding/consultant/step-8');
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">Step 7 of 9</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Add your professional licenses</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          List any professional licenses you hold. These help build trust with clients and show your qualifications.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* License list */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-semibold">Licenses</Label>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="secondary" onClick={openAddModal}>+ Add License</Button>
                </DialogTrigger>
                <LicenseModal
                  open={modalOpen}
                  onOpenChange={setModalOpen}
                  initialData={modalInitialData}
                  onSave={handleModalSave}
                  mode={modalMode}
                />
              </Dialog>
            </div>
            <div className="flex flex-col gap-4">
              {licenses.length === 0 ? (
                <div className="text-gray-500 text-center py-12 w-full border rounded-lg bg-gray-50">
                  <div className="mb-2">
                    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm">If you hold any professional licenses, add them here to satisfy regulatory requirements.</p>
                </div>
              ) : (
                licenses.map((lic, idx) => {
                  const restrictionsLimit = 120;
                  return (
                    <div key={lic.id} className="flex w-full bg-white rounded-xl shadow-md p-6 mb-4 items-start border border-gray-100 hover:shadow-lg transition-shadow relative">
                      {/* Icon/Avatar */}
                      <div className="w-16 h-16 flex-shrink-0 mr-6">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
                          <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6l4 2' /></svg>
                        </div>
                      </div>
                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold truncate">{lic.name}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={e => { e.stopPropagation(); openEditModal(idx); }}
                              className="p-1 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                              title="Edit"
                              aria-label="Edit license"
                              type="button"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.415 1.415-4.243a4 4 0 01.828-1.414z" /></svg>
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); handleDelete(idx); }}
                              className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                              title="Delete"
                              aria-label="Delete license"
                              type="button"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        </div>
                        <div className="text-gray-600 font-medium mt-1 truncate">{lic.body}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {lic.number && <>License #: {lic.number} | </>}
                          {lic.issueMonth && lic.issueYear && <>Issued: {lic.issueMonth} {lic.issueYear} </>}
                          {lic.expiryMonth && lic.expiryYear && <>| Expires: {lic.expiryMonth} {lic.expiryYear}</>}
                          {lic.noExpiration && <>| No Expiration</>}
                        </div>
                        {lic.jurisdiction && (
                          <div className="text-sm text-gray-500">Jurisdiction: {lic.jurisdiction}</div>
                        )}
                        {lic.url && (
                          <div className="text-sm text-blue-600 underline truncate">
                            <a href={lic.url} target="_blank" rel="noopener noreferrer">View Credential</a>
                          </div>
                        )}
                        {lic.restrictions && (
                          <div className="mt-2 text-gray-700 text-sm">
                            {showRestrictionsFull === idx || lic.restrictions.length <= restrictionsLimit
                              ? lic.restrictions
                              : lic.restrictions.slice(0, restrictionsLimit) + '...'}
                            {lic.restrictions.length > restrictionsLimit && (
                              <button 
                                className="ml-2 text-blue-500 text-xs underline" 
                                onClick={() => setShowRestrictionsFull(showRestrictionsFull === idx ? null : idx)} 
                                type="button"
                              >
                                {showRestrictionsFull === idx ? 'See less' : 'See more'}
                              </button>
                            )}
                          </div>
                        )}
                        {lic.fileName && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="text-gray-700 text-sm">Document: {lic.fileName}</div>
                            {lic.filePreview && (
                              <div className="w-8 h-8 rounded border overflow-hidden">
                                <img src={lic.filePreview} alt="Document preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
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
                Adding your licenses helps clients verify your qualifications and trust your expertise.
              </div>
              {requiresLicense && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                  <strong>Note:</strong> You have regulated designations that require professional licenses for verification.
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <Button variant="ghost" type="button" onClick={handleSkip}>Skip for Now</Button>
        <Button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700 text-white" 
          onClick={handleNext}
          disabled={!canProceed}
        >
          Save & Next
        </Button>
      </footer>
    </div>
  );
};

export default Step7Licenses;