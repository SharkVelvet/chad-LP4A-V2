import { useEffect, useRef } from 'react';

interface FormEmbedProps {
  embedCode: string;
  className?: string;
}

export function FormEmbed({ embedCode, className = "" }: FormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!embedCode || !containerRef.current) return;

    // Parse the embed code to extract iframe attributes
    const parser = new DOMParser();
    const doc = parser.parseFromString(embedCode, 'text/html');
    const iframeElement = doc.querySelector('iframe');
    const scriptElement = doc.querySelector('script');

    if (!iframeElement) return;

    // Create and configure iframe
    const iframe = document.createElement('iframe');
    Array.from(iframeElement.attributes).forEach(attr => {
      iframe.setAttribute(attr.name, attr.value);
    });

    // Override style to ensure no scrolling and full width
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.minHeight = '600px';
    iframe.style.display = 'block';

    // Append iframe to container
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);
    iframeRef.current = iframe;

    // Load the external script if present
    if (scriptElement?.src) {
      const script = document.createElement('script');
      script.src = scriptElement.src;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }

    // Listen for postMessage from iframe to resize dynamically
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from Go High Level domains
      if (event.origin.includes('msgsndr.com') || event.origin.includes('gohighlevel.com')) {
        if (event.data.height && iframeRef.current) {
          iframeRef.current.style.height = `${event.data.height}px`;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [embedCode]);

  if (!embedCode || !embedCode.trim()) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={className}
    />
  );
}
