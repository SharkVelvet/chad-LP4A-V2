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
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#f9f7fe' }}>
      {/* Animated Background Layer - Very Light Opacity */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* First Row - Animate Left to Right */}
        <div className="mb-6 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-left">
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/financial-services-products.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/client-testimonials-stats.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/jake-smith-modern-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Second Row - Animate Right to Left */}
        <div className="mb-6 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-right">
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/client-testimonials.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/contact-footer.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/cameron-smith-about.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/contact-us.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/elegant-financial-solutions.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/client-testimonials.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/contact-footer.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Third Row - Animate Left to Right */}
        <div className="overflow-hidden">
          <div className="flex space-x-4 animate-scroll-left">
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/financial-services-products.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/contact-us.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="w-80 h-52 template-card flex-shrink-0">
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Centered Logo at Top */}
            <div 
              className="flex items-center justify-center mb-20 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/internal-one')}
            >
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 mr-2" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-lg sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em', marginTop: '1px' }}>for Agents</div>
              </div>
            </div>
            <Badge className="mb-8 mt-8" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Professional Landing Pages&nbsp;for<br />
              <span style={{ color: '#6458AF' }}>Insurance Agents</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Are you looking to grow your clients or grow your team?
            </p>
            
            {/* Two Choice Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-8">
              <Button 
                size="lg"
                className="w-auto px-8 py-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/get-clients')}
              >
                I Want More Clients
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-auto px-8 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
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
      </div>
    </div>
  );
}