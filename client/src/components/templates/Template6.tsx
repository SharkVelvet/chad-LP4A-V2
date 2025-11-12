import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template6Props {
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

export default function Template6({ className = "", content, flexibleContent = {}, editMode = false }: Template6Props) {
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
      <div ref={rootRef} className={`bg-white ${className}`}>
        {editMode && <EditModeOverlay rootRef={rootRef} />}
        {/* Elegant Header */}
        <div className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-bold text-lg sm:text-xl">
                <div className="flex flex-col items-center">
                  <div>
                    <span className="text-red-600">Your</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">Insurance</span>
                  </div>
                  <div className="text-xs font-normal text-gray-600 mt-1 w-full text-center" style={{ letterSpacing: '0.3em' }}>GROUP</div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-10 text-gray-700 font-medium">
              <a href="#home" className="hover:text-red-600 transition-colors">Home.</a>
              <a href="#about" className="hover:text-red-600 transition-colors">About.</a>
              <a href="#services" className="hover:text-red-600 transition-colors">Services.</a>
              <a href="#testimonials" className="hover:text-red-600 transition-colors">Testimonials.</a>
              <a href="#contact" className="hover:text-red-600 transition-colors">Contact.</a>
            </div>
            <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors font-medium">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Elegant Hero Section */}
        <div id="home" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-light text-gray-900 leading-tight">
                  Elegant
                  <span className="block text-red-600 font-normal">financial</span>
                  <span className="block">solutions</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  There are many variations of financial strategies available, but the majority focus on comprehensive wealth management and strategic business optimization for long-term success.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-all shadow-lg hover:shadow-xl">
                  View Services
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-red-600 hover:text-red-600 transition-all">
                  Get In Touch
                </button>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
                <p className="text-sm text-gray-500 mb-2">Plans start at</p>
                <p className="text-3xl font-bold text-red-600">$2,500</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-gray-100 rounded-3xl transform rotate-3"></div>
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src={jennyImage} 
                  alt="Jake Smith" 
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900">Jake Smith</h3>
                  <p className="text-red-600 font-medium">Licensed Insurance Agent</p>
                  <p className="text-gray-600 mt-2">15+ years of excellence in insurance solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* We Handle Everything Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-light text-gray-900 mb-6">
                We handle <span className="text-red-600 font-normal">everything</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor 
                incididunt soluta nobis assumenda labore quod maxime.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="relative mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Financial Appraisal"
                    className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Appraisal</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquais ipsum ultrices.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Price Negotiation"
                    className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Price Negotiation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquais ipsum ultrices.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Paperwork Handling"
                    className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Paperwork Handling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquais ipsum ultrices.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-red-50 p-8 rounded-3xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Want to grow your wealth in the US?</h4>
                <p className="text-gray-600 mb-4">Get in touch with our financial advisor!</p>
                <button className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors">
                  Learn More
                </button>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Want to secure your retirement?</h4>
                <p className="text-gray-600 mb-4">Call our advisor for a consultation!</p>
                <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-light text-gray-900 leading-tight">
                  We Connect People <br/>
                  With Their <span className="text-red-600 font-normal">Dreams</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Specializing in comprehensive insurance solutions that protect what matters most - your health, your family, and your future. From Medicare guidance to life insurance protection.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With over 15 years of experience helping clients navigate complex insurance decisions, I provide personalized guidance for health insurance enrollment, Medicaid applications, Medicare planning, and life insurance coverage that fits your unique needs and budget.
                </p>
                
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">500+</div>
                    <div className="text-gray-600">Families Protected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">$2,400+</div>
                    <div className="text-gray-600">Average Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">15+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={jennyImage}
                  alt="Jake Smith"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Financial Services */}
        <div id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-light text-gray-900 mb-6">
                Comprehensive <br/>
                <span className="text-red-600 font-normal">Insurance Solutions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Protecting your health, family, and future with personalized insurance coverage. From Medicare guidance to life insurance protection, I help you find the right coverage at the right price.
              </p>
            </div>
            
            <div className="space-y-12">
              {/* Life Insurance - Featured Large */}
              <div className="relative group">
                <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
                  Popular
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="relative h-96">
                    <img 
                      src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Life Insurance"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="text-gray-600 text-lg mb-2">Comprehensive Protection</div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-4">Best Life Insurance Plans</h3>
                      <div className="text-3xl font-bold text-red-600 mb-6">From $25/month</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Term</div>
                        <div className="text-gray-600 text-sm">Life Insurance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Whole</div>
                        <div className="text-gray-600 text-sm">Life Coverage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Universal</div>
                        <div className="text-gray-600 text-sm">Life Plans</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Protect your family's financial future with comprehensive life insurance coverage. Choose from term, whole, or universal life policies designed to meet your specific needs and budget requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Health Insurance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="text-gray-600 text-lg mb-2">Complete Coverage</div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">Health Insurance Plans</h3>
                    <div className="text-3xl font-bold text-red-600 mb-6">From $150/month</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">Individual</div>
                      <div className="text-gray-600 text-sm">Coverage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">Family</div>
                      <div className="text-gray-600 text-sm">Plans</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">Group</div>
                      <div className="text-gray-600 text-sm">Insurance</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Comprehensive health insurance coverage to protect you and your family. Access to quality healthcare with plans that fit your budget and healthcare needs, including preventive care and emergency coverage.
                  </p>
                </div>
                <div className="relative h-96">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Health Insurance"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Medicare & Medicaid */}
              <div className="relative group">
                <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
                  Essential
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="relative h-96">
                    <img 
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Medicare Planning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="text-gray-600 text-lg mb-2">Government Programs</div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-4">Medicare & Medicaid</h3>
                      <div className="text-3xl font-bold text-red-600 mb-6">Free Consultation</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Medicare</div>
                        <div className="text-gray-600 text-sm">Enrollment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Medicaid</div>
                        <div className="text-gray-600 text-sm">Applications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Benefits</div>
                        <div className="text-gray-600 text-sm">Optimization</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Navigate Medicare and Medicaid programs with confidence. I help seniors and eligible individuals understand their options, enroll in the right programs, and maximize their healthcare benefits while minimizing costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Services */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-light text-gray-900 mb-6">Insurance Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive insurance solutions to protect your health, family, and financial future.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Life Insurance</h4>
                <p className="text-gray-600">Protect your family's financial future with term, whole, and universal life insurance policies.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Health Insurance</h4>
                <p className="text-gray-600">Quality healthcare coverage for individuals, families, and groups that fits your budget.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Medicare Planning</h4>
                <p className="text-gray-600">Navigate Medicare options with expert guidance on supplements and advantage plans.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Medicaid Assistance</h4>
                <p className="text-gray-600">Help with Medicaid applications and enrollment for essential healthcare coverage.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Claims Support</h4>
                <p className="text-gray-600">Expert assistance with insurance claims processing and appeals to maximize benefits.</p>
              </div>
            </div>
          </div>
        </div>

        {/* What Clients Say - Elegant Testimonials */}
        <div id="testimonials" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-light text-gray-900 mb-6">What clients say</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="bg-gray-50 p-10 rounded-3xl hover:shadow-lg transition-shadow">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Pristine & Gorgeous</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  "Jenny's expertise in financial planning transformed our business operations and significantly improved our bottom line. Her attention to detail and strategic approach is unmatched."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Robert Jensen"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h6 className="font-bold text-gray-900">Robert Jensen</h6>
                    <p className="text-gray-600">Business Owner, LA</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-10 rounded-3xl hover:shadow-lg transition-shadow">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Reliable People</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  "Working with Jake has been exceptional. His comprehensive approach to financial planning and dedication to client success makes him stand out in the industry. Highly recommended."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Jerry Johnston"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h6 className="font-bold text-gray-900">Jerry Johnston</h6>
                    <p className="text-gray-600">Acme Boutique, UK</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-10 rounded-3xl hover:shadow-lg transition-shadow">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Smooth Process</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  "Jake's professional expertise and personalized service exceeded our expectations. He helped us navigate complex financial decisions with confidence and clarity."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Marcus Anderson"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h6 className="font-bold text-gray-900">Marcus Anderson</h6>
                    <p className="text-gray-600">Financial Advisor, Colorado</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-12 space-x-3">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>



        {/* Get In Touch - Elegant Contact */}
        <div id="contact" className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="mb-20">
              <h2 className="text-5xl font-light text-gray-900 mb-6">Get In Touch With Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to transform your financial future? Contact us today to discuss your goals and create a personalized plan.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Address</h4>
                <p className="text-gray-600 leading-relaxed">007, Bond Street<br/>Mighty Meadows<br/>Australia</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-6">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Phone</h4>
                <p className="text-gray-600 leading-relaxed">1 800 234 56 78<br/>Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-6">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Email</h4>
                <p className="text-gray-600 leading-relaxed">jenny@planright.com<br/>info@planright.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-light text-gray-900 mb-8">Follow Us</h3>
              <div className="flex justify-center space-x-6">
                <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-lg hover:shadow-xl">
                  <Facebook className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-lg hover:shadow-xl">
                  <Twitter className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-lg hover:shadow-xl">
                  <Linkedin className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-lg hover:shadow-xl">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Our Team</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>LinkedIn</li>
                  <li>Twitter</li>
                  <li>Facebook</li>
                  <li>Newsletter</li>
                </ul>
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
