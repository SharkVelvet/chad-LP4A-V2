import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function PublicWebsite() {
  // Strip www. prefix to normalize domain lookups
  const hostname = window.location.hostname.replace(/^www\./, '');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/public/page-by-domain', hostname],
    queryFn: async () => {
      const response = await fetch(`/api/public/page-by-domain/${hostname}`, {
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error('Page not found');
      }
      return response.json();
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    if (data?.content) {
      document.title = data.content.businessName || "Page";
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">This domain is not connected to a page.</p>
        </div>
      </div>
    );
  }

  const { page, content, template } = data;

  // Check if page is in maintenance mode
  if (content?.maintenanceMode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Under Maintenance</h1>
          <p className="text-lg text-gray-600 mb-6">
            We're currently performing scheduled maintenance. We'll be back shortly!
          </p>
          <p className="text-sm text-gray-500">
            Thank you for your patience.
          </p>
        </div>
      </div>
    );
  }

  // Check if page is published
  if (!content?.isPublished) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600">This page is not yet published.</p>
        </div>
      </div>
    );
  }

  // Dynamically load the appropriate template
  const TemplateComponent = () => {
    try {
      // Import the template dynamically based on the slug
      const templates: Record<string, any> = import.meta.glob('../components/templates/*.tsx', { eager: true });
      const templatePath = `../components/templates/${template.slug}.tsx`;
      const TemplateModule = templates[templatePath];
      
      if (!TemplateModule || !TemplateModule.default) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Template Not Found</h1>
              <p className="text-gray-600">Template "{template.slug}" could not be loaded.</p>
            </div>
          </div>
        );
      }

      const Template = TemplateModule.default;
      const flexibleContent = (content?.content as Record<string, string>) || {};
      // Merge page fields (formEnabled, formProvider, formEmbedCode) with content
      const mergedContent = {
        ...content,
        formEnabled: page?.formEnabled,
        formProvider: page?.formProvider,
        formEmbedCode: page?.formEmbedCode
      };
      return <Template 
        content={mergedContent} 
        flexibleContent={flexibleContent} 
        pageData={page} 
        editMode={false}
        hiddenSections={content?.hiddenSections || []}
      />;
    } catch (error) {
      console.error("Error loading template:", error);
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Page</h1>
            <p className="text-gray-600">Failed to load the template.</p>
          </div>
        </div>
      );
    }
  };

  return <TemplateComponent />;
}
