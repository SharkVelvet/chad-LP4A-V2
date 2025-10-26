import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowLeft, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
};

export default function SelectTemplateByCategory() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/templates/:category");
  const category = params?.category;
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const { toast } = useToast();

  // Map URL category to display name
  const categoryDisplay = category === 'get-clients' ? 'Get More Clients' : 'Hire Agents';
  const templateCategory = category === 'get-clients' ? 'client' : 'hiring';

  // Create website mutation
  const createWebsiteMutation = useMutation({
    mutationFn: async (templateId: number) => {
      const res = await apiRequest("POST", "/api/websites", {
        templateId,
        name: `My Website`,
        subscriptionPlan: "basic",
        domainPreferences: [],
      });
      return await res.json();
    },
    onSuccess: (newWebsite: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
      setLocation(`/editor/${newWebsite.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create website. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Set page title
  useEffect(() => {
    document.title = `${categoryDisplay} Templates - Professional Landing Pages for Insurance Agents`;
  }, [categoryDisplay]);

  // Fetch templates
  const { data: allTemplates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  // Filter templates based on category
  // Templates 1-12 are for clients, 13-15 are for hiring
  const templates = allTemplates.filter(template => {
    if (category === 'get-clients') {
      return template.id >= 1 && template.id <= 12;
    } else if (category === 'hire-agents') {
      return template.id >= 13 && template.id <= 15;
    }
    return false;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">Loading Templates...</h1>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4" style={{ borderColor: '#6458AF', borderTopColor: 'transparent' }} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Templates</h2>
            <p className="text-gray-600">Preparing your professional website templates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Select a Template</h1>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/choose-purpose')} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {categoryDisplay} Templates
          </h2>
          <p className="text-lg text-gray-600">
            Click on any template to preview it in a new window
          </p>
        </div>

        {templates.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <h3 className="text-lg font-medium mb-2">No Templates Available</h3>
              <p className="text-gray-600 mb-4">Templates are being loaded. Please check back soon.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group"
                onClick={() => {
                  setSelectedTemplate(template);
                  setIsIframeLoading(true);
                }}
                data-testid={`template-card-${template.id}`}
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" data-testid={`button-preview-${template.id}`}>
                    Preview Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Template Preview Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent 
          hideCloseButton
          className="max-w-full max-h-[85vh] h-[85vh] p-0 gap-0 fixed bottom-0 top-auto translate-y-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom rounded-t-xl border-0"
          style={{ 
            animation: selectedTemplate ? 'slideUp 0.3s ease-out' : 'slideDown 0.3s ease-out',
            margin: 0
          }}
        >
          <VisuallyHidden>
            <DialogTitle>{selectedTemplate?.name} Preview</DialogTitle>
            <DialogDescription>Preview of {selectedTemplate?.name} template</DialogDescription>
          </VisuallyHidden>
          
          <style>
            {`
              @keyframes slideUp {
                from {
                  transform: translateY(100%);
                }
                to {
                  transform: translateY(0);
                }
              }
              @keyframes slideDown {
                from {
                  transform: translateY(0);
                }
                to {
                  transform: translateY(100%);
                }
              }
            `}
          </style>
          
          {/* Header with template selection - 50px tall */}
          <div className="absolute top-0 left-0 right-0 z-50 bg-white border-b px-3 flex items-center justify-between rounded-t-xl h-[50px]">
            <Button
              size="sm"
              className="bg-[#6458AF] hover:bg-[#5347A0]"
              onClick={() => {
                if (selectedTemplate) {
                  createWebsiteMutation.mutate(selectedTemplate.id);
                }
              }}
              disabled={createWebsiteMutation.isPending}
              data-testid="button-choose-template"
            >
              {createWebsiteMutation.isPending ? "Creating..." : "Choose this Template"}
            </Button>
            
            <h3 className="text-sm font-semibold text-gray-900">{selectedTemplate?.name}</h3>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTemplate(null)}
              data-testid="button-close-preview"
            >
              Close
            </Button>
          </div>

          {/* Scrollable iframe content - padded by 50px to account for fixed header */}
          <div className="w-full h-full overflow-auto pt-[50px] relative">
            {isIframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">Loading template preview...</p>
                </div>
              </div>
            )}
            {selectedTemplate && (
              <iframe
                src={`/template-preview?template=${selectedTemplate.slug}&hideNav=true`}
                className="w-full h-full border-0 block"
                title={`Preview of ${selectedTemplate.name}`}
                data-testid="iframe-template-preview"
                onLoad={() => setIsIframeLoading(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
