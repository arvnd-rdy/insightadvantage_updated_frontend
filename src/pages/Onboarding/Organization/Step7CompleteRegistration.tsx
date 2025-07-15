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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Banner */}
      {banner && <div className="bg-green-100 text-green-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">Complete Your Registration</h1>
            <p className="text-lg text-gray-500 text-center max-w-md">
              You're almost there! Just a few final steps to complete your organization registration.
            </p>
          </div>

          {/* Registration Summary */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2 text-lg">Registration Summary</h3>
              <ul className="text-green-800 space-y-1 text-base list-disc pl-5">
                <li>Organization information completed</li>
                <li>Contact details verified</li>
                <li>Service preferences configured</li>
                <li>Business verification completed</li>
              </ul>
            </div>
          </div>

          {/* Agreements */}
          <section>
            <h2 className="text-xl font-bold mb-4">Terms & Agreements</h2>
            <div className="space-y-4">
              {/* Terms of Service */}
              <div className="flex items-start gap-3 p-5 border border-gray-200 rounded-lg bg-gray-50">
                <Checkbox
                  id="terms"
                  checked={agreements.terms}
                  onCheckedChange={() => handleAgreementChange('terms')}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="terms" className="font-medium cursor-pointer">
                    Terms of Service <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    I agree to the <a href="/terms" target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                      Terms of Service <ExternalLink className="w-3 h-3" />
                    </a> governing the use of Insight Advantage platform.
                  </p>
                </div>
              </div>
              {/* Privacy Policy */}
              <div className="flex items-start gap-3 p-5 border border-gray-200 rounded-lg bg-gray-50">
                <Checkbox
                  id="privacy"
                  checked={agreements.privacy}
                  onCheckedChange={() => handleAgreementChange('privacy')}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="privacy" className="font-medium cursor-pointer">
                    Privacy Policy <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    I have read and agree to the <a href="/privacy" target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                      Privacy Policy <ExternalLink className="w-3 h-3" />
                    </a> regarding the collection and use of my personal information.
                  </p>
                </div>
              </div>
              {/* Data Processing */}
              <div className="flex items-start gap-3 p-5 border border-gray-200 rounded-lg bg-gray-50">
                <Checkbox
                  id="dataProcessing"
                  checked={agreements.dataProcessing}
                  onCheckedChange={() => handleAgreementChange('dataProcessing')}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="dataProcessing" className="font-medium cursor-pointer">
                    Data Processing Consent <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    I consent to the processing of my personal data for the purposes of providing consulting services and platform functionality.
                  </p>
                </div>
              </div>
              {/* Marketing Communications */}
              <div className="flex items-start gap-3 p-5 border border-gray-200 rounded-lg bg-gray-50">
                <Checkbox
                  id="marketing"
                  checked={agreements.marketing}
                  onCheckedChange={() => handleAgreementChange('marketing')}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="marketing" className="font-medium cursor-pointer">
                    Marketing Communications
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    I agree to receive marketing communications about new features, services, and updates from Insight Advantage. 
                    You can unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What's Next */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">1</div>
                <div className="font-medium text-gray-900">Account Activation</div>
                <div className="text-sm text-gray-500">Your account will be activated immediately after registration</div>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">2</div>
                <div className="font-medium text-gray-900">Welcome Email</div>
                <div className="text-sm text-gray-500">You'll receive a welcome email with next steps</div>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">3</div>
                <div className="font-medium text-gray-900">Start Posting</div>
                <div className="text-sm text-gray-500">Begin posting consulting requests and connecting with consultants</div>
              </div>
            </div>
          </section>

          {/* Security Alert */}
          <Alert className="bg-blue-50 border-blue-200 text-blue-900 rounded-xl p-5 flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <AlertDescription>
              <strong>Your data is secure</strong><br />
              We use industry-standard encryption and security measures to protect your information. 
              Your business data is never shared with third parties without your explicit consent.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
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
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex flex-col z-20">
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