import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Step11CompleteRegistration = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Navigation handlers
  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      setSubmitting(true);
      // Simulate POST to /api/onboarding/complete
      await new Promise(res => setTimeout(res, 1200));
      // Simulate clearing onboarding flags
      localStorage.removeItem('onboardingDraft');
      localStorage.setItem('onboardingComplete', 'true');
      setSubmitting(false);
      navigate('/consultant/dashboard');
    }
  };
  const handleBack = () => navigate('/onboarding/consultant/step-10');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">Step 11 of 11</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Almost there!</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          Please agree to the Terms of Service and Privacy Policy to complete your profile and start using the platform.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Terms agreement */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-gray-50 border rounded-lg p-8 w-full max-w-lg flex flex-col items-center mb-6">
              <div className="mb-4 text-green-700 font-medium text-center">You’re all set! Click below to finish and start using Insight Advantage.</div>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="w-5 h-5"
                  required
                />
                <Label htmlFor="terms" className="text-base">
                  I have read and agree to the{' '}
                  <a href="/terms" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </Label>
              </div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8" disabled={!agreed || submitting}>
                {submitting ? 'Completing...' : 'Complete My Profile'}
              </Button>
            </div>
          </div>
          {/* Right-side tip card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <div className="font-semibold text-sm mb-2">Pro Tip</div>
              <div className="text-gray-700 text-sm">
                Agreeing to the terms unlocks your full access to the platform. You can always review our policies by clicking the links above.
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <span></span>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNext} disabled={!agreed || submitting}>{submitting ? 'Completing...' : 'Complete My Profile'}</Button>
      </footer>
    </div>
  );
};

export default Step11CompleteRegistration; 