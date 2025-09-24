import { CheckCircle, Target, Users, DollarSign, TrendingUp, Award, Shield, Lightbulb, MessageSquare, HeadphonesIcon, Menu, X, Star, ArrowRight, Clock, Zap } from "lucide-react";
import { useState } from "react";

interface Template15Props {
  className?: string;
}

export default function Template15({ className = "" }: Template15Props) {
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
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
            >
              <div className="text-xl font-bold text-gray-900">Elite Insurance Group</div>
              <div className="text-xs text-red-600">Building Tomorrow's Leaders</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#opportunity" onClick={(e) => handleSmoothScroll(e, 'opportunity')} className="text-gray-600 hover:text-gray-900 font-medium">Opportunity</a>
              <a href="#benefits" onClick={(e) => handleSmoothScroll(e, 'benefits')} className="text-gray-600 hover:text-gray-900 font-medium">Benefits</a>
              <a href="#training" onClick={(e) => handleSmoothScroll(e, 'training')} className="text-gray-600 hover:text-gray-900 font-medium">Training</a>
              <a href="#success" onClick={(e) => handleSmoothScroll(e, 'success')} className="text-gray-600 hover:text-gray-900 font-medium">Success Stories</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={(e) => handleSmoothScroll(e, 'apply-form')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Apply Now
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
              <a href="#opportunity" onClick={(e) => { handleSmoothScroll(e, 'opportunity'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">Opportunity</a>
              <a href="#benefits" onClick={(e) => { handleSmoothScroll(e, 'benefits'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">Benefits</a>
              <a href="#training" onClick={(e) => { handleSmoothScroll(e, 'training'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">Training</a>
              <a href="#success" onClick={(e) => { handleSmoothScroll(e, 'success'); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 font-medium">Success Stories</a>
              <button 
                onClick={(e) => { handleSmoothScroll(e, 'apply-form'); setIsMobileMenuOpen(false); }}
                className="w-full bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-left"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center bg-red-800 bg-opacity-50 px-3 py-1 rounded-full text-sm mb-6">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span>Join the Top 1% of Insurance Professionals</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Turn Your Passion Into
                <span className="text-red-300"> Unlimited Income</span>
              </h1>
              
              <p className="text-xl text-red-100 mb-8 leading-relaxed">
                Build a thriving insurance career with Elite Insurance Group. We provide world-class training, unlimited earning potential, and the support system you need to achieve financial freedom.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'apply-form')}
                  className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors text-lg"
                >
                  Start Your Journey
                </button>
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'opportunity')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-900 transition-colors text-lg"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right Video */}
            <div className="relative flex justify-center">
              <div className="relative">
                <video 
                  className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-xl border-4 border-white"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                >
                  <source src="/attached_assets/celebration-awards-video.mp4" type="video/mp4" />
                  <source src="/attached_assets/celebration-awards-video.webm" type="video/webm" />
                  {/* Fallback image if video doesn't load */}
                  <img 
                    src="/attached_assets/stock_images/professional_busines_5a30cf17.jpg" 
                    alt="Professional Insurance Executive" 
                    className="w-full h-full object-cover rounded-full"
                  />
                  Your browser does not support the video tag.
                </video>
                {/* Badge */}
                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg px-4 py-3">
                  <h4 className="font-bold text-gray-900 text-sm">Success Stories</h4>
                  <p className="text-gray-600 text-xs">See Our Winners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600">Successful Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">$2M+</div>
              <div className="text-gray-600">Average Annual Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
              <div className="text-gray-600">Agent Retention Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">15</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Section */}
      <section id="opportunity" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Opportunity of a Lifetime</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join an industry that's growing faster than ever, with unlimited earning potential and the ability to help families protect their future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Unlimited Earning Potential</h3>
              <p className="text-gray-600 leading-relaxed">
                No salary caps. No income limits. Your earning potential is only limited by your ambition and drive to succeed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recession-Proof Industry</h3>
              <p className="text-gray-600 leading-relaxed">
                Insurance is always in demand. Build a stable career in an industry that continues to grow regardless of economic conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Meaningful Work</h3>
              <p className="text-gray-600 leading-relaxed">
                Help families protect their financial future while building your own. Make a real difference in people's lives every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose Elite Insurance Group?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Training Program</h3>
                    <p className="text-gray-600">8-week intensive training covering sales, products, and business development</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Warm Lead System</h3>
                    <p className="text-gray-600">Qualified leads delivered to you daily - no cold calling required</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Advanced Technology</h3>
                    <p className="text-gray-600">CRM system, mobile app, and digital tools to maximize your efficiency</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ongoing Support</h3>
                    <p className="text-gray-600">Dedicated mentorship and coaching to ensure your long-term success</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-red-600 rounded-lg p-1">
                <div className="bg-white rounded-lg p-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">$150K+</div>
                    <div className="text-gray-600 mb-4">Average First Year Income</div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                      <div className="bg-red-600 h-3 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-sm text-gray-500">Based on our top performing new agents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">World-Class Training Program</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive 8-week program transforms ambitious individuals into insurance industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Fundamentals</h3>
              <p className="text-gray-600 text-sm">Learn insurance basics, products, and market dynamics</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sales Mastery</h3>
              <p className="text-gray-600 text-sm">Master consultative selling and relationship building</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Development</h3>
              <p className="text-gray-600 text-sm">Build your personal brand and referral network</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced Strategies</h3>
              <p className="text-gray-600 text-sm">Learn advanced techniques for high-value clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success" className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600">See what our agents have achieved</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-red-600">JS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Jessica Smith</div>
                  <div className="text-sm text-gray-600">Agent since 2022</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I went from struggling financially to earning six figures in my first year. The training and support here is incredible."
              </p>
              <div className="text-red-600 font-semibold">$180K First Year</div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-red-600">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                  <div className="text-sm text-gray-600">Agent since 2021</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Elite Insurance Group gave me the tools and confidence to build a thriving business. I'm finally financially free."
              </p>
              <div className="text-red-600 font-semibold">$250K Annual Income</div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-red-600">AL</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Amanda Lee</div>
                  <div className="text-sm text-gray-600">Agent since 2020</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The lead system and training program here are unmatched. I've built an amazing career helping families."
              </p>
              <div className="text-red-600 font-semibold">Top Producer 2023</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Join Elite Insurance Group today and start building the career you've always dreamed of. Unlimited income potential, comprehensive training, and ongoing support await.
          </p>
          <button 
            onClick={(e) => handleSmoothScroll(e, 'apply-form')}
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors"
          >
            Apply Now - Limited Positions Available
          </button>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Start Your Journey<br />
              To Financial Freedom
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Take the first step towards unlimited earning potential. Our team will review your application and contact you within 24 hours to discuss this exciting opportunity.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-red-600 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) 789-0123</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-red-600 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">careers@eliteinsurance.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-red-600 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Office</h3>
                  <p className="text-gray-600">
                    456 Success Drive<br />
                    Elite City, ST 54321
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Apply for Your Position</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Your first name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Your last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Employment Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select your status</option>
                    <option value="employed">Currently Employed</option>
                    <option value="seeking">Seeking New Opportunity</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why are you interested in insurance sales?</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us what motivates you and why you're interested in this opportunity..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-xl font-bold mb-0">Elite Insurance Group</div>
              <p className="text-gray-400 text-sm mb-4">Building Tomorrow's Leaders</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Elite Insurance Group is the premier destination for ambitious professionals looking to build successful careers in the insurance industry.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#opportunity" onClick={(e) => handleSmoothScroll(e, 'opportunity')} className="text-gray-300 hover:text-white transition-colors">Opportunity</a></li>
                <li><a href="#benefits" onClick={(e) => handleSmoothScroll(e, 'benefits')} className="text-gray-300 hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#training" onClick={(e) => handleSmoothScroll(e, 'training')} className="text-gray-300 hover:text-white transition-colors">Training</a></li>
                <li><a href="#success" onClick={(e) => handleSmoothScroll(e, 'success')} className="text-gray-300 hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>(555) 789-0123</p>
                <p>careers@eliteinsurance.com</p>
                <p>456 Success Drive<br />Elite City, ST 54321</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 Elite Insurance Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}