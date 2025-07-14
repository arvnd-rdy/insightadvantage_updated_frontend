import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface WorkExperienceEntry {
  id?: number;
  title: string;
  company: string;
  city: string;
  country: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  description: string;
}

interface WorkExperienceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<WorkExperienceEntry>;
  onSave: (entry: WorkExperienceEntry) => void;
  mode: 'add' | 'edit';
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = Array.from({ length: 70 }, (_, i) => `${new Date().getFullYear() - i}`);

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({ open, onOpenChange, initialData, onSave, mode }) => {
  const [form, setForm] = useState<WorkExperienceEntry>({
    title: '',
    company: '',
    city: '',
    country: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isCurrent: false,
    description: '',
  });

  useEffect(() => {
    if (open) {
      setForm({
        title: initialData?.title || '',
        company: initialData?.company || '',
        city: initialData?.city || '',
        country: initialData?.country || '',
        startMonth: initialData?.startMonth || '',
        startYear: initialData?.startYear || '',
        endMonth: initialData?.endMonth || '',
        endYear: initialData?.endYear || '',
        isCurrent: initialData?.isCurrent || false,
        description: initialData?.description || '',
      });
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSave({ ...form });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-full p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{mode === 'edit' ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} required />
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
              id="isCurrent"
              checked={form.isCurrent}
              onChange={e => setForm(f => ({ ...f, isCurrent: e.target.checked, endMonth: '', endYear: '' }))}
            />
            <Label htmlFor="isCurrent">I am currently working in this role</Label>
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
                  required={!form.isCurrent}
                  disabled={form.isCurrent}
                >
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select
                  value={form.endYear}
                  onChange={e => setForm(f => ({ ...f, endYear: e.target.value }))}
                  className="border rounded-md px-2 py-2 w-1/2"
                  required={!form.isCurrent}
                  disabled={form.isCurrent}
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
              className="w-full border rounded-md px-3 py-2 text-base"
            />
          </div>
        </div>
        <DialogFooter className="mt-4 flex justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={handleSave}>{mode === 'edit' ? 'Save Changes' : 'Save'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkExperienceModal; 