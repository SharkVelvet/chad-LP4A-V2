import { Button } from "@/components/ui/button"
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Globe, Zap, Building2, X } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";
import playAgainImage from "@assets/LPFA-PLAY-AGAIN_1757278384329.png";
import playNowImage from "@assets/LPFA-PLAY-now_1757278621958.png";

export default function InternalOne() {
  const [, setLocation] = useLocation();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showReplayOverlay, setShowReplayOverlay] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set page title
  useEffect(() => {
    document.title = 'Professional Landing Pages for Insurance Agents';
  }, []);

  // Handle video ended event
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnded = () => {
        setShowReplayOverlay(true);
      };
      
      const handleVideoPlay = () => {
        setShowReplayOverlay(false);
        setHasStartedPlaying(true);
      };

      video.addEventListener('ended', handleVideoEnded);
      video.addEventListener('play', handleVideoPlay);

      return () => {
        video.removeEventListener('ended', handleVideoEnded);
        video.removeEventListener('play', handleVideoPlay);
      };
    }
  }, []);

  const handleReplayClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowReplayOverlay(false);
    }
  };

  const handlePlayNowClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasStartedPlaying(true);
    }
  };

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
      <div className="relative z-10 pt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
                Professional Landing Pages <span className="text-gray-600">(and more)</span>&nbsp;for<br />
                <span style={{ color: '#6458AF' }}>Insurance Agents</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Are you looking to grow your clients or grow your team?
              </p>
              
              {/* Demo Video */}
              <div className="my-12 max-w-5xl mx-auto">
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border-2 relative w-full" style={{ aspectRatio: '16/9', borderColor: '#6458AF', minHeight: '400px', height: 'auto' }}>
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls
                    playsInline
                    preload="auto"
                    style={{ backgroundColor: '#000000' }}
                  >
                    <source
                      src="https://www.dropbox.com/scl/fi/gv717hc1z93klycijpazs/landing-pages-homev2.mp4?rlkey=2lyeynk2h9wbc54rgrl80xl23&st=zq9i1u2t&dl=1"
                      type="video/mp4"
                    />
                    <source
                      src="https://dl.dropboxusercontent.com/scl/fi/gv717hc1z93klycijpazs/landing-pages-homev2.mp4?rlkey=2lyeynk2h9wbc54rgrl80xl23&st=zq9i1u2t"
                      type="video/mp4"
                    />
                    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-600">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-lg font-medium">Demo Video</p>
                        <p className="text-sm text-gray-500 mt-2">See how professional recruiting pages work</p>
                        <p className="text-xs text-gray-400 mt-2">If you can hear audio but no video, your browser may not support MOV format.</p>
                      </div>
                    </div>
                  </video>
                  
                  {/* Play Now Overlay (initial) */}
                  {!hasStartedPlaying && (
                    <div 
                      className="absolute inset-0 cursor-pointer rounded-lg overflow-hidden"
                      onClick={handlePlayNowClick}
                    >
                      <img 
                        src={playNowImage} 
                        alt="Click to play video"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Replay Overlay (after video ends) */}
                  {hasStartedPlaying && showReplayOverlay && (
                    <div 
                      className="absolute inset-0 cursor-pointer rounded-lg overflow-hidden"
                      onClick={handleReplayClick}
                    >
                      <img 
                        src={playAgainImage} 
                        alt="Click to play again"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              
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

    </div>
  );
}