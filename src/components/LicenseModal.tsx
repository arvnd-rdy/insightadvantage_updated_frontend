import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export interface LicenseEntry {
  id?: number;
  name: string;
  body: string;
  number: string;
  issueMonth: string;
  issueYear: string;
  expiryMonth: string;
  expiryYear: string;
  jurisdiction: string;
  restrictions: string;
  url?: string;
  fileName?: string;
  noExpiration?: boolean;
  filePreview?: string;
}

interface LicenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<LicenseEntry>;
  onSave: (entry: LicenseEntry, file?: File | null) => void;
  mode: 'add' | 'edit';
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`);

const LicenseModal: React.FC<LicenseModalProps> = ({ open, onOpenChange, initialData, onSave, mode }) => {
  const [form, setForm] = useState<LicenseEntry>({
    name: '',
    body: '',
    number: '',
    issueMonth: '',
    issueYear: '',
    expiryMonth: '',
    expiryYear: '',
    jurisdiction: '',
    restrictions: '',
    url: '',
    fileName: '',
    noExpiration: false,
    filePreview: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState<string>('');

  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name || '',
        body: initialData?.body || '',
        number: initialData?.number || '',
        issueMonth: initialData?.issueMonth || '',
        issueYear: initialData?.issueYear || '',
        expiryMonth: initialData?.expiryMonth || '',
        expiryYear: initialData?.expiryYear || '',
        jurisdiction: initialData?.jurisdiction || '',
        restrictions: initialData?.restrictions || '',
        url: initialData?.url || '',
        fileName: initialData?.fileName || '',
        noExpiration: initialData?.noExpiration || false,
        filePreview: initialData?.filePreview || '',
      });
      setFile(null);
      setErrors({});
      setFileError('');
    }
  }, [open, initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = 'License name is required';
    }

    if (!form.body.trim()) {
      newErrors.body = 'Issuing authority is required';
    }

    if (!form.number.trim()) {
      newErrors.number = 'License number is required for professional licenses to verify your registration';
    }

    if (!form.issueMonth || !form.issueYear) {
      newErrors.issueDate = 'Issue date is required';
    }

    if (!form.noExpiration && (!form.expiryMonth || !form.expiryYear)) {
      newErrors.expiryDate = 'Expiry date is required unless "No Expiration" is checked';
    }

    if (!form.jurisdiction.trim()) {
      newErrors.jurisdiction = 'Jurisdiction is required';
    }

    if (form.url && !isValidUrl(form.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError('');

    if (selectedFile) {
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError('File size must be less than 10MB');
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setFileError('Please upload a PDF or image file (JPEG, PNG, GIF)');
        return;
      }

      setFile(selectedFile);

      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setForm(prev => ({ ...prev, filePreview: e.target?.result as string }));
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setForm(prev => ({ ...prev, filePreview: '' }));
      }
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    if (fileError) {
      return;
    }

    const entryToSave = {
      ...form,
      fileName: file ? file.name : form.fileName,
    };

    onSave(entryToSave, file);
    onOpenChange(false);
  };

  const handleNoExpirationChange = (checked: boolean) => {
    setForm(prev => ({ 
      ...prev, 
      noExpiration: checked,
      expiryMonth: checked ? '' : prev.expiryMonth,
      expiryYear: checked ? '' : prev.expiryYear
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-0">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-2xl mb-4">{mode === 'edit' ? 'Edit License' : 'Add License'}</DialogTitle>
        </DialogHeader>
        <div className="p-8 pt-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">License Name *</Label>
              <Input 
                id="name" 
                value={form.name} 
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                placeholder="e.g. Occupational Therapist (OT)"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="body">Issuing Authority *</Label>
              <Input 
                id="body" 
                value={form.body} 
                onChange={e => setForm(f => ({ ...f, body: e.target.value }))} 
                placeholder="e.g. College of Occupational Therapists of Ontario"
                className={errors.body ? 'border-red-500' : ''}
              />
              {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
            </div>

            <div>
              <Label htmlFor="number">License Number *</Label>
              <Input 
                id="number" 
                value={form.number} 
                onChange={e => setForm(f => ({ ...f, number: e.target.value }))} 
                placeholder="e.g. #123456"
                className={errors.number ? 'border-red-500' : ''}
              />
              <p className="text-gray-600 text-xs mt-1">Required for professional licenses to verify your registration.</p>
              {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Issue Date *</Label>
                <div className="flex gap-2">
                  <select 
                    value={form.issueMonth} 
                    onChange={e => setForm(f => ({ ...f, issueMonth: e.target.value }))} 
                    className={`border rounded-md px-2 py-2 w-1/2 ${errors.issueDate ? 'border-red-500' : ''}`}
                  >
                    <option value="">Month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select 
                    value={form.issueYear} 
                    onChange={e => setForm(f => ({ ...f, issueYear: e.target.value }))} 
                    className={`border rounded-md px-2 py-2 w-1/2 ${errors.issueDate ? 'border-red-500' : ''}`}
                  >
                    <option value="">Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
              </div>
              <div className="flex-1">
                <Label>Expiry Date</Label>
                <div className="flex gap-2">
                  <select 
                    value={form.expiryMonth} 
                    onChange={e => setForm(f => ({ ...f, expiryMonth: e.target.value }))} 
                    className={`border rounded-md px-2 py-2 w-1/2 ${errors.expiryDate ? 'border-red-500' : ''} ${form.noExpiration ? 'opacity-50' : ''}`}
                    disabled={form.noExpiration}
                  >
                    <option value="">Month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select 
                    value={form.expiryYear} 
                    onChange={e => setForm(f => ({ ...f, expiryYear: e.target.value }))} 
                    className={`border rounded-md px-2 py-2 w-1/2 ${errors.expiryDate ? 'border-red-500' : ''} ${form.noExpiration ? 'opacity-50' : ''}`}
                    disabled={form.noExpiration}
                  >
                    <option value="">Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noExpiration" 
                checked={form.noExpiration} 
                onCheckedChange={handleNoExpirationChange}
              />
              <Label htmlFor="noExpiration" className="text-sm">No Expiration</Label>
            </div>

            <div>
              <Label htmlFor="jurisdiction">Jurisdiction *</Label>
              <Input 
                id="jurisdiction" 
                value={form.jurisdiction} 
                onChange={e => setForm(f => ({ ...f, jurisdiction: e.target.value }))} 
                placeholder="e.g. Ontario, Canada"
                className={errors.jurisdiction ? 'border-red-500' : ''}
              />
              {errors.jurisdiction && <p className="text-red-500 text-sm mt-1">{errors.jurisdiction}</p>}
            </div>

            <div>
              <Label htmlFor="url">Credential URL</Label>
              <Input 
                id="url" 
                value={form.url} 
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))} 
                placeholder="https://..."
                className={errors.url ? 'border-red-500' : ''}
              />
              <p className="text-gray-600 text-xs mt-1">Paste a link to your license verification page if your board provides one (optional).</p>
              {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
            </div>

            <div>
              <Label htmlFor="licenseFile">Document Upload</Label>
              <input
                id="licenseFile"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {file && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-xs text-gray-600">Selected: {file.name}</div>
                  {form.filePreview && (
                    <div className="w-8 h-8 rounded border overflow-hidden">
                      <img src={form.filePreview} alt="Document preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
              {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
              <p className="text-gray-600 text-xs mt-1">PDF or image up to 10MB</p>
            </div>

            <div>
              <Label htmlFor="restrictions">Restrictions / Notes</Label>
              <textarea
                id="restrictions"
                value={form.restrictions}
                onChange={e => setForm(f => ({ ...f, restrictions: e.target.value }))}
                rows={2}
                className="w-full border rounded-md px-2 py-2"
                placeholder="e.g. Supervision required"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4 flex justify-between px-8 pb-8">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={handleSave}>
            {mode === 'edit' ? 'Save Changes' : 'Save License'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseModal; 