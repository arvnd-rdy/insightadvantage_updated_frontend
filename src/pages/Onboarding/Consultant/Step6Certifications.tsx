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
import CertificationCard from '@/components/CertificationCard';
import CertificationModal, { CertificationEntry } from '@/components/CertificationModal';

const Step6Certifications = () => {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState<CertificationEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalInitialData, setModalInitialData] = useState<Partial<CertificationEntry>>({});

  const openAddModal = () => {
    setModalMode('add');
    setModalInitialData({});
    setModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    setModalMode('edit');
    setModalInitialData(certifications[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleModalSave = (entry: CertificationEntry, file?: File | null) => {
    if (modalMode === 'edit' && editIndex !== null) {
      setCertifications(prev => prev.map((e, i) => i === editIndex ? { ...e, ...entry } : e));
    } else {
      setCertifications(prev => [...prev, { id: Date.now(), ...entry }]);
    }
    setModalOpen(false);
    setEditIndex(null);
  };

  const handleDelete = (idx: number) => {
    setCertifications((prev) => prev.filter((_, i) => i !== idx));
  };

  // Navigation handlers
  const handleBack = () => navigate('/onboarding/consultant/step-5');
  const handleSkip = () => navigate('/onboarding/consultant/step-7');
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save certifications data
    navigate('/onboarding/consultant/step-7');
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
        <div className="text-sm text-gray-500 mb-2">Step 6 of 9</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Add your professional certifications</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          List any certifications you have. These help build trust with clients and show your expertise.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Certification list */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-semibold">Certifications</Label>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="secondary" onClick={openAddModal}>Add Certification</Button>
                </DialogTrigger>
                <CertificationModal
                  open={modalOpen}
                  onOpenChange={setModalOpen}
                  initialData={modalInitialData}
                  onSave={handleModalSave}
                  mode={modalMode}
                  existingCerts={certifications.map(c => ({ name: c.name, body: c.body }))}
                />
              </Dialog>
            </div>
            {/* Render certification cards */}
            {certifications.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-gray-400 text-center">Add any certificates you hold to boost your credibility.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {certifications.map((cert, idx) => (
                  <CertificationCard
                    key={cert.id}
                    name={cert.name}
                    body={cert.body}
                    issueMonth={cert.issueMonth}
                    issueYear={cert.issueYear}
                    expirationMonth={cert.expirationMonth}
                    expirationYear={cert.expirationYear}
                    credentialId={cert.credentialId}
                    url={cert.url}
                    description={cert.description}
                    // fileUrl={cert.fileUrl} // Add this if you implement file upload logic
                    onEdit={() => openEditModal(idx)}
                    onDelete={() => handleDelete(idx)}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Right-side tip card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <div className="font-semibold text-sm mb-2">Pro Tip</div>
              <div className="text-gray-700 text-sm">
                Certifications help build trust and show your expertise. Add any relevant certifications to stand out!
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <Button variant="ghost" type="button" onClick={handleSkip}>Skip for now</Button>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNext} disabled={certifications.length === 0}>Save & Next</Button>
      </footer>
    </div>
  );
};

export default Step6Certifications; 