import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface CertificationEntry {
  id?: number;
  name: string;
  body: string;
  issueMonth: string;
  issueYear: string;
  expirationMonth: string;
  expirationYear: string;
  credentialId: string;
  url: string;
  description: string;
  fileName?: string;
}

interface CertificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<CertificationEntry>;
  onSave: (entry: CertificationEntry, file?: File | null) => void;
  mode: 'add' | 'edit';
  existingCerts?: { name: string; body: string }[];
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`);

interface CertificationErrors {
  name?: string;
  body?: string;
  issueMonth?: string;
  issueYear?: string;
  expiration?: string;
  url?: string;
  file?: string;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ open, onOpenChange, initialData, onSave, mode, existingCerts }) => {
  const [form, setForm] = useState<CertificationEntry>({
    name: '',
    body: '',
    issueMonth: '',
    issueYear: '',
    expirationMonth: '',
    expirationYear: '',
    credentialId: '',
    url: '',
    description: '',
    fileName: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [noExpiration, setNoExpiration] = useState(false);
  const [errors, setErrors] = useState<CertificationErrors>({});
  const [duplicateWarning, setDuplicateWarning] = useState('');

  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name || '',
        body: initialData?.body || '',
        issueMonth: initialData?.issueMonth || '',
        issueYear: initialData?.issueYear || '',
        expirationMonth: initialData?.expirationMonth || '',
        expirationYear: initialData?.expirationYear || '',
        credentialId: initialData?.credentialId || '',
        url: initialData?.url || '',
        description: initialData?.description || '',
        fileName: initialData?.fileName || '',
      });
      setFile(null);
      setNoExpiration(false);
      setErrors({});
      setDuplicateWarning('');
    }
  }, [open, initialData]);

  // Inline validation
  const validate = () => {
    const errs: CertificationErrors = {};
    if (!form.name) errs.name = 'Certification name is required';
    if (!form.body) errs.body = 'Issuing body is required';
    if (!form.issueMonth) errs.issueMonth = 'Issue month required';
    if (!form.issueYear) errs.issueYear = 'Issue year required';
    if (!noExpiration && (form.expirationMonth || form.expirationYear) && (!form.expirationMonth || !form.expirationYear)) {
      errs.expiration = 'Both month and year required or check No Expiration';
    }
    if (form.url && !/^https?:\/\/.+/.test(form.url)) errs.url = 'Must be a valid URL';
    if (file && file.size > 10 * 1024 * 1024) errs.file = 'File must be less than 10MB';
    if (file && !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) errs.file = 'Only PDF, JPG, or PNG allowed';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Duplicate detection
  function checkDuplicate() {
    if (form.name && form.body && Array.isArray(existingCerts)) {
      if (existingCerts.some(c => c.name === form.name && c.body === form.body)) {
        setDuplicateWarning('This certification and issuing body already exist.');
        return true;
      }
    }
    setDuplicateWarning('');
    return false;
  }

  const handleSave = () => {
    if (!validate() || checkDuplicate()) return;
    onSave({ ...form, fileName: file ? file.name : form.fileName }, file);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-full p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{mode === 'edit' ? 'Edit Certification' : 'Add Certification'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Certification Name</Label>
            <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onBlur={validate} required />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>
          <div>
            <Label htmlFor="body">Issuing Body</Label>
            <Input id="body" value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} onBlur={validate} required />
            {errors.body && <div className="text-red-500 text-xs mt-1">{errors.body}</div>}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label>Issue Date</Label>
              <div className="flex gap-2">
                <select value={form.issueMonth} onChange={e => setForm(f => ({ ...f, issueMonth: e.target.value }))} className="border rounded-md px-2 py-2 w-1/2" required>
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={form.issueYear} onChange={e => setForm(f => ({ ...f, issueYear: e.target.value }))} className="border rounded-md px-2 py-2 w-1/2" required>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              {(errors.issueMonth || errors.issueYear) && <div className="text-red-500 text-xs mt-1">{errors.issueMonth || errors.issueYear}</div>}
            </div>
            <div className="flex-1">
              <Label>Expiration Date (optional)</Label>
              <div className="flex gap-2 items-center">
                <select value={form.expirationMonth} onChange={e => setForm(f => ({ ...f, expirationMonth: e.target.value }))} className="border rounded-md px-2 py-2 w-1/2" disabled={noExpiration}>
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={form.expirationYear} onChange={e => setForm(f => ({ ...f, expirationYear: e.target.value }))} className="border rounded-md px-2 py-2 w-1/2" disabled={noExpiration}>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <label className="ml-2 flex items-center gap-1 text-xs">
                  <input type="checkbox" checked={noExpiration} onChange={e => setNoExpiration(e.target.checked)} /> No Expiration
                </label>
              </div>
              {errors.expiration && <div className="text-red-500 text-xs mt-1">{errors.expiration}</div>}
            </div>
          </div>
          <div>
            <Label htmlFor="credentialId">Credential ID</Label>
            <Input id="credentialId" value={form.credentialId} onChange={e => setForm(f => ({ ...f, credentialId: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="url">Credential URL</Label>
            <Input id="url" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} onBlur={validate} />
            <div className="text-xs text-gray-500 mt-1">If your certification can be verified online, paste the link here (optional).</div>
            {errors.url && <div className="text-red-500 text-xs mt-1">{errors.url}</div>}
          </div>
          <div>
            <Label htmlFor="certificateFile">Certificate File (Image or PDF, optional)</Label>
            <input
              id="certificateFile"
              type="file"
              accept="image/*,application/pdf"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="text-xs text-gray-500 mt-1">Upload a scan or photo of your certificate for admin review (optional).</div>
            {file && (
              <div className="text-xs text-gray-600 mt-1">Selected: {file.name}
                {file.type.startsWith('image/') && (
                  <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 max-h-24 rounded border" />
                )}
                {file.type === 'application/pdf' && (
                  <span className="ml-2">(PDF file)</span>
                )}
              </div>
            )}
            {errors.file && <div className="text-red-500 text-xs mt-1">{errors.file}</div>}
          </div>
          <div>
            <Label htmlFor="description">Description / Scope (optional)</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-base"
            />
          </div>
          {duplicateWarning && <div className="text-red-500 text-xs mt-2">{duplicateWarning}</div>}
        </div>
        <DialogFooter className="mt-6 flex justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={handleSave}>{mode === 'edit' ? 'Save Changes' : 'Save'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationModal;