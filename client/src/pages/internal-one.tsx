import { Button } from "@/components/ui/button"
import { Link } from "wouter";
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
    <div className="min-h-screen" style={{ backgroundColor: '#f9f7fe' }}>
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
          backgroundColor: '#f9f7fe'
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
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/get-clients')}
              >
                I Want More Clients
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
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

      {/* Animated Template Showcase */}
      <section 
        className="pt-4 pb-8 overflow-hidden" 
        style={{ 
          background: 'linear-gradient(to bottom, #f9f7fe 0%, #ffffff 100%)'
        }}
      >

        
        {/* Animated Template Showcase */}
        <div className="w-full">
          {/* First Row - Animate Left to Right */}
          <div className="mb-6 overflow-hidden">
            <div className="flex space-x-4 animate-scroll-left">
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-cameron-snapshot_1751852578360.jpg" 
                  alt="Cameron Smith Insurance Agent Website - Professional Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-jenny-snapshot_1751852549427.jpg" 
                  alt="Jenny Smith Insurance Agent Website - Elegant Financial Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landing-122222_1754880004417.jpg" 
                  alt="Cameron Smith Insurance Website - Corporate Professional Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-33_1755041273153.png" 
                  alt="Professional Insurance Agent Website - Modern Dark Theme"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-template5-snapshot_1751853110220.png" 
                  alt="Insurance Agent Website Template - Clean Professional Layout"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Repeat for seamless loop */}
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-cameron-snapshot_1751852578360.jpg" 
                  alt="Cameron Smith Insurance Agent Website - Professional Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-jenny-snapshot_1751852549427.jpg" 
                  alt="Jenny Smith Insurance Agent Website - Elegant Financial Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landing-122222_1754880004417.jpg" 
                  alt="Cameron Smith Insurance Website - Corporate Professional Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Second Row - Animate Right to Left */}
          <div className="mb-6 overflow-hidden">
            <div className="flex space-x-4 animate-scroll-right">
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-4_1755041417041.png" 
                  alt="Insurance Agent Website - Modern Professional Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-555_1755041908155.png" 
                  alt="Insurance Agent Website - Executive Business Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-hero7_1755041991785.png" 
                  alt="Insurance Agent Website - Hero Section Focus"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-hero8_1755042107231.png" 
                  alt="Insurance Agent Website - Professional Hero Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-w2_1751850806336.jpg" 
                  alt="Insurance Agent Website - Clean Layout Template"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Repeat for seamless loop */}
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-4_1755041417041.png" 
                  alt="Insurance Agent Website - Modern Professional Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-555_1755041908155.png" 
                  alt="Insurance Agent Website - Executive Business Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landingpage-hero7_1755041991785.png" 
                  alt="Insurance Agent Website - Hero Section Focus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Third Row - Animate Left to Right */}
          <div className="overflow-hidden">
            <div className="flex space-x-4 animate-scroll-left">
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-w4_1751851299514.jpg" 
                  alt="Insurance Agent Website - Professional Service Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-park-back_1751851568156.jpg" 
                  alt="Insurance Agent Website - Outdoor Professional Theme"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-selections_1749604396687.jpg" 
                  alt="Insurance Agent Website - Service Selection Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/template1-preview.png" 
                  alt="Insurance Agent Website Template - Classic Professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/template2-preview.png" 
                  alt="Insurance Agent Website Template - Modern Professional"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Repeat for seamless loop */}
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-w4_1751851299514.jpg" 
                  alt="Insurance Agent Website - Professional Service Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-park-back_1751851568156.jpg" 
                  alt="Insurance Agent Website - Outdoor Professional Theme"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-selections_1749604396687.jpg" 
                  alt="Insurance Agent Website - Service Selection Template"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Reiterated Hero */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl px-12 py-16 text-center" style={{ 
            backgroundColor: '#2D1B69'
          }}>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Landing Pages for <span style={{ color: '#8B7BD8' }}>Insurance Agents</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Are you looking to grow your clients or grow your team?
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold bg-white hover:bg-gray-100 text-gray-900"
                onClick={() => setLocation('/get-clients')}
              >
                I Want More Clients
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold border border-white bg-transparent hover:bg-white text-white hover:text-gray-900"
                onClick={() => setLocation('/recruit-agents')}
              >
                I Want to Recruit Agents
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-8 bg-white">
        <p className="text-sm text-gray-500">
          Copyright © 2025 Landing Pages for Agents
        </p>
      </div>
    </div>
  );
}