import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="heading-lg mb-6 text-center">Get in Touch</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our platform, 
          feedback, or need support, feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="heading-md">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your Name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@example.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Subject of your inquiry" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="heading-md">Our Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <p className="text-muted-foreground">support@vidgine.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <p className="text-muted-foreground">123 Vidgine Lane, Creativity City, CA 90210</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-semibold">Business Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM (PST)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
