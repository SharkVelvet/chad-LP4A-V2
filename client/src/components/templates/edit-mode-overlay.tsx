import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";

interface EditModeOverlayProps {
  rootRef: React.RefObject<HTMLDivElement>;
}

export default function EditModeOverlay({ rootRef }: EditModeOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<{
    contentId: string;
    value: string;
    isImage: boolean;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    if (!rootRef.current) return;
    
    const textSelectors = 'h1, h2, h3, h4, h5, h6, p, span, a, button, li, td, th, label, div, img';
    const allElements = rootRef.current.querySelectorAll(textSelectors);
    const editableElements: HTMLElement[] = [];
    
    allElements.forEach((el) => {
      const element = el as HTMLElement;
      if (element.closest('nav')) return;
      
      // Skip visibility control buttons and their children
      if (element.getAttribute('data-visibility-control') === 'true' || 
          element.closest('[data-visibility-control="true"]')) return;
      
      // Skip anything inside a button that's inside a visibility control strip
      if (element.closest('button')?.closest('[data-visibility-control="true"]')) return;
      
      // Skip elements inside background containers (unless they have explicit content-id)
      const parentBackground = element.parentElement?.closest('[data-content-type="background"]');
      const hasExplicitId = element.getAttribute('data-content-id');
      if (parentBackground && element.getAttribute('data-content-type') !== 'background' && !hasExplicitId) {
        return;
      }
      
      const hasDirectText = Array.from(element.childNodes).some(
        node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );
      
      if (hasDirectText || element.tagName === 'IMG' || hasExplicitId) {
        editableElements.push(element);
      }
    });

    const handleClick = (e: Event) => {
      // Check the actual clicked element, not the element with the listener
      const clickedElement = e.target as HTMLElement;
      
      // Don't handle clicks from visibility control elements
      if (clickedElement.closest('[data-visibility-control="true"]')) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.currentTarget as HTMLElement;
      
      let contentId = target.getAttribute('data-content-id');
      if (!contentId) {
        const getPath = (el: HTMLElement): string => {
          const parts: string[] = [];
          let current: HTMLElement | null = el;
          
          while (current && current !== document.body) {
            const parent = current.parentElement;
            if (parent) {
              const siblings = Array.from(parent.children);
              const index = siblings.indexOf(current);
              parts.unshift(`${current.tagName.toLowerCase()}-${index}`);
            }
            current = parent;
          }
          
          return `auto.${parts.join('.')}`;
        };
        
        contentId = getPath(target);
      }
      
      const contentType = target.getAttribute('data-content-type');
      const isImage = contentType === 'image' || contentType === 'background' || target.tagName === 'IMG';
      
      let value = '';
      if (contentType === 'background') {
        value = target.getAttribute('data-background-url') || '';
      } else if (target.tagName === 'IMG') {
        value = (target as HTMLImageElement).src;
      } else {
        value = target.textContent || '';
      }
      
      setEditingContent({ contentId, value, isImage });
      setEditValue(value);
      setIsOpen(true);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      target.style.outline = '2px solid #6458AF';
      target.style.outlineOffset = '2px';
      target.style.cursor = 'pointer';
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      target.style.outline = 'none';
    };

    editableElements.forEach((el) => {
      el.addEventListener('click', handleClick);
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      editableElements.forEach((el) => {
        el.removeEventListener('click', handleClick);
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.style.outline = '';
      });
    };
  }, [rootRef]);

  const handleSave = () => {
    if (editingContent) {
      window.parent.postMessage({
        type: 'CONTENT_EDIT',
        contentId: editingContent.contentId,
        value: editValue
      }, '*');
      
      setIsOpen(false);
      setEditingContent(null);
      setEditValue("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit2 className="h-5 w-5" />
            Edit Content
          </DialogTitle>
          <DialogDescription>
            Make changes to this content. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {editingContent?.isImage ? (
            <div className="space-y-4">
              <Label>Image URL</Label>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Enter image URL"
              />
              <p className="text-xs text-gray-500">
                Paste a URL to an image or upload to a hosting service first.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Label>Text Content</Label>
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={6}
                placeholder="Enter your text here..."
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#6458AF] hover:bg-[#53479E]">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
