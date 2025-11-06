import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function DomainPaymentSuccess() {
  const [, navigate] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    setSessionId(id);
  }, []);

  // Complete the domain purchase after payment
  const completePurchase = useMutation({
    mutationFn: async (sessionId: string) => {
      return await apiRequest("POST", "/api/domains/complete-purchase", { sessionId });
    },
  });

  useEffect(() => {
    if (sessionId && !completePurchase.isSuccess && !completePurchase.isPending && !completePurchase.isError) {
      completePurchase.mutate(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Domain Purchase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {completePurchase.isPending && (
            <div className="text-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-[#6458AF] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Processing Your Domain Purchase</h3>
              <p className="text-gray-600">
                Please wait while we register your domain with the registrar...
              </p>
            </div>
          )}

          {completePurchase.isSuccess && (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Domain Registered Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your domain has been successfully registered and is now ready to use.
              </p>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-[#6458AF] hover:bg-[#5349A0]"
                data-testid="button-goto-dashboard"
              >
                Go to Dashboard
              </Button>
            </div>
          )}

          {completePurchase.isError && (
            <div className="text-center py-8">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Registration Failed</h3>
              <p className="text-gray-600 mb-6">
                {(completePurchase.error as any)?.message || "Unable to complete domain registration. Please contact support."}
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => completePurchase.mutate(sessionId!)}
                  className="bg-[#6458AF] hover:bg-[#5349A0] w-full"
                  data-testid="button-retry"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="w-full"
                  data-testid="button-back-to-dashboard"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
