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

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

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
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors bg-black text-white"
                data-testid="menu-my-websites"
              >
                <Laptop className="h-4 w-4" />
                <span>My Websites</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
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
                                  className={`text-xs h-5 ${
                                    website.content?.maintenanceMode 
                                      ? "bg-orange-500 text-white" 
                                      : website.content?.isPublished 
                                        ? "bg-green-600 text-white" 
                                        : "bg-gray-100 text-gray-700 border-gray-300"
                                  }`}
                                >
                                  {website.content?.maintenanceMode 
                                    ? "🔧 Maintenance" 
                                    : website.content?.isPublished 
                                      ? "✓ Published" 
                                      : "Draft"
                                  }
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
          </div>
        </div>
      </div>
    </div>
  );
}
