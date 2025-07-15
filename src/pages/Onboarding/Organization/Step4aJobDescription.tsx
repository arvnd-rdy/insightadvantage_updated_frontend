import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Trash2, Paperclip } from 'lucide-react';

const Step4aJobDescription = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!jobTitle.trim() || jobTitle.length < 5 || jobTitle.length > 100) {
      newErrors.jobTitle = 'Job title must be between 5 and 100 characters.';
    }
    if (!description.trim() || description.length < 50 || description.length > 5000) {
      newErrors.description = 'Description must be between 50 and 5000 characters.';
    }
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      setBanner('Some files were rejected. Only PDF, DOC, DOCX, TXT, JPG, PNG files ≤10MB are allowed.');
    } else {
      setBanner('');
    }
    
    setAttachments(prev => [...prev, ...validFiles].slice(0, 5)); // Limit to 5 files
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload({ target: { files } } as any);
  };

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFooterError('');
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setFooterError('Please fill all required fields correctly to continue.');
      return;
    }
    setSubmitting(true);
    setBanner('');
    try {
      await new Promise(res => setTimeout(res, 1000));
      navigate('/onboarding/organization/step-4b');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => navigate('/onboarding/organization/step-4b');
  const handleBack = () => navigate('/onboarding/organization/step-3b');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Describe Your Project</h1>
            <p className="text-lg text-gray-600">Provide a detailed description and any relevant documents to attract the best consultants.</p>
          </div>

          <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-10">
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Project Details</h2>
              <div>
                <Label htmlFor="jobTitle" className="text-base font-medium text-gray-700">Project Title <span className="text-red-500">*</span></Label>
                <p className="mt-1 text-sm text-gray-500">Create a clear, descriptive title for your consulting need.</p>
                <Input id="jobTitle" type="text" placeholder="e.g., Senior Rehabilitation Consultant for Complex Cases" value={jobTitle} onChange={e => { setJobTitle(e.target.value); setErrors(prev => ({ ...prev, jobTitle: '' })); }} maxLength={100} required className="mt-2 text-base p-4"/>
                <p className="mt-2 text-sm text-gray-500 text-right">{jobTitle.length}/100</p>
                {errors.jobTitle && <p className="mt-2 text-sm text-red-600">{errors.jobTitle}</p>}
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium text-gray-700">Detailed Description <span className="text-red-500">*</span></Label>
                <p className="mt-1 text-sm text-gray-500">Describe the project, requirements, goals, and any specific challenges.</p>
                <Textarea id="description" placeholder="Provide a detailed overview of your needs..." value={description} onChange={e => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: '' })); }} rows={10} maxLength={5000} required className="mt-2 text-base p-4"/>
                <p className="mt-2 text-sm text-gray-500 text-right">{description.length}/5000</p>
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Supporting Documents</h2>
              <div>
                <Label htmlFor="attachments" className="text-base font-medium text-gray-700">Attachments</Label>
                <p className="mt-1 text-sm text-gray-500">Upload relevant documents like project briefs or specifications (up to 5 files, 10MB each).</p>
                <div
                  className="mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 text-center hover:border-blue-500 transition-colors"
                  onDrop={handleFileDrop} onDragOver={e => e.preventDefault()} onDragLeave={e => e.preventDefault()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">
                    <Button type="button" variant="link" className="font-medium text-blue-600" onClick={() => fileInputRef.current?.click()}>
                      Click to upload
                    </Button>
                    {' '}or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, TXT, JPG, PNG (max 10MB each)</p>
                  <input id="file-upload" type="file" className="sr-only" multiple accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" ref={fileInputRef} onChange={handleFileUpload} />
                </div>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-medium text-gray-700">Uploaded Files:</h3>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border bg-white p-3">
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-5 w-5 text-gray-500" />
                        <p className="font-medium text-sm text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500">({formatFileSize(file.size)})</p>
                      </div>
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeFile(index)} className="text-gray-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 w-full bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            </div>
            <div className="text-center">
              {footerError && <p className="text-sm font-medium text-red-600">{footerError}</p>}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleSkip} disabled={submitting}>
                Skip for Now
              </Button>
              <Button
                type="submit"
                form="onboarding-form"
                disabled={!isValid || submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {submitting ? 'Saving...' : 'Save & Next'}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Step4aJobDescription; 