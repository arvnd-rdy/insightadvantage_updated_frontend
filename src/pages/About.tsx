import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CallToAction from '@/components/CallToAction';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <HeroSection
          title="About InsightAdvantage"
          subtitle="Connecting Vision with Expertise"
          description="At InsightAdvantage, we bridge the gap between organizations seeking specialized knowledge and top-tier consultants ready to deliver impactful solutions. Our platform is built on a foundation of trust, innovation, and a deep understanding of the modern business landscape."
          imageUrl="/placeholder.svg" // Placeholder image
          imageAlt="About Us"
        />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our mission is to democratize access to expert consultants across industries, making it easier for businesses of all sizes to find the perfect match for their specific needs. We empower organizations to achieve their strategic goals by connecting them with vetted, high-caliber talent.
                </p>
              </div>
              <div>
                <img src="/placeholder.svg" alt="Our Mission" className="rounded-lg shadow-lg w-full h-64 object-cover" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
              <div>
                <img src="/placeholder.svg" alt="Our Vision" className="rounded-lg shadow-lg w-full h-64 object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Our Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We envision a future where every organization, regardless of its size or industry, can effortlessly tap into a global network of specialized expertise, fostering innovation and sustainable growth. We aim to be the leading platform for professional consulting partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Story</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/placeholder.svg" alt="Our Story" className="rounded-lg shadow-lg w-full h-72 object-cover" />
              </div>
              <div className="md:w-1/2">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Founded in 2022, InsightAdvantage grew out of a simple observation: finding the right consultant is often a challenging, time-consuming, and opaque process. Traditional methods were inefficient, and many businesses struggled to connect with the specialized talent they desperately needed.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our founders, experienced professionals from both the consulting and business sectors, recognized this gap. They envisioned a streamlined, transparent, and highly efficient platform that could revolutionize how businesses access specialized talent. By meticulously vetting consultants and employing advanced matching algorithms, we've created a system that ensures optimal partnerships based on expertise, availability, and cultural fit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6 bg-blue-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-blue-100">We maintain the highest standards in everything we do, from platform functionality to consultant quality.</p>
              </div>
              <div className="p-6 bg-blue-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-blue-100">We operate with unwavering transparency, honesty, and ethical conduct in all our interactions.</p>
              </div>
              <div className="p-6 bg-blue-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-blue-100">We continuously evolve our platform and services, embracing new technologies and approaches to better serve our users.</p>
              </div>
              <div className="p-6 bg-blue-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                <p className="text-blue-100">We believe in the power of partnership, fostering strong relationships between organizations and consultants.</p>
              </div>
            </div>
          </div>
        </section>

        <CallToAction
          title="Ready to Transform Your Business?"
          description="Connect with top-tier consultants or find your next impactful project today."
          primaryButtonText="Find a Consultant"
          primaryButtonLink="/find-consultants"
          secondaryButtonText="Become a Consultant"
          secondaryButtonLink="/register"
        />
      </main>
      <Footer />
    </div>
  );
};

export default About;