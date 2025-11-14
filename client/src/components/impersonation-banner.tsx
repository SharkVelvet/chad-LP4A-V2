import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLocation } from "wouter";

interface ImpersonationStatus {
  isImpersonating: boolean;
  impersonatedUser?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export function ImpersonationBanner() {
  const [, setLocation] = useLocation();
  
  // Hide banner in iframe (preview mode)
  const isInIframe = window.self !== window.top;
  
  const { data: status } = useQuery<ImpersonationStatus>({
    queryKey: ["/api/admin/impersonation-status"],
    refetchInterval: 3000,
    staleTime: 1000,
  });

  const stopImpersonatingMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/stop-impersonating");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/impersonation-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setLocation("/admin/client-users");
    },
  });

  const isImpersonating = status?.isImpersonating && status.impersonatedUser;
  
  // Don't show in iframe or if not impersonating
  if (!isImpersonating || isInIframe || !status?.impersonatedUser) {
    return null;
  }

  const userName = status.impersonatedUser.firstName && status.impersonatedUser.lastName
    ? `${status.impersonatedUser.firstName} ${status.impersonatedUser.lastName}`
    : status.impersonatedUser.username || status.impersonatedUser.email;

  return (
    <div 
      className="bg-red-600 text-white px-4 py-3 flex items-center justify-between shadow-md" 
      style={{ position: 'sticky', top: 0, zIndex: 9999 }}
      data-testid="impersonation-banner"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">
          You are currently impersonating "{userName}"
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => stopImpersonatingMutation.mutate()}
        disabled={stopImpersonatingMutation.isPending}
        className="text-white hover:bg-red-700 hover:text-white"
        data-testid="button-stop-impersonating"
      >
        {stopImpersonatingMutation.isPending ? (
          "Returning..."
        ) : (
          <>
            <X className="h-4 w-4 mr-1" />
            Stop Impersonating
          </>
        )}
      </Button>
    </div>
  );
}
