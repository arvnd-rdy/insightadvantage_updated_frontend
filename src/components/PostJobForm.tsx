
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { CalendarIcon, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

import { Upload, FileText, X, Download, Eye, Trash2, Plus, Info, DollarSign, Shield, FileCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';

const formSchema = z.object({
  jobTitle: z.string().min(5, 'Job title must be at least 5 characters').max(100, 'Job title must be less than 100 characters'),
  jobType: z.string().min(1, 'Please select a job type'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000, 'Description must be less than 2000 characters'),
  requiredSkills: z.array(z.string()).min(1, 'Please select at least one required skill'),
  experienceLevel: z.string().min(1, 'Please select required experience level'),
  engagementType: z.string().min(1, 'Please select an engagement type'),
  workMode: z.string().min(1, 'Please select a work mode'),
  projectScope: z.string().min(1, 'Please select a project scope'),
  startDate: z.date({
    required_error: 'Project start date is required',
  }),
  endDate: z.date().optional(),
  applicationDeadline: z.date({
    required_error: 'Application deadline is required',
  }),
  teamSize: z.string().optional(),
  location: z.string().optional(),
  salaryType: z.string().min(1, 'Please select salary type'),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  currency: z.string().min(1, 'Please select a currency'),
  ndaRequired: z.boolean(),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  additionalTerms: z.string().optional(),
  contactPerson: z.string().min(1, 'Contact person is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(1, 'Contact phone is required'),
  communicationMethod: z.string().min(1, 'Please select preferred communication method'),
});

type FormData = z.infer<typeof formSchema>;

const PostJobForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ndaFileInputRef = useRef<HTMLInputElement>(null);

  const [selectedRequiredSkills, setSelectedRequiredSkills] = useState<string[]>([]);
  const [otherSkill, setOtherSkill] = useState('');
  const [showOtherSkillInput, setShowOtherSkillInput] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [ndaFile, setNdaFile] = useState<File | null>(null);
  const [ndaFilePreview, setNdaFilePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactPerson: 'Organization Recruiter',
      contactEmail: 'recruiter@example.com',
      contactPhone: '(555) 987-6543',
      communicationMethod: 'email',
      requiredSkills: [],
      ndaRequired: false,
      currency: 'CAD',
      paymentTerms: 'Net 30 days',
    },
  });

  const applicationDeadline = watch('applicationDeadline');
  const startDate = watch('startDate');
  const workMode = watch('workMode');
  const salaryType = watch('salaryType');

  const jobTypes = [
    'Transferable Skills Analysis', 'Vocational Evaluation', 'Psycho Vocational Evaluation', 'Labour Market Survey',
    'Case Management', 'Job Development', 'Job Placement', 'Career Counselling', 'Return to Work Planning',
    'Disability Management', 'Functional Capacity Evaluation', 'Ergonomic Assessment', 'Medical-Legal Assessment',
    'Expert Testimony', 'Workplace Accommodation', 'Rehabilitation Planning', 'Life Care Planning', 'Coaching', 'Other'
  ];

  const REQUIRED_SKILLS = [
    'Transferable Skills Analysis', 'Vocational Evaluation', 'Psycho Vocational Evaluation', 'Labour Market Survey',
    'Case Management', 'Job Development', 'Job Placement', 'Career Counselling', 'Return to Work Planning',
    'Disability Management', 'Functional Capacity Evaluation', 'Ergonomic Assessment', 'Medical-Legal Assessment',
    'Expert Testimony', 'Workplace Accommodation', 'Rehabilitation Planning', 'Life Care Planning', 'Coaching',
    'Workers Compensation', 'Insurance Claims', 'Legal Support', 'Medical Documentation', 'Assessment Tools',
    'Report Writing', 'Client Communication', 'Project Management', 'Data Analysis', 'Research Methods'
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level', desc: '1-3 years experience, suitable for basic tasks and support roles.' },
    { value: 'intermediate', label: 'Intermediate', desc: '3-7 years experience, can handle most standard projects independently.' },
    { value: 'senior', label: 'Senior Level', desc: '7+ years experience, expert-level skills for complex or high-stakes projects.' },
    { value: 'expert', label: 'Expert/Specialist', desc: '10+ years experience, recognized authority in specific areas.' }
  ];
  
  const engagementTypes = [
    { value: 'project', label: 'Project-based', desc: 'Specific project with defined scope and deliverables' },
    { value: 'ongoing', label: 'Ongoing Support', desc: 'Continuous support and consultation services' },
    { value: 'retainer', label: 'Retainer', desc: 'Regular availability for consultation and support' },
    { value: 'consultation', label: 'One-time Consultation', desc: 'Single consultation or assessment session' }
  ];

  const workModes = [
    { value: 'remote', label: 'Remote Only', icon: '🌐', desc: 'All work done remotely via video calls and online tools' },
    { value: 'onsite', label: 'On-site Only', icon: '🏢', desc: 'All work done at your location' },
    { value: 'hybrid', label: 'Hybrid', icon: '↔️', desc: 'Combination of remote and on-site work' },
    { value: 'flexible', label: 'Flexible', icon: '🎯', desc: 'Open to consultant\'s preferred work mode' }
  ];

  const projectScopes = [
    { value: 'small', label: 'Small Scope', desc: '1-2 weeks, simple tasks or assessments' },
    { value: 'medium', label: 'Medium Scope', desc: '2-8 weeks, standard projects with clear deliverables' },
    { value: 'large', label: 'Large Scope', desc: '2-6 months, complex projects requiring extensive work' },
    { value: 'enterprise', label: 'Enterprise', desc: '6+ months, major initiatives or ongoing programs' }
  ];

  const salaryTypesOptions = [
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'fixed', label: 'Fixed Project Fee' },
    { value: 'retainer', label: 'Monthly Retainer' },
    { value: 'milestone', label: 'Milestone-based' }
  ];

  const CURRENCIES = ['CAD', 'USD', 'EUR', 'GBP'];
  
  const communicationMethods = ['Email', 'Phone', 'Video Call', 'In-Person Meeting'];

  const handleSkillClick = (skill: string) => {
    if (skill === 'Other') {
      setShowOtherSkillInput(true);
      if (!selectedRequiredSkills.includes('Other')) {
        setSelectedRequiredSkills([...selectedRequiredSkills, 'Other']);
      }
    } else {
      setSelectedRequiredSkills(prev => 
        prev.includes(skill) 
          ? prev.filter(s => s !== skill) 
          : [...prev, skill]
      );
    }
    setValue('requiredSkills', selectedRequiredSkills);
  };

  const handleOtherSkillAdd = () => {
    if (otherSkill.trim()) {
      setSelectedRequiredSkills(prev => 
        prev.includes(otherSkill.trim()) 
          ? prev 
          : [...prev, otherSkill.trim()]
      );
      setOtherSkill('');
      setShowOtherSkillInput(false);
      setValue('requiredSkills', selectedRequiredSkills);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedRequiredSkills(prev => prev.filter(s => s !== skill));
    if (skill === 'Other') {
      setShowOtherSkillInput(false);
      setOtherSkill('');
    }
    setValue('requiredSkills', selectedRequiredSkills);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      toast({
        title: 'File Upload Warning',
        description: 'Some files were rejected. Only PDF, DOC, DOCX, TXT, JPG, PNG files ≤10MB are allowed.',
        variant: 'destructive',
      });
    }
    
    setAttachments(prev => [...prev, ...validFiles]);
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
      toast({
        title: 'File Upload Warning',
        description: 'Some files were rejected. Only PDF, DOC, DOCX, TXT, JPG, PNG files ≤10MB are allowed.',
        variant: 'destructive',
      });
    }
    
    setAttachments(prev => [...prev, ...validFiles]);
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

  const handleNdaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && file.size <= 5 * 1024 * 1024) {
      setNdaFile(file);
      setNdaFilePreview(URL.createObjectURL(file));
      setValue('ndaRequired', true);
    } else if (file) {
      toast({
        title: 'NDA File Upload Warning',
        description: 'Only PDF, DOC, DOCX files ≤5MB allowed.',
        variant: 'destructive',
      });
      setValue('ndaRequired', false);
    }
  };

  const handleNdaDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && file.size <= 5 * 1024 * 1024) {
      setNdaFile(file);
      setNdaFilePreview(URL.createObjectURL(file));
      setValue('ndaRequired', true);
    } else if (file) {
      toast({
        title: 'NDA File Upload Warning',
        description: 'Only PDF, DOC, DOCX files ≤5MB allowed.',
        variant: 'destructive',
      });
      setValue('ndaRequired', false);
    }
  };

  const removeNdaFile = () => {
    setNdaFile(null);
    setNdaFilePreview(null);
    if (ndaFilePreview) {
      URL.revokeObjectURL(ndaFilePreview);
    }
    setValue('ndaRequired', false);
  };


  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast({
      title: 'Job Posted Successfully!',
      description: 'Your job listing is now live and visible to candidates.',
    });
    // Here you would typically send the data to your backend
  };

  const handleSaveDraft = () => {
    const formData = watch();
    console.log('Saving draft:', formData);
    toast({
      title: 'Draft Saved',
      description: 'Your job listing has been saved as a draft.',
    });
    // Here you would save the draft to your backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title *</Label>
        <Input
          id="jobTitle"
          placeholder="Enter a brief title for your job"
          {...register('jobTitle')}
        />
        {errors.jobTitle && (
          <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
        )}
      </div>

      {/* Type of Job */}
      <div className="space-y-2">
        <Label htmlFor="jobType">Type of Job *</Label>
        <Select onValueChange={(value) => setValue('jobType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.jobType && (
          <p className="text-sm text-red-600">{errors.jobType.message}</p>
        )}
      </div>

      {/* Detailed Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Detailed Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe the job responsibilities, requirements, and benefits in detail..."
          className="min-h-[120px]"
          {...register('description')}
        />
        <p className="text-xs text-gray-500">
          Include responsibilities, qualifications, benefits, and any other relevant information.
        </p>
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Required Skills */}
      <div>
        <Label className="text-base font-medium">Required Skills *</Label>
        <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
          <Info className="w-4 h-4" />
          Select all the skills that are essential for this job. You can add custom skills if needed.
        </div>

        {selectedRequiredSkills.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Selected Skills ({selectedRequiredSkills.length})</div>
            <div className="flex flex-wrap gap-2">
              {selectedRequiredSkills.map(skill => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    className="ml-1 text-gray-500 hover:text-red-500"
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {REQUIRED_SKILLS.map(skill => (
            <button
              key={skill}
              type="button"
              className={`px-3 py-2 rounded-lg border text-sm text-left transition-colors ${
                selectedRequiredSkills.includes(skill)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              } ${skill === 'Other' ? 'font-semibold' : ''}`}
              onClick={() => handleSkillClick(skill)}
            >
              {skill === 'Other' ? '+ Add Custom Skill' : skill}
            </button>
          ))}
        </div>

        {showOtherSkillInput && (
          <div className="flex gap-2 items-center mb-4">
            <Input
              value={otherSkill}
              onChange={e => setOtherSkill(e.target.value)}
              placeholder="Enter custom skill"
              className="flex-1"
              maxLength={50}
            />
            <Button 
              type="button" 
              size="sm" 
              onClick={handleOtherSkillAdd} 
              disabled={!otherSkill.trim()}
            >
              Add
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={() => { 
                setShowOtherSkillInput(false); 
                setOtherSkill(''); 
                setSelectedRequiredSkills(prev => prev.filter(s => s !== 'Other')); 
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        {errors.requiredSkills && <p className="text-sm text-red-600">{errors.requiredSkills.message}</p>}
      </div>

      {/* Required Experience Level */}
      <div className="space-y-2">
        <Label htmlFor="experienceLevel">Required Experience Level *</Label>
        <Select onValueChange={(value) => setValue('experienceLevel', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.experienceLevel && (
          <p className="text-sm text-red-600">{errors.experienceLevel.message}</p>
        )}
      </div>

      {/* Engagement Type */}
      <div className="space-y-2">
        <Label htmlFor="engagementType">Engagement Type *</Label>
        <Select onValueChange={(value) => setValue('engagementType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select engagement type" />
          </SelectTrigger>
          <SelectContent>
            {engagementTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.engagementType && (
          <p className="text-sm text-red-600">{errors.engagementType.message}</p>
        )}
      </div>

      {/* Work Mode */}
      <div className="space-y-2">
        <Label htmlFor="workMode">Work Mode *</Label>
        <Select onValueChange={(value) => {
          setValue('workMode', value);
          if (value !== 'onsite') setValue('location', '');
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select work mode" />
          </SelectTrigger>
          <SelectContent>
            {workModes.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.workMode && (
          <p className="text-sm text-red-600">{errors.workMode.message}</p>
        )}
      </div>

      {/* Location (conditional) */}
      {workMode === 'onsite' && (
        <div className="space-y-2">
          <Label htmlFor="location">On-site Location(s) *</Label>
          <Input
            id="location"
            placeholder="Enter location where on-site work is required"
            {...register('location')}
          />
          {errors.location && (
            <p className="text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>
      )}

      {/* Project Scope */}
      <div className="space-y-2">
        <Label htmlFor="projectScope">Project Scope *</Label>
        <Select onValueChange={(value) => setValue('projectScope', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select project scope" />
          </SelectTrigger>
          <SelectContent>
            {projectScopes.map((scope) => (
              <SelectItem key={scope.value} value={scope.value}>
                {scope.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.projectScope && (
          <p className="text-sm text-red-600">{errors.projectScope.message}</p>
        )}
      </div>

      {/* Project Start Date */}
      <div className="space-y-2">
        <Label>Project Start Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !startDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'PPP') : 'Pick a start date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => date && setValue('startDate', date)}
              disabled={(date) => date < new Date()}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors.startDate && (
          <p className="text-sm text-red-600">{errors.startDate.message}</p>
        )}
      </div>

      {/* Project End Date */}
      <div className="space-y-2">
        <Label>Project End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !watch('endDate') && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {watch('endDate') ? format(watch('endDate') as Date, 'PPP') : 'Pick an end date (optional)'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={watch('endDate') as Date}
              onSelect={(date) => date && setValue('endDate', date)}
              disabled={(date) => date < (startDate || new Date())}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors.endDate && (
          <p className="text-sm text-red-600">{errors.endDate.message}</p>
        )}
      </div>

      {/* Team Size */}
      <div className="space-y-2">
        <Label htmlFor="teamSize">Team Size</Label>
        <Input
          id="teamSize"
          placeholder="e.g., 5-10 people, Department of 25, etc."
          {...register('teamSize')}
        />
        {errors.teamSize && (
          <p className="text-sm text-red-600">{errors.teamSize.message}</p>
        )}
      </div>

      {/* Salary Range */}
      <Card>
        <CardContent className="pt-6">
          <Label className="text-base font-medium">Salary/Budget *</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="salaryType">Payment Type</Label>
              <Select onValueChange={(value) => {
                setValue('salaryType', value);
                setValue('salaryMin', '');
                setValue('salaryMax', '');
              }} value={salaryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {salaryTypesOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.salaryType && (
                <p className="text-sm text-red-600">{errors.salaryType.message}</p>
              )}
            </div>
            
            {(salaryType === 'hourly' || salaryType === 'fixed' || salaryType === 'retainer') && (
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Amount ($)</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  placeholder="e.g., 50"
                  {...register('salaryMin')}
                />
                {errors.salaryMin && (
                  <p className="text-sm text-red-600">{errors.salaryMin.message}</p>
                )}
              </div>
            )}

            {salaryType === 'milestone' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Min ($)</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="e.g., 5000"
                    {...register('salaryMin')}
                  />
                  {errors.salaryMin && (
                    <p className="text-sm text-red-600">{errors.salaryMin.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Max ($)</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="e.g., 10000"
                    {...register('salaryMax')}
                  />
                  {errors.salaryMax && (
                    <p className="text-sm text-red-600">{errors.salaryMax.message}</p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={(value) => setValue('currency', value)} value={watch('currency')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currency && (
                <p className="text-sm text-red-600">{errors.currency.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Attachments */}
      <div>
        <Label className="text-base font-medium">Supporting Documents</Label>
        <div className="text-xs text-gray-500 mb-2">
          Upload any relevant documents (PDF, DOC, DOCX, TXT, JPG, PNG) to help candidates understand your needs better.
        </div>

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

      {/* Application Deadline */}
      <div className="space-y-2">
        <Label>Application Deadline *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !applicationDeadline && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {applicationDeadline ? format(applicationDeadline, 'PPP') : 'Pick a deadline date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={applicationDeadline}
              onSelect={(date) => date && setValue('applicationDeadline', date)}
              disabled={(date) => date < new Date()}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors.applicationDeadline && (
          <p className="text-sm text-red-600">{errors.applicationDeadline.message}</p>
        )}
      </div>

      {/* NDA Requirement */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <Label className="text-base font-medium">
              Non-Disclosure Agreement (NDA)
            </Label>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Require candidates to sign an NDA before starting work
            </div>
          </div>
          <Switch
            checked={watch('ndaRequired')}
            onCheckedChange={(checked) => setValue('ndaRequired', checked)}
          />
        </div>

        {watch('ndaRequired') && (
          <div className="space-y-4">
            {ndaFile ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">{ndaFile.name}</div>
                    <div className="text-xs text-gray-500">{(ndaFile.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={removeNdaFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => ndaFileInputRef.current?.click()}
                onDrop={handleNdaDrop}
                onDragOver={e => e.preventDefault()}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <div className="text-gray-600 font-medium mb-1">Upload NDA Document</div>
                <div className="text-xs text-gray-400">PDF, DOC, DOCX files up to 5MB</div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  ref={ndaFileInputRef}
                  onChange={handleNdaUpload}
                />
              </div>
            )}
            {errors.ndaRequired && <p className="text-sm text-red-600">{errors.ndaRequired.message}</p>}
          </div>
        )}
      </div>

      {/* Payment Terms */}
      <div className="space-y-2">
        <Label htmlFor="paymentTerms">Payment Terms *</Label>
        <Textarea
          id="paymentTerms"
          placeholder="Specify when and how payments will be made (e.g., Net 30, 50% upfront, 50% on completion)"
          {...register('paymentTerms')}
          className="min-h-[80px]"
        />
        {errors.paymentTerms && (
          <p className="text-sm text-red-600">{errors.paymentTerms.message}</p>
        )}
      </div>

      {/* Additional Terms */}
      <div className="space-y-2">
        <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
        <Textarea
          id="additionalTerms"
          placeholder="Any additional terms, conditions, or special requirements for this engagement."
          {...register('additionalTerms')}
          className="min-h-[80px]"
        />
        {errors.additionalTerms && (
          <p className="text-sm text-red-600">{errors.additionalTerms.message}</p>
        )}
      </div>

      {/* Contact Information */}
      <Card>
        <CardContent className="pt-6">
          <Label className="text-base font-medium mb-4 block">Contact Information for Applicants</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                {...register('contactPerson')}
              />
              {errors.contactPerson && (
                <p className="text-sm text-red-600">{errors.contactPerson.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-600">{errors.contactEmail.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone *</Label>
              <Input
                id="contactPhone"
                {...register('contactPhone')}
              />
              {errors.contactPhone && (
                <p className="text-sm text-red-600">{errors.contactPhone.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="communicationMethod">Preferred Communication *</Label>
              <Select onValueChange={(value) => setValue('communicationMethod', value)} defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {communicationMethods.map((method) => (
                    <SelectItem key={method} value={method.toLowerCase()}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.communicationMethod && (
                <p className="text-sm text-red-600">{errors.communicationMethod.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleSaveDraft}
          className="flex-1"
        >
          <Save className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>
        <Button type="submit" className="flex-1">
          <Send className="h-4 w-4 mr-2" />
          Publish Job
        </Button>
      </div>
    </form>
  );
};

export default PostJobForm;
