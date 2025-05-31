import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

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
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>{template.name} - Full Preview</DialogTitle>
                </DialogHeader>
                <div className="w-full h-[60vh] overflow-auto">
                  <img
                    src={template.previewImage}
                    alt={`${template.name} full preview`}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-gray-600">{template.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
      </CardContent>
    </Card>
  );
}
