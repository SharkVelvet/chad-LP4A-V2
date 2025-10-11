import { Button } from "@/components/ui/button"
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Globe, Zap, Building2, X } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";
import playAgainImage from "@assets/LPFA-PLAY-AGAIN_1757278384329.png";
import playNowImage from "@assets/LPFA-PLAY-now_1757278621958.png";
import handshakeImage from "@assets/landingpagesforagents-hand-shake_1760211806774.jpg";
import logoDesignImage from "@assets/lp4a-logo-design_1757611811508.jpg";
import printDesignImage from "@assets/lp4a-print-design_1757611869956.jpg";

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

      {/* Hero Section with Gradient Background - Purple edges to white center with subtle orange accent in top right */}
      <div className="relative overflow-hidden" style={{
        background: 'radial-gradient(circle at top right, #ffe5d9 0%, transparent 25%), linear-gradient(90deg, #ede9fe 0%, #ffffff 50%, #ede9fe 100%)',
      }}>

      {/* Main Content - Centered Hero */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full text-center" style={{ maxWidth: '90%' }}>
            {/* Hero Text Content */}
            <Badge className="mb-6 inline-block" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-5xl mx-auto">
              Professional Landing Pages for <span style={{ color: '#6458AF' }}>Insurance Agents</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Are you looking to grow your clients or grow your team? Either way we got you covered!
            </p>
            
            {/* Get Started Button */}
            <div className="flex justify-center mb-12">
              <Button 
                className="px-12 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap rounded-full"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/template-selection')}
              >
                Click Here to get Started!
              </Button>
            </div>

            {/* Video Below - Like Dashboard in Example */}
            <div className="mt-8">
              <div className="relative w-full max-w-6xl mx-auto">
                <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-2xl border-2" style={{ borderColor: '#6458AF' }}>
                  <video
                    ref={videoRef}
                    className="w-full"
                    controls
                    playsInline
                    preload="auto"
                    style={{ display: 'block' }}
                  >
                    <source
                      src="https://www.dropbox.com/scl/fi/oqmtsyntyq3w1x5v30e2m/lp4a-sept26.mp4?rlkey=ur3nwss1sgf81myc46x5ghqbf&st=bfumo3c1&raw=1"
                      type="video/mp4"
                    />
                    <source
                      src="https://dl.dropboxusercontent.com/scl/fi/oqmtsyntyq3w1x5v30e2m/lp4a-sept26.mp4?rlkey=ur3nwss1sgf81myc46x5ghqbf&st=bfumo3c1"
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
                      </div>
                    </div>
                  </video>
                  
                  {/* Play Now Overlay (initial) */}
                  {!hasStartedPlaying && (
                    <div 
                      className="absolute inset-0 cursor-pointer rounded-xl overflow-hidden"
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
                      className="absolute inset-0 cursor-pointer rounded-xl overflow-hidden"
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
            </div>
          </div>
        </div>
      </div>

        {/* Why Professional Webpages Matter & How It Works Section */}
        <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white">
          {/* Why Professional Webpages Matter */}
          <div className="pt-20 pb-8 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Your Professional Webpage Matters</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A professional webpage is essential for insurance agents—not just for selling services to the public, but for establishing trust, transparency, and credibility. It helps you grow your business and attract top agents as you scale your team.
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="py-8 lg:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1050px' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Image */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <img 
                    src={handshakeImage}
                    alt="Professional handshake meeting"
                    className="w-full object-cover max-h-[220px] lg:max-h-none lg:h-[739px]"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-orange-400"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-pink-400"></div>
              </div>

              {/* Right side - Content */}
              <div>
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Build Credibility.<br />
                    Earn Trust.<br />
                    Get Found.
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Your online presence is often your first impression. When clients search your name or scan your business card, they should see a professional, trustworthy landing page that makes them feel confident contacting you.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    LandingPagesForAgents.com gives you a modern, mobile-friendly page that showcases who you are, what you do, and how to reach you — all in one place.
                  </p>
                  <p className="text-lg text-gray-600">
                    From social media links to testimonials, your page builds the trust that helps turn introductions into appointments, and appointments into long-term clients.
                  </p>
                </div>

                {/* Call to Action Button - Left Aligned */}
                <div className="mt-8 flex justify-start">
                  <Button 
                    size="lg"
                    className="px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#6458AF' }}
                    onClick={() => setLocation('/template-selection')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo and Brand Creation Section - Flipped Layout */}
      <div className="bg-white py-20">
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            style={{ maxWidth: '1050px', width: '100%' }}
          >
            {/* Image first for mobile, then ordered second on desktop */}
            <div className="relative lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={logoDesignImage}
                  alt="Logo design and branding materials"
                  className="w-full h-auto object-cover max-h-[220px] lg:max-h-none"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-orange-400"></div>
            </div>

            {/* Content ordered first on desktop */}
            <div className="lg:order-1">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Lead by Example. Attract Talent That Lasts.</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Top producers don't just recruit — they inspire. When every agent on your team has a professional landing page, it sends a message that your agency values excellence, consistency, and success.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  LandingPagesForAgents.com helps you create branded pages for every team member, all aligned with your look, feel, and professionalism.
                </p>
                <p className="text-lg text-gray-600">
                  It's the easiest way to strengthen your recruiting image, retain your best people, and help new agents launch with instant credibility under your brand.
                </p>
              </div>

              {/* Call to Action Button - Left Aligned */}
              <div className="mt-8 flex justify-start">
                <Button 
                  size="lg"
                  className="px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/template-selection')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Design Section */}
      <div className="bg-gray-50 py-20">
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            style={{ maxWidth: '1050px', width: '100%' }}
          >
            {/* Left side - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={printDesignImage}
                  alt="Print design materials and branding"
                  className="w-full h-auto object-cover max-h-[220px] lg:max-h-none"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-orange-400"></div>
            </div>

            {/* Right side - Steps */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Print Design</h2>
                <p className="text-lg text-gray-600">Need professional print materials? We create stunning designs that make you stand out!</p>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Tell us what you need</h3>
                    <p className="text-gray-600 mb-3">
                      From door flyers and mail pieces to business cards, brochures, t-shirt designs, hat designs, and garments - share your print design needs and we'll create something amazing.
                    </p>
                    <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2. We design and perfect</h3>
                    <p className="text-gray-600 mb-3">
                      Our team creates high-quality print designs that match your brand and deliver your message with maximum impact and professionalism.
                    </p>
                    <div className="w-16 h-1 rounded-full bg-orange-400"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Ready to print and impress</h3>
                    <p className="text-gray-600 mb-3">
                      Receive print-ready files optimized for professional printing, ensuring your materials look crisp and impressive every time.
                    </p>
                    <div className="w-16 h-1 rounded-full bg-pink-400"></div>
                  </div>
                </div>

                {/* Call to Action Button - Left Aligned */}
                <div className="mt-8 flex justify-start">
                  <Button 
                    size="lg"
                    className="px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#6458AF' }}
                    onClick={() => setLocation('/services')}
                  >
                    Get Print Design Quote
                  </Button>
                </div>
              </div>
            </div>
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