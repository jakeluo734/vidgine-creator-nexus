import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Zap, Shield, ArrowRight, Play, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const featuredCreators = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "AI Video Specialist",
      image: "/placeholder.svg",
      rating: 5.0,
      reviews: 47,
      specialties: ["Explainer Videos", "Product Demos"]
    },
    {
      id: 2,
      name: "Marcus Rodriguez", 
      title: "Corporate Training Expert",
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 32,
      specialties: ["Corporate Training", "Educational Content"]
    },
    {
      id: 3,
      name: "Elena Kowalski",
      title: "Social Media Creator",
      image: "/placeholder.svg", 
      rating: 4.8,
      reviews: 28,
      specialties: ["Social Media", "Marketing Campaigns"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Vetted AI Video Creators
            </Badge>
            
            <h1 className="heading-xl text-balance">
              Connect with Elite
              <span className="text-gradient block">AI Video Creators</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Access our curated directory of premium video creators specializing in AI-powered content. 
              Find the perfect talent for your next video project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="premium-button">
                <Link to="/creators">
                  Browse Creators
                  <Search className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/for-business">
                  <Play className="w-5 h-5 mr-2" />
                  For Business
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Value Proposition */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* For Creators */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary">For Video Creators</Badge>
                <h2 className="heading-lg">Showcase Your Expertise</h2>
                <p className="text-lg text-muted-foreground">
                  Join our exclusive directory of vetted AI video creators. Get discovered by premium brands 
                  and businesses looking for top-tier video production talent.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Premium Positioning</h3>
                    <p className="text-muted-foreground">Stand out as a verified expert in AI video creation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Quality Clients</h3>
                    <p className="text-muted-foreground">Connect with businesses that value premium work</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Grow Your Business</h3>
                    <p className="text-muted-foreground">Increase your visibility and client base</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="lg">
                Apply as Creator
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* For Businesses */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary">For Businesses</Badge>
                <h2 className="heading-lg">Find Vetted Talent</h2>
                <p className="text-lg text-muted-foreground">
                  Skip the endless searching. Access our curated directory of elite AI video creators, 
                  each thoroughly vetted for quality and expertise.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Thoroughly Vetted</h3>
                    <p className="text-muted-foreground">Every creator is verified for quality and reliability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Search className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Advanced Filtering</h3>
                    <p className="text-muted-foreground">Find creators by specialty, budget, and timeline</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Premium Support</h3>
                    <p className="text-muted-foreground">Get dedicated support throughout your project</p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" asChild className="premium-button">
                <Link to="/for-business">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary">Featured Creators</Badge>
            <h2 className="heading-lg">Meet Our Top Creators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover some of our highest-rated AI video creators, each bringing unique expertise to your projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCreators.map((creator) => (
              <Card key={creator.id} className="premium-card group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{creator.name}</h3>
                      <p className="text-muted-foreground">{creator.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{creator.rating}</span>
                    <span className="text-muted-foreground">({creator.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {creator.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/creators">
                View All Creators
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="heading-lg">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses that trust Vidgine to connect them with the best AI video creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/creators">Browse Creators</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-foreground">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
