-- Create enum for subscription tiers
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium');

-- Create enum for creator specialties
CREATE TYPE creator_specialty AS ENUM ('explainer_videos', 'product_demos', 'social_media', 'corporate_training', 'marketing_campaigns', 'educational_content', 'testimonials', 'animations');

-- Create creators table
CREATE TABLE public.creators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  location TEXT,
  specialties creator_specialty[] NOT NULL DEFAULT '{}',
  portfolio_url TEXT,
  demo_video_url TEXT,
  rate_range_min INTEGER,
  rate_range_max INTEGER,
  years_experience INTEGER,
  tools_used TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  profile_image_url TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create business_users table for authentication
CREATE TABLE public.business_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subscription_tier subscription_tier NOT NULL DEFAULT 'free',
  subscription_active BOOLEAN DEFAULT true,
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create resources/blog posts table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create creator views tracking for analytics
CREATE TABLE public.creator_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  business_user_id UUID REFERENCES public.business_users(id) ON DELETE SET NULL,
  viewer_type TEXT NOT NULL CHECK (viewer_type IN ('anonymous', 'subscriber')),
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_views ENABLE ROW LEVEL SECURITY;

-- Creators policies (public read access)
CREATE POLICY "Creators are viewable by everyone" 
ON public.creators 
FOR SELECT 
USING (true);

-- Business users policies (users can only see their own data)
CREATE POLICY "Business users can view their own profile" 
ON public.business_users 
FOR ALL
USING (auth.uid() = user_id);

-- Resources policies (public read access)
CREATE POLICY "Published resources are viewable by everyone" 
ON public.resources 
FOR SELECT 
USING (published = true);

-- Creator views policies
CREATE POLICY "Anyone can insert creator views" 
ON public.creator_views 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Business users can view their own creator views" 
ON public.creator_views 
FOR SELECT 
USING (
  business_user_id IS NULL OR 
  business_user_id IN (SELECT id FROM public.business_users WHERE user_id = auth.uid())
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_creators_updated_at
  BEFORE UPDATE ON public.creators
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_users_updated_at
  BEFORE UPDATE ON public.business_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_creators_slug ON public.creators(slug);
CREATE INDEX idx_creators_featured ON public.creators(featured);
CREATE INDEX idx_creators_specialties ON public.creators USING GIN(specialties);
CREATE INDEX idx_resources_slug ON public.resources(slug);
CREATE INDEX idx_resources_published ON public.resources(published);
CREATE INDEX idx_resources_featured ON public.resources(featured);
CREATE INDEX idx_creator_views_creator_id ON public.creator_views(creator_id);

-- Insert sample data
INSERT INTO public.creators (slug, name, title, bio, location, specialties, rate_range_min, rate_range_max, years_experience, tools_used, featured, profile_image_url) VALUES
('sarah-chen', 'Sarah Chen', 'AI Video Specialist', 'Expert in creating compelling explainer videos for tech startups and SaaS companies. Specializes in making complex concepts accessible and engaging.', 'San Francisco, CA', ARRAY['explainer_videos', 'product_demos'], 2500, 5000, 5, ARRAY['After Effects', 'Premiere Pro', 'Cinema 4D'], true, '/placeholder.svg'),
('marcus-rodriguez', 'Marcus Rodriguez', 'Corporate Training Expert', 'Creating impactful training videos for Fortune 500 companies. Proven track record of improving employee engagement and knowledge retention.', 'Austin, TX', ARRAY['corporate_training', 'educational_content'], 3000, 7500, 8, ARRAY['Camtasia', 'After Effects', 'Articulate'], true, '/placeholder.svg'),
('elena-kowalski', 'Elena Kowalski', 'Social Media Creator', 'Viral content creator specializing in short-form videos for brands. Expert in TikTok, Instagram, and YouTube Shorts optimization.', 'New York, NY', ARRAY['social_media', 'marketing_campaigns'], 1500, 3500, 3, ARRAY['CapCut', 'After Effects', 'DaVinci Resolve'], false, '/placeholder.svg');

INSERT INTO public.resources (slug, title, excerpt, content, author, published, featured, tags) VALUES
('ultimate-guide-ai-video-creation', 'The Ultimate Guide to AI Video Creation in 2024', 'Discover the latest AI tools and techniques that are revolutionizing video production for businesses.', '# The Ultimate Guide to AI Video Creation in 2024\n\nArtificial Intelligence is transforming the video creation landscape...', 'Vidgine Team', true, true, ARRAY['AI', 'Video Production', 'Technology']),
('choosing-right-video-creator', 'How to Choose the Right Video Creator for Your Business', 'Learn the key factors to consider when selecting a video creator that aligns with your brand and goals.', '# How to Choose the Right Video Creator for Your Business\n\nSelecting the right video creator is crucial for your success...', 'Vidgine Team', true, false, ARRAY['Business', 'Creator Selection', 'Guide']);