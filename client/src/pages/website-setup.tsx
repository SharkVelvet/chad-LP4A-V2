import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import SubscriptionForm from "@/components/subscription-form";

export default function WebsiteSetup() {
  const { user, logoutMutation } = useAuth();
  const [location, navigate] = useLocation();
  const [domains, setDomains] = useState(["", "", ""]);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  
  // Get templateId from URL params
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const templateId = urlParams.get('templateId');

  const createWebsiteMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/website", data);
      return res.json();
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const handleDomainChange = (index: number, value: string) => {
    const newDomains = [...domains];
    newDomains[index] = value;
    setDomains(newDomains);
  };

  const handleSetupComplete = async () => {
    if (!templateId) return;

    const websiteData = {
      templateId: parseInt(templateId),
      domainPreferences: domains.filter(d => d.trim() !== ''),
      subscriptionPlan: selectedPlan,
    };

    createWebsiteMutation.mutate(websiteData);
  };

  const handleGoBack = () => {
    navigate("/templates");
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!templateId) {
    navigate("/templates");
    return null;
  }

  const planDetails = {
    basic: {
      name: "Basic Plan",
      price: 29,
      features: [
        "Custom domain included",
        "Template customization", 
        "Contact form handling",
        "Basic analytics"
      ]
    },
    professional: {
      name: "Professional Plan", 
      price: 49,
      features: [
        "Everything in Basic",
        "Advanced analytics",
        "SEO optimization",
        "Priority support"
      ]
    }
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
              <h1 className="text-xl font-semibold text-gray-900">Website Setup</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Website Setup</h2>
          <p className="text-gray-600">Choose your domain preferences and complete your subscription.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Setup Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Domain Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Domain Name Preferences</CardTitle>
                <p className="text-gray-600">
                  Provide 3 domain name options in order of preference. We'll secure the first available option.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {domains.map((domain, index) => (
                  <div key={index}>
                    <Label>{["First Choice", "Second Choice", "Third Choice"][index]}</Label>
                    <div className="flex">
                      <Input
                        value={domain}
                        onChange={(e) => handleDomainChange(index, e.target.value)}
                        placeholder={`yourbusiness${index > 0 ? ['name', 'online'][index - 1] : ''}`}
                        className="rounded-r-none"
                        required={index === 0}
                      />
                      <span className="px-4 py-2 bg-gray-50 border-t border-r border-b border-border rounded-r-lg text-gray-600">
                        .com
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subscription Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                  {Object.entries(planDetails).map(([key, plan]) => (
                    <div key={key}>
                      <Label 
                        htmlFor={key}
                        className="block p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-gray-50 data-[state=checked]:border-primary data-[state=checked]:bg-blue-50"
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={key} id={key} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{plan.name}</h4>
                              <div className="text-right">
                                <div className="text-2xl font-bold">${plan.price}</div>
                                <div className="text-sm text-gray-600">per month</div>
                              </div>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {plan.features.map((feature, idx) => (
                                <li key={idx}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <SubscriptionForm 
              plan={selectedPlan}
              onSuccess={handleSetupComplete}
              isLoading={createWebsiteMutation.isPending}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Template</span>
                  <span className="font-medium">Selected Template</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Location</span>
                  <Badge variant="secondary">ID: {user?.locationId}</Badge>
                </div>
                
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="font-medium">{planDetails[selectedPlan as keyof typeof planDetails].name}</span>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Monthly Total</span>
                  <span>${planDetails[selectedPlan as keyof typeof planDetails].price}.00</span>
                </div>

                <div className="text-sm text-gray-600 space-y-2 mt-4">
                  <p>• Domain registration included</p>
                  <p>• 30-day money-back guarantee</p>
                  <p>• Cancel anytime</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
