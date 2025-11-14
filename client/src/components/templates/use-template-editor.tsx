import { useRef } from "react";
import EditModeOverlay from "./edit-mode-overlay";
import SectionVisibilityOverlay from "./section-visibility-overlay";

interface UseTemplateEditorProps {
  editMode?: boolean;
  hiddenSections?: string[];
  onToggleSectionVisibility?: (sectionId: string) => void;
}

export function useTemplateEditor({ 
  editMode = false, 
  hiddenSections = [], 
  onToggleSectionVisibility 
}: UseTemplateEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const isSectionHidden = (sectionId: string) => hiddenSections.includes(sectionId);

  const overlays = editMode ? (
    <>
      <EditModeOverlay rootRef={rootRef} />
      {onToggleSectionVisibility && (
        <SectionVisibilityOverlay 
          rootRef={rootRef} 
          hiddenSections={hiddenSections} 
          onToggleSection={onToggleSectionVisibility} 
        />
      )}
    </>
  ) : null;

  return {
    rootRef,
    isSectionHidden,
    overlays
  };
}
