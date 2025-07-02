import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Creator {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  specialties: string[];
  rate_range_min: number;
  rate_range_max: number;
  years_experience: number;
  tools_used: string[];
  featured: boolean;
  profile_image_url: string;
}

const Creators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching creators:', error);
        return;
      }

      setCreators(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "all" || 
                            creator.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  const formatRate = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
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
            <h1 className="heading-lg">Find Your Perfect Video Creator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse our curated directory of elite AI video creators. Each creator is thoroughly vetted 
              for quality, reliability, and expertise.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search creators, specialties, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="explainer_videos">Explainer Videos</SelectItem>
                  <SelectItem value="product_demos">Product Demos</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="corporate_training">Corporate Training</SelectItem>
                  <SelectItem value="marketing_campaigns">Marketing Campaigns</SelectItem>
                  <SelectItem value="educational_content">Educational Content</SelectItem>
                  <SelectItem value="testimonials">Testimonials</SelectItem>
                  <SelectItem value="animations">Animations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredCreators.length} of {creators.length} creators
          </p>
        </div>

        {/* Creators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCreators.map((creator) => (
            <Card key={creator.id} className="premium-card group">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={creator.profile_image_url || "/placeholder.svg"}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{creator.name}</h3>
                        <p className="text-sm text-muted-foreground">{creator.title}</p>
                      </div>
                    </div>
                    {creator.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {creator.bio}
                  </p>

                  {/* Location and Experience */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{creator.location}</span>
                    </div>
                    <span>{creator.years_experience} years exp.</span>
                  </div>

                  {/* Rate Range */}
                  <div className="text-sm font-medium">
                    {formatRate(creator.rate_range_min, creator.rate_range_max)}
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1">
                    {creator.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty.replace('_', ' ')}
                      </Badge>
                    ))}
                    {creator.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{creator.specialties.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* View Profile Button */}
                  <Button asChild className="w-full mt-4">
                    <Link to={`/creators/${creator.slug}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No creators found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Creators;