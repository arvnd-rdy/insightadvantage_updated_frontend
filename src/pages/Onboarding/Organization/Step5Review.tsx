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
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* Banner */}
      {banner && <div className="bg-green-100 text-green-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8 pb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review your information</h1>
            <p className="text-gray-600 text-lg">Review all the information you've provided and make any necessary changes before completing your registration.</p>
          </div>

          <div className="p-8 pt-0">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Basic Company Information */}
              <AccordionItem value="basic-info" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Basic Company Information</p>
                      <p className="text-sm text-gray-500">{mockData.basicInfo.orgName} • {mockData.basicInfo.companySize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-1'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-medium text-gray-900">Organization:</span> {mockData.basicInfo.orgName}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Size:</span> {mockData.basicInfo.companySize}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Industry:</span> {mockData.basicInfo.industry.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Website:</span> {mockData.basicInfo.website}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-900">Address:</span> {mockData.basicInfo.street}, {mockData.basicInfo.city}, {mockData.basicInfo.state} {mockData.basicInfo.zip}, {mockData.basicInfo.country}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Timezone:</span> {mockData.basicInfo.timezone}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Contact & Key Personnel */}
              <AccordionItem value="contacts" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Contact & Key Personnel</p>
                      <p className="text-sm text-gray-500">{mockData.contacts.length} contact{mockData.contacts.length !== 1 ? 's' : ''} added</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-2'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="space-y-3 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    {mockData.contacts.map((contact, index) => (
                      <div key={index} className="rounded-md bg-gray-50 p-3 border border-gray-100">
                        <p className="font-medium text-gray-900">{contact.firstName} {contact.lastName}, {contact.jobTitle}</p>
                        <p className="text-sm text-gray-600">{contact.email} • {contact.phone}</p>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 mt-1">
                          Preferred: {contact.preferred}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Service Needs & Project Preferences */}
              <AccordionItem value="job-basics" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Service Needs & Project Preferences</p>
                      <p className="text-sm text-gray-500">{mockData.jobDetails.consultingTypes.length} service types • {mockData.jobDetails.budgetAmount} {mockData.jobDetails.currency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-3a'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-medium text-gray-900">Services:</span> {mockData.jobDetails.consultingTypes.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Duration:</span> {mockData.jobDetails.duration}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Budget:</span> {mockData.jobDetails.budgetAmount} {mockData.jobDetails.currency} ({mockData.jobDetails.budgetType})
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Work Mode:</span> {mockData.jobDetails.workModes.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Expertise Level:</span> {mockData.jobDetails.expertiseLevel}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Job Description & Attachments */}
              <AccordionItem value="description" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Job Description & Attachments</p>
                      <p className="text-sm text-gray-500">{mockData.description.jobTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-4a'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="space-y-3 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-medium text-gray-900">Job Title:</span> {mockData.description.jobTitle}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Description:</span> {mockData.description.description.substring(0, 150)}...
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Attachments:</span> {mockData.description.attachments.join(', ')}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Skills & Expertise */}
              <AccordionItem value="skills" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Skills & Expertise</p>
                      <p className="text-sm text-gray-500">{mockData.skills.requiredSkills.length} skills • {mockData.skills.expertiseLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-4b'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="space-y-3 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-medium text-gray-900">Required Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {mockData.skills.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-gray-100 text-gray-700">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Expertise Level:</span> {mockData.skills.expertiseLevel}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Scope & Duration */}
              <AccordionItem value="scope" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Scope & Duration</p>
                      <p className="text-sm text-gray-500">{mockData.scope.engagementType} • {mockData.scope.projectScope}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-4c'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-medium text-gray-900">Engagement:</span> {mockData.scope.engagementType}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Work Mode:</span> {mockData.scope.workMode}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Scope:</span> {mockData.scope.projectScope}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Timeline:</span> {mockData.scope.startDate} to {mockData.scope.endDate}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Deadline:</span> {mockData.scope.applicationDeadline}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Location:</span> {mockData.scope.location}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Budget & Terms */}
              <AccordionItem value="budget" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Budget & Terms</p>
                      <p className="text-sm text-gray-500">{mockData.budget.budgetAmount} {mockData.budget.currency} • {mockData.budget.budgetStructure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-4d'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-medium text-gray-900">Structure:</span> {mockData.budget.budgetStructure}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Amount:</span> {mockData.budget.budgetAmount} {mockData.budget.currency}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Payment Terms:</span> {mockData.budget.paymentTerms}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">NDA Required:</span> {mockData.budget.ndaRequired ? 'Yes' : 'No'}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Service Defaults */}
              <AccordionItem value="defaults" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Service & Collaboration Defaults</p>
                      <p className="text-sm text-gray-500">{mockData.defaults.defaultBudget} {mockData.defaults.defaultCurrency} • {mockData.defaults.reportingFrequency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate('/onboarding/organization/step-3b'); }} className="text-gray-600 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-medium text-gray-900">Default Budget:</span> {mockData.defaults.defaultBudget} {mockData.defaults.defaultCurrency}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Payment Terms:</span> {mockData.defaults.defaultPaymentTerms}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Communication:</span> {mockData.defaults.communicationPreferences.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Reporting:</span> {mockData.defaults.reportingFrequency}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">NDA Default:</span> {mockData.defaults.ndaRequired ? 'Required' : 'Optional'}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={saving}
                className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                {saving ? 'Saving...' : 'Save Draft & Continue Later'}
              </Button>
              <Button
                onClick={handleComplete}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? 'Processing...' : 'Complete Registration'}
              </Button>
            </div>

            {footerError && <p className="text-red-500 text-center text-sm mt-4">{footerError}</p>}
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 z-40 w-full bg-white border-t shadow-lg">
        {footerError && <div className="text-red-500 text-center text-sm mb-2">{footerError}</div>}
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button variant="outline" type="button" onClick={handleBack} className="text-gray-600 border-gray-300 hover:bg-gray-50">
            Back
          </Button>
          <div className="text-sm text-gray-600 font-medium">
            All sections completed <CheckCircle className="w-4 h-4 inline-block ml-1 text-blue-600" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Step5Review; 