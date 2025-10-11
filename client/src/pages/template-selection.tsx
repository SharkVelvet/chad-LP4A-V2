import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import TemplateCard from "@/components/template-card";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { trackViewContent } from "@/lib/facebook-pixel";

type Template = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
  isActive: boolean;
};

export default function TemplateSelection() {
  const [, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  // Track template selection page view
  useEffect(() => {
    trackViewContent('template_catalog');
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo on Left */}
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              >
                <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-xs font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>

              {/* Menu Items in Middle */}
              <nav className="hidden md:flex items-center space-x-8">
                <a onClick={() => navigate('/template-selection')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">View Templates</a>
                <a onClick={() => navigate('/custom-websites')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Websites</a>
                <a onClick={() => navigate('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
                <a onClick={() => navigate('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
              </nav>

              {/* Get Started Button on Right */}
              <Button 
                className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => navigate('/template-selection')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4" style={{ borderColor: '#6458AF', borderTopColor: 'transparent' }} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Templates</h2>
            <p className="text-gray-600">Preparing your professional website templates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo on Left */}
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>

            {/* Menu Items in Middle */}
            <nav className="hidden md:flex items-center space-x-8">
              <a onClick={() => navigate('/template-selection')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">View Templates</a>
              <a onClick={() => navigate('/custom-websites')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Websites</a>
              <a onClick={() => navigate('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
              <a onClick={() => navigate('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
            </nav>

            {/* Get Started Button on Desktop, Hamburger on Mobile */}
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => navigate('/template-selection')}
              >
                Get Started
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
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
                <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-xl font-bold" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600 mt-0.5" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-6 space-y-6">
              <a 
                href="/template-selection" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate('/template-selection');
                }}
              >
                View Templates
              </a>
              <a 
                href="/custom-websites" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate('/custom-websites');
                }}
              >
                Custom Websites
              </a>
              <a 
                href="/other-services" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate('/other-services');
                }}
              >
                Other Services
              </a>
              <a 
                href="/pricing" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate('/pricing');
                }}
              >
                Pricing
              </a>
              
              <div className="pt-6 border-t border-gray-200">
                <Button 
                  className="w-full px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/template-selection');
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
        </div>
      </>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Preview Templates Below</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Browse our professionally designed website templates below. Once you know what template you want to purchase and use, scroll to the bottom of this page and hit Start the Process
          </p>
          <div className="flex justify-center">
            <div className="bg-purple-50 px-6 py-4 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold" style={{ color: '#6458AF' }}>
                💡 Tip: Click "Preview" to see each template in full detail before making your choice
              </p>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates && templates.length > 0 ? (
            templates.sort((a, b) => a.id - b.id).map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Templates Available</h3>
              <p className="text-gray-600 mb-4">We're working on adding more professional templates.</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Website?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Once you've previewed the templates above and know which template name you want to use, click the button below to Start the Process
          </p>
          <div className="flex justify-center">
            <Button
              className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => navigate('/setup')}
            >
              START THE PROCESS
            </Button>
          </div>
          
          {/* Custom Solution Link */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't see a template you like? We can build you a custom solution.{' '}
              <button
                onClick={() => navigate('/services')}
                className="text-purple-600 hover:text-purple-800 underline font-medium"
                style={{ color: '#6458AF' }}
              >
                Click here to tell us what you want
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
                <li><a onClick={() => navigate('/template-selection')} className="hover:text-white transition-colors cursor-pointer">View Templates</a></li>
                <li><a onClick={() => navigate('/custom-websites')} className="hover:text-white transition-colors cursor-pointer">Custom Websites</a></li>
                <li><a onClick={() => navigate('/other-services')} className="hover:text-white transition-colors cursor-pointer">Other Services</a></li>
                <li><a onClick={() => navigate('/pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
                <li><a onClick={() => navigate('/blog')} className="hover:text-white transition-colors cursor-pointer">Our Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
                <li><a onClick={() => navigate('/terms-of-service')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
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