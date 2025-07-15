
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
      <main className="flex-1">
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <circle cx="20" cy="20" r="15" fill="currentColor" opacity="0.5"></circle>
              <circle cx="80" cy="80" r="20" fill="currentColor" opacity="0.5"></circle>
              <rect x="50" y="10" width="10" height="10" fill="currentColor" opacity="0.5"></rect>
            </svg>
          </div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-up">Get in Touch</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              We'd love to hear from you! Whether you have a question about our services, need support, or just want to say hello, our team is ready to assist.
            </p>
          </div>
        </section>

        <section className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Reach Out to Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Card className="shadow-xl border-none rounded-lg">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="font-medium text-gray-700">First Name</label>
                          <Input id="firstName" placeholder="Your first name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="font-medium text-gray-700">Last Name</label>
                          <Input id="lastName" placeholder="Your last name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                        <Input id="email" type="email" placeholder="Your email address" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="font-medium text-gray-700">Subject</label>
                        <Input id="subject" placeholder="How can we help you?" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="font-medium text-gray-700">Message</label>
                        <Textarea id="message" placeholder="Your message" rows={5} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <Button type="submit" className="w-full py-3 px-6 rounded-md text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-300">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="shadow-xl border-none rounded-lg">
                  <CardContent className="pt-6 space-y-6">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h3>
                    <div className="flex items-start">
                      <MapPin className="h-7 w-7 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xl mb-1 text-gray-800">Our Address</h4>
                        <p className="text-gray-600 text-lg">
                          123 Business Avenue, Suite 500<br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-7 w-7 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xl mb-1 text-gray-800">Phone</h4>
                        <p className="text-gray-600 text-lg">
                          +1 (555) 123-4567<br />
                          Mon-Fri, 9am-6pm PST
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-7 w-7 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xl mb-1 text-gray-800">Email</h4>
                        <p className="text-gray-600 text-lg">
                          info@insightadvantage.com<br />
                          support@insightadvantage.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Find Us on the Map</h2>
              <Card className="shadow-xl border-none rounded-lg overflow-hidden">
                <CardContent className="p-0">
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
                </CardContent>
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
