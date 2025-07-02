import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for exploring and discovering creators",
      features: [
        "Browse creator profiles",
        "View basic portfolio samples",
        "Access to creator contact info",
        "Basic search and filtering",
        "Community support"
      ],
      limitations: [
        "Limited profile details",
        "No demo videos",
        "No priority support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Basic",
      price: "$49",
      period: "per month",
      description: "Great for small businesses with regular video needs",
      features: [
        "Everything in Free",
        "Full creator profiles & portfolios",
        "Demo video access",
        "Advanced search filters",
        "Direct messaging with creators",
        "Email support",
        "Project management tools"
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Premium",
      price: "$149",
      period: "per month",
      description: "Perfect for growing companies with multiple projects",
      features: [
        "Everything in Basic",
        "Priority creator matching",
        "Dedicated account manager",
        "Advanced analytics & reporting",
        "Custom creator recommendations",
        "Priority support",
        "Team collaboration tools",
        "API access"
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "The 14-day free trial gives you full access to all Basic or Premium features, depending on which plan you choose. No credit card required to start."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
    },
    {
      question: "How does creator payment work?",
      answer: "Creator payments are handled separately between you and the creator. Our platform facilitates the connection and provides project management tools."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees, ever. You only pay the monthly subscription fee for your chosen plan."
    },
    {
      question: "What if I need custom features?",
      answer: "We offer custom enterprise solutions for larger organizations. Contact our sales team to discuss your specific requirements."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="heading-lg">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs. All plans include access to our 
            curated directory of elite video creators.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`premium-card relative ${plan.popular ? 'border-primary shadow-glow' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button 
                  className={`w-full ${plan.popular ? 'premium-button' : ''}`}
                  variant={plan.name === 'Free' ? 'outline' : 'default'}
                  asChild
                >
                  <Link to={plan.name === 'Free' ? '/creators' : '/signup'}>
                    {plan.cta}
                  </Link>
                </Button>
                
                {plan.name !== 'Free' && (
                  <p className="text-xs text-center text-muted-foreground">
                    14-day free trial • No credit card required
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="text-center py-16 bg-muted/50 rounded-lg mb-20">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold">Need Something Custom?</h2>
            <p className="text-muted-foreground">
              For enterprises with unique requirements, we offer custom solutions including 
              dedicated creator networks, white-label options, and enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/for-business">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20 py-16 bg-gradient-primary rounded-lg text-white">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Ready to Get Started?</h2>
            <p className="opacity-90 max-w-md mx-auto">
              Join hundreds of businesses that trust Vidgine to connect them with elite video creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-foreground">
                <Link to="/creators">Browse Creators</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;