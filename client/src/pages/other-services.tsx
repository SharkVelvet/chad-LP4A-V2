import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import logoDesignImage from "@assets/lp4a-logo-design_1757611811508.jpg";
import printDesignImage from "@assets/lp4a-print-design_1757611869956.jpg";

export default function OtherServices() {
  const [, setLocation] = useLocation();

  // Set page title
  useEffect(() => {
    document.title = 'Other Services - Professional Landing Pages for Insurance Agents';
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

            {/* Get Started Button on Right */}
            <Button 
              className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => setLocation('/template-selection')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Additional Services Section */}
      <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="pt-20 pb-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Other Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Need more than just a website? We offer professional logo design and print materials to complete your brand identity.
            </p>
          </div>
        </div>
      </div>

    {/* Logo Design Section */}
    <div className="py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1050px' }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Logo Design</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your logo is the face of your insurance agency. We create professional, memorable logos that establish trust and make a lasting impression on potential clients.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6458AF' }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Custom & Professional</h3>
                  <p className="text-gray-600">Unique designs tailored to your agency's personality and values</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6458AF' }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Multiple Formats</h3>
                  <p className="text-gray-600">Receive files ready for web, print, and social media use</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6458AF' }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Revision Rounds</h3>
                  <p className="text-gray-600">Work with us until your logo is exactly right</p>
                </div>
              </div>
            </div>

            <Button 
              className="mt-8 px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => setLocation('/services')}
            >
              Request Logo Design
            </Button>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-md mx-auto">
              <img 
                src={logoDesignImage}
                alt="Logo design examples"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-orange-400"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-pink-400"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Print Material Section */}
    <div className="py-16 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1050px' }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-md mx-auto">
              <img 
                src={printDesignImage}
                alt="Print design examples"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-orange-400"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-pink-400"></div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Print Materials</h2>
            <p className="text-lg text-gray-600 mb-8">
              Professional print materials help you make a strong impression at meetings, events, and networking opportunities. From business cards to brochures, we've got you covered.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Cards</h3>
                  <p className="text-gray-600">Stand out with professionally designed cards that clients remember</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Brochures & Flyers</h3>
                  <p className="text-gray-600">Informative materials to explain your services and build trust</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Print-Ready Files</h3>
                  <p className="text-gray-600">High-resolution files ready to send to any printer</p>
                </div>
              </div>
            </div>

            <Button 
              className="mt-8 px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => setLocation('/services')}
            >
              Order Print Materials
            </Button>
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
              Professional landing page templates designed specifically for insurance agents. Build trust, generate leads, and grow your business online.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
        </div>
      </div>
    </footer>

  </div>
  );
}
