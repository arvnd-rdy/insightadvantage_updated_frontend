
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

const formSchema = z.object({
  projectTitle: z.string().min(5, 'Project title must be at least 5 characters'),
  consultingType: z.string().min(1, 'Please select a consulting type'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  expertiseLevel: z.string().min(1, 'Please select required expertise level'),
  duration: z.string().min(1, 'Please select engagement duration'),
  budgetType: z.string().min(1, 'Please select budget type'),
  budgetMin: z.string().min(1, 'Minimum budget is required'),
  budgetMax: z.string().min(1, 'Maximum budget is required'),
  workModes: z.array(z.string()).min(1, 'Please select at least one work mode'),
  location: z.string().optional(),
  applicationDeadline: z.date({
    required_error: 'Application deadline is required',
  }),
  contactPerson: z.string().min(1, 'Contact person is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(1, 'Contact phone is required'),
  communicationMethod: z.string().min(1, 'Please select preferred communication method'),
});

type FormData = z.infer<typeof formSchema>;

const PostRequestForm = () => {
  const { toast } = useToast();
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [showLocation, setShowLocation] = useState(false);

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
      contactPerson: 'Emma Rodriguez',
      contactEmail: 'emma@techvision.com',
      contactPhone: '(555) 123-4567',
      communicationMethod: 'email',
      workModes: [],
    },
  });

  const selectedDate = watch('applicationDeadline');

  const consultingTypes = [
    'Vocational Assessment Services',
    'Career Exploration and Planning',
    'Job Readiness Training',
    'Job Placement and Support',
    'Return-to-Work Program Development',
    'Disability Accommodation Consulting',
    'Ergonomic Assessments',
    'Vocational Expert Testimony',
    'Program Evaluation',
    'Staff Training (Vocational Rehab)',
    'Policy Development (Vocational Rehab)',
    'Other',
  ];

  const expertiseLevels = ['Beginner', 'Intermediate', 'Advanced'];
  
  const durations = [
    'Short-term (less than 3 months)',
    'Long-term (3+ months)',
    'One-time Project',
  ];

  const budgetTypes = ['Hourly Rate', 'Per Project', 'Fixed Retainer'];
  
  const workModeOptions = ['Remote', 'On-site', 'Hybrid'];
  
  const communicationMethods = ['Email', 'Phone', 'Video Call', 'In-Person Meeting'];

  const handleWorkModeChange = (mode: string, checked: boolean) => {
    let newModes: string[];
    if (checked) {
      newModes = [...selectedWorkModes, mode];
    } else {
      newModes = selectedWorkModes.filter(m => m !== mode);
    }
    
    setSelectedWorkModes(newModes);
    setValue('workModes', newModes);
    
    // Show location field if On-site or Hybrid is selected
    setShowLocation(newModes.includes('On-site') || newModes.includes('Hybrid'));
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast({
      title: 'Request Published Successfully!',
      description: 'Your consulting request is now live and visible to consultants.',
    });
    // Here you would typically send the data to your backend
  };

  const handleSaveDraft = () => {
    const formData = watch();
    console.log('Saving draft:', formData);
    toast({
      title: 'Draft Saved',
      description: 'Your consulting request has been saved as a draft.',
    });
    // Here you would save the draft to your backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Project Title */}
      <div className="space-y-2">
        <Label htmlFor="projectTitle">Project Title *</Label>
        <Input
          id="projectTitle"
          placeholder="Enter a brief title for your project"
          {...register('projectTitle')}
        />
        {errors.projectTitle && (
          <p className="text-sm text-red-600">{errors.projectTitle.message}</p>
        )}
      </div>

      {/* Type of Consulting Required */}
      <div className="space-y-2">
        <Label htmlFor="consultingType">Type of Consulting Required *</Label>
        <Select onValueChange={(value) => setValue('consultingType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select consulting type" />
          </SelectTrigger>
          <SelectContent>
            {consultingTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.consultingType && (
          <p className="text-sm text-red-600">{errors.consultingType.message}</p>
        )}
      </div>

      {/* Detailed Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Detailed Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your project needs in detail..."
          className="min-h-[120px]"
          {...register('description')}
        />
        <p className="text-xs text-gray-500">
          Include background, specific tasks, desired outcomes, and any other relevant information.
        </p>
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Required Expertise Level */}
      <div className="space-y-2">
        <Label htmlFor="expertiseLevel">Required Expertise Level *</Label>
        <Select onValueChange={(value) => setValue('expertiseLevel', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select expertise level" />
          </SelectTrigger>
          <SelectContent>
            {expertiseLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.expertiseLevel && (
          <p className="text-sm text-red-600">{errors.expertiseLevel.message}</p>
        )}
      </div>

      {/* Expected Engagement Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration">Expected Engagement Duration *</Label>
        <Select onValueChange={(value) => setValue('duration', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {durations.map((duration) => (
              <SelectItem key={duration} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.duration && (
          <p className="text-sm text-red-600">{errors.duration.message}</p>
        )}
      </div>

      {/* Budget Range */}
      <Card>
        <CardContent className="pt-6">
          <Label className="text-base font-medium">Budget Range *</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="budgetType">Payment Type</Label>
              <Select onValueChange={(value) => setValue('budgetType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {budgetTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budgetType && (
                <p className="text-sm text-red-600">{errors.budgetType.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budgetMin">Minimum Budget ($)</Label>
              <Input
                id="budgetMin"
                type="number"
                placeholder="1000"
                {...register('budgetMin')}
              />
              {errors.budgetMin && (
                <p className="text-sm text-red-600">{errors.budgetMin.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budgetMax">Maximum Budget ($)</Label>
              <Input
                id="budgetMax"
                type="number"
                placeholder="5000"
                {...register('budgetMax')}
              />
              {errors.budgetMax && (
                <p className="text-sm text-red-600">{errors.budgetMax.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Mode Preferences */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Preferred Work Mode *</Label>
        <div className="flex flex-wrap gap-4">
          {workModeOptions.map((mode) => (
            <div key={mode} className="flex items-center space-x-2">
              <Checkbox
                id={mode}
                checked={selectedWorkModes.includes(mode)}
                onCheckedChange={(checked) => handleWorkModeChange(mode, checked as boolean)}
              />
              <Label htmlFor={mode}>{mode}</Label>
            </div>
          ))}
        </div>
        {errors.workModes && (
          <p className="text-sm text-red-600">{errors.workModes.message}</p>
        )}
      </div>

      {/* Location (conditional) */}
      {showLocation && (
        <div className="space-y-2">
          <Label htmlFor="location">On-site Location(s)</Label>
          <Input
            id="location"
            placeholder="Enter location where on-site work is required"
            {...register('location')}
          />
        </div>
      )}

      {/* Application Deadline */}
      <div className="space-y-2">
        <Label>Application Deadline *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : 'Pick a deadline date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
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
          Publish Request
        </Button>
      </div>
    </form>
  );
};

export default PostRequestForm;
