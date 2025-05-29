
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction = ({
  title,
  subtitle,
  buttonText,
  buttonLink
}: CTAProps) => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-navy">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-lg text-blue-100 mb-8">{subtitle}</p>
          <Link to={buttonLink}>
            <Button size="lg" className="bg-white text-brand-blue hover:bg-blue-50">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
