import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<number | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createFormData, setCreateFormData] = useState({ name: "", templateId: "" });

  // Fetch all user websites
  const { data: websites = [], isLoading: websitesLoading } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  // Fetch templates for creating new site
  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  // Fetch selected website details
  const { data: selectedWebsite } = useQuery<Website>({
    queryKey: ["/api/websites", selectedWebsiteId],
    enabled: !!selectedWebsiteId,
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Websites List Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Your Websites</CardTitle>
                  <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" data-testid="button-create-website">
                        <Plus className="h-4 w-4 mr-1" />
                        New
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
                            data-testid="input-website-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="templateId">Template</Label>
                          <Select
                            value={createFormData.templateId}
                            onValueChange={(value) => setCreateFormData(prev => ({ ...prev, templateId: value }))}
                            required
                          >
                            <SelectTrigger data-testid="select-template">
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
                          data-testid="button-submit-create"
                        >
                          {createWebsiteMutation.isPending ? "Creating..." : "Create Website"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {websites.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No websites yet. Create one to get started!</p>
                ) : (
                  websites.map((website) => (
                    <button
                      key={website.id}
                      onClick={() => setSelectedWebsiteId(website.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedWebsiteId === website.id
                          ? "bg-primary/10 border-primary"
                          : "bg-white border-border hover:bg-gray-50"
                      }`}
                      data-testid={`website-card-${website.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{website.name}</p>
                          <p className="text-xs text-gray-500 truncate">{website.domain || "No domain"}</p>
                        </div>
                        <Badge variant={website.isActive ? "default" : "secondary"} className="ml-2">
                          {website.subscriptionStatus}
                        </Badge>
                      </div>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {!selectedWebsiteId ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Website</h3>
                  <p className="text-gray-600 mb-4">Choose a website from the list to edit its content and settings.</p>
                </CardContent>
              </Card>
            ) : (
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
                      <form onSubmit={handleContentUpdate} key={selectedWebsiteId} className="space-y-4">
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
                          <Label>Domain</Label>
                          <div className="flex gap-2">
                            <Input
                              value={selectedWebsite?.domain || ""}
                              readOnly
                              placeholder="Not connected"
                              className="bg-gray-50"
                              data-testid="text-domain"
                            />
                            <Button variant="outline" data-testid="button-connect-domain">
                              <Globe className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label>Primary Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              defaultValue={selectedWebsite?.primaryColor || "#000000"}
                              key={`color-${selectedWebsiteId}`}
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
                <TabsContent value="preview">
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Preview Coming Soon</h3>
                      <p className="text-gray-600 mb-4">
                        Live preview will show how your website looks with current changes.
                      </p>
                      {selectedWebsite?.domain && (
                        <Button variant="outline" asChild data-testid="link-view-live">
                          <a href={`https://${selectedWebsite.domain}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Published Site
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
