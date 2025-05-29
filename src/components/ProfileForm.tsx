
import React from 'react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ProfileFormProps {
  role: 'consultant' | 'organization';
  onSubmit: (data: any) => void;
  defaultValues?: any;
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
  // Basic Company Information
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(2, "Industry is required"),
  officeLocations: z.string().min(2, "Office locations are required"),
  
  // Contact & Key Personnel
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  preferredCommunication: z.string().min(1, "Preferred communication method is required"),
  
  // Service Needs & Expertise Areas
  consultingType: z.string().min(1, "Type of consulting required is required"),
  engagementDuration: z.string().min(1, "Engagement duration is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  workModePreferences: z.string().min(1, "Work mode preferences are required"),
  requiredExpertiseLevel: z.string().min(1, "Required expertise level is required"),
  
  // Additional Information
  description: z.string().min(50, "Company description should be at least 50 characters"),
});

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
      companyName: '',
      companySize: '',
      industry: '',
      officeLocations: '',
      contactPerson: '',
      email: '',
      phone: '',
      preferredCommunication: '',
      consultingType: '',
      engagementDuration: '',
      budgetRange: '',
      workModePreferences: '',
      requiredExpertiseLevel: '',
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
          <div className="space-y-8">
            {/* Basic Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Rehabilitation Services" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizeOptions.map((option) => (
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
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Healthcare, Rehabilitation Services, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="officeLocations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Locations</FormLabel>
                      <FormControl>
                        <Input placeholder="Boston, MA; New York, NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact & Key Personnel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact & Key Personnel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} />
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
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@acme.com" {...field} />
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
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredCommunication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Communication Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select communication method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="platform">Platform Messaging</SelectItem>
                          <SelectItem value="video">Video Calls</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Service Needs & Expertise Areas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Service Needs & Expertise Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="consultingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Consulting Required</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select consulting type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {consultingTypeOptions.map((option) => (
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
                  name="engagementDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Engagement Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {engagementDurationOptions.map((option) => (
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
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgetRangeOptions.map((option) => (
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
                  name="workModePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Mode Preferences</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select work mode" />
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
                  name="requiredExpertiseLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Expertise Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expertise level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expertiseLevelOptions.map((option) => (
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

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your company, mission, and specific consulting needs..."
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-end pt-6">
          <Button type="submit" size="lg">Save Profile</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
