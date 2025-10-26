import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Menu, Save } from "lucide-react";
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

export default function WebsiteEditor() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/editor/:websiteId");
  const websiteId = params?.websiteId ? parseInt(params.websiteId) : null;
  const [isPanelOpen, setIsPanelOpen] = useState(true);
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

  return (
    <div className="relative h-screen overflow-hidden bg-gray-50">
      {/* Top header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white border-b h-14 flex items-center justify-between px-4">
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
        
        <div className="flex items-center gap-2">
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            data-testid="button-toggle-panel"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview iframe */}
      <div className="absolute top-14 left-0 right-0 bottom-0">
        <iframe
          src={`/template-preview?template=${website.templateId}&websiteId=${websiteId}&hideNav=true`}
          className="w-full h-full border-0"
          title="Website Preview"
          data-testid="iframe-website-preview"
        />
      </div>

      {/* Slide-in edit panel */}
      <div
        className={`absolute top-14 right-0 bottom-0 w-80 bg-white border-l shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="panel-editor"
      >
        <div className="h-full flex flex-col">
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-sm font-semibold">Edit Website</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPanelOpen(false)}
              data-testid="button-close-panel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

          {/* Panel footer */}
          <div className="border-t p-4">
            <Button
              className="w-full bg-[#6458AF] hover:bg-[#5347A0]"
              onClick={handleSave}
              disabled={saveContentMutation.isPending}
              data-testid="button-save-panel"
            >
              <Save className="h-4 w-4 mr-2" />
              {saveContentMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
