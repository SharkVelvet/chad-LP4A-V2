import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, FileEdit, BarChart3, Search, Save } from "lucide-react";
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

type MenuSection = "settings" | "content" | "seo" | "analytics";

export default function WebsiteEditor() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/editor/:websiteId");
  const websiteId = params?.websiteId ? parseInt(params.websiteId) : null;
  const [activeSection, setActiveSection] = useState<MenuSection>("content");
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

  // Save content mutation
  const saveContentMutation = useMutation({
    mutationFn: async (content: typeof formData) => {
      const res = await apiRequest("PATCH", `/api/websites/${websiteId}/content`, content);
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
    { id: "content" as MenuSection, label: "Edit Content", icon: FileEdit },
    { id: "seo" as MenuSection, label: "SEO", icon: Search },
    { id: "analytics" as MenuSection, label: "Analytics", icon: BarChart3 },
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
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
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

        {/* Center - Preview */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          {template ? (
            <iframe
              src={`/template-preview?template=${template.slug}&websiteId=${websiteId}&hideNav=true`}
              className="w-full h-full border-0"
              title="Website Preview"
              data-testid="iframe-website-preview"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600">Loading template...</p>
              </div>
            </div>
          )}
        </div>

        {/* Right panel - Section content */}
        <div className="w-80 bg-white border-l flex-shrink-0 overflow-y-auto">
          <div className="p-6">
            {activeSection === "settings" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Website Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage your website configuration and preferences.</p>
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
            )}

            {activeSection === "content" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Edit Content</h3>
                  <p className="text-sm text-gray-600 mb-4">Update your website content and information.</p>
                </div>
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="Enter business name"
                    data-testid="input-business-name"
                  />
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    placeholder="Enter tagline"
                    data-testid="input-tagline"
                  />
                </div>

                <div>
                  <Label htmlFor="aboutUs">About Us</Label>
                  <Textarea
                    id="aboutUs"
                    value={formData.aboutUs}
                    onChange={(e) => handleInputChange("aboutUs", e.target.value)}
                    placeholder="Enter about us description"
                    rows={4}
                    data-testid="textarea-about-us"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="contact@example.com"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter address"
                    rows={3}
                    data-testid="textarea-address"
                  />
                </div>
              </div>
            )}

            {activeSection === "seo" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">Optimize your website for search engines.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    SEO features coming soon! You'll be able to customize meta titles, descriptions, and keywords.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Analytics</h3>
                  <p className="text-sm text-gray-600 mb-4">Track your website performance and visitor data.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Analytics dashboard coming soon! You'll see visitor stats, page views, and engagement metrics.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
