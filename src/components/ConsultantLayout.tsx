import React from 'react';
import ConsultantTopNav from '@/components/ConsultantTopNav';

export default function ConsultantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <ConsultantTopNav />
      <div className="flex-1">{children}</div>
    </div>
  );
} 