import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, FileText } from "lucide-react";

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
  isActive: boolean;
};

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

  const { data: templates, isLoading: templatesLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  // Get template ID from URL and set it in form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('templateId');
    if (templateId && templates) {
      const selectedTemplate = templates.find(t => t.id === parseInt(templateId));
      if (selectedTemplate) {
        setFormData(prev => ({ ...prev, template: selectedTemplate.slug }));
      }
    }
  }, [templates]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Store form data in localStorage and server for later use
    const templateData = { name: formData.template };
    const domainData = [
      formData.domain1 + '.com',
      formData.domain2 + '.com', 
      formData.domain3 + '.com'
    ];
    const customerData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    // Store in localStorage for payment step
    localStorage.setItem('selectedTemplate', JSON.stringify(templateData));
    localStorage.setItem('domainPreferences', JSON.stringify(domainData));
    localStorage.setItem('customerData', JSON.stringify(customerData));

    // Also store on server for email notifications
    try {
      const response = await fetch('/api/store-onboarding-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          templateSelected: formData.template,
          domainPreferences: domainData,
          customerInfo: {
            name: formData.name,
            phone: formData.phone
          }
        }),
      });
      
      if (response.ok) {
        // Navigate to next step (step 3)
        navigate("/step3");
      } else {
        console.error('Failed to store onboarding data');
      }
    } catch (error) {
      console.error('Error storing onboarding data:', error);
    }
  };

  const handleGoBack = () => {
    navigate("/template-selection");
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
              <div className="flex items-center space-x-2">
                <FileText className="h-7 w-7" style={{ color: '#6458AF' }} />
                <h1 className="text-xl font-semibold" style={{ color: '#6458AF' }}>Landing Pages for Agents</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 2 of 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 max-w-md mx-auto">
              <div className="h-2 rounded-full" style={{ width: '40%', backgroundColor: '#6458AF' }}></div>
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
              <p className="text-gray-600">Choose the template that best fits your business style.</p>
            </CardHeader>
            <CardContent>
              <Label>Which template would you like to use? *</Label>
              {templatesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {templates?.sort((a, b) => a.id - b.id).map((template) => (
                    <div key={template.id} className="flex flex-col items-center p-4 border rounded-lg">
                      <img
                        src={template.previewImage}
                        alt={template.name}
                        className="w-full h-32 object-cover rounded-md mb-3 border border-gray-200"
                      />
                      <h3 className="font-medium text-center mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600 text-center mb-3">{template.description}</p>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={template.slug}
                          name="template"
                          value={template.slug}
                          checked={formData.template === template.slug}
                          onChange={(e) => handleInputChange("template", e.target.value)}
                          className="w-4 h-4 border-gray-300"
                          style={{ 
                            accentColor: '#6458AF'
                          }}
                        />
                        <Label htmlFor={template.slug} className="text-sm font-medium cursor-pointer">
                          Select this template
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
            <Button type="submit" size="lg" className="px-8 py-3 text-white" style={{ backgroundColor: '#6458AF' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}>
              Continue to Next Step
            </Button>
          </div>
        </form>
        
        {/* Go Back Button - Bottom Left */}
        <div className="fixed bottom-6 left-6">
          <Button 
            type="button"
            variant="ghost" 
            size="sm" 
            className="px-4 py-2 text-gray-400 hover:text-gray-200 text-sm"
            onClick={() => navigate('/template-selection')}
          >
            Go Back
          </Button>
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
