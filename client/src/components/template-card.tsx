import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useLocation } from "wouter";
import { trackTemplateView } from "@/lib/facebook-pixel";

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
  isActive: boolean;
};

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const [, navigate] = useLocation();
  
  // Determine purpose based on template
  const getPurpose = () => {
    if (template.slug === "template-13" || template.slug === "Template-13" || template.name.includes("13") ||
        template.slug === "template-14" || template.slug === "Template-14" || template.name.includes("14") ||
        template.slug === "template-15" || template.slug === "Template-15" || template.name.includes("15")) {
      return "Recruiting";
    }
    return "Attract Clients";
  };
  
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border group"
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge 
              variant="default"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              {getPurpose()}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium" style={{ color: '#6458AF' }}>
                Professional Layout
              </span>
              <span className="text-xs text-gray-500">
                Insurance Agent Template
              </span>
            </div>
            <Button 
              size="sm"
              className="flex items-center space-x-2"
              style={{ backgroundColor: '#6458AF', color: 'white' }}
              onClick={(e) => {
                e.stopPropagation();
                // Track template view when preview is clicked
                trackTemplateView(template.name);
                const siteType = localStorage.getItem('selectedSiteType') || 'single-page';
                navigate(`/template-preview?template=${template.slug}&type=${siteType}`);
              }}
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}