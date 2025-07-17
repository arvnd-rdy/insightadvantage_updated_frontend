import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const email = 'user@example.com'; // Replace with actual user email from state/context

  const handleResend = () => {
    // TODO: Trigger resend email logic
    alert('Verification email resent!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <div className="mb-6">
          <span className="inline-block bg-green-100 rounded-full p-4 mb-4">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 17.5v-11z" stroke="#22c55e" strokeWidth="2"/><path d="M22 6.5l-10 7L2 6.5" stroke="#22c55e" strokeWidth="2"/></svg>
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Verify your email to continue</h2>
        <p className="text-gray-600 text-center mb-6">We just sent an email to <span className="font-semibold">{email}</span>.<br/>Please check your inbox and click the link to verify your address.</p>
        <div className="flex gap-3 w-full mb-4">
          <Button className="w-1/2" onClick={handleResend}>Send again</Button>
        </div>
        <a href="#" className="text-blue-600 hover:underline text-sm mb-2">Didn't receive email?</a>
      </div>
    </div>
  );
};

export default VerifyEmail; 