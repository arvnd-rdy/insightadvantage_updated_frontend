import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface PortfolioEntry {
  id?: number;
  title: string;
  projectType: string;
  client: string;
  dateCompleted: string; // ISO string or MM/YYYY
  description: string;
  role: string;
  skills: string[];
  file?: File | null;
  fileName?: string;
  externalLink: string;
  thumbnail?: File | null;
  thumbnailUrl?: string;
  visibility: 'public' | 'private';
  tags: string[];
}

interface PortfolioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<PortfolioEntry>;
  onSave: (entry: PortfolioEntry, file?: File | null, thumbnail?: File | null) => void;
  mode: 'add' | 'edit';
  allSkills?: string[];
}

const projectTypes = [
  'Case Study', 'Report', 'Training Deck', 'Video Demo', 'Presentation', 'App', 'Other',
];

const PortfolioModal: React.FC<PortfolioModalProps> = ({ open, onOpenChange, initialData, onSave, mode, allSkills = [] }) => {
  const [form, setForm] = useState<PortfolioEntry>({
    title: '',
    projectType: '',
    client: '',
    dateCompleted: '',
    description: '',
    role: '',
    skills: [],
    file: undefined,
    fileName: '',
    externalLink: '',
    thumbnail: undefined,
    thumbnailUrl: '',
    visibility: 'public',
    tags: [],
  });
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (open) {
      setForm({
        title: initialData?.title || '',
        projectType: initialData?.projectType || '',
        client: initialData?.client || '',
        dateCompleted: initialData?.dateCompleted || '',
        description: initialData?.description || '',
        role: initialData?.role || '',
        skills: initialData?.skills || [],
        file: undefined,
        fileName: initialData?.fileName || '',
        externalLink: initialData?.externalLink || '',
        thumbnail: undefined,
        thumbnailUrl: initialData?.thumbnailUrl || '',
        visibility: initialData?.visibility || 'public',
        tags: initialData?.tags || [],
      });
      setFile(null);
      setThumbnail(null);
      setTagInput('');
    }
  }, [open, initialData]);

  const handleSave = () => {
    let thumbnailUrl = form.thumbnailUrl;
    if (thumbnail && thumbnail instanceof File) {
      thumbnailUrl = URL.createObjectURL(thumbnail);
    }
    onSave({ ...form, fileName: file ? file.name : form.fileName, thumbnailUrl }, file, thumbnail);
    onOpenChange(false);
  };

  const handleSkillToggle = (skill: string) => {
    setForm(f => ({ ...f, skills: f.skills.includes(skill) ? f.skills.filter(s => s !== skill) : [...f.skills, skill] }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-2xl mb-4">{mode === 'edit' ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto px-8 pt-4 pb-2 flex-1" style={{ maxHeight: '60vh' }}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <select id="projectType" value={form.projectType} onChange={e => setForm(f => ({ ...f, projectType: e.target.value }))} className="border rounded-md px-2 py-2 w-full">
                <option value="">Select type</option>
                {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="client">Client / Employer</Label>
              <Input id="client" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="dateCompleted">Date Completed</Label>
              <Input id="dateCompleted" type="month" value={form.dateCompleted} onChange={e => setForm(f => ({ ...f, dateCompleted: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea id="description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} maxLength={300} className="w-full border rounded-md px-3 py-2 text-base" />
              <div className="text-xs text-gray-400 text-right">{form.description.length}/300</div>
            </div>
            <div>
              <Label htmlFor="role">Role & Responsibilities</Label>
              <textarea id="role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} rows={2} className="w-full border rounded-md px-3 py-2 text-base" />
            </div>
            <div>
              <Label>Skills / Services Used</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className={`px-2 py-1 rounded-full border text-xs ${form.skills.includes(skill) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="file">File Upload</Label>
              <input
                id="file"
                type="file"
                accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {file && <div className="text-xs text-gray-600 mt-1">Selected: {file.name}</div>}
            </div>
            <div>
              <Label htmlFor="externalLink">External Link</Label>
              <Input id="externalLink" value={form.externalLink} onChange={e => setForm(f => ({ ...f, externalLink: e.target.value }))} type="url" />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={e => setThumbnail(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {thumbnail && <div className="text-xs text-gray-600 mt-1">Selected: {thumbnail.name}</div>}
            </div>
            <div>
              <Label>Visibility</Label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input type="radio" name="visibility" value="public" checked={form.visibility === 'public'} onChange={() => setForm(f => ({ ...f, visibility: 'public' }))} />
                  Public
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="visibility" value="private" checked={form.visibility === 'private'} onChange={() => setForm(f => ({ ...f, visibility: 'private' }))} />
                  Private
                </label>
              </div>
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {form.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 rounded-full px-2 py-0.5 text-xs flex items-center gap-1">
                    {tag}
                    <button type="button" className="ml-1 text-gray-500 hover:text-red-500" onClick={() => handleTagRemove(tag)}>&times;</button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleTagAdd(); } }}
                  className="border rounded-md px-2 py-1 text-xs w-24"
                  placeholder="Add tag"
                />
                <Button type="button" size="sm" variant="outline" className="px-2 py-0.5 text-xs" onClick={handleTagAdd}>Add</Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="p-8 pt-0 flex justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={handleSave}>{mode === 'edit' ? 'Save Changes' : 'Save'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal; 