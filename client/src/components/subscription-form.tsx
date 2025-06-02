import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface SubscriptionFormProps {
  plan: string;
  onSuccess: () => void;
  isLoading: boolean;
}

function CheckoutForm({ onSuccess, isLoading, email, customerName }: { 
  onSuccess: () => void; 
  isLoading: boolean;
  email: string;
  customerName: string;
}) {
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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/step5-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      toast({
        title: "Payment Successful",
        description: "Your subscription has been activated!",
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full mt-6" 
        size="lg"
        disabled={!stripe || isProcessing || isLoading}
      >
        {isProcessing ? "Processing..." : "Complete Setup & Start Subscription"}
      </Button>
    </form>
  );
}

export default function SubscriptionForm({ plan, onSuccess, isLoading }: SubscriptionFormProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  const createSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/create-subscription", { 
        plan, 
        email,
        customerName 
      });
      return res.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email for receipts",
        variant: "destructive",
      });
      return;
    }

    // Store onboarding data with the customer's email
    try {
      const templateData = localStorage.getItem('selectedTemplate');
      const domainData = localStorage.getItem('domainPreferences');
      
      await apiRequest('POST', '/api/store-onboarding-data', {
        email: email,
        templateSelected: templateData ? JSON.parse(templateData).name : null,
        domainPreferences: domainData ? JSON.parse(domainData) : null,
        customerInfo: { customerName }
      });
    } catch (error) {
      console.error('Failed to store onboarding data:', error);
    }

    createSubscriptionMutation.mutate();
  };

  if (!showPayment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive receipts and billing information
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Full Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={createSubscriptionMutation.isPending}
            >
              {createSubscriptionMutation.isPending ? "Setting up..." : "Continue to Payment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (!clientSecret) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Elements 
          stripe={stripePromise} 
          options={{ 
            clientSecret,
            appearance: {
              theme: 'stripe',
            },
          }}
        >
          <CheckoutForm 
            onSuccess={onSuccess} 
            isLoading={isLoading}
            email={email}
            customerName={customerName}
          />
        </Elements>
      </CardContent>
    </Card>
  );
}
