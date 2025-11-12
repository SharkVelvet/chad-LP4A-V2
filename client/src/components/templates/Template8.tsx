import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template8Props {
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

export default function Template8({ className = "", content, flexibleContent = {}, editMode = false }: Template8Props) {
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
        <div className="bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-sm">
          <div 
            className="font-bold text-lg sm:text-xl cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex flex-col items-start">
              <div>
                <span className="text-red-600">Your</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">Agent</span>
              </div>
              <div className="text-xs font-normal text-gray-600 mt-1" style={{ letterSpacing: '0.3em' }}>INSURANCE AGENT</div>
            </div>
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
              Contact
            </button>
          </div>
        </div>

        {/* Hero Section with Corporate Building Background */}
        <div className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center text-center px-4" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/attached_assets/landingpages-background8_1755688587564.jpg)`,
          height: '60vh'
        }}>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight" data-content-id="hero-heading">
              {getValue('hero-heading', content?.businessName || 'Cameron Smith')}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-2" data-content-id="hero-subtitle">
              {getValue('hero-subtitle', 'Licensed Insurance Agent')}
            </p>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto" data-content-id="hero-description">
              {getValue('hero-description', 'Specializing in health insurance, life insurance, Medicare planning, and Medicaid assistance for comprehensive family protection.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={(e) => handleSmoothScroll(e, 'contact')} 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-medium transition-colors"
              >
                Contact Us
              </button>
              <button 
                onClick={(e) => handleSmoothScroll(e, 'about')} 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded font-medium transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6" data-content-id="about-heading">
                {getValue('about-heading', `About ${content?.businessName || 'Cameron Smith'}`)}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed" data-content-id="about-paragraph-1">
                {getValue('about-paragraph-1', 'With over 15 years of experience in insurance services, Cameron Smith has established herself as a leading expert in health insurance, Medicare planning, and comprehensive family protection.')}
              </p>
              <p className="text-gray-600 leading-relaxed" data-content-id="about-paragraph-2">
                {getValue('about-paragraph-2', 'Her comprehensive approach combines extensive insurance knowledge with personalized service to deliver exceptional coverage solutions for individuals and families across all life stages.')}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600" data-content-id="stat-1-value">
                    {getValue('stat-1-value', '15+')}
                  </div>
                  <div className="text-sm text-gray-600" data-content-id="stat-1-label">
                    {getValue('stat-1-label', 'Years Experience')}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600" data-content-id="stat-2-value">
                    {getValue('stat-2-value', '500+')}
                  </div>
                  <div className="text-sm text-gray-600" data-content-id="stat-2-label">
                    {getValue('stat-2-label', 'Clients Served')}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Red geometric accent with professional image */}
            <div className="relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 transform rotate-45 z-10"></div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Professional headshot - full width square */}
                <div className="w-full">
                  <img 
                    src="/attached_assets/landing-pages-8_1754879037993.jpg" 
                    alt="Insurance Professional" 
                    className="w-full h-64 object-cover object-top"
                  />
                </div>
                
                {/* Content section */}
                <div className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-10 h-10 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">CFP Certified Life Insurance Agent</h3>
                      <p className="text-gray-600">Award-winning service with professional certifications and extensive industry recognition.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="py-16 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-content-id="services-heading">
              {getValue('services-heading', 'Financial Services & Products')}
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto" data-content-id="services-description">
              {getValue('services-description', 'Comprehensive solutions designed to protect your assets, grow your wealth, and secure your financial future.')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-content-id="service-1-title">
                  {getValue('service-1-title', 'Life Insurance')}
                </h3>
                <p className="text-gray-600 mb-4" data-content-id="service-1-description">
                  {getValue('service-1-description', 'Protect your loved ones and ensure financial security with customized life insurance policies.')}
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Term Life Insurance</li>
                  <li>• Whole Life Insurance</li>
                  <li>• Universal Life Insurance</li>
                </ul>
              </div>
              
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Health Insurance</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive health coverage options to protect your well-being and financial health.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Medical Insurance</li>
                  <li>• Long-Term Care</li>
                  <li>• Disability Insurance</li>
                </ul>
              </div>
              
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Retirement Planning</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive retirement strategies to ensure financial independence during your golden years.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 401(k) & IRA Planning</li>
                  <li>• Income Strategies</li>
                  <li>• Social Security Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Professional Section */}
        <div className="py-24 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Professional Image with Red geometric accent */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600 transform -rotate-45"></div>
              <div className="relative z-10">
                <img 
                  src="/attached_assets/landing-pages-8_1754878927424.jpg" 
                  alt="Insurance Professional" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional Insurance<br />
                Guidance You Can Trust
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With decades of combined experience in the insurance industry, our team understands the complexities of protecting what matters most to you and your family. We work with leading carriers to provide comprehensive coverage options.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From life insurance policies that secure your family's future to health coverage that protects your financial well-being, we're here to guide you through every decision with expertise and care.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our personalized approach ensures that your insurance portfolio is tailored to your unique needs, budget, and long-term goals.
              </p>
            </div>
          </div>
        </div>

        {/* Dark Services Section */}
        <div className="py-16 bg-gray-900 text-white px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Insurance Plus</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Comprehensive coverage with additional benefits and priority customer service for complete peace of mind.
                </p>
              </div>
              
              <div>
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Business Plus</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Specialized business insurance solutions designed to protect your company's assets and future growth.
                </p>
              </div>
              
              <div>
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Premium Plus</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our highest tier of service with exclusive benefits and personalized insurance consultation.
                </p>
              </div>
            </div>
            

          </div>
        </div>



        {/* Testimonials Section */}
        <div id="testimonials" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" data-content-id="testimonials-heading">
                {getValue('testimonials-heading', 'Client Testimonials')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto" data-content-id="testimonials-description">
                {getValue('testimonials-description', 'Hear what our clients say about our services')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="mb-4">
                  <div className="flex text-red-600 mb-2">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "Cameron's expertise in financial planning transformed our business operations and significantly improved our bottom line."
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">David Johnson</div>
                  <div className="text-sm text-gray-500">CEO, Tech Solutions Inc.</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="mb-4">
                  <div className="flex text-red-600 mb-2">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "Outstanding service and comprehensive insurance solutions. Cameron made the entire process simple and stress-free."
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">Michael Chen</div>
                  <div className="text-sm text-gray-500">CFO, Global Ventures</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="mb-4">
                  <div className="flex text-red-600 mb-2">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "Professional, knowledgeable, and always available when we need assistance. Highly recommend Cameron's services."
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">Carlos Rodriguez</div>
                  <div className="text-sm text-gray-500">President, Innovate Corp</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section with Red Background */}
        <div className="py-16 bg-red-600 text-white px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Over 1000 clients trust our services</h2>
            <p className="text-red-100 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their insurance needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-2 border-white p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-red-100">Happy Clients</div>
              </div>
              <div className="border-2 border-white p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-red-100">Years Experience</div>
              </div>
              <div className="border-2 border-white p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-red-100">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us Today</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to take control of your financial future? Let's discuss your goals and create a personalized plan.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-red-600 rounded-full">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Financial District<br />
                  Business Center, Suite 456<br />
                  New York, NY 10001
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-red-600 rounded-full">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">
                  (555) 123-PLAN<br />
                  Mon - Fri: 9:00 AM - 6:00 PM
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-red-600 rounded-full">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">
                  cameron@planright.com<br />
                  info@planright.com
                </p>
              </div>
            </div>
            

          </div>
        </div>

        {/* Footer - Dark theme matching screenshot */}
        <div className="bg-gray-800 text-white px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Links */}
            <div className="text-center mb-8">
              <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-300">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white cursor-pointer transition-colors">Home</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white cursor-pointer transition-colors">About</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-white cursor-pointer transition-colors">Services</a>
                <a href="#" className="hover:text-white cursor-pointer transition-colors">Why We Serve</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="hover:text-white cursor-pointer transition-colors">Testimonials</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white cursor-pointer transition-colors">Contact</a>
              </div>
            </div>
            
            {/* Agency Name */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-red-600">Your Agency Here</h3>
              <p className="text-gray-400 text-sm mt-2">info@youragency.com</p>
            </div>
            
            {/* Tagline */}
            <div className="text-center mb-8">
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Professional insurance services with a personal touch. Your family's protection is our priority.
              </p>
            </div>
            
            {/* Copyright and Built By */}
            <div className="border-t border-gray-700 pt-6">
              <div className="text-center text-gray-500 text-xs">
                <p className="mb-1">© 2025 Your Agency Here. All rights reserved. | Privacy Policy | Terms of Service</p>
                <p>Built by landingpagesforagents.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
