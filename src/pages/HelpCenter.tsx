import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Lightbulb, BookOpen, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HelpCenter = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="heading-lg mb-6 text-center">How can we help you?</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Search our knowledge base or browse topics to find answers to your questions.
        </p>

        <div className="relative mb-12 max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for articles..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Lightbulb className="w-10 h-10 text-primary mx-auto mb-4" />
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">New to Vidgine? Learn the basics and set up your account.</p>
              <Button variant="link" asChild className="mt-4">
                <Link to="#">Read Articles</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
              <CardTitle>Creator Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Information for creators on how to succeed on Vidgine.</p>
              <Button variant="link" asChild className="mt-4">
                <Link to="#">Read Articles</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageSquare className="w-10 h-10 text-primary mx-auto mb-4" />
              <CardTitle>Billing & Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Answers to common questions about subscriptions and payments.</p>
              <Button variant="link" asChild className="mt-4">
                <Link to="#">Read Articles</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <h2 className="heading-md">Still need help?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            If you can't find the answer you're looking for, our support team is here to assist you.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
