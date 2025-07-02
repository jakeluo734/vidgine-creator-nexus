import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image_url: string;
  author: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  created_at: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        return;
      }

      setResources(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="space-y-6 mb-12">
          <div className="space-y-4">
            <h1 className="heading-lg">Resources & Insights</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Stay ahead with expert insights, industry trends, and actionable guides for AI video creation and digital marketing.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredResources.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredResources.map((resource) => (
                <Card key={resource.id} className="premium-card overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    {resource.featured_image_url ? (
                      <img
                        src={resource.featured_image_url}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary opacity-20"></div>
                    )}
                    <Badge className="absolute top-4 left-4">Featured</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(resource.created_at)}</span>
                        <span>•</span>
                        <span>By {resource.author}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold leading-tight">
                        <Link 
                          to={`/resources/${resource.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {resource.title}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground">
                        {resource.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="ghost" asChild className="p-0 h-auto">
                        <Link to={`/resources/${resource.slug}`} className="inline-flex items-center">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            {featuredResources.length > 0 ? "Latest Articles" : "All Articles"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map((resource) => (
              <Card key={resource.id} className="premium-card overflow-hidden">
                <div className="aspect-video bg-muted">
                  {resource.featured_image_url ? (
                    <img
                      src={resource.featured_image_url}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-secondary opacity-20"></div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(resource.created_at)}</span>
                    </div>
                    
                    <h3 className="font-semibold leading-tight">
                      <Link 
                        to={`/resources/${resource.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {resource.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {resource.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;