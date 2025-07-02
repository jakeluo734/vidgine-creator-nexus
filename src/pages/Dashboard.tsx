import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Eye, 
  Calendar, 
  Settings, 
  LogOut, 
  Crown,
  TrendingUp,
  MessageSquare,
  Star
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

interface BusinessUser {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  subscription_tier: 'free' | 'basic' | 'premium';
  subscription_active: boolean;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [businessUser, setBusinessUser] = useState<BusinessUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        navigate('/login');
        return;
      }

      setUser(user);

      // Fetch business user profile
      const { data: businessData, error: businessError } = await supabase
        .from('business_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (businessError && businessError.code !== 'PGRST116') {
        console.error('Error fetching business user:', businessError);
      } else if (businessData) {
        setBusinessUser(businessData);
      }
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getSubscriptionBadge = (tier: string) => {
    const badges = {
      free: { variant: "secondary" as const, label: "Free" },
      basic: { variant: "default" as const, label: "Basic" },
      premium: { variant: "default" as const, label: "Premium" }
    };
    return badges[tier as keyof typeof badges] || badges.free;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Welcome back, {businessUser?.contact_name || user?.user_metadata?.full_name || 'there'}!
            </h1>
            <p className="text-muted-foreground">
              Manage your account and explore our creator directory
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {businessUser && (
              <Badge {...getSubscriptionBadge(businessUser.subscription_tier)}>
                <Crown className="w-3 h-3 mr-1" />
                {getSubscriptionBadge(businessUser.subscription_tier).label}
              </Badge>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Creators Contacted</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 responded
              </p>
            </CardContent>
          </Card>
          
          <Card className="premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                {businessUser?.subscription_active ? 'Subscription active' : 'Free account'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="creators">Saved Creators</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full justify-start">
                    <Link to="/creators">
                      <Users className="w-4 h-4 mr-2" />
                      Browse Creators
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/pricing">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/resources">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Viewed Sarah Chen's profile</span>
                      <span className="text-muted-foreground ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-muted"></div>
                      <span>Searched for explainer videos</span>
                      <span className="text-muted-foreground ml-auto">1d ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-muted"></div>
                      <span>Updated account settings</span>
                      <span className="text-muted-foreground ml-auto">3d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Creators */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "Sarah Chen", title: "AI Video Specialist", rating: 5.0 },
                    { name: "Marcus Rodriguez", title: "Corporate Training Expert", rating: 4.9 },
                    { name: "Elena Kowalski", title: "Social Media Creator", rating: 4.8 }
                  ].map((creator, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{creator.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{creator.title}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{creator.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/creators">View All Creators</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creators" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Saved Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No saved creators yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start browsing our directory to save creators you're interested in.
                  </p>
                  <Button asChild>
                    <Link to="/creators">Browse Creators</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a project by connecting with one of our creators.
                  </p>
                  <Button asChild>
                    <Link to="/creators">Find Creators</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="text-sm text-muted-foreground">{user?.email}</div>
                  </div>
                  {businessUser && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <div className="text-sm text-muted-foreground">{businessUser.company_name}</div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Contact Name</label>
                        <div className="text-sm text-muted-foreground">{businessUser.contact_name}</div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subscription</label>
                        <Badge {...getSubscriptionBadge(businessUser.subscription_tier)}>
                          {getSubscriptionBadge(businessUser.subscription_tier).label}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="pt-6 border-t space-y-4">
                  <Button variant="outline" asChild>
                    <Link to="/pricing">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Subscription
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;