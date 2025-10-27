import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Lock, ArrowLeft } from "lucide-react";

// Initialize Stripe
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ templateId, onSuccess }: { templateId: string; onSuccess: (websiteId: number) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-processing?templateId=${templateId}`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsProcessing(false);
      }
      // If no error and not redirected, payment succeeded
      // The return_url will handle creating the website
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full bg-[#6458AF] hover:bg-[#5347A0]" 
        disabled={!stripe || isProcessing}
        data-testid="button-submit-payment"
      >
        <Lock className="h-4 w-4 mr-2" />
        {isProcessing ? "Processing..." : "Complete Purchase"}
      </Button>
    </form>
  );
};

export default function WebsiteCheckout() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/checkout/:templateId");
  const templateId = params?.templateId || "";
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  // Fetch user data
  const { data: user } = useQuery<any>({ queryKey: ['/api/user'] });

  // Fetch template details
  const { data: templates = [] } = useQuery<any[]>({
    queryKey: ["/api/templates"],
  });

  const selectedTemplate = templates.find(t => t.id.toString() === templateId);

  // Check if user already has websites
  const { data: websites } = useQuery({ queryKey: ['/api/websites'] });
  const hasExistingWebsites = websites && Array.isArray(websites) && websites.length > 0;
  const websiteCount = Array.isArray(websites) ? websites.length : 0;

  useEffect(() => {
    // Set page title
    document.title = "Complete Your Purchase - Professional Landing Pages for Insurance Agents";
  }, []);

  useEffect(() => {
    if (!templateId || !templates.length) {
      return;
    }

    // Validate template exists
    if (!selectedTemplate) {
      toast({
        title: "Invalid Template",
        description: "The selected template could not be found. Please go back and select a valid template.",
        variant: "destructive",
      });
      setTimeout(() => setLocation('/choose-purpose'), 2000);
      return;
    }

    // Wait for user data to load
    if (!user || !user.email) {
      return;
    }

    // Create payment intent for website subscription
    apiRequest("POST", "/api/create-subscription", {
      email: user.email,
      customerName: user.username || user.email,
      contractAgreed: true,
      disclaimerAgreed: true,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret returned");
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
        console.error("Payment initialization error:", error);
      });
  }, [templateId, templates, user, selectedTemplate]);

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#6458AF] border-t-transparent rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Preparing Checkout</h2>
          <p className="text-gray-600">Setting up your secure payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Complete Your Purchase</h1>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocation('/choose-purpose')}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Order summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your website purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplate && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold mb-1">{selectedTemplate.name}</h4>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                  </div>
                )}

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>First month</span>
                    <span className="font-semibold">$38.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Monthly thereafter</span>
                    <span>$18.00/month</span>
                  </div>
                  {hasExistingWebsites && (
                    <div className="pt-3 mt-3 border-t">
                      <p className="text-sm text-gray-600 mb-2">After first month:</p>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Your new monthly total</span>
                        <span className="font-semibold text-lg">${18 * (websiteCount + 1)}/month</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        ({websiteCount} existing {websiteCount === 1 ? 'site' : 'sites'} + 1 new site)
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Full Visual Editor</p>
                      <p className="text-xs text-gray-600">Edit all content with live preview</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Custom Domain</p>
                      <p className="text-xs text-gray-600">Connect your own domain name</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Analytics Dashboard</p>
                      <p className="text-xs text-gray-600">Track visitors and conversions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">SEO Tools</p>
                      <p className="text-xs text-gray-600">Optimize for search engines</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Cancel Anytime</p>
                      <p className="text-xs text-gray-600">No long-term commitment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Payment form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span>Secure payment processed by Stripe</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm 
                    templateId={templateId} 
                    onSuccess={(websiteId: number) => {
                      toast({
                        title: "Payment Successful!",
                        description: "Your website is being created...",
                      });
                      setLocation(`/editor/${websiteId}`);
                    }} 
                  />
                </Elements>
              </CardContent>
            </Card>

            <p className="text-xs text-center text-gray-500 mt-6">
              By completing this purchase, you agree to our Terms of Service. You can cancel your subscription at any time from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
