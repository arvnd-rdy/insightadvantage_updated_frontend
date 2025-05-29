
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { File, Upload, X, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploaderProps {
  documentType: string;
  acceptedFormats?: string;
  maxSizeMB?: number;
  onUploadComplete?: (file: File) => void;
}

const DocumentUploader = ({
  documentType,
  acceptedFormats = ".pdf,.doc,.docx",
  maxSizeMB = 5,
  onUploadComplete
}: DocumentUploaderProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Check file size
    if (selectedFile.size > maxSizeBytes) {
      toast({
        title: 'File too large',
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: 'destructive'
      });
      return;
    }
    
    setFile(selectedFile);
    setStatus('idle');
  };

  const handleUpload = () => {
    if (!file) return;
    
    setStatus('uploading');
    
    // Simulate upload progress
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 5;
      setProgress(uploadProgress);
      
      if (uploadProgress >= 100) {
        clearInterval(interval);
        setStatus('success');
        if (onUploadComplete) {
          onUploadComplete(file);
        }
        toast({
          title: 'Upload Complete',
          description: 'Your document was uploaded successfully',
        });
      }
    }, 100);
  };

  const handleCancel = () => {
    setFile(null);
    setProgress(0);
    setStatus('idle');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Upload {documentType}</h3>
      
      {!file ? (
        <>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <Upload className="h-10 w-10 mb-3 mx-auto text-gray-400" />
            <p className="text-gray-600 mb-2">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {acceptedFormats} files up to {maxSizeMB}MB
            </p>
            <div className="flex justify-center">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Input 
                  id="file-upload"
                  type="file"
                  accept={acceptedFormats}
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <Button type="button" variant="outline">
                  Select File
                </Button>
              </Label>
            </div>
          </div>
        </>
      ) : (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <File className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button 
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {status === 'uploading' && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500">Uploading... {progress}%</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="flex items-center text-green-600">
              <Check size={18} className="mr-2" />
              <span>Upload complete</span>
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertTriangle size={18} className="mr-2" />
              <span>Upload failed. Please try again.</span>
            </div>
          )}
        </div>
      )}
      
      {file && status === 'idle' && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
