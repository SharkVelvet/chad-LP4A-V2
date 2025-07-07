import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle } from "lucide-react";
import temp1Image from "@assets/temp1-pr.jpg";
import temp2Image from "@assets/temp2-pr.jpg";
import temp3Image from "@assets/temp3-pr.jpg";
import temp4Image from "@assets/temp4-pr.jpg";
import template1HeroImg from "@assets/tempalte1-hero.jpg";
import jennyImage from "@assets/planright-w2_1751850806336.jpg";
import template4Image from "@assets/planright-w4_1751851299514.jpg";
import parkBackgroundImage from "@assets/planright-park-back_1751851568156.jpg";
import jennySnapshotImage from "@assets/planright-jenny-snapshot_1751852549427.jpg";
import cameronSnapshotImage from "@assets/planright-cameron-snapshot_1751852578360.jpg";

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
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">Jenny Smith</h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-2 text-white">Licensed Insurance Agent</p>
                <p className="text-sm sm:text-base lg:text-lg text-white mb-6 lg:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Specializing in health insurance, life insurance, Medicare, and Medicaid to protect your family's future.
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
                    Specializing in comprehensive insurance solutions including health coverage, life insurance, Medicare planning, and Medicaid assistance with over 15 years of expertise.
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Jenny Smith</h3>
                      <p className="text-red-600 font-semibold mb-6">Licensed Insurance Agent</p>
                      
                      {/* Credentials */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Shield className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium">Licensed Insurance Agent</span>
                        </div>
                        <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                          <Award className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium">15+ Years Experience</span>
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
  if (templateSlug === "Template-4") {
    return (
      <div className={`bg-white ${className}`}>
        {/* Modern Dark Header */}
        <div className="bg-slate-900 text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-red-600">Plan</span>
              <span className="text-gray-400 font-thin mx-1">|</span>
              <span className="text-white">right</span>
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
                  <span className="text-red-600">Plan</span>
                  <span className="text-gray-400 font-thin mx-1">|</span>
                  <span className="text-white">right</span>
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
              © 2025 Plan|right. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Template 5: Creative Portfolio - Minimalist Design
  if (templateSlug === "Template-5") {
    return (
      <div className={`bg-white text-gray-900 ${className}`}>
        {/* Minimalist Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-red-600">Plan</span>
              <span className="text-gray-400 font-thin mx-1">|</span>
              <span className="text-gray-900">right</span>
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
                <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium tracking-wide">
                  Financial Excellence Since 2008
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-light mb-6 leading-tight">
                <span className="text-red-600 font-bold">John</span>
                <br />
                Smith
                <br />
                <span className="text-gray-600 font-bold">Financial</span>
              </h1>
              <p className="text-xl text-red-600 mb-4 font-semibold">Licensed Insurance Agent</p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Specializing in health insurance, life insurance, Medicare planning, and Medicaid assistance to protect your family's future.
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
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="John Smith"
                className="relative z-10 w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4">
                About <span className="text-red-600 font-bold">John Smith</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Financial expertise you can trust for your business and personal financial goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  With over 15 years of experience in financial services and procurement, John Smith has established himself as a leading expert in strategic financial planning and business optimization.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  His comprehensive approach combines traditional financial wisdom with innovative procurement strategies to deliver exceptional results for clients across various industries.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                    <p className="text-gray-600">Clients Served</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
                    <p className="text-gray-600">Years Experience</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={temp1Image}
                  alt="Financial workspace"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img 
                  src={temp2Image}
                  alt="Professional meeting"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Services */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4">
                Financial <span className="text-red-600 font-bold">Services & Products</span>
              </h2>
              <p className="text-xl text-gray-600">Comprehensive solutions designed to protect your assets, grow your wealth, and secure your financial future.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
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
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b9dc1d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Sarah Johnson"
                    className="w-16 h-16 rounded-full object-cover mr-4"
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
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Emily Rodriguez"
                    className="w-16 h-16 rounded-full object-cover mr-4"
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
                  <span className="text-red-600">Plan</span>
                  <span className="text-gray-400 font-thin mx-1">|</span>
                  <span className="text-white">right</span>
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
              © 2025 Plan|right. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Template 6: Modern Elegant Design
  if (templateSlug === "Template-6") {
    return (
      <div className={`bg-white ${className}`}>
        {/* Elegant Header */}
        <div className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl font-bold">
                <span className="text-red-600">Plan</span>
                <span className="text-gray-800 font-light mx-1">|</span>
                <span className="text-gray-800">right</span>
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
                  alt="Jenny Smith" 
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900">Jenny Smith</h3>
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
                  alt="Jenny Smith"
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
                  "Working with Jenny has been exceptional. Her comprehensive approach to financial planning and dedication to client success makes her stand out in the industry. Highly recommended."
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
                  "Jenny's professional expertise and personalized service exceeded our expectations. She helped us navigate complex financial decisions with confidence and clarity."
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
                  <span className="text-red-600">Plan</span>
                  <span className="text-gray-400 font-thin mx-1">|</span>
                  <span className="text-white">right</span>
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
              © 2025 Plan|right. All rights reserved.
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