import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, ArrowRight, Menu, X, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
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
                href="/internal-one#features" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/internal-one');
                  setTimeout(() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Features
              </a>
              <a 
                href="/internal-one#templates" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/internal-one');
                  setTimeout(() => {
                    document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Templates
              </a>
              <a 
                href="/internal-one#pricing" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/internal-one');
                  setTimeout(() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Pricing
              </a>
              <a 
                href="/internal-one#contact" 
                className="text-gray-700 hover:opacity-80 transition-colors cursor-pointer" 
                onMouseEnter={(e) => e.currentTarget.style.color = '#6458AF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/internal-one');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Contact
              </a>
              <a 
                href="/blog" 
                className="text-gray-700 font-medium" 
                style={{ color: '#6458AF' }}
              >
                Blog
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:block text-white px-6 py-2" 
                style={{ backgroundColor: '#6458AF' }} 
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} 
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}
                onClick={() => setLocation("/start-the-process")}
              >
                Start the Process
              </Button>
              
              {/* Mobile Text Share Button */}
              <button
                className="md:hidden p-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => {
                  const currentUrl = window.location.href;
                  const message = `Hey, here's the website I mentioned where you can quickly get an agent page live. Just tell them the domain name you want, pick a template, and they'll have it live in about 48 hours. ${currentUrl}`;
                  
                  if (navigator.share) {
                    navigator.share({
                      title: 'Professional Landing Pages for Insurance Agents',
                      text: message,
                    });
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(message).then(() => {
                      alert('Message copied to clipboard!');
                    }).catch(() => {
                      // Fallback for older browsers
                      const textArea = document.createElement('textarea');
                      textArea.value = message;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      alert('Message copied to clipboard!');
                    });
                  }
                }}
                aria-label="Share website"
                title="Share this website"
              >
                <MessageCircle className="h-6 w-6" />
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
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
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
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <FileText className="h-8 w-8 mr-2" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="p-6 space-y-6">
            <a 
              href="/internal-one#features"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setLocation('/internal-one');
                setTimeout(() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Features
            </a>
            <a 
              href="/internal-one#templates"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setLocation('/internal-one');
                setTimeout(() => {
                  document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Templates
            </a>
            <a 
              href="/internal-one#pricing"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setLocation('/internal-one');
                setTimeout(() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Pricing
            </a>
            <a 
              href="/internal-one#contact"
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2" 
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setLocation('/internal-one');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Contact
            </a>
            <a 
              href="/blog"
              className="block text-lg font-medium py-2"
              style={{ color: '#6458AF' }}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setLocation('/blog');
              }}
            >
              Blog
            </a>
            
            {/* CTA Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button 
                className="w-full text-white py-3"
                style={{ backgroundColor: '#6458AF' }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setLocation("/start-the-process");
                }}
              >
                Start the Process
              </Button>
            </div>
          </nav>
        </div>
      </>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#6458AF' }}>
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
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
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
                        size="sm"
                        className="text-white px-4 py-2"
                        style={{ backgroundColor: '#6458AF' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} 
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}
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
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div 
              className="flex items-center justify-center mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/internal-one')}
            >
              <FileText className="h-8 w-8 mr-2" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Built by <a href="https://fotype.com" target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: '#6458AF' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5347A3'} onMouseLeave={(e) => e.currentTarget.style.color = '#6458AF'}>FOTYPE</a> | Copyright © 2025 Landing Pages for Agents
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}