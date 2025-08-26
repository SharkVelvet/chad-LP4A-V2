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
import { trackSuccessfulPurchase } from "@/lib/facebook-pixel";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface SubscriptionFormProps {
  plan: string;
  onSuccess: () => void;
  isLoading: boolean;
  onDiscountChange?: (discount: any, code: string) => void;
}

function CheckoutForm({ onSuccess, isLoading, email, customerName, discountCode, discountInfo }: { 
  onSuccess: () => void; 
  isLoading: boolean;
  email: string;
  customerName: string;
  discountCode?: string;
  discountInfo?: any;
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
      // Track successful purchase
      trackSuccessfulPurchase('monthly_subscription', 29.99);
      toast({
        title: "Payment Successful",
        description: "Your subscription has been activated!",
      });
      onSuccess();
    }
  };

  // Calculate pricing with discount
  const originalFirstMonth = 38.00;
  const originalMonthly = 18.00;
  let firstMonthPrice = originalFirstMonth;
  let monthlyPrice = originalMonthly; // Monthly price stays the same - discount only applies to first month

  if (discountInfo) {
    if (discountInfo.percent_off) {
      firstMonthPrice = originalFirstMonth * (1 - discountInfo.percent_off / 100);
      // Don't apply discount to monthly price - it's a first month only discount
    } else if (discountInfo.amount_off) {
      const discount = discountInfo.amount_off / 100; // Convert cents to dollars
      firstMonthPrice = Math.max(0, originalFirstMonth - discount);
      // Don't apply discount to monthly price - it's a first month only discount
    }
  }

  return (
    <div>
      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>First month setup & hosting</span>
            <div className="text-right">
              {discountInfo && (
                <div className="text-gray-500 line-through">${originalFirstMonth.toFixed(2)}</div>
              )}
              <div className="font-medium">${firstMonthPrice.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Monthly hosting (starts next month)</span>
            <div>${monthlyPrice.toFixed(2)}/month</div>
          </div>
          {discountInfo && (
            <div className="flex justify-between text-green-600 font-medium pt-2 border-t">
              <span>Discount: {discountCode}</span>
              <span>
                -{discountInfo.percent_off 
                  ? `${discountInfo.percent_off}%` 
                  : `$${(discountInfo.amount_off / 100).toFixed(2)}`
                }
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total Today</span>
            <span>${firstMonthPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <PaymentElement 
          options={{
            fields: {
              billingDetails: {
                name: 'never',
                email: 'never',
                phone: 'never',
                address: 'never'
              }
            }
          }}
        />
        
        {/* Discount Information Display */}
        {discountInfo && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="text-sm">
                <p className="text-green-800 font-medium">
                  Discount Applied: {discountCode}
                </p>
                <p className="text-green-600">
                  {discountInfo.percent_off 
                    ? `${discountInfo.percent_off}% off` 
                    : `$${(discountInfo.amount_off / 100).toFixed(2)} off`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      
      <Button 
        type="submit" 
        className="w-full text-white mt-6" 
        size="lg"
        style={{ backgroundColor: '#6458AF' }} 
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} 
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}
        disabled={!stripe || isProcessing || isLoading}
      >
        {isProcessing ? "Processing..." : "Complete Setup & Start Subscription"}
      </Button>
      
      {/* Go Back Button - Bottom Left */}
        <div className="fixed bottom-6 left-6">
          <Button 
            type="button"
            variant="ghost" 
            size="sm"
            className="px-4 py-2 text-gray-400 hover:text-gray-200 text-sm"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function SubscriptionForm({ plan, onSuccess, isLoading, onDiscountChange }: SubscriptionFormProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const { toast } = useToast();

  const validateCouponMutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await apiRequest("POST", "/api/validate-coupon", { couponCode: code });
      return res.json();
    },
    onSuccess: (data) => {
      setDiscountInfo(data.coupon);
      if (onDiscountChange) {
        onDiscountChange(data.coupon, discountCode);
      }
      toast({
        title: "Discount Applied!",
        description: `${data.coupon.percent_off ? `${data.coupon.percent_off}% off` : `$${(data.coupon.amount_off / 100).toFixed(2)} off`}`,
      });
    },
    onError: (error: any) => {
      setDiscountInfo(null);
      if (onDiscountChange) {
        onDiscountChange(null, '');
      }
      toast({
        title: "Invalid Coupon",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/create-subscription", { 
        plan, 
        email,
        customerName,
        couponCode: discountCode || undefined
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

    // Data was already stored in Step 2, no need to overwrite it here

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
            <div>
              <Label htmlFor="discount">Discount Code (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="discount"
                  type="text"
                  placeholder="Enter discount code (case sensitive)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (discountCode.trim()) {
                      validateCouponMutation.mutate(discountCode.trim());
                    }
                  }}
                  disabled={!discountCode.trim() || validateCouponMutation.isPending}
                >
                  {validateCouponMutation.isPending ? "Checking..." : "Apply"}
                </Button>
              </div>
              {discountInfo && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ {discountInfo.percent_off ? `${discountInfo.percent_off}% off` : `$${(discountInfo.amount_off / 100).toFixed(2)} off`} applied
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full text-white" 
              size="lg"
              style={{ backgroundColor: '#6458AF' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}
              disabled={createSubscriptionMutation.isPending}
            >
              {createSubscriptionMutation.isPending ? "Setting up..." : "Continue to Payment"}
            </Button>
            
            {/* Go Back Button - Bottom Left */}
            <div className="fixed bottom-6 left-6">
              <Button 
                type="button"
                variant="ghost" 
                size="sm"
                className="px-4 py-2 text-gray-400 hover:text-gray-200 text-sm"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
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
            discountCode={discountCode}
            discountInfo={discountInfo}
          />
        </Elements>
      </CardContent>
    </Card>
  );
}
