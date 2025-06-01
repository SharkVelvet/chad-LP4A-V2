import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export default function WebsiteSetup() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    template: "",
    domain1: "",
    domain2: "",
    domain3: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would submit the form data
    console.log("Form submitted:", formData);
    // Navigate to next step (step 3)
    navigate("/step3");
  };

  const handleGoBack = () => {
    navigate("/templates");
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
              <h1 className="text-xl font-semibold text-gray-900">Plan|right Splash Page Onboarding</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 2 of 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your Business</h2>
          <p className="text-gray-600">Please provide your contact information and preferences for your website.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="template">Which template would you like to use? *</Label>
              <Select value={formData.template} onValueChange={(value) => handleInputChange("template", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template1">Template 1</SelectItem>
                  <SelectItem value="template2">Template 2</SelectItem>
                  <SelectItem value="template3">Template 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Domain Name Preferences</CardTitle>
              <p className="text-gray-600">
                Please list 3 domain name options you would like us to try to purchase. This will be the URL people will go to view your website (e.g., yourbusiness.com). We'll secure the first available option from your list.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="domain1">First Choice *</Label>
                <div className="flex">
                  <Input
                    id="domain1"
                    value={formData.domain1}
                    onChange={(e) => handleInputChange("domain1", e.target.value)}
                    placeholder="yourbusiness"
                    className="rounded-r-none"
                    required
                  />
                  <span className="px-4 py-2 bg-gray-50 border-t border-r border-b border-border rounded-r-lg text-gray-600">
                    .com
                  </span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="domain2">Second Choice *</Label>
                <div className="flex">
                  <Input
                    id="domain2"
                    value={formData.domain2}
                    onChange={(e) => handleInputChange("domain2", e.target.value)}
                    placeholder="yourbusinessname"
                    className="rounded-r-none"
                    required
                  />
                  <span className="px-4 py-2 bg-gray-50 border-t border-r border-b border-border rounded-r-lg text-gray-600">
                    .com
                  </span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="domain3">Third Choice *</Label>
                <div className="flex">
                  <Input
                    id="domain3"
                    value={formData.domain3}
                    onChange={(e) => handleInputChange("domain3", e.target.value)}
                    placeholder="yourbusinessonline"
                    className="rounded-r-none"
                    required
                  />
                  <span className="px-4 py-2 bg-gray-50 border-t border-r border-b border-border rounded-r-lg text-gray-600">
                    .com
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button type="submit" size="lg" className="px-8 py-3">
              Continue to Next Step
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
