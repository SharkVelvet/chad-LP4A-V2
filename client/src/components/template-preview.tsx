import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star } from "lucide-react";

interface TemplatePreviewProps {
  templateSlug: string;
  className?: string;
}

export default function TemplatePreview({ templateSlug, className = "" }: TemplatePreviewProps) {
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (templateSlug === "modern-business") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-sm">
          <div className="font-bold text-xl">
            <span className="text-red-600">Plan</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">right</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-700">
            <a href="#hero" onClick={(e) => handleSmoothScroll(e, 'hero')} className="hover:text-red-600 cursor-pointer transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-red-600 cursor-pointer transition-colors">About</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-red-600 cursor-pointer transition-colors">Services</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-red-600 cursor-pointer transition-colors">Contact</a>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold">Get Started</button>
        </div>

        {/* Hero Section with Restaurant Background */}
        <div id="hero" className="relative h-screen bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-12 items-center w-full">
              <div className="text-white">
                <h1 className="text-6xl font-bold mb-4 leading-tight">John Smith</h1>
                <p className="text-2xl mb-2 text-white">President of Financial Services</p>
                <p className="text-lg text-white mb-8 leading-relaxed max-w-lg">
                  Providing comprehensive financial solutions and procurement strategies for businesses across all industries.
                </p>
                <div className="flex space-x-4">
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition-colors inline-block">
                    Contact Us
                  </a>
                  <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition-colors inline-block">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="John Smith" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">JS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About John Smith Section */}
        <div id="about" className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About John Smith</h2>
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With over 15 years of experience in financial services and procurement, John Smith has established himself as a leading expert in strategic financial planning and business optimization.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  His comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-red-600 mr-3" />
                    <span className="text-sm font-medium">15+ Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-red-600 mr-3" />
                    <span className="text-sm font-medium">500+ Clients Served</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-red-600 mr-3" />
                    <span className="text-sm font-medium">Certified Financial Planner</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-red-600 mr-3" />
                    <span className="text-sm font-medium">Award-Winning Service</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full h-48 bg-gray-300 rounded-lg shadow-sm"></div>
                <div className="w-full h-48 bg-gray-300 rounded-lg shadow-sm"></div>
                <div className="w-full h-48 bg-gray-300 rounded-lg shadow-sm"></div>
                <div className="w-full h-48 bg-gray-300 rounded-lg shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Services & Products */}
        <div id="services" className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Financial <span className="text-red-600">Services & Products</span>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed to protect your assets, grow your wealth, and secure your financial future.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              {/* Life Insurance */}
              <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-600">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Life Insurance</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Protect your loved ones and ensure financial security with customized life insurance policies.
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
                  <h3 className="text-xl font-bold">Education Planning</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Strategic education funding solutions to help prepare for future academic expenses.
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
                  <h3 className="text-xl font-bold">Health Insurance</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive health coverage options to protect your well-being and financial health.
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
                  <h3 className="text-xl font-bold">Estate Planning</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive estate strategies to protect your assets and secure your legacy.
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
        <div className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why We Serve</h2>
            <div className="grid grid-cols-3 gap-8">
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
        <div className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Client Testimonials</h2>
            <div className="grid grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <div className="font-semibold">Client Name</div>
                      <div className="text-sm text-gray-500">CEO, Company Name</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
                  <div className="flex mt-4">
                    {[1,2,3,4,5].map(star => (
                      <div key={star} className="w-4 h-4 bg-red-600 rounded-full mr-1"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* Contact Us Section */}
        <div id="contact" className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
            <div className="grid grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Address</h4>
                        <p className="text-gray-600">123 Financial District<br/>Business Center, Suite 456<br/>New York, NY 10001</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">(555) 123-PLAN<br/>Mon - Fri: 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">john@planright.com<br/>info@planright.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6">Follow Us</h3>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <Facebook className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <Twitter className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white px-6 py-8 border-t border-gray-700">
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">
                <span className="text-red-600">Plan</span>
                <span className="text-gray-400 font-thin mx-1">|</span>
                <span className="text-white">right</span>
              </div>
              <p className="text-gray-400 text-sm">Professional financial services and procurement solutions for modern businesses.</p>
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
            © 2024 Plan|right. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>
    );
  }

  if (templateSlug === "restaurant-food") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="text-green-600 font-bold text-lg">BUSINESS PRO</div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Home</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
          <button className="bg-green-600 text-white px-4 py-1 rounded text-sm">Get Quote</button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-900 to-emerald-800 text-white px-6 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">Michael Johnson</h1>
            <p className="text-xl text-green-300 mb-4">Senior Business Consultant</p>
            <p className="text-green-400 mb-6 max-w-2xl">
              Delivering strategic business solutions and growth strategies for enterprises. 
              Specialized in operational excellence and market expansion.
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 px-6 py-2 rounded">Schedule Meeting</button>
              <button className="border border-green-400 px-6 py-2 rounded">Learn More</button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">About Michael Johnson</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-green-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Strategic Planning</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-green-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Business Growth</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-green-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Market Analysis</h3>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Consulting Services & Solutions</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="text-center p-4">
                <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-sm mb-1">Service {i}</h3>
                <p className="text-xs text-gray-600">Professional guidance</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center">Client Success Stories</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white p-4 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <div>
                    <div className="font-semibold text-sm">Client Name</div>
                    <div className="text-xs text-gray-500">Company</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">"Outstanding consulting results..."</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="px-6 py-8 bg-green-800 text-white">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Schedule Consultation</h2>
              <div className="bg-white text-black p-4 rounded">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="text-xs text-gray-600">Available for consultations</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-2 text-sm">
                <div>Phone: (555) 123-4567</div>
                <div>Email: michael@businesspro.com</div>
                <div>Address: 456 Business Center</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-green-900 text-white px-6 py-4 text-center text-xs">
          © 2024 Business Pro. All rights reserved.
        </div>
      </div>
    );
  }

  if (templateSlug === "retail-store") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="text-purple-600 font-bold text-lg">PINNACLE</div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Home</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
          <button className="bg-purple-600 text-white px-4 py-1 rounded text-sm">Book Call</button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white px-6 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">Sarah Williams</h1>
            <p className="text-xl text-purple-300 mb-4">Executive Leadership Coach</p>
            <p className="text-purple-400 mb-6 max-w-2xl">
              Empowering leaders and executives to reach their full potential through personalized coaching, 
              strategic thinking, and transformational leadership development.
            </p>
            <div className="flex space-x-4">
              <button className="bg-purple-600 px-6 py-2 rounded">Start Coaching</button>
              <button className="border border-purple-400 px-6 py-2 rounded">View Approach</button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">About Sarah Williams</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-purple-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Leadership Development</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-purple-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Executive Coaching</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-purple-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Team Building</h3>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Leadership Coaching & Development</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="text-center p-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-sm mb-1">Program {i}</h3>
                <p className="text-xs text-gray-600">Executive guidance</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center">Leadership Success Stories</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white p-4 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <div>
                    <div className="font-semibold text-sm">Executive Name</div>
                    <div className="text-xs text-gray-500">Fortune 500 CEO</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">"Transformative leadership coaching..."</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="px-6 py-8 bg-purple-800 text-white">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Schedule Session</h2>
              <div className="bg-white text-black p-4 rounded">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Tue - Thu</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="text-xs text-gray-600">Executive coaching sessions</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
              <div className="space-y-2 text-sm">
                <div>Phone: (555) 987-6543</div>
                <div>Email: sarah@pinnaclecoach.com</div>
                <div>Address: 789 Executive Plaza</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-purple-900 text-white px-6 py-4 text-center text-xs">
          © 2024 Pinnacle Coaching. All rights reserved.
        </div>
      </div>
    );
  }

  // Default fallback for other templates
  return (
    <div className={`bg-gray-100 rounded-lg p-8 ${className}`}>
      <div className="text-center text-gray-500">Template Preview</div>
    </div>
  );
}