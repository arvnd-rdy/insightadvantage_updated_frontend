import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Step10Verification = () => {
  const navigate = useNavigate();
  // Simulate Persona status: 'in_progress', 'passed', 'requires_action', 'failed'
  const [status, setStatus] = useState<'in_progress' | 'passed' | 'requires_action' | 'failed'>('in_progress');
  const [polling, setPolling] = useState(false);

  // Simulate polling for status (mock)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (polling && status === 'in_progress') {
      interval = setInterval(() => {
        // Simulate polling result
        // Randomly pass or fail after a few seconds
        if (Math.random() > 0.7) {
          setStatus('passed');
          setPolling(false);
        } else if (Math.random() < 0.1) {
          setStatus('failed');
          setPolling(false);
        }
      }, 2000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [polling, status]);

  // Navigation handlers
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'passed') {
      navigate('/onboarding/consultant/step-11');
    }
  };
  const handleBack = () => navigate('/onboarding/consultant/step-9');

  // Start polling when widget is shown
  useEffect(() => {
    if (status === 'in_progress' && !polling) setPolling(true);
  }, [status, polling]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <header className="w-full px-4 py-6 flex flex-col items-center">
        <div className="text-sm text-gray-500 mb-2">Step 10 of 11</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Verify your identity</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-4">
          We use Persona to securely verify your identity and ensure trust on the platform. This only takes a minute.
        </p>
      </header>
      {/* Main content */}
      <form onSubmit={handleNext} className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Persona widget and status */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg bg-gray-50 border rounded-lg p-8 flex flex-col items-center mb-6 relative">
              <div className="text-lg font-semibold mb-4">Identity Verification</div>
              {/* Persona widget container (mocked) */}
              <div className="w-full h-48 bg-white border rounded flex items-center justify-center text-gray-400 mb-4 relative">
                {status === 'in_progress' && (
                  <span>Persona KYC Widget (mock)</span>
                )}
                {status === 'passed' && (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <span className="mb-2">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" stroke="#fff" /></svg>
                    </span>
                    <span className="text-green-700 font-semibold">Verification complete!</span>
                  </div>
                )}
                {status === 'failed' && (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <span className="mb-2">
                      <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#ef4444" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" stroke="#fff" /></svg>
                    </span>
                    <span className="text-red-700 font-semibold">Verification failed. Please try again.</span>
                    <Button type="button" variant="outline" className="mt-2" onClick={() => { setStatus('in_progress'); setPolling(true); }}>Retry Verification</Button>
                  </div>
                )}
                {status === 'requires_action' && (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <span className="mb-2">
                      <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#facc15" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" stroke="#fff" /></svg>
                    </span>
                    <span className="text-yellow-700 font-semibold">Verification in progress…</span>
                  </div>
                )}
                {/* Spinner overlay for in progress */}
                {status === 'in_progress' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
                    <span className="animate-spin h-8 w-8 border-4 border-green-400 border-t-transparent rounded-full"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Right-side tip card */}
          <div className="hidden md:block w-full max-w-xs">
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <div className="font-semibold text-sm mb-2">Pro Tip</div>
              <div className="text-gray-700 text-sm">
                Completing your verification helps build trust and unlocks all platform features. Make sure your information matches your legal documents.
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Sticky footer navigation */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex justify-between items-center z-20 shadow">
        <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
        <span></span>
        <Button type="submit" formAction="submit" formMethod="post" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNext} disabled={status !== 'passed'}>Continue</Button>
      </footer>
    </div>
  );
};

export default Step10Verification; 