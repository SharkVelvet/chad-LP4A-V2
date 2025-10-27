import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ExternalLink, Settings, Edit, Globe, Palette, Eye, Save } from "lucide-react";
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
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<number | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createFormData, setCreateFormData] = useState({ name: "", templateId: "" });
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  // Fetch all user websites
  const { data: websites = [], isLoading: websitesLoading } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  // Listen for template selection from preview window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'SELECT_TEMPLATE') {
        setCreateFormData({ name: "", templateId: event.data.templateId.toString() });
        setShowCreateDialog(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Don't auto-select website - let user choose from overview

  // Fetch templates for creating new site
  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  // Fetch selected website details
  const { data: selectedWebsite } = useQuery<Website>({
    queryKey: ["/api/websites", selectedWebsiteId],
    queryFn: async () => {
      const res = await fetch(`/api/websites/${selectedWebsiteId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch website");
      return res.json();
    },
    enabled: !!selectedWebsiteId,
    staleTime: 0,
    refetchOnMount: true,
  });

  // Create website mutation
  const createWebsiteMutation = useMutation({
    mutationFn: async (data: { name: string; templateId: number; subscriptionPlan: string }) => {
      const res = await apiRequest("POST", "/api/websites", data);
      return res.json();
    },
    onSuccess: (newWebsite) => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
      setSelectedWebsiteId(newWebsite.id);
      setShowCreateDialog(false);
      toast({
        title: "Website Created",
        description: "Your new website has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Creating Website",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update website content mutation
  const updateContentMutation = useMutation({
    mutationFn: async (data: Partial<WebsiteContent>) => {
      if (!selectedWebsiteId) throw new Error("No website selected");
      const res = await apiRequest("PUT", `/api/websites/${selectedWebsiteId}/content`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites", selectedWebsiteId] });
      toast({
        title: "Content Updated",
        description: "Your changes have been saved as draft.",
      });
    },
  });

  // Publish website content mutation
  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!selectedWebsiteId) throw new Error("No website selected");
      const res = await apiRequest("POST", `/api/websites/${selectedWebsiteId}/publish`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites", selectedWebsiteId] });
      toast({
        title: "Website Published",
        description: "Your changes are now live!",
      });
    },
  });

  // Update website settings mutation
  const updateWebsiteMutation = useMutation({
    mutationFn: async (data: { primaryColor?: string; name?: string }) => {
      if (!selectedWebsiteId) throw new Error("No website selected");
      const res = await apiRequest("PUT", `/api/websites/${selectedWebsiteId}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
      queryClient.invalidateQueries({ queryKey: ["/api/websites", selectedWebsiteId] });
      toast({
        title: "Settings Updated",
        description: "Website settings have been updated.",
      });
    },
  });

  const handleCreateWebsite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!createFormData.templateId) {
      toast({
        title: "Error",
        description: "Please select a template",
        variant: "destructive",
      });
      return;
    }
    createWebsiteMutation.mutate({
      name: createFormData.name,
      templateId: parseInt(createFormData.templateId),
      subscriptionPlan: "basic",
    });
    setCreateFormData({ name: "", templateId: "" });
  };

  const handleContentUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateContentMutation.mutate({
      businessName: formData.get("businessName") as string,
      tagline: formData.get("tagline") as string,
      aboutUs: formData.get("aboutUs") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
    });
  };

  const handlePrimaryColorUpdate = (color: string) => {
    updateWebsiteMutation.mutate({ primaryColor: color });
  };

  if (websitesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" data-testid="loading-spinner" />
      </div>
    );
  }

  const content = selectedWebsite?.content || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">My Websites</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={() => logoutMutation.mutate()} data-testid="button-logout">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
            {!selectedWebsiteId ? (
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
                    data-testid="button-create-website-main"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Website
                  </Button>
                  <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="hidden" data-testid="button-create-website-dialog">
                        <Plus className="h-5 w-5 mr-2" />
                        Create New Website (Dialog)
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Website</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCreateWebsite} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Website Name</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            value={createFormData.name}
                            onChange={(e) => setCreateFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="My Business Website"
                            data-testid="input-website-name-main"
                          />
                        </div>
                        <div>
                          <Label htmlFor="templateId">Template</Label>
                          <Select
                            value={createFormData.templateId}
                            onValueChange={(value) => setCreateFormData(prev => ({ ...prev, templateId: value }))}
                            required
                          >
                            <SelectTrigger data-testid="select-template-main">
                              <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent>
                              {templates.map((template) => (
                                <SelectItem key={template.id} value={template.id.toString()}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={createWebsiteMutation.isPending}
                          data-testid="button-submit-create-main"
                        >
                          {createWebsiteMutation.isPending ? "Creating..." : "Create Website"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
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
                      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                        <DialogTrigger asChild>
                          <Button size="lg" className="hidden">
                            <Plus className="h-5 w-5 mr-2" />
                            Create Your First Website (Dialog)
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Website</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreateWebsite} className="space-y-4">
                            <div>
                              <Label htmlFor="name">Website Name</Label>
                              <Input
                                id="name"
                                name="name"
                                required
                                value={createFormData.name}
                                onChange={(e) => setCreateFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="My Business Website"
                              />
                            </div>
                            <div>
                              <Label htmlFor="templateId">Template</Label>
                              <Select
                                value={createFormData.templateId}
                                onValueChange={(value) => setCreateFormData(prev => ({ ...prev, templateId: value }))}
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                  {templates.map((template) => (
                                    <SelectItem key={template.id} value={template.id.toString()}>
                                      {template.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={createWebsiteMutation.isPending}
                            >
                              {createWebsiteMutation.isPending ? "Creating..." : "Create Website"}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {websites.map((website) => {
                      const template = templates.find(t => t.id === website.templateId);
                      return (
                        <Card key={website.id} className="overflow-hidden group hover:shadow-lg transition-shadow" data-testid={`website-overview-card-${website.id}`}>
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
                                data-testid={`button-setup-${website.id}`}
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
            ) : (
              <div>
                <div className="mb-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedWebsiteId(null)}
                    data-testid="button-back-to-dashboard"
                  >
                    ← Back to Dashboard
                  </Button>
                </div>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="content" data-testid="tab-content">
                      <Edit className="h-4 w-4 mr-2" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="settings" data-testid="tab-settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </TabsTrigger>
                    <TabsTrigger value="preview" data-testid="tab-preview">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>

                {/* Content Editor Tab */}
                <TabsContent value="content">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Edit Content</CardTitle>
                          <CardDescription>
                            {content.isPublished ? "Editing published content" : "Draft mode - not published yet"}
                          </CardDescription>
                        </div>
                        <Button
                          onClick={() => publishMutation.mutate()}
                          disabled={publishMutation.isPending}
                          data-testid="button-publish"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {publishMutation.isPending ? "Publishing..." : "Publish Live"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleContentUpdate} key={`${selectedWebsiteId}-${selectedWebsite?.content?.updatedAt}`} className="space-y-4">
                        <div>
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            defaultValue={content.businessName || ""}
                            placeholder="Your Business Name"
                            data-testid="input-business-name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="tagline">Tagline</Label>
                          <Input
                            id="tagline"
                            name="tagline"
                            defaultValue={content.tagline || ""}
                            placeholder="Your business tagline"
                            data-testid="input-tagline"
                          />
                        </div>

                        <div>
                          <Label htmlFor="aboutUs">About Us</Label>
                          <Textarea
                            id="aboutUs"
                            name="aboutUs"
                            rows={4}
                            defaultValue={content.aboutUs || ""}
                            placeholder="Tell customers about your business..."
                            data-testid="textarea-about"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              defaultValue={content.phone || ""}
                              placeholder="Phone Number"
                              data-testid="input-phone"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              defaultValue={content.email || ""}
                              placeholder="Email Address"
                              data-testid="input-email"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            defaultValue={content.address || ""}
                            placeholder="Business Address"
                            data-testid="input-address"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={updateContentMutation.isPending}
                          data-testid="button-save-draft"
                        >
                          {updateContentMutation.isPending ? "Saving..." : "Save as Draft"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Website Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <Label>Website Name</Label>
                          <div className="flex gap-2">
                            <Input
                              defaultValue={selectedWebsite?.name || ""}
                              key={`name-${selectedWebsiteId}`}
                              placeholder="My Website"
                              data-testid="input-site-name"
                              onBlur={(e) => {
                                if (e.target.value !== selectedWebsite?.name) {
                                  updateWebsiteMutation.mutate({ name: e.target.value });
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Current Domain</Label>
                          <div className="flex gap-2">
                            <Input
                              value={selectedWebsite?.domain || "Not connected"}
                              readOnly
                              className="bg-gray-50"
                              data-testid="text-domain"
                            />
                            {selectedWebsite?.domain && (
                              <Badge variant={selectedWebsite.domainVerified ? "default" : "secondary"}>
                                {selectedWebsite.domainVerified ? "Verified" : "Pending"}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Domain Search and Purchase */}
                        <div className="pt-4 border-t">
                          <DomainSearch
                            websiteId={selectedWebsiteId}
                            onDomainPurchased={(domain) => {
                              queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
                              queryClient.invalidateQueries({ queryKey: ["/api/websites", selectedWebsiteId] });
                              toast({
                                title: "Domain Connected",
                                description: `${domain} is now connected to your website.`,
                              });
                            }}
                          />
                        </div>

                        <div>
                          <Label>Primary Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              defaultValue={selectedWebsite?.primaryColor || "#000000"}
                              key={`color-${selectedWebsiteId}-${selectedWebsite?.primaryColor}`}
                              className="w-20 h-10"
                              data-testid="input-primary-color"
                              onBlur={(e) => {
                                if (e.target.value !== selectedWebsite?.primaryColor) {
                                  handlePrimaryColorUpdate(e.target.value);
                                }
                              }}
                            />
                            <Input
                              value={selectedWebsite?.primaryColor || "#000000"}
                              readOnly
                              className="bg-gray-50"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">This color will be used throughout your website</p>
                        </div>

                        <div>
                          <Label>Template</Label>
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-medium">Template #{selectedWebsite?.templateId}</p>
                            <Button variant="link" size="sm" className="p-0 h-auto" data-testid="button-change-template">
                              Change Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview" className="mt-0">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-sm text-gray-400">Desktop Preview</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const template = templates?.find(t => t.id === selectedWebsite?.templateId);
                            if (template) {
                              window.open(`/template-preview?template=${template.slug}&websiteId=${selectedWebsiteId}`, '_blank');
                            }
                          }}
                          className="text-white hover:text-white hover:bg-gray-700"
                          data-testid="button-open-preview"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in New Window
                        </Button>
                      </div>
                      <div className="overflow-auto bg-gray-50" style={{ height: '700px' }}>
                        <div 
                          style={{ 
                            width: '1440px',
                            height: '900px',
                            transform: 'scale(0.7)',
                            transformOrigin: 'top left',
                          }}
                        >
                          <iframe
                            src={`/template-preview?template=${templates?.find(t => t.id === selectedWebsite?.templateId)?.slug}&websiteId=${selectedWebsiteId}`}
                            className="border-0"
                            style={{ width: '1440px', height: '900px' }}
                            title="Website Preview"
                            data-testid="iframe-preview"
                            key={`preview-${selectedWebsiteId}-${selectedWebsite?.content?.updatedAt}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              </div>
            )}
        </div>
      </div>

      {/* Template Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-[80vw] max-h-[80vh] h-[80vh] p-0 overflow-visible" closeButtonPosition="left">
          <DialogHeader className="px-6 py-3 border-b">
            <div className="flex items-center justify-between gap-8">
              <div className="flex-1">
                <DialogTitle className="text-2xl">{previewTemplate?.name}</DialogTitle>
                <p className="text-sm text-gray-600 mt-1">{previewTemplate?.description}</p>
              </div>
              <Button
                onClick={() => {
                  if (previewTemplate) {
                    setCreateFormData({ name: "", templateId: previewTemplate.id.toString() });
                    setPreviewTemplate(null);
                    setShowCreateDialog(true);
                  }
                }}
                data-testid="button-select-template"
                className="shrink-0"
              >
                Select This Template
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto bg-gray-50 flex items-start justify-center p-6">
            {previewTemplate && (
              <div className="w-full max-w-4xl">
                <img
                  src={previewTemplate.previewImage}
                  alt={`Preview of ${previewTemplate.name}`}
                  className="w-full h-auto shadow-lg"
                  style={{ borderRadius: '12px' }}
                  data-testid="img-template-preview"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
