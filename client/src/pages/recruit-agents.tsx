import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Globe, TrendingUp, Shield, Clock, Zap, FileText, Menu, X, MessageCircle, Eye, UserCheck, Building, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function RecruitAgents() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Recruit Top Agents - Professional Landing Pages for Insurance Agencies';
  }, []);

  const handleStartProcess = () => {
    setLocation("/start-the-process");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/')}
            >
              <FileText className="h-9 w-9 sm:h-10 sm:w-10 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-2xl sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-sm sm:text-sm font-medium text-gray-600 mt-0.5 sm:-mt-1" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <div className="relative">
                <a 
                  href="/get-clients" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/get-clients');
                  }}
                >
                  Get Clients
                </a>
              </div>
              <div className="relative">
                <a 
                  href="/recruit-agents" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  style={{ color: '#6458AF' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6458AF'}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/recruit-agents');
                  }}
                >
                  Recruit Agents
                </a>
                <div 
                  className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200"
                  style={{ backgroundColor: '#6458AF' }}
                />
              </div>
              <div className="relative">
                <a 
                  href="#features" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
              </div>
              <div className="relative">
                <a 
                  href="#pricing" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Pricing
                </a>
              </div>
              <div className="relative">
                <a 
                  href="/blog" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/blog');
                  }}
                >
                  Blog
                </a>
              </div>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block hover:opacity-90 w-52"
                style={{ backgroundColor: '#6458AF' }} 
                onClick={handleStartProcess}
              >
                Start My Recruiting Page
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                <FileText className="h-8 w-8 mr-2" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600 mt-0.5" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-6 space-y-6">
              <a 
                href="/get-clients"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/get-clients');
                }}
              >
                Get Clients
              </a>
              <a 
                href="/recruit-agents"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/recruit-agents');
                }}
              >
                Recruit Agents
              </a>
              <a 
                href="#features"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
              <a 
                href="#pricing"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </a>
              <a 
                href="/blog"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/blog');
                }}
              >
                Blog
              </a>
              
              <div className="pt-6 border-t border-gray-200">
                <Button 
                  className="w-full text-white py-3 hover:opacity-90"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleStartProcess();
                  }}
                >
                  Start My Recruiting Page
                </Button>
              </div>
            </nav>
        </div>
      </>

      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Agency Owners</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Recruit Top Agents With a Professional<br />
              <span style={{ color: '#6458AF' }}>Agency Website</span>
            </h1>
            
            {/* Demo Video */}
            <div className="my-12 max-w-5xl mx-auto">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border-2" style={{ aspectRatio: '16/9', borderColor: '#6458AF' }}>
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  muted
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
              </div>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Strong brands attract strong talent. Launch a professional recruiting site that builds trust and helps you grow your team.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                style={{ backgroundColor: '#6458AF' }} 
                className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
                onClick={handleStartProcess}
              >
                👉 Start My Recruiting Page
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>500+</div>
              <div className="text-gray-600">Agencies and Agents Online</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>70%</div>
              <div className="text-gray-600">Of Agents Are Passive Talent</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>76%</div>
              <div className="text-gray-600">Research Your Reputation Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Agency Owners Need a Recruiting Page
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional recruiting pages that attract top talent, built specifically for insurance agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-left h-full">
              <CardHeader>
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <svg width="200" height="150" viewBox="0 0 200 150" className="w-full h-full object-cover">
                    <defs>
                      <linearGradient id="standOutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6458AF" stopOpacity="0.1"/>
                        <stop offset="100%" stopColor="#6458AF" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                    {/* Professional office scene */}
                    <rect width="200" height="150" fill="url(#standOutGrad)"/>
                    <rect x="10" y="120" width="180" height="30" fill="#f8f9fa" rx="2"/>
                    <rect x="20" y="40" width="160" height="80" fill="#ffffff" rx="8" stroke="#6458AF" strokeWidth="2"/>
                    <circle cx="60" cy="65" r="15" fill="#6458AF"/>
                    <rect x="80" y="55" width="60" height="8" fill="#e9ecef" rx="4"/>
                    <rect x="80" y="68" width="80" height="6" fill="#dee2e6" rx="3"/>
                    <rect x="80" y="78" width="40" height="6" fill="#dee2e6" rx="3"/>
                    <rect x="25" y="95" width="15" height="15" fill="#28a745" rx="2"/>
                    <rect x="45" y="95" width="15" height="15" fill="#28a745" rx="2"/>
                    <rect x="65" y="95" width="15" height="15" fill="#28a745" rx="2"/>
                    <rect x="85" y="95" width="15" height="15" fill="#ffc107" rx="2"/>
                    <rect x="105" y="95" width="15" height="15" fill="#ffc107" rx="2"/>
                    <polygon points="155,45 165,55 155,65" fill="#6458AF"/>
                    <text x="100" y="25" textAnchor="middle" fontSize="12" fill="#6458AF" fontWeight="bold">Top Performer Spotlight</text>
                  </svg>
                </div>
                <CardTitle className="text-xl mb-3">Stand Out to Elite Talent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 font-medium">Why settle for average when you can attract top 10% performers?</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li style={{ fontSize: '15px' }}>• Showcase your agency's success stories and growth trajectory</li>
                  <li style={{ fontSize: '15px' }}>• Highlight unique company culture and professional development opportunities</li>
                  <li style={{ fontSize: '15px' }}>• Display commission structures, bonuses, and career advancement paths</li>
                  <li style={{ fontSize: '15px' }}>• Feature testimonials from your current high-performing agents</li>
                  <li style={{ fontSize: '15px' }}>• Demonstrate your agency's market leadership and reputation</li>
                </ul>
                <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                  <p className="text-sm text-purple-800 font-medium">Elite agents research extensively before making career moves. Give them compelling reasons to choose your agency.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-left h-full">
              <CardHeader>
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                  <svg width="200" height="150" viewBox="0 0 200 150" className="w-full h-full object-cover">
                    <defs>
                      <linearGradient id="trustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#28a745" stopOpacity="0.1"/>
                        <stop offset="100%" stopColor="#6458AF" stopOpacity="0.2"/>
                      </linearGradient>
                    </defs>
                    <rect width="200" height="150" fill="url(#trustGrad)"/>
                    {/* Professional building/office */}
                    <rect x="40" y="30" width="120" height="90" fill="#ffffff" stroke="#6458AF" strokeWidth="2" rx="4"/>
                    <rect x="50" y="40" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="80" y="40" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="110" y="40" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="140" y="40" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="50" y="75" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="80" y="75" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="110" y="75" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="140" y="75" width="20" height="25" fill="#e9ecef" stroke="#dee2e6"/>
                    <rect x="85" y="105" width="30" height="15" fill="#6458AF" rx="2"/>
                    {/* Stars for rating */}
                    <polygon points="25,20 27,14 29,20 35,20 30,24 32,30 27,26 22,30 24,24 19,20" fill="#ffc107"/>
                    <polygon points="35,25 37,19 39,25 45,25 40,29 42,35 37,31 32,35 34,29 29,25" fill="#ffc107"/>
                    <polygon points="45,15 47,9 49,15 55,15 50,19 52,25 47,21 42,25 44,19 39,15" fill="#ffc107"/>
                    <text x="100" y="135" textAnchor="middle" fontSize="10" fill="#6458AF" fontWeight="bold">Licensed & Established</text>
                  </svg>
                </div>
                <CardTitle className="text-xl mb-3">Instant Credibility & Trust</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 font-medium">Professional presentation builds immediate confidence with potential recruits.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li style={{ fontSize: '15px' }}>• Display licensing, certifications, and industry affiliations prominently</li>
                  <li style={{ fontSize: '15px' }}>• Showcase awards, recognition, and years in business</li>
                  <li style={{ fontSize: '15px' }}>• Include professional headshots of leadership team</li>
                  <li style={{ fontSize: '15px' }}>• Feature partnerships with major insurance carriers</li>
                  <li style={{ fontSize: '15px' }}>• Display client testimonials and agent success metrics</li>
                </ul>
                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm text-green-800 font-medium">First impressions matter. A professional website immediately separates you from agencies that rely only on social media or job board listings.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-left h-full">
              <CardHeader>
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                  <svg width="200" height="150" viewBox="0 0 200 150" className="w-full h-full object-cover">
                    <defs>
                      <linearGradient id="complianceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fd7e14" stopOpacity="0.1"/>
                        <stop offset="100%" stopColor="#dc3545" stopOpacity="0.2"/>
                      </linearGradient>
                    </defs>
                    <rect width="200" height="150" fill="url(#complianceGrad)"/>
                    {/* Job board requirements illustration */}
                    <rect x="20" y="20" width="160" height="110" fill="#ffffff" stroke="#dc3545" strokeWidth="2" rx="8"/>
                    <rect x="30" y="30" width="140" height="20" fill="#dc3545" rx="4"/>
                    <text x="100" y="43" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">JOB BOARD REQUIREMENTS</text>
                    <rect x="30" y="60" width="20" height="15" fill="#28a745" rx="2"/>
                    <text x="55" y="70" fontSize="9" fill="#333">✓ Business Website</text>
                    <rect x="30" y="80" width="20" height="15" fill="#28a745" rx="2"/>
                    <text x="55" y="90" fontSize="9" fill="#333">✓ Professional Email</text>
                    <rect x="30" y="100" width="20" height="15" fill="#ffc107" rx="2"/>
                    <text x="55" y="110" fontSize="9" fill="#333">⚠ Social Media Only</text>
                    <rect x="130" y="60" width="40" height="25" fill="#e9ecef" stroke="#6458AF" rx="4"/>
                    <text x="150" y="75" textAnchor="middle" fontSize="8" fill="#6458AF">APPROVED</text>
                    <circle cx="170" cy="40" r="8" fill="#28a745"/>
                    <text x="170" y="45" textAnchor="middle" fontSize="10" fill="white">✓</text>
                  </svg>
                </div>
                <CardTitle className="text-xl mb-3">Job Board Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 font-medium">Most premium job boards require a professional business website and email address.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li style={{ fontSize: '15px' }}>• Indeed, LinkedIn, and ZipRecruiter verify business legitimacy</li>
                  <li style={{ fontSize: '15px' }}>• Professional email domains (not Gmail/Yahoo) required for posting</li>
                  <li style={{ fontSize: '15px' }}>• Business website validates your agency's credibility</li>
                  <li style={{ fontSize: '15px' }}>• Compliance unlocks access to higher-quality candidate pools</li>
                  <li style={{ fontSize: '15px' }}>• Avoid having job posts rejected or flagged as spam</li>
                </ul>
                <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                  <p className="text-sm text-orange-800 font-medium">Without a professional website, you're limited to lower-tier job boards that attract less qualified candidates.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-left h-full">
              <CardHeader>
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                  <svg width="200" height="150" viewBox="0 0 200 150" className="w-full h-full object-cover">
                    <defs>
                      <linearGradient id="attractGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6f42c1" stopOpacity="0.1"/>
                        <stop offset="100%" stopColor="#e83e8c" stopOpacity="0.2"/>
                      </linearGradient>
                    </defs>
                    <rect width="200" height="150" fill="url(#attractGrad)"/>
                    {/* Professional vs unprofessional comparison */}
                    <rect x="15" y="20" width="70" height="110" fill="#ffffff" stroke="#6458AF" strokeWidth="2" rx="6"/>
                    <rect x="115" y="20" width="70" height="110" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" rx="6"/>
                    <text x="50" y="35" textAnchor="middle" fontSize="8" fill="#6458AF" fontWeight="bold">PROFESSIONAL</text>
                    <text x="150" y="35" textAnchor="middle" fontSize="8" fill="#6c757d">BASIC LISTING</text>
                    {/* Professional side features */}
                    <circle cx="30" cy="50" r="8" fill="#6458AF"/>
                    <rect x="42" y="45" width="35" height="4" fill="#6458AF" rx="2"/>
                    <rect x="42" y="52" width="25" height="3" fill="#dee2e6" rx="1"/>
                    <rect x="20" y="65" width="55" height="20" fill="#f0eeff" rx="3"/>
                    <rect x="20" y="90" width="55" height="15" fill="#e8f5e8" rx="3"/>
                    <rect x="20" y="110" width="55" height="15" fill="#fff3cd" rx="3"/>
                    {/* Basic side */}
                    <rect x="125" y="45" width="50" height="8" fill="#dee2e6" rx="2"/>
                    <rect x="125" y="58" width="35" height="4" fill="#dee2e6" rx="1"/>
                    <rect x="125" y="68" width="40" height="4" fill="#dee2e6" rx="1"/>
                    <rect x="125" y="80" width="25" height="4" fill="#dee2e6" rx="1"/>
                    {/* Arrows showing preference */}
                    <polygon points="95,60 105,65 95,70" fill="#28a745"/>
                    <polygon points="95,80 105,85 95,90" fill="#28a745"/>
                    <polygon points="95,100 105,105 95,110" fill="#28a745"/>
                    <text x="100" y="140" textAnchor="middle" fontSize="8" fill="#28a745" fontWeight="bold">CANDIDATE PREFERENCE</text>
                  </svg>
                </div>
                <CardTitle className="text-xl mb-3">Attract Premium Candidates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 font-medium">High-performing agents expect to work with agencies that invest in professional presentation.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li style={{ fontSize: '15px' }}>• Top agents avoid agencies that appear unprofessional or low-budget</li>
                  <li style={{ fontSize: '15px' }}>• Demonstrate that you invest in tools and technology</li>
                  <li style={{ fontSize: '15px' }}>• Show commitment to growth and professional development</li>
                  <li style={{ fontSize: '15px' }}>• Attract agents who take their career seriously</li>
                  <li style={{ fontSize: '15px' }}>• Differentiate from agencies using only basic job postings</li>
                </ul>
                <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                  <p className="text-sm text-purple-800 font-medium">Quality attracts quality. Successful agents want to join agencies that demonstrate professionalism and success.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Agency Domain Name</h3>
              <p className="text-gray-600">Select the perfect domain for your insurance agency.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Select a Recruiting-Focused Template</h3>
              <p className="text-gray-600">Choose from templates designed to attract top talent.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Attracting Agents Within 24 Hours</h3>
              <p className="text-gray-600">Your recruiting site launches within 24 hours.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              style={{ backgroundColor: '#6458AF' }} 
              className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
              onClick={handleStartProcess}
            >
              👉 Start My Recruiting Page Now
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white hidden md:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why spend hours building a generic site when you can launch in 24 hours for less than the cost of lunch?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr style={{ backgroundColor: '#6458AF' }}>
                  <th className="px-6 py-4 text-left text-white font-semibold">Feature/Cost</th>
                  <th className="px-6 py-4 text-center text-white font-semibold bg-opacity-20 bg-white">Landing Pages for Agents</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Wix / Squarespace</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Custom Designer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium text-gray-900">Setup Time</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Done in 24 hours (we do it)</td>
                  <td className="px-6 py-4 text-center text-gray-600">10–20+ hours DIY</td>
                  <td className="px-6 py-4 text-center text-gray-600">4–6 weeks</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Industry-Specific</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Yes, built for insurance</td>
                  <td className="px-6 py-4 text-center text-gray-600">No, generic</td>
                  <td className="px-6 py-4 text-center text-gray-600">Custom, but $$$</td>
                </tr>

                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">SEO Optimization</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Built-in for agents</td>
                  <td className="px-6 py-4 text-center text-gray-600">Limited templates</td>
                  <td className="px-6 py-4 text-center text-gray-600">Extra $$$</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>$18/month ($38 setup)</td>
                  <td className="px-6 py-4 text-center text-gray-600">$25–$40/month</td>
                  <td className="px-6 py-4 text-center text-gray-600">$2000+ upfront + hosting</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Domain + Hosting</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Included in price</td>
                  <td className="px-6 py-4 text-center text-gray-600">$15–30/month extra</td>
                  <td className="px-6 py-4 text-center text-gray-600">$10–50/month extra</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Ongoing Support</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>24/7 included</td>
                  <td className="px-6 py-4 text-center text-gray-600">DIY support docs</td>
                  <td className="px-6 py-4 text-center text-gray-600">Expensive hourly</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Start recruiting agents today — without wasting time or money.
            </h3>
            <Button 
              size="lg"
              style={{ backgroundColor: '#6458AF' }} 
              className="hover:opacity-90 px-8 py-4 text-lg font-semibold"
              onClick={handleStartProcess}
            >
              👉 Start My Recruiting Page Now
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
          </div>

          <Card className="max-w-lg mx-auto shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f6ff 100%)' }}>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-8">Professional Plan</CardTitle>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-6xl font-bold" style={{ color: '#6458AF' }}>$18</span>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-gray-700">per month</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-medium">$38 first month (setup included)</div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-white rounded-lg p-6 mb-8">
                <ul className="space-y-5">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">Custom domain support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">Professional recruiting templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">SEO optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">Mobile responsive design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">24/7 support & hosting</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                size="lg"
                className="w-full text-white hover:opacity-90 py-4 text-lg font-semibold shadow-lg"
                style={{ backgroundColor: '#6458AF' }}
                onClick={handleStartProcess}
              >
                🚀 Start My Recruiting Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The best agents want to work with the best teams.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Build your agency with a professional recruiting page.
          </p>
          <Button 
            size="lg"
            style={{ backgroundColor: '#6458AF' }} 
            className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
            onClick={handleStartProcess}
          >
            👉 Start My Recruiting Page
          </Button>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Copyright © 2025 Landing Pages for Agents
        </p>
      </div>
    </div>
  );
}