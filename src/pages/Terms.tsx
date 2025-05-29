
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Insight Advantage, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Platform Description</h2>
            <p className="mb-4">
              Insight Advantage is a platform that connects organizations with independent consultants 
              specializing in vocational rehabilitation and related services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="mb-4">Users agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of their account</li>
              <li>Use the platform in compliance with applicable laws</li>
              <li>Respect intellectual property rights</li>
              <li>Conduct professional and ethical business practices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
            <p className="mb-4">
              Payment processing is handled through our secure platform. Organizations agree to pay 
              for services as agreed upon with consultants. Platform fees apply as outlined in our pricing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              Insight Advantage serves as a platform to facilitate connections. We are not responsible 
              for the quality of services provided by consultants or the conduct of users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p className="mb-4">
              Either party may terminate their account at any time. We reserve the right to suspend 
              or terminate accounts that violate these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="mb-2">Email: legal@insightadvantage.com</p>
            <p className="mb-2">Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business Avenue, Suite 500, San Francisco, CA 94107</p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
