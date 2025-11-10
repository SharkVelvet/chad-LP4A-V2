import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Calendar, Globe, FileText } from "lucide-react";

export default function Step5Success() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Clear any stored form data since the process is complete
    localStorage.removeItem('onboardingData');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/internal-one')}
              >
                <FileText className="h-7 w-7" style={{ color: '#6458AF' }} />
                <h1 className="text-xl font-semibold" style={{ color: '#6458AF' }}>Landing Pages for Agents</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step 4 of 4 - Complete!
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12" style={{ color: '#6458AF' }} />
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
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Payment Confirmed</h3>
              <p className="text-purple-700 text-sm">
                Your payment has been processed successfully. You'll receive a receipt via email shortly.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-3">What happens next:</h3>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#6458AF' }} />
                <div>
                  <p className="font-medium text-gray-800">Email Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive detailed order confirmation and receipt emails</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#6458AF' }} />
                <div>
                  <p className="font-medium text-gray-800">Website Development</p>
                  <p className="text-sm text-gray-600">Our team will start building your website using your selected template and requirements</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#6458AF' }} />
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
                <span className="font-medium" style={{ color: '#6458AF' }}>Complete ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Website Development</span>
                <span className="font-medium" style={{ color: '#6458AF' }}>Starting Now</span>
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
            onClick={() => navigate('/choose-purpose')}
            size="lg"
            className="w-full sm:w-auto px-8 text-white"
            style={{ backgroundColor: '#6458AF' }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} 
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}
          >
            Start Another Website
          </Button>
        </CardContent>
      </Card>
      
      </div>
      
      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200 bg-white">
        <p className="text-sm text-gray-500">
          Copyright © 2025 Landing Pages for Agents
        </p>
      </div>
    </div>
  );
}