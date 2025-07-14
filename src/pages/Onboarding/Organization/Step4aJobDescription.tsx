import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Upload, FileText, X, Download, Eye, Trash2, Plus } from 'lucide-react';

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

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!jobTitle.trim() || jobTitle.length < 5 || jobTitle.length > 100) {
      newErrors.jobTitle = 'Job title is required (5-100 characters).';
    }
    if (!description.trim() || description.length < 50 || description.length > 2000) {
      newErrors.description = 'Description is required (50-2000 characters).';
    }
    return newErrors;
  };
  const isValid = Object.keys(validate()).length === 0;

  // File upload handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      setBanner('Some files were rejected. Only PDF, DOC, DOCX, TXT, JPG, PNG files ≤10MB are allowed.');
    }
    
    setAttachments(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, attachments: '' }));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      setBanner('Some files were rejected. Only PDF, DOC, DOCX, TXT, JPG, PNG files ≤10MB are allowed.');
    }
    
    setAttachments(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, attachments: '' }));
  };

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('word') || file.type.includes('document')) return '📝';
    if (file.type.includes('text')) return '📄';
    if (file.type.includes('image')) return '🖼️';
    return '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Navigation
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

  const handleSkip = async () => {
    setSubmitting(true);
    setBanner('');
    try {
      await new Promise(res => setTimeout(res, 500));
      navigate('/onboarding/organization/step-4b');
    } catch {
      setBanner('There was a problem saving. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-3b');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b flex items-center h-16 px-6">
        <div className="flex-1 flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-3" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-gray-500 text-sm font-medium">Step 3 of 7 <span className="ml-2">●●●<span className="text-gray-300">○○○○</span></span></div>
        </div>
        <div className="flex-1"></div>
      </header>

      {/* Banner */}
      {banner && <div className="bg-red-100 text-red-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow p-10 mt-8 mb-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Describe your project needs</h1>
          <p className="text-gray-500 text-center mb-8">Provide detailed information about what you're looking for to help consultants understand your requirements.</p>

          <div className="space-y-8">
            {/* Job Title */}
            <div>
              <Label htmlFor="jobTitle" className="text-base font-semibold">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-2">Create a clear, descriptive title for your consulting need.</div>
              <Input
                id="jobTitle"
                type="text"
                placeholder="e.g., Senior Rehabilitation Consultant for Workers' Compensation Cases"
                value={jobTitle}
                onChange={e => { setJobTitle(e.target.value); setErrors(prev => ({ ...prev, jobTitle: '' })); }}
                maxLength={100}
                required
              />
              <div className="text-xs text-gray-400 mt-1">{jobTitle.length}/100 characters</div>
              {errors.jobTitle && <div className="text-red-500 text-xs mt-1">{errors.jobTitle}</div>}
            </div>

            {/* Job Description */}
            <div>
              <Label htmlFor="description" className="text-base font-semibold">
                Detailed Description <span className="text-red-500">*</span>
              </Label>
              <div className="text-xs text-gray-500 mb-2">
                Describe your project, requirements, goals, and any specific challenges or constraints.
              </div>
              <Textarea
                id="description"
                placeholder="Describe your consulting needs in detail. Include:
• Project objectives and goals
• Specific requirements or qualifications needed
• Timeline and deadlines
• Any challenges or constraints
• Expected deliverables
• Background context"
                value={description}
                onChange={e => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: '' })); }}
                rows={12}
                maxLength={2000}
                required
                className="resize-none"
              />
              <div className="text-xs text-gray-400 mt-1">{description.length}/2000 characters</div>
              {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
            </div>

            {/* File Attachments */}
            <div>
              <Label className="text-base font-semibold">
                Supporting Documents
                <span className="ml-1 text-gray-400 cursor-pointer" title="Upload relevant documents like project briefs, specifications, or reference materials">ℹ️</span>
              </Label>
              <div className="text-xs text-gray-500 mb-2">
                Upload any relevant documents (PDF, DOC, DOCX, TXT, JPG, PNG) to help consultants understand your needs better.
              </div>

              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleFileDrop}
                onDragOver={e => e.preventDefault()}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <div className="text-gray-600 font-medium mb-1">Click to upload or drag files here</div>
                <div className="text-xs text-gray-400">PDF, DOC, DOCX, TXT, JPG, PNG files up to 10MB each</div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </div>

              {/* File List */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium text-gray-700">Uploaded Files ({attachments.length})</div>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getFileIcon(file)}</span>
                        <div>
                          <div className="font-medium text-sm">{file.name}</div>
                          <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex flex-col z-20 shadow">
        {footerError && <div className="text-red-500 text-center text-sm mb-2">{footerError}</div>}
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
          <Button type="button" variant="ghost" onClick={handleSkip} disabled={submitting}>Skip for Now</Button>
          <Button
            type="submit"
            className={isValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            disabled={!isValid || submitting}
            onClick={handleSubmit}
          >
            Save & Next
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Step4aJobDescription; 