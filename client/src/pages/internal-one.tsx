import { Button } from "@/components/ui/button"
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Globe, Zap, Building2, X, Menu, QrCode, MessageSquare, Users } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";
import playAgainImage from "@assets/LPFA-PLAY-AGAIN_1757278384329.png";
import playNowImage from "@assets/LPFA-PLAY-now_1757278621958.png";
import handshakeImage from "@assets/landingpagesforagents-hand-shake_1760211806774.jpg";
import logoDesignImage from "@assets/lp4a-logo-design_1757611811508.jpg";
import printDesignImage from "@assets/lp4a-print-design_1757611869956.jpg";
import leadershipTeamImage from "@assets/landingpagesforagents-leaders_1760213764577.jpg";
import gridExampleImage from "@assets/scroll1_1760272781662.png";
import gridExampleImage2 from "@assets/scroll2_1760273238786.png";
import gridExampleImage3 from "@assets/scroll3_1760273349134.png";
import gridExampleImage4 from "@assets/scroll4_1760273592823.png";
import gridExampleImage5 from "@assets/scroll5_1760273718259.png";
import gridExampleImage6 from "@assets/scroll6_1760273898739.png";
import gridExampleImage7 from "@assets/scroll7_1760274006088.png";

export default function InternalOne() {
  const [, setLocation] = useLocation();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showReplayOverlay, setShowReplayOverlay] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
              <a onClick={() => setLocation('/choose-purpose')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">View Templates</a>
              <a onClick={() => setLocation('/custom-websites')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Pages</a>
              <a onClick={() => setLocation('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
              <a onClick={() => setLocation('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
            </nav>

            {/* Login / Signup Button on Desktop, Hamburger on Mobile */}
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:flex items-center px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/auth')}
              >
                Login / Signup
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Slide-out Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-xl font-bold" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600 mt-0.5" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-6 space-y-6">
              <a 
                href="/choose-purpose" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/choose-purpose');
                }}
              >
                View Templates
              </a>
              <a 
                href="/custom-websites" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/custom-websites');
                }}
              >
                Custom Pages
              </a>
              <a 
                href="/other-services" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/other-services');
                }}
              >
                Other Services
              </a>
              <a 
                href="/pricing" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/pricing');
                }}
              >
                Pricing
              </a>
              
              <div className="pt-6 border-t border-gray-200">
                <Button 
                  className="w-full px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setLocation('/auth');
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
        </div>
      </>

      {/* Hero Section with Gradient Background - Purple edges to white center with subtle orange accent in top right */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(90deg, #ede9fe 0%, #ffffff 50%, #ede9fe 100%)',
      }}>
      {/* Orange accent - hidden on mobile, shown on desktop */}
      <div className="hidden md:block absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at top right, #ffe5d9 0%, transparent 25%)',
      }}></div>

      {/* Main Content - Centered Hero */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full text-center" style={{ maxWidth: '90%' }}>
            {/* Hero Text Content */}
            <Badge className="mb-6 inline-block" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-5xl mx-auto">
              Professional Landing Pages for<br /><span style={{ color: '#6458AF' }}>Insurance Agents</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Are you looking to grow your clients or grow your team?<br />
              Either way we got you covered!
            </p>
            
            {/* Get Started Button */}
            <div className="flex justify-center mb-12">
              <Button 
                className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap rounded-full"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/auth')}
              >
                Click Here to get Started!
              </Button>
            </div>

            {/* Video Below - Like Dashboard in Example */}
            <div className="mt-8">
              <div className="relative w-full max-w-6xl mx-auto">
                {/* Aspect ratio container to prevent layout shift */}
                <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16 / 9' }}>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full"
                    controls
                    playsInline
                    preload="metadata"
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

      {/* Pricing Banner - Bold & Elegant */}
      <div className="relative z-10 py-12" style={{ backgroundColor: '#6458AF' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Lora, serif' }}>
            Start building your online presence and brand for just <span className="text-yellow-300">$18 a month</span>
          </p>
          <Button 
            className="px-8 py-3 text-sm font-medium hover:opacity-90 transition-opacity rounded-full"
            style={{ backgroundColor: 'white', color: '#6458AF' }}
            onClick={() => setLocation('/choose-purpose')}
          >
            Get Started
          </Button>
        </div>
      </div>

        {/* Why Professional Webpages Matter & How It Works Section */}
        <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white">
          {/* Why Professional Webpages Matter */}
          <div className="pt-20 pb-4 lg:pt-20 lg:pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Your Professional Webpage Matters</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A professional webpage is essential for insurance agents—not just for selling services to the public, but for establishing trust, transparency, and credibility. It helps you grow your business and attract top agents as you scale your team.
              </p>
            </div>
          </div>

          {/* How to Use Your Landing Page Section */}
          <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left side - Content */}
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    How to Use Your Landing Page
                  </h2>
                  <p className="text-lg text-gray-600 mb-10">
                    Simple, shareable, and built to convert — place your page wherever people meet you.
                  </p>

                  {/* Features List */}
                  <div className="space-y-8">
                    {/* Business cards & QR codes */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6458AF' }}>
                          <QrCode className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Business cards & QR codes</h3>
                        <p className="text-gray-600">
                          Add a short URL or QR to printed materials — prospects land on your page and can call or book instantly.
                        </p>
                      </div>
                    </div>

                    {/* Social posts & ads */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6458AF' }}>
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Social posts & ads</h3>
                        <p className="text-gray-600">
                          Use one link in bio or send ad traffic to a page that answers questions and captures leads.
                        </p>
                      </div>
                    </div>

                    {/* Recruiting & follow-up */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6458AF' }}>
                          <Users className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Recruiting & follow-up</h3>
                        <p className="text-gray-600">
                          Share branded pages with recruits or after meetings so they see your team and book next steps with confidence.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action Button */}
                  <div className="mt-10">
                    <Button 
                      className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                      style={{ backgroundColor: '#6458AF' }}
                      onClick={() => setLocation('/choose-purpose')}
                    >
                      Start your page — $18/mo
                    </Button>
                  </div>
                </div>

                {/* Right side - Image placeholder */}
                <div className="relative">
                  <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-xl aspect-[4/3] flex items-center justify-center">
                    <p className="text-gray-500 text-lg">Preview thumbnail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="py-6 lg:py-12">
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
                    className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                    style={{ backgroundColor: '#6458AF' }}
                    onClick={() => setLocation('/choose-purpose')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Grid Section - Staggered Layout */}
      <div className="bg-gray-50 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Row 1 - Normal alignment */}
          <div className="flex gap-8 mb-8 px-4">
            {[gridExampleImage, gridExampleImage2, gridExampleImage3, gridExampleImage4, gridExampleImage5].map((img, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 w-[350px] rounded-xl overflow-hidden">
                <img 
                  src={img} 
                  alt={`Grid item row 1 - ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Row 2 - Offset to the left */}
          <div className="flex gap-8 mb-8" style={{ marginLeft: '-100px' }}>
            {[gridExampleImage6, gridExampleImage7, gridExampleImage, gridExampleImage2, gridExampleImage3].map((img, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 w-[350px] rounded-xl overflow-hidden">
                <img 
                  src={img} 
                  alt={`Grid item row 2 - ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Row 3 - Different offset */}
          <div className="flex gap-8 px-4">
            {[gridExampleImage4, gridExampleImage5, gridExampleImage6, gridExampleImage7, gridExampleImage].map((img, index) => (
              <div key={`row3-${index}`} className="flex-shrink-0 w-[350px] rounded-xl overflow-hidden">
                <img 
                  src={img} 
                  alt={`Grid item row 3 - ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
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
                  src={leadershipTeamImage}
                  alt="Professional team leadership meeting"
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
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Lead by Example.<br />
                  Attract Talent That Lasts.
                </h2>
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
                  className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/choose-purpose')}
                >
                  Get Started
                </Button>
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
                Professional landing page templates designed specifically for insurance agents. <strong>Build trust, generate leads, and grow your business online.</strong>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About LP4A</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/choose-purpose')} className="hover:text-white transition-colors cursor-pointer">View Templates</a></li>
                <li><a onClick={() => setLocation('/custom-websites')} className="hover:text-white transition-colors cursor-pointer">Custom Pages</a></li>
                <li><a onClick={() => setLocation('/other-services')} className="hover:text-white transition-colors cursor-pointer">Other Services</a></li>
                <li><a onClick={() => setLocation('/pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
                <li><a onClick={() => setLocation('/blog')} className="hover:text-white transition-colors cursor-pointer">Our Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
                <li><a onClick={() => setLocation('/terms-of-service')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
            <p className="text-sm mt-2 opacity-30">Landing Pages for Agents is Owned and Operated by 1612 Media, LLC</p>
          </div>
        </div>
      </footer>

    </div>
    </div>
  );
}