import { AlertTriangle, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountSuspended() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Account Temporarily Suspended
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Your account has been suspended due to an outstanding payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Action Required:</strong> Your account and all associated landing pages are currently inaccessible until your payment is processed.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">What this means:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                All your landing pages are currently offline
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Your custom domains are showing this suspension notice
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                You cannot access your dashboard
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">How to resolve this:</h3>
            <p className="text-gray-700 mb-4">
              Please contact us immediately to update your payment information and restore your account.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Contact Support:</p>
              <a 
                href="https://LandingPagesforAgents.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="w-full" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Visit LandingPagesforAgents.com
                </Button>
              </a>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              We're here to help get your account back up and running as quickly as possible.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
