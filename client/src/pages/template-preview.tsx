import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Edit2, X } from "lucide-react";
import TemplatePreview from "@/components/template-preview";
import Template13 from "@/components/templates/Template13";
import Template14 from "@/components/templates/Template14";
import Template15 from "@/components/templates/Template15";
import { useEffect, useState } from "react";
import { trackTemplateView, trackTemplateSelection } from "@/lib/facebook-pixel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryClient } from "@/lib/queryClient";

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
  isActive: boolean;
};

type Website = {
  id: number;
  name: string;
  templateId: number;
  content?: {
    businessName: string | null;
    tagline: string | null;
    aboutUs: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
  };
};

export default function TemplatePreviewPage() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const templateSlug = params.get('template');
  const websiteId = params.get('websiteId');
  const hideNav = params.get('hideNav') === 'true';
  const editMode = params.get('editMode') === 'true';
  const siteType = params.get('type') || localStorage.getItem('selectedSiteType') || 'single-page';
  
  // Check if page is loaded in iframe
  const isInIframe = window.self !== window.top;

  // Edit mode state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState<{
    type: 'text' | 'image' | 'button';
    content: string;
    fieldName: string;
    buttonUrl?: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  const { data: templates, isLoading: templatesLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  // Fetch website content if websiteId is provided
  const { data: website } = useQuery<Website>({
    queryKey: ["/api/websites", websiteId],
    queryFn: async () => {
      const res = await fetch(`/api/websites/${websiteId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch website");
      return res.json();
    },
    enabled: !!websiteId,
    staleTime: 0,
    refetchOnMount: true,
  });

  const template = templates?.find(t => t.slug === templateSlug);
  
  // Prepare content data for template
  const contentData = website?.content || {
    businessName: null,
    tagline: null,
    aboutUs: null,
    phone: null,
    email: null,
    address: null,
  };

  // Track template preview view
  useEffect(() => {
    if (template) {
      trackTemplateView(template.name);
    }
  }, [template]);

  // Listen for reload content message from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'RELOAD_CONTENT') {
        // Refetch website content
        if (websiteId) {
          queryClient.invalidateQueries({ queryKey: ["/api/websites", websiteId] });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [websiteId]);

  // Auto-generate IDs and apply saved content
  useEffect(() => {
    // First, auto-generate IDs for ALL elements with text content
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      
      // Skip if already has an ID, is inside a button/link, or has no text
      if (htmlElement.hasAttribute('data-content-id') || 
          htmlElement.closest('button, a, script, style, svg') ||
          !htmlElement.textContent?.trim()) {
        return;
      }
      
      // Skip if element only contains child elements with text (not direct text)
      // This prevents parent containers from being editable when children should be
      const hasDirectText = Array.from(htmlElement.childNodes).some(
        node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );
      if (!hasDirectText) {
        return;
      }
      
      // Generate stable ID based ONLY on position (not content)
      const tagName = htmlElement.tagName.toLowerCase();
      const siblings = Array.from(htmlElement.parentElement?.children || []);
      const index = siblings.indexOf(htmlElement);
      
      // Create path to element for uniqueness
      let pathParts = [tagName, index.toString()];
      let parent = htmlElement.parentElement;
      let depth = 0;
      while (parent && parent !== document.body && depth < 3) {
        const parentSiblings = Array.from(parent.parentElement?.children || []);
        const parentIndex = parentSiblings.indexOf(parent);
        pathParts.unshift(`${parent.tagName.toLowerCase()}-${parentIndex}`);
        parent = parent.parentElement;
        depth++;
      }
      
      const autoId = `auto.${pathParts.join('.')}`;
      htmlElement.setAttribute('data-content-id', autoId);
    });
    
    // Then apply saved content to all elements with IDs
    if (website?.content) {
      // The flexible content is in website.content.content (JSONB field)
      const flexibleContent = (website.content as any).content as Record<string, string> || {};
      const elements = document.querySelectorAll('[data-content-id]');
      
      elements.forEach((element) => {
        const contentId = element.getAttribute('data-content-id');
        if (contentId && flexibleContent[contentId]) {
          const htmlElement = element as HTMLElement;
          // Check if element has child elements (like spans for styling)
          if (htmlElement.children.length > 0) {
            // Preserve HTML structure - update innerHTML
            htmlElement.innerHTML = flexibleContent[contentId];
          } else {
            // Simple text element - update textContent
            htmlElement.textContent = flexibleContent[contentId];
          }
        }
      });
      
      // Also apply button URLs
      const buttons = document.querySelectorAll('button, a[href]');
      buttons.forEach((button) => {
        // Generate ID for this button same way as click handler
        const tagName = button.tagName.toLowerCase();
        const siblings = Array.from(button.parentElement?.children || []);
        const index = siblings.indexOf(button);
        let pathParts = [tagName, index.toString()];
        let parent = button.parentElement;
        let depth = 0;
        while (parent && parent !== document.body && depth < 3) {
          const parentSiblings = Array.from(parent.parentElement?.children || []);
          const parentIndex = parentSiblings.indexOf(parent);
          pathParts.unshift(`${parent.tagName.toLowerCase()}-${parentIndex}`);
          parent = parent.parentElement;
          depth++;
        }
        const buttonId = `auto.${pathParts.join('.')}`;
        const urlKey = `${buttonId}.url`;
        
        if (flexibleContent[urlKey]) {
          (button as HTMLAnchorElement).href = flexibleContent[urlKey];
        }
      });
    }
  }, [website?.content]);


  // Add click handlers for edit mode
  useEffect(() => {
    if (!editMode) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Ignore clicks that originated from within the edit modal (portaled content)
      const path = e.composedPath();
      if (path.some((el) => el instanceof HTMLElement && el.hasAttribute('data-edit-modal'))) {
        return;
      }
      
      // Check if clicking on a button or link
      const button = target.closest('button, a[href]') as HTMLElement;
      if (button) {
        e.preventDefault();
        e.stopPropagation();
        
        const buttonElement = button as HTMLButtonElement | HTMLAnchorElement;
        const text = buttonElement.textContent || '';
        const url = (buttonElement as HTMLAnchorElement).href || '';
        
        // Generate ID for the button
        const tagName = buttonElement.tagName.toLowerCase();
        const siblings = Array.from(buttonElement.parentElement?.children || []);
        const index = siblings.indexOf(buttonElement);
        let pathParts = [tagName, index.toString()];
        let parent = buttonElement.parentElement;
        let depth = 0;
        while (parent && parent !== document.body && depth < 3) {
          const parentSiblings = Array.from(parent.parentElement?.children || []);
          const parentIndex = parentSiblings.indexOf(parent);
          pathParts.unshift(`${parent.tagName.toLowerCase()}-${parentIndex}`);
          parent = parent.parentElement;
          depth++;
        }
        const contentId = `auto.${pathParts.join('.')}`;
        
        setEditingElement({
          type: 'button',
          content: text,
          fieldName: contentId,
          buttonUrl: url
        });
        setEditValue(text);
        setButtonUrl(url);
        setIsEditModalOpen(true);
        return;
      }
      
      // Check if clicking on an image
      if (target.matches('img')) {
        e.preventDefault();
        e.stopPropagation();
        
        const imgElement = target as HTMLImageElement;
        const src = imgElement.src || '';
        
        // Generate ID for the image
        const tagName = imgElement.tagName.toLowerCase();
        const siblings = Array.from(imgElement.parentElement?.children || []);
        const index = siblings.indexOf(imgElement);
        let pathParts = [tagName, index.toString()];
        let parent = imgElement.parentElement;
        let depth = 0;
        while (parent && parent !== document.body && depth < 3) {
          const parentSiblings = Array.from(parent.parentElement?.children || []);
          const parentIndex = parentSiblings.indexOf(parent);
          pathParts.unshift(`${parent.tagName.toLowerCase()}-${parentIndex}`);
          parent = parent.parentElement;
          depth++;
        }
        const contentId = `auto.${pathParts.join('.')}`;
        
        setEditingElement({
          type: 'image',
          content: src,
          fieldName: contentId
        });
        setEditValue(src);
        setIsEditModalOpen(true);
        return;
      }
      
      // First check if element or any parent has data-content-id
      let contentIdElement = target.hasAttribute('data-content-id') ? target : target.closest('[data-content-id]');
      
      // Or check for legacy data-field
      let legacyFieldElement = !contentIdElement ? (target.hasAttribute('data-field') ? target : target.closest('[data-field]')) : null;
      
      // Or it's ANY element with text content (not just specific tags)
      const hasText = target.textContent?.trim();
      const isNotContainer = !target.matches('body, html, section, article, main, header, footer, nav');
      const isTextElement = hasText && isNotContainer;
      
      if (contentIdElement || legacyFieldElement || isTextElement) {
        e.preventDefault();
        e.stopPropagation();
        
        const text = target.textContent || '';
        
        // Get content ID or field name
        const contentId = contentIdElement?.getAttribute('data-content-id') || null;
        const legacyField = legacyFieldElement?.getAttribute('data-field') || null;
        
        // Auto-generate content ID if none exists using SAME method as page load
        let finalContentId = legacyField || contentId;
        if (!finalContentId) {
          // Generate stable ID based ONLY on position (same as auto-generation)
          const tagName = target.tagName.toLowerCase();
          const siblings = Array.from(target.parentElement?.children || []);
          const index = siblings.indexOf(target);
          
          // Create path to element for uniqueness (same as auto-generation)
          let pathParts = [tagName, index.toString()];
          let parent = target.parentElement;
          let depth = 0;
          while (parent && parent !== document.body && depth < 3) {
            const parentSiblings = Array.from(parent.parentElement?.children || []);
            const parentIndex = parentSiblings.indexOf(parent);
            pathParts.unshift(`${parent.tagName.toLowerCase()}-${parentIndex}`);
            parent = parent.parentElement;
            depth++;
          }
          
          finalContentId = `auto.${pathParts.join('.')}`;
        }
        
        setEditingElement({
          type: 'text',
          content: text,
          fieldName: finalContentId
        });
        setEditValue(text);
        setIsEditModalOpen(true);
      }
      
      // Check if it's an image
      if (target.matches('img')) {
        e.preventDefault();
        e.stopPropagation();
        
        setEditingElement({
          type: 'image',
          content: (target as HTMLImageElement).src,
          fieldName: 'image'
        });
        setEditValue((target as HTMLImageElement).src);
        setIsEditModalOpen(true);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [editMode]);

  const handleGearClick = (element: HTMLElement, type: 'button' | 'image') => {
    if (type === 'button') {
      const buttonElement = element as HTMLButtonElement | HTMLAnchorElement;
      const text = buttonElement.textContent || '';
      const url = (buttonElement as HTMLAnchorElement).href || '';
      
      // Generate ID for the button
      const tagName = buttonElement.tagName.toLowerCase();
      const siblings = Array.from(buttonElement.parentElement?.children || []);
      const index = siblings.indexOf(buttonElement);
      let pathParts = [tagName, index.toString()];
      let parent = buttonElement.parentElement;
      let depth = 0;
      while (parent && parent !== document.body && depth < 3) {
        const parentSiblings = Array.from(parent.parentElement?.children || []);
        const parentIndex = parentSiblings.indexOf(parent);
        pathParts.unshift(`${parent.tagName.toLowerCase()}-${parentIndex}`);
        parent = parent.parentElement;
        depth++;
      }
      const contentId = `auto.${pathParts.join('.')}`;
      
      setEditingElement({
        type: 'button',
        content: text,
        fieldName: contentId,
        buttonUrl: url
      });
      setEditValue(text);
      setButtonUrl(url);
      setIsEditModalOpen(true);
    } else if (type === 'image') {
      const imgElement = element as HTMLImageElement;
      const src = imgElement.src || '';
      
      // Generate ID for the image
      const tagName = imgElement.tagName.toLowerCase();
      const siblings = Array.from(imgElement.parentElement?.children || []);
      const index = siblings.indexOf(imgElement);
      let pathParts = [tagName, index.toString()];
      let parent = imgElement.parentElement;
      let depth = 0;
      while (parent && parent !== document.body && depth < 3) {
        const parentSiblings = Array.from(parent.parentElement?.children || []);
        const parentIndex = parentSiblings.indexOf(parent);
        pathParts.unshift(`${parent.tagName.toLowerCase()}-${parentIndex}`);
        parent = parent.parentElement;
        depth++;
      }
      const contentId = `auto.${pathParts.join('.')}`;
      
      setEditingElement({
        type: 'image',
        content: src,
        fieldName: contentId
      });
      setEditValue(src);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingElement && window.parent) {
      if (editingElement.type === 'button') {
        // Save button text
        window.parent.postMessage({
          type: 'CONTENT_EDIT',
          contentId: editingElement.fieldName,
          value: editValue
        }, window.location.origin);
        
        // Save button URL
        window.parent.postMessage({
          type: 'CONTENT_EDIT',
          contentId: `${editingElement.fieldName}.url`,
          value: buttonUrl
        }, window.location.origin);
      } else {
        // Check if this is a legacy field or new content ID
        const isLegacyField = ['businessName', 'tagline', 'aboutUs', 'phone', 'email', 'address'].includes(editingElement.fieldName);
        
        // Send message to parent window with the edit
        window.parent.postMessage({
          type: 'CONTENT_EDIT',
          field: isLegacyField ? editingElement.fieldName : null,
          contentId: !isLegacyField ? editingElement.fieldName : null,
          value: editValue
        }, window.location.origin);
      }
    }
    
    // Close modal and clear state
    setIsEditModalOpen(false);
    setEditingElement(null);
    setEditValue("");
    setButtonUrl("");
  };

  const handleCancelEdit = () => {
    // Just close modal and clear state, no saving
    setIsEditModalOpen(false);
    setEditingElement(null);
    setEditValue("");
    setButtonUrl("");
  };

  // Show loading state while templates are being fetched
  if (templatesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  // Only show "not found" after templates have loaded
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Button onClick={() => navigate('/template-selection')}>
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  const handleChooseTemplate = () => {
    // Track template selection
    if (template) {
      trackTemplateSelection(template.name);
    }
    
    // If opened from dashboard (has window.opener), communicate back
    if (window.opener && !window.opener.closed) {
      // Send message to dashboard to open create dialog with this template
      window.opener.postMessage({ 
        type: 'SELECT_TEMPLATE', 
        templateId: template.id,
        templateSlug: template.slug 
      }, window.location.origin);
      // Close the preview window
      window.close();
    } else {
      // Fallback: navigate to website setup
      localStorage.setItem('selectedTemplate', template.slug);
      navigate('/website-setup');
    }
  };

  const handleBackToTemplates = () => {
    // If opened from dashboard, just close the window
    if (window.opener && !window.opener.closed) {
      window.close();
    } else {
      // Fallback: navigate to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Sticky Banner - Only show when NOT viewing from dashboard (no websiteId) and not hiding nav */}
      {!websiteId && !hideNav && (
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBackToTemplates}
                className="flex items-center space-x-2"
                data-testid="button-back-to-templates"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Templates</span>
              </Button>
              
              <h1 className="text-xl font-semibold">{template.name}</h1>
              
              <Button
                onClick={handleChooseTemplate}
                size="lg"
                className="bg-[#6458AF] hover:bg-[#5347A0]"
                data-testid="button-choose-template"
              >
                Choose This Template
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview */}
      <div 
        className={`w-full ${editMode ? 'edit-mode-active' : ''}`} 
        style={{ scrollBehavior: 'smooth' }}
        data-edit-mode={editMode}
      >
        {template.slug === "template-13" || template.slug === "Template-13" ? (
          <Template13 className="w-full" content={contentData} editMode={editMode} />
        ) : template.slug === "template-14" || template.slug === "Template-14" ? (
          <Template14 className="w-full" content={contentData} editMode={editMode} />
        ) : template.slug === "template-15" || template.slug === "Template-15" ? (
          <Template15 className="w-full" content={contentData} editMode={editMode} />
        ) : ["Template-1", "Template-2", "Template-3", "Template-4", "Template-5", "Template-6", "Template-7", "Template-8", "template-9", "Template-10", "Template-11", "Template-12"].includes(template.slug) ? (
          <TemplatePreview templateSlug={template.slug} className="w-full" content={contentData} editMode={editMode} />
        ) : (
          <div className="w-full min-h-screen bg-white">
            <img
              src={template.previewImage}
              alt={`${template.name} preview`}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
      
      {/* Edit Mode CSS */}
      {editMode && (
        <style>{`
          .edit-mode-active * {
            cursor: pointer !important;
          }
          .edit-mode-active h1:hover,
          .edit-mode-active h2:hover,
          .edit-mode-active h3:hover,
          .edit-mode-active h4:hover,
          .edit-mode-active h5:hover,
          .edit-mode-active h6:hover,
          .edit-mode-active p:hover,
          .edit-mode-active span:hover,
          .edit-mode-active div:hover,
          .edit-mode-active button:hover,
          .edit-mode-active a:hover,
          .edit-mode-active img:hover {
            outline: 2px solid #6458AF;
            outline-offset: 2px;
            position: relative;
          }
        `}</style>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={(open) => {
        if (!open) {
          handleCancelEdit();
        }
      }}>
        <DialogContent className="sm:max-w-[500px]" data-edit-modal onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5" />
              Edit {editingElement?.type === 'image' ? 'Image' : 'Content'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {editingElement?.type === 'button' ? (
              <>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Button Text</label>
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full mt-1"
                    placeholder="Enter button text..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Button URL</label>
                  <Input
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    className="w-full mt-1"
                    placeholder="Enter URL (e.g., https://example.com)..."
                  />
                </div>
              </>
            ) : editingElement?.type === 'text' ? (
              <>
                <div className="text-xs text-gray-500 uppercase font-semibold">
                  Field: {editingElement.fieldName}
                </div>
                {editingElement.content.length > 100 ? (
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={6}
                    className="w-full"
                    placeholder="Enter your text..."
                  />
                ) : (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full"
                    placeholder="Enter your text..."
                  />
                )}
              </>
            ) : (
              <>
                <div className="text-xs text-gray-500 uppercase font-semibold">Image URL</div>
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full"
                  placeholder="Enter image URL..."
                />
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                  Image upload feature coming soon! For now, you can paste an image URL.
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[#6458AF] hover:bg-[#5347A0]"
              data-testid="button-save-edit"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}