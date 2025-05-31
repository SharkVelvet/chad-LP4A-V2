import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useLocation } from "wouter";

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
  isSelected: boolean;
  onSelect: () => void;
}

export default function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const [, navigate] = useLocation();
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-full h-48 object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={template.isActive ? "default" : "secondary"}>
              {template.isActive ? "Active" : "Coming Soon"}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <Badge variant="outline">{template.category}</Badge>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">
            {template.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Best for: {template.category}
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  const siteType = localStorage.getItem('selectedSiteType') || 'single-page';
                  navigate(`/template-preview?template=${template.slug}&type=${siteType}`);
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button 
                size="sm"
                variant={isSelected ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
              >
                {isSelected ? "Selected" : "Select"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}