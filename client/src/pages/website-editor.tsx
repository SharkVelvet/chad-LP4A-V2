import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Globe, BarChart3, Search, Save, ArrowLeft, ChevronDown, ChevronRight, FileEdit, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type Website = {
  id: number;
  userId: number;
  templateId: number;
  name: string;
  domain: string | null;
  subscriptionStatus: string;
  siteStatus: string;
  content?: {
    businessName: string | null;
    tagline: string | null;
    aboutUs: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
  };
};

type Template = {
  id: number;
  name: string;
  slug: string;
};

type MenuSection = "website" | "edit-content" | "colors" | "domain" | "settings" | "seo" | "analytics";

export default function WebsiteEditor() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/editor/:websiteId");
  const websiteId = params?.websiteId ? parseInt(params.websiteId) : null;
  const [activeSection, setActiveSection] = useState<MenuSection>("website");
  const [isWebsiteExpanded] = useState(true); // Always keep Website menu expanded
  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    businessName: "",
    tagline: "",
    aboutUs: "",
    phone: "",
    email: "",
    address: "",
  });

  // Fetch website data
  const { data: website, isLoading } = useQuery<Website>({
    queryKey: ["/api/websites", websiteId],
    queryFn: async () => {
      const res = await fetch(`/api/websites/${websiteId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch website");
      return res.json();
    },
    enabled: !!websiteId,
  });

  // Fetch templates to get the slug
  const { data: templates } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const template = templates?.find(t => t.id === website?.templateId);

  // Save content mutation (defined early so it can be used in effects)
  const saveContentMutation = useMutation({
    mutationFn: async (content: typeof formData) => {
      const res = await apiRequest("PUT", `/api/websites/${websiteId}/content`, content);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites", websiteId] });
      toast({
        title: "Changes saved",
        description: "Your website content has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Populate form with existing data
  useEffect(() => {
    if (website?.content) {
      setFormData({
        businessName: website.content.businessName || "",
        tagline: website.content.tagline || "",
        aboutUs: website.content.aboutUs || "",
        phone: website.content.phone || "",
        email: website.content.email || "",
        address: website.content.address || "",
      });
    }
  }, [website]);

  // Save flexible content mutation (for any content ID)
  const saveFlexibleContentMutation = useMutation({
    mutationFn: async ({ contentId, value }: { contentId: string; value: string }) => {
      const res = await apiRequest("PATCH", `/api/websites/${websiteId}/content/${encodeURIComponent(contentId)}`, { value });
      return await res.json();
    },
    onSuccess: async () => {
      // Refetch website data
      await queryClient.invalidateQueries({ queryKey: ["/api/websites", websiteId] });
      
      // Tell iframe to reload content without full page refresh
      const iframe = document.querySelector('iframe[data-testid="iframe-edit-mode"]') as HTMLIFrameElement;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'RELOAD_CONTENT' }, window.location.origin);
      }
      
      toast({
        title: "Changes saved",
        description: "Your website content has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Listen for edit messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'CONTENT_EDIT') {
        const { field, value, contentId } = event.data;
        
        // Use flexible content ID if provided, otherwise fall back to legacy field
        if (contentId) {
          saveFlexibleContentMutation.mutate({ contentId, value });
        } else if (field) {
          // Legacy support - save using old method
          const updatedContent = {
            ...formData,
            [field]: value
          };
          setFormData(updatedContent);
          saveContentMutation.mutate(updatedContent);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [formData]);

  const handleSave = () => {
    saveContentMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!websiteId) {
    return <div>Invalid website ID</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!website) {
    return <div>Website not found</div>;
  }

  const menuItems = [
    { id: "settings" as MenuSection, label: "Settings", icon: Settings },
    { id: "seo" as MenuSection, label: "SEO", icon: Search },
    { id: "analytics" as MenuSection, label: "Analytics", icon: BarChart3 },
    { id: "domain" as MenuSection, label: "Domain Name", icon: Globe },
  ];

  const websiteSubItems = [
    { id: "edit-content" as MenuSection, label: "Edit Content", icon: FileEdit },
    { id: "colors" as MenuSection, label: "Colors", icon: Palette },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top header */}
      <div className="bg-white border-b h-14 flex items-center px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            data-testid="button-back-to-dashboard"
          >
            ← Back to Dashboard
          </Button>
          <span className="text-sm text-gray-500">|</span>
          <h1 className="text-sm font-semibold">{website.name}</h1>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Menu */}
        <div className="w-64 bg-white border-r flex-shrink-0 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">Editor Menu</h2>
            <div className="space-y-1">
              {/* Website menu item with submenu */}
              <div>
                <button
                  onClick={() => {
                    setActiveSection("website");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "website" || activeSection === "edit-content" || activeSection === "colors"
                      ? "border-2 border-black text-black bg-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  data-testid="menu-website"
                >
                  <Globe className="h-4 w-4" />
                  <span className="flex-1 text-left">Website</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Website submenu - Always visible */}
                {true && (
                  <div className="mt-1 ml-4 space-y-1">
                    {websiteSubItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (item.id === "edit-content") {
                              setIsEditOverlayOpen(true);
                            } else {
                              setActiveSection(item.id);
                            }
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "border-2 border-black text-black bg-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          data-testid={`menu-${item.id}`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Other menu items */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "border-2 border-black text-black bg-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    data-testid={`menu-${item.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content area with sliding panels */}
        <div className="flex-1 relative overflow-hidden">
          {/* Website preview panel */}
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeSection === "website" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {!template || isIframeLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">Loading website...</p>
                </div>
              </div>
            ) : null}
            {template && (
              <iframe
                key={`preview-${websiteId}`}
                src={`/template-preview?template=${template.slug}&websiteId=${websiteId}&hideNav=true`}
                className={`w-full h-full border-0 ${isIframeLoading ? 'invisible' : 'visible'}`}
                title="Website Preview"
                data-testid="iframe-website-preview"
                onLoad={() => setIsIframeLoading(false)}
              />
            )}
          </div>

          {/* Colors panel */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
              activeSection === "colors" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Colors</h3>
                  <p className="text-sm text-gray-600 mb-6">Customize your website colors and branding.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-sm text-blue-800">
                    Color customization coming soon! You'll be able to customize your website's color scheme, including primary colors, accent colors, and text colors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Domain Name panel */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
              activeSection === "domain" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-4xl space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Domain Name Management</h3>
                  <p className="text-sm text-gray-600 mb-6">Search for domains, view purchased domains, and manage DNS settings.</p>
                </div>

                {/* Domain Search Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <h4 className="text-lg font-semibold">Search for a Domain</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter domain name (e.g., myinsurance.com)"
                      className="flex-1"
                      data-testid="input-domain-search"
                    />
                    <Button className="bg-[#6458AF] hover:bg-[#5347A0]" data-testid="button-search-domain">
                      Search
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Search for available domains and purchase them instantly.</p>
                  
                  {/* Search Results Placeholder */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">Search results will appear here</p>
                  </div>
                </div>

                {/* Purchased Domains Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <h4 className="text-lg font-semibold">Your Domains</h4>
                  
                  {website.domain ? (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-lg">{website.domain}</p>
                            <p className="text-xs text-gray-500">Connected to this website</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-[#6458AF] border-[#6458AF] hover:bg-[#6458AF] hover:text-white"
                          data-testid="button-manage-dns"
                        >
                          Manage DNS
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-1">No domains yet</p>
                      <p className="text-sm text-gray-500">Search and purchase a domain to get started</p>
                    </div>
                  )}
                </div>

                {/* DNS Management Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <h4 className="text-lg font-semibold">DNS Settings</h4>
                  <p className="text-sm text-gray-600">Point your domain to your website on our platform</p>
                  
                  {website.domain ? (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 font-medium mb-2">Platform DNS Settings</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-mono text-gray-900">A Record</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Host:</span>
                            <span className="font-mono text-gray-900">@</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Points to:</span>
                            <span className="font-mono text-gray-900">123.45.67.89</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Current DNS Records</Label>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                              <tr>
                                <th className="text-left p-3 font-medium">Type</th>
                                <th className="text-left p-3 font-medium">Host</th>
                                <th className="text-left p-3 font-medium">Value</th>
                                <th className="text-left p-3 font-medium">TTL</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-3 font-mono text-xs">A</td>
                                <td className="p-3 font-mono text-xs">@</td>
                                <td className="p-3 font-mono text-xs">123.45.67.89</td>
                                <td className="p-3 font-mono text-xs">3600</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Purchase a domain to manage DNS settings</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Settings panel */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
              activeSection === "settings" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto p-8">

              
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Website Settings</h3>
                  <p className="text-sm text-gray-600 mb-6">Manage your website configuration and preferences.</p>
                </div>
                
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={website.name}
                    disabled
                    className="bg-gray-50"
                    data-testid="input-site-name"
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={website.domain || "Not set"}
                    disabled
                    className="bg-gray-50"
                    data-testid="input-domain"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={website.siteStatus}
                    disabled
                    className="bg-gray-50"
                    data-testid="input-status"
                  />
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h4 className="text-lg font-semibold mb-4">Site Branding</h4>
                  
                  <div>
                    <Label htmlFor="favicon">Favicon</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
                          <Globe className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full sm:w-auto"
                            data-testid="button-upload-favicon"
                          >
                            Upload Favicon
                          </Button>
                          <p className="text-xs text-gray-500 mt-1">
                            Recommended: 32x32px or 64x64px, PNG or ICO format
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      The favicon is the small icon that appears in browser tabs and bookmarks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO panel */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
              activeSection === "seo" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">SEO Settings</h3>
                  <p className="text-sm text-gray-600 mb-6">Optimize your website for search engines and social media.</p>
                </div>

                {/* Basic SEO */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <h4 className="text-lg font-semibold">Essential SEO Tags</h4>
                  
                  <div>
                    <Label htmlFor="metaTitle">Meta Title *</Label>
                    <Input
                      id="metaTitle"
                      placeholder="Best Insurance Services | Your Business Name"
                      maxLength={60}
                      data-testid="input-meta-title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Keep under 60 characters. Include your primary keyword near the beginning.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description *</Label>
                    <Textarea
                      id="metaDescription"
                      placeholder="Discover comprehensive insurance solutions tailored to protect what matters most. Get a free quote today and secure your future."
                      maxLength={160}
                      rows={3}
                      data-testid="input-meta-description"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Keep 150-160 characters. Include a call-to-action and secondary keywords.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                    <Input
                      id="canonicalUrl"
                      placeholder="https://yourdomain.com/page-name"
                      data-testid="input-canonical-url"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      The "master" URL version to avoid duplicate content issues.
                    </p>
                  </div>
                </div>

                {/* Social Media Tags */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <h4 className="text-lg font-semibold">Social Media Preview</h4>
                  <p className="text-sm text-gray-600">Control how your site appears when shared on social media.</p>
                  
                  <div>
                    <Label htmlFor="ogTitle">Open Graph Title (Facebook, LinkedIn)</Label>
                    <Input
                      id="ogTitle"
                      placeholder="Your Page Title for Social Media"
                      data-testid="input-og-title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogDescription">Open Graph Description</Label>
                    <Textarea
                      id="ogDescription"
                      placeholder="Compelling description for social media shares"
                      rows={2}
                      data-testid="input-og-description"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogImage">Open Graph Image URL</Label>
                    <Input
                      id="ogImage"
                      placeholder="https://yourdomain.com/social-image.jpg"
                      data-testid="input-og-image"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 1200x630px for best results across platforms.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="twitterCard">Twitter Card Type</Label>
                    <select 
                      id="twitterCard" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      data-testid="select-twitter-card"
                    >
                      <option value="summary_large_image">Summary with Large Image</option>
                      <option value="summary">Summary</option>
                    </select>
                  </div>
                </div>

                {/* Indexing Settings */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <h4 className="text-lg font-semibold">Indexing & Crawling</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="allowIndexing" 
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                        data-testid="checkbox-allow-indexing"
                      />
                      <Label htmlFor="allowIndexing" className="font-normal cursor-pointer">
                        Allow search engines to index this page
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="followLinks" 
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                        data-testid="checkbox-follow-links"
                      />
                      <Label htmlFor="followLinks" className="font-normal cursor-pointer">
                        Allow search engines to follow links on this page
                      </Label>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    Uncheck only if you don't want this page to appear in search results.
                  </p>
                </div>

                {/* SEO Best Practices */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-sm font-semibold text-blue-900 mb-3">💡 SEO Tips for 2025</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ Write unique titles and descriptions for better click-through rates</li>
                    <li>✓ Include your location in titles (e.g., "Insurance Agent in Chicago")</li>
                    <li>✓ Use action words in descriptions (e.g., "Get", "Discover", "Learn")</li>
                    <li>✓ Add alt text to all images describing what they show</li>
                    <li>✓ Keep mobile users in mind - most searches happen on phones</li>
                    <li>✗ Don't use "meta keywords" - they're obsolete and ignored by Google</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#6458AF] hover:bg-[#5347A0]" data-testid="button-save-seo">
                    Save SEO Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics panel */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
              activeSection === "analytics" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-6xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Analytics Dashboard</h3>
                  <p className="text-sm text-gray-600 mb-6">Track your website performance and visitor data.</p>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Visits</p>
                    <p className="text-3xl font-bold">2,847</p>
                    <p className="text-xs text-green-600 mt-1">↑ 12.5% from last month</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Unique Visitors</p>
                    <p className="text-3xl font-bold">1,924</p>
                    <p className="text-xs text-green-600 mt-1">↑ 8.3% from last month</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Pageviews</p>
                    <p className="text-3xl font-bold">4,523</p>
                    <p className="text-xs text-green-600 mt-1">↑ 15.2% from last month</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Avg. Time on Page</p>
                    <p className="text-3xl font-bold">2:34</p>
                    <p className="text-xs text-red-600 mt-1">↓ 3.1% from last month</p>
                  </div>
                </div>

                {/* Traffic Over Time */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Traffic Trends (Last 30 Days)</h4>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[45, 52, 48, 61, 55, 58, 62, 59, 67, 71, 68, 75, 82, 78, 85, 91, 88, 95, 92, 98, 105, 102, 110, 115, 108, 120, 125, 118, 130, 135].map((height, i) => (
                      <div key={i} className="flex-1 bg-[#6458AF] rounded-t hover:bg-[#5347A0] transition-colors" style={{ height: `${(height / 135) * 100}%` }} title={`Day ${i + 1}: ${height} visits`}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>30 days ago</span>
                    <span>Today</span>
                  </div>
                </div>

                {/* Device & Browser Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Device Types</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Desktop</span>
                          <span className="text-sm font-semibold">58%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#6458AF] h-2 rounded-full" style={{ width: '58%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Mobile</span>
                          <span className="text-sm font-semibold">35%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#6458AF] h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Tablet</span>
                          <span className="text-sm font-semibold">7%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#6458AF] h-2 rounded-full" style={{ width: '7%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Top Browsers</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Chrome</span>
                        <span className="text-sm font-semibold">1,245 (44%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Safari</span>
                        <span className="text-sm font-semibold">892 (31%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Firefox</span>
                        <span className="text-sm font-semibold">485 (17%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Edge</span>
                        <span className="text-sm font-semibold">225 (8%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Traffic Sources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Organic Search</p>
                      <p className="text-2xl font-bold">1,423</p>
                      <p className="text-xs text-gray-500">50% of traffic</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Direct</p>
                      <p className="text-2xl font-bold">854</p>
                      <p className="text-xs text-gray-500">30% of traffic</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Social Media</p>
                      <p className="text-2xl font-bold">285</p>
                      <p className="text-xs text-gray-500">10% of traffic</p>
                    </div>
                  </div>
                  
                  <h5 className="font-medium mb-3">Top Referral Sources</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">google.com</span>
                      <span className="text-sm font-semibold">1,245 visits</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">facebook.com</span>
                      <span className="text-sm font-semibold">185 visits</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">linkedin.com</span>
                      <span className="text-sm font-semibold">100 visits</span>
                    </div>
                  </div>
                </div>

                {/* Search Keywords */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Top Keywords from Google</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <span className="text-sm font-medium">insurance agent near me</span>
                        <p className="text-xs text-gray-500">Avg. position: 4.2</p>
                      </div>
                      <span className="text-sm font-semibold">342 clicks</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <span className="text-sm font-medium">life insurance quotes</span>
                        <p className="text-xs text-gray-500">Avg. position: 6.8</p>
                      </div>
                      <span className="text-sm font-semibold">215 clicks</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <span className="text-sm font-medium">health insurance plans</span>
                        <p className="text-xs text-gray-500">Avg. position: 8.1</p>
                      </div>
                      <span className="text-sm font-semibold">158 clicks</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <span className="text-sm font-medium">auto insurance coverage</span>
                        <p className="text-xs text-gray-500">Avg. position: 5.3</p>
                      </div>
                      <span className="text-sm font-semibold">124 clicks</span>
                    </div>
                  </div>
                </div>

                {/* Geography */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Visitor Geography</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Top Countries</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">🇺🇸 United States</span>
                          <span className="text-sm font-semibold">2,145 (75%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">🇨🇦 Canada</span>
                          <span className="text-sm font-semibold">428 (15%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">🇬🇧 United Kingdom</span>
                          <span className="text-sm font-semibold">142 (5%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">🇦🇺 Australia</span>
                          <span className="text-sm font-semibold">85 (3%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-3">Top Cities (US)</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">New York, NY</span>
                          <span className="text-sm font-semibold">345 visits</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Los Angeles, CA</span>
                          <span className="text-sm font-semibold">298 visits</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Chicago, IL</span>
                          <span className="text-sm font-semibold">215 visits</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Houston, TX</span>
                          <span className="text-sm font-semibold">187 visits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Edit Overlay - slides up from bottom */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-transform duration-500 ease-in-out ${
          isEditOverlayOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Edit mode header */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b h-14 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold">Edit Mode - Click elements to edit</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                handleSave();
                setIsEditOverlayOpen(false);
              }}
              disabled={saveContentMutation.isPending}
              variant="outline"
              className="border-2 border-black text-black hover:bg-gray-100 bg-white"
              data-testid="button-save-and-close"
            >
              <Save className="h-4 w-4 mr-2" />
              {saveContentMutation.isPending ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditOverlayOpen(false)}
              data-testid="button-close-edit-mode"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Edit mode content - website preview with editing enabled */}
        <div className="absolute top-14 left-0 right-0 bottom-0 bg-gray-100">
          {template ? (
            <iframe
              key={`edit-${websiteId}`}
              src={`/template-preview?template=${template.slug}&websiteId=${websiteId}&editMode=true&hideNav=true`}
              className="w-full h-full border-0"
              title="Edit Website"
              data-testid="iframe-edit-mode"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600">Loading editor...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
