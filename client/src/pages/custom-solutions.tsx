import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { FileText, Send, CheckCircle, Menu, X, Globe, Zap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { insertCustomSolutionInquirySchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Extend the schema with an additional field for multiple example sites
const formSchema = insertCustomSolutionInquirySchema.extend({
  exampleSitesText: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

const budgetRanges = [
  { value: "1000-2500", label: "$1,000 - $2,500" },
  { value: "2500-5000", label: "$2,500 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-25000", label: "$10,000 - $25,000" },
  { value: "25000-50000", label: "$25,000 - $50,000" },
];

export default function CustomSolutions() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const scrollToForm = () => {
    document.getElementById('custom-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      budgetRange: "",
      monthlyRetainer: false,
      exampleSitesText: "",
      projectDetails: "",
      status: "new"
    },
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: FormData) => {
      // Convert example sites text to array
      const exampleSites = data.exampleSitesText 
        ? data.exampleSitesText.split('\n').filter(site => site.trim()) 
        : [];
      
      const payload = {
        ...data,
        exampleSites,
        exampleSitesText: undefined
      };

      const response = await fetch('/api/custom-solution-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit inquiry');
      }

      return response.json();
    },
    onSuccess: () => {
      // Reset form
      form.reset();
      
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Thank you for your submission! We'll review your requirements and get back to you within 24 hours. Redirecting to homepage...",
      });
      
      // Redirect to homepage after 3 seconds
      setTimeout(() => {
        setLocation('/');
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Error Submitting Inquiry",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitInquiry.mutate(data);
  };


  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/')}
            >
              <FileText className="h-9 w-9 sm:h-10 sm:w-10 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-2xl sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-sm sm:text-sm font-medium text-gray-600 mt-0.5 sm:-mt-1" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <div className="relative">
                <a 
                  href="/get-clients" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/get-clients');
                  }}
                >
                  Get Clients
                </a>
              </div>
              <div className="relative">
                <a 
                  href="/recruit-agents" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/recruit-agents');
                  }}
                >
                  Recruit Agents
                </a>
              </div>
              <div className="relative">
                <a 
                  href="#features" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/internal-one');
                    setTimeout(() => {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Features
                </a>
              </div>
              <div className="relative">
                <a 
                  href="#pricing" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/internal-one');
                    setTimeout(() => {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Pricing
                </a>
              </div>
              <div className="relative">
                <a 
                  href="/blog" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/blog');
                  }}
                >
                  Blog
                </a>
              </div>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block hover:opacity-90 w-52"
                style={{ backgroundColor: '#6458AF' }} 
                onClick={scrollToForm}
              >
                Get Custom Quote
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Slide-out Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <FileText className="h-8 w-8 mr-2" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600 mt-0.5" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-6 space-y-6">
              <a 
                href="/get-clients"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/get-clients');
                }}
              >
                Get Clients
              </a>
              <a 
                href="/recruit-agents"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/recruit-agents');
                }}
              >
                Recruit Agents
              </a>
              <a 
                href="/blog"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/blog');
                }}
              >
                Blog
              </a>
              <Button 
                className="w-full mt-4"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToForm();
                }}
              >
                Get Custom Quote
              </Button>
            </nav>
        </div>
      </>
      

      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need something beyond our templates? We create custom websites, advanced integrations, 
            and specialized solutions tailored to your unique requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-6 w-6" style={{ color: '#6458AF' }} />
                <CardTitle className="text-lg" style={{ color: '#6458AF' }}>Custom Websites</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Fully custom designs built from scratch with your exact specifications and branding requirements.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-6 w-6" style={{ color: '#6458AF' }} />
                <CardTitle className="text-lg" style={{ color: '#6458AF' }}>Advanced Integrations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                CRM connections, lead management systems, payment processing, and third-party API integrations.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Building className="h-6 w-6" style={{ color: '#6458AF' }} />
                <CardTitle className="text-lg" style={{ color: '#6458AF' }}>Enterprise Solutions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Multi-location sites, agent management systems, custom dashboards, and scalable platforms.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto" id="custom-form">
          <CardHeader>
            <CardTitle className="text-2xl text-center" style={{ color: '#6458AF' }}>
              Tell Us About Your Project
            </CardTitle>
            <p className="text-center text-gray-600">
              Share your requirements and we'll create a custom proposal for you.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company/Agency</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC Insurance Agency" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Range *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthlyRetainer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I would like my budget to be made into a monthly retainer for 12 months
                        </FormLabel>
                        <p className="text-sm text-gray-500">
                          Retainers are only considered for project sizes that are greater than $500 a month, Aka $6000.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exampleSitesText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Example Sites You Like</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share URLs of websites you admire or that inspire your project (one per line)"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500">Enter each website URL on a separate line</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project requirements, goals, timeline, and any specific features you need..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  style={{ backgroundColor: '#6458AF' }}
                  disabled={submitInquiry.isPending}
                >
                  {submitInquiry.isPending ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}