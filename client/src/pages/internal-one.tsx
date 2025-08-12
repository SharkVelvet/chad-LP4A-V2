import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Globe, TrendingUp, Shield, Clock, Zap, FileText, Menu, X, MessageCircle } from "lucide-react";
import templatePreviewImage from "@assets/LD-Internal-1_1753558470989.png";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function InternalOne() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Professional Landing Pages for Insurance Agents';
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
              onClick={() => {
                setLocation('/internal-one');
              }}
            >
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5 sm:mt-0" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#features" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
              <a 
                href="#templates" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Templates
              </a>
              <a 
                href="#pricing" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
              <a 
                href="/blog" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/blog');
                }}
              >
                Blog
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block hover:opacity-90"
                style={{ backgroundColor: '#6458AF' }} 
                onClick={handleStartProcess}
              >
                Start the Process
              </Button>
              
              {/* Mobile Text Share Button */}
              <button
                className="md:hidden p-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => {
                  const currentUrl = window.location.href;
                  const message = `Hey, here's the website I mentioned where you can quickly get an agent page live. Just tell them the domain name you want, pick a template, and they'll have it live in about 48 hours. ${currentUrl}`;
                  
                  if (navigator.share) {
                    navigator.share({
                      title: 'Professional Landing Pages for Insurance Agents',
                      text: message,
                    });
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(message).then(() => {
                      alert('Message copied to clipboard!');
                    }).catch(() => {
                      // Fallback for older browsers
                      const textArea = document.createElement('textarea');
                      textArea.value = message;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      alert('Message copied to clipboard!');
                    });
                  }
                }}
                aria-label="Share website"
                title="Share this website"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
              
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

      {/* Mobile Slide-out Menu */}
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
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <FileText className="h-8 w-8 mr-2" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="p-6 space-y-6">
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
              href="#templates"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Templates
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
              href="#contact"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
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
            
            {/* CTA Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button 
                className="w-full text-white py-3 hover:opacity-90"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleStartProcess();
                }}
              >
                Start the Process
              </Button>
            </div>
          </nav>
        </div>
      </>

      {/* Hero Section */}
      <section 
        className="py-20 relative"
        style={{ 
          background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `url('/attached_assets/landingpage-4_1755041417041.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="hidden sm:inline">Professional Landing Pages for<br />
              <span style={{ color: '#6458AF' }}>Insurance Agents</span></span>
              <span className="sm:hidden">Professional Landing Pages<br />
              for <span style={{ color: '#6458AF' }}>Insurance Agents</span></span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create stunning, conversion-focused landing pages that establish trust and generate leads. 
              Professional templates designed specifically for insurance professionals.
            </p>
            <div className="flex justify-center">
              <Button 
                style={{ backgroundColor: '#6458AF' }} 
                className="hover:opacity-90"
                onClick={handleStartProcess}
              >
                Start the Process
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>500+</div>
              <div className="text-gray-600">Active Insurance Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>50+</div>
              <div className="text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional landing pages that convert visitors into clients, built specifically for insurance agents.
            </p>
          </div>

          <div className="rounded-2xl mb-16 overflow-hidden" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] items-center gap-0">
              <div className="px-12 py-8">
                <h3 className="text-4xl font-bold text-gray-900 mb-8">
                  Professional Templates Built for Insurance Agents
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Begin exploring professional templates that speak to the most pressing needs of your insurance clients. With sound design principles for a digital world that continues to change and content that addresses your clients' felt needs.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Industry-Specific Design</h4>
                      <p className="text-gray-600">Find templates designed specifically for insurance agents with trust-building elements.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Mobile-First Responsive</h4>
                      <p className="text-gray-600">Templates optimized for every device of your clients and prospects.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">SEO Optimized</h4>
                      <p className="text-gray-600">Templates built for your local market, holidays, and other opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full flex items-center justify-end -mr-4">
                <img 
                  src="/attached_assets/LD-Internal-3b_1753570339378.png" 
                  alt="Professional Template Preview - Jake Smith Insurance Agent Landing Page"
                  className="h-[600px] lg:h-[900px] w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl mb-16 overflow-hidden" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-0">
              <div className="h-full flex items-center justify-start -ml-4">
                <img 
                  src="/attached_assets/LD-Internal-3c_1753570577890.png" 
                  alt="Professional Template Preview - Jake Smith Insurance Agent About and Services Page"
                  className="h-[600px] lg:h-[900px] w-auto object-contain"
                />
              </div>
              <div className="px-12 py-8">
                <h3 className="text-4xl font-bold text-gray-900 mb-8">
                  Build Trust, Showcase Expertise
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Connect with potential clients using professionally designed templates that build trust and showcase your expertise. Our insurance-focused designs help you establish credibility and communicate your services effectively.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Professional Contact Options</h4>
                      <p className="text-gray-600">Clear contact information and call-to-action buttons to connect with potential clients.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Trust-Building Elements</h4>
                      <p className="text-gray-600">Professional layouts that showcase credentials, achievements, and expertise.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Call-to-Action Focus</h4>
                      <p className="text-gray-600">Strategic placement of contact buttons and information to encourage client engagement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section id="templates" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Templates for Insurance Agents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team has built a collection of professionally designed templates created specifically for insurance professionals.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mb-12 space-y-4">
            {/* Template 1 - Financial Excellence Theme */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_26_1753571277476.png"
                alt="Financial Excellence Template"
                className="w-full h-full object-cover object-[center_10%]"
              />
            </div>

            {/* Template 2 - Elegant Financial Theme */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-12"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_39_1753571277476.png"
                alt="Elegant Financial Template"
                className="w-full h-full object-cover object-[center_10%]"
              />
            </div>

            {/* Template 3 - Professional Services Theme */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-6"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_57_1753571277476.png"
                alt="Professional Services Template"
                className="w-full h-full object-cover object-[center_10%]"
              />
            </div>

            {/* Template 4 - Corporate Insurance Theme */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-18"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-13_15_37_1753571277470.png"
                alt="Corporate Insurance Template"
                className="w-full h-full object-cover object-[center_10%]"
              />
            </div>

            {/* Template 5 - Financial Excellence Variant */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-8"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_26_1753571277476.png"
                alt="Financial Excellence Dark Theme"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>

            {/* Template 6 - Elegant Financial Variant */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-4"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_39_1753571277476.png"
                alt="Elegant Clean Template"
                className="w-full h-full object-cover object-[center_30%]"
              />
            </div>

            {/* Template 7 - Professional Services Variant */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-14"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_57_1753571277476.png"
                alt="Business Professional Template"
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>

            {/* Template 8 - Corporate Insurance Variant */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-10"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-13_15_37_1753571277470.png"
                alt="Corporate Classic Template"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>

            {/* Template 9 - Financial Excellence - Service Focus */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-16"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_26_1753571277476.png"
                alt="Service Excellence Template"
                className="w-full h-full object-cover object-[center_40%]"
              />
            </div>

            {/* Template 10 - Elegant Financial - Portfolio Focus */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-8"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_39_1753571277476.png"
                alt="Portfolio Focus Template"
                className="w-full h-full object-cover object-[center_50%]"
              />
            </div>

            {/* Template 11 - Professional Services - Team Focus */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-4"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_57_1753571277476.png"
                alt="Team Focus Template"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </div>

            {/* Template 12 - Corporate Insurance - Trust Builder */}
            <div 
              className="aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border break-inside-avoid mb-6 mt-20"
              onClick={handleStartProcess}
            >
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-13_15_37_1753571277470.png"
                alt="Trust Builder Template"
                className="w-full h-full object-cover object-[center_45%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Benefits */}
      <section className="py-20" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Essential for Building Your Team
            </h2>
            <p className="text-xl text-gray-600">
              Professional websites are crucial for recruiting top talent in today's competitive market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4" style={{ color: '#6458AF' }}>70%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passive Talent</h3>
              <p className="text-gray-600">
                70% of the global workforce is considered passive talent, meaning they're open to opportunities but not actively job searching.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-4" style={{ color: '#6458AF' }}>89%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Brand Impact</h3>
              <p className="text-gray-600">
                Companies with strong brands see roughly 89% improvements in applicant quality when recruiting new talent.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-4" style={{ color: '#6458AF' }}>76%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Online Research</h3>
              <p className="text-gray-600">
                76% of new hires look at the company's reputation online before they apply for a position.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Professional Websites Matter for Hiring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Hiring Platform Requirements</h4>
                  <p className="text-gray-600">Many hiring sites require a professional webpage and business email address to post job opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Credibility & Trust</h4>
                  <p className="text-gray-600">A professional website builds immediate credibility with potential recruits who research your business.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Attract Quality Candidates</h4>
                  <p className="text-gray-600">Professional presentation attracts higher-quality candidates who value working for established businesses.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Showcase Your Success</h4>
                  <p className="text-gray-600">Display your achievements, team culture, and growth opportunities to appeal to ambitious agents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Online in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              We handle everything so you can focus on what you do best - serving your clients and hiring new agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#6458AF' }}>
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tell Us What Domain Name You Want</h3>
              <p className="text-gray-600">
                Simply let us know your preferred domain name and we'll handle all the technical details for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#6458AF' }}>
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pick Which Template You Want</h3>
              <p className="text-gray-600">
                Choose from our professional insurance agent templates and customize it with your information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#6458AF' }}>
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Page is Live Within 24 Hours</h3>
              <p className="text-gray-600">
                That's it! Your professional landing page will be live and ready to capture leads from potential clients.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 rounded-lg" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
              <CheckCircle className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
              <span className="font-semibold text-gray-900">No technical skills needed - we handle everything!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create professional landing pages that convert.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Card className="border-2 shadow-lg" style={{ borderColor: '#e5e1ff' }}>
              <CardHeader className="text-center" style={{ backgroundColor: '#f8f6ff' }}>
                <CardTitle className="text-2xl" style={{ color: '#6458AF' }}>Professional Plan</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $18 <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <div className="text-lg text-gray-600">
                  $38 first month includes setup
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Professional landing page templates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom domain support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Lead capture forms</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Mobile responsive design</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>SEO optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>24/7 support</span>
                  </div>
                </div>
                <Button style={{ backgroundColor: '#6458AF' }} className="w-full hover:opacity-90" onClick={handleStartProcess}>
                  Start the Process
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Build Your Professional Website?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of insurance agents who trust Landing Pages for Agents to establish their professional online presence.
          </p>
          <Button 
            style={{ backgroundColor: '#6458AF' }} 
            className="hover:opacity-90"
            onClick={handleStartProcess}
          >
            Start the Process
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 mr-2 text-white" />
                <div className="text-left">
                  <div className="text-xl font-bold leading-none text-white">Landing Pages</div>
                  <div className="text-sm font-medium text-gray-400" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <p className="text-gray-400">
                Professional landing pages for insurance agents nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a 
                    href="#templates" 
                    className="hover:text-white cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a 
                    href="#features" 
                    className="hover:text-white cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    className="hover:text-white cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li>
                  <a 
                    href="#contact" 
                    className="hover:text-white cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Contact
                  </a>
                </li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
          </div>
        </div>
      </footer>


    </div>
  );
}