import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Calendar, Globe } from "lucide-react";

export default function Step5Success() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Clear any stored form data since the process is complete
    localStorage.removeItem('onboardingData');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Congratulations! 🎉
          </h1>
          
          <h2 className="text-xl text-gray-700 mb-8">
            Your Website Setup Has Been Started!
          </h2>

          {/* Success Message */}
          <div className="text-left space-y-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Payment Confirmed</h3>
              <p className="text-green-700 text-sm">
                Your payment has been processed successfully. You'll receive a receipt via email shortly.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-3">What happens next:</h3>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Email Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive detailed order confirmation and receipt emails</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Website Development</p>
                  <p className="text-sm text-gray-600">Our team will start building your website using your selected template and requirements</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Website Delivery</p>
                  <p className="text-sm text-gray-600">Your website will be ready within 1-2 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Expected Timeline</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Order Confirmation</span>
                <span className="text-green-600 font-medium">Complete ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Website Development</span>
                <span className="text-blue-600 font-medium">Starting Now</span>
              </div>
              <div className="flex justify-between">
                <span>Website Delivery</span>
                <span className="text-gray-500">1-2 Business Days</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-sm text-gray-600 mb-8">
            <p className="mb-2">Questions about your order?</p>
            <p>Feel free to reply to any of our emails or contact our support team.</p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => navigate('/template-selection')}
            size="lg"
            className="w-full sm:w-auto px-8"
          >
            Start Another Website
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}