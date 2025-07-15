import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, Clock, AlertTriangle, RefreshCw } from 'lucide-react';

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
    { id: 1, title: 'Business Information Verification', description: 'Verifying your organization details' },
    { id: 2, title: 'Document Verification', description: 'Reviewing uploaded documents' },
    { id: 3, title: 'Business Registration Check', description: 'Confirming business registration status' },
    { id: 4, title: 'Financial Verification', description: 'Verifying financial information' },
    { id: 5, title: 'Compliance Check', description: 'Ensuring regulatory compliance' }
  ];

  useEffect(() => {
    if (verificationStatus === 'in_progress') {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        if (timeElapsed > 10 && verificationStep < verificationSteps.length - 1) {
          setVerificationStep(prev => prev + 1);
        }
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* Banner */}
      {banner && <div className="bg-green-100 text-green-700 text-center py-2 font-medium">{banner}</div>}

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8 pb-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Verification</h1>
            <p className="text-gray-600 text-lg">We need to verify your business information to ensure compliance and security.</p>
          </div>

          <div className="p-8 pt-0">
            {/* Verification Status */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Verification Status</h2>
                {verificationStatus === 'in_progress' && (
                  <div className="text-sm text-gray-500">
                    Time elapsed: {formatTime(timeElapsed)}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                {getStatusIcon(verificationStatus)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {verificationStatus === 'pending' && 'Ready to Start Verification'}
                    {verificationStatus === 'in_progress' && 'Verification in Progress'}
                    {verificationStatus === 'completed' && 'Verification Completed Successfully'}
                    {verificationStatus === 'failed' && 'Verification Failed'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {verificationStatus === 'pending' && 'Click "Start Verification" to begin the process'}
                    {verificationStatus === 'in_progress' && 'Please wait while we verify your business information'}
                    {verificationStatus === 'completed' && 'Your business has been successfully verified'}
                    {verificationStatus === 'failed' && 'There was an issue with the verification process'}
                  </p>
                </div>
                {getStatusBadge(verificationStatus)}
              </div>

              {/* Progress Bar */}
              {verificationStatus === 'in_progress' && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((verificationStep + 1) / verificationSteps.length) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Verification Steps */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg text-gray-800">Verification Steps</h3>
              {verificationSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors duration-200 ease-in-out ${
                    index < verificationStep 
                      ? 'bg-blue-50 border-blue-200' 
                      : index === verificationStep && verificationStatus === 'in_progress'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {getStatusIcon(index < verificationStep ? 'completed' : index === verificationStep ? 'in_progress' : 'pending')}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(index < verificationStep ? 'completed' : index === verificationStep ? 'in_progress' : 'pending')}
                  </div>
                </div>
              ))}
            </div>

            {/* Information Alert */}
            <Alert className="mb-8 bg-blue-50 border-blue-200 text-blue-800">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <p className="font-semibold mb-1">Why do we need to verify your business?</p>
                <p className="text-sm">
                  Business verification helps ensure the security and integrity of our platform. 
                  It protects both organizations and consultants by confirming that all parties are legitimate businesses.
                  This process typically takes 2-5 minutes and is required to complete your registration.
                </p>
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
                <div className="flex-1 text-center py-2">
                  <p className="text-sm text-gray-600 mb-2">Verification in progress...</p>
                  <p className="text-xs text-gray-500">Please do not close this window</p>
                </div>
              )}
              {verificationStatus === 'completed' && (
                <Button
                  onClick={handleContinue}
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
            {verificationStatus === 'completed' ? 'Verification complete ' : 'Verification required '}
            {verificationStatus === 'completed' && <CheckCircle className="w-4 h-4 inline-block ml-1 text-blue-600" />}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Step6Verification; 