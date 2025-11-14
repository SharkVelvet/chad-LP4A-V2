import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SectionVisibilityOverlayProps {
  rootRef: React.RefObject<HTMLDivElement>;
  hiddenSections: string[];
  onToggleSection: (sectionId: string) => void;
}

export default function SectionVisibilityOverlay({ 
  rootRef, 
  hiddenSections,
  onToggleSection 
}: SectionVisibilityOverlayProps) {
  const [sections, setSections] = useState<Array<{ id: string; element: HTMLElement; rect: DOMRect }>>([]);
  const [, setTrigger] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;

    const detectSections = () => {
      const sectionElements = rootRef.current?.querySelectorAll('section[id], div[id^="section-"]');
      const detectedSections: Array<{ id: string; element: HTMLElement; rect: DOMRect }> = [];

      sectionElements?.forEach((el) => {
        const element = el as HTMLElement;
        const id = element.id;
        
        if (id && !id.includes('headlessui')) {
          const rect = element.getBoundingClientRect();
          detectedSections.push({ id, element, rect });
        }
      });

      setSections(detectedSections);
    };

    detectSections();

    const observer = new ResizeObserver(() => {
      detectSections();
      setTrigger(prev => prev + 1);
    });

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    window.addEventListener('scroll', detectSections);
    window.addEventListener('resize', detectSections);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', detectSections);
      window.removeEventListener('resize', detectSections);
    };
  }, [rootRef, hiddenSections]);

  return (
    <>
      {sections.map(({ id, element }) => {
        const isHidden = hiddenSections.includes(id);
        const rect = element.getBoundingClientRect();
        const iframeRect = rootRef.current?.getBoundingClientRect();
        
        if (!iframeRect) return null;

        const topPosition = rect.top - iframeRect.top + (rootRef.current?.parentElement?.scrollTop || 0);

        return (
          <button
            key={id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSection(id);
            }}
            className={`absolute left-2 z-50 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg transition-all hover:scale-105 ${
              isHidden 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            style={{
              top: `${topPosition + 20}px`,
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
    </>
  );
}
