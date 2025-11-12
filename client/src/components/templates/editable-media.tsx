interface EditableImageProps {
  contentId: string;
  src: string;
  alt: string;
  className?: string;
  getValue?: (key: string, defaultValue: string) => string;
}

export function EditableImage({ 
  contentId, 
  src, 
  alt, 
  className = "",
  getValue 
}: EditableImageProps) {
  const imageSrc = getValue ? getValue(contentId, src) : src;
  
  return (
    <img
      data-content-id={contentId}
      data-content-type="image"
      src={imageSrc}
      alt={alt}
      className={className}
    />
  );
}

interface EditableBackgroundProps {
  contentId: string;
  backgroundUrl: string;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  getValue?: (key: string, defaultValue: string) => string;
}

export function EditableBackground({ 
  contentId, 
  backgroundUrl, 
  children, 
  className = "",
  gradient,
  getValue 
}: EditableBackgroundProps) {
  const bgUrl = getValue ? getValue(contentId, backgroundUrl) : backgroundUrl;
  
  const backgroundImageValue = gradient 
    ? `${gradient}, url(${bgUrl})`
    : `url(${bgUrl})`;
  
  return (
    <div
      data-content-id={contentId}
      data-content-type="background"
      data-background-url={bgUrl}
      className={className}
      style={{ backgroundImage: backgroundImageValue }}
    >
      {children}
    </div>
  );
}
