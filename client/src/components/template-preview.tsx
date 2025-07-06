import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle } from "lucide-react";
import temp1Image from "@assets/temp1-pr.jpg";
import temp2Image from "@assets/temp2-pr.jpg";
import temp3Image from "@assets/temp3-pr.jpg";
import temp4Image from "@assets/temp4-pr.jpg";
import template1HeroImg from "@assets/tempalte1-hero.jpg";

interface TemplatePreviewProps {
  templateSlug: string;
  className?: string;
}

export default function TemplatePreview({ templateSlug, className = "" }: TemplatePreviewProps) {
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (templateSlug === "Template-1") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        {/* Header */}
        <div className="bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-sm">
          <div className="font-bold text-lg sm:text-xl">
            <span className="text-red-600">Plan</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">right</span>
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
        <div id="hero" className="relative h-[80vh] bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${template1HeroImg})`
        }}>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
              <div className="text-white text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">John Smith</h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-2 text-white">President of Financial Services</p>
                <p className="text-sm sm:text-base lg:text-lg text-white mb-6 lg:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Providing comprehensive financial solutions and procurement strategies for businesses across all industries.
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
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="John Smith" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About John Smith Section */}
        <div id="about" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">About John Smith</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  With over 15 years of experience in financial services and procurement, John Smith has established himself as a leading expert in strategic financial planning and business optimization.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
                  His comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">15+ Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">500+ Clients Served</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">Certified Financial Planner</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">Award-Winning Service</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src={temp1Image} 
                    alt="Financial workspace with laptop and documents" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src={temp2Image} 
                    alt="Professional business meeting and handshake" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src={temp3Image} 
                    alt="Professional businesswoman with tablet outdoors" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-32 sm:h-48 rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src={temp4Image} 
                    alt="Modern office building architecture" 
                    className="w-full h-full object-cover"
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Financial <span className="text-red-600">Services & Products</span>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
                Comprehensive solutions designed to protect your assets, grow your wealth, and secure your financial future.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Get In Touch</h3>
                <form className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                  <div className="space-y-4 sm:space-y-6">
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
                        <p className="text-gray-600">sara@planright.com<br/>info@planright.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Follow Us</h3>
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
        <div className="bg-gray-900 text-white px-4 sm:px-6 py-12 sm:py-16 border-t border-gray-700">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div>
              <div className="font-bold text-xl mb-4">
                <span className="text-red-600">Plan</span>
                <span className="text-gray-400 font-thin mx-1">|</span>
                <span className="text-white">right</span>
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
            © 2025 Plan|right. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>
    );
  }

  if (templateSlug === "Template-2") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        {/* Clean Header */}
        <div className="bg-white shadow-sm px-4 sm:px-6 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="font-bold text-lg sm:text-2xl">
              <span className="text-red-600">Plan</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-gray-900">right</span>
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
                    <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                      Financial Excellence Since 2008
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                    Financial
                    <br />
                    <span className="text-red-600">Excellence</span>
                    <br />
                    Delivered
                  </h1>
                  <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                    Providing comprehensive financial solutions and procurement strategies for businesses across all industries with over 15 years of expertise.
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">John Smith</h3>
                      <p className="text-red-600 font-semibold mb-6">President of Financial Services</p>
                      
                      {/* Credentials */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Shield className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium">CFP Certified Professional</span>
                        </div>
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Award className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium">Industry Award Winner</span>
                        </div>
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Star className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium">5.0 Client Rating</span>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">About John Smith</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                With over 15 years of experience in financial services and procurement, John Smith has established himself as a leading expert in strategic financial planning and business optimization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  His comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Clock className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">15+ Years</span>
                    </div>
                    <p className="text-sm text-gray-600">Experience in Financial Planning</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Users className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">500+ Clients</span>
                    </div>
                    <p className="text-sm text-gray-600">Successfully Served</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Award className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">Award Winner</span>
                    </div>
                    <p className="text-sm text-gray-600">Industry Recognition</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Shield className="w-6 h-6 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-900">CFP Certified</span>
                    </div>
                    <p className="text-sm text-gray-600">Financial Planner</p>
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Get In Touch</h3>
                <form className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                  <div className="space-y-4 sm:space-y-6">
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
                        <p className="text-gray-600">sara@planright.com<br/>info@planright.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Follow Us</h3>
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
        <div className="bg-gray-900 text-white px-4 sm:px-6 py-12 sm:py-16 border-t border-gray-700">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div>
              <div className="font-bold text-xl mb-4">
                <span className="text-red-600">Plan</span>
                <span className="text-gray-400 font-thin mx-1">|</span>
                <span className="text-white">right</span>
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
            © 2025 Plan|right. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>

      </div>
    );
  }

  if (templateSlug === "Template-3") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        {/* Minimal Header with Blue Theme */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="font-bold text-lg sm:text-2xl text-gray-900">
              <span className="text-red-600">Plan</span><span className="text-gray-300 font-thin mx-1">|</span><span className="text-gray-900">right</span>
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Get In Touch</h3>
                <form className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                  <div className="space-y-4 sm:space-y-6">
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
                        <p className="text-gray-600">sara@planright.com<br/>info@planright.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Follow Us</h3>
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
        <div className="bg-gray-900 text-white px-4 sm:px-6 py-12 sm:py-16 border-t border-gray-700">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div>
              <div className="font-bold text-xl mb-4">
                <span className="text-red-600">Plan</span>
                <span className="text-gray-400 font-thin mx-1">|</span>
                <span className="text-white">right</span>
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
            © 2025 Plan|right. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>

      </div>
    );
  }

  // Template 4: Modern Business
  if (templateSlug === "modern-business") {
    return (
      <div className={`bg-white ${className}`}>
        {/* Modern Dark Header */}
        <div className="bg-slate-900 text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              ModernBiz
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>
        </div>

        {/* Modern Hero with Gradient */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transform Your Business
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Modern solutions for forward-thinking companies. We help businesses scale, innovate, and succeed in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all">
                Start Your Journey
              </button>
              <button className="border-2 border-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-400 hover:text-slate-900 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Modern Services Grid */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive solutions for modern businesses</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Strategy Consulting</h3>
                <p className="text-gray-600 mb-6">Strategic planning and business transformation services to accelerate your growth.</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Market Analysis</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Growth Strategy</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Digital Transformation</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Digital Marketing</h3>
                <p className="text-gray-600 mb-6">Data-driven marketing strategies that deliver measurable results and ROI.</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />SEO & SEM</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Social Media</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Analytics</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Team Development</h3>
                <p className="text-gray-600 mb-6">Build high-performing teams with our leadership and development programs.</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Leadership Training</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Team Building</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Performance Coaching</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modern CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8">Join hundreds of companies that have accelerated their growth with our proven strategies.</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all">
              Get Started Today
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              ModernBiz
            </div>
            <p className="text-gray-400">© 2025 ModernBiz. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  // Template 5: Creative Portfolio
  if (templateSlug === "creative-portfolio") {
    return (
      <div className={`bg-black text-white ${className}`}>
        {/* Creative Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-light">
              <span className="font-bold text-yellow-400">CREATIVE</span>
              <span className="text-white ml-2">STUDIO</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
              <a href="#" className="hover:text-yellow-400 transition-colors">Work</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">About</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Services</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/* Creative Hero */}
        <div className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-500/20"></div>
          <div className="text-center z-10">
            <h1 className="text-8xl font-bold mb-6">
              <span className="block text-yellow-400">CREATIVE</span>
              <span className="block text-white">VISION</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8 font-light">
              Bringing ideas to life through exceptional design
            </p>
            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all">
              View Portfolio
            </button>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center">
              ↓
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold mb-4">
                <span className="text-yellow-400">RECENT</span> WORK
              </h2>
              <p className="text-xl text-gray-400">A selection of our latest creative projects</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map((item) => (
                <div key={item} className="group relative overflow-hidden bg-gray-800 aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/80 to-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">Project {item}</h3>
                      <p className="text-sm uppercase tracking-wider">Brand Design</p>
                    </div>
                  </div>
                  <img 
                    src={`https://images.unsplash.com/photo-${1600000000000 + item}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                    alt={`Portfolio item ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold mb-4">
                <span className="text-white">OUR</span> <span className="text-yellow-400">EXPERTISE</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-3xl font-bold mb-4 text-yellow-400">BRANDING</h3>
                  <p className="text-gray-300 text-lg">Complete brand identity development from concept to execution</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-3xl font-bold mb-4 text-yellow-400">WEB DESIGN</h3>
                  <p className="text-gray-300 text-lg">Cutting-edge web experiences that captivate and convert</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-3xl font-bold mb-4 text-yellow-400">PHOTOGRAPHY</h3>
                  <p className="text-gray-300 text-lg">Professional photography that tells your brand's story</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-3xl font-bold mb-4 text-yellow-400">MOTION GRAPHICS</h3>
                  <p className="text-gray-300 text-lg">Dynamic animations and video content that engage audiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-20 bg-yellow-400 text-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-6xl font-bold mb-6">LET'S CREATE</h2>
            <p className="text-2xl mb-8">Ready to bring your vision to life?</p>
            <button className="bg-black text-yellow-400 px-8 py-4 text-lg uppercase tracking-wider hover:bg-gray-800 transition-all">
              Start a Project
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="text-2xl font-light mb-4">
              <span className="font-bold text-yellow-400">CREATIVE</span>
              <span className="text-white ml-2">STUDIO</span>
            </div>
            <p className="text-gray-400">© 2025 Creative Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  // Template 6: Healthcare Services
  if (templateSlug === "healthcare-services") {
    return (
      <div className={`bg-white ${className}`}>
        {/* Clean Medical Header */}
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-teal-600">HealthCare+</div>
            </div>
            <div className="hidden md:flex space-x-8 text-gray-700">
              <a href="#" className="hover:text-teal-600 transition-colors">Home</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Services</a>
              <a href="#" className="hover:text-teal-600 transition-colors">About</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Contact</a>
            </div>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Medical Hero */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Your Health is Our 
                <span className="text-teal-600 block">Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Providing compassionate, comprehensive healthcare services with state-of-the-art technology and experienced medical professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors">
                  Schedule Appointment
                </button>
                <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                  Emergency Services
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Medical professionals"
                className="relative z-10 w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Medical Services */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h2>
              <p className="text-xl text-gray-600">Comprehensive healthcare solutions for you and your family</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cardiology</h3>
                <p className="text-gray-600 mb-6">Comprehensive heart care with advanced diagnostic and treatment options.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-teal-500 mr-2" />ECG & Stress Tests</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-teal-500 mr-2" />Heart Surgery</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-teal-500 mr-2" />Preventive Care</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">General Medicine</h3>
                <p className="text-gray-600 mb-6">Primary care services for patients of all ages with personalized treatment plans.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />Regular Checkups</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />Vaccinations</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />Health Screenings</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency Care</h3>
                <p className="text-gray-600 mb-6">24/7 emergency medical services with rapid response and expert care.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-purple-500 mr-2" />24/7 Availability</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-purple-500 mr-2" />Trauma Care</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-purple-500 mr-2" />Critical Care</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose HealthCare+</h2>
              <p className="text-xl text-gray-600">Trusted healthcare with a patient-centered approach</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Doctors</h3>
                <p className="text-gray-600">Board-certified physicians with years of experience</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock medical assistance when you need it</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Rated</h3>
                <p className="text-gray-600">Consistently rated as the best healthcare provider</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safe & Secure</h3>
                <p className="text-gray-600">Advanced safety protocols and secure patient data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-teal-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Take Care of Your Health?</h2>
            <p className="text-xl mb-8">Schedule your appointment today and experience the best in healthcare.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Book Appointment
              </button>
              <button className="border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
                Call Emergency
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-2">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-teal-400">HealthCare+</div>
                </div>
                <p className="text-gray-400">Your trusted healthcare partner for life.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Cardiology</li>
                  <li>General Medicine</li>
                  <li>Emergency Care</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Medical Center Dr</li>
                  <li>(555) 123-4567</li>
                  <li>info@healthcare.com</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Hours</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Mon-Fri: 8AM-8PM</li>
                  <li>Sat: 9AM-5PM</li>
                  <li>Emergency: 24/7</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
              © 2025 HealthCare+. All rights reserved.
            </div>
          </div>
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