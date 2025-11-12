import { CheckCircle, Target, Users, GraduationCap, TrendingUp, Award, Users2, Lightbulb, MessageSquare, HeadphonesIcon, Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import EditModeOverlay from "./edit-mode-overlay";

interface Template13Props {
  className?: string;
  content?: {
    businessName: string | null;
    tagline: string | null;
    aboutUs: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
  };
  flexibleContent?: Record<string, string>;
  editMode?: boolean;
}

export default function Template13({ className = "", content, flexibleContent = {}, editMode = false }: Template13Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  
  const getValue = (key: string, defaultValue: string) => flexibleContent[key] ?? defaultValue;

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
    <>
      {editMode && <EditModeOverlay rootRef={rootRef} />}
      <div ref={rootRef} className={`bg-white ${className}`}>
        {/* Sticky Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer"
          >
            <div className="text-2xl font-bold text-gray-900" data-content-id="business-name">
              {getValue('business-name', content?.businessName || 'Delta Life Insurance')}
            </div>
            <div className="text-sm text-gray-600" data-content-id="business-tagline">
              {getValue('business-tagline', content?.tagline || 'A Premier Agency')}
            </div>
          </div>
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-8 text-gray-700">
            <a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className="hover:text-gray-900 cursor-pointer">Solutions</a>
            <a href="#training" onClick={(e) => handleSmoothScroll(e, 'training')} className="hover:text-gray-900 cursor-pointer">Training</a>
            <a href="#support" onClick={(e) => handleSmoothScroll(e, 'support')} className="hover:text-gray-900 cursor-pointer">Support</a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-gray-900 cursor-pointer">About</a>
          </div>
          <button 
            onClick={(e) => handleSmoothScroll(e, 'get-started-form')} 
            className="hidden md:block bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Get Started
          </button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Slide-out Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <div className="text-xl font-bold text-gray-900">{getValue('business-name', content?.businessName || 'Delta Life Insurance')}</div>
              <div className="text-sm text-gray-600">{getValue('business-tagline', content?.tagline || 'A Premier Agency')}</div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-6 space-y-6">
            <a 
              href="#solutions"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                handleSmoothScroll(e, 'solutions');
                setIsMobileMenuOpen(false);
              }}
            >
              Solutions
            </a>
            <a 
              href="#training"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                handleSmoothScroll(e, 'training');
                setIsMobileMenuOpen(false);
              }}
            >
              Training
            </a>
            <a 
              href="#support"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                handleSmoothScroll(e, 'support');
                setIsMobileMenuOpen(false);
              }}
            >
              Support
            </a>
            <a 
              href="#about"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                handleSmoothScroll(e, 'about');
                setIsMobileMenuOpen(false);
              }}
            >
              About
            </a>
            
            <div className="pt-4 border-t border-gray-200">
              <button 
                onClick={(e) => {
                  handleSmoothScroll(e, 'get-started-form');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-red-600 text-white px-4 py-3 rounded text-base font-medium hover:bg-red-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </>

      {/* Section 1: Hero Section - Exact match to screenshot */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content exactly as in screenshot */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight" data-content-id="hero-headline">
              {getValue('hero-headline', 'The Career Path You Have Always Wanted is Right Here!')}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8" data-content-id="hero-subheadline">
              {getValue('hero-subheadline', "Join Houston's premier insurance team and accelerate your career as an independent agent. At Delta Life, we provide the training, leads, support, and earning potential you need to thrive in the insurance industry—without the risk of going it alone.")}
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={(e) => handleSmoothScroll(e, 'get-started-form')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-base font-medium transition-colors"
              >
                Join Our Team
              </button>
              <button 
                onClick={(e) => handleSmoothScroll(e, 'about')}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded text-base font-medium transition-colors"
              >
                Why Choose Us
              </button>
            </div>
          </div>
          
          {/* Right side - Image exactly as in screenshot */}
          <div className="relative">
            <img 
              src={getValue('image-hero', '/attached_assets/plr-hiring1_1758661521233.jpg')}
              alt="Hero image" 
              className="w-full h-auto rounded-lg"
              data-content-id="image-hero"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Statistics Section - Exact match to screenshot */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-red-600 mb-4" data-content-id="stat1-value">{getValue('stat1-value', '78%')}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3" data-content-id="stat1-label">{getValue('stat1-label', 'Agent Success Rate')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed" data-content-id="stat1-description">
                {getValue('stat1-description', 'Our proven mentorship and ongoing support programs ensure agents thrive and maintain long-lasting, profitable careers.')}
              </p>
            </div>
            
            <div>
              <div className="text-6xl font-bold text-red-600 mb-4" data-content-id="stat2-value">{getValue('stat2-value', '67%')}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3" data-content-id="stat2-label">{getValue('stat2-label', 'Revenue Growth in Year One')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed" data-content-id="stat2-description">
                {getValue('stat2-description', 'New agents experience substantial earnings increases through our advanced training programs and exclusive lead systems.')}
              </p>
            </div>
            
            <div>
              <div className="text-6xl font-bold text-red-600 mb-4" data-content-id="stat3-value">{getValue('stat3-value', '85%')}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3" data-content-id="stat3-label">{getValue('stat3-label', 'Market Penetration')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed" data-content-id="stat3-description">
                {getValue('stat3-description', 'Wide-reaching market presence spanning numerous states with diverse product offerings and industry-leading commission structures.')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Why Top Agents Choose Delta Life */}
      <div id="about" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
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
      </div>

      {/* Section 4: Meet Mandy */}
      <div id="support" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Main heading and description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" data-content-id="agent-section-heading">
              {getValue('agent-section-heading', 'Meet Mandy')}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto" data-content-id="agent-section-subheading">
              {getValue('agent-section-subheading', "The leader behind Delta Life's success and your future mentor in building an exceptional insurance career.")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left side - Photo */}
            <div className="text-center">
              <img 
                src={getValue('image-agent', '/attached_assets/plr-hiring4_1758661521235.jpg')}
                alt="Licensed Agent" 
                className="w-[90%] h-auto mx-auto rounded-lg"
                data-content-id="image-agent"
              />
            </div>
            
            {/* Right side - Bio and achievements */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-2" data-content-id="agent-name">
                {getValue('agent-name', 'Mandy Johnson')}
              </h3>
              <p className="text-gray-600 mb-6" data-content-id="agent-subtitle">
                {getValue('agent-subtitle', 'Licensed Agent 15+ years')}
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-8" data-content-id="agent-bio">
                {getValue('agent-bio', "With over 15 years in the insurance industry, Mandy has built Delta Life into Houston's most successful independent marketing organization. Starting as a new agent herself, she understands the challenges you face and has developed the proven systems that have launched hundreds of successful insurance careers. Her passion for mentoring agents and building lasting relationships has made her one of the most respected leaders in the industry.")}
              </p>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Awards & Accomplishments</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Top Producer Award 2023</h5>
                      <p className="text-gray-600 text-sm">Leading regional performance in agent development and team growth</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Mentor of the Year 2022</h5>
                      <p className="text-gray-600 text-sm">Recognized for exceptional agent training and career development programs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Million Dollar Club</h5>
                      <p className="text-gray-600 text-sm">Five consecutive years achieving million-dollar team production</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Leadership Excellence Award</h5>
                      <p className="text-gray-600 text-sm">Honored for building the largest independent agent network in Texas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: 3 Steps to Maximize */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
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
      </div>

      {/* Section 6: Join the Team CTA - Dark Background */}
      <div className="py-20 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
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
      </div>

      {/* Section 7: Contact Form */}
      <div id="get-started-form" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                  <p className="text-gray-600" data-content-id="contact-phone">
                    {getValue('contact-phone', content?.phone || '(555) 123-4567')}
                  </p>
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
                  <p className="text-gray-600" data-content-id="contact-email">
                    {getValue('contact-email', content?.email || 'partners@deltalife.com')}
                  </p>
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
                  <p className="text-gray-600" data-content-id="contact-address">
                    {getValue('contact-address', content?.address || '123 Business Center Dr\nYour City, ST 12345')}
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
      </div>

      {/* Section 8: Footer */}
      <div className="py-12 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-12">
            {/* Left Column - Company Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-0">Delta Life Insurance</h3>
              <p className="text-gray-400 text-sm mb-6">A Premier Agency</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Delta Life is Houston's premier Independent Marketing Organization, dedicated to transforming ambitious professionals into thriving insurance entrepreneurs. We combine decades of industry expertise with cutting-edge technology, personalized mentorship, and comprehensive business development programs to ensure our partners not only succeed but build lasting, profitable enterprises that serve their communities with excellence.
              </p>
            </div>

            {/* Middle Column - Solutions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Solutions</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Agent Training</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Lead Generation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Technology Platform</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Mentorship</a></li>
              </ul>
            </div>

            {/* Right Column - Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">(555) 123-4567</p>
                <p className="text-gray-300 text-sm">partners@deltalife.com</p>
                <p className="text-gray-300 text-sm">
                  123 Business Center Dr<br />
                  Your City, ST 12345
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <p className="text-gray-400 text-sm">© 2025 Delta Life. All rights reserved.</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}