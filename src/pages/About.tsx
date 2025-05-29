
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">About InsightAdvantage</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            InsightAdvantage connects organizations with top-tier consultants to solve complex business challenges and drive innovation.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to democratize access to expert consultants across industries, making it easier for businesses of all sizes to find the perfect match for their specific needs.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            Founded in 2022, InsightAdvantage grew out of a simple observation: finding the right consultant is often a challenging, time-consuming process. By creating a streamlined platform that vets consultants and matches them with organizations based on expertise, availability, and cultural fit, we've revolutionized how businesses access specialized talent.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Excellence:</strong> We maintain high standards in everything we do</li>
            <li><strong>Integrity:</strong> We operate with transparency and honesty</li>
            <li><strong>Innovation:</strong> We continuously improve our platform and services</li>
            <li><strong>Collaboration:</strong> We believe in the power of partnership</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
