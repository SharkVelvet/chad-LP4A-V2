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
      {/* Hero Section */}
      <section 
        className="pt-8 pb-16 relative"
        style={{ 
          backgroundColor: '#f9f7fe'
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Centered Logo at Top */}
            <div 
              className="flex items-center justify-center mb-20 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/internal-one')}
            >
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 mr-2" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-lg sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            <Badge className="mb-8 mt-8" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Professional Landing Pages for<br />
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
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/agency-hero-homepage.png" 
                  alt="Insurance Agency Hero Homepage - Client-Friendly Financial Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/jake-smith-hero.png" 
                  alt="Jake Smith Insurance Agent - Hero Section with Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/our-services-grid.png" 
                  alt="Insurance Services Grid - Life, Home, Auto, Health, Business"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/financial-services-products.png" 
                  alt="Financial Services & Products Page"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/client-testimonials-stats.png" 
                  alt="Client Testimonials with Statistics - 2500+ Happy Clients"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/jake-smith-modern-hero.png" 
                  alt="Jake Smith Modern Hero Design with Profile Circle"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Repeat for seamless loop */}
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/agency-hero-homepage.png" 
                  alt="Insurance Agency Hero Homepage - Client-Friendly Financial Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/jake-smith-hero.png" 
                  alt="Jake Smith Insurance Agent - Hero Section with Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/our-services-grid.png" 
                  alt="Insurance Services Grid - Life, Home, Auto, Health, Business"
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
                  alt="Client Testimonials Section"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/contact-footer.png" 
                  alt="Contact Footer with Phone, Email & Address"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/cameron-smith-about.png" 
                  alt="Cameron Smith About Section - Professional Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/agency-hero-homepage.png" 
                  alt="Insurance Agency Hero Homepage - Client-Friendly Financial Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/contact-us.png" 
                  alt="Contact Us Page with Address & Phone"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/elegant-financial-solutions.png" 
                  alt="Elegant Financial Solutions with Profile Card"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Repeat for seamless loop */}
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/client-testimonials.png" 
                  alt="Client Testimonials Section"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/contact-footer.png" 
                  alt="Contact Footer with Phone, Email & Address"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/cameron-smith-about.png" 
                  alt="Cameron Smith About Section - Professional Profile"
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
                  alt="Insurance Services Grid - Life, Home, Auto, Health, Business"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/jake-smith-hero.png" 
                  alt="Jake Smith Insurance Agent - Hero Section with Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/client-testimonials-stats.png" 
                  alt="Client Testimonials with Statistics - 2500+ Happy Clients"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/contact-us.png" 
                  alt="Contact Us Page with Address & Phone"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/financial-services-products.png" 
                  alt="Financial Services & Products Page"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Repeat for seamless loop */}
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/our-services-grid.png" 
                  alt="Insurance Services Grid - Life, Home, Auto, Health, Business"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/jake-smith-hero.png" 
                  alt="Jake Smith Insurance Agent - Hero Section with Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-52 template-card flex-shrink-0">
                <img 
                  src="/attached_assets/client-testimonials-stats.png" 
                  alt="Client Testimonials with Statistics - 2500+ Happy Clients"
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