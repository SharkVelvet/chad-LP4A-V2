import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template2Props {
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

export default function Template2({ className = "", content, flexibleContent = {}, editMode = false }: Template2Props) {
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
        {/* Clean Header */}
        <div className="bg-white shadow-sm px-4 sm:px-6 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="font-bold text-lg sm:text-xl">
              <div className="flex flex-col items-center">
                <div>
                  <span className="text-red-600">Your</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">Insurance</span>
                </div>
                <div className="text-xs font-normal text-gray-600 mt-1 w-full text-center" style={{ letterSpacing: '0.3em' }}>GROUP</div>
              </div>
            </div>
            <nav className="hidden lg:flex space-x-8">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-700 hover:text-red-600 font-medium transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">About</a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">Services</a>
              <a href="#why-we-serve" onClick={(e) => handleSmoothScroll(e, 'why-we-serve')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">Why We Serve</a>
              <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                (555) 123-4567
              </div>
              <button 
                onClick={(e) => handleSmoothScroll(e, 'contact')} 
                className="bg-red-600 text-white px-3 sm:px-6 py-2 rounded font-medium hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section - Split Layout */}
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen -mx-4 sm:-mx-6">
              {/* Left Content */}
              <div className="flex items-center py-12 sm:py-20 px-4 sm:px-6 pr-2">
                <div className="w-full">
                  <div className="mb-6">
                    <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium" data-content-id="hero-badge">
                      {getValue('hero-badge', 'Financial Excellence Since 2008')}
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight" data-content-id="hero-heading">
                    {getValue('hero-heading', 'Financial Excellence Delivered')}
                  </h1>
                  <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg" data-content-id="hero-description">
                    {getValue('hero-description', 'Specializing in comprehensive insurance solutions including health coverage, life insurance, Medicare planning, and Medicaid assistance with over 15 years of expertise.')}
                  </p>
                  

                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={(e) => handleSmoothScroll(e, 'contact')} 
                      className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Contact Us
                    </button>
                    <button 
                      onClick={(e) => handleSmoothScroll(e, 'about')} 
                      className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-red-600 hover:text-red-600 transition-colors"
                    >
                      Learn More About Us
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative flex items-center justify-center py-20 px-6 pl-2">
                <div className="relative">
                  {/* Background Elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-100 rounded-full"></div>
                  
                  {/* Main Profile Card */}
                  <div className="relative bg-white rounded-3xl p-10 shadow-2xl max-w-md">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl mx-auto mb-6 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                          alt="John Smith" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" data-content-id="agent-name">
                        {getValue('agent-name', content?.businessName || 'Jake Smith')}
                      </h3>
                      <p className="text-red-600 font-semibold mb-6" data-content-id="agent-title">
                        {getValue('agent-title', 'Licensed Insurance Agent')}
                      </p>
                      
                      {/* Credentials */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Shield className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium" data-content-id="credential-1">
                            {getValue('credential-1', 'Licensed Insurance Agent')}
                          </span>
                        </div>
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Award className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium" data-content-id="credential-2">
                            {getValue('credential-2', '15+ Years Experience')}
                          </span>
                        </div>
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Star className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium" data-content-id="credential-3">
                            {getValue('credential-3', '5.0 Client Rating')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Achievement Badge */}
                  <div className="absolute -top-4 -left-4 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg transform rotate-12">
                    <div className="text-center">
                      <div className="text-sm font-bold">15+ Years</div>
                      <div className="text-xs">Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4" data-content-id="about-heading">
                {getValue('about-heading', `About ${content?.businessName || 'John Smith'}`)}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-content-id="about-intro">
                {getValue('about-intro', 'With over 15 years of experience in financial services and procurement, John Smith has established himself as a leading expert in strategic financial planning and business optimization.')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed" data-content-id="about-paragraph">
                  {getValue('about-paragraph', 'His comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.')}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Clock className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900" data-content-id="stat-1-value">
                        {getValue('stat-1-value', '15+ Years')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600" data-content-id="stat-1-label">
                      {getValue('stat-1-label', 'Experience in Financial Planning')}
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Users className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900" data-content-id="stat-2-value">
                        {getValue('stat-2-value', '500+ Clients')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600" data-content-id="stat-2-label">
                      {getValue('stat-2-label', 'Successfully Served')}
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Award className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900" data-content-id="stat-3-value">
                        {getValue('stat-3-value', 'Award Winner')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600" data-content-id="stat-3-label">
                      {getValue('stat-3-label', 'Industry Recognition')}
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Shield className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900" data-content-id="stat-4-value">
                        {getValue('stat-4-value', 'CFP Certified')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600" data-content-id="stat-4-label">
                      {getValue('stat-4-label', 'Financial Planner')}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'contact')} 
                  className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors"
                >
                  Contact Us
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Professional consultation" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Financial planning session" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Business meeting" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg -mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Strategic analysis" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

    

        {/* Financial Services & Products */}
        <div id="services" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Financial Services & Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Financial Planning</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive financial planning services to secure your future and optimize your wealth management strategy.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Retirement Planning
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Estate Planning
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Tax Strategy
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Risk Management
                  </li>
                </ul>
                <button onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-red-600 font-semibold text-sm hover:text-red-700 cursor-pointer">Learn More →</button>
              </div>
              
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Investment Planning</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Strategic investment solutions to help grow your wealth and achieve long-term financial goals.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Retirement Accounts
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Portfolio Management
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Asset Allocation
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Market Analysis
                  </li>
                </ul>
                <button onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-red-600 font-semibold text-sm hover:text-red-700 cursor-pointer">Learn More →</button>
              </div>
              
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Home className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Retirement Planning</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive retirement strategies to ensure financial independence during your golden years.
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
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Healthcare Planning
                  </li>
                </ul>
                <button onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-red-600 font-semibold text-sm hover:text-red-700 cursor-pointer">Learn More →</button>
              </div>
              
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <GraduationCap className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Education Planning</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Strategic savings plans to fund educational goals for you or your children's future success.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    529 College Plans
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Educational Savings
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Cost Projections
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Funding Strategies
                  </li>
                </ul>
                <button onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-red-600 font-semibold text-sm hover:text-red-700 cursor-pointer">Learn More →</button>
              </div>
              
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Insurance Solutions</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive insurance coverage to protect your family and assets against unforeseen circumstances.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Life Insurance
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Disability Insurance
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Long-term Care
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Property Protection
                  </li>
                </ul>
                <button onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-red-600 font-semibold text-sm hover:text-red-700 cursor-pointer">Learn More →</button>
              </div>
              
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Business Services</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Specialized financial services designed to help businesses grow and optimize their financial operations.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Business Planning
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Employee Benefits
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Succession Planning
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Key Person Insurance
                  </li>
                </ul>
                <button onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-red-600 font-semibold text-sm hover:text-red-700 cursor-pointer">Learn More →</button>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Serve Section */}
        <div id="why-we-serve" className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Why We Serve</h2>
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
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div id="testimonials" className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Client Testimonials</h2>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-12">Ready to take control of your financial future? Let's discuss your goals and create a personalized plan.</p>
            
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
