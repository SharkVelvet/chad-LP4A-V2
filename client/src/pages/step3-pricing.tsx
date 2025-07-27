import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, DollarSign, Calendar, Globe, Settings, Camera, CreditCard, FileText } from "lucide-react";

export default function Step3Pricing() {
  const [, navigate] = useLocation();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
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
              <FileText className="h-7 w-7 mr-2" style={{ color: '#6458AF' }} />
              <h1 className="text-xl font-semibold" style={{ color: '#6458AF' }}>Landing Pages for Agents</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 3 of 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 max-w-md mx-auto">
              <div className="h-2 rounded-full" style={{ width: '60%', backgroundColor: '#6458AF' }}></div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Pricing & Service Agreement</h2>
          <p className="text-gray-600">Review our pricing structure and what's included in your 12-month website plan.</p>
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
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-2">First Month (Total charged today)</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">$38</div>
                <p className="text-sm text-blue-700">
                  Setup fee includes everything to get your website live and running
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-2">Monthly Renewal</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">$18</div>
                <p className="text-sm text-green-700">
                  Per month for 11 additional months (domain & hosting)
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                <span className="font-semibold">12-Month Contract</span>
              </div>
              <p className="text-sm text-gray-600">
                Total investment: $38 (first month) + $18 every month after
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Check className="h-5 w-5 mr-2 text-green-600" />
              What's Included
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-blue-600" />
                  First Month Setup ($38)
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    Domain name purchase and setup
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    Website hosting configuration
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    Professional website setup
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    Content consultation and updates
                  </li>

                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    Complete website launch
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-green-600" />
                  Monthly Service ($18/month)
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    Domain name renewal and management
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    Website hosting and maintenance
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
                    24/7 website uptime monitoring
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500" />
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
              />
              <div className="space-y-1">
                <label
                  htmlFor="agreement"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I agree to the 12-month website service contract and pricing structure
                </label>
                <p className="text-xs text-gray-500">
                  By checking this box, I understand and agree to pay $38 today for website setup, 
                  and authorize automatic monthly charges of $18 for the next 11 months for hosting and domain services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8 py-3"
            disabled={!agreed}
            onClick={handleContinue}
          >
            Continue to Payment
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Next: Enter payment information to complete your website setup
          </p>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Built by <a href="https://fotype.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-medium">FOTYPE</a> | Copyright © 2025 Landing Pages for Agents
          </p>
        </div>
      </div>
    </div>
  );
}