import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  author: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  created_at: string;
}

const ResourceArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchResource();
    }
  }, [slug]);

  const fetchResource = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching resource:', error);
        toast({
          title: "Error",
          description: "Article not found",
          variant: "destructive"
        });
        return;
      }

      setResource(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource?.title,
          text: resource?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Article Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/resources">Browse Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/resources">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
        </Button>

        {/* Header */}
        <header className="space-y-8 mb-12">
          {/* Featured Image */}
          {resource.featured_image_url && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={resource.featured_image_url}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-6">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(resource.created_at)}</span>
              </div>
              <span>•</span>
              <span>By {resource.author}</span>
              {resource.featured && (
                <>
                  <span>•</span>
                  <Badge variant="secondary" className="text-xs">Featured</Badge>
                </>
              )}
            </div>

            {/* Title and Excerpt */}
            <div className="space-y-4">
              <h1 className="heading-lg">{resource.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {resource.excerpt}
              </p>
            </div>

            {/* Tags and Share */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </header>

        <Separator className="mb-12" />

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div 
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: resource.content.replace(/\n/g, '<br>') 
            }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold">About the Author</h3>
              <p className="text-sm text-muted-foreground">
                {resource.author} is part of the Vidgine team, specializing in AI video creation and digital marketing insights.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
              <Button asChild>
                <Link to="/resources">More Articles</Link>
              </Button>
            </div>
          </div>
        </footer>

        {/* CTA Section */}
        <section className="mt-16 p-8 bg-gradient-primary rounded-lg text-white text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Ready to Find Your Video Creator?</h2>
            <p className="opacity-90">
              Browse our curated directory of elite AI video creators and find the perfect match for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/creators">Browse Creators</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-foreground">
                <Link to="/for-business">For Business</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default ResourceArticle;