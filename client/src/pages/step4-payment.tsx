import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Shield, Check, FileText } from "lucide-react";
import SubscriptionForm from '@/components/subscription-form';
import { trackPaymentInitiation, trackSuccessfulPurchase } from "@/lib/facebook-pixel";

export default function Step4Payment() {
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [discountCode, setDiscountCode] = useState('');

  // Track payment page view
  useEffect(() => {
    trackPaymentInitiation('monthly_subscription', 29.99);
  }, []);

  const handleGoBack = () => {
    navigate("/step3");
  };

  const handlePaymentSuccess = () => {
    // Track successful purchase with actual amount paid
    const actualAmount = discountInfo ? 
      (discountInfo.amount_off ? Math.max(0, 38 - (discountInfo.amount_off / 100)) : 
       discountInfo.percent_off ? 38 * (1 - discountInfo.percent_off / 100) : 38) : 38;
    trackSuccessfulPurchase('monthly_subscription', actualAmount);
    navigate("/step5-success");
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
      const discount = discountInfo.amount_off / 100;
      firstMonthPrice = Math.max(0, originalFirstMonth - discount);
      // Don't apply discount to monthly price - it's a first month only discount
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleGoBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/internal-one')}
              >
                <FileText className="h-7 w-7 mr-2" style={{ color: '#6458AF' }} />
                <h1 className="text-xl font-semibold" style={{ color: '#6458AF' }}>Landing Pages for Agents</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step 3 of 4
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 3 of 4</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 max-w-md mx-auto">
              <div className="h-2 rounded-full" style={{ width: '75%', backgroundColor: '#6458AF' }}></div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h2>
          <p className="text-gray-600">Secure payment to start your page setup and subscription.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <SubscriptionForm 
              plan="planright-page"
              onSuccess={handlePaymentSuccess}
              isLoading={isProcessing}
              onDiscountChange={(discount, code) => {
                setDiscountInfo(discount);
                setDiscountCode(code);
              }}
            />
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Check className="h-4 w-4 mr-2" style={{ color: '#6458AF' }} />
                    <span className="font-medium text-purple-900">Landing Pages for Agents Page Service</span>
                  </div>
                  <ul className="text-sm text-purple-700 space-y-1 ml-6">
                    <li>Professional page template</li>
                    <li>Custom domain setup</li>
                    <li>Page hosting</li>
                    <li>Content management</li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">First month (setup + hosting)</span>
                    <div className="text-right">
                      {discountInfo && (
                        <div className="text-gray-500 line-through text-sm">${originalFirstMonth.toFixed(2)}</div>
                      )}
                      <span className="font-semibold">${firstMonthPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Monthly renewal (after 30 days)</span>
                    <span className="font-semibold">${monthlyPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Contract term</span>
                    <span className="font-semibold">12 months</span>
                  </div>
                  {discountInfo && (
                    <div className="flex justify-between items-center mb-2 text-green-600">
                      <span className="text-sm font-medium">Discount: {discountCode}</span>
                      <span className="text-sm font-medium">
                        -{discountInfo.percent_off 
                          ? `${discountInfo.percent_off}%` 
                          : `$${(discountInfo.amount_off / 100).toFixed(2)}`
                        }
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total due today</span>
                      <span className="text-lg font-bold" style={{ color: '#6458AF' }}>${firstMonthPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                      <p className="text-xs text-gray-600">Your payment is processed securely with 256-bit SSL encryption</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Copyright © 2025 Landing Pages for Agents
          </p>
        </div>
      </div>
    </div>
  );
}