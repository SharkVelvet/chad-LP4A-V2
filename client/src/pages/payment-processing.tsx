import { useEffect } from 'react';
import { useLocation, useRoute } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function PaymentProcessing() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Get params from URL
  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get('templateId');
  const sessionId = searchParams.get('session_id');

  // Fetch template to get details
  const { data: templates = [] } = useQuery<any[]>({
    queryKey: ["/api/templates"],
  });

  const selectedTemplate = templates.find(t => t.id.toString() === templateId);

  // Create website mutation
  const createWebsiteMutation = useMutation({
    mutationFn: async () => {
      if (!templateId) {
        throw new Error("No template ID provided");
      }
      
      const res = await apiRequest("POST", "/api/websites", {
        templateId: parseInt(templateId),
        name: selectedTemplate?.name || "My Page",
        subscriptionPlan: "basic",
        domainPreferences: [],
      });
      return await res.json();
    },
    onSuccess: (newWebsite: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
      toast({
        title: "Success!",
        description: "Your page has been created successfully.",
      });
      // Redirect to editor
      setLocation(`/editor/${newWebsite.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error Creating Page",
        description: error.message || "Failed to create page. Please contact support.",
        variant: "destructive",
      });
      // Redirect to dashboard on error
      setTimeout(() => setLocation('/dashboard'), 3000);
    },
  });

  useEffect(() => {
    // Set page title
    document.title = "Processing Payment - Professional Landing Pages for Insurance Agents";
    
    // Verify we have required params
    if (!templateId || !sessionId) {
      toast({
        title: "Error",
        description: "Missing payment information. Redirecting to dashboard...",
        variant: "destructive",
      });
      setTimeout(() => setLocation('/dashboard'), 2000);
      return;
    }

    // Wait for template data to load
    if (!templates.length) {
      return;
    }

    // Create the website after successful payment
    createWebsiteMutation.mutate();
  }, [templateId, sessionId, templates]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="animate-spin w-16 h-16 border-4 border-[#6458AF] border-t-transparent rounded-full mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {createWebsiteMutation.isPending ? "Creating Your Page" : "Processing Payment"}
        </h1>
        <p className="text-gray-600 mb-6">
          {createWebsiteMutation.isPending 
            ? "Setting up your professional page. This will only take a moment..."
            : "Verifying your payment and setting up your account..."}
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            Please don't close this page. You'll be redirected automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
