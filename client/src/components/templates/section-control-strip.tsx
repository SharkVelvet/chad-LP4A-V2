import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionControlStripProps {
  sectionId: string;
  sectionLabel: string;
  isHidden: boolean;
  onToggle: (sectionId: string) => void;
}

export default function SectionControlStrip({ 
  sectionId, 
  sectionLabel, 
  isHidden, 
  onToggle 
}: SectionControlStripProps) {
  return (
    <div 
      className="bg-gray-200 border-b border-gray-300 py-3 px-6 flex items-center justify-between relative z-[9999]"
      data-visibility-control="true"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          {sectionLabel}
        </span>
        <span className="text-xs text-gray-600">
          {isHidden ? '(Hidden from visitors)' : '(Visible to visitors)'}
        </span>
      </div>
      <Button
        size="sm"
        variant={isHidden ? "default" : "outline"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle(sectionId);
        }}
        className="gap-2"
        data-testid={`button-toggle-${sectionId}`}
        data-visibility-control="true"
      >
        {isHidden ? (
          <>
            <Eye className="h-4 w-4" />
            Show Section
          </>
        ) : (
          <>
            <EyeOff className="h-4 w-4" />
            Hide Section
          </>
        )}
      </Button>
    </div>
  );
}
