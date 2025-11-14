import { useEffect, useState, useCallback, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SectionVisibilityOverlayProps {
  rootRef: React.RefObject<HTMLDivElement>;
  hiddenSections: string[];
  onToggleSection: (sectionId: string) => void;
}

interface SectionPosition {
  id: string;
  topPosition: number;
}

export default function SectionVisibilityOverlay({ 
  rootRef, 
  hiddenSections,
  onToggleSection 
}: SectionVisibilityOverlayProps) {
  const [sections, setSections] = useState<SectionPosition[]>([]);
  const throttleTimeoutRef = useRef<NodeJS.Timeout>();

  const detectSections = useCallback(() => {
    if (!rootRef.current) return;

    const iframeRect = rootRef.current.getBoundingClientRect();
    const scrollTop = rootRef.current.parentElement?.scrollTop || 0;

    let sectionElements = rootRef.current.querySelectorAll('[data-section-id]');
    
    if (!sectionElements || sectionElements.length === 0) {
      sectionElements = rootRef.current.querySelectorAll('[id]');
    }
    
    const detectedSections: SectionPosition[] = [];
    const validSectionIds = ['hero', 'stats', 'cta', 'apply-form', 'about', 'services', 'solutions', 'training', 'support', 'opportunity', 'benefits', 'success', 'life-insurance', 'health-insurance', 'annuities', 'family-protection', 'retirement-planning', 'quotes', 'contact', 'career-support'];

    sectionElements?.forEach((el) => {
      const element = el as HTMLElement;
      const sectionId = element.getAttribute('data-section-id') || element.id;
      
      const isDataSectionId = element.hasAttribute('data-section-id');
      const isValidId = element.id && validSectionIds.includes(element.id);
      
      if (sectionId && (isDataSectionId || isValidId)) {
        const rect = element.getBoundingClientRect();
        const topPosition = rect.top - iframeRect.top + scrollTop + 20;
        detectedSections.push({ id: sectionId, topPosition });
      }
    });

    setSections(detectedSections);
  }, [rootRef]);

  useEffect(() => {
    if (!rootRef.current) return;

    detectSections();

    const handleResize = () => {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      throttleTimeoutRef.current = setTimeout(() => {
        detectSections();
      }, 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [rootRef, hiddenSections, detectSections]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[60]">
      {sections.map(({ id, topPosition }) => {
        const isHidden = hiddenSections.includes(id);

        return (
          <button
            key={id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              onToggleSection(id);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
            }}
            className={`pointer-events-auto absolute left-2 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg transition-colors ${
              isHidden 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            style={{
              top: `${topPosition}px`,
            }}
            title={isHidden ? `Show "${id}" section` : `Hide "${id}" section`}
            data-testid={`toggle-section-${id}`}
          >
            {isHidden ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span className="text-sm font-medium">Hidden</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Visible</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
