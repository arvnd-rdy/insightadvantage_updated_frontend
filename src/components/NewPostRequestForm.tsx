import React, { useState, useRef } from 'react';
import { useForm,FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent,CardHeader,CardTitle,CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Save, Send, Upload, X, Shield, Info, FileCheck, ArrowLeft, ArrowRight, Briefcase, DollarSign, FileText, Users, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  requestTitle: z.string().min(5, 'Request title must be at least 5 characters').max(100, 'Request title must be less than 100 characters'),
  requestType: z.string().min(1, 'Please select a request type'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000, 'Description must be less than 2000 characters'),
  requiredExpertise: z.array(z.string()).min(1, 'Please select at least one required expertise area'),
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
  teamEnvironment: z.string().optional(),
  location: z.string().optional(),
  budgetType: z.string().min(1, 'Please select budget type'),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
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

const NewPostRequestForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ndaFileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [otherExpertise, setOtherExpertise] = useState('');
  const [showOtherExpertiseInput, setShowOtherExpertiseInput] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [ndaFile, setNdaFile] = useState<File | null>(null);
  const [ndaFilePreview, setNdaFilePreview] = useState<string | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactPerson: 'Organization Manager',
      contactEmail: 'manager@example.com',
      contactPhone: '(555) 111-2222',
      communicationMethod: 'email',
      requiredExpertise: [],
      ndaRequired: false,
      currency: 'CAD',
      paymentTerms: 'Net 30 days',
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = methods;

  const applicationDeadline = watch('applicationDeadline');
  const startDate = watch('startDate');
  const workMode = watch('workMode');
  const budgetType = watch('budgetType');

  const requestTypes = [
    'Transferable Skills Analysis', 'Vocational Evaluation', 'Psycho Vocational Evaluation', 'Labour Market Survey',
    'Case Management', 'Job Development', 'Job Placement', 'Career Counselling', 'Return to Work Planning',
    'Disability Management', 'Functional Capacity Evaluation', 'Ergonomic Assessment', 'Medical-Legal Assessment',
    'Expert Testimony', 'Workplace Accommodation', 'Rehabilitation Planning', 'Life Care Planning', 'Coaching', 'Other'
  ];

  const REQUIRED_EXPERTISE = [
    'Vocational Assessment', 'Career Planning', 'Job Readiness Training', 'Return-to-Work Programs',
    'Disability Accommodation', 'Ergonomics', 'Vocational Expert Testimony', 'Program Evaluation',
    'Workers Compensation', 'Insurance Claims', 'Legal Support', 'Medical Documentation', 'Assessment Tools',
    'Report Writing', 'Client Communication', 'Project Management', 'Data Analysis', 'Research Methods'
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level', desc: '1-3 years experience, suitable for basic tasks.' },
    { value: 'intermediate', label: 'Intermediate', desc: '3-7 years experience, can handle standard projects.' },
    { value: 'senior', label: 'Senior Level', desc: '7+ years experience, for complex projects.' },
    { value: 'expert', label: 'Expert/Specialist', desc: '10+ years experience, recognized authority.' }
  ];
  
  const engagementTypes = [
    { value: 'project', label: 'Project-based', desc: 'Specific project with defined scope' },
    { value: 'ongoing', label: 'Ongoing Support', desc: 'Continuous consultation services' },
    { value: 'retainer', label: 'Retainer', desc: 'Regular availability for support' },
    { value: 'consultation', label: 'One-time Consultation', desc: 'Single assessment session' }
  ];

  const workModes = [
    { value: 'remote', label: 'Remote Only', desc: 'Work done remotely' },
    { value: 'onsite', label: 'On-site Only', desc: 'Work done at your location' },
    { value: 'hybrid', label: 'Hybrid', desc: 'Combination of remote and on-site' },
    { value: 'flexible', label: 'Flexible', desc: "Open to consultant's preference" }
  ];

  const projectScopes = [
    { value: 'small', label: 'Small Scope', desc: '1-2 weeks' },
    { value: 'medium', label: 'Medium Scope', desc: '2-8 weeks' },
    { value: 'large', label: 'Large Scope', desc: '2-6 months' },
    { value: 'enterprise', label: 'Enterprise', desc: '6+ months' }
  ];

  const budgetTypesOptions = [
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'fixed', label: 'Fixed Project Fee' },
    { value: 'retainer', label: 'Monthly Retainer' },
    { value: 'milestone', label: 'Milestone-based' }
  ];

  const CURRENCIES = ['CAD', 'USD', 'EUR', 'GBP'];
  
  const communicationMethods = ['Email', 'Phone', 'Video Call', 'In-Person Meeting'];

  const handleExpertiseClick = (expertise: string) => {
    if (expertise === 'Other') {
      setShowOtherExpertiseInput(true);
      if (!selectedExpertise.includes('Other')) {
        setSelectedExpertise([...selectedExpertise, 'Other']);
      }
    } else {
      setSelectedExpertise(prev => 
        prev.includes(expertise) 
          ? prev.filter(s => s !== expertise) 
          : [...prev, expertise]
      );
    }
    setValue('requiredExpertise', selectedExpertise);
  };

  const handleOtherExpertiseAdd = () => {
    if (otherExpertise.trim()) {
      setSelectedExpertise(prev => 
        prev.includes(otherExpertise.trim()) 
          ? prev 
          : [...prev, otherExpertise.trim()]
      );
      setOtherExpertise('');
      setShowOtherExpertiseInput(false);
      setValue('requiredExpertise', selectedExpertise);
    }
  };

  const removeExpertise = (expertise: string) => {
    setSelectedExpertise(prev => prev.filter(s => s !== expertise));
    if (expertise === 'Other') {
      setShowOtherExpertiseInput(false);
      setOtherExpertise('');
    }
    setValue('requiredExpertise', selectedExpertise);
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
      title: 'Request Published Successfully!',
      description: 'Your request is now live and visible to consultants.',
    });
  };

  const handleSaveDraft = () => {
    const formData = watch();
    console.log('Saving draft:', formData);
    toast({
      title: 'Draft Saved',
      description: 'Your request has been saved as a draft.',
    });
  };

  const steps = [
    {
      title: 'Basic Information',
      icon: <Briefcase className="h-5 w-5" />,
      fields: ['requestTitle', 'requestType', 'description']
    },
    {
      title: 'Expertise & Scope',
      icon: <Users className="h-5 w-5" />,
      fields: ['requiredExpertise', 'experienceLevel', 'engagementType', 'projectScope']
    },
    {
      title: 'Logistics',
      icon: <CalendarIcon className="h-5 w-5" />,
      fields: ['workMode', 'location', 'startDate', 'endDate', 'applicationDeadline']
    },
    {
      title: 'Budget & Attachments',
      icon: <DollarSign className="h-5 w-5" />,
      fields: ['budgetType', 'budgetMin', 'budgetMax', 'currency', 'paymentTerms', 'additionalTerms']
    },
    {
      title: 'Contact & Review',
      icon: <Mail className="h-5 w-5" />,
      fields: ['contactPerson', 'contactEmail', 'contactPhone', 'communicationMethod']
    }
  ];

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const isValid = await trigger(fields as (keyof FormData)[]);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-1">
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{steps[0].title}</CardTitle>
                <CardDescription>Start by providing the basic details of your request.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Request Title */}
                <div className="space-y-2">
                  <Label htmlFor="requestTitle">Request Title *</Label>
                  <Input id="requestTitle" placeholder="e.g., Need a Vocational Expert for a Legal Case" {...register('requestTitle')} />
                  {errors.requestTitle && <p className="text-sm text-red-600">{errors.requestTitle.message}</p>}
                </div>

                {/* Type of Request */}
                <div className="space-y-2">
                  <Label htmlFor="requestType">Type of Request *</Label>
                  <Select onValueChange={(value) => setValue('requestType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the primary service you need" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.requestType && <p className="text-sm text-red-600">{errors.requestType.message}</p>}
                </div>

                {/* Detailed Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea id="description" placeholder="Describe the project, goals, and deliverables..." className="min-h-[150px]" {...register('description')} />
                  <p className="text-xs text-gray-500">Provide enough detail for consultants to understand the scope and complexity of the work.</p>
                  {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>{steps[1].title}</CardTitle>
                <CardDescription>Specify the skills and project parameters.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Required Expertise */}
                <div>
                  <Label className="text-base font-medium">Required Expertise *</Label>
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    Select all the expertise areas that are essential for this request.
                  </div>

                  {selectedExpertise.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Selected Expertise ({selectedExpertise.length})</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedExpertise.map(exp => (
                          <Badge key={exp} variant="secondary" className="flex items-center gap-1">
                            {exp}
                            <button type="button" className="ml-1 text-gray-500 hover:text-red-500" onClick={() => removeExpertise(exp)}>×</button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                    {REQUIRED_EXPERTISE.map(exp => (
                      <button
                        key={exp}
                        type="button"
                        className={`px-3 py-2 rounded-lg border text-sm text-left transition-colors ${selectedExpertise.includes(exp) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                        onClick={() => handleExpertiseClick(exp)}
                      >
                        {exp}
                      </button>
                    ))}
                     <button
                        key="Other"
                        type="button"
                        className={`px-3 py-2 rounded-lg border text-sm text-left transition-colors font-semibold ${selectedExpertise.includes('Other') ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                        onClick={() => handleExpertiseClick('Other')}
                      >
                        + Add Custom Expertise
                      </button>
                  </div>

                  {showOtherExpertiseInput && (
                    <div className="flex gap-2 items-center mb-4">
                      <Input value={otherExpertise} onChange={e => setOtherExpertise(e.target.value)} placeholder="Enter custom expertise" className="flex-1" maxLength={50} />
                      <Button type="button" size="sm" onClick={handleOtherExpertiseAdd} disabled={!otherExpertise.trim()}>Add</Button>
                      <Button type="button" size="sm" variant="ghost" onClick={() => { setShowOtherExpertiseInput(false); setOtherExpertise(''); setSelectedExpertise(prev => prev.filter(s => s !== 'Other')); }}>Cancel</Button>
                    </div>
                  )}

                  {errors.requiredExpertise && <p className="text-sm text-red-600">{errors.requiredExpertise.message}</p>}
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
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experienceLevel && <p className="text-sm text-red-600">{errors.experienceLevel.message}</p>}
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
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.engagementType && <p className="text-sm text-red-600">{errors.engagementType.message}</p>}
                </div>

                {/* Project Scope */}
                <div className="space-y-2">
                  <Label htmlFor="projectScope">Project Scope *</Label>
                  <Select onValueChange={(value) => setValue('projectScope', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project scope" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectScopes.map((scope) => (
                        <SelectItem key={scope.value} value={scope.value}>{scope.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectScope && <p className="text-sm text-red-600">{errors.projectScope.message}</p>}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>{steps[2].title}</CardTitle>
                <CardDescription>Define the work arrangements and timeline.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Work Mode */}
                <div className="space-y-2">
                  <Label htmlFor="workMode">Work Mode *</Label>
                  <Select onValueChange={(value) => { setValue('workMode', value); if (value !== 'onsite') setValue('location', ''); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {workModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>{mode.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.workMode && <p className="text-sm text-red-600">{errors.workMode.message}</p>}
                </div>

                {/* Location (conditional) */}
                {workMode === 'onsite' && (
                  <div className="space-y-2">
                    <Label htmlFor="location">On-site Location(s) *</Label>
                    <Input id="location" placeholder="Enter city and province/state" {...register('location')} />
                    {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
                  </div>
                )}

                {/* Project Start Date */}
                <div className="space-y-2">
                  <Label>Project Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP') : 'Pick a start date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={(date) => date && setValue('startDate', date)} disabled={(date) => date < new Date()} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
                </div>

                {/* Project End Date */}
                <div className="space-y-2">
                  <Label>Project End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !watch('endDate') && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch('endDate') ? format(watch('endDate') as Date, 'PPP') : 'Pick an end date (optional)'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={watch('endDate') as Date} onSelect={(date) => date && setValue('endDate', date)} disabled={(date) => date < (startDate || new Date())} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
                </div>

                {/* Application Deadline */}
                <div className="space-y-2">
                  <Label>Application Deadline *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !applicationDeadline && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {applicationDeadline ? format(applicationDeadline, 'PPP') : 'Pick a deadline date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={applicationDeadline} onSelect={(date) => date && setValue('applicationDeadline', date)} disabled={(date) => date < new Date()} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {errors.applicationDeadline && <p className="text-sm text-red-600">{errors.applicationDeadline.message}</p>}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>{steps[3].title}</CardTitle>
                <CardDescription>Outline the financial details and any required documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget */}
                <Card>
                  <CardContent className="pt-6">
                    <Label className="text-base font-medium">Budget *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="budgetType">Payment Type</Label>
                        <Select onValueChange={(value) => { setValue('budgetType', value); setValue('budgetMin', ''); setValue('budgetMax', ''); }} value={budgetType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetTypesOptions.map((type) => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.budgetType && <p className="text-sm text-red-600">{errors.budgetType.message}</p>}
                      </div>
                      
                      {(budgetType === 'hourly' || budgetType === 'fixed' || budgetType === 'retainer') && (
                        <div className="space-y-2">
                          <Label htmlFor="budgetMin">Amount ($)</Label>
                          <Input id="budgetMin" type="number" placeholder="e.g., 75" {...register('budgetMin')} />
                          {errors.budgetMin && <p className="text-sm text-red-600">{errors.budgetMin.message}</p>}
                        </div>
                      )}

                      {budgetType === 'milestone' && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="budgetMin">Min ($)</Label>
                            <Input id="budgetMin" type="number" placeholder="e.g., 5000" {...register('budgetMin')} />
                            {errors.budgetMin && <p className="text-sm text-red-600">{errors.budgetMin.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budgetMax">Max ($)</Label>
                            <Input id="budgetMax" type="number" placeholder="e.g., 10000" {...register('budgetMax')} />
                            {errors.budgetMax && <p className="text-sm text-red-600">{errors.budgetMax.message}</p>}
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
                              <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.currency && <p className="text-sm text-red-600">{errors.currency.message}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Supporting Documents */}
                <div>
                  <Label className="text-base font-medium">Supporting Documents</Label>
                  <div className="text-xs text-gray-500 mb-2">Upload any relevant documents (RFP, project brief, etc.).</div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors" onClick={() => fileInputRef.current?.click()} onDrop={handleFileDrop} onDragOver={e => e.preventDefault()}>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-gray-600 font-medium mb-1">Click to upload or drag files here</div>
                    <div className="text-xs text-gray-400">PDF, DOC, DOCX, TXT, JPG, PNG files up to 10MB each</div>
                    <input type="file" multiple accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
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
                          <Button type="button" size="icon" variant="ghost" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* NDA Requirement */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label className="text-base font-medium">Non-Disclosure Agreement (NDA)</Label>
                      <div className="text-xs text-gray-500 flex items-center gap-1"><Shield className="w-4 h-4" />Require consultants to sign an NDA.</div>
                    </div>
                    <Switch checked={watch('ndaRequired')} onCheckedChange={(checked) => setValue('ndaRequired', checked)} />
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
                          <Button type="button" size="icon" variant="ghost" onClick={removeNdaFile} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors" onClick={() => ndaFileInputRef.current?.click()} onDrop={handleNdaDrop} onDragOver={e => e.preventDefault()}>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <div className="text-gray-600 font-medium mb-1">Upload NDA Document</div>
                          <div className="text-xs text-gray-400">PDF, DOC, DOCX files up to 5MB</div>
                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" ref={ndaFileInputRef} onChange={handleNdaUpload} />
                        </div>
                      )}
                      {errors.ndaRequired && <p className="text-sm text-red-600">{errors.ndaRequired.message}</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>{steps[4].title}</CardTitle>
                <CardDescription>Provide contact details and review your request before publishing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardContent className="pt-6">
                    <Label className="text-base font-medium mb-4 block">Contact Information</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input id="contactPerson" {...register('contactPerson')} />
                        {errors.contactPerson && <p className="text-sm text-red-600">{errors.contactPerson.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email *</Label>
                        <Input id="contactEmail" type="email" {...register('contactEmail')} />
                        {errors.contactEmail && <p className="text-sm text-red-600">{errors.contactEmail.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Phone *</Label>
                        <Input id="contactPhone" {...register('contactPhone')} />
                        {errors.contactPhone && <p className="text-sm text-red-600">{errors.contactPhone.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="communicationMethod">Preferred Communication *</Label>
                        <Select onValueChange={(value) => setValue('communicationMethod', value)} defaultValue="email">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {communicationMethods.map((method) => (
                              <SelectItem key={method} value={method.toLowerCase()}>{method}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.communicationMethod && <p className="text-sm text-red-600">{errors.communicationMethod.message}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Your Request</h3>
                  <div className="p-4 border rounded-lg space-y-2">
                    <p><strong>Title:</strong> {watch('requestTitle')}</p>
                    <p><strong>Type:</strong> {watch('requestType')}</p>
                    <p><strong>Experience:</strong> {watch('experienceLevel')}</p>
                    <p><strong>Budget:</strong> {watch('budgetType')} - {watch('currency')} {watch('budgetMin')} - {watch('budgetMax')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="submit" className="ml-auto">
              <Send className="h-4 w-4 mr-2" />
              Publish Request
            </Button>
          )}
        </div>
        <div className="text-center mt-4">
          <Button type="button" variant="ghost" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewPostRequestForm;