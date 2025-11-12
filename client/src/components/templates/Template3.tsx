import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template3Props {
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

export default function Template3({ className = "", content, flexibleContent = {}, editMode = false }: Template3Props) {
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
        {/* Minimal Header with Blue Theme */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="font-bold text-lg sm:text-xl">
              <div className="flex flex-col items-center">
                <div>
                  <span className="text-red-600">Your</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">Insurance</span>
                </div>
                <div className="text-xs font-normal text-gray-600 mt-1 w-full text-center" style={{ letterSpacing: '0.3em' }}>GROUP</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8">
              <nav className="hidden md:flex space-x-8 text-sm">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors font-medium">Home</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors font-medium">About</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors font-medium">Services</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors font-medium">Contact</a>
              </nav>
              <button 
                onClick={(e) => handleSmoothScroll(e, 'contact')} 
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Clean Hero Section with Cards Layout */}
        <div className="bg-gradient-to-br from-red-50 to-white py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              {/* Profile Picture with Floating Badge */}
              <div className="relative inline-block mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Sarah Johnson" 
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg mx-auto"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-xs font-medium border-2 border-white shadow-md whitespace-nowrap">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    Sarah Johnson, CFP
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                Strategic Financial
                <span className="block text-red-600">Planning & Advisory</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Comprehensive financial solutions and procurement expertise to help your business thrive in today's competitive marketplace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-gray-600">Satisfied Clients</div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">CFP</div>
                <div className="text-gray-600">Certified Planner</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'contact')} 
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Contact Us Today
                </button>
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'about')} 
                  className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About John Smith Section */}
        <div id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-600 text-sm font-medium mb-4">
                Meet Our Expert
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Sarah Johnson</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                With over 15 years of experience in financial services and procurement, Sarah Johnson has established herself as a leading expert in strategic financial planning and business optimization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Her comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 hover:bg-red-50 transition-colors">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                        <Clock className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">15+ Years Experience</h3>
                      <p className="text-sm text-gray-600">Proven track record in financial planning</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 hover:bg-red-50 transition-colors">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">500+ Clients Served</h3>
                      <p className="text-sm text-gray-600">Trusted by individuals and businesses</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 hover:bg-red-50 transition-colors">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                        <Award className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Industry Recognition</h3>
                      <p className="text-sm text-gray-600">Award-winning financial expertise</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 hover:bg-red-50 transition-colors">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">CFP Certified</h3>
                      <p className="text-sm text-gray-600">Certified Financial Planner professional</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="Professional consultation" 
                      className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="Business meeting" 
                      className="w-full h-32 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img 
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="Financial planning session" 
                      className="w-full h-32 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="Strategic analysis" 
                      className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Serve Section */}
        <div id="why-we-serve" className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Why We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {[
                {
                  image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  title: "Client-Centered Approach",
                  description: "We prioritize your unique financial goals and develop customized strategies that align with your vision for success."
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

        {/* Financial Services & Products */}
        <div id="services" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Financial Services & Products</h2>
            <div className="grid grid-cols-2 gap-8">
              
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Retirement Planning</h3>
                </div>
                <p className="text-gray-600 mb-4">Comprehensive retirement strategies designed to secure your financial future with confidence and peace of mind.</p>
                <ul className="space-y-2 mb-6">
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
                  <h3 className="text-xl font-semibold">Investment Management</h3>
                </div>
                <p className="text-gray-600 mb-4">Professional portfolio management services tailored to your risk tolerance and investment objectives.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Portfolio Diversification
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Risk Assessment
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
                  <h3 className="text-xl font-semibold">Healthcare Planning</h3>
                </div>
                <p className="text-gray-600 mb-4">Strategies to protect your health and wealth with comprehensive healthcare and long-term care planning.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Medicare Planning
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Long-term Care
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
                  <h3 className="text-xl font-semibold">Education Funding</h3>
                </div>
                <p className="text-gray-600 mb-4">Strategic planning to help fund education expenses while maintaining your other financial goals.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    529 Plan Strategies
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
                  <h3 className="text-xl font-semibold">Insurance Solutions</h3>
                </div>
                <p className="text-gray-600 mb-4">Comprehensive insurance strategies to protect your family, income, and assets against unexpected events.</p>
                <ul className="space-y-2 mb-6">
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
                  <h3 className="text-xl font-semibold">Business Services</h3>
                </div>
                <p className="text-gray-600 mb-4">Specialized financial services designed to help business owners and executives achieve their professional goals.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Executive Benefits
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
