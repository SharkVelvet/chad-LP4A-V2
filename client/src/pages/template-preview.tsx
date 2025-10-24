import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TemplatePreview from "@/components/template-preview";
import Template13 from "@/components/templates/Template13";
import Template14 from "@/components/templates/Template14";
import Template15 from "@/components/templates/Template15";
import { useEffect } from "react";
import { trackTemplateView, trackTemplateSelection } from "@/lib/facebook-pixel";

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
  isActive: boolean;
};

export default function TemplatePreviewPage() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const templateSlug = params.get('template');
  const siteType = params.get('type') || localStorage.getItem('selectedSiteType') || 'single-page';
  
  // Check if page is loaded in iframe
  const isInIframe = window.self !== window.top;

  const { data: templates } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const template = templates?.find(t => t.slug === templateSlug);

  // Track template preview view
  useEffect(() => {
    if (template) {
      trackTemplateView(template.name);
    }
  }, [template]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Button onClick={() => navigate('/template-selection')}>
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  const handleChooseTemplate = () => {
    // Track template selection
    if (template) {
      trackTemplateSelection(template.name);
    }
    
    // If opened from dashboard (has window.opener), communicate back
    if (window.opener && !window.opener.closed) {
      // Send message to dashboard to open create dialog with this template
      window.opener.postMessage({ 
        type: 'SELECT_TEMPLATE', 
        templateId: template.id,
        templateSlug: template.slug 
      }, window.location.origin);
      // Close the preview window
      window.close();
    } else {
      // Fallback: navigate to website setup
      localStorage.setItem('selectedTemplate', template.slug);
      navigate('/website-setup');
    }
  };

  const handleBackToTemplates = () => {
    // If opened from dashboard, just close the window
    if (window.opener && !window.opener.closed) {
      window.close();
    } else {
      // Fallback: navigate to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Sticky Banner */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBackToTemplates}
              className="flex items-center space-x-2"
              data-testid="button-back-to-templates"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Templates</span>
            </Button>
            
            <h1 className="text-xl font-semibold">{template.name}</h1>
            
            <Button
              onClick={handleChooseTemplate}
              size="lg"
              className="bg-[#6458AF] hover:bg-[#5347A0]"
              data-testid="button-choose-template"
            >
              Choose This Template
            </Button>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="w-full" style={{ scrollBehavior: 'smooth' }}>
        {template.slug === "template-13" || template.slug === "Template-13" ? (
          <Template13 className="w-full" />
        ) : template.slug === "template-14" || template.slug === "Template-14" ? (
          <Template14 className="w-full" />
        ) : template.slug === "template-15" || template.slug === "Template-15" ? (
          <Template15 className="w-full" />
        ) : ["Template-1", "Template-2", "Template-3", "Template-4", "Template-5", "Template-6", "Template-7", "Template-8", "template-9", "Template-10", "Template-11", "Template-12"].includes(template.slug) ? (
          <TemplatePreview templateSlug={template.slug} className="w-full" />
        ) : (
          <div className="w-full min-h-screen bg-white">
            <img
              src={template.previewImage}
              alt={`${template.name} preview`}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}