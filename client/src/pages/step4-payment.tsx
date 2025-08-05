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

  // Track payment page view
  useEffect(() => {
    trackPaymentInitiation('monthly_subscription', 29.99);
  }, []);

  const handleGoBack = () => {
    navigate("/step3");
  };

  const handlePaymentSuccess = () => {
    // Track successful purchase
    trackSuccessfulPurchase('monthly_subscription', 29.99);
    navigate("/step5-success");
  };

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
              Step 4 of 5
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 4 of 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 max-w-md mx-auto">
              <div className="h-2 rounded-full" style={{ width: '80%', backgroundColor: '#6458AF' }}></div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h2>
          <p className="text-gray-600">Secure payment to start your website setup and subscription.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <SubscriptionForm 
              plan="planright-website"
              onSuccess={handlePaymentSuccess}
              isLoading={isProcessing}
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
                    <span className="font-medium text-purple-900">Landing Pages for Agents Website Service</span>
                  </div>
                  <ul className="text-sm text-purple-700 space-y-1 ml-6">
                    <li>Professional website template</li>
                    <li>Custom domain setup</li>
                    <li>Website hosting</li>
                    <li>Content management</li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">First month (setup + hosting)</span>
                    <span className="font-semibold">$38.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Monthly renewal (after 30 days)</span>
                    <span className="font-semibold">$18.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Contract term</span>
                    <span className="font-semibold">12 months</span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total due today</span>
                      <span className="text-lg font-bold" style={{ color: '#6458AF' }}>$38.00</span>
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
            Built by <a href="https://fotype.com" target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: '#6458AF' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5347A3'} onMouseLeave={(e) => e.currentTarget.style.color = '#6458AF'}>FOTYPE</a> | Copyright © 2025 Landing Pages for Agents
          </p>
        </div>
      </div>
    </div>
  );
}