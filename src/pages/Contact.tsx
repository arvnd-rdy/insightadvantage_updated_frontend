
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // This would be replaced with actual form submission logic
    console.log('Contact form submitted');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 bg-gray-50">
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 py-24 px-4 overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-up">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
              We'd love to hear from you! Whether you have a question about our services, need support, or just want to say hello, our team is ready to assist.
            </p>
          </div>
        </section>

        <section className="container mx-auto py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-xl border-none rounded-2xl bg-white overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="font-medium text-gray-700">First Name</label>
                      <Input id="firstName" placeholder="Your first name" className="input-modern" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="font-medium text-gray-700">Last Name</label>
                      <Input id="lastName" placeholder="Your last name" className="input-modern" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                    <Input id="email" type="email" placeholder="Your email address" className="input-modern" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="font-medium text-gray-700">Subject</label>
                    <Input id="subject" placeholder="How can we help you?" className="input-modern" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-medium text-gray-700">Message</label>
                    <Textarea id="message" placeholder="Your message" rows={6} className="input-modern" />
                  </div>
                  <Button type="submit" className="w-full btn-modern bg-blue-600 hover:bg-blue-700 text-white text-lg py-3">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="h-8 w-8 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-xl mb-1 text-gray-800">Our Address</h4>
                        <p className="text-gray-600 text-lg">
                            123 Business Avenue<br />
                            San Francisco, CA 94107
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Phone className="h-8 w-8 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-xl mb-1 text-gray-800">Phone</h4>
                        <p className="text-gray-600 text-lg">
                            +1 (555) 123-4567
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-8 w-8 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-xl mb-1 text-gray-800">Email</h4>
                        <p className="text-gray-600 text-lg">
                            info@insightadvantage.com
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Find Us on the Map</h2>
              <Card className="shadow-xl border-none rounded-2xl overflow-hidden">
                <div className="relative h-96 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.3000000000007!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858086a9d0d7d1%3A0x4a6b2e6b2e6b2e6b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location"
                  ></iframe>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
