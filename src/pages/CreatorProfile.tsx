import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Calendar, ExternalLink, Play, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Creator {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  specialties: string[];
  portfolio_url: string;
  demo_video_url: string;
  rate_range_min: number;
  rate_range_max: number;
  years_experience: number;
  tools_used: string[];
  featured: boolean;
  profile_image_url: string;
  cover_image_url: string;
  created_at: string;
}

const CreatorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCreator();
    }
  }, [slug]);

  const fetchCreator = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
        toast({
          title: "Error",
          description: "Creator not found",
          variant: "destructive"
        });
        return;
      }

      setCreator(data);
      
      // Track view
      await supabase.from('creator_views').insert({
        creator_id: data.id,
        viewer_type: 'anonymous'
      });

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatRate = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const formatSpecialty = (specialty: string) => {
    return specialty.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-32 bg-muted rounded"></div>
                <div className="h-48 bg-muted rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Creator Not Found</h1>
            <p className="text-muted-foreground">The creator you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/creators">Browse Creators</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="h-64 bg-gradient-hero relative overflow-hidden">
        {creator.cover_image_url && (
          <img
            src={creator.cover_image_url}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/creators">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Creators
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={creator.profile_image_url || "/placeholder.svg"}
                alt={creator.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg -mt-12 md:-mt-16"
              />
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{creator.name}</h1>
                      {creator.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                    <p className="text-xl text-muted-foreground">{creator.title}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {creator.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {creator.years_experience} years experience
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link to="/signup">Contact Creator</Link>
                    </Button>
                    {creator.portfolio_url && (
                      <Button variant="outline" asChild>
                        <a href={creator.portfolio_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Portfolio
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{creator.bio}</p>
              </CardContent>
            </Card>

            {/* Demo Video */}
            {creator.demo_video_url && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Demo Reel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Play className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Demo video available to subscribers
                      </p>
                      <Button size="sm" asChild>
                        <Link to="/signup">Subscribe to View</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tools & Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Tools & Software</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {creator.tools_used.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">
                  {formatRate(creator.rate_range_min, creator.rate_range_max)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Per project. Final pricing depends on scope and requirements.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/signup">Get Quote</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {creator.specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm">{formatSpecialty(specialty)}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="text-sm font-medium">{creator.years_experience} years</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Specialties</span>
                  <span className="text-sm font-medium">{creator.specialties.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tools</span>
                  <span className="text-sm font-medium">{creator.tools_used.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;