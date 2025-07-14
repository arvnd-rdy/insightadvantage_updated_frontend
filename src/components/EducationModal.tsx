import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

export interface EducationEntry {
  id?: number;
  degree: string;
  institution: string;
  city: string;
  country: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentlyStudying: boolean;
  description: string;
}

interface EducationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<EducationEntry>;
  onSave: (data: EducationEntry) => void;
  mode: 'add' | 'edit';
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = Array.from({ length: 70 }, (_, i) => `${new Date().getFullYear() - i}`);

const EducationModal: React.FC<EducationModalProps> = ({ open, onOpenChange, initialData, onSave, mode }) => {
  const [form, setForm] = useState<EducationEntry>({
    degree: '',
    institution: '',
    city: '',
    country: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    currentlyStudying: false,
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        degree: '',
        institution: '',
        city: '',
        country: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        currentlyStudying: false,
        description: '',
        ...initialData,
      });
    }
  }, [initialData, open]);

  const handleSave = () => {
    onSave({ ...form });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-full p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{mode === 'edit' ? 'Edit Education' : 'Add Education'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="degree">Degree Title</Label>
            <Input id="degree" value={form.degree} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} required />
          </div>
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))} required />
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
                  disabled={form.currentlyStudying}
                  required={!form.currentlyStudying}
                >
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select
                  value={form.endYear}
                  onChange={e => setForm(f => ({ ...f, endYear: e.target.value }))}
                  className="border rounded-md px-2 py-2 w-1/2"
                  disabled={form.currentlyStudying}
                  required={!form.currentlyStudying}
                >
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full border rounded-md px-2 py-2"
              placeholder="e.g. Focused on AI, ML, and software engineering."
            />
          </div>
        </div>
        <DialogFooter className="mt-4 flex justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={handleSave}>{mode === 'edit' ? 'Save Changes' : 'Save'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EducationModal; 