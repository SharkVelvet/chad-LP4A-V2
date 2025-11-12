interface FormEmbedProps {
  embedCode: string;
  className?: string;
}

export function FormEmbed({ embedCode, className = "" }: FormEmbedProps) {
  if (!embedCode || !embedCode.trim()) {
    return null;
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
}
