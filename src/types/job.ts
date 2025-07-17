
export interface Job {
  status?: 'Open' | 'Closed' | 'Hiring' | 'Filled' | 'Draft';
  id: string;
  title: string;
  applicationDeadline: string;
  applicantsCount: number;
  description: string;
  requiredSkills: string[];
  experienceLevel: string;
  engagementType: string;
  workMode: string;
  projectScope: string;
  startDate: string;
  endDate?: string;
  teamSize?: string;
  location?: string;
  salaryType: string;
  salaryMin?: string;
  salaryMax?: string;
  currency: string;
  ndaRequired: boolean;
  paymentTerms: string;
  additionalTerms?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  communicationMethod: string;
  type: string;
  datePosted: string;
  deadline: string;
}
