import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TemplatePreview from "@/components/template-preview";

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

  const { data: templates } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const template = templates?.find(t => t.slug === templateSlug);

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
    // Store template selection and navigate to website setup
    localStorage.setItem('selectedTemplate', template.slug);
    navigate('/website-setup');
  };

  const handleBackToTemplates = () => {
    navigate('/template-selection');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Banner */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={handleBackToTemplates}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Templates</span>
            </Button>
            <h1 className="text-xl font-semibold">{template.name}</h1>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="w-full">
        {["Template-1", "Template-2", "Template-3", "Template-4", "Template-5", "Template-6"].includes(template.slug) ? (
          <TemplatePreview templateSlug={template.slug} className="w-full min-h-screen" />
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