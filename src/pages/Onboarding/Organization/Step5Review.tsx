import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Edit, Building, Users, FileText, Settings, Shield, DollarSign, Calendar, MapPin } from 'lucide-react';

// Mock data - in real app this would come from context or API
const mockData = {
  basicInfo: {
    orgName: 'Acme Rehabilitation Services',
    companySize: 'Medium (51–500)',
    industry: ['Healthcare', 'Insurance'],
    website: 'https://www.acme-rehab.com',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    street: '123 Main Street',
    zip: 'M5V 3A8',
    timezone: 'America/Toronto'
  },
  contacts: [
    {
      firstName: 'John',
      lastName: 'Smith',
      jobTitle: 'HR Director',
      email: 'john.smith@acme-rehab.com',
      phone: '+1-416-555-0123',
      preferred: 'email'
    }
  ],
  jobDetails: {
    consultingTypes: ['Vocational Evaluation', 'Case Management'],
    duration: 'Medium (3–6 mo)',
    budgetType: 'Fixed Project',
    budgetAmount: '15000',
    currency: 'CAD',
    workModes: ['Remote', 'Hybrid'],
    expertiseLevel: 'Senior Level'
  },
  description: {
    jobTitle: 'Senior Rehabilitation Consultant for Workers\' Compensation Cases',
    description: 'We need an experienced rehabilitation consultant to handle complex workers\' compensation cases...',
    attachments: ['Project_Brief.pdf', 'Requirements_Doc.docx']
  },
  skills: {
    requiredSkills: ['Vocational Evaluation', 'Case Management', 'Workers Compensation'],
    expertiseLevel: 'Senior Level'
  },
  scope: {
    engagementType: 'Project-based',
    workMode: 'Hybrid',
    projectScope: 'Medium Scope',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    applicationDeadline: '2024-01-15',
    location: 'Toronto, ON with remote work options'
  },
  budget: {
    budgetStructure: 'Fixed Project Fee',
    budgetAmount: '15000',
    currency: 'CAD',
    paymentTerms: '50% upfront, 50% upon completion',
    ndaRequired: true
  },
  defaults: {
    defaultBudget: '10000',
    defaultCurrency: 'CAD',
    defaultPaymentTerms: 'Net 30 days',
    communicationPreferences: ['Email', 'Video Call'],
    reportingFrequency: 'Bi-weekly',
    ndaRequired: false
  }
};

const Step5Review = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState('');
  const [footerError, setFooterError] = useState('');

  const handleSaveDraft = async () => {
    setSaving(true);
    setBanner('');
    setFooterError('');
    try {
      await new Promise(res => setTimeout(res, 2000));
      setBanner('Draft saved successfully! You can continue later from your dashboard.');
    } catch {
      setFooterError('There was a problem saving your draft. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    setBanner('');
    setFooterError('');
    try {
      await new Promise(res => setTimeout(res, 1500));
      navigate('/onboarding/organization/step-6');
    } catch {
      setFooterError('There was a problem completing your registration. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-4d');

  const getSectionStatus = (section: string) => {
    // Mock validation - in real app this would check actual data
    return 'complete';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b flex items-center h-16 px-6">
        <div className="flex-1 flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-3" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-gray-500 text-sm font-medium">Step 5 of 7 <span className="ml-2">●●●●●<span className="text-gray-300">○○</span></span></div>
        </div>
        <div className="flex-1"></div>
      </header>

      {/* Banner */}
      {banner && <div className="bg-green-100 text-green-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow p-10 mt-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Review your information</h1>
            <p className="text-gray-500">Review all the information you've provided and make any necessary changes before completing your registration.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {/* Basic Company Information */}
            <AccordionItem value="basic-info" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <Building className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Basic Company Information</div>
                    <div className="text-sm text-gray-500">{mockData.basicInfo.orgName} • {mockData.basicInfo.companySize}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-1'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Organization:</span> {mockData.basicInfo.orgName}
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> {mockData.basicInfo.companySize}
                  </div>
                  <div>
                    <span className="font-medium">Industry:</span> {mockData.basicInfo.industry.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Website:</span> {mockData.basicInfo.website}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Address:</span> {mockData.basicInfo.street}, {mockData.basicInfo.city}, {mockData.basicInfo.state} {mockData.basicInfo.zip}, {mockData.basicInfo.country}
                  </div>
                  <div>
                    <span className="font-medium">Timezone:</span> {mockData.basicInfo.timezone}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Contact & Key Personnel */}
            <AccordionItem value="contacts" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Contact & Key Personnel</div>
                    <div className="text-sm text-gray-500">{mockData.contacts.length} contact{mockData.contacts.length !== 1 ? 's' : ''} added</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-2'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3">
                  {mockData.contacts.map((contact, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="font-medium">{contact.firstName} {contact.lastName}, {contact.jobTitle}</div>
                      <div className="text-sm text-gray-600">{contact.email} • {contact.phone}</div>
                      <div className="text-xs text-gray-500">Preferred: {contact.preferred}</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Service Needs & Project Preferences */}
            <AccordionItem value="job-basics" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Service Needs & Project Preferences</div>
                    <div className="text-sm text-gray-500">{mockData.jobDetails.consultingTypes.length} service types • {mockData.jobDetails.budgetAmount} {mockData.jobDetails.currency}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-3a'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Services:</span> {mockData.jobDetails.consultingTypes.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {mockData.jobDetails.duration}
                  </div>
                  <div>
                    <span className="font-medium">Budget:</span> {mockData.jobDetails.budgetAmount} {mockData.jobDetails.currency} ({mockData.jobDetails.budgetType})
                  </div>
                  <div>
                    <span className="font-medium">Work Mode:</span> {mockData.jobDetails.workModes.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Expertise Level:</span> {mockData.jobDetails.expertiseLevel}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Job Description & Attachments */}
            <AccordionItem value="description" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Job Description & Attachments</div>
                    <div className="text-sm text-gray-500">{mockData.description.jobTitle}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-3b'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Job Title:</span> {mockData.description.jobTitle}
                  </div>
                  <div>
                    <span className="font-medium">Description:</span> {mockData.description.description.substring(0, 100)}...
                  </div>
                  <div>
                    <span className="font-medium">Attachments:</span> {mockData.description.attachments.join(', ')}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Skills & Expertise */}
            <AccordionItem value="skills" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Skills & Expertise</div>
                    <div className="text-sm text-gray-500">{mockData.skills.requiredSkills.length} skills • {mockData.skills.expertiseLevel}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-3c'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Required Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {mockData.skills.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Expertise Level:</span> {mockData.skills.expertiseLevel}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Scope & Duration */}
            <AccordionItem value="scope" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Scope & Duration</div>
                    <div className="text-sm text-gray-500">{mockData.scope.engagementType} • {mockData.scope.projectScope}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-3d'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Engagement:</span> {mockData.scope.engagementType}
                  </div>
                  <div>
                    <span className="font-medium">Work Mode:</span> {mockData.scope.workMode}
                  </div>
                  <div>
                    <span className="font-medium">Scope:</span> {mockData.scope.projectScope}
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span> {mockData.scope.startDate} to {mockData.scope.endDate}
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span> {mockData.scope.applicationDeadline}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {mockData.scope.location}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Budget & Terms */}
            <AccordionItem value="budget" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Budget & Terms</div>
                    <div className="text-sm text-gray-500">{mockData.budget.budgetAmount} {mockData.budget.currency} • {mockData.budget.budgetStructure}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-3e'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Structure:</span> {mockData.budget.budgetStructure}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> {mockData.budget.budgetAmount} {mockData.budget.currency}
                  </div>
                  <div>
                    <span className="font-medium">Payment Terms:</span> {mockData.budget.paymentTerms}
                  </div>
                  <div>
                    <span className="font-medium">NDA Required:</span> {mockData.budget.ndaRequired ? 'Yes' : 'No'}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Service Defaults */}
            <AccordionItem value="defaults" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Service & Collaboration Defaults</div>
                    <div className="text-sm text-gray-500">{mockData.defaults.defaultBudget} {mockData.defaults.defaultCurrency} • {mockData.defaults.reportingFrequency}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-4'); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Default Budget:</span> {mockData.defaults.defaultBudget} {mockData.defaults.defaultCurrency}
                  </div>
                  <div>
                    <span className="font-medium">Payment Terms:</span> {mockData.defaults.defaultPaymentTerms}
                  </div>
                  <div>
                    <span className="font-medium">Communication:</span> {mockData.defaults.communicationPreferences.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Reporting:</span> {mockData.defaults.reportingFrequency}
                  </div>
                  <div>
                    <span className="font-medium">NDA Default:</span> {mockData.defaults.ndaRequired ? 'Required' : 'Optional'}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex-1"
            >
              {saving ? 'Saving...' : 'Save Draft & Continue Later'}
            </Button>
            <Button
              onClick={handleComplete}
              disabled={saving}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {saving ? 'Processing...' : 'Complete Registration'}
            </Button>
          </div>

          {footerError && <div className="text-red-500 text-center text-sm mt-4">{footerError}</div>}
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex flex-col z-20 shadow">
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
          <div className="text-sm text-gray-500">
            All sections completed ✓
          </div>
      </div>
      </footer>
    </div>
  );
};

export default Step5Review; 