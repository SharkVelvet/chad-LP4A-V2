import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Globe, TrendingUp, Shield, Clock, Zap, FileText } from "lucide-react";
import templatePreviewImage from "@assets/LD-Internal-1_1753558470989.png";

export default function InternalOne() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Features</a>
              <a href="#templates" className="text-gray-700 hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Templates</a>
              <a href="#pricing" className="text-gray-700 hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Pricing</a>
              <a href="#contact" className="text-gray-700 hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Contact</a>
            </nav>
            <Button style={{ backgroundColor: '#6458AF' }} className="hover:opacity-90">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional Landing Pages for<br />
              <span style={{ color: '#6458AF' }}>Insurance Agents</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create stunning, conversion-focused landing pages that establish trust and generate leads. 
              Professional templates designed specifically for insurance professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 text-lg hover:opacity-90" style={{ backgroundColor: '#6458AF' }}>
                Start Building Your Page
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg hover:opacity-90" style={{ borderColor: '#6458AF', color: '#6458AF', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0eeff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                View Templates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>500+</div>
              <div className="text-gray-600">Active Insurance Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>50+</div>
              <div className="text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional landing pages that convert visitors into clients, built specifically for insurance agents.
            </p>
          </div>

          <div className="rounded-2xl mb-16 overflow-hidden" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] items-center gap-0">
              <div className="px-12 py-8">
                <h3 className="text-4xl font-bold text-gray-900 mb-8">
                  Professional Templates Built for Insurance Agents
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Begin exploring professional templates that speak to the most pressing needs of your insurance clients. With sound design principles for a digital world that continues to change and content that addresses your clients' felt needs.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Industry-Specific Design</h4>
                      <p className="text-gray-600">Find templates designed specifically for insurance agents with trust-building elements.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Mobile-First Responsive</h4>
                      <p className="text-gray-600">Templates optimized for every device of your clients and prospects.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">SEO Optimized</h4>
                      <p className="text-gray-600">Templates built for your local market, holidays, and other opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full flex items-center justify-end -mr-4">
                <img 
                  src="/attached_assets/LD-Internal-3b_1753570339378.png" 
                  alt="Professional Template Preview - Jake Smith Insurance Agent Landing Page"
                  className="h-[600px] lg:h-[900px] w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl mb-16 overflow-hidden" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-0">
              <div className="h-full flex items-center justify-start -ml-4">
                <img 
                  src="/attached_assets/LD-Internal-3c_1753570577890.png" 
                  alt="Professional Template Preview - Jake Smith Insurance Agent About and Services Page"
                  className="h-[600px] lg:h-[900px] w-auto object-contain"
                />
              </div>
              <div className="px-12 py-8">
                <h3 className="text-4xl font-bold text-gray-900 mb-8">
                  Generate More Leads, Close More Deals
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Convert more visitors into clients with professionally designed templates that build trust and drive action. Our insurance-focused designs help you capture leads and showcase your expertise effectively.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Lead Capture Forms</h4>
                      <p className="text-gray-600">Built-in contact forms optimized for insurance lead generation and follow-up.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Trust-Building Elements</h4>
                      <p className="text-gray-600">Professional layouts that showcase credentials, testimonials, and expertise.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Call-to-Action Focus</h4>
                      <p className="text-gray-600">Strategic placement of contact buttons and forms to maximize conversions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section id="templates" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Templates for Insurance Agents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates created specifically for insurance professionals.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mb-12 space-y-4">
            {/* Row 1 Templates */}
            {/* Template 1 - Financial Excellence Theme */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_26_1753571277476.png"
                alt="Financial Excellence Template"
                className="w-full h-full object-cover object-[center_10%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Financial Excellence</h3>
                  <p className="text-sm opacity-90">Modern financial services design</p>
                </div>
              </div>
            </div>

            {/* Template 2 - Elegant Financial Theme */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-6">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_39_1753571277476.png"
                alt="Elegant Financial Template"
                className="w-full h-full object-cover object-[center_10%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Elegant Financial</h3>
                  <p className="text-sm opacity-90">Clean and professional layout</p>
                </div>
              </div>
            </div>

            {/* Template 3 - Professional Services Theme */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-3">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_57_1753571277476.png"
                alt="Professional Services Template"
                className="w-full h-full object-cover object-[center_10%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Professional Services</h3>
                  <p className="text-sm opacity-90">Comprehensive business layout</p>
                </div>
              </div>
            </div>

            {/* Template 4 - Corporate Insurance Theme */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-9">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-13_15_37_1753571277470.png"
                alt="Corporate Insurance Template"
                className="w-full h-full object-cover object-[center_10%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Corporate Insurance</h3>
                  <p className="text-sm opacity-90">Traditional business approach</p>
                </div>
              </div>
            </div>

            {/* Row 2 Templates */}
            {/* Template 5 - Financial Excellence Variant */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-2">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_26_1753571277476.png"
                alt="Financial Excellence Dark Theme"
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Financial Pro</h3>
                  <p className="text-sm opacity-90">Dark theme financial design</p>
                </div>
              </div>
            </div>

            {/* Template 6 - Elegant Financial Variant */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-8">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_39_1753571277476.png"
                alt="Elegant Clean Template"
                className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Elegant Clean</h3>
                  <p className="text-sm opacity-90">Minimalist approach</p>
                </div>
              </div>
            </div>

            {/* Template 7 - Professional Services Variant */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-5">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_57_1753571277476.png"
                alt="Business Professional Template"
                className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Business Pro</h3>
                  <p className="text-sm opacity-90">Corporate insurance focus</p>
                </div>
              </div>
            </div>

            {/* Template 8 - Corporate Insurance Variant */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-11">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-13_15_37_1753571277470.png"
                alt="Corporate Classic Template"
                className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Corporate Classic</h3>
                  <p className="text-sm opacity-90">Traditional insurance style</p>
                </div>
              </div>
            </div>

            {/* Row 3 Templates */}
            {/* Template 9 - Financial Excellence - Service Focus */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-4">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_26_1753571277476.png"
                alt="Service Excellence Template"
                className="w-full h-full object-cover object-[center_40%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Service Excellence</h3>
                  <p className="text-sm opacity-90">Client-focused design</p>
                </div>
              </div>
            </div>

            {/* Template 10 - Elegant Financial - Portfolio Focus */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-10">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_39_1753571277476.png"
                alt="Portfolio Focus Template"
                className="w-full h-full object-cover object-[center_50%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Portfolio Focus</h3>
                  <p className="text-sm opacity-90">Showcase your expertise</p>
                </div>
              </div>
            </div>

            {/* Template 11 - Professional Services - Team Focus */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-7">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-19_06_57_1753571277476.png"
                alt="Team Focus Template"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Team Focus</h3>
                  <p className="text-sm opacity-90">Highlight your team</p>
                </div>
              </div>
            </div>

            {/* Template 12 - Corporate Insurance - Trust Builder */}
            <div className="relative aspect-[16/10] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border break-inside-avoid mb-4 mt-13">
              <img 
                src="/attached_assets/screencapture-3232efe8-c995-406c-9cad-3fc91ebc4968-00-3bfku4kru3453-riker-replit-dev-template-preview-2025-07-26-13_15_37_1753571277470.png"
                alt="Trust Builder Template"
                className="w-full h-full object-cover object-[center_45%] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Trust Builder</h3>
                  <p className="text-sm opacity-90">Build client confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Benefits */}
      <section className="py-20" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Essential for Building Your Team
            </h2>
            <p className="text-xl text-gray-600">
              Professional websites are crucial for recruiting top talent in today's competitive market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4" style={{ color: '#6458AF' }}>70%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passive Talent</h3>
              <p className="text-gray-600">
                70% of the global workforce is considered passive talent, meaning they're open to opportunities but not actively job searching.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-4" style={{ color: '#6458AF' }}>89%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Brand Impact</h3>
              <p className="text-gray-600">
                Companies with strong brands see roughly 89% improvements in applicant quality when recruiting new talent.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-4" style={{ color: '#6458AF' }}>76%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Online Research</h3>
              <p className="text-gray-600">
                76% of new hires look at the company's reputation online before they apply for a position.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Professional Websites Matter for Hiring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Hiring Platform Requirements</h4>
                  <p className="text-gray-600">Many hiring sites require a professional webpage and business email address to post job opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Credibility & Trust</h4>
                  <p className="text-gray-600">A professional website builds immediate credibility with potential recruits who research your business.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Attract Quality Candidates</h4>
                  <p className="text-gray-600">Professional presentation attracts higher-quality candidates who value working for established businesses.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#6458AF] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">Showcase Your Success</h4>
                  <p className="text-gray-600">Display your achievements, team culture, and growth opportunities to appeal to ambitious agents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Insurance Agents Nationwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "State Farm Agent",
                content: "AgentLanding helped me create a professional online presence that generates 3x more leads than my old website.",
                rating: 5
              },
              {
                name: "Mike Rodriguez",
                title: "Allstate Agent",
                content: "The templates are perfect for insurance agents. Setup was quick and my conversion rate has increased by 40%.",
                rating: 5
              },
              {
                name: "Jennifer Chen",
                title: "Independent Agent",
                content: "Finally, a landing page solution built specifically for insurance agents. The results speak for themselves.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Online in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              We handle everything so you can focus on what you do best - serving your clients and hiring new agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#6458AF' }}>
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tell Us What Domain Name You Want</h3>
              <p className="text-gray-600">
                Simply let us know your preferred domain name and we'll handle all the technical details for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#6458AF' }}>
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pick Which Template You Want</h3>
              <p className="text-gray-600">
                Choose from our professional insurance agent templates and customize it with your information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#6458AF' }}>
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Page is Live Within 24 Hours</h3>
              <p className="text-gray-600">
                That's it! Your professional landing page will be live and ready to capture leads from potential clients.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 rounded-lg" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
              <CheckCircle className="h-5 w-5 mr-2" style={{ color: '#6458AF' }} />
              <span className="font-semibold text-gray-900">No technical skills needed - we handle everything!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create professional landing pages that convert.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Card className="border-2 shadow-lg" style={{ borderColor: '#e5e1ff' }}>
              <CardHeader className="text-center" style={{ backgroundColor: '#f8f6ff' }}>
                <CardTitle className="text-2xl" style={{ color: '#6458AF' }}>Professional Plan</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $38 <span className="text-lg font-normal text-gray-600">first month</span>
                </div>
                <div className="text-lg text-gray-600">
                  then $18/month
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Professional landing page templates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom domain support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Lead capture forms</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Mobile responsive design</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>SEO optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>24/7 support</span>
                  </div>
                </div>
                <Button className="w-full text-lg py-3 hover:opacity-90" style={{ backgroundColor: '#6458AF' }}>
                  Start Your Professional Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'rgba(100, 88, 175, 0.1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Generate More Leads?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of insurance agents who trust Landing Pages for Agents to grow their business online.
          </p>
          <Button size="lg" className="px-8 py-4 text-lg hover:opacity-90" style={{ backgroundColor: '#6458AF', color: 'white' }}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-2 text-white" />
                <div className="text-left">
                  <div className="text-xl font-bold leading-none text-white">Landing Pages</div>
                  <div className="text-sm font-medium text-gray-400" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <p className="text-gray-400">
                Professional landing pages for insurance agents nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}