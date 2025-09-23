import { CheckCircle, Target, Users, GraduationCap, TrendingUp, Award, Users2, Lightbulb, MessageSquare, HeadphonesIcon, Menu, X, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Template14Props {
  className?: string;
}

export default function Template14({ className = "" }: Template14Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 80; // Account for sticky header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`bg-white ${className}`}>
      {/* Header - Matching mockup design */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
            >
              <div className="text-xl font-bold text-gray-900">Delta Life Insurance</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-600 hover:text-gray-900 font-medium">About</a>
              <a href="#training" onClick={(e) => handleSmoothScroll(e, 'training')} className="text-gray-600 hover:text-gray-900 font-medium">Training</a>
              <a href="#support" onClick={(e) => handleSmoothScroll(e, 'support')} className="text-gray-600 hover:text-gray-900 font-medium">Team</a>
              <a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className="text-gray-600 hover:text-gray-900 font-medium">Career Support</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Join Our Team
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <a href="#about" onClick={(e) => { handleSmoothScroll(e, 'about'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">About</a>
              <a href="#training" onClick={(e) => { handleSmoothScroll(e, 'training'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">Training</a>
              <a href="#support" onClick={(e) => { handleSmoothScroll(e, 'support'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">Team</a>
              <a href="#solutions" onClick={(e) => { handleSmoothScroll(e, 'solutions'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">Career Support</a>
              <button 
                onClick={(e) => { handleSmoothScroll(e, 'get-started-form'); setIsMobileMenuOpen(false); }}
                className="w-full bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-left"
              >
                Join Our Team
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Matching screenshot layout */}
      <section className="bg-gray-50 py-16 lg:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full opacity-30 transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-200 rounded-full opacity-20 transform translate-x-16 translate-y-16"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:pr-8">
              <div className="text-sm text-gray-600 mb-6 font-medium">
                500+ trusted partners
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Recruitment process with 
                <span className="text-red-600"> smart solutions.</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Delta Life is your trusted partner in recruitment, offering personalized career solutions that connect top talent with the right opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
                  className="bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  Free consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-white transition-colors flex items-center justify-center"
                >
                  Explore our services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Professional Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
                {/* Top badge */}
                <div className="absolute -top-4 left-8">
                  <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Top rated specialist
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left side - Stats */}
                  <div className="bg-red-600 text-white p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">
                      Successfully connected over 1,000 businesses with top talent.
                    </h3>
                    <p className="text-red-100 text-sm mb-4">
                      Reducing hiring time by 50% and improving team efficiency across industries.
                    </p>
                  </div>
                  
                  {/* Right side - Profile */}
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <img 
                        src="/attached_assets/plr-hiring4_1758661521235.jpg" 
                        alt="Mandy Johnson" 
                        className="w-32 h-32 rounded-2xl object-cover mx-auto"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">Mandy Johnson</h4>
                    <p className="text-gray-600 text-sm">Talent Acquisition Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partner logos */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              <div className="text-gray-400 font-medium text-sm">logoipsum</div>
              <div className="text-gray-400 font-medium text-sm">Logoipsum</div>
              <div className="text-gray-400 font-medium text-sm">Logoipsum</div>
              <div className="text-gray-400 font-medium text-sm">Logoipsum</div>
              <div className="text-gray-400 font-medium text-sm">Logoipsum</div>
              <div className="text-gray-400 font-medium text-sm">logo ipsum</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Matching mockup */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform designed to simplify and enhance the hiring process.</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our proven system helps agents build sustainable, profitable insurance businesses from day one.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-50 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">78%</h3>
              <p className="text-gray-600">Agent Success Rate</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-red-50 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">67%</h3>
              <p className="text-gray-600">Revenue Growth</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-red-50 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">85%</h3>
              <p className="text-gray-600">Market Penetration</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-red-50 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section - Matching mockup */}
      <section id="training" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                🎓 Training & Development
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Platform that matches businesses with top-tier talent.</h2>
              <p className="text-lg text-gray-600 mb-8">We provide comprehensive training and ongoing support to ensure your success in the insurance industry.</p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-lg p-2 mt-1">
                    <GraduationCap className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sales Training</h3>
                    <p className="text-gray-600">Master proven sales techniques and objection handling strategies.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-lg p-2 mt-1">
                    <Lightbulb className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Product Knowledge</h3>
                    <p className="text-gray-600">Deep understanding of insurance products and market positioning.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-lg p-2 mt-1">
                    <Target className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Technology Training</h3>
                    <p className="text-gray-600">Learn to leverage cutting-edge tools and CRM systems effectively.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
                className="mt-8 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Learn More
              </button>
            </div>

            {/* Right Image */}
            <div>
              <img 
                src="/attached_assets/plr-hiring2_1758661521234.jpg" 
                alt="Team training session" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career Support Section */}
      <section id="solutions" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div>
              <img 
                src="/attached_assets/plr-hiring3_1758661521235.jpg" 
                alt="Career support and resources" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Right Content */}
            <div>
              <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                💼 Career Support
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Efficient process to connect businesses with the best talent.</h2>
              <p className="text-lg text-gray-600 mb-8">Our comprehensive support system ensures you have everything needed to build a successful insurance career.</p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-lg p-2 mt-1">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Warm Lead Pipeline</h3>
                    <p className="text-gray-600">Pre-qualified leads delivered directly to you with automated follow-up support.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-lg p-2 mt-1">
                    <MessageSquare className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Marketing Resources</h3>
                    <p className="text-gray-600">Professional marketing materials and company-branded digital assets at your disposal.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-lg p-2 mt-1">
                    <HeadphonesIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ongoing Mentorship</h3>
                    <p className="text-gray-600">Regular coaching and mentorship from experienced industry professionals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Mandy Section - Professional layout matching mockup */}
      <section id="support" className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Efficient process to connect businesses with the best talent.</h2>
              <p className="text-red-100 text-lg mb-8 leading-relaxed">
                With over 15 years in the insurance industry, Mandy has built Delta Life into Houston's most successful independent marketing organization. Her proven systems have launched hundreds of successful insurance careers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-2">Agent Development</h3>
                  <p className="text-red-100 text-sm">Comprehensive training and mentorship programs designed for success.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Proven Results</h3>
                  <p className="text-red-100 text-sm">78% success rate with our comprehensive support system.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Industry Leadership</h3>
                  <p className="text-red-100 text-sm">15+ years of experience building successful insurance careers.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Personal Mentorship</h3>
                  <p className="text-red-100 text-sm">Direct access to Mandy's expertise and guidance.</p>
                </div>
              </div>

              <button 
                onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Meet Our Team
              </button>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img 
                src="/attached_assets/plr-hiring4_1758661521235.jpg" 
                alt="Mandy Johnson, Licensed Agent" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 text-gray-900">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">Mandy Johnson</div>
                  <div className="text-sm text-gray-600">Licensed Agent 15+ years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Matching mockup */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We help your business grow by connecting you with the right talent.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg text-gray-900 mb-6">
                  "Joining Delta Life was the best career decision I ever made. The training, support, and mentorship provided by Mandy and her team transformed me from a struggling agent into a top producer."
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-medium">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">John Davis</div>
                    <div className="text-gray-600 text-sm">Senior Agent, Delta Life</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stats */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">500+</div>
                    <div className="text-gray-600">Successful Agents Trained</div>
                  </div>
                  <div className="bg-red-100 rounded-lg p-3">
                    <Users className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">$50M+</div>
                    <div className="text-gray-600">Annual Team Production</div>
                  </div>
                  <div className="bg-red-100 rounded-lg p-3">
                    <TrendingUp className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Matching mockup */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">You're in good company</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful agents who have built thriving careers with Delta Life Insurance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-medium">SR</span>
              </div>
              <h3 className="font-semibold text-gray-900">Sarah Rodriguez</h3>
              <p className="text-gray-600 text-sm">Top Producer 2023</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-medium">MJ</span>
              </div>
              <h3 className="font-semibold text-gray-900">Michael Johnson</h3>
              <p className="text-gray-600 text-sm">Regional Manager</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-medium">LW</span>
              </div>
              <h3 className="font-semibold text-gray-900">Lisa Wang</h3>
              <p className="text-gray-600 text-sm">Million Dollar Club</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="get-started-form" className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Take the first step toward building your dream team.</h2>
            <p className="text-gray-300 text-lg">Ready to start your insurance career? Get in touch with us today.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-gray-900">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Select your experience level</option>
                  <option>No experience</option>
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tell us about your career goals..."
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-xl font-bold mb-0">Delta Life Insurance</div>
              <p className="text-gray-400 text-sm mb-4">A Premier Agency</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Delta Life is Houston's premier Independent Marketing Organization, dedicated to transforming ambitious professionals into thriving insurance entrepreneurs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#training" onClick={(e) => handleSmoothScroll(e, 'training')} className="text-gray-300 hover:text-white transition-colors">Training</a></li>
                <li><a href="#support" onClick={(e) => handleSmoothScroll(e, 'support')} className="text-gray-300 hover:text-white transition-colors">Team</a></li>
                <li><a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className="text-gray-300 hover:text-white transition-colors">Career Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>(555) 123-4567</p>
                <p>partners@deltalife.com</p>
                <p>123 Insurance Way<br />Houston, TX 77001</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 Delta Life Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}