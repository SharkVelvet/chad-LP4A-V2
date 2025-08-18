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
    <div className="min-h-screen" style={{ backgroundColor: '#F3F1FF' }}>
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
          backgroundColor: '#F3F1FF'
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

      {/* Animated Template Showcase */}
      <section 
        className="py-8 overflow-hidden" 
        style={{ 
          background: 'linear-gradient(to bottom, #F3F1FF 0%, #ffffff 100%)'
        }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Templates Ready to Launch</h2>
          <p className="text-xl text-gray-600">Choose from many proven designs</p>
        </div>
        
        {/* Full-Width Staggered Template Showcase */}
        <div className="w-full px-4">
          {/* First Row - Overflow Left */}
          <div className="flex mb-6 -ml-20">
            <div className="flex space-x-4">
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/lpfa-pic1_1754365592923.jpg" 
                  alt="Insurance Agent Template 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/lpfa-pic2_1754365592925.jpg" 
                  alt="Insurance Agent Template 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/lpfa-pic3_1754365592924.jpg" 
                  alt="Insurance Agent Template 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/lpfa-pic4_1754365592924.jpg" 
                  alt="Insurance Agent Template 4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/lpfa-pic5_1754365592924.jpg" 
                  alt="Insurance Agent Template 5"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Second Row - Offset Right */}
          <div className="flex mb-6 justify-center">
            <div className="flex space-x-4 ml-32">
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/Corporate-Landing-Page_1754877486249.jpg" 
                  alt="Insurance Agent Template 6"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landing-page-10-10_1754877990321.jpg" 
                  alt="Insurance Agent Template 7"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/lpages-business_1754875856664.jpg" 
                  alt="Insurance Agent Template 8"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/landing-temp7_1754876114698.jpg" 
                  alt="Insurance Agent Template 9"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/temp1-pr.jpg" 
                  alt="Insurance Agent Template 10"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Third Row - Overflow Right */}
          <div className="flex -mr-20">
            <div className="flex space-x-4 justify-end w-full">
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/temp2-pr.jpg" 
                  alt="Insurance Agent Template 11"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/temp3-pr.jpg" 
                  alt="Insurance Agent Template 12"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/temp4-pr.jpg" 
                  alt="Insurance Agent Template 13"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-cameron-snapshot_1751852578360.jpg" 
                  alt="Insurance Agent Template 14"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src="/attached_assets/planright-jenny-snapshot_1751852549427.jpg" 
                  alt="Insurance Agent Template 15"
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
          <div className="rounded-3xl px-12 py-16 text-center relative overflow-hidden" style={{ 
            backgroundColor: '#2D1B69'
          }}>
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 Q200,50 400,100 T800,100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none"/>
                <path d="M0,200 Q150,150 300,200 T600,200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none"/>
                <path d="M200,0 Q400,80 600,40 T800,60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none"/>
                <circle cx="100" cy="80" r="40" fill="rgba(255,255,255,0.04)"/>
                <circle cx="650" cy="300" r="60" fill="rgba(255,255,255,0.03)"/>
                <circle cx="750" cy="100" r="25" fill="rgba(255,255,255,0.05)"/>
              </svg>
            </div>
            <p className="text-lg text-gray-300 mb-4">For Insurance Agents Nationwide</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Landing Pages for <span style={{ color: '#8B7BD8' }}>Insurance Agents</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Are you looking to grow your clients or grow your team?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-clients" 
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 bg-white hover:bg-gray-100 text-gray-900"
              >
                I Want More Clients
              </Link>
              <Link 
                href="/recruit-agents" 
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white transition-all duration-200 transform hover:scale-105 bg-transparent hover:bg-white text-white hover:text-gray-900"
              >
                I Want to Recruit Agents
              </Link>
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