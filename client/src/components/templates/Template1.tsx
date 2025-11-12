import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";
import { EditableImage, EditableBackground } from "./editable-media";
import temp1Image from "@assets/temp1-pr.jpg";
import temp2Image from "@assets/temp2-pr.jpg";
import temp3Image from "@assets/temp3-pr.jpg";
import temp4Image from "@assets/temp4-pr.jpg";
import template1HeroImg from "@assets/tempalte1-hero.jpg";
import jakeImage from "@assets/landing-temp1_1753549944630.png";

interface Template1Props {
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

export default function Template1({ className = "", content, flexibleContent = {}, editMode = false }: Template1Props) {
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
      <div className="bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-sm">
        <div className="font-bold text-lg sm:text-xl">
          <div className="flex flex-col items-center">
            <div>
              <span className="text-red-600" data-content-id="header-your">Your</span>
              <span className="text-gray-400 font-thin mx-1">|</span>
              <span className="text-black" data-content-id="header-insurance">Insurance</span>
            </div>
            <div className="text-xs font-normal text-gray-600 mt-1 w-full text-center" style={{ letterSpacing: '0.3em' }} data-content-id="header-group">
              {getValue('header-group', 'GROUP')}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-6">
          <div className="hidden md:flex space-x-6 text-sm text-gray-700">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-600 cursor-pointer transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-red-600 cursor-pointer transition-colors">About</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-red-600 cursor-pointer transition-colors">Services</a>
            <a href="#why-we-serve" onClick={(e) => handleSmoothScroll(e, 'why-we-serve')} className="hover:text-red-600 cursor-pointer transition-colors">Why We Serve</a>
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

      {/* Hero Section with Business Background */}
      <EditableBackground
        contentId="hero-background"
        backgroundUrl={template1HeroImg}
        gradient="linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))"
        className="relative min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center"
        getValue={getValue}
      >
        <div className="relative w-full py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
            <div className="text-white text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight" data-content-id="hero-name">
                {getValue('hero-name', content?.businessName || 'Jake Smith')}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-2 text-white" data-content-id="hero-title">
                {getValue('hero-title', 'Licensed Insurance Agent')}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white mb-6 lg:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0" data-content-id="hero-description">
                {getValue('hero-description', 'Specializing in health insurance, life insurance, Medicare, and Medicaid to protect your family\'s future.')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center text-sm sm:text-base">
                  Contact Us
                </a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center text-sm sm:text-base">
                  Learn More
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <EditableImage
                    contentId="hero-image"
                    src={jakeImage}
                    alt="Agent"
                    className="w-full h-full object-cover"
                    getValue={getValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* About Section */}
      <div id="about" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" data-content-id="about-heading">
            {getValue('about-heading', `About ${content?.businessName || 'Jake Smith'}`)}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base" data-content-id="about-paragraph-1">
                {getValue('about-paragraph-1', 'With over 15 years of experience in financial services and procurement, Jake Smith has established himself as a leading expert in strategic financial planning and business optimization.')}
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base" data-content-id="about-paragraph-2">
                {getValue('about-paragraph-2', 'His comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium" data-content-id="stat-experience">
                    {getValue('stat-experience', '15+ Years Experience')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium" data-content-id="stat-clients">
                    {getValue('stat-clients', '500+ Clients Served')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium" data-content-id="stat-certification">
                    {getValue('stat-certification', 'Certified Financial Planner')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium" data-content-id="stat-award">
                    {getValue('stat-award', 'Award-Winning Service')}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                <EditableImage
                  contentId="about-image-1"
                  src={temp1Image}
                  alt="Financial workspace with laptop and documents"
                  className="w-full h-full object-cover"
                  getValue={getValue}
                />
              </div>
              <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                <EditableImage
                  contentId="about-image-2"
                  src={temp2Image}
                  alt="Professional business meeting and handshake"
                  className="w-full h-full object-cover"
                  getValue={getValue}
                />
              </div>
              <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                <EditableImage
                  contentId="about-image-3"
                  src={temp3Image}
                  alt="Professional businesswoman with tablet outdoors"
                  className="w-full h-full object-cover"
                  getValue={getValue}
                />
              </div>
              <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                <EditableImage
                  contentId="about-image-4"
                  src={temp4Image}
                  alt="Modern office building architecture"
                  className="w-full h-full object-cover"
                  getValue={getValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Services & Products */}
      <div id="services" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-content-id="services-heading">
              {getValue('services-heading', 'Financial Services & Products')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base" data-content-id="services-subheading">
              {getValue('services-subheading', 'Comprehensive solutions designed to protect your assets, grow your wealth, and secure your financial future.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
            {/* Life Insurance */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold" data-content-id="service-life-title">
                  {getValue('service-life-title', 'Life Insurance')}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-content-id="service-life-description">
                {getValue('service-life-description', 'Protect your loved ones and ensure financial security with customized life insurance policies.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Term Life Insurance
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Whole Life Insurance
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Universal Life Insurance
                </li>
              </ul>
              <button className="text-red-600 text-sm font-semibold hover:text-red-700">
                Learn More →
              </button>
            </div>

            {/* Investment Planning */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold" data-content-id="service-investment-title">
                  {getValue('service-investment-title', 'Investment Planning')}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-content-id="service-investment-description">
                {getValue('service-investment-description', 'Strategic investment solutions to help grow your wealth and achieve long-term financial goals.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Retirement Accounts
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Mutual Funds
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Portfolio Management
                </li>
              </ul>
              <button className="text-red-600 text-sm font-semibold hover:text-red-700">
                Learn More →
              </button>
            </div>

            {/* Retirement Planning */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <Home className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold" data-content-id="service-retirement-title">
                  {getValue('service-retirement-title', 'Retirement Planning')}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-content-id="service-retirement-description">
                {getValue('service-retirement-description', 'Comprehensive retirement strategies to ensure financial independence during your golden years.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  401(k) & IRA Planning
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Income Strategies
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Social Security Optimization
                </li>
              </ul>
              <button className="text-red-600 text-sm font-semibold hover:text-red-700">
                Learn More →
              </button>
            </div>

            {/* Education Planning */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold" data-content-id="service-education-title">
                  {getValue('service-education-title', 'Education Planning')}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-content-id="service-education-description">
                {getValue('service-education-description', 'Strategic education funding solutions to help prepare for future academic expenses.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  529 College Savings
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  UGMA/UTMA Accounts
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Education Trusts
                </li>
              </ul>
              <button className="text-red-600 text-sm font-semibold hover:text-red-700">
                Learn More →
              </button>
            </div>

            {/* Health Insurance */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold" data-content-id="service-health-title">
                  {getValue('service-health-title', 'Health Insurance')}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-content-id="service-health-description">
                {getValue('service-health-description', 'Comprehensive health coverage options to protect your well-being and financial health.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Medical Insurance
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Long-Term Care
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Disability Insurance
                </li>
              </ul>
              <button className="text-red-600 text-sm font-semibold hover:text-red-700">
                Learn More →
              </button>
            </div>

            {/* Estate Planning */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold" data-content-id="service-estate-title">
                  {getValue('service-estate-title', 'Estate Planning')}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-content-id="service-estate-description">
                {getValue('service-estate-description', 'Comprehensive estate strategies to protect your assets and secure your legacy.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Wills & Trusts
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Legacy Planning
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">✓</span>
                  Asset Protection
                </li>
              </ul>
              <button className="text-red-600 text-sm font-semibold hover:text-red-700">
                Learn More →
              </button>
            </div>
          </div>

          <div className="text-center">
            <a href="#contact" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-semibold inline-block">
              Contact Us Today
            </a>
          </div>
        </div>
      </div>

      {/* Why We Serve Section */}
      <div id="why-we-serve" className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center" data-content-id="why-we-serve-heading">
            {getValue('why-we-serve-heading', 'Why We Serve')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=626&q=80",
                title: "Strategic Planning",
                description: "We help businesses develop comprehensive strategic plans that align with their long-term goals and market opportunities."
              },
              {
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                title: "Financial Analysis",
                description: "Our expert team provides detailed financial analysis to help you make informed decisions about your business future."
              },
              {
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                title: "Investment Planning",
                description: "We create personalized investment strategies designed to grow your wealth while managing risk effectively."
              },
              {
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                title: "Business Consulting",
                description: "Our consultants work closely with you to identify opportunities and implement solutions for business growth."
              },
              {
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                title: "Risk Management",
                description: "We help protect your business with comprehensive risk assessment and mitigation strategies."
              },
              {
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                title: "Team Development",
                description: "Building stronger teams through leadership development and organizational excellence programs."
              }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity"></div>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div id="testimonials" className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center" data-content-id="testimonials-heading">
            {getValue('testimonials-heading', 'Client Testimonials')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "CEO, Tech Solutions Inc.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                name: "Michael Chen",
                title: "CFO, Global Ventures",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                name: "Emily Rodriguez",
                title: "President, Innovate Corp",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
                <div className="flex mt-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div id="contact" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12" data-content-id="contact-heading">
            {getValue('contact-heading', 'Contact Us')}
          </h2>
          <p className="text-lg text-gray-600 mb-12" data-content-id="contact-subheading">
            {getValue('contact-subheading', "Ready to take control of your financial future? Let's discuss your goals and create a personalized plan.")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
              <p className="text-gray-600" data-content-id="contact-address">
                {getValue('contact-address', content?.address || '123 Financial District\nBusiness Center, Suite 456\nNew York, NY 10001')}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <p className="text-gray-600" data-content-id="contact-phone">
                {getValue('contact-phone', content?.phone || '(555) 123-PLAN')}<br/>Mon - Fri: 9:00 AM - 6:00 PM
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <p className="text-gray-600" data-content-id="contact-email">
                {getValue('contact-email', content?.email || 'john@planright.com')}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Follow Us</h3>
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
      <div className="bg-gray-900 text-white px-4 sm:px-6 py-12 sm:py-16 border-t border-gray-700">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <div>
            <div className="font-bold text-xl mb-4">
              <div className="flex flex-col">
                <div>
                  <span className="text-red-600">Your</span>
                  <span className="text-gray-400 font-thin mx-1">|</span>
                  <span className="text-white">Insurance</span>
                </div>
                <div className="text-sm font-normal text-gray-400 mt-1 w-full" style={{ letterSpacing: '0.3em' }}>GROUP</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Building Agents. Growing Futures.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Financial Planning</div>
              <div>Investment Management</div>
              <div>Procurement Services</div>
              <div>Business Consulting</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>About Us</div>
              <div>Our Team</div>
              <div>Careers</div>
              <div>Contact</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>LinkedIn</div>
              <div>Twitter</div>
              <div>Facebook</div>
              <div>Newsletter</div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          © 2025 Your Insurance Group. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </div>
  );
}
