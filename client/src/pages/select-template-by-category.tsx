import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

  // Map URL category to display name
  const categoryDisplay = category === 'get-clients' ? 'Get More Clients' : 'Hire Agents';
  const templateCategory = category === 'get-clients' ? 'client' : 'hiring';

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
        <nav className="bg-white shadow-sm border-b border-border">
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
      <nav className="bg-white shadow-sm border-b border-border">
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
                onClick={() => window.open(`/template-preview?template=${template.slug}`, '_blank')}
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
    </div>
  );
}
