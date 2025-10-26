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

type MenuSection = "website" | "edit-content" | "colors" | "settings" | "seo" | "analytics";

export default function WebsiteEditor() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/editor/:websiteId");
  const websiteId = params?.websiteId ? parseInt(params.websiteId) : null;
  const [activeSection, setActiveSection] = useState<MenuSection>("website");
  const [isWebsiteExpanded, setIsWebsiteExpanded] = useState(true);
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

  // Listen for edit messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'CONTENT_EDIT') {
        const { field, value } = event.data;
        console.log('Received edit message - Field:', field, 'Value:', value);
        console.log('Current formData:', formData);
        
        // Build the updated content object
        const updatedContent = {
          ...formData,
          [field]: value
        };
        console.log('Updated content to save:', updatedContent);
        
        // Update form data
        setFormData(updatedContent);
        
        // Save to database
        saveContentMutation.mutate(updatedContent);
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
  ];

  const websiteSubItems = [
    { id: "edit-content" as MenuSection, label: "Edit Content", icon: FileEdit },
    { id: "colors" as MenuSection, label: "Colors", icon: Palette },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top header */}
      <div className="bg-white border-b h-14 flex items-center justify-between px-4 flex-shrink-0">
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
        
        <Button
          size="sm"
          onClick={handleSave}
          disabled={saveContentMutation.isPending}
          className="bg-[#6458AF] hover:bg-[#5347A0]"
          data-testid="button-save"
        >
          <Save className="h-4 w-4 mr-2" />
          {saveContentMutation.isPending ? "Saving..." : "Save"}
        </Button>
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
                    setIsWebsiteExpanded(!isWebsiteExpanded);
                    setActiveSection("website");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "website" || activeSection === "edit-content" || activeSection === "colors"
                      ? "bg-[#6458AF] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  data-testid="menu-website"
                >
                  <Globe className="h-4 w-4" />
                  <span className="flex-1 text-left">Website</span>
                  {isWebsiteExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {/* Website submenu */}
                {isWebsiteExpanded && (
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
                              ? "bg-[#6458AF] text-white"
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
                      setIsWebsiteExpanded(false);
                      setActiveSection(item.id);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#6458AF] text-white"
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
                key={JSON.stringify(website?.content)}
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
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={website.domain || "Not set"}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={website.siteStatus}
                    disabled
                    className="bg-gray-50"
                  />
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


              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">SEO Settings</h3>
                  <p className="text-sm text-gray-600 mb-6">Optimize your website for search engines.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-sm text-blue-800">
                    SEO features coming soon! You'll be able to customize meta titles, descriptions, and keywords.
                  </p>
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


              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600 mb-6">Track your website performance and visitor data.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-sm text-blue-800">
                    Analytics dashboard coming soon! You'll see visitor stats, page views, and engagement metrics.
                  </p>
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
              className="bg-[#6458AF] hover:bg-[#5347A0]"
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
              key={`edit-${JSON.stringify(website?.content)}`}
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
