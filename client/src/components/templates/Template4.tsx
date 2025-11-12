import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template4Props {
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

export default function Template4({ className = "", content, flexibleContent = {}, editMode = false }: Template4Props) {
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
      <div ref={rootRef} className="bg-white w-full min-h-screen overflow-auto">
        {editMode && <EditModeOverlay rootRef={rootRef} />}
        {/* Modern Dark Header */}
        <div className="bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="font-bold text-lg sm:text-xl text-white">
              <div className="flex flex-col items-center">
                <div>
                  <span className="text-red-600">Your</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-white">Insurance</span>
                </div>
                <div className="text-xs font-normal text-gray-300 mt-1 w-full text-center" style={{ letterSpacing: '0.3em' }}>GROUP</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-red-400 transition-colors">Home</a>
              <a href="#" className="hover:text-red-400 transition-colors">About</a>
              <a href="#" className="hover:text-red-400 transition-colors">Services</a>
              <a href="#" className="hover:text-red-400 transition-colors">Why We Serve</a>
              <a href="#" className="hover:text-red-400 transition-colors">Testimonials</a>
            </div>
            <button className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition-all">
              Contact
            </button>
          </div>
        </div>

        {/* Modern Hero with Background Image */}
        <div className="relative text-white py-24" style={{
          backgroundImage: `url(${parkBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Cameron Smith</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-white">Licensed Insurance Agent</p>
              <p className="text-lg text-white mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Specializing in health insurance, life insurance, Medicare planning, and Medicaid assistance for comprehensive family protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all">
                  Contact Us
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative z-20">
                <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src={template4Image} 
                    alt="Cameron Smith" 
                    className="w-full h-full object-cover"
                  />
                </div>
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

        {/* About Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">About Cameron Smith</h2>
              <p className="text-xl text-gray-600">Insurance expertise you can trust</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  With over 15 years of experience in insurance services, Cameron Smith has established herself as a leading expert in health insurance, Medicare planning, and comprehensive family protection.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Her comprehensive approach combines extensive insurance knowledge with personalized service to deliver exceptional coverage solutions for individuals and families across all life stages.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Clock className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">15+ Years</span>
                    </div>
                    <p className="text-sm text-gray-600">Experience</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Users className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">500+ Clients</span>
                    </div>
                    <p className="text-sm text-gray-600">Served</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Award className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">CFP Certified</span>
                    </div>
                    <p className="text-sm text-gray-600">Financial Planner</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Star className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">Award-Winning</span>
                    </div>
                    <p className="text-sm text-gray-600">Service</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={template4Image} 
                  alt="Cameron Smith Professional" 
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Female business professional" 
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Female business consultant" 
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Professional woman working" 
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Services */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Financial <span className="text-red-600">Services & Products</span>
              </h2>
              <p className="text-xl text-gray-600">Comprehensive solutions designed to protect your assets, grow your wealth, and secure your financial future.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Life Insurance</h3>
                <p className="text-gray-600 mb-6">Protect your loved ones and ensure financial security with customized life insurance policies.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Term Life Insurance</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Whole Life Insurance</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Universal Life Insurance</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
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
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
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
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
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
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
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
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
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
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why We Serve</h2>
              <p className="text-xl text-gray-600">Our commitment to excellence in every aspect of financial planning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Strategic Planning</h3>
                <p className="text-gray-600">We help businesses develop comprehensive strategic plans that align with their long-term goals and market opportunities.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Financial Analysis</h3>
                <p className="text-gray-600">Our expert team provides detailed financial analysis to help you make informed decisions about your business future.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Investment Planning</h3>
                <p className="text-gray-600">We create personalized investment strategies designed to grow your wealth while managing risk effectively.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Business Consulting</h3>
                <p className="text-gray-600">Our consultants work closely with you to identify opportunities and implement solutions for business growth.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Risk Management</h3>
                <p className="text-gray-600">We help protect your business with comprehensive risk assessment and mitigation strategies.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
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
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Client Testimonials</h2>
              <p className="text-xl text-gray-600">Hear what our clients say about our services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="David Johnson"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">David Johnson</h4>
                    <p className="text-gray-600">CEO, Tech Solutions Inc.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Michael Chen"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Michael Chen</h4>
                    <p className="text-gray-600">CFO, Global Ventures</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Carlos Rodriguez"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Carlos Rodriguez</h4>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Contact Us Today</h2>
            <p className="text-xl text-gray-600 mb-12">Ready to take control of your financial future? Let's discuss your goals and create a personalized plan.</p>
            
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
                <p className="text-gray-600">cameron@planright.com<br/>info@planright.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
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
