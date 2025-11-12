import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template10Props {
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

export default function Template10({ className = "", content, flexibleContent = {}, editMode = false }: Template10Props) {
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
      <div ref={rootRef} className="bg-white w-full overflow-auto" style={{ height: 'auto', minHeight: '100vh' }}>
        {editMode && <EditModeOverlay rootRef={rootRef} />}
        {/* Minimalist Header */}
        <div className="bg-red-900 text-white relative">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-sm">@</div>
              <div className="text-sm">f</div>
              <div className="text-sm">in</div>
            </div>
            <div className="text-center">
              <div className="hidden md:flex space-x-12 text-sm">
                <a href="#" className="hover:text-red-300 transition-colors font-normal text-red-200">About</a>
                <a href="#" className="hover:text-red-300 transition-colors font-normal text-red-200">Coverage</a>
                <a href="#" className="hover:text-red-300 transition-colors font-normal text-red-200">Planning</a>
                <a href="#" className="hover:text-red-300 transition-colors font-normal text-red-200">Resources</a>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-white text-red-900 px-6 py-2 text-xs font-normal tracking-wide hover:bg-red-50 transition-all whitespace-nowrap">
                CONTACT ME
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-red-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="text-xs font-normal tracking-[0.3em] mb-8 text-red-200" data-content-id="hero-badge">
              {getValue('hero-badge', 'YOUR CERTIFIED GUIDE TO')}
            </div>
            <h1 className="text-6xl lg:text-7xl font-extralight mb-4 leading-tight text-white" data-content-id="hero-heading">
              {getValue('hero-heading', 'LIFE INSURANCE AS A WAY OF LIFE')}
            </h1>
          </div>
        </div>

        {/* Fun Office Environment Section */}
        <div className="bg-red-900">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Fun collaborative office environment with people" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Life Insurance Services Section */}
        <div className="bg-red-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-extralight mb-4 tracking-wide text-white" data-content-id="services-heading">
                {getValue('services-heading', `WORK WITH ${content?.businessName || 'CAROLINE SMITH'}`)}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Term Life Insurance */}
              <div className="text-center">
                <h3 className="text-xl font-normal mb-6 tracking-wide text-white" data-content-id="service-1-title">
                  {getValue('service-1-title', 'TERM LIFE INSURANCE')}
                </h3>
                <p className="text-red-200 mb-8 leading-relaxed font-normal" data-content-id="service-1-description">
                  {getValue('service-1-description', "The ideal choice if you want affordable coverage that is tailored to your family's protection needs and budget.")}
                </p>
              </div>

              {/* Whole Life Insurance */}
              <div className="text-center">
                <h3 className="text-xl font-normal mb-6 tracking-wide text-white" data-content-id="service-2-title">
                  {getValue('service-2-title', 'WHOLE LIFE INSURANCE')}
                </h3>
                <p className="text-red-200 mb-8 leading-relaxed font-normal" data-content-id="service-2-description">
                  {getValue('service-2-description', 'Build cash value while protecting your family through permanent coverage with guaranteed premiums and benefits.')}
                </p>
              </div>

              {/* Universal Life */}
              <div className="text-center">
                <h3 className="text-xl font-normal mb-6 tracking-wide text-white" data-content-id="service-3-title">
                  {getValue('service-3-title', 'UNIVERSAL LIFE')}
                </h3>
                <p className="text-red-200 mb-8 leading-relaxed font-normal" data-content-id="service-3-description">
                  {getValue('service-3-description', 'Begin your legacy planning with flexible premiums and the potential for cash value growth through investment options.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extralight mb-4 tracking-wide text-gray-900" data-content-id="testimonials-heading">
                {getValue('testimonials-heading', 'CLIENT STORIES')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Testimonial 1 */}
              <div className="text-center">
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Sarah Johnson" 
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 font-normal leading-relaxed mb-6">
                  "Working with this advisor gave me the peace of mind I needed. The term life policy fits perfectly within our budget while providing excellent coverage for my family."
                </blockquote>
                <div className="text-gray-900 font-normal">Sarah Johnson</div>
                <div className="text-gray-500 text-sm">Mother of Two</div>
              </div>

              {/* Testimonial 2 */}
              <div className="text-center">
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Michael Chen" 
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 font-normal leading-relaxed mb-6">
                  "The whole life insurance plan not only protects my family but also serves as a smart financial investment. The cash value growth has exceeded my expectations."
                </blockquote>
                <div className="text-gray-900 font-normal">Michael Chen</div>
                <div className="text-gray-500 text-sm">Business Owner</div>
              </div>

              {/* Testimonial 3 */}
              <div className="text-center">
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Emily Rodriguez" 
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 font-normal leading-relaxed mb-6">
                  "Universal life insurance gave me the flexibility I needed as my income varies. Being able to adjust premiums while maintaining coverage is incredible."
                </blockquote>
                <div className="text-gray-900 font-normal">Emily Rodriguez</div>
                <div className="text-gray-500 text-sm">Freelancer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Section - Protecting Your Family's Future */}
        <div className="bg-red-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Image */}
              <div className="relative">
                <div className="absolute top-0 left-0 text-xs font-normal tracking-[0.3em] text-red-200 mb-4">
                  LIFE<br/>INSURANCE
                </div>
                <div className="mt-16">
                  <img 
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Happy family protected by life insurance" 
                    className="w-full h-80 object-cover rounded-sm"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-extralight mb-8 leading-tight text-white" data-content-id="family-protection-heading">
                  {getValue('family-protection-heading', "PROTECTING YOUR FAMILY'S FUTURE")}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-normal tracking-wide mb-4 text-red-200" data-content-id="protection-section-1-title">
                      {getValue('protection-section-1-title', 'START YOUR PROTECTION')}
                    </h4>
                    <p className="text-red-200 font-normal leading-relaxed mb-6" data-content-id="protection-section-1-description">
                      {getValue('protection-section-1-description', "Begin securing your family's future by exploring any of my free resources and protection strategies. Life insurance should feel like peace of mind.")}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-normal tracking-wide mb-4 text-red-200" data-content-id="protection-section-2-title">
                      {getValue('protection-section-2-title', 'ADDRESS SPECIFIC NEEDS')}
                    </h4>
                    <p className="text-red-200 font-normal leading-relaxed mb-6" data-content-id="protection-section-2-description">
                      {getValue('protection-section-2-description', 'If health concerns, age, or other factors have complicated your insurance options, a personalized assessment might be right for you.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Insurance Section - Image Right */}
        <div className="bg-red-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Content */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-extralight mb-8 leading-tight text-white">
                  COMPREHENSIVE<br/>
                  HEALTH INSURANCE
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-normal tracking-wide mb-4 text-red-200">MEDICAL COVERAGE</h4>
                    <p className="text-red-200 font-normal leading-relaxed mb-6">
                      Comprehensive health insurance plans that provide access to quality healthcare when you need it most.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-normal tracking-wide mb-4 text-red-200">PREVENTIVE CARE</h4>
                    <p className="text-red-200 font-normal leading-relaxed mb-6">
                      Focus on preventive care with coverage for regular checkups, screenings, and wellness programs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative">
                <div className="absolute top-0 left-0 text-xs font-normal tracking-[0.3em] text-red-200 mb-4">
                  HEALTH<br/>INSURANCE
                </div>
                <div className="mt-16">
                  <img 
                    src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Medical professional in healthcare setting" 
                    className="w-full h-80 object-cover rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annuities Section - Image Left */}
        <div className="bg-red-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Image */}
              <div className="relative">
                <div className="absolute top-0 left-0 text-xs font-normal tracking-[0.3em] text-red-200 mb-4">
                  RETIREMENT<br/>PLANNING
                </div>
                <div className="mt-16">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Retirement planning and annuities" 
                    className="w-full h-80 object-cover rounded-sm"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-extralight mb-8 leading-tight text-white">
                  SECURE YOUR<br/>
                  RETIREMENT WITH ANNUITIES
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-normal tracking-wide mb-4 text-red-200">GUARANTEED INCOME</h4>
                    <p className="text-red-200 font-normal leading-relaxed mb-6">
                      Annuities provide guaranteed income streams for retirement, ensuring financial security in your golden years.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-normal tracking-wide mb-4 text-red-200">TAX ADVANTAGES</h4>
                    <p className="text-red-200 font-normal leading-relaxed mb-6">
                      Take advantage of tax-deferred growth and strategic withdrawal options to maximize your retirement savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Contact Section */}
        <div className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-extralight mb-8 leading-tight text-gray-900">
              READY TO PROTECT<br/>
              YOUR FAMILY?
            </h2>
            <p className="text-gray-600 font-normal leading-relaxed mb-12 text-lg">
              Connect with Caroline Smith to discuss your insurance needs and find the perfect coverage for your family's future.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Phone className="w-8 h-8 text-gray-900 mx-auto mb-4" />
                <h4 className="text-gray-900 font-normal mb-2">CALL</h4>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
              
              <div className="text-center">
                <Mail className="w-8 h-8 text-gray-900 mx-auto mb-4" />
                <h4 className="text-gray-900 font-normal mb-2">EMAIL</h4>
                <p className="text-gray-600">caroline@protection.com</p>
              </div>
              
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-900 mx-auto mb-4" />
                <h4 className="text-gray-900 font-normal mb-2">VISIT</h4>
                <p className="text-gray-600">123 Insurance Ave<br/>Your City, ST 12345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-red-800 text-white py-12">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <h4 className="text-white font-normal mb-4 tracking-wide">PROTECTION ADVISOR</h4>
                <p className="text-red-200 font-normal leading-relaxed text-sm">
                  Dedicated to providing comprehensive life insurance solutions that protect what matters most - your family's future.
                </p>
              </div>
              
              {/* Services */}
              <div>
                <h4 className="text-white font-normal mb-4 tracking-wide">SERVICES</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">Term Life Insurance</a></li>
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">Whole Life Insurance</a></li>
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">Universal Life</a></li>
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">Policy Review</a></li>
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h4 className="text-white font-normal mb-4 tracking-wide">RESOURCES</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">Coverage Calculator</a></li>
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">Planning Guide</a></li>
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="text-red-200 hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h4 className="text-white font-normal mb-4 tracking-wide">CONTACT</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-red-200">(555) 123-4567</p>
                  <p className="text-red-200">advisor@protection.com</p>
                  <p className="text-red-200">123 Insurance Ave<br/>Your City, ST 12345</p>
                </div>
              </div>
            </div>
            
            {/* Footer Bottom */}
            <div className="border-t border-red-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-red-200 text-sm mb-4 md:mb-0">
                © 2025 Protection Advisor. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-red-200 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-red-200 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-red-200 hover:text-white transition-colors">Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
