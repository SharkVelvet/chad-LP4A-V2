import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Globe, TrendingUp, Shield, Clock, Zap, FileText, Menu, X, MessageCircle, Eye, UserCheck, Building, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function RecruitAgents() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Recruit Top Agents - Professional Landing Pages for Insurance Agencies';
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
              <a 
                href="/get-clients" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/get-clients');
                }}
              >
                Get Clients
              </a>
              <a 
                href="/recruit-agents" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/recruit-agents');
                }}
              >
                Recruit Agents
              </a>
              <a 
                href="#features" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </a>
              <a 
                href="/blog" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/blog');
                }}
              >
                Blog
              </a>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block hover:opacity-90"
                style={{ backgroundColor: '#6458AF' }} 
                onClick={handleStartProcess}
              >
                Launch My Recruiting Page
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



      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Agency Owners</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Recruit Top Agents With a Professional<br />
              <span style={{ color: '#6458AF' }}>Agency Website</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Strong brands attract strong talent. Launch a professional recruiting site that builds trust and helps you grow your team.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                style={{ backgroundColor: '#6458AF' }} 
                className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
                onClick={handleStartProcess}
              >
                👉 Launch My Recruiting Page
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
              <div className="text-gray-600">Agencies and Agents Online</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>70%</div>
              <div className="text-gray-600">Of Agents Are Passive Talent</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#6458AF' }}>76%</div>
              <div className="text-gray-600">Research Your Reputation Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Agency Owners Need a Recruiting Page
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional recruiting pages that attract top talent, built specifically for insurance agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Eye className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">Stand Out to Talent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Showcase culture, success, and opportunities.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Shield className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">Credibility & Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Build confidence with recruits instantly.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Building className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">Hiring Site Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Many job boards require a business site + email.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f0eeff' }}>
                  <Trophy className="h-8 w-8" style={{ color: '#6458AF' }} />
                </div>
                <CardTitle className="text-lg">Attract Better Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professionals want to work with professionals.</p>
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
              <h3 className="text-xl font-semibold mb-4">Choose Your Agency Domain Name</h3>
              <p className="text-gray-600">Select the perfect domain for your insurance agency.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Select a Recruiting-Focused Template</h3>
              <p className="text-gray-600">Choose from templates designed to attract top talent.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#6458AF' }}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Attracting Agents Within 24 Hours</h3>
              <p className="text-gray-600">Your recruiting site launches within 24 hours.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              style={{ backgroundColor: '#6458AF' }} 
              className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
              onClick={handleStartProcess}
            >
              👉 Get My Recruiting Page Now
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

          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-6">Professional Plan</CardTitle>
              <div className="space-y-2">
                <div>
                  <span className="text-5xl font-bold" style={{ color: '#6458AF' }}>$38</span>
                  <span className="text-lg text-gray-600 ml-3">first month (setup included)</span>
                </div>
                <div className="text-lg text-gray-600">then $18/month</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#6458AF' }} />
                  <span>Custom domain</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#6458AF' }} />
                  <span>Recruiting templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#6458AF' }} />
                  <span>SEO optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#6458AF' }} />
                  <span>Mobile responsive design</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#6458AF' }} />
                  <span>24/7 support</span>
                </li>
              </ul>
              
              <Button 
                size="lg"
                className="w-full mt-8 text-white hover:opacity-90"
                style={{ backgroundColor: '#6458AF' }}
                onClick={handleStartProcess}
              >
                Launch My Recruiting Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The best agents want to work with the best teams.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Build your agency with a professional recruiting page.
          </p>
          <Button 
            size="lg"
            style={{ backgroundColor: '#6458AF' }} 
            className="hover:opacity-90 px-8 py-3 text-lg font-semibold"
            onClick={handleStartProcess}
          >
            👉 Launch My Recruiting Page
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