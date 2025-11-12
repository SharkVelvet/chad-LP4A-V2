import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template12Props {
  className?: string;
  content?: {
    businessName?: string | null;
    tagline?: string | null;
    aboutUs?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
  };
  flexibleContent?: Record<string, string>;
  editMode?: boolean;
}

export default function Template12({ className = "", content, flexibleContent = {}, editMode = false }: Template12Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const getValue = (key: string, defaultValue: string) => {
    return flexibleContent?.[key] || (content as any)?.[key] || defaultValue;
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <div ref={rootRef} className={`bg-white ${className}`} style={{ scrollBehavior: 'smooth' }}>
        {editMode && <EditModeOverlay rootRef={rootRef} />}
        {/* Header */}
        <div className="bg-red-600 text-white relative">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <div className="flex items-center">
              {/* Empty space for left alignment */}
            </div>
            <div className="text-center">
              <div className="hidden md:flex space-x-12 text-base">
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-200 transition-colors font-medium text-white cursor-pointer"
                >
                  About
                </a>
                <a 
                  href="#health-insurance" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('health-insurance')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-200 transition-colors font-medium text-white cursor-pointer"
                >
                  Health Insurance
                </a>
                <a 
                  href="#life-insurance" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('life-insurance')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-200 transition-colors font-medium text-white cursor-pointer"
                >
                  Life Insurance
                </a>
                <a 
                  href="#annuities" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('annuities')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-200 transition-colors font-medium text-white cursor-pointer"
                >
                  Annuities
                </a>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-white text-red-900 px-6 py-2 text-xs font-normal tracking-wide hover:bg-red-50 transition-all whitespace-nowrap">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section with Agent Name and Full-Width Portrait */}
        <div className="relative h-[80vh] text-white overflow-hidden">
          {/* Full-Width Professional Portrait Background */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Doug Welms - Professional Insurance Agent" 
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Agent Name Typography */}
          <div className="absolute top-20 left-8 z-10">
            <h1 className="text-8xl lg:text-9xl font-light tracking-wider text-white drop-shadow-lg">
              Doug
            </h1>
            <h1 className="text-8xl lg:text-9xl font-bold tracking-wider text-white -mt-4 drop-shadow-lg">
              Welms
            </h1>
            <div className="mt-4 text-base text-gray-50 tracking-[0.3em] font-extralight drop-shadow-lg">
              COMPREHENSIVE INSURANCE SOLUTIONS
            </div>
            <div className="mt-2 text-sm text-gray-200 font-extralight drop-shadow-md">
              New York, NY 10001
            </div>
          </div>

          {/* Tagline */}
          <div className="absolute bottom-20 left-8 right-8 z-10">
            <p className="text-lg font-light text-gray-100 max-w-md leading-relaxed drop-shadow-lg">
              A better <span className="italic">life insurance plan</span>.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div id="about" className="bg-slate-800 text-white py-20">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-4xl lg:text-5xl mb-16 text-center text-white">
              <span className="font-light">Comprehensive protection,</span> <span className="font-semibold italic">personalized solutions</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-600">
              {/* Health Insurance */}
              <div className="pt-8 md:pt-0 md:pr-6 md:border-l md:border-gray-600 md:pl-6">
                <h3 className="text-2xl font-bold mb-8 text-white tracking-wide">Health Insurance</h3>
                <ul className="space-y-4 text-white">
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Individual Health Plans</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Family Coverage Options</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Medicare Supplements</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Short-Term Medical</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Critical Illness Coverage</span>
                  </li>
                </ul>
              </div>

              {/* Life Insurance */}
              <div className="pt-8 md:pt-0 md:px-6">
                <h3 className="text-2xl font-bold mb-8 text-white tracking-wide">Life Insurance</h3>
                <ul className="space-y-4 text-white">
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Term Life Insurance</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Whole Life Insurance</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Universal Life</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Variable Life Options</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Final Expense Plans</span>
                  </li>
                </ul>
              </div>

              {/* Annuities */}
              <div className="pt-8 md:pt-0 md:pl-6">
                <h3 className="text-2xl font-bold mb-8 text-white tracking-wide">Annuities</h3>
                <ul className="space-y-4 text-white">
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Fixed Annuities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Variable Annuities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Index Annuities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Immediate Annuities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-3">✓</span>
                    <span className="font-normal">Retirement Income Plans</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Life Insurance Section */}
        <div id="life-insurance" className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Family Photo */}
          <div 
            className="relative h-64 lg:h-80"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100%'
            }}
          >
          </div>

          {/* Right Side - Life Insurance Content */}
          <div className="bg-gray-100 flex items-center justify-center py-20 px-8 lg:py-28 lg:px-12">
            <div className="max-w-md">
              <h2 className="text-3xl lg:text-4xl font-medium mb-4 text-gray-900 leading-tight">
                Life Insurance <span className="italic">protection</span>
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                Secure your family's future with comprehensive life insurance coverage. From term to whole life policies, we help you find the right protection to ensure your loved ones are financially secure.
              </p>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-red-600 text-white px-8 py-3 font-medium tracking-wide hover:bg-red-700 transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Health Insurance Section */}
        <div id="health-insurance" className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Health Insurance Content */}
          <div className="bg-gray-100 flex items-center justify-center py-20 px-8 lg:py-28 lg:px-12">
            <div className="max-w-md">
              <h2 className="text-3xl lg:text-4xl font-medium mb-4 text-gray-900 leading-tight">
                Health Insurance <span className="italic">coverage</span>
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                Access quality healthcare without the financial burden. Our health insurance plans provide comprehensive medical coverage, prescription benefits, and preventive care to keep you and your family healthy.
              </p>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-red-600 text-white px-8 py-3 font-medium tracking-wide hover:bg-red-700 transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Side - Healthcare Photo */}
          <div 
            className="relative h-64 lg:h-80"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100%'
            }}
          >
          </div>
        </div>

        {/* Annuities Section */}
        <div id="annuities" className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Retirement Photo */}
          <div 
            className="relative h-64 lg:h-80"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100%'
            }}
          >
          </div>

          {/* Right Side - Annuities Content */}
          <div className="bg-gray-100 flex items-center justify-center py-20 px-8 lg:py-28 lg:px-12">
            <div className="max-w-md">
              <h2 className="text-3xl lg:text-4xl font-medium mb-4 text-gray-900 leading-tight">
                Annuities for <span className="italic">retirement</span>
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                Build a secure retirement with guaranteed income streams. Our annuity products offer tax-deferred growth and reliable payments to ensure your golden years are truly golden.
              </p>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-red-600 text-white px-8 py-3 font-medium tracking-wide hover:bg-red-700 transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-slate-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed mb-8 italic">
              "Where the legacy of the past meets the inclusive innovation of the present."
            </blockquote>
            <cite className="text-red-300 text-sm tracking-wide font-light">
              — Doug Welms, Founder
            </cite>
          </div>
        </div>



        {/* Contact Section */}
        <div id="contact" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Protect Your Family Today</h2>
            <p className="text-lg text-gray-600 mb-12">Ready to secure your family's future? Let's find the perfect protection plan.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Family Office</h4>
                <p className="text-gray-600">123 Family Way<br/>Community Center, Suite 100<br/>Your City, ST 12345</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Family Hotline</h4>
                <p className="text-gray-600">(555) FAMILY-1<br/>Mon - Sat: 8:00 AM - 7:00 PM</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Family Email</h4>
                <p className="text-gray-600">families@protection.com<br/>care@protection.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-8">
            {/* Navigation */}
            <div className="flex justify-center mb-8">
              <nav className="flex space-x-8 text-gray-300">
                <a 
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </a>
                <a 
                  href="#health-insurance"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('health-insurance')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Health Insurance
                </a>
                <a 
                  href="#life-insurance"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('life-insurance')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Life Insurance
                </a>
                <a 
                  href="#annuities"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('annuities')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Annuities
                </a>
              </nav>
            </div>
            
            {/* Agent Name and Page URL */}
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-red-600 mb-2">Doug Welms</h3>
              <p className="text-gray-300 mb-4">dougwelmsinsurance.com</p>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Professional insurance services with a personal touch. Your family's protection is our priority.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-600 my-8"></div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div className="mb-4 md:mb-0">
                © 2025 Doug Welms. All rights reserved. | Privacy Policy | Terms of Service
              </div>
              <div>
                Built by landingpagesforagents.com
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
