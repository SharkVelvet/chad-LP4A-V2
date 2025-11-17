import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Settings, Globe, BarChart3, Search, Save, ArrowLeft, ChevronDown, ChevronRight, FileEdit, Palette, Loader2, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import DomainSearch from "@/components/domain-search";
import DnsManager from "@/components/dns-manager";

type Page = {
  id: number;
  userId: number;
  templateId: number;
  name: string;
  domain: string | null;
  cloudflareZoneId: string | null;
  subscriptionStatus: string;
  siteStatus: string;
  content?: {
    businessName: string | null;
    tagline: string | null;
    aboutUs: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    isPublished: boolean;
    maintenanceMode: boolean;
    publishedAt: string | null;
    formEnabled: boolean;
    formProvider: string | null;
    formEmbedCode: string | null;
  };
};

type Template = {
  id: number;
  name: string;
  slug: string;
};

type MenuSection = "page" | "edit-content" | "colors" | "sections" | "forms" | "domain" | "settings" | "seo" | "analytics";

export default function WebsiteEditor() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/editor/:pageId");
  const pageId = params?.pageId ? parseInt(params.pageId) : null;
  const [activeSection, setActiveSection] = useState<MenuSection>("page");
  const [isPageExpanded] = useState(true); // Always keep Page menu expanded
  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isReloadingContent, setIsReloadingContent] = useState(false);
  const [existingDomain, setExistingDomain] = useState("");
  const [showExistingDomainSection, setShowExistingDomainSection] = useState(false);
  const [domainValidationError, setDomainValidationError] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    businessName: "",
    tagline: "",
    aboutUs: "",
    phone: "",
    email: "",
    address: "",
  });

  const [hiddenSections, setHiddenSections] = useState<string[]>([]);

  // Check if currently impersonating to adjust layout
  const { data: impersonationStatus } = useQuery<{ isImpersonating: boolean }>({
    queryKey: ["/api/admin/impersonation-status"],
    staleTime: 1000,
  });

  // Fetch current user to check role
  const { data: currentUser } = useQuery<{ id: number; role: string }>({
    queryKey: ["/api/user"],
    staleTime: 5000,
  });

  const impersonationBannerHeight = impersonationStatus?.isImpersonating ? 52 : 0;

  // Fetch page data
  const { data: page, isLoading: pageLoading } = useQuery<Page>({
    queryKey: ["/api/pages", String(pageId)],
    queryFn: async () => {
      const res = await fetch(`/api/pages/${pageId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch page");
      return res.json();
    },
    enabled: !!pageId,
  });

  // Fetch templates to get the slug
  const { data: templates } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const template = templates?.find(t => t.id === page?.templateId);

  // Save content mutation (defined early so it can be used in effects)
  const saveContentMutation = useMutation({
    mutationFn: async (content: typeof formData) => {
      const res = await apiRequest("PUT", `/api/pages/${pageId}/content`, content);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
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
    if (page?.content) {
      setFormData({
        businessName: page.content.businessName || "",
        tagline: page.content.tagline || "",
        aboutUs: page.content.aboutUs || "",
        phone: page.content.phone || "",
        email: page.content.email || "",
        address: page.content.address || "",
      });
      
      // Load hidden sections from page content
      const pageHiddenSections = (page.content as any)?.hiddenSections as string[];
      if (pageHiddenSections) {
        setHiddenSections(pageHiddenSections);
      }
    }
  }, [page]);

  // Handle Stripe checkout success return
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const success = urlParams.get('success');
    
    if ((sessionId || success === 'true') && page?.domain && !page?.domainVerified) {
      // User just returned from Stripe - show the Domain section and activate button
      setActiveSection("domain");
      
      // Clear URL parameters
      window.history.replaceState({}, '', window.location.pathname);
      
      // Show toast to guide user
      toast({
        title: "Domain Purchased Successfully!",
        description: "Click the button below to activate your domain and go live.",
        duration: 8000,
      });
    }
  }, [page, toast]);

  // Save flexible content mutation (for any content ID)
  const saveFlexibleContentMutation = useMutation({
    mutationFn: async ({ contentId, value }: { contentId: string; value: string }) => {
      const res = await apiRequest("PATCH", `/api/pages/${pageId}/content/${encodeURIComponent(contentId)}`, { value });
      return await res.json();
    },
    onSuccess: async () => {
      // Refetch page data
      await queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      await queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      
      // Set reloading state to keep overlay visible
      setIsReloadingContent(true);
      
      // Force iframe to reload to show updated content with cache busting
      const iframe = document.querySelector('iframe[data-testid="iframe-edit-mode"]') as HTMLIFrameElement;
      console.log('[Page Editor] Found iframe:', !!iframe);
      if (iframe) {
        console.log('[Page Editor] Reloading iframe to show updated content');
        // Add cache-busting timestamp to force fresh reload
        const url = new URL(iframe.src);
        url.searchParams.set('_refresh', Date.now().toString());
        iframe.src = url.toString();
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
      setIsReloadingContent(false);
    },
  });

  // Save hidden sections mutation
  const saveHiddenSectionsMutation = useMutation({
    mutationFn: async (sections: string[]) => {
      const res = await apiRequest("PATCH", `/api/pages/${pageId}/hidden-sections`, { hiddenSections: sections });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({
        title: "Sections Updated",
        description: "Section visibility has been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save section visibility. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Listen for section visibility toggles from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin for security
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'toggleSectionVisibility' && typeof event.data.sectionId === 'string') {
        const sectionId = event.data.sectionId;
        // Use functional state update to avoid stale closure
        setHiddenSections(prev => {
          const newHiddenSections = prev.includes(sectionId)
            ? prev.filter(id => id !== sectionId)
            : [...prev, sectionId];
          // Save to backend
          saveHiddenSectionsMutation.mutate(newHiddenSections);
          return newHiddenSections;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [saveHiddenSectionsMutation]);

  // Send updated hidden sections to iframe when they change
  useEffect(() => {
    const iframes = document.querySelectorAll('iframe[data-testid="iframe-edit-mode"], iframe[data-testid="iframe-page-preview"]');
    iframes.forEach(iframe => {
      const iframeWindow = (iframe as HTMLIFrameElement).contentWindow;
      if (iframeWindow) {
        iframeWindow.postMessage({
          type: 'updateHiddenSections',
          hiddenSections
        }, window.location.origin);
      }
    });
  }, [hiddenSections]);

  // Connect existing domain mutation
  const connectExistingDomainMutation = useMutation({
    mutationFn: async (domain: string) => {
      const res = await apiRequest("PUT", `/api/pages/${pageId}`, { domain });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      setExistingDomain("");
      toast({
        title: "Domain Connected",
        description: "Your existing domain has been connected to this page.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to connect domain. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Auto-configure DNS for purchased domain
  const autoConfigureDomainMutation = useMutation({
    mutationFn: async () => {
      if (!page?.domain) {
        throw new Error("No domain found");
      }
      const res = await apiRequest("POST", `/api/domains/${page.domain}/auto-configure`, {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      toast({
        title: "DNS Configured Successfully!",
        description: "Your domain has been automatically configured and connected to Railway. It should be live within 15-30 minutes.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Auto-Configuration Failed",
        description: error.message || "Failed to auto-configure DNS. You may need to configure it manually.",
        variant: "destructive",
      });
    },
  });

  // Publish page mutation
  const publishMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/pages/${pageId}/publish`, {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      toast({
        title: "Page Published!",
        description: "Your page is now live and visible to the public.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to publish page. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Unpublish page mutation
  const unpublishMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/pages/${pageId}/unpublish`, {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      toast({
        title: "Page Unpublished",
        description: "Your page is now in draft mode and not visible to the public.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to unpublish page. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Maintenance mode mutation
  const maintenanceMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      const res = await apiRequest("POST", `/api/pages/${pageId}/maintenance`, { enabled });
      return await res.json();
    },
    onSuccess: (_, enabled) => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      toast({
        title: enabled ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
        description: enabled 
          ? "Visitors will see a maintenance message."
          : "Your page is back to normal operation.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update maintenance mode. Please try again.",
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
        
        console.log('[Page Editor] Received content edit:', { field, contentId, valueLength: value?.length });
        
        // Use flexible content ID if provided, otherwise fall back to legacy field
        if (contentId) {
          console.log('[Page Editor] Saving flexible content:', contentId);
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

  if (!pageId) {
    return <div>Invalid page ID</div>;
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  const menuItems = [
    { id: "settings" as MenuSection, label: "Settings", icon: Settings },
    { id: "seo" as MenuSection, label: "SEO", icon: Search },
    { id: "analytics" as MenuSection, label: "Analytics", icon: BarChart3 },
    { id: "domain" as MenuSection, label: "Domain Name", icon: Globe },
  ];

  const pageSubItems = [
    { id: "edit-content" as MenuSection, label: "Edit Content", icon: FileEdit },
    { id: "colors" as MenuSection, label: "Colors", icon: Palette },
    { id: "forms" as MenuSection, label: "Add / Edit Forms", icon: FileText },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top header */}
      <div className="bg-white border-b h-14 flex items-center px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-black hover:text-white"
            onClick={() => {
              // Invalidate dashboard queries so it refetches fresh data
              queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
              navigate("/dashboard");
            }}
            data-testid="button-back-to-dashboard"
          >
            ← Back to Dashboard
          </Button>
          <span className="text-sm text-gray-500">|</span>
          <h1 className="text-sm font-semibold">{page.name}</h1>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Menu */}
        <div className="w-64 bg-white border-r flex-shrink-0 overflow-y-auto flex flex-col">
          <div className="p-4 flex-1">
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">Editor Menu</h2>
            <div className="space-y-1">
              {/* Page menu item with submenu */}
              <div>
                <button
                  onClick={() => {
                    setActiveSection("page");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "page" || activeSection === "edit-content" || activeSection === "colors" || activeSection === "forms"
                      ? "border-2 border-black text-black bg-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  data-testid="menu-page"
                >
                  <Globe className="h-4 w-4" />
                  <span className="flex-1 text-left">Page</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Page submenu - Always visible */}
                {true && (
                  <div className="mt-1 ml-4 space-y-1">
                    {pageSubItems.map((item) => {
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

            {/* Page Visibility Widget - Always visible at bottom */}
            <div className="p-4 border-t mt-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">Page Status</h4>
                
                {/* Current Status Badge */}
                <div className="mb-3">
                  {page?.content?.maintenanceMode ? (
                    <Badge className="bg-orange-500 text-white">🔧 Maintenance Mode</Badge>
                  ) : page?.content?.isPublished ? (
                    <Badge className="bg-green-600 text-white">✓ Published</Badge>
                  ) : (
                    <Badge variant="outline" className="border-gray-400 text-gray-700">📝 Draft</Badge>
                  )}
                </div>

                {/* Status Actions */}
                <div className="space-y-2">
                  {/* Show different options based on current state */}
                  {page?.content?.maintenanceMode ? (
                    <>
                      <Button
                        onClick={() => maintenanceMutation.mutate(false)}
                        disabled={maintenanceMutation.isPending}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        Exit Maintenance
                      </Button>
                      <Button
                        onClick={() => {
                          maintenanceMutation.mutate(false);
                          setTimeout(() => unpublishMutation.mutate(), 500);
                        }}
                        disabled={maintenanceMutation.isPending || unpublishMutation.isPending}
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        Set to Draft
                      </Button>
                    </>
                  ) : !page?.content?.isPublished ? (
                    <>
                      <Button
                        onClick={() => publishMutation.mutate()}
                        disabled={publishMutation.isPending}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="sm"
                        data-testid="button-publish-page"
                      >
                        Publish Live
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => maintenanceMutation.mutate(true)}
                        disabled={maintenanceMutation.isPending}
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        size="sm"
                      >
                        Enable Maintenance
                      </Button>
                      <Button
                        onClick={() => unpublishMutation.mutate()}
                        disabled={unpublishMutation.isPending}
                        variant="outline"
                        className="w-full"
                        size="sm"
                        data-testid="button-unpublish-page"
                      >
                        Set to Draft
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area with sliding panels */}
        <div className="flex-1 relative overflow-hidden">
          {/* Page preview panel */}
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeSection === "page" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {!template || isIframeLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">Loading page...</p>
                </div>
              </div>
            ) : null}
            {template && (
              <iframe
                key={`preview-${pageId}`}
                src={`/template-preview?template=${template.slug}&pageId=${pageId}&hideNav=true&editMode=false`}
                className={`w-full h-full border-0 ${isIframeLoading ? 'invisible' : 'visible'}`}
                title="Page Preview"
                data-testid="iframe-page-preview"
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
                  <p className="text-sm text-gray-600 mb-6">Customize your page colors and branding.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-sm text-blue-800">
                    Color customization coming soon! You'll be able to customize your page's color scheme, including primary colors, accent colors, and text colors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Forms panel */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
              activeSection === "forms" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Add / Edit Forms</h3>
                  <p className="text-sm text-gray-600 mb-6">Embed a third-party form into your contact section.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Enable Form in Contact Section</h4>
                      <p className="text-sm text-gray-600">
                        {page?.content?.formEnabled 
                          ? "Form embedding is active. Configure your embed code below."
                          : "Turn on to embed a form from Go High Level, Formstack, or Formspree."
                        }
                      </p>
                    </div>
                    <Switch
                      checked={page?.content?.formEnabled || false}
                      onCheckedChange={async (checked) => {
                        try {
                          const endpoint = checked ? "enable-form" : "disable-form";
                          const res = await apiRequest("POST", `/api/pages/${pageId}/${endpoint}`, {});
                          await res.json();
                          queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
                          toast({
                            title: checked ? "Forms Enabled" : "Forms Disabled",
                            description: checked 
                              ? "You can now configure your form embed code below."
                              : "The form has been removed from your contact section.",
                          });
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: "Failed to update form settings. Please try again.",
                            variant: "destructive",
                          });
                        }
                      }}
                      data-testid="switch-enable-form"
                    />
                  </div>

                  {page?.content?.formEnabled && (
                    <div className="pt-4 border-t">
                      <p className="text-xs text-gray-500 mb-4">
                        Note: Only one form per page is allowed. The form will be displayed in your contact section.
                      </p>
                    </div>
                  )}
                </div>

                {page?.content?.formEnabled && pageId && (
                  <FormsConfig pageId={pageId.toString()} page={page} />
                )}
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
                  <h3 className="text-2xl font-bold mb-2">Domain Name</h3>
                  <p className="text-sm text-gray-600 mb-6">Manage your page's domain.</p>
                </div>

                {/* Domain Status Message */}
                {page?.domain ? (
                  page?.domainVerified ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <Globe className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-lg font-semibold text-green-900 mb-2">
                            ✅ You have this domain name setup for this page:
                          </h4>
                          <p className="text-2xl font-bold text-green-700">{page.domain}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <Globe className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                            ⏳ You are setting up this domain for this page:
                          </h4>
                          <p className="text-2xl font-bold text-yellow-700">{page.domain}</p>
                          <p className="text-sm text-yellow-600 mt-2">
                            DNS configuration is in progress. Your site will be live once DNS propagation completes.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Globe className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">
                          You have no domain names attached to this page
                        </h4>
                        <p className="text-sm text-blue-700">Please search below to find and purchase a domain, or connect a domain you already own.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Domain Search and Purchase - Only show if no domain attached */}
                {!page?.domain && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Search and Purchase Domain</h4>
                    <DomainSearch
                      pageId={pageId!}
                      onDomainPurchased={(domain) => {
                        queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
                        queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
                        toast({
                          title: "Domain Purchased and Linked",
                          description: `${domain} has been purchased and linked to this page.`,
                        });
                      }}
                    />
                  </div>
                )}

                {/* Connect Existing Domain - Collapsible */}
                {!page?.domain && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowExistingDomainSection(!showExistingDomainSection)}
                      className="w-full justify-between"
                      data-testid="button-toggle-existing-domain"
                    >
                      <span className="font-semibold">I Already Own My Domain Name</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showExistingDomainSection ? 'rotate-180' : ''}`} />
                    </Button>
                    
                    {showExistingDomainSection && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-4">Connect a domain you already own from another registrar.</p>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <Input
                                placeholder="yourdomain.com"
                                value={existingDomain}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setExistingDomain(value);
                                  setDomainValidationError("");
                                }}
                                data-testid="input-existing-domain"
                                className={domainValidationError ? "border-red-500" : ""}
                              />
                              {domainValidationError && (
                                <p className="text-sm text-red-600 mt-1">{domainValidationError}</p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                Only enter the domain name (e.g., yourdomain.com). Do not include http://, https://, or trailing slashes.
                              </p>
                            </div>
                            <Button
                              onClick={() => {
                                const trimmed = existingDomain.trim();
                                
                                // Sanitize: remove http://, https://, and trailing slashes
                                let sanitized = trimmed
                                  .replace(/^https?:\/\//i, '')
                                  .replace(/\/+$/g, '');
                                
                                // Validate domain format - require at least one dot and valid TLD
                                const domainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i;
                                
                                if (!sanitized) {
                                  setDomainValidationError("Please enter a domain name");
                                  return;
                                }
                                
                                if (!sanitized.includes('.')) {
                                  setDomainValidationError("Please enter a valid domain name with a TLD (e.g., yourdomain.com)");
                                  return;
                                }
                                
                                if (!domainRegex.test(sanitized)) {
                                  setDomainValidationError("Invalid domain format. Only letters, numbers, hyphens, and dots are allowed.");
                                  return;
                                }
                                
                                if (sanitized.length > 253) {
                                  setDomainValidationError("Domain name is too long");
                                  return;
                                }
                                
                                // Update the input with sanitized value
                                setExistingDomain(sanitized);
                                setDomainValidationError("");
                                
                                // Submit the sanitized domain
                                connectExistingDomainMutation.mutate(sanitized);
                              }}
                              disabled={!existingDomain.trim() || connectExistingDomainMutation.isPending}
                              data-testid="button-connect-existing-domain"
                            >
                              {connectExistingDomainMutation.isPending ? "Connecting..." : "Connect Domain"}
                            </Button>
                          </div>
                        </div>
                        
                        {/* DNS Setup Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-900 mb-3">📋 DNS Setup Instructions</h5>
                          <p className="text-sm text-blue-800 mb-3">
                            After clicking "Connect Domain", add these DNS records at your domain registrar:
                          </p>
                          
                          {/* WWW subdomain CNAME */}
                          <div className="bg-white border border-blue-200 rounded p-3 mb-2">
                            <p className="text-xs font-semibold text-gray-700 mb-2">For www.yourdomain.com:</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-semibold text-gray-700">Record Type:</div>
                              <div className="font-mono text-gray-900">CNAME</div>
                              
                              <div className="font-semibold text-gray-700">Name/Host:</div>
                              <div className="font-mono text-gray-900">www</div>
                              
                              <div className="font-semibold text-gray-700">Points to:</div>
                              <div className="font-mono text-gray-900">chad-lp4a-v2-production.up.railway.app</div>
                            </div>
                          </div>
                          
                          {/* Root domain instructions */}
                          <div className="bg-white border border-blue-200 rounded p-3 mb-3">
                            <p className="text-xs font-semibold text-gray-700 mb-2">For yourdomain.com (root/apex domain):</p>
                            <p className="text-xs text-gray-600 mb-2">
                              Most registrars require an A record or ALIAS record for the root domain. Choose one option:
                            </p>
                            <div className="space-y-2">
                              <div className="pl-3">
                                <p className="text-xs font-semibold text-gray-700">Option 1 (Recommended): URL Redirect</p>
                                <p className="text-xs text-gray-600">Set up a redirect from yourdomain.com → www.yourdomain.com in your registrar's settings</p>
                              </div>
                              <div className="pl-3">
                                <p className="text-xs font-semibold text-gray-700">Option 2: ALIAS/ANAME Record</p>
                                <p className="text-xs text-gray-600">If your registrar supports ALIAS or ANAME records, point @ to chad-lp4a-v2-production.up.railway.app</p>
                              </div>
                            </div>
                          </div>
                          
                          <ul className="text-xs text-blue-700 space-y-1">
                            <li>• Log in to your domain registrar (GoDaddy, Namecheap, etc.)</li>
                            <li>• Go to DNS Management or DNS Settings</li>
                            <li>• Remove any existing A or AAAA records for @ and www to avoid conflicts</li>
                            <li>• Add the DNS records as shown above</li>
                            <li>• DNS changes typically take 5-30 minutes, but can take up to 24 hours</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* DNS Management - Only show for purchased domains or skip this entirely for manual domains */}
                {/* For manually-connected domains, users configure DNS at their own registrar */}
                {page?.domain && page?.cloudflareZoneId && (
                  <DnsManager domain={page.domain} />
                )}
                
                {/* Domain Configuration - Show when domain is connected but NOT purchased via Cloudflare */}
                {page?.domain && !page?.cloudflareZoneId && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">🌐 Your Custom Domain: {page.domain}</h4>
                    
                    {/* Success Message - Show for auto-configured domains */}
                    {page?.domainStatus === 'auto_configured' ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6" data-testid="alert-domain-auto-configured">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold text-green-900 mb-2">
                              ✨ Your Domain is Being Set Up Automatically!
                            </h5>
                            <p className="text-sm text-green-800 mb-3">
                              Great news! Your domain <strong>{page.domain}</strong> has been automatically configured and connected to your website. DNS changes are now propagating across the internet.
                            </p>
                            <div className="bg-white border border-green-200 rounded-lg p-4 mb-3">
                              <h6 className="font-semibold text-green-900 mb-2">⏱️ When will my site be live?</h6>
                              <ul className="text-sm text-green-700 space-y-1">
                                <li>• <strong>Usually:</strong> 15-30 minutes</li>
                                <li>• <strong>Sometimes:</strong> Up to 2 hours</li>
                                <li>• <strong>Rarely:</strong> Up to 48 hours for full global propagation</li>
                              </ul>
                            </div>
                            <p className="text-xs text-green-600">
                              💡 <strong>No action needed from you</strong> - everything has been configured automatically! Your site will be live at {page.domain} once DNS propagation completes.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Auto-Configure Button - Only for domains purchased through our system */}
                        {(page?.domainStatus === 'pending' || page?.domainStatus === 'needs_dns_configuration') && (
                          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h5 className="text-lg font-semibold text-purple-900 mb-2">
                                  🚀 Your Website is Ready to Go Live!
                                </h5>
                                <p className="text-sm text-purple-800 mb-4">
                                  One more step - click the button below to link your domain and make your website accessible online.
                                </p>
                                <Button
                                  onClick={() => autoConfigureDomainMutation.mutate()}
                                  disabled={autoConfigureDomainMutation.isPending}
                                  className="bg-purple-600 hover:bg-purple-700 text-white"
                                  data-testid="button-link-website"
                                >
                                  {autoConfigureDomainMutation.isPending ? (
                                    <>
                                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      Linking your website...
                                    </>
                                  ) : (
                                    <>
                                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                      </svg>
                                      Click here to link your website
                                    </>
                                  )}
                                </Button>
                                <p className="text-xs text-purple-600 mt-3">
                                  💡 Your site will be live at {page.domain} in 15-30 minutes with automatic HTTPS security.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Super Admin: Reset Domain Status Button */}
                    {currentUser?.role === 'super_admin' && page?.domain && (
                      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-semibold text-gray-900">Super Admin Tools</h5>
                            <p className="text-xs text-gray-600 mt-1">Reset domain status for testing</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/admin/domains/${page.domain}/reset-status`, {
                                  method: 'POST',
                                  credentials: 'include'
                                });
                                if (res.ok) {
                                  toast({ title: "✓ Status reset to pending" });
                                  queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
                                } else {
                                  toast({ title: "Failed to reset status", variant: "destructive" });
                                }
                              } catch (error) {
                                console.error('Reset failed:', error);
                                toast({ title: "Error resetting status", variant: "destructive" });
                              }
                            }}
                          >
                            🔧 Reset to Pending
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                  <h3 className="text-2xl font-bold mb-2">Page Settings</h3>
                  <p className="text-sm text-gray-600 mb-6">Manage your page configuration and preferences.</p>
                </div>
                
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={page.name}
                    disabled
                    className="bg-gray-50"
                    data-testid="input-site-name"
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={page.domain || "Not set"}
                    disabled
                    className="bg-gray-50"
                    data-testid="input-domain"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Subscription Status</Label>
                  <Input
                    id="status"
                    value={page.siteStatus}
                    disabled
                    className="bg-gray-50"
                    data-testid="input-status"
                  />
                </div>

                {/* Publish/Unpublish Page */}
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Page Visibility</h4>
                      <p className="text-sm text-gray-600">
                        {page?.content?.isPublished 
                          ? "Your page is live and visible to the public."
                          : "Your page is in draft mode and not visible to the public."}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        if (page?.content?.isPublished) {
                          // Unpublish
                          toast({
                            title: "Cannot Unpublish",
                            description: "Please contact support to unpublish your page.",
                            variant: "destructive",
                          });
                        } else {
                          // Publish
                          publishMutation.mutate();
                        }
                      }}
                      disabled={publishMutation.isPending}
                      className={page?.content?.isPublished ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}
                      data-testid="button-publish-page"
                    >
                      {publishMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Publishing...
                        </>
                      ) : page?.content?.isPublished ? (
                        "Page is Live"
                      ) : (
                        "Publish Page"
                      )}
                    </Button>
                  </div>
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
                  <p className="text-sm text-gray-600 mb-6">Optimize your page for search engines and social media.</p>
                </div>

                {/* Basic SEO */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Basic SEO</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pageTitle">Page Title</Label>
                        <Input
                          id="pageTitle"
                          placeholder="Your Business Name - Short Description"
                          className="mt-2"
                          data-testid="input-page-title"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 50-60 characters. This appears in search results and browser tabs.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="metaDescription">Meta Description</Label>
                        <Textarea
                          id="metaDescription"
                          placeholder="A compelling description of what your page offers..."
                          className="mt-2 min-h-[100px]"
                          data-testid="textarea-meta-description"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 150-160 characters. This appears below your title in search results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Preview */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Social Media Sharing (Open Graph)</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ogTitle">Social Title</Label>
                      <Input
                        id="ogTitle"
                        placeholder="How your page appears when shared on social media"
                        className="mt-2"
                        data-testid="input-og-title"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optional - defaults to Page Title if not set
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="ogDescription">Social Description</Label>
                      <Textarea
                        id="ogDescription"
                        placeholder="Description for social media sharing..."
                        className="mt-2 min-h-[80px]"
                        data-testid="textarea-og-description"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optional - defaults to Meta Description if not set
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="ogImage">Social Share Image (URL)</Label>
                      <Input
                        id="ogImage"
                        placeholder="https://example.com/your-image.jpg"
                        className="mt-2"
                        data-testid="input-og-image"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 1200x630px. This image appears when your page is shared on social media.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advanced SEO */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Advanced Settings</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="indexPage"
                        className="mt-1"
                        defaultChecked
                        data-testid="checkbox-index-page"
                      />
                      <Label htmlFor="indexPage" className="font-normal cursor-pointer">
                        Allow search engines to index this page
                      </Label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="followLinks"
                        className="mt-1"
                        defaultChecked
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
                  <p className="text-sm text-gray-600 mb-6">Track your page performance and visitor data.</p>
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
        className={`fixed bg-white z-50 transition-transform duration-500 ease-in-out ${
          isEditOverlayOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          top: `${impersonationBannerHeight}px`,
          left: 0,
          right: 0,
          bottom: 0
        }}
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

        {/* Edit mode content - page preview with editing enabled */}
        <div className="absolute top-14 left-0 right-0 bottom-0 bg-gray-100">
          {template ? (
            <>
              <iframe
                key={`edit-${pageId}`}
                src={`/template-preview?template=${template.slug}&pageId=${pageId}&editMode=true&hideNav=true`}
                className="w-full h-full border-0"
                title="Edit Page"
                data-testid="iframe-edit-mode"
                onLoad={() => setIsReloadingContent(false)}
              />
              {/* Saving overlay - shows immediately when save is clicked and stays until reload completes */}
              {(saveFlexibleContentMutation.isPending || saveContentMutation.isPending || isReloadingContent) && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg font-medium text-gray-900">Saving changes...</p>
                    <p className="text-sm text-gray-600">Please wait while we update your page</p>
                  </div>
                </div>
              )}
            </>
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

// FormsConfig component for managing form embed settings
function FormsConfig({ pageId, page }: { pageId: string; page: Page | null | undefined }) {
  const { toast } = useToast();
  const [formProvider, setFormProvider] = useState<string>(page?.content?.formProvider || "");
  const [formEmbedCode, setFormEmbedCode] = useState<string>(page?.content?.formEmbedCode || "");

  const saveFormMutation = useMutation({
    mutationFn: async () => {
      if (!formProvider) {
        throw new Error("Please select a form provider");
      }
      if (!formEmbedCode.trim()) {
        throw new Error("Please enter the embed code");
      }
      
      const res = await apiRequest("POST", `/api/pages/${pageId}/save-form`, {
        formProvider,
        formEmbedCode,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      toast({
        title: "Form Saved",
        description: "Your form embed code has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save form. Please try again.",
        variant: "destructive",
      });
    },
  });

  const disableFormMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/pages/${pageId}/disable-form`, {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages", String(pageId)] });
      toast({
        title: "Form Disabled",
        description: "The form has been removed from your contact section.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to disable form. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-900 mb-1">Form Embedding Enabled</h4>
        <p className="text-sm text-green-800">
          Your contact section is configured to display an embedded form in a 2-column layout.
        </p>
      </div>

      {/* Step 1: Form Provider Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6458AF] text-white font-bold text-sm">
            1
          </div>
          <Label htmlFor="formProvider" className="text-base font-semibold">
            Select Form Provider
          </Label>
        </div>
        <p className="text-sm text-gray-600 ml-11">Choose which service you're using for your form.</p>
        <div className="grid grid-cols-3 gap-3 ml-11">
          <Button
            variant={formProvider === "gohighlevel" ? "default" : "outline"}
            className={formProvider === "gohighlevel" ? "bg-[#6458AF] hover:bg-[#5347a0]" : ""}
            onClick={() => setFormProvider("gohighlevel")}
            data-testid="button-provider-gohighlevel"
          >
            Go High Level
          </Button>
          <Button
            variant={formProvider === "formstack" ? "default" : "outline"}
            className={formProvider === "formstack" ? "bg-[#6458AF] hover:bg-[#5347a0]" : ""}
            onClick={() => setFormProvider("formstack")}
            data-testid="button-provider-formstack"
          >
            Formstack
          </Button>
          <Button
            variant={formProvider === "formspree" ? "default" : "outline"}
            className={formProvider === "formspree" ? "bg-[#6458AF] hover:bg-[#5347a0]" : ""}
            onClick={() => setFormProvider("formspree")}
            data-testid="button-provider-formspree"
          >
            Formspree
          </Button>
        </div>
      </div>

      {/* Step 2: Embed Code Input */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${formProvider ? 'bg-[#6458AF] text-white' : 'bg-gray-300 text-gray-600'}`}>
            2
          </div>
          <Label htmlFor="formEmbedCode" className="text-base font-semibold">
            Paste Your Form Embed Code
          </Label>
        </div>
        {!formProvider && (
          <p className="text-sm text-orange-600 font-medium ml-11">
            ⚠️ Please select a form provider above first
          </p>
        )}
        <p className="text-sm text-gray-600 ml-11">
          Paste the complete embed code from your form provider. This typically includes HTML with &lt;script&gt; or &lt;iframe&gt; tags.
        </p>
        <Textarea
          id="formEmbedCode"
          value={formEmbedCode}
          onChange={(e) => setFormEmbedCode(e.target.value)}
          placeholder={formProvider ? "<script src='...'></script> or <iframe src='...'></iframe>" : "Select a form provider above to enable this field"}
          className={`min-h-[200px] font-mono text-sm ml-11 ${!formProvider ? 'bg-gray-50 cursor-not-allowed' : ''}`}
          disabled={!formProvider}
          data-testid="textarea-embed-code"
        />
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-900 mb-2">How to get your embed code:</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Go High Level:</strong> Go to Sites → Forms → Select your form → Click "Embed" → Copy the code</li>
          <li>• <strong>Formstack:</strong> Open your form → Click "Share" → Select "Embed" → Copy the embed code</li>
          <li>• <strong>Formspree:</strong> Create your form → Click "Integration" → Copy the HTML form code</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => saveFormMutation.mutate()}
          disabled={saveFormMutation.isPending || !formProvider || !formEmbedCode.trim()}
          className="bg-[#6458AF] hover:bg-[#5347A0]"
          data-testid="button-save-form"
        >
          {saveFormMutation.isPending ? "Saving..." : "Save Form Configuration"}
        </Button>
        <Button
          variant="outline"
          onClick={() => disableFormMutation.mutate()}
          disabled={disableFormMutation.isPending}
          data-testid="button-disable-form"
        >
          {disableFormMutation.isPending ? "Disabling..." : "Disable Form"}
        </Button>
      </div>

      {/* Preview Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> After saving, refresh your page to see the form appear in the contact section.
        </p>
      </div>
    </div>
  );
}
