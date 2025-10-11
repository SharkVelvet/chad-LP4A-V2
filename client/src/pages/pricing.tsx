import { Button } from "@/components/ui/button"
import { FileText, Check } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Pricing() {
  const [, setLocation] = useLocation();

  // Set page title
  useEffect(() => {
    document.title = 'Pricing - Professional Landing Pages for Insurance Agents';
  }, []);

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

      {/* Pricing Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose your right plan!</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from best plans, ensuring a perfect match. Need more or less?<br />
              Customize your subscription for a seamless fit!
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Templates Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white mb-6" style={{ backgroundColor: '#6458AF' }}>
                Templates
              </div>
              <p className="text-gray-600 mb-8">
                Ideal for agents ready to inspire trust — whether clients are shopping for coverage or recruits are exploring your team, your page should make them feel confident in who you are.
              </p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">$18</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">3-5 day turnaround</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free domain name</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free hosting</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free business email</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free support</span>
                </div>
              </div>
              <Button 
                className="w-full py-3 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-full font-medium"
                onClick={() => setLocation('/template-selection')}
              >
                Get started
              </Button>
            </div>

            {/* Custom Site Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white mb-6" style={{ backgroundColor: '#6458AF' }}>
                Custom Site
              </div>
              <p className="text-gray-600 mb-8">
                Ideal for agents expanding their reach and reputation. If you're looking to attract top recruits or impress higher-value clients, a custom-built site helps you stand apart — giving your agency a professional edge that builds instant trust.
              </p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">$2500</span>
                <span className="text-gray-600"> starting at</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Completed from Design to Development</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Live within 4 - 6 Weeks</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Complete Custom Design</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Complete CMS Integration</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Google Analytics Integration</span>
                </div>
              </div>
              <Button 
                className="w-full py-3 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-full font-medium"
                onClick={() => setLocation('/services')}
              >
                Get started
              </Button>
            </div>

            {/* Other Services Plan */}
            <div className="rounded-3xl p-8 shadow-sm" style={{ backgroundColor: '#E5E1F5' }}>
              <div className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white mb-6" style={{ backgroundColor: '#6458AF' }}>
                Other Services
              </div>
              <p className="text-gray-700 mb-8">
                We've spent more than 15 years helping clients stand out—online and off. From digital strategy to print, branding, and creative campaigns, we provide everything you need under one roof to keep your marketing simple and effective.
              </p>
              <div className="mb-8">
                <h2 className="text-5xl font-bold text-gray-900">Yes, we can...</h2>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Print Design</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Print Advertising</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Paid Digital Advertising</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Apparel Design</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email Campaigns</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Marketing Strategy</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Branding</span>
                </div>
              </div>
              <Button 
                className="w-full py-3 text-white hover:opacity-90 rounded-full font-medium"
                style={{ backgroundColor: '#2D3748' }}
                onClick={() => setLocation('/services')}
              >
                Book a Call
              </Button>
            </div>
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
