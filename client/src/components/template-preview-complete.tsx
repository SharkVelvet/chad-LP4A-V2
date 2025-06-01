import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import temp1Image from "@assets/temp1-pr.jpg";
import temp2Image from "@assets/temp2-pr.jpg";
import temp3Image from "@assets/temp3-pr.jpg";
import temp4Image from "@assets/temp4-pr.jpg";

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

  if (templateSlug === "template-1") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-sm">
          <div className="font-bold text-xl">
            <span className="text-red-600">Plan</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-black">right</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-6 text-sm text-gray-700">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-600 cursor-pointer transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-red-600 cursor-pointer transition-colors">About</a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-red-600 cursor-pointer transition-colors">Services</a>
              <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="hover:text-red-600 cursor-pointer transition-colors">Testimonials</a>
            </div>
            <button 
              onClick={(e) => handleSmoothScroll(e, 'contact')} 
              className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition-colors text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gray-50 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Professional Financial Services with 
                    <span className="text-red-600 block">John Smith</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Comprehensive financial planning and procurement solutions designed to optimize your business operations and drive sustainable growth across all industries.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={(e) => handleSmoothScroll(e, 'contact')} 
                    className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Get Started Today
                  </button>
                  <button 
                    onClick={(e) => handleSmoothScroll(e, 'services')} 
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    View Services
                  </button>
                </div>
                
                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-500">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center py-20">
                <div className="relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-100 rounded-full"></div>
                  
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
        <div id="about" className="px-6 py-16 bg-white">
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
                <div className="w-full h-48 rounded-lg shadow-sm overflow-hidden">
                  <img src={temp1Image} alt="Financial planning" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-48 rounded-lg shadow-sm overflow-hidden">
                  <img src={temp2Image} alt="Investment management" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-48 rounded-lg shadow-sm overflow-hidden">
                  <img src={temp3Image} alt="Business consulting" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-48 rounded-lg shadow-sm overflow-hidden">
                  <img src={temp4Image} alt="Procurement services" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 bg-white">
                <CardContent className="p-0">
                  <TrendingUp className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Financial Planning</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive financial planning strategies tailored to your business needs and long-term goals.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white">
                <CardContent className="p-0">
                  <Briefcase className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Investment Management</h3>
                  <p className="text-gray-600 text-sm">
                    Expert investment portfolio management with risk assessment and growth optimization.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white">
                <CardContent className="p-0">
                  <Target className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Procurement Services</h3>
                  <p className="text-gray-600 text-sm">
                    Strategic procurement solutions to optimize costs and improve operational efficiency.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white">
                <CardContent className="p-0">
                  <MessageSquare className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Business Consulting</h3>
                  <p className="text-gray-600 text-sm">
                    Strategic business consulting to drive growth and improve market positioning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "John's financial planning expertise helped us increase our profitability by 40% in just one year."
                  </p>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">CEO, Tech Innovations</div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "Outstanding procurement services that saved us over $200K annually while improving quality."
                  </p>
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-sm text-gray-500">Operations Director, Global Manufacturing</div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "Professional, reliable, and results-driven. John exceeded all our expectations."
                  </p>
                  <div className="font-semibold">Emily Rodriguez</div>
                  <div className="text-sm text-gray-500">CFO, Healthcare Solutions</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="px-6 py-16 bg-gray-800 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-300">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-300">john@planright.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold">Office</div>
                      <div className="text-gray-300">123 Financial District<br />New York, NY 10004</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  ></textarea>
                  <button 
                    type="submit" 
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
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
            © 2025 Plan|right. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>
    );
  }

  if (templateSlug === "template-2") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="font-bold text-2xl">
              <span className="text-red-600">Plan</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-gray-900">right</span>
            </div>
            <nav className="hidden lg:flex space-x-8">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-700 hover:text-red-600 font-medium transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">About</a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">Services</a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">Contact</a>
            </nav>
          </div>
        </div>

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
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center">
                    Contact Us
                  </a>
                  <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center">
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

        <div id="contact" className="px-6 py-16 bg-gray-800 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-300">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-300">john@planright.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold">Office</div>
                      <div className="text-gray-300">123 Financial District<br />New York, NY 10004</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  ></textarea>
                  <button 
                    type="submit" 
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

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
            © 2025 Plan|right. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>
    );
  }

  if (templateSlug === "template-3") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`} style={{ scrollBehavior: 'smooth' }}>
        <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-xl text-gray-900">
                <span className="text-blue-600">Plan</span><span className="text-gray-400 font-thin mx-1">|</span><span className="text-gray-900">right</span>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-6 text-sm">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors font-medium">Home</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors font-medium">About</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors font-medium">Services</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors font-medium">Contact</a>
              </nav>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                Get Quote
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Trusted Financial Advisor
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Secure Your Financial
                <span className="text-blue-600 block">Future Today</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                John Smith provides comprehensive financial planning, investment management, and risk assessment services to protect and grow your wealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="border-2 border-blue-200 text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center">
                  View Services
                </a>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">$50M+</div>
                  <div className="text-sm text-gray-600">Assets Managed</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="John Smith" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                  />
                  <h3 className="text-xl font-bold text-gray-900">John Smith</h3>
                  <p className="text-blue-600 font-medium">Certified Financial Planner</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    15+ Years Experience
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    500+ Satisfied Clients
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Licensed & Insured
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Comprehensive Coverage
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                      <div className="text-sm text-gray-600">Client Satisfaction Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            © 2025 Plan|right. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-100 rounded-lg p-8 ${className}`}>
      <div className="text-center text-gray-500">Template Preview</div>
    </div>
  );
}