import { useEffect } from "react";
import { useLocation } from "wouter";

export default function TemplateSelection() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to the purpose chooser page for the correct flow
    setLocation('/choose-purpose');
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
