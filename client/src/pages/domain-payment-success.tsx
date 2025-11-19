import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function DomainPaymentSuccess() {
  const [, navigate] = useLocation();

  // Domain purchasing functionality has been disabled
  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Domain Purchase Disabled</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Domain purchasing is currently disabled</h3>
            <p className="text-gray-600 mb-6">
              You will be redirected to the dashboard shortly.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-[#6458AF] hover:bg-[#5349A0]"
              data-testid="button-goto-dashboard"
            >
              Go to Dashboard Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
