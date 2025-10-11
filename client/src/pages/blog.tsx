import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, ArrowRight, Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Insurance Marketing Blog | Professional Landing Pages for Insurance Agents';
  }, []);

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
              <a onClick={() => setLocation('/custom-websites')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Websites</a>
              <a onClick={() => setLocation('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
              <a onClick={() => setLocation('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
            </nav>

            {/* Get Started Button on Desktop, Hamburger on Mobile */}
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => setLocation('/template-selection')}
              >
                Get Started
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

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
              <div className="flex items-center">
                <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-xl font-bold" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600 mt-0.5" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-6 space-y-6">
              <a 
                href="/template-selection" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/template-selection');
                }}
              >
                View Templates
              </a>
              <a 
                href="/custom-websites" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/custom-websites');
                }}
              >
                Custom Websites
              </a>
              <a 
                href="/other-services" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/other-services');
                }}
              >
                Other Services
              </a>
              <a 
                href="/pricing" 
                className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setLocation('/pricing');
                }}
              >
                Pricing
              </a>
              
              <div className="pt-6 border-t border-gray-200">
                <Button 
                  className="w-full px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                  style={{ backgroundColor: '#6458AF' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setLocation('/template-selection');
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
        </div>
      </>

      {/* Hero Section */}
      <section className="py-10 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: '#6458AF' }}>
            Insurance Marketing Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert insights, strategies, and tips for insurance agents looking to grow their business through effective marketing and professional online presence.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600">
                We're working on creating valuable content for insurance agents. Check back soon for expert insights and marketing strategies.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-3xl"
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                >
                  {post.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" style={{ borderColor: '#6458AF', color: '#6458AF' }}>
                        Insurance Marketing
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        ~6 min read
                      </div>
                      <Button 
                        className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
                        style={{ backgroundColor: '#6458AF' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocation(`/blog/${post.slug}`);
                        }}
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

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
                Professional landing page templates designed specifically for insurance agents. <strong>Build trust, generate leads, and grow your business online.</strong>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About LP4A</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/template-selection')} className="hover:text-white transition-colors cursor-pointer">View Templates</a></li>
                <li><a onClick={() => setLocation('/custom-websites')} className="hover:text-white transition-colors cursor-pointer">Custom Websites</a></li>
                <li><a onClick={() => setLocation('/other-services')} className="hover:text-white transition-colors cursor-pointer">Other Services</a></li>
                <li><a onClick={() => setLocation('/pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
                <li><a onClick={() => setLocation('/blog')} className="hover:text-white transition-colors cursor-pointer">Our Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
                <li><a onClick={() => setLocation('/terms-of-service')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
            <p className="text-sm mt-2 opacity-30">Landing Pages for Agents is Owned and Operated by 1612 Media, LLC</p>
          </div>
        </div>
      </footer>
    </div>
  );
}