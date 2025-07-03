import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="heading-lg mb-6">Cookie Policy for Vidgine</h1>
        <p className="text-muted-foreground mb-4">Last updated: July 3, 2025</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p>
            This Cookie Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used. This Cookie Policy has been created with the help of the <a href="https://www.privacypolicies.com/cookie-policy-generator/" target="_blank" rel="noopener noreferrer">Cookie Policy Generator</a>.
          </p>
          <p>
            Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, please see our Privacy Policy.
          </p>
          <p>
            We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.
          </p>

          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h3>Definitions</h3>
          <ul>
            <li>
              <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Cookie Policy) refers to Vidgine.
            </li>
            <li>
              <strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing your browsing history on that website among its many uses.
            </li>
            <li>
              <strong>Website</strong> refers to Vidgine, accessible from <a href="https://www.vidgine.com" target="_blank" rel="noopener noreferrer">https://www.vidgine.com</a>
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </li>
          </ul>

          <h2>The Use Of The Cookies</h2>
          <h3>Type of Cookies We Use</h3>
          <p>
            Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
          </p>
          <p>
            We use both session and persistent Cookies for the purposes set out below:
          </p>
          <ul>
            <li>
              <strong>Necessary / Essential Cookies</strong>
              <p>Type: Session Cookies</p>
              <p>Administered by: Us</p>
              <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
            </li>
            <li>
              <strong>Cookies Policy / Notice Acceptance Cookies</strong>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
            </li>
            <li>
              <strong>Functionality Cookies</strong>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
            </li>
            <li>
              <strong>Tracking and Performance Cookies</strong>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Third-Parties</p>
              <p>Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new pages, features or new functionality of the Website to see how our users react to them.</p>
            </li>
          </ul>

          <h2>Your Choices Regarding Cookies</h2>
          <p>
            If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.
          </p>
          <p>
            If You do not accept Our Cookies, You may experience some inconvenience in Your use of the Website and some features may not function properly. For more information about cookies, please visit the <a href="https://www.privacypolicies.com/blog/cookies/" target="_blank" rel="noopener noreferrer">Privacy Policies website</a>.
          </p>
          <p>
            If You'd like to delete Cookies or instruct Your web browser to delete or refuse Cookies, please visit the help pages of Your web browser.
          </p>
          <ul>
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer">http://support.microsoft.com/kb/278835</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
          </ul>
          <p>
            For any other web browser, please visit Your web browser's official web pages.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Cookie Policy, You can contact us:</p>
          <ul>
            <li>By email: [Your Support Email Here]</li>
            <li>By visiting this page on our website: [Your Contact Page URL Here]</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
