// Central registry of sections for each template
// Maps template slugs to their available sections with human-friendly labels

export interface TemplateSection {
  id: string;
  label: string;
}

export const templateSections: Record<string, TemplateSection[]> = {
  'template-15': [
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Statistics Section' },
    { id: 'opportunity', label: 'Opportunity Section' },
    { id: 'benefits', label: 'Benefits Section' },
    { id: 'training', label: 'Training & Support Section' },
    { id: 'success', label: 'Success Stories Section' },
    { id: 'cta', label: 'Call to Action Section' },
    { id: 'apply-form', label: 'Application Form Section' },
  ],
  
  // Add more templates as they implement section visibility
  'template-10': [],
  'template-11': [],
  'template-12': [],
  'template-13': [],
  'template-14': [],
};

// Helper to get sections for a template
export function getTemplateSections(templateSlug: string): TemplateSection[] {
  return templateSections[templateSlug] || [];
}
