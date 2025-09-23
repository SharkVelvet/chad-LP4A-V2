import { CheckCircle, Target, Users, GraduationCap, TrendingUp, Award, Users2, Lightbulb, MessageSquare, HeadphonesIcon, Menu, X, Star, ArrowRight, Clock, Zap } from "lucide-react";
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
              <div className="text-xs text-gray-600">A Premier Insurance Agency</div>
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
                78% agent success rate
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                The Career Path You Have Always Wanted is 
                <span className="text-red-600"> Right Here!</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join Houston's premier insurance team and accelerate your career as an independent agent. At Delta Life, we provide the training, leads, support, and earning potential you need to thrive in the insurance industry—without the risk of going it alone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
                  className="bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-white transition-colors flex items-center justify-center"
                >
                  Why Choose Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Professional Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left side - Stats */}
                  <div className="bg-red-600 text-white p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">
                      Successfully launched hundreds of insurance careers with proven systems.
                    </h3>
                    <p className="text-red-100 text-sm mb-4">
                      Our mentorship and support programs ensure agents thrive with 78% success rate and ongoing career development.
                    </p>
                  </div>
                  
                  {/* Right side - Profile with larger image */}
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <img 
                        src="/attached_assets/plr-hiring4_1758661521235.jpg" 
                        alt="Mandy Johnson" 
                        className="w-64 h-64 rounded-2xl object-cover mx-auto"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">Mandy Johnson</h4>
                    <p className="text-gray-600 text-sm">Licensed Agent 15+ years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section - Matching mockup with insurance content */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gray-200 rounded-r-full opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main heading and description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Platform designed to simplify<br />
              and enhance the hiring process.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              With personalized solutions tailored to your business needs, we connect you with the best talent quickly and efficiently, helping you build stronger, more effective teams.
            </p>
            
            <button 
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-base font-medium transition-colors inline-flex items-center space-x-2"
            >
              <span>About Delta Life</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tailored Solutions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Custom recruitment strategies designed for your unique business needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Faster Hiring</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Streamlined processes that cut hiring time by 30%.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Access to Top Talent</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with highly qualified candidates across industries.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Effortless Integration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Seamlessly integrate our platform with your existing HR tools for a hiring experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Why Top Agents Choose Delta Life */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main heading and description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Top Agents Choose Delta Life</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              We provide everything you need to accelerate your insurance career, from comprehensive training and warm leads to ongoing mentorship and cutting-edge technology support.
            </p>
          </div>

          {/* Training Programs Section */}
          <div id="training" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Image */}
            <div>
              <img 
                src="/attached_assets/plr-hiring2_1758661521234.jpg" 
                alt="Team meeting and collaboration" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Right side - Training Programs */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-6">Comprehensive Training Programs</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Sales Training</h4>
                    <p className="text-gray-600">Master proven sales techniques and objection handling strategies.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Product Knowledge</h4>
                    <p className="text-gray-600">Deep understanding of insurance products and market positioning.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Technology Training</h4>
                    <p className="text-gray-600">Learn to leverage cutting-edge tools and CRM systems effectively.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Resources Section */}
          <div id="solutions" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Resources */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-6">Advanced Resources & Career Support</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Warm Lead Pipeline</h4>
                    <p className="text-gray-600">Pre-qualified leads delivered directly to you with automated follow-up support.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Marketing Resources</h4>
                    <p className="text-gray-600">Professional marketing materials and company-branded digital assets at your disposal.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <HeadphonesIcon className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Mentorship</h4>
                    <p className="text-gray-600">Regular coaching and mentorship from experienced industry professionals.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div>
              <img 
                src="/attached_assets/plr-hiring3_1758661521235.jpg" 
                alt="Overhead view of team collaboration" 
                className="w-full h-auto rounded-lg"
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

      {/* How It Works Section - Matching mockup with red background */}
      <section id="support" className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* How it works label */}
          <div className="mb-8">
            <span className="text-red-200 text-sm font-medium uppercase tracking-wide">How it works</span>
          </div>

          {/* Main heading and description */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 max-w-2xl">
              Efficient process to connect<br />
              businesses with the best talent.
            </h2>
            <p className="text-red-100 text-lg leading-relaxed max-w-2xl">
              We work closely with you to understand your unique needs, culture, and hiring goals.<br />
              Using this insight, we tailor a recruitment strategy that targets the right candidates.
            </p>
          </div>

          {/* 3 Steps Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Step 1 */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  1
                </div>
                <div className="h-px bg-red-400 flex-1"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Understand Your Needs</h3>
              <p className="text-red-100 text-sm leading-relaxed">
                We begin by working closely with you to understand your business, culture, and specific hiring requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  2
                </div>
                <div className="h-px bg-red-400 flex-1"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Recruitment Strategy</h3>
              <p className="text-red-100 text-sm leading-relaxed">
                Based on your unique needs, we craft a personalized recruitment strategy designed to attract the best talent.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Hiring Process</h3>
              <p className="text-red-100 text-sm leading-relaxed">
                Using our platform's advanced tools, we match you with top candidates and integrate the process with your HR systems.
              </p>
            </div>
          </div>

          {/* Image Section with Overlay */}
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="/attached_assets/plr-business-office_1758665354704.jpg" 
              alt="Professional business team collaboration" 
              className="w-full h-96 object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Get started with Delta Life today and<br />
                  discover a smarter, faster way to hire.
                </h3>
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
                  className="bg-white text-red-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                >
                  <span>Find your talent</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps to Maximize Section - Matching Template 13 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main heading and description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">3 steps to maximize</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Our proven three-step process helps agents build sustainable, profitable insurance businesses from day one.
            </p>
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Training Program</h3>
              <p className="text-gray-600 leading-relaxed">
                Start with our comprehensive 30-day training program covering sales techniques, product knowledge, and business development strategies.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Launch with Lead Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Begin selling immediately with our qualified lead system and ongoing mentorship from experienced agents in your area.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scale and Build Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Expand your business by building your own team of agents and creating multiple revenue streams with our proven systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Matching Template 13 */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the team that puts your<br />
            success first
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Take the first step toward building the insurance business you've always dreamed about. Our team is standing by to help you get started.
          </p>
          <button 
            onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded text-base font-medium transition-colors"
          >
            Join the Team
          </button>
        </div>
      </section>

      {/* Contact Form Section - Matching Template 13 */}
      <section id="get-started-form" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Interested in the<br />
              opportunity of a<br />
              lifetime?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Take the first step toward building your dream insurance business. Our team is ready to help you succeed.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-red-600 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
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
                  <p className="text-gray-600">partners@deltalife.com</p>
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
                    123 Business Center Dr<br />
                    Your City, ST 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get Started Today</h3>
              
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your experience</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your background in insurance or sales..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  Start My Journey
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