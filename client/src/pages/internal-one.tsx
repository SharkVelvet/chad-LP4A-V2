import { Button } from "@/components/ui/button"
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Globe, Zap, Building2, X } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function InternalOne() {
  const [, setLocation] = useLocation();
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Set page title and show video modal on load
  useEffect(() => {
    document.title = 'Professional Landing Pages for Insurance Agents';
    // Show video modal after a short delay
    const timer = setTimeout(() => {
      setShowVideoModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ backgroundColor: '#f9f7fe' }}>
      {/* Animated Background Layer - Very Light Opacity */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* First Row - Animate Left to Right */}
        <div className="mb-2 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-left">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/financial-services-products.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/client-testimonials-stats.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-modern-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Second Row - Animate Right to Left */}
        <div className="mb-2 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-right">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/client-testimonials.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-footer.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/cameron-smith-about.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-us.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/elegant-financial-solutions.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/client-testimonials.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-footer.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Third Row - Animate Left to Right */}
        <div className="mb-2 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-left">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/financial-services-products.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-us.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Fourth Row - Animate Right to Left */}
        <div className="overflow-hidden">
          <div className="flex space-x-4 animate-scroll-right">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/cameron-smith-about.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/elegant-financial-solutions.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-modern-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/cameron-smith-about.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo at Top */}
      <div className="relative z-10 pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Centered Logo at Top */}
            <div 
              className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/')}
            >
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 mr-2" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-lg sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em', marginTop: '-3px' }}>for Agents</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Centered */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-8" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-8">
                Professional Landing Pages&nbsp;for<br />
                <span style={{ color: '#6458AF' }}>Insurance Agents</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Are you looking to grow your clients or grow your team?
              </p>
              
              {/* Two Choice Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-24">
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
        
        {/* Custom Solutions Section */}
        <div className="relative z-10 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-gray-600 max-w-2xl mx-auto">
                Need something beyond our templates? We create Custom Websites, Custom Logos, Print Material, and specialized solutions for Agents.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Custom Websites */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-3">
                  <Globe className="w-6 h-6" style={{ color: '#6458AF' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ color: '#6458AF' }}>
                  Custom Websites
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Fully custom designs built from scratch with your exact specifications and branding requirements.
                </p>
                <Button 
                  size="sm"
                  className="text-xs font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/services')}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Logo Design */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-3">
                  <Zap className="w-6 h-6" style={{ color: '#6458AF' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ color: '#6458AF' }}>
                  Logo Design
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Professional logo design services to create a memorable brand identity that represents your business.
                </p>
                <Button 
                  size="sm"
                  className="text-xs font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/services')}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Print Design */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-3">
                  <Building2 className="w-6 h-6" style={{ color: '#6458AF' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ color: '#6458AF' }}>
                  Print Design
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Business cards, brochures, flyers, and other marketing materials designed to promote your services.
                </p>
                <Button 
                  size="sm"
                  className="text-xs font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/services')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-none w-[65vw] h-[65vh] p-0 bg-black">
          <DialogHeader className="sr-only">
            <DialogTitle>Landing Pages Demo Video</DialogTitle>
            <DialogDescription>A demonstration video showing our professional landing page templates and services</DialogDescription>
          </DialogHeader>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowVideoModal(false)}
            className="absolute top-2 right-2 z-10 text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            style={{ maxHeight: '65vh', maxWidth: '65vw' }}
          >
            <source
              src="https://www.dropbox.com/scl/fi/94619w9ro7ts2xqpumd4h/Landing-pages-video.mov?rlkey=1skq95sks7ipe2u2fubxbd4ny&st=j2l0y9q8&raw=1"
              type="video/quicktime"
            />
            <source
              src="https://www.dropbox.com/scl/fi/94619w9ro7ts2xqpumd4h/Landing-pages-video.mov?rlkey=1skq95sks7ipe2u2fubxbd4ny&st=j2l0y9q8&dl=1"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
}