import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const GDPR = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="heading-lg mb-6">GDPR Compliance for Vidgine</h1>
        <p className="text-muted-foreground mb-4">Last updated: July 3, 2025</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p>
            The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It aims to protect the personal data and privacy of EU citizens for transactions that occur within EU member states. While Vidgine may not be based in the EU, we are committed to complying with GDPR principles where applicable to our users.
          </p>

          <h2>Our Commitment to GDPR</h2>
          <p>
            Vidgine is committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection. We have a robust and effective data protection program in place which complies with existing law and abides by the data protection principles.
          </p>

          <h2>How We Comply with GDPR</h2>
          <ul>
            <li>
              <strong>Lawfulness, Fairness and Transparency:</strong> We process personal data lawfully, fairly and in a transparent manner in relation to the data subject.
            </li>
            <li>
              <strong>Purpose Limitation:</strong> We collect personal data for specified, explicit and legitimate purposes and do not further process it in a manner that is incompatible with those purposes.
            </li>
            <li>
              <strong>Data Minimisation:</strong> We ensure that personal data is adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed.
            </li>
            <li>
              <strong>Accuracy:</strong> We take every reasonable step to ensure that personal data is accurate and, where necessary, kept up to date.
            </li>
            <li>
              <strong>Storage Limitation:</strong> We keep personal data in a form which permits identification of data subjects for no longer than is necessary for the purposes for which the personal data are processed.
            </li>
            <li>
              <strong>Integrity and Confidentiality:</strong> We process personal data in a manner that ensures appropriate security of the personal data, including protection against unauthorized or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organizational measures.
            </li>
          </ul>

          <h2>Your Rights Under GDPR</h2>
          <p>
            If you are a resident of the European Union, you have certain data protection rights. Vidgine aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
          </p>
          <p>Your rights include:</p>
          <ul>
            <li>
              <strong>The right to access:</strong> You have the right to request copies of your personal data.
            </li>
            <li>
              <strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
            </li>
            <li>
              <strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.
            </li>
            <li>
              <strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.
            </li>
            <li>
              <strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.
            </li>
            <li>
              <strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
            </li>
            <li>
              <strong>The right to withdraw consent:</strong> You also have the right to withdraw your consent at any time where Vidgine relied on your consent to process your personal information.
            </li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this GDPR Compliance, You can contact us:</p>
          <ul>
            <li>By email: [Your Support Email Here]</li>
            <li>By visiting this page on our website: [Your Contact Page URL Here]</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GDPR;
