import { Button } from "@/components/ui/button"
import { FileText, Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import designersImage from "@assets/lpfa-designers_1757289648427.png";

export default function CustomWebsites() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Custom Websites - Professional Landing Pages for Insurance Agents';
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
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
              <a onClick={() => setLocation('/template-selection')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">View Templates</a>
              <a onClick={() => setLocation('/custom-websites')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Websites</a>
              <a onClick={() => setLocation('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
              <a onClick={() => setLocation('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
            </nav>

            {/* Login / Signup Button on Desktop, Hamburger on Mobile */}
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:flex items-center px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/auth')}
              >
                Login / Signup
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
                  setLocation('/template-selection');
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
                  setLocation('/custom-websites');
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
                  setLocation('/other-services');
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
                  setLocation('/pricing');
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
                    setLocation('/template-selection');
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
        </div>
      </>

      {/* Custom Website Design Section */}
      <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white">
        {/* Page Title */}
        <div className="pt-10 pb-8 lg:py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Custom Website Design</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't see a template that you like? Want something a little more? Our team is happy to help you build a custom solution tailored specifically for your insurance agency.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-8 lg:py-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1050px' }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <img 
                  src={designersImage}
                  alt="Design team at work"
                  className="w-full object-cover max-h-[220px] lg:max-h-none lg:h-[739px]"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-orange-400"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-pink-400"></div>
            </div>

            {/* Right side - Steps */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-lg text-gray-600">Our custom website design process is simple and collaborative. We work closely with you to create a website that perfectly represents your brand.</p>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Share your vision</h3>
                    <p className="text-gray-600 mb-3">
                      Tell us exactly what you want. Share your brand colors, style preferences, and unique business requirements that templates can't capture.
                    </p>
                    <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2. We design from scratch</h3>
                    <p className="text-gray-600 mb-3">
                      Our designers create a completely custom website built specifically for your insurance agency, with unique layouts and features.
                    </p>
                    <div className="w-16 h-1 rounded-full bg-orange-400"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Stand out completely</h3>
                    <p className="text-gray-600 mb-3">
                      Launch a one-of-a-kind website that perfectly represents your brand and sets you apart from every other insurance agent.
                    </p>
                    <div className="w-16 h-1 rounded-full bg-pink-400"></div>
                  </div>
                </div>
              </div>

              {/* Call to Action Button - Left Aligned */}
              <div className="mt-8 flex justify-start">
                <Button 
                  size="lg"
                  className="px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/services')}
                >
                  Get Custom Website Quote
                </Button>
              </div>
            </div>
          </div>
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
              <li><a onClick={() => setLocation('/template-selection')} className="hover:text-white transition-colors cursor-pointer">View Templates</a></li>
              <li><a onClick={() => setLocation('/custom-websites')} className="hover:text-white transition-colors cursor-pointer">Custom Websites</a></li>
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
