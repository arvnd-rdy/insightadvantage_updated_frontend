import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, Clock, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

const Step6Verification = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'in_progress' | 'completed' | 'failed'>('pending');
  const [verificationStep, setVerificationStep] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [footerError, setFooterError] = useState('');

  // Mock verification steps
  const verificationSteps = [
    { id: 1, title: 'Business Information Verification', description: 'Verifying your organization details', status: 'completed' },
    { id: 2, title: 'Document Verification', description: 'Reviewing uploaded documents', status: 'completed' },
    { id: 3, title: 'Business Registration Check', description: 'Confirming business registration status', status: 'in_progress' },
    { id: 4, title: 'Financial Verification', description: 'Verifying financial information', status: 'pending' },
    { id: 5, title: 'Compliance Check', description: 'Ensuring regulatory compliance', status: 'pending' }
  ];

  // Simulate verification process
  useEffect(() => {
    if (verificationStatus === 'in_progress') {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Simulate step progression
        if (timeElapsed > 10 && verificationStep < verificationSteps.length - 1) {
          setVerificationStep(prev => prev + 1);
        }
        
        // Simulate completion after 30 seconds
        if (timeElapsed > 30) {
          setVerificationStatus('completed');
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [verificationStatus, timeElapsed, verificationStep, verificationSteps.length]);

  const startVerification = async () => {
    setSubmitting(true);
    setBanner('');
    setFooterError('');
    try {
      // Simulate API call to start verification
      await new Promise(res => setTimeout(res, 2000));
      setVerificationStatus('in_progress');
      setTimeElapsed(0);
      setVerificationStep(0);
    } catch {
      setFooterError('Failed to start verification. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const retryVerification = async () => {
    setSubmitting(true);
    setBanner('');
    setFooterError('');
    try {
      await new Promise(res => setTimeout(res, 1000));
      setVerificationStatus('in_progress');
      setTimeElapsed(0);
      setVerificationStep(0);
    } catch {
      setFooterError('Failed to retry verification. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = async () => {
    setSubmitting(true);
    setBanner('');
    setFooterError('');
    try {
      await new Promise(res => setTimeout(res, 1000));
      navigate('/onboarding/organization/step-7');
    } catch {
      setFooterError('There was a problem continuing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate('/onboarding/organization/step-5');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'failed':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b flex items-center h-16 px-6">
        <div className="flex-1 flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-3" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-gray-500 text-sm font-medium">Step 6 of 7 <span className="ml-2">●●●●●●<span className="text-gray-300">○</span></span></div>
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Business Verification</h1>
            <p className="text-gray-500">We need to verify your business information to ensure compliance and security.</p>
          </div>

          {/* Verification Status */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Verification Status</h2>
              {verificationStatus === 'in_progress' && (
                <div className="text-sm text-gray-500">
                  Time elapsed: {formatTime(timeElapsed)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon(verificationStatus)}
              <div className="flex-1">
                <div className="font-medium">
                  {verificationStatus === 'pending' && 'Ready to Start Verification'}
                  {verificationStatus === 'in_progress' && 'Verification in Progress'}
                  {verificationStatus === 'completed' && 'Verification Completed Successfully'}
                  {verificationStatus === 'failed' && 'Verification Failed'}
                </div>
                <div className="text-sm text-gray-500">
                  {verificationStatus === 'pending' && 'Click "Start Verification" to begin the process'}
                  {verificationStatus === 'in_progress' && 'Please wait while we verify your business information'}
                  {verificationStatus === 'completed' && 'Your business has been successfully verified'}
                  {verificationStatus === 'failed' && 'There was an issue with the verification process'}
                </div>
              </div>
              {getStatusBadge(verificationStatus)}
            </div>

            {/* Progress Bar */}
            {verificationStatus === 'in_progress' && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((verificationStep + 1) / verificationSteps.length) * 100}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Verification Steps */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-lg">Verification Steps</h3>
            {verificationSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  index <= verificationStep 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(index < verificationStep ? 'completed' : index === verificationStep ? 'in_progress' : 'pending')}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-gray-500">{step.description}</div>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(index < verificationStep ? 'completed' : index === verificationStep ? 'in_progress' : 'pending')}
                </div>
              </div>
            ))}
          </div>

          {/* Information Alert */}
          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Why do we need to verify your business?</strong><br />
              Business verification helps ensure the security and integrity of our platform. 
              It protects both organizations and consultants by confirming that all parties are legitimate businesses.
              This process typically takes 2-5 minutes and is required to complete your registration.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {verificationStatus === 'pending' && (
              <Button
                onClick={startVerification}
                disabled={submitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {submitting ? 'Starting...' : 'Start Verification'}
              </Button>
            )}
            
            {verificationStatus === 'in_progress' && (
              <div className="flex-1 text-center">
                <div className="text-sm text-gray-500 mb-2">Verification in progress...</div>
                <div className="text-xs text-gray-400">Please do not close this window</div>
              </div>
            )}
            
            {verificationStatus === 'completed' && (
              <Button
                onClick={handleContinue}
                disabled={submitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {submitting ? 'Continuing...' : 'Continue to Next Step'}
              </Button>
            )}
            
            {verificationStatus === 'failed' && (
              <Button
                onClick={retryVerification}
                disabled={submitting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {submitting ? 'Retrying...' : 'Retry Verification'}
              </Button>
            )}
          </div>

          {footerError && <div className="text-red-500 text-center text-sm mt-4">{footerError}</div>}
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t py-4 px-4 flex flex-col z-20 shadow">
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" type="button" onClick={handleBack}>Back</Button>
          <div className="text-sm text-gray-500">
            {verificationStatus === 'completed' ? 'Verification complete ✓' : 'Verification required'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Step6Verification; 