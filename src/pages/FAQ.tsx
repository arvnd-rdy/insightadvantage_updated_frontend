
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "How does Insight Advantage work?",
      answer: "Insight Advantage connects organizations with expert consultants. Organizations post project requirements, consultants apply, and our platform facilitates secure communication, contracting, and payments."
    },
    {
      question: "How are consultants verified?",
      answer: "All consultants undergo a comprehensive verification process including background checks, credential verification, and skills assessment. We ensure only qualified professionals join our platform."
    },
    {
      question: "What types of consulting services are available?",
      answer: "We specialize in vocational rehabilitation consulting, including disability assessment, return-to-work planning, job placement, workplace accommodations, and related services."
    },
    {
      question: "How is payment handled?",
      answer: "We provide secure payment processing. Organizations fund projects upfront, and consultants are paid upon milestone completion or project delivery, ensuring security for both parties."
    },
    {
      question: "Can I work with the same consultant on multiple projects?",
      answer: "Yes! Once you find a consultant you like working with, you can directly invite them to new projects or establish ongoing retainer relationships."
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer: "We have a dispute resolution process and quality assurance measures. Our support team works with both parties to resolve issues and ensure satisfactory outcomes."
    },
    {
      question: "Is there a minimum project size or budget?",
      answer: "No minimum project size. We accommodate everything from small consulting sessions to large, long-term engagements."
    },
    {
      question: "How do I get started as a consultant?",
      answer: "Sign up, complete your profile with credentials and experience, undergo our verification process, and start browsing and applying to projects that match your expertise."
    },
    {
      question: "What are the platform fees?",
      answer: "We charge a small service fee on completed projects. Organizations pay a small platform fee, and consultants pay a percentage of their earnings. See our pricing page for details."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect all user data, communications, and financial information."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using Insight Advantage.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you get the most out of Insight Advantage.
          </p>
          <a href="/contact" className="text-brand-blue hover:underline">
            Contact our support team
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
