
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Plus, Trash2, Upload } from 'lucide-react';
import OrganizationForm from './OrganizationForm';

interface ProfileFormProps {
  role: 'consultant' | 'organization';
  onSubmit: (data: z.infer<typeof ConsultantProfileSchema> | z.infer<typeof OrganizationProfileSchema>) => void;
  defaultValues?: z.infer<typeof ConsultantProfileSchema> | z.infer<typeof OrganizationProfileSchema>;
}

const ConsultantProfileSchema = z.object({
  // Personal & Contact Information
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  languages: z.string().min(1, "Languages are required"),
  
  // Professional Background
  specialization: z.string().min(1, "Specialization is required"),
  title: z.string().min(2, "Professional title is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  education: z.string().min(10, "Education details are required"),
  certifications: z.string().min(1, "Certifications are required"),
  
  // Skills and Services
  primarySkills: z.string().min(2, "Primary skills are required"),
  servicesOffered: z.string().min(10, "Services offered description is required"),
  bio: z.string().min(50, "Bio should be at least 50 characters"),
  
  // Availability & Preferences
  workPreferences: z.string().min(1, "Work preferences are required"),
  consultingMode: z.string().min(1, "Consulting mode is required"),
  pricingStructure: z.string().min(1, "Pricing structure is required"),
  hourlyRate: z.string().min(1, "Rate information is required"),
  paymentPreferences: z.string().min(1, "Payment preferences are required"),
});

const OrganizationProfileSchema = z.object({
  // Step 1: Basic Company Information
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  companySize: z.string().min(1, "Company size is required"),
  serviceAreas: z.array(z.string()).min(1, "At least one service area is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  logo: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State/Province is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street address is required"),
  zipCode: z.string().min(1, "ZIP/Postal code is required"),
  timezone: z.string().min(1, "Timezone is required"),
  
  // Step 2: Contacts (multiple contacts)
  contacts: z.array(z.object({
    id: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    preferredCommunication: z.string().min(1, "Preferred communication method is required"),
  })).min(1, "At least one contact is required"),
  
  // Step 3a: Job Basics
  consultingTypes: z.array(z.string()).min(1, "At least one consulting type is required"),
  engagementDuration: z.string().min(1, "Engagement duration is required"),
  budgetStructure: z.string().min(1, "Budget structure is required"),
  budgetAmount: z.string().min(1, "Budget amount is required"),
  currency: z.string().min(1, "Currency is required"),
  workEnvironment: z.array(z.string()).min(1, "At least one work environment preference is required"),
  expertiseLevel: z.string().min(1, "Expertise level is required"),
  
  // Step 3b: Defaults & Preferences
  defaultBudgetAmount: z.string().min(1, "Default budget amount is required"),
  defaultCurrency: z.string().min(1, "Default currency is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  communicationPreferences: z.array(z.string()).min(1, "At least one communication preference is required"),
  reportingFrequency: z.string().min(1, "Reporting frequency is required"),
  customReportingSchedule: z.string().optional(),
  ndaRequired: z.boolean(),
  ndaTemplate: z.string().optional(),
  contractTemplate: z.string().optional(),
  emailNotifications: z.object({
    newApplications: z.boolean(),
    messages: z.boolean(),
    projectUpdates: z.boolean(),
    paymentReminders: z.boolean(),
    systemAlerts: z.boolean(),
  }),
  
  // Additional Information
  description: z.string().min(50, "Organization description should be at least 50 characters"),
});

export { OrganizationProfileSchema };

// Dropdown options for vocational rehabilitation industry
const specializationOptions = [
  "Vocational Assessment",
  "Career Counseling", 
  "Job Placement Services",
  "Rehabilitation Counseling",
  "Disability Management",
  "Ergonomics and Workplace Accommodation",
  "Return-to-Work Coordination",
  "Assistive Technology Consulting",
  "Mental Health Counseling (related to vocational goals)",
  "Substance Abuse Counseling (related to vocational goals)",
  "Supported Employment",
  "Transition Services (for youth/students)",
  "Forensic Vocational Rehabilitation",
  "Expert Witness Services",
  "Other"
];

const certificationOptions = [
  "CRC (Certified Rehabilitation Counselor)",
  "CDMS (Certified Disability Management Specialist)",
  "CCM (Certified Case Manager)",
  "CVE (Certified Vocational Evaluator)",
  "CLCP (Certified Life Care Planner)",
  "ABVE Diplomate",
  "IAVRS (International Association of Vocational Rehabilitation Specialists)",
  "State-specific licenses (LPC, LCSW)",
  "Other"
];

const experienceLevels = [
  "Entry-Level (0-3 years)",
  "Mid-Level (3-7 years)", 
  "Senior-Level (7-15 years)",
  "Expert-Level (15+ years)"
];

const workPreferencesOptions = [
  "Full-time Consulting",
  "Part-time Consulting",
  "Flexible Hours",
  "Short-term Projects",
  "Long-term Projects"
];

const consultingModeOptions = [
  "Remote",
  "In-Person",
  "Hybrid"
];

const pricingStructureOptions = [
  "Hourly Rate",
  "Per Project Fee",
  "Retainer Fee"
];

const paymentPreferencesOptions = [
  "Bank Transfer",
  "Cheque",
  "Credit Card",
  "Other"
];

const consultingTypeOptions = [
  "Vocational Assessment Services",
  "Career Exploration and Planning",
  "Job Readiness Training",
  "Job Placement and Support",
  "Return-to-Work Program Development",
  "Disability Accommodation Consulting",
  "Ergonomic Assessments",
  "Vocational Expert Testimony",
  "Program Evaluation",
  "Staff Training (related to vocational rehab)",
  "Policy Development (related to vocational rehab)",
  "Other"
];

const engagementDurationOptions = [
  "Short-term (less than 3 months)",
  "Long-term (3+ months)",
  "One-time Project"
];

const budgetRangeOptions = [
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+"
];

const companySizeOptions = [
  "Small (1-50)",
  "Medium (51-500)",
  "Large (500+)"
];

const expertiseLevelOptions = [
  "Beginner",
  "Intermediate", 
  "Advanced"
];

const ProfileForm = ({ role, onSubmit, defaultValues }: ProfileFormProps) => {
  const schema = role === 'consultant' ? ConsultantProfileSchema : OrganizationProfileSchema;
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || (role === 'consultant' ? {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      languages: '',
      specialization: '',
      title: '',
      experienceLevel: '',
      education: '',
      certifications: '',
      primarySkills: '',
      servicesOffered: '',
      bio: '',
      workPreferences: '',
      consultingMode: '',
      pricingStructure: '',
      hourlyRate: '',
      paymentPreferences: '',
    } : {
      // Step 1: Basic Company Information
      organizationName: '',
      companySize: '',
      serviceAreas: [],
      website: '',
      logo: '',
      country: '',
      state: '',
      city: '',
      street: '',
      zipCode: '',
      timezone: '',
      
      // Step 2: Contacts
      contacts: [{
        id: '1',
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        phone: '',
        preferredCommunication: '',
      }],
      
      // Step 3a: Job Basics
      consultingTypes: [],
      engagementDuration: '',
      budgetStructure: '',
      budgetAmount: '',
      currency: '',
      workEnvironment: [],
      expertiseLevel: '',
      
      // Step 3b: Defaults & Preferences
      defaultBudgetAmount: '',
      defaultCurrency: '',
      paymentTerms: '',
      communicationPreferences: [],
      reportingFrequency: '',
      customReportingSchedule: '',
      ndaRequired: false,
      ndaTemplate: '',
      contractTemplate: '',
      emailNotifications: {
        newApplications: false,
        messages: false,
        projectUpdates: false,
        paymentReminders: false,
        systemAlerts: false,
      },
      
      // Additional Information
      description: '',
    })
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {role === 'consultant' ? (
          // Consultant form fields
          <div className="space-y-8">
            {/* Personal & Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal & Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages Spoken</FormLabel>
                      <FormControl>
                        <Input placeholder="English, Spanish, French" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Professional Background */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Professional Background</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specializationOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceLevels.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Rehabilitation Counselor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications</FormLabel>
                      <FormControl>
                        <Input placeholder="CRC, CDMS, CCM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List your educational background, degrees, and institutions..."
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Skills and Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Skills and Services Offered</h3>
              <FormField
                control={form.control}
                name="primarySkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="Vocational Assessment, Career Counseling, Job Placement" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servicesOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Offered</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the specific services you offer to clients..."
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell organizations about your background, experience, and approach to vocational rehabilitation..."
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Availability & Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Availability & Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="workPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Preferences</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select work preferences" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {workPreferencesOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consultingMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consulting Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select consulting mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {consultingModeOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pricingStructure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pricing Structure</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pricing structure" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pricingStructureOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hourlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate Information</FormLabel>
                      <FormControl>
                        <Input placeholder="$150/hour or $5000/project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Preferences</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment preferences" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentPreferencesOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ) : (
          // Organization form fields
          <OrganizationForm form={form} />
        )}
        
        <div className="flex justify-end pt-6">
          <Button type="submit" size="lg">Save Profile</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
