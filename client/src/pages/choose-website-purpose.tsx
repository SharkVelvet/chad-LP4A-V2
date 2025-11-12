import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export default function ChooseWebsitePurpose() {
  const [, setLocation] = useLocation();
  
  // Check if user already has websites (to show different pricing messaging)
  const { data: user } = useQuery<User>({ queryKey: ['/api/user'] });
  const { data: websites } = useQuery({ queryKey: ['/api/websites'] });
  
  const hasExistingWebsites = websites && Array.isArray(websites) && websites.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Create New Page</h1>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/dashboard')} data-testid="button-back">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pricing Banner */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6" data-testid="pricing-banner">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-base font-semibold text-blue-900 mb-1">
                {hasExistingWebsites ? 'Adding Another Page' : 'New Page Pricing'}
              </h3>
              <p className="text-sm text-blue-800">
                {hasExistingWebsites 
                  ? 'Each additional page is $38 for the first month, then $18/month thereafter. You\'ll be charged when you select your template.'
                  : 'Your first page is $38 for the first month, then $18/month. You\'ll complete payment after selecting your template.'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pick what you would like to use your page for
          </h2>
          <p className="text-lg text-gray-600">
            Choose the option that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Get More Clients Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all hover:border-primary group"
            onClick={() => setLocation('/templates/get-clients')}
            data-testid="card-get-clients"
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Get More Clients</CardTitle>
              <CardDescription className="text-base mt-2">
                Create a professional page to attract and convert more clients for your insurance business
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" size="lg" data-testid="button-get-clients">
                Choose This Option
              </Button>
            </CardContent>
          </Card>

          {/* Hire Agents Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all hover:border-primary group"
            onClick={() => setLocation('/templates/hire-agents')}
            data-testid="card-hire-agents"
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Hire Agents</CardTitle>
              <CardDescription className="text-base mt-2">
                Build a recruitment page to attract talented insurance agents to join your team
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" size="lg" data-testid="button-hire-agents">
                Choose This Option
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
