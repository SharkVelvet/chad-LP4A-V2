import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function InternalOne() {
  const [, setLocation] = useLocation();

  // Set page title
  useEffect(() => {
    document.title = 'Professional Landing Pages for Insurance Agents';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/internal-one')}
            >
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 -mt-1" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>


          </div>
        </div>
      </header>



      {/* Hero Section */}
      <section 
        className="py-32 relative"
        style={{ 
          background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)'
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge className="mb-6" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional Landing Pages for<br />
              <span style={{ color: '#6458AF' }}>Insurance Agents</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Are you looking to grow your clients or grow your team?
            </p>
            
            {/* Two Choice Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/get-clients')}
              >
                I Want More Clients
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ 
                  borderColor: '#6458AF', 
                  color: '#6458AF',
                  backgroundColor: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6458AF';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#6458AF';
                }}
                onClick={() => setLocation('/recruit-agents')}
              >
                I Want to Recruit Agents
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>500+</div>
              <div className="text-gray-600">Agents Already Online</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Template Showcase */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Templates Ready to Launch</h2>
          <p className="text-xl text-gray-600">Choose from dozens of proven designs</p>
        </div>
        
        {/* First Row - Left to Right */}
        <div className="relative mb-8">
          <div className="flex animate-scroll-left space-x-6">
            {/* Duplicate the images for seamless loop */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex space-x-6 flex-shrink-0">
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/template1-preview.png" 
                    alt="Insurance Agent Template 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/template2-preview.png" 
                    alt="Insurance Agent Template 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/template3-preview.png" 
                    alt="Insurance Agent Template 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/landingpage-33_1755041273153.png" 
                    alt="Insurance Agent Template 4"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/landingpage-4_1755041417041.png" 
                    alt="Insurance Agent Template 5"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/landingpage-555_1755041908155.png" 
                    alt="Insurance Agent Template 6"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Second Row - Right to Left */}
        <div className="relative">
          <div className="flex animate-scroll-right space-x-6">
            {/* Duplicate the images for seamless loop */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex space-x-6 flex-shrink-0">
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/template4-preview.png" 
                    alt="Insurance Agent Template 7"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/template5-preview.png" 
                    alt="Insurance Agent Template 8"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/template6-preview.png" 
                    alt="Insurance Agent Template 9"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/landingpage-hero7_1755041991785.png" 
                    alt="Insurance Agent Template 10"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/landingpage-hero8_1755042107231.png" 
                    alt="Insurance Agent Template 11"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-40 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/attached_assets/landing-122222_1754880004417.jpg" 
                    alt="Insurance Agent Template 12"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200" style={{ backgroundColor: '#F3F1FF' }}>
        <p className="text-sm text-gray-500">
          Copyright © 2025 Landing Pages for Agents
        </p>
      </div>
    </div>
  );
}