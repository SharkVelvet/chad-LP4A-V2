import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import TemplateCard from "@/components/template-card";

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
  isActive: boolean;
};

export default function TemplateSelection() {
  const [, navigate] = useLocation();

  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="font-bold text-xl">
                <span className="text-red-600">Plan</span>
                <span className="text-gray-400 font-thin mx-1">|</span>
                <span className="text-gray-900">right</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 1 of 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our professional website templates and preview them before making your choice.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates?.sort((a, b) => a.id - b.id).map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template}
            />
          ))}
        </div>

        {/* Skip to Next Step */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Ready to continue with your website?</p>
          <Button
            size="lg"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white"
            onClick={() => navigate('/setup')}
          >
            Go to the Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}