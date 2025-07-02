import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Zap, Users, TrendingUp, Search, Star, ArrowRight } from "lucide-react";

const ForBusiness = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Thoroughly Vetted Creators",
      description: "Every creator undergoes a rigorous screening process to ensure quality and reliability."
    },
    {
      icon: Search,
      title: "Advanced Filtering",
      description: "Find creators by specialty, budget, timeline, and specific skills to match your exact needs."
    },
    {
      icon: Zap,
      title: "Premium Support",
      description: "Get dedicated account management and support throughout your entire project lifecycle."
    },
    {
      icon: Users,
      title: "Enterprise Solutions",
      description: "Custom solutions for larger organizations with multiple projects and team management needs."
    },
    {
      icon: TrendingUp,
      title: "ROI Tracking",
      description: "Detailed analytics and reporting to measure the impact of your video content investments."
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description: "We stand behind our creators with quality guarantees and project success metrics."
    }
  ];

  const useCases = [
    {
      title: "Product Launches",
      description: "Create compelling explainer videos and product demos to showcase your new offerings.",
      specialties: ["Product Demos", "Explainer Videos", "Marketing Campaigns"]
    },
    {
      title: "Employee Training",
      description: "Develop engaging training content that improves knowledge retention and engagement.",
      specialties: ["Corporate Training", "Educational Content", "Tutorials"]
    },
    {
      title: "Social Media Marketing",
      description: "Build a strong social presence with viral-ready content optimized for each platform.",
      specialties: ["Social Media", "Short-form Content", "Brand Stories"]
    },
    {
      title: "Customer Testimonials",
      description: "Showcase authentic customer success stories that build trust and drive conversions.",
      specialties: ["Testimonials", "Case Studies", "Social Proof"]
    }
  ];

  const stats = [
    { value: "500+", label: "Vetted Creators" },
    { value: "95%", label: "Project Success Rate" },
    { value: "48h", label: "Average Response Time" },
    { value: "4.9/5", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise-Grade Quality
            </Badge>
            
            <h1 className="heading-xl text-balance">
              Find Elite Video Creators
              <span className="block">For Your Business</span>
            </h1>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto text-balance">
              Skip the endless searching. Access our curated directory of premium AI video creators, 
              each thoroughly vetted for quality, expertise, and reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/creators">
                  Browse Creators
                  <Search className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-foreground">
                <Link to="/pricing">
                  View Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="heading-lg">Why Choose Vidgine?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built the premium platform that connects forward-thinking businesses 
              with the most talented AI video creators in the industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="premium-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="heading-lg">Perfect for Every Use Case</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From product launches to employee training, our creators specialize in 
              delivering results across all video content needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="premium-card">
                <CardHeader>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="heading-lg">Simple Process, Premium Results</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures you find the perfect creator and achieve 
              exceptional results every time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Search & Filter",
                description: "Use our advanced filtering to find creators that match your exact requirements."
              },
              {
                step: "02", 
                title: "Review Profiles",
                description: "Browse detailed creator profiles, portfolios, and client testimonials."
              },
              {
                step: "03",
                title: "Connect & Collaborate",
                description: "Reach out to your chosen creators and start collaborating on your project."
              },
              {
                step: "04",
                title: "Track & Optimize",
                description: "Monitor project progress and measure results with our analytics tools."
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="heading-lg">Ready to Elevate Your Video Content?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join hundreds of successful businesses that trust Vidgine to connect them 
            with world-class video creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-foreground">
              <Link to="/creators">Browse Creators</Link>
            </Button>
          </div>
          <p className="text-sm opacity-75">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default ForBusiness;