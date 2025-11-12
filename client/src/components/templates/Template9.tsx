import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template9Props {
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

export default function Template9({ className = "", content, flexibleContent = {}, editMode = false }: Template9Props) {
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg"></div>
              <span className="text-gray-900">Insurance Pro</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="hidden md:flex space-x-6 text-sm text-gray-700">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-600 cursor-pointer transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-red-600 cursor-pointer transition-colors">About</a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-red-600 cursor-pointer transition-colors">Services</a>
              <a href="#stats" onClick={(e) => handleSmoothScroll(e, 'stats')} className="hover:text-red-600 cursor-pointer transition-colors">Results</a>
            </div>
            <button 
              onClick={(e) => handleSmoothScroll(e, 'contact')} 
              className="bg-red-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-xs sm:text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Hero Section with Mobile App Showcase */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6" data-content-id="template-7.hero.badge">
                  Life & Health Insurance Expert
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" data-content-id="template-7.hero.title">
                  Protect Your Family's 
                  <span className="text-red-600"> Financial Future</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed" data-content-id="template-7.hero.description">
                  Comprehensive life insurance and health coverage solutions tailored to your family's needs. 
                  Secure your legacy and protect against unexpected medical costs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <button 
                    onClick={(e) => handleSmoothScroll(e, 'contact')} 
                    className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
                  >
                    Contact Us
                  </button>
                  <button 
                    onClick={(e) => handleSmoothScroll(e, 'about')} 
                    className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors text-lg"
                  >
                    Learn More
                  </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-red-400 fill-current" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>10,000+ Clients</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>A+ Rating</span>
                  </div>
                </div>
              </div>
              
              {/* Professional Agent Photo */}
              <div className="relative flex justify-center">
                <div className="relative">
                  {/* Main Agent Photo */}
                  <div className="w-96 h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80" 
                      alt="Professional Insurance Agent" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating Statistics */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">5.0</div>
                    <div className="text-xs text-gray-500">★ Rating</div>
                  </div>
                  
                  {/* Agent Info Card */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 text-center min-w-max">
                    <h3 className="font-semibold text-gray-900" data-content-id="template-7.hero.agent.name">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600" data-content-id="template-7.hero.agent.title">Licensed Life & Health Agent</p>
                    <p className="text-xs text-red-600 mt-1" data-content-id="template-7.hero.agent.experience">15+ Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div id="stats" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-content-id="template-7.stats.heading">
                Protecting families across America
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-content-id="template-7.stats.description">
                Our proven track record in life and health insurance speaks for itself. Join thousands of families who trust us with their financial security.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2" data-content-id="template-7.stats.stat1.number">15.2k</div>
                <div className="text-gray-600" data-content-id="template-7.stats.stat1.label">Life Policies Issued</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2" data-content-id="template-7.stats.stat2.number">$2.8B</div>
                <div className="text-gray-600" data-content-id="template-7.stats.stat2.label">Coverage in Force</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2" data-content-id="template-7.stats.stat3.number">24hrs</div>
                <div className="text-gray-600" data-content-id="template-7.stats.stat3.label">Avg. Claim Processing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2" data-content-id="template-7.stats.stat4.number">98.7%</div>
                <div className="text-gray-600" data-content-id="template-7.stats.stat4.label">Claims Approved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="services" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-content-id="template-7.services.heading">
                Life & Health Insurance Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-content-id="template-7.services.description">
                Comprehensive life and health insurance solutions designed to protect your family's financial future and well-being.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-content-id="template-7.services.service1.title">Life Insurance</h3>
                <p className="text-gray-600" data-content-id="template-7.services.service1.description">Term and whole life insurance policies to secure your family's financial future and legacy.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-content-id="template-7.services.service2.title">Health Insurance</h3>
                <p className="text-gray-600" data-content-id="template-7.services.service2.description">Individual and family health plans with comprehensive medical coverage and prescription benefits.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-content-id="template-7.services.service3.title">Family Protection</h3>
                <p className="text-gray-600" data-content-id="template-7.services.service3.description">Customized coverage plans that protect your entire family's health and financial security.</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" data-content-id="template-7.about2.heading">
                  Life insurance is the cornerstone of financial security
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed" data-content-id="template-7.about2.paragraph1">
                  Just as you invest in your family's future, life and health insurance protect that investment. Our comprehensive coverage ensures your loved ones are financially secure, no matter what life brings.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed" data-content-id="template-7.about2.paragraph2">
                  With decades of experience and a commitment to personalized service, we help families across America build the protection they need for true peace of mind.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Term and whole life insurance options</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Individual and family health plans</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">No medical exam policies available</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Why Choose Our Agency?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6" />
                      <span>A+ Rated Life & Health Specialist</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6" />
                      <span>Quick response in under 5 minutes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6" />
                      <span>$2.8B+ in life coverage in force</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-red-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to protect what matters most?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contact our team of insurance experts today. No obligation, personalized service.
            </p>
            <button 
              onClick={(e) => handleSmoothScroll(e, 'contact')} 
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-600">Real stories from families we've helped protect</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Sarah helped us find the perfect life insurance policy that fits our budget. The process was smooth and she explained everything clearly. Highly recommend!"
                </p>
                <div className="font-semibold text-gray-900">Jennifer & Mark Thompson</div>
                <div className="text-sm text-gray-600">Term Life Insurance</div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Outstanding service! Got my health insurance sorted quickly with no medical exam. Sarah's expertise saved us time and money."
                </p>
                <div className="font-semibold text-gray-900">Robert Chen</div>
                <div className="text-sm text-gray-600">Health Insurance</div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Professional, knowledgeable, and caring. Sarah took the time to understand our family's needs and found us comprehensive coverage at a great rate."
                </p>
                <div className="font-semibold text-gray-900">Maria Rodriguez</div>
                <div className="text-sm text-gray-600">Family Health Plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Ready to get started? Contact our team of insurance experts today.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Phone className="w-6 h-6 text-red-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="w-6 h-6 text-red-400" />
                  <span>quotes@insurancepro.com</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <MapPin className="w-6 h-6 text-red-400" />
                  <span>123 Insurance Way, Your City, ST 12345</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-red-600 rounded-lg"></div>
                <span className="text-white font-bold text-lg">Insurance Pro</span>
              </div>
              
              <div className="text-gray-400 text-sm text-center md:text-right">
                <p>© 2025 Insurance Pro. All rights reserved.</p>
                <p className="mt-1">Built by landingpagesforagents.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
