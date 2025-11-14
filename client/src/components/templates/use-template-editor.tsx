import { useRef } from "react";
import EditModeOverlay from "./edit-mode-overlay";

interface UseTemplateEditorProps {
  editMode?: boolean;
  hiddenSections?: string[];
}

export function useTemplateEditor({ 
  editMode = false, 
  hiddenSections = []
}: UseTemplateEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const isSectionHidden = (sectionId: string) => hiddenSections.includes(sectionId);

  const overlays = editMode ? <EditModeOverlay rootRef={rootRef} /> : null;

  return {
    rootRef,
    isSectionHidden,
    overlays
  };
}
