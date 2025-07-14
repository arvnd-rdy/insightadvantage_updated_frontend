import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, FileText, Shield, Users, ArrowRight, ExternalLink } from 'lucide-react';

const Step7CompleteRegistration = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    dataProcessing: false,
    marketing: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState('');
  const [footerError, setFooterError] = useState('');

  const isFormValid = Object.values(agreements).every(agreement => agreement);

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCompleteRegistration = async () => {
    if (!isFormValid) {
      setFooterError('Please accept all required agreements to continue.');
      return;
    }

    setSubmitting(true);
    setBanner('');
    setFooterError('');
    
    try {
      // Simulate API call to complete registration
      await new Promise(res => setTimeout(res, 2000));
      
      // Show success message
      setBanner('Registration completed successfully! Welcome to Insight Advantage.');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/organization/dashboard');
      }, 2000);
      
    } catch {
      setFooterError('There was a problem completing your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-6');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b flex items-center h-16 px-6">
        <div className="flex-1 flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-3" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-gray-500 text-sm font-medium">Step 7 of 7 <span className="ml-2">●●●●●●●</span></div>
        </div>
        <div className="flex-1"></div>
      </header>

      {/* Banner */}
      {banner && <div className="bg-green-100 text-green-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow p-10 mt-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Complete Your Registration</h1>
            <p className="text-gray-500">You're almost there! Just a few final steps to complete your organization registration.</p>
          </div>

          {/* Success Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Registration Summary</h3>
                <div className="text-sm text-green-800 space-y-1">
                  <div>✓ Organization information completed</div>
                  <div>✓ Contact details verified</div>
                  <div>✓ Service preferences configured</div>
                  <div>✓ Business verification completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold">Terms & Agreements</h2>
            
            <div className="space-y-4">
              {/* Terms of Service */}
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Checkbox
                  id="terms"
                  checked={agreements.terms}
                  onCheckedChange={() => handleAgreementChange('terms')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="terms" className="font-medium cursor-pointer">
                    Terms of Service <span className="text-red-500">*</span>
                  </label>
                  <div className="text-sm text-gray-600 mt-1">
                    I agree to the <a href="/terms" target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                      Terms of Service <ExternalLink className="w-3 h-3" />
                    </a> governing the use of Insight Advantage platform.
                  </div>
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Checkbox
                  id="privacy"
                  checked={agreements.privacy}
                  onCheckedChange={() => handleAgreementChange('privacy')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="privacy" className="font-medium cursor-pointer">
                    Privacy Policy <span className="text-red-500">*</span>
                  </label>
                  <div className="text-sm text-gray-600 mt-1">
                    I have read and agree to the <a href="/privacy" target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                      Privacy Policy <ExternalLink className="w-3 h-3" />
                    </a> regarding the collection and use of my personal information.
                  </div>
                </div>
              </div>

              {/* Data Processing */}
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Checkbox
                  id="dataProcessing"
                  checked={agreements.dataProcessing}
                  onCheckedChange={() => handleAgreementChange('dataProcessing')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="dataProcessing" className="font-medium cursor-pointer">
                    Data Processing Consent <span className="text-red-500">*</span>
                  </label>
                  <div className="text-sm text-gray-600 mt-1">
                    I consent to the processing of my personal data for the purposes of providing consulting services and platform functionality.
                  </div>
                </div>
              </div>

              {/* Marketing Communications */}
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Checkbox
                  id="marketing"
                  checked={agreements.marketing}
                  onCheckedChange={() => handleAgreementChange('marketing')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="marketing" className="font-medium cursor-pointer">
                    Marketing Communications
                  </label>
                  <div className="text-sm text-gray-600 mt-1">
                    I agree to receive marketing communications about new features, services, and updates from Insight Advantage. 
                    You can unsubscribe at any time.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-4">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Account Activation</div>
                  <div className="text-sm text-blue-700">Your account will be activated immediately after registration</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Welcome Email</div>
                  <div className="text-sm text-blue-700">You'll receive a welcome email with next steps</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Start Posting</div>
                  <div className="text-sm text-blue-700">Begin posting consulting requests and connecting with consultants</div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Alert */}
          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Your data is secure</strong><br />
              We use industry-standard encryption and security measures to protect your information. 
              Your business data is never shared with third parties without your explicit consent.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={submitting}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleCompleteRegistration}
              disabled={!isFormValid || submitting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Completing Registration...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Complete Registration
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>

          {footerError && <div className="text-red-500 text-center text-sm mt-4">{footerError}</div>}
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex flex-col z-20 shadow">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-gray-500">
            Final step - Complete registration
          </div>
          <div className="text-sm text-gray-500">
            {isFormValid ? 'Ready to complete ✓' : 'Agreements required'}
          </div>
      </div>
      </footer>
    </div>
  );
};

export default Step7CompleteRegistration; 