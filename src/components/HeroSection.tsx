
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  primaryLink?: string;
  secondaryLink?: string;
  imageUrl?: string;
}

const HeroSection = ({
  title,
  subtitle,
  primaryCTA = 'Get Started',
  secondaryCTA = 'Learn More',
  primaryLink = '/register',
  secondaryLink = '/about',
  imageUrl = 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
}: HeroSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={primaryLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  {primaryCTA}
                </Button>
              </Link>
              <Link to={secondaryLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {secondaryCTA}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-brand-blue rounded-full h-24 w-24 opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal rounded-full h-32 w-32 opacity-20"></div>
              <img 
                src={imageUrl}
                alt="Professional consultants collaborating"
                className="w-full h-auto rounded-xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
