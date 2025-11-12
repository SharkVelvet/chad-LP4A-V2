import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template7Props {
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

export default function Template7({ className = "", content, flexibleContent = {}, editMode = false }: Template7Props) {
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
      <div ref={rootRef} className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        {editMode && <EditModeOverlay rootRef={rootRef} />}
        {/* Header */}
        <div className="bg-white/95 border-b shadow-sm sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between" style={{ maxWidth: '1200px' }}>
            <div 
              className="font-bold text-lg sm:text-xl text-red-600 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              data-field="businessName"
            >
              {content?.businessName || "Your Agency Here"}
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              <div className="hidden md:flex space-x-6 text-sm text-gray-700">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-600 cursor-pointer transition-colors">Home</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-red-600 cursor-pointer transition-colors">About</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-red-600 cursor-pointer transition-colors">Services</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="hover:text-red-600 cursor-pointer transition-colors">Testimonials</a>
              </div>
              <button 
                onClick={(e) => handleSmoothScroll(e, 'contact')} 
                className="bg-red-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded font-semibold hover:bg-red-700 transition-colors text-xs sm:text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div id="hero" className="relative bg-gradient-to-r from-purple-50 to-blue-50 px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center" style={{ maxWidth: '1080px' }}>
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6" data-field="tagline" data-content-id="template-7.hero.tagline">
                {content?.tagline || (
                  <>
                    Secure, Reliable, and 
                    <span className="block text-red-600">Client-Friendly</span>
                    <span className="block text-gray-700">Financial Solutions</span>
                  </>
                )}
              </h1>
              <p className="text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0" data-field="aboutUs" data-content-id="template-7.hero.aboutUs">
                {content?.aboutUs || "Providing comprehensive financial services and solutions designed to protect what matters most to you and your family."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Get Started Today
                </button>
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-lg border max-w-md mx-auto lg:ml-auto">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="/attached_assets/lpages-business_1754875856664.jpg" 
                      alt="Professional headshot" 
                      className="w-full h-full object-cover"
                      data-content-id="template-7.hero.agent.photo"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900" data-content-id="template-7.hero.agent.name">Your Name Here</h3>
                    <p className="text-sm text-gray-600" data-content-id="template-7.hero.agent.title">Licensed Insurance Agent</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4" data-content-id="template-7.hero.agent.quote">
                  "I help families achieve financial security through personalized insurance solutions and expert guidance."
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="w-4 h-4 mr-2" />
                  <span data-field="phone" data-content-id="template-7.hero.agent.phone">{content?.phone || "(555) 123-4567"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div id="about" className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: '1080px' }}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-content-id="template-7.about.heading">
                Why Choose <span className="text-red-600">Us</span>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base" data-content-id="template-7.about.description">
                We're committed to providing exceptional service and tailored financial solutions that meet your unique needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-content-id="template-7.about.feature1.title">Trusted Protection</h3>
                <p className="text-gray-600 text-sm" data-content-id="template-7.about.feature1.description">
                  Comprehensive coverage options to protect you and your loved ones from life's uncertainties.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-content-id="template-7.about.feature2.title">Personal Service</h3>
                <p className="text-gray-600 text-sm" data-content-id="template-7.about.feature2.description">
                  One-on-one guidance from experienced professionals who understand your financial goals.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-content-id="template-7.about.feature3.title">Proven Results</h3>
                <p className="text-gray-600 text-sm" data-content-id="template-7.about.feature3.description">
                  Track record of helping clients achieve their financial objectives and build lasting wealth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Life Insurance Section */}
        <div className="px-4 sm:px-6 py-12 sm:py-16 bg-red-50">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: '1080px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                  Why Choose <span className="text-red-600">Life Insurance</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Experience the future of financial protection with our secure, efficient, and user-friendly life insurance services. Our cutting-edge platform ensures your family's financial security is safe, streamlined, and easy to manage, empowering you to take control of your financial journey with confidence and convenience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">User-Friendly Interface</h3>
                  <p className="text-gray-600 text-sm">
                    Easy navigation with responsive design for various devices.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">Financial Analytics</h3>
                  <p className="text-gray-600 text-sm">
                    Budget tracking, expense categorization, and personalized insights.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">Customer Support</h3>
                  <p className="text-gray-600 text-sm">
                    24/7 service via chat, email, phone, and a detailed help center.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">Security Features</h3>
                  <p className="text-gray-600 text-sm">
                    Data encryption, fraud detection, and prevention mechanisms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: '1080px' }}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Our <span className="text-red-600">Services</span>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
                Comprehensive financial services designed to meet all your insurance and investment needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Life Insurance</h3>
                <p className="text-gray-600 text-sm">
                  Protect your family's financial future with term, whole, and universal life insurance options.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Home Insurance</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive home protection covering property, belongings, and liability coverage.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Auto Insurance</h3>
                <p className="text-gray-600 text-sm">
                  Complete auto coverage with competitive rates and excellent customer service.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Investment Planning</h3>
                <p className="text-gray-600 text-sm">
                  Strategic investment solutions to help grow your wealth over time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Insurance</h3>
                <p className="text-gray-600 text-sm">
                  Quality health coverage options for individuals, families, and businesses.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Business Insurance</h3>
                <p className="text-gray-600 text-sm">
                  Protect your business with comprehensive commercial insurance solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: '1080px' }}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Client <span className="text-red-600">Testimonials</span>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
                Hear what our satisfied clients have to say about our services.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-sm">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">
                  "Sarah made the entire process so easy. She explained everything clearly and found me the perfect life insurance policy for my family's needs."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-gray-500">Family Protection Plan</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-sm">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">
                  "Outstanding service! They helped me bundle my home and auto insurance, saving me hundreds of dollars while increasing my coverage."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Jennifer Lopez</div>
                  <div className="text-gray-500">Home & Auto Bundle</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-sm">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">
                  "Professional, knowledgeable, and always available when I need them. I recommend them to all my friends and family."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">David Wilson</div>
                  <div className="text-gray-500">Business Insurance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="px-4 sm:px-6 py-12 sm:py-16 bg-red-600">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center text-white">
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">2500+</div>
                <div className="text-sm opacity-90">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">50M+</div>
                <div className="text-sm opacity-90">Coverage Provided</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-90">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center" style={{ maxWidth: '1080px' }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-content-id="template-7.contact.heading">
              Contact <span className="text-red-600">Us</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto" data-content-id="template-7.contact.description">
              Ready to protect what matters most? Contact us for a personalized quote and consultation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600" data-field="phone">{content?.phone || "(555) 123-4567"}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600" data-field="email">{content?.email || "info@youragency.com"}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600" data-field="address">{content?.address || "123 Main Street, Suite 100\nYour City, ST 12345"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white px-4 sm:px-6 py-12">
          <div className="max-w-4xl mx-auto text-center" style={{ maxWidth: '1080px' }}>
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center space-x-6 mb-8 text-sm text-gray-400">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">About</a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-white transition-colors">Services</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">Why We Serve</a>
              <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="hover:text-white transition-colors">Testimonials</a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
            </div>
            
            {/* Company Name */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-red-600 mb-2" data-field="businessName">{content?.businessName || "Your Agency Here"}</h2>
              <p className="text-gray-400 text-sm" data-field="email">{content?.email || "info@youragency.com"}</p>
            </div>
            
            {/* Tagline */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Professional insurance services with a personal touch. Your family's protection is our priority.
              </p>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                © 2025 Your Agency Here. All rights reserved. | Privacy Policy | Terms of Service
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Built by landingpagesforagents.com
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
