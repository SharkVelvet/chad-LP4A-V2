import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, GraduationCap, Home, TrendingUp, FileText, Clock, Users, Award, Star, User, Briefcase, Target, MessageSquare, CheckCircle, Car, Trophy } from "lucide-react";
import { useTemplateEditor } from "./use-template-editor";
import { EditableImage } from "./editable-media";

interface Template11Props {
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
  hiddenSections?: string[];
  editMode?: boolean;
  onToggleSectionVisibility?: (sectionId: string) => void;
}

export default function Template11({ className = "", content, flexibleContent = {}, hiddenSections, editMode, onToggleSectionVisibility }: Template11Props) {
  const { rootRef, isSectionHidden, overlays } = useTemplateEditor({ editMode, hiddenSections, onToggleSectionVisibility });

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
      <div ref={rootRef} className={`bg-white ${className}`}>
        {overlays}
        {/* Header */}
        <header className="relative bg-gray-50">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-gray-900 text-xl font-bold">Life Insurance Pro</div>
            </div>
            <nav className="hidden md:flex space-x-8 text-gray-700 text-sm">
              <a href="#about" className="hover:text-red-600 transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About Luke</a>
              <a href="#life-insurance" className="hover:text-red-600 transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('life-insurance')?.scrollIntoView({ behavior: 'smooth' }); }}>Life Insurance</a>
              <a href="#health-insurance" className="hover:text-red-600 transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('health-insurance')?.scrollIntoView({ behavior: 'smooth' }); }}>Health Insurance</a>
              <a href="#annuities" className="hover:text-red-600 transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('annuities')?.scrollIntoView({ behavior: 'smooth' }); }}>Annuities</a>
            </nav>
            <button 
              className="bg-red-600 text-white px-6 py-2 text-sm hover:bg-red-700 transition-all cursor-pointer"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] overflow-hidden" style={{background: `linear-gradient(to right, #f9fafb, #f9fafb)`}}>
          <div className="absolute inset-0">
            <EditableImage 
              contentId="hero-image"
              src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Family portrait with parents and children" 
              className="w-full h-full object-cover opacity-70"
              getValue={getValue}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-8 h-full flex flex-col justify-center items-center text-center pt-20">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-content-id="hero-heading">
              {getValue('hero-heading', "Protecting your family's financial future.")}
            </h1>
            <p className="text-xl text-white opacity-90 mb-8 max-w-2xl" data-content-id="hero-description">
              {getValue('hero-description', "Get comprehensive and personalized life insurance coverage tailored specifically for your family's needs and budget.")}
            </p>
          </div>
        </div>

        {/* Meet Your Agent Section */}
        {(!isSectionHidden('about') || editMode) && (
        <div id="about" data-section-id="about" className="py-20 bg-gray-50" style={isSectionHidden('about') && editMode ? { opacity: 0.5 } : {}}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8" data-content-id="about-heading">
                  {getValue('about-heading', `Meet ${content?.businessName || 'Luke Smith'}`)}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8" data-content-id="about-paragraph">
                  {getValue('about-paragraph', 'With over 15 years of experience in life insurance, health insurance, and annuities, Luke has helped thousands of families secure their financial future. As a licensed insurance professional, he specializes in creating customized protection strategies and retirement solutions that fit your unique needs and budget.')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700" data-content-id="credential-1">
                      {getValue('credential-1', 'Licensed Life & Health Insurance Agent')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700" data-content-id="credential-2">
                      {getValue('credential-2', 'Certified Annuity Specialist')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700" data-content-id="credential-3">
                      {getValue('credential-3', '15+ Years Insurance Experience')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700" data-content-id="credential-4">
                      {getValue('credential-4', 'Specializes in Family Protection & Retirement Planning')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:order-first">
                <div className="text-center">
                  <EditableImage 
                    contentId="about-agent-image"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Luke Smith - Life Insurance Professional" 
                    className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
                    getValue={getValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Our Approach Section */}
        <div className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8" data-content-id="approach-heading">
              {getValue('approach-heading', 'Our comprehensive approach')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto" data-content-id="approach-description">
              {getValue('approach-description', "We provide a complete insurance portfolio including life insurance (term, whole, and universal life), health insurance plans for individuals and families, and annuities for retirement planning. Our holistic approach ensures you have comprehensive protection today and guaranteed income for tomorrow, all tailored to your family's specific needs and budget.")}
            </p>
            <button className="bg-red-600 text-white px-8 py-3 hover:bg-red-700 transition-all" data-content-id="approach-cta-button">
              {getValue('approach-cta-button', 'Get Your Insurance Quote')}
            </button>
          </div>
        </div>




        {/* Life Insurance Section */}
        {(!isSectionHidden('life-insurance') || editMode) && (
        <div id="life-insurance" data-section-id="life-insurance" className="py-20 bg-white" style={isSectionHidden('life-insurance') && editMode ? { opacity: 0.5 } : {}}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6" data-content-id="life-insurance-heading">
                  {getValue('life-insurance-heading', 'Life Insurance Protection')}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8" data-content-id="life-insurance-description">
                  {getValue('life-insurance-description', "Comprehensive life insurance coverage to protect your family's financial future. Choose from term life for affordable temporary coverage, whole life for permanent protection with cash value, or universal life for flexible premiums and death benefits.")}
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Term Life Insurance - Affordable temporary coverage</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Whole Life Insurance - Permanent coverage with cash value</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Universal Life Insurance - Flexible premiums and benefits</span>
                  </div>
                </div>
                <button className="bg-red-600 text-white px-8 py-3 hover:bg-red-700 transition-all">
                  Contact Us
                </button>
              </div>
              <div>
                <EditableImage 
                  contentId="life-insurance-image"
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Family life insurance protection" 
                  className="w-full h-96 object-cover rounded-lg"
                  getValue={getValue}
                />
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Health Insurance Section */}
        {(!isSectionHidden('health-insurance') || editMode) && (
        <div id="health-insurance" data-section-id="health-insurance" className="py-20 bg-gray-50" style={isSectionHidden('health-insurance') && editMode ? { opacity: 0.5 } : {}}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <EditableImage 
                  contentId="health-insurance-image"
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Older couple with healthcare professional" 
                  className="w-full h-96 object-cover rounded-lg"
                  getValue={getValue}
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6" data-content-id="health-insurance-heading">
                  {getValue('health-insurance-heading', 'Health Insurance Coverage')}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8" data-content-id="health-insurance-description">
                  {getValue('health-insurance-description', "Quality health insurance plans to keep you and your family covered with comprehensive medical benefits. From individual plans to family coverage and Medicare supplements, we'll find the right health insurance solution for your needs.")}
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Individual Health Plans - Personalized coverage options</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Family Coverage - Comprehensive family health plans</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Medicare Supplements - Enhanced Medicare coverage</span>
                  </div>
                </div>
                <button className="bg-red-600 text-white px-8 py-3 hover:bg-red-700 transition-all">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Annuities Section */}
        {(!isSectionHidden('annuities') || editMode) && (
        <div id="annuities" data-section-id="annuities" className="py-20 bg-white" style={isSectionHidden('annuities') && editMode ? { opacity: 0.5 } : {}}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Retirement<br/>
                  Annuities
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Secure your retirement with annuity products that provide guaranteed income and financial stability. Choose from fixed annuities for guaranteed returns, variable annuities for growth potential, or indexed annuities for protected growth tied to market performance.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Fixed Annuities - Guaranteed returns and income</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Variable Annuities - Growth potential with investment options</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">✓</span>
                    <span className="text-gray-700">Indexed Annuities - Protected growth tied to market performance</span>
                  </div>
                </div>
                <button className="bg-red-600 text-white px-8 py-3 hover:bg-red-700 transition-all">
                  Contact Us
                </button>
              </div>
              <div>
                <EditableImage 
                  contentId="annuities-image"
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Retirement annuity planning" 
                  className="w-full h-96 object-cover rounded-lg"
                  getValue={getValue}
                />
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Insurance Services Section */}
        <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Our Complete Insurance Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-gray-50 p-4 sm:p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Life Insurance</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive life insurance coverage to protect your family's financial future and provide peace of mind.
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
              </div>
              
              <div className="bg-gray-50 p-4 sm:p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Health Insurance</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Quality health insurance plans to keep you and your family covered with comprehensive medical benefits.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Individual Plans
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Family Coverage
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Medicare Supplements
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 sm:p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Annuities</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Secure your retirement with annuity products that provide guaranteed income and financial stability.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Fixed Annuities
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Variable Annuities
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-600 mr-2">✓</span>
                    Indexed Annuities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Contact Luke Today</h2>
            <p className="text-lg text-gray-600 mb-12">Ready to secure your family's future? Let's discuss your life insurance options.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Office Location</h4>
                <p className="text-gray-600">123 Insurance Way<br/>Suite 200<br/>Your City, ST 12345</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Phone</h4>
                <p className="text-gray-600">(555) 123-4567<br/>Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-600">luke@lifeinsurancepro.com<br/>quotes@lifeinsurancepro.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-8 text-center">
            {/* Navigation Links */}
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Why We Serve</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>

            {/* Company Branding */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-red-500 mb-2">Luke Smith</h3>
              <p className="text-gray-400 mb-4">lifeinsurancepro.com</p>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Professional insurance services with a personal touch. Your family's protection is our priority.
              </p>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-600 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <div className="mb-4 md:mb-0">
                  <span>© 2025 Luke Smith. All rights reserved. | </span>
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <span> | </span>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
                <div>
                  <span>Built by landingpagesforagents.com</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}
