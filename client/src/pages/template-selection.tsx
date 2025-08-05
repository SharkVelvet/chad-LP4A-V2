import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import TemplateCard from "@/components/template-card";
import { FileText } from "lucide-react";
import { useEffect } from "react";
import { trackViewContent } from "@/lib/facebook-pixel";

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

  // Track template selection page view
  useEffect(() => {
    trackViewContent('template_catalog');
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div 
                  className="flex items-center space-x-2 font-bold text-xl cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => navigate('/internal-one')}
                >
                  <FileText className="h-6 w-6" style={{ color: '#6458AF' }} />
                  <div className="text-left">
                    <div className="text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                    <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
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
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div 
                className="flex items-center space-x-2 font-bold text-xl cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/internal-one')}
              >
                <FileText className="h-8 w-8" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
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
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 max-w-md mx-auto">
              <div className="h-2 rounded-full" style={{ width: '20%', backgroundColor: '#6458AF' }}></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Template</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Browse our professionally designed website templates created specifically for insurance agents.
          </p>
          <div className="flex justify-center">
            <div className="bg-purple-50 px-6 py-4 rounded-lg border border-purple-200">
              <p className="text-lg font-semibold" style={{ color: '#6458AF' }}>
                💡 Tip: Click "Preview" to see each template in full detail before making your choice
              </p>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates && templates.length > 0 ? (
            templates.sort((a, b) => a.id - b.id).map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Templates Available</h3>
              <p className="text-gray-600 mb-4">We're working on adding more professional templates.</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Website?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Once you've previewed the templates above, you can proceed to customize your chosen design with your business information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="px-8 py-3 text-white font-semibold"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => navigate('/setup')}
            >
              Continue to Website Setup
            </Button>
            <p className="text-sm text-gray-500">
              You'll select your template in the next step
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Built by <a href="https://fotype.com" target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: '#6458AF' }}>FOTYPE</a> | Copyright © 2025 Landing Pages for Agents
          </p>
        </div>
      </div>
    </div>
  );
}