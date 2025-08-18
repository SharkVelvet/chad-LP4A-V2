import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Globe, TrendingUp, Shield, Clock, Zap, FileText, Menu, X, MessageCircle, Target, Search, Smartphone, Award } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function GetClients() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Get More Clients - Professional Landing Pages for Insurance Agents';
  }, []);

  const handleStartProcess = () => {
    setLocation("/start-the-process");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/internal-one')}
            >
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 -mt-1" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <div className="relative">
                <a 
                  href="/get-clients" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  style={{ color: '#6458AF' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6458AF'}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/get-clients');
                  }}
                >
                  Get Clients
                </a>
                <div 
                  className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200"
                  style={{ backgroundColor: '#6458AF' }}
                />
              </div>
              <div className="relative">
                <a 
                  href="/recruit-agents" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/recruit-agents');
                  }}
                >
                  Recruit Agents
                </a>
              </div>
              <div className="relative">
                <a 
                  href="#features" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
              </div>
              <div className="relative">
                <a 
                  href="#pricing" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Pricing
                </a>
              </div>
              <div className="relative">
                <a 
                  href="/blog" 
                  className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer pb-2 block" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/blog');
                  }}
                >
                  Blog
                </a>
              </div>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block hover:opacity-90 w-52"
                style={{ backgroundColor: '#6458AF' }} 
                onClick={handleStartProcess}
              >
                Start My Client Page
              </Button>
              
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
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <FileText className="h-8 w-8 mr-2" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600 -mt-1" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-6 space-y-6">
              <a 
                href="/get-clients"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/get-clients');
                }}
              >
                Get Clients
              </a>
              <a 
                href="/recruit-agents"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/recruit-agents');
                }}
              >
                Recruit Agents
              </a>
              <a 
                href="#features"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
              <a 
                href="#pricing"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </a>
              <a 
                href="/blog"
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/blog');
                }}
              >
                Blog
              </a>
              
              <div className="pt-6 border-t border-gray-200">
                <Button 
                  className="w-full text-white py-3 hover:opacity-90"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleStartProcess();
                  }}
                >
                  Start My Client Page
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Get More Clients With a Professional<br />
              <span style={{ color: '#6458AF' }}>Insurance Agent Website</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Live in 24 hours. Mobile-friendly, SEO-optimized landing pages designed to turn visitors into leads.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                style={{ backgroundColor: '#6458AF' }} 
                className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
                onClick={handleStartProcess}
              >
                👉 Start My Client Page
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>500+</div>
              <div className="text-gray-600">Agents Already Online</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built to Win Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional landing pages that convert visitors into clients, built specifically for insurance agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Target className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">Lead Capture Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Convert visitors into leads automatically.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Search className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">SEO Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Rank for your local market and show up where clients search.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Smartphone className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">Mobile First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Looks perfect on any device.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Award className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">Trust-Building Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Showcase credentials, testimonials, and services.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Pick Your Domain Name</h3>
              <p className="text-gray-600">Choose the perfect domain for your insurance practice.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Template</h3>
              <p className="text-gray-600">Select from professional templates designed for insurance agents.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Go Live in 24 Hours</h3>
              <p className="text-gray-600">Your professional site launches within 24 hours.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              style={{ backgroundColor: '#6458AF' }} 
              className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
              onClick={handleStartProcess}
            >
              👉 Get My Client Page Now
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why spend hours building a generic site when you can launch in 24 hours for less than the cost of lunch?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr style={{ backgroundColor: '#6458AF' }}>
                  <th className="px-6 py-4 text-left text-white font-semibold">Feature/Cost</th>
                  <th className="px-6 py-4 text-center text-white font-semibold bg-opacity-20 bg-white">Landing Pages for Agents</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Wix / Squarespace</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Custom Designer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium text-gray-900">Setup Time</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Done in 24 hours (we do it)</td>
                  <td className="px-6 py-4 text-center text-gray-600">10–20+ hours DIY</td>
                  <td className="px-6 py-4 text-center text-gray-600">4–6 weeks</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Industry-Specific</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Yes, built for insurance</td>
                  <td className="px-6 py-4 text-center text-gray-600">No, generic</td>
                  <td className="px-6 py-4 text-center text-gray-600">Custom, but $$$</td>
                </tr>

                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">SEO Optimization</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Built-in for agents</td>
                  <td className="px-6 py-4 text-center text-gray-600">Limited templates</td>
                  <td className="px-6 py-4 text-center text-gray-600">Extra $$$</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>$18/month ($38 setup)</td>
                  <td className="px-6 py-4 text-center text-gray-600">$25–$40/month</td>
                  <td className="px-6 py-4 text-center text-gray-600">$2000+ upfront + hosting</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Domain + Hosting</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>Included in price</td>
                  <td className="px-6 py-4 text-center text-gray-600">$15–30/month extra</td>
                  <td className="px-6 py-4 text-center text-gray-600">$10–50/month extra</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Ongoing Support</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>24/7 included</td>
                  <td className="px-6 py-4 text-center text-gray-600">DIY support docs</td>
                  <td className="px-6 py-4 text-center text-gray-600">Expensive hourly</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Start attracting clients and recruits today — without wasting time or money.
            </h3>
            <Button 
              size="lg"
              style={{ backgroundColor: '#6458AF' }} 
              className="hover:opacity-90 px-8 py-4 text-lg font-semibold"
              onClick={handleStartProcess}
            >
              👉 Start My Client Page Now
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
          </div>

          <Card className="max-w-lg mx-auto shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f6ff 100%)' }}>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-8">Professional Plan</CardTitle>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-6xl font-bold" style={{ color: '#6458AF' }}>$38</span>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-gray-700">first month</div>
                    <div className="text-sm text-gray-500">(setup included)</div>
                  </div>
                </div>
                <div className="text-xl text-gray-600 font-medium">then $18/month</div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-white rounded-lg p-6 mb-8">
                <ul className="space-y-5">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">Custom domain support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">Professional templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">SEO optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">Lead capture forms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#6458AF' }} />
                    <span className="text-lg font-medium text-gray-700">24/7 support & hosting</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                size="lg"
                className="w-full text-white hover:opacity-90 py-4 text-lg font-semibold shadow-lg"
                style={{ backgroundColor: '#6458AF' }}
                onClick={handleStartProcess}
              >
                🚀 Start My Client Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Stop losing clients to competitors with better websites.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get online now and start converting visitors into clients.
          </p>
          <Button 
            size="lg"
            style={{ backgroundColor: '#6458AF' }} 
            className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
            onClick={handleStartProcess}
          >
            👉 Start My Client Page
          </Button>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Built by <a href="https://fotype.com" target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: '#6458AF' }}>FOTYPE</a> | Copyright © 2025 Landing Pages for Agents
        </p>
      </div>
    </div>
  );
}