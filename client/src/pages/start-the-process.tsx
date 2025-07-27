import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function StartTheProcess() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/template-selection");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FileText className="h-10 w-10 mr-3" style={{ color: '#22252f' }} />
              <div className="text-left">
                <div className="text-2xl font-bold leading-none" style={{ color: '#22252f' }}>Landing Pages</div>
                <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main Explanation Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Landing Pages for Insurance Agents
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Create your professional landing page in just a few simple steps
          </p>
          <p className="text-lg font-semibold mb-8 max-w-4xl mx-auto" style={{ color: '#22252f' }}>
            "Have a professional webpage and start generating leads by the end of the day!"
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Process Steps */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#22252f' }}>
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Choose Your Template</h3>
                    <p className="text-gray-600">Pick one of 6 professionally designed templates built specifically for Insurance Agents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#22252f' }}>
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Select Your Domain</h3>
                    <p className="text-gray-600">Choose your preferred domain name (URL address) for your website - We take care of this for you</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#22252f' }}>
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Go Live</h3>
                    <p className="text-gray-600">We'll work with you to get your content updated to your specific needs and have your page live quickly</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Get Started Card */}
          <div className="lg:sticky lg:top-8">
            <Card style={{ backgroundColor: '#22252f', borderColor: '#22252f' }}>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-white">
                  Ready to Get Started?
                </CardTitle>
                <p className="text-purple-100 mt-2">Begin building your professional website now. It only takes a few minutes to have your landing page ready!</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <Button 
                      onClick={handleGetStarted}
                      className="px-8 py-3 bg-white hover:bg-gray-100 font-semibold rounded-lg w-full" 
                      style={{ color: '#22252f' }}
                      size="lg"
                    >
                      Get Started Now
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-100 text-sm">
                      No setup required • Start immediately
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            

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
                <FileText className="h-10 w-10 mr-3" style={{ color: '#22252f' }} />
                <div className="text-left">
                  <div className="text-2xl font-bold leading-none" style={{ color: '#22252f' }}>Landing Pages</div>
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