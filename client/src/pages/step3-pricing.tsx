import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, DollarSign, Calendar, Globe, Settings, Camera, CreditCard, FileText } from "lucide-react";
import { trackPricingView } from "@/lib/facebook-pixel";

export default function Step3Pricing() {
  const [, navigate] = useLocation();
  const [agreed, setAgreed] = useState(false);
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);

  // Track pricing page view
  useEffect(() => {
    trackPricingView();
  }, []);

  const handleContinue = () => {
    if (agreed && disclaimerAgreed) {
      // Store checkbox confirmations in localStorage
      localStorage.setItem('contractAgreed', JSON.stringify(agreed));
      localStorage.setItem('disclaimerAgreed', JSON.stringify(disclaimerAgreed));
      navigate("/step4-payment");
    }
  };

  const handleGoBack = () => {
    navigate("/setup");
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
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 2 of 4</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 max-w-md mx-auto">
              <div className="h-2 rounded-full" style={{ width: '50%', backgroundColor: '#6458AF' }}></div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Pricing & Service Agreement</h2>
          <p className="text-gray-600">Review our pricing structure and what's included in your 12-month page plan.</p>
        </div>

        {/* Pricing Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Pricing Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Monthly Subscription</h3>
                <div className="text-3xl font-bold mb-2" style={{ color: '#6458AF' }}>$18</div>
                <p className="text-sm text-purple-700">
                  Per month for professional page hosting and maintenance
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-2">First Month Setup</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">$38</div>
                <p className="text-sm text-green-700">
                  First month includes setup ($18 + $20 setup fee)
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                <span className="font-semibold">12-Month Contract</span>
              </div>
              <p className="text-sm text-gray-600">
                Total investment: $38 (first month includes setup) + $18 every month after
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
              What's Included
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Settings className="h-4 w-4 mr-2" style={{ color: '#6458AF' }} />
                  Setup & First Month ($38)
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    Professional landing page templates
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    Custom domain support
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    Professional contact information
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    Mobile responsive design
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    SEO optimization
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    24/7 support
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2" style={{ color: '#6458AF' }} />
                  Monthly Service ($18/month)
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    Domain name renewal and management
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    Page hosting and maintenance
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    24/7 page uptime monitoring
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
                    Security updates and backups
                  </li>

                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Schedule */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
              Automatic Billing Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Billing Information:</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• <strong>Today:</strong> You will be charged $38 for the first month setup</li>
                <li>• <strong>Every 30 days:</strong> Your card will automatically be charged $18 for hosting and domain renewal</li>
                <li>• <strong>Contract Length:</strong> 12 months total (1 setup month + 11 renewal months)</li>
                <li>• <strong>Auto-renewal:</strong> Billing will continue automatically unless cancelled</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Agreement Checkbox */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="h-6 w-6 data-[state=checked]:bg-[#6458AF] data-[state=checked]:border-[#6458AF] border-2"
              />
              <div className="space-y-1">
                <label
                  htmlFor="agreement"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I agree to the 12-month page service contract and pricing structure
                </label>
                <p className="text-xs text-gray-500">
                  By checking this box, I understand and agree to pay $38 today for page setup, 
                  and authorize automatic monthly charges of $18 for the next 11 months for hosting and domain services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer Checkbox */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="disclaimer"
                checked={disclaimerAgreed}
                onCheckedChange={(checked) => setDisclaimerAgreed(checked as boolean)}
                className="h-6 w-6 data-[state=checked]:bg-[#6458AF] data-[state=checked]:border-[#6458AF] border-2 mt-1"
              />
              <div className="space-y-1">
                <label
                  htmlFor="disclaimer"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I understand that I am purchasing a template from LandingPagesForAgents.com
                </label>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The template will include placeholder content, which I am solely responsible for updating and customizing. 
                  This includes items such as testimonials, state licensing, services offered, or any other legally required or restricted information. 
                  LandingPagesForAgents.com and 1612 Media, LLC assume no responsibility for the accuracy, legality, or representation of any content. 
                  Any template content left unchanged remains the full responsibility of the agent or agency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8 py-3 text-white" 
            style={{ backgroundColor: '#6458AF' }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} 
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}
            disabled={!agreed || !disclaimerAgreed}
            onClick={handleContinue}
          >
            Continue to Payment
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Next: Enter payment information to complete your page setup
          </p>
        </div>
        
        {/* Go Back Button - Bottom Left */}
        <div className="fixed bottom-6 left-6">
          <Button 
            variant="ghost"
            size="sm" 
            className="px-4 py-2 text-gray-400 hover:text-gray-200 text-sm"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
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