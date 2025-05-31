import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border'
      }`}
      onClick={onSelect}
    >
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={template.previewImage}
          alt={`${template.name} template preview`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
            <p className="text-blue-100">{template.description}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">{template.name}</h4>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">
          {template.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Best for: {template.category}
          </span>
          <Button 
            size="sm"
            variant={isSelected ? "default" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {isSelected ? "Selected" : "Select Template"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
