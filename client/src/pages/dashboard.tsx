import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Settings, Globe, Eye, Laptop, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DomainSearch from "@/components/domain-search";

type Website = {
  id: number;
  userId: number;
  templateId: number;
  name: string;
  domain: string | null;
  domainVerified: boolean;
  primaryColor: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  content?: WebsiteContent;
};

type WebsiteContent = {
  id: number;
  websiteId: number;
  businessName: string | null;
  tagline: string | null;
  aboutUs: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  heroImage: string | null;
  logo: string | null;
  galleryImages: string[] | null;
  isPublished: boolean;
  publishedAt: Date | null;
};

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
};

type MenuSection = "websites" | "domains";

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeSection, setActiveSection] = useState<MenuSection>("websites");
  const [selectedWebsiteForDomain, setSelectedWebsiteForDomain] = useState<number | null>(null);

  // Fetch all user websites
  const { data: websites = [], isLoading: websitesLoading } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  // Fetch templates
  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  if (websitesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" data-testid="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-border h-16 flex-shrink-0">
        <div className="h-full px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => logoutMutation.mutate()} data-testid="button-logout">
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Menu */}
        <div className="w-64 bg-white border-r flex-shrink-0 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">Menu</h2>
            <div className="space-y-1">
              <button
                onClick={() => setActiveSection("websites")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "websites"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                data-testid="menu-my-websites"
              >
                <Laptop className="h-4 w-4" />
                <span>My Websites</span>
              </button>
              <button
                onClick={() => setActiveSection("domains")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "domains"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                data-testid="menu-my-domains"
              >
                <Globe className="h-4 w-4" />
                <span>My Domains</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {activeSection === "websites" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">My Websites</h2>
                    <p className="text-gray-600">Manage and edit your websites</p>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => window.location.href = '/choose-purpose'}
                    data-testid="button-create-website"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Website
                  </Button>
                </div>
                
                {/* Website Cards Grid */}
                {websites.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-16">
                      <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No websites yet</h3>
                      <p className="text-gray-600 mb-6">Create your first website to get started</p>
                      <Button 
                        size="lg"
                        onClick={() => window.location.href = '/choose-purpose'}
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Create Your First Website
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {websites.map((website) => {
                      const template = templates.find(t => t.id === website.templateId);
                      return (
                        <Card key={website.id} className="overflow-hidden group hover:shadow-lg transition-shadow" data-testid={`website-card-${website.id}`}>
                          <div className="relative w-full bg-white border-b" style={{ height: '200px', overflow: 'hidden' }}>
                            <img
                              src={template?.previewImage || '/placeholder.jpg'}
                              alt={website.name}
                              className="absolute top-0 left-0 w-full h-auto min-h-full object-cover object-top"
                              style={{ maxWidth: '100%' }}
                            />
                          </div>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base truncate mb-2">{website.name}</CardTitle>
                            <p className="text-xs text-gray-600 truncate mb-3">
                              {website.domain 
                                ? `https://${website.domain}` 
                                : `Preview: https://preview.yoursite.com/${website.id}`
                              }
                            </p>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="text-gray-500 min-w-[85px]">Start Date:</span>
                                <span className="text-gray-700">{new Date(website.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-gray-500 min-w-[85px]">Last Modified:</span>
                                <span className="text-gray-700">{new Date(website.updatedAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-gray-500 min-w-[85px]">Site Status:</span>
                                <Badge 
                                  variant={website.content?.isPublished ? "default" : "outline"} 
                                  className={`text-xs h-5 ${website.content?.isPublished ? "bg-blue-600" : "bg-amber-100 text-amber-800 border-amber-300"}`}
                                >
                                  {website.content?.isPublished ? "Live to Public" : "Draft"}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex gap-1.5">
                              <Button 
                                onClick={() => {
                                  navigate(`/editor/${website.id}`);
                                }}
                                variant="outline"
                                size="sm"
                                className="hover:bg-black hover:text-white"
                                data-testid={`button-edit-${website.id}`}
                              >
                                <Settings className="h-4 w-4 mr-1" />
                                Edit Site
                              </Button>
                              <Button 
                                onClick={() => window.open(`/template-preview?websiteId=${website.id}`, '_blank')}
                                variant="outline"
                                size="sm"
                                className="hover:bg-black hover:text-white"
                                data-testid={`button-preview-${website.id}`}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeSection === "domains" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Domain Name Management</h2>
                  <p className="text-gray-600">Search for domains, view purchased domains, and manage DNS settings.</p>
                </div>

                {/* Domain Search Section */}
                {websites.length > 0 && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Search for a Domain</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!selectedWebsiteForDomain ? (
                        <div>
                          <p className="text-sm text-gray-600 mb-4">Select which website you'd like to link this domain to:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {websites.map((website) => (
                              <div
                                key={website.id}
                                onClick={() => setSelectedWebsiteForDomain(website.id)}
                                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-colors"
                                data-testid={`select-website-${website.id}`}
                              >
                                <h4 className="font-semibold">{website.name}</h4>
                                {website.domain && (
                                  <p className="text-xs text-gray-500 mt-1">Current domain: {website.domain}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Purchasing domain for:</p>
                              <p className="font-semibold">{websites.find(w => w.id === selectedWebsiteForDomain)?.name}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedWebsiteForDomain(null)}
                            >
                              Change Website
                            </Button>
                          </div>
                          <DomainSearch
                            websiteId={selectedWebsiteForDomain}
                            onDomainPurchased={(domain) => {
                              queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
                              setSelectedWebsiteForDomain(null);
                              toast({
                                title: "Domain Purchased",
                                description: `${domain} has been purchased and linked to your website.`,
                              });
                            }}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {websites.length === 0 && (
                  <Card className="mb-6">
                    <CardContent className="pt-6 text-center py-16">
                      <Laptop className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Create a website first</h3>
                      <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                        You need to create at least one website before you can purchase domains.
                      </p>
                      <Button onClick={() => setActiveSection("websites")}>
                        Create Website
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Your Domains Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Domains</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {websites.filter(w => w.domain).length === 0 ? (
                      <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                        <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-1">No domains yet</p>
                        <p className="text-sm text-gray-500">Search and purchase a domain to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {websites.filter(w => w.domain).map((website) => (
                          <div key={website.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50" data-testid={`domain-card-${website.id}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Globe className="h-8 w-8 text-gray-400" />
                                <div>
                                  <h3 className="font-semibold text-lg">{website.domain}</h3>
                                  <p className="text-sm text-gray-600">Linked to: {website.name}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant={website.domainVerified ? "default" : "secondary"} className={website.domainVerified ? "bg-green-600" : ""}>
                                  {website.domainVerified ? "Active" : "Pending"}
                                </Badge>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/editor/${website.id}`)}
                                  data-testid={`button-manage-${website.id}`}
                                >
                                  <Settings className="h-4 w-4 mr-1" />
                                  Manage
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
