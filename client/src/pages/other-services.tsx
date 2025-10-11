import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import designersImage from "@assets/lpfa-designers_1757289648427.png";
import logoDesignImage from "@assets/lp4a-logo-design_1757611811508.jpg";
import printDesignImage from "@assets/lp4a-print-design_1757611869956.jpg";

export default function OtherServices() {
  const [, setLocation] = useLocation();

  // Set page title
  useEffect(() => {
    document.title = 'Other Services - Professional Landing Pages for Insurance Agents';
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Header Menu */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo on Left */}
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/')}
            >
              <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>

            {/* Menu Items in Middle */}
            <nav className="hidden md:flex items-center space-x-8">
              <a onClick={() => setLocation('/template-selection')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">View Templates</a>
              <a onClick={() => setLocation('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Websites</a>
              <a onClick={() => setLocation('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
              <a onClick={() => setLocation('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
            </nav>

            {/* Get Started Button on Right */}
            <Button 
              className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => setLocation('/template-selection')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Additional Services & How It Works Section */}
      <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white">
        {/* Additional Services */}
        <div className="pt-20 pb-8 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Need something beyond our templates? We create Custom Websites, Custom Logos, Print Material, and specialized solutions for Agents.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-8 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1050px' }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <img 
                  src={designersImage}
                  alt="Design team at work"
                  className="w-full object-cover max-h-[220px] lg:max-h-none lg:h-[739px]"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-orange-400"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-pink-400"></div>
            </div>

            {/* Right side - Steps */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Custom Website Design</h2>
                <p className="text-lg text-gray-600">Don't see a template that you like? Want something a little more? Our team is happy to help you build a custom solution, here is how it works.</p>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Share your vision</h3>
                    <p className="text-gray-600 mb-3">
                      Tell us exactly what you want. Share your brand colors, style preferences, and unique business requirements that templates can't capture.
                    </p>
                    <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2. We design from scratch</h3>
                    <p className="text-gray-600 mb-3">
                      Our designers create a completely custom website built specifically for your insurance agency, with unique layouts and features.
                    </p>
                    <div className="w-16 h-1 rounded-full bg-orange-400"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                      <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Stand out completely</h3>
                    <p className="text-gray-600 mb-3">
                      Launch a one-of-a-kind website that perfectly represents your brand and sets you apart from every other insurance agent.
                    </p>
                    <div className="w-16 h-1 rounded-full bg-pink-400"></div>
                  </div>
                </div>
              </div>

              {/* Call to Action Button - Left Aligned */}
              <div className="mt-8 flex justify-start">
                <Button 
                  size="lg"
                  className="px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/services')}
                >
                  Get Custom Website Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Logo and Brand Creation Section - Flipped Layout */}
    <div className="bg-white py-20">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ maxWidth: '1050px', width: '100%' }}
        >
          {/* Image first for mobile, then ordered second on desktop */}
          <div className="relative lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={logoDesignImage}
                alt="Logo design and branding materials"
                className="w-full h-auto object-cover max-h-[220px] lg:max-h-none"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-orange-400"></div>
          </div>

          {/* Content ordered first on desktop */}
          <div className="lg:order-1">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Logo and Brand Creation</h2>
              <p className="text-lg text-gray-600">Build a powerful brand identity that clients remember!</p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                    <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Discover your brand identity</h3>
                  <p className="text-gray-600 mb-3">
                    We explore your agency's personality, values, and target audience to create a brand foundation that truly represents who you are.
                  </p>
                  <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                    <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Design your perfect logo</h3>
                  <p className="text-gray-600 mb-3">
                    Our designers create multiple logo concepts that capture your brand essence, giving you a professional mark that stands out in the marketplace.
                  </p>
                  <div className="w-16 h-1 rounded-full bg-orange-400"></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                    <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Launch your brand everywhere</h3>
                  <p className="text-gray-600 mb-3">
                    Get your complete brand package including business cards, letterheads, and digital assets to present a consistent, professional image across all touchpoints.
                  </p>
                  <div className="w-16 h-1 rounded-full bg-pink-400"></div>
                </div>
              </div>
            </div>

            {/* Call to Action Button - Left Aligned */}
              <div className="mt-8 flex justify-start">
                <Button 
                  size="lg"
                  className="px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/services')}
                >
                  Let's Chat about Your Brand
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>

    {/* Print Design Section */}
    <div className="bg-gray-50 py-20">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ maxWidth: '1050px', width: '100%' }}
        >
          {/* Left side - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={printDesignImage}
                alt="Print design materials and branding"
                className="w-full h-auto object-cover max-h-[220px] lg:max-h-none"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-orange-400"></div>
          </div>

          {/* Right side - Steps */}
          <div>
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Print Design</h2>
              <p className="text-lg text-gray-600">Need professional print materials? We create stunning designs that make you stand out!</p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                    <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Tell us what you need</h3>
                  <p className="text-gray-600 mb-3">
                    From door flyers and mail pieces to business cards, brochures, t-shirt designs, hat designs, and garments - share your print design needs and we'll create something amazing.
                  </p>
                  <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#6458AF' }}></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                    <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2. We design and perfect</h3>
                  <p className="text-gray-600 mb-3">
                    Our team creates high-quality print designs that match your brand and deliver your message with maximum impact and professionalism.
                  </p>
                  <div className="w-16 h-1 rounded-full bg-orange-400"></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                    <svg className="w-6 h-6" style={{ color: '#6458AF' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Ready to print and impress</h3>
                  <p className="text-gray-600 mb-3">
                    Receive print-ready files optimized for professional printing, ensuring your materials look crisp and impressive every time.
                  </p>
                  <div className="w-16 h-1 rounded-full bg-pink-400"></div>
                </div>
              </div>

              {/* Call to Action Button - Left Aligned */}
              <div className="mt-8 flex justify-start">
                <Button 
                  size="lg"
                  className="px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => setLocation('/services')}
                >
                  Get Print Design Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Animated Template Showcase Section */}
    <div className="relative bg-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* First Row - Animate Left to Right */}
        <div className="mb-2 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-left">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/financial-services-products.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/client-testimonials-stats.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-modern-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Second Row - Animate Right to Left */}
        <div className="mb-2 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-right">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/client-testimonials.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-footer.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/cameron-smith-about.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-us.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/elegant-financial-solutions.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/client-testimonials.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-footer.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Third Row - Animate Left to Right */}
        <div className="mb-2 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-left">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/financial-services-products.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/contact-us.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/our-services-grid.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Fourth Row - Animate Right to Left */}
        <div className="overflow-hidden">
          <div className="flex space-x-4 animate-scroll-right">
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/cameron-smith-about.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/elegant-financial-solutions.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/jake-smith-modern-hero.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Repeat for seamless loop */}
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/agency-hero-homepage.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="template-card flex-shrink-0" style={{ width: '20vw', height: '30vh' }}>
              <img 
                src="/attached_assets/cameron-smith-about.png" 
                alt="Template showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <FileText className="h-10 w-10 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-sm font-medium text-gray-400" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Professional landing page templates designed specifically for insurance agents. Build trust, generate leads, and grow your business online.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
        </div>
      </div>
    </footer>

  </div>
  );
}
