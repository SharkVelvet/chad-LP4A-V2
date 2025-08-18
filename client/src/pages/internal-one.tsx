import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function InternalOne() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Professional Landing Pages for Insurance Agents';
  }, []);

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
                <div className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5 sm:mt-0" style={{ letterSpacing: '0.15em' }}>for Agents</div>
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
                  <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Menu Items */}
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
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="py-32 relative"
        style={{ 
          background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)'
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge className="mb-6" style={{ backgroundColor: '#f0eeff', color: '#6458AF' }}>For Insurance Agents Nationwide</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional Landing Pages for<br />
              <span style={{ color: '#6458AF' }}>Insurance Agents</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Are you looking to grow your clients or grow your team?
            </p>
            
            {/* Two Choice Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/get-clients')}
              >
                I Want More Clients
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ 
                  borderColor: '#6458AF', 
                  color: '#6458AF',
                  backgroundColor: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6458AF';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#6458AF';
                }}
                onClick={() => setLocation('/recruit-agents')}
              >
                I Want to Recruit Agents
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
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
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
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