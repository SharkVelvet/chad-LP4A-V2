import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";
import { EditableImage } from "./editable-media";
import temp1Image from "@assets/temp1-pr.jpg";
import temp2Image from "@assets/temp2-pr.jpg";

interface Template5Props {
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

export default function Template5({ className = "", content, flexibleContent = {}, editMode = false }: Template5Props) {
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
      <div ref={rootRef} className={`bg-white text-gray-900 ${className}`}>
        {editMode && <EditModeOverlay rootRef={rootRef} />}
        {/* Minimalist Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="font-bold text-lg sm:text-xl">
              <div className="flex flex-col items-center">
                <div>
                  <span className="text-red-600">Your</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">Insurance</span>
                </div>
                <div className="text-xs font-normal text-gray-600 mt-1 w-full text-center" style={{ letterSpacing: '0.3em' }}>GROUP</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-12 text-sm font-medium tracking-wide">
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">HOME</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">ABOUT</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">SERVICES</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">WHY WE SERVE</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">TESTIMONIALS</a>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-sm hover:bg-red-700 transition-colors font-medium">
              Contact
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="py-24 bg-gradient-to-br from-red-50 to-gray-50">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium tracking-wide" data-content-id="hero-badge">
                  {getValue('hero-badge', 'Financial Excellence Since 2008')}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-light mb-6 leading-tight" data-content-id="hero-heading">
                {getValue('hero-heading', content?.businessName || 'John Smith Financial')}
              </h1>
              <p className="text-xl text-red-600 mb-4 font-semibold" data-content-id="hero-subtitle">
                {getValue('hero-subtitle', 'Licensed Insurance Agent')}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed" data-content-id="hero-description">
                {getValue('hero-description', "Specializing in health insurance, life insurance, Medicare planning, and Medicaid assistance to protect your family's future.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 text-white px-8 py-4 rounded-sm hover:bg-red-700 transition-colors font-medium">
                  Contact Us
                </button>
                <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-sm hover:bg-red-600 hover:text-white transition-colors font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200/50 to-gray-200/50 rounded-2xl transform rotate-3"></div>
              <div className="absolute -top-4 -left-4 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg transform rotate-12 z-20">
                <div className="text-center">
                  <div className="text-sm font-bold">15+ Years</div>
                  <div className="text-xs">Excellence</div>
                </div>
              </div>
              <EditableImage
                contentId="hero-image"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="John Smith"
                className="relative z-10 w-full h-96 object-cover rounded-2xl shadow-xl"
                getValue={getValue}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4" data-content-id="about-heading">
                {getValue('about-heading', `About ${content?.businessName || 'John Smith'}`)}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-content-id="about-subtitle">
                {getValue('about-subtitle', 'Financial expertise you can trust for your business and personal financial goals.')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed" data-content-id="about-paragraph-1">
                  {getValue('about-paragraph-1', 'With over 15 years of experience in financial services and procurement, John Smith has established himself as a leading expert in strategic financial planning and business optimization.')}
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed" data-content-id="about-paragraph-2">
                  {getValue('about-paragraph-2', 'His comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.')}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 mb-2" data-content-id="stat-1-value">
                      {getValue('stat-1-value', '500+')}
                    </div>
                    <p className="text-gray-600" data-content-id="stat-1-label">
                      {getValue('stat-1-label', 'Clients Served')}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 mb-2" data-content-id="stat-2-value">
                      {getValue('stat-2-value', '15+')}
                    </div>
                    <p className="text-gray-600" data-content-id="stat-2-label">
                      {getValue('stat-2-label', 'Years Experience')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <EditableImage
                  contentId="about-image-1"
                  src={temp1Image}
                  alt="Financial workspace"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  getValue={getValue}
                />
                <EditableImage
                  contentId="about-image-2"
                  src={temp2Image}
                  alt="Professional meeting"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  getValue={getValue}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Services */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4" data-content-id="services-heading">
                {getValue('services-heading', 'Financial Services & Products')}
              </h2>
              <p className="text-xl text-gray-600" data-content-id="services-description">
                {getValue('services-description', 'Comprehensive solutions designed to protect your assets, grow your wealth, and secure your financial future.')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4" data-content-id="service-1-title">
                  {getValue('service-1-title', 'Life Insurance')}
                </h3>
                <p className="text-gray-600 mb-6" data-content-id="service-1-description">
                  {getValue('service-1-description', 'Protect your loved ones and ensure financial security with customized life insurance policies.')}
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Term Life Insurance</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Whole Life Insurance</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Universal Life Insurance</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Investment Planning</h3>
                <p className="text-gray-600 mb-6">Strategic investment solutions to help grow your wealth and achieve long-term financial goals.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Retirement Accounts</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Mutual Funds</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Portfolio Management</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Home className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Retirement Planning</h3>
                <p className="text-gray-600 mb-6">Comprehensive retirement strategies to ensure financial independence during your golden years.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />401(k) & IRA Planning</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Income Strategies</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Social Security Optimization</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Education Planning</h3>
                <p className="text-gray-600 mb-6">Strategic education funding solutions to help prepare for future academic expenses.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />529 College Savings</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />UGMA/UTMA Accounts</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Education Trusts</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Health Insurance</h3>
                <p className="text-gray-600 mb-6">Comprehensive health coverage options to protect your well-being and financial health.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Medical Insurance</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Long-Term Care</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Disability Insurance</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Estate Planning</h3>
                <p className="text-gray-600 mb-6">Comprehensive estate strategies to protect your assets and secure your legacy.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Wills & Trusts</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Legacy Planning</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Asset Protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Serve */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4">
                Why We <span className="text-red-600 font-bold">Serve</span>
              </h2>
              <p className="text-xl text-gray-600">Our commitment to excellence in every aspect of financial planning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Strategic Planning</h3>
                <p className="text-gray-600">We help businesses develop comprehensive strategic plans that align with their long-term goals and market opportunities.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Financial Analysis</h3>
                <p className="text-gray-600">Our expert team provides detailed financial analysis to help you make informed decisions about your business future.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Investment Planning</h3>
                <p className="text-gray-600">We create personalized investment strategies designed to grow your wealth while managing risk effectively.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Business Consulting</h3>
                <p className="text-gray-600">Our consultants work closely with you to identify opportunities and implement solutions for business growth.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Risk Management</h3>
                <p className="text-gray-600">We help protect your business with comprehensive risk assessment and mitigation strategies.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Team Development</h3>
                <p className="text-gray-600">Building stronger teams through leadership development and organizational excellence programs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4">
                Client <span className="text-red-600 font-bold">Testimonials</span>
              </h2>
              <p className="text-xl text-gray-600">Hear what our clients say about our services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <EditableImage
                    contentId="testimonial-1"
                    src="https://images.unsplash.com/photo-1494790108755-2616b9dc1d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Sarah Johnson"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    getValue={getValue}
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                    <p className="text-gray-600">CEO, Tech Solutions Inc.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <EditableImage
                    contentId="testimonial-2"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Michael Chen"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    getValue={getValue}
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Michael Chen</h4>
                    <p className="text-gray-600">CFO, Global Ventures</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <EditableImage
                    contentId="testimonial-3"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Emily Rodriguez"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    getValue={getValue}
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Emily Rodriguez</h4>
                    <p className="text-gray-600">President, Innovate Corp</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-light mb-6 text-gray-900">Contact Us Today</h2>
            <p className="text-xl mb-12 text-gray-600">
              Ready to take control of your financial future? Let's discuss your goals and create a personalized plan.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600">123 Financial District<br/>Business Center, Suite 456<br/>New York, NY 10001</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                <p className="text-gray-600">(555) 123-PLAN<br/>Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-600">john@planright.com<br/>info@planright.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold mb-4">
                  <div className="flex flex-col">
                    <div>
                      <span className="text-red-600">Your</span>
                      <span className="text-gray-400 font-thin mx-1">|</span>
                      <span className="text-white">Insurance</span>
                    </div>
                    <div className="text-sm font-normal text-gray-400 mt-1 w-full" style={{ letterSpacing: '0.3em' }}>GROUP</div>
                  </div>
                </div>
                <p className="text-gray-400">Building Agents. Growing Futures.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Financial Planning</li>
                  <li>Investment Management</li>
                  <li>Procurement Services</li>
                  <li>Business Consulting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Financial District</li>
                  <li>(555) 123-PLAN</li>
                  <li>john@planright.com</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                    <Facebook className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                    <Twitter className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                    <Linkedin className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
              © 2025 Your Insurance Group. All rights reserved.
            </div>
          </div>
        </div>
      </div>
  );
}
