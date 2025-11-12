import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Set page title
  useEffect(() => {
    document.title = 'Contact Us - Professional Landing Pages for Insurance Agents';
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Message sent!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-gray-50">
      {/* Header Menu */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo on Left */}
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/')}
            >
              <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>

            {/* Menu Items in Middle */}
            <nav className="hidden md:flex items-center space-x-8">
              <a onClick={() => setLocation('/choose-purpose')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">View Templates</a>
              <a onClick={() => setLocation('/custom-websites')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Pages</a>
              <a onClick={() => setLocation('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
              <a onClick={() => setLocation('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
            </nav>

            {/* Get Started Button on Right */}
            <Button 
              className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => setLocation('/choose-purpose')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Contact Form Section */}
      <div className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have a question or need help? Send us a message and we'll get back to you soon.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          {...field}
                          data-testid="input-name"
                        />
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
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your@email.com" 
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="(555) 123-4567" 
                          {...field}
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How can we help you? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your needs or ask any questions..."
                          className="min-h-[150px]"
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-6 text-base font-semibold text-white hover:opacity-90 transition-opacity rounded-full"
                  style={{ backgroundColor: '#6458AF' }}
                  disabled={isSubmitting}
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <FileText className="h-10 w-10 mr-3" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-400" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Professional landing page templates designed specifically for insurance agents. <strong>Build trust, generate leads, and grow your business online.</strong>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About LP4A</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/choose-purpose')} className="hover:text-white transition-colors cursor-pointer">View Templates</a></li>
                <li><a onClick={() => setLocation('/custom-websites')} className="hover:text-white transition-colors cursor-pointer">Custom Pages</a></li>
                <li><a onClick={() => setLocation('/other-services')} className="hover:text-white transition-colors cursor-pointer">Other Services</a></li>
                <li><a onClick={() => setLocation('/pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
                <li><a onClick={() => setLocation('/blog')} className="hover:text-white transition-colors cursor-pointer">Our Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
                <li><a onClick={() => setLocation('/terms-of-service')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
            <p className="text-sm mt-2 opacity-30">Landing Pages for Agents is Owned and Operated by 1612 Media, LLC</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
