import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, ArrowLeft, Volume2, VolumeX, Pause, Play, Menu, X, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import type { BlogPost } from "@shared/schema";

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [, setLocation] = useLocation();
  const { slug } = params;
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${slug}`],
  });

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Try to find a more natural voice (prefer female voices, Google voices, or premium voices)
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('google') ||
        voice.name.toLowerCase().includes('natural') ||
        voice.name.toLowerCase().includes('premium') ||
        (voice.name.toLowerCase().includes('female') && voice.lang.startsWith('en')) ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('alex')
      ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
      
      setSelectedVoice(preferredVoice);
    };

    // Load voices immediately if available
    loadVoices();
    
    // Also load when voices change (some browsers load voices asynchronously)
    speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      if (speechRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    if (!post) return;

    if (isReading && !isPaused) {
      // Pause reading
      speechSynthesis.pause();
      setIsPaused(true);
    } else if (isReading && isPaused) {
      // Resume reading
      speechSynthesis.resume();
      setIsPaused(false);
    } else {
      // Start reading
      const textToRead = `${post.title}. ${post.summary}. ${post.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      // Use selected voice if available
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = 0.85; // Slightly slower for better comprehension
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsReading(true);
        setIsPaused(false);
      };
      
      utterance.onend = () => {
        setIsReading(false);
        setIsPaused(false);
        speechRef.current = null;
      };
      
      utterance.onerror = () => {
        setIsReading(false);
        setIsPaused(false);
        speechRef.current = null;
      };
      
      speechRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  const handleStopReading = () => {
    speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
    speechRef.current = null;
  };

  // Set page title and meta tags for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Professional Landing Pages for Insurance Agents`;
      
      // Update or create meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.summary);
      
      // Update or create meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      if (post.onScreenKeywords && post.onScreenKeywords.length > 0) {
        metaKeywords.setAttribute('content', post.onScreenKeywords.join(', '));
      }
      
      // Add Open Graph tags for social sharing
      const ogTags = [
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.summary },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `${window.location.origin}/blog/${post.slug}` },
        { property: 'article:published_time', content: new Date(post.publishedAt).toISOString() },
        { property: 'article:tag', content: post.onScreenKeywords?.join(', ') || '' }
      ];
      
      ogTags.forEach(({ property, content }) => {
        if (content) {
          let ogTag = document.querySelector(`meta[property="${property}"]`);
          if (!ogTag) {
            ogTag = document.createElement('meta');
            ogTag.setAttribute('property', property);
            document.head.appendChild(ogTag);
          }
          ogTag.setAttribute('content', content);
        }
      });
    }
    
    return () => {
      // Reset title when leaving page
      document.title = 'Professional Landing Pages for Insurance Agents';
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Button onClick={() => setLocation('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const formatContent = (content: string | undefined) => {
    if (!content || typeof content !== 'string') return null;
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Handle headings
        if (paragraph.match(/^(Introduction:|Conclusion:|[0-9]+\.|Bonus)/)) {
          const isNumbered = paragraph.match(/^[0-9]+\./);
          const isTitleCase = paragraph.match(/^(Introduction:|Conclusion:|Bonus)/);
          
          if (isNumbered || isTitleCase) {
            const [title, ...rest] = paragraph.split('\n');
            return (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: '#6458AF' }}>
                  {title}
                </h2>
                {rest.length > 0 && (
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {rest.join('\n').split('\n').map((line, lineIndex) => {
                      // Handle bullet points
                      if (line.startsWith('•') || line.startsWith('✅')) {
                        return (
                          <div key={lineIndex} className="flex items-start">
                            <span className="text-purple-600 mr-2 mt-1">•</span>
                            <span>{line.replace(/^[•✅]\s*/, '')}</span>
                          </div>
                        );
                      }
                      // Handle examples
                      if (line.includes('Example:') || line.includes('Tips:')) {
                        return (
                          <p key={lineIndex} className="font-semibold text-gray-900 mt-4">
                            {line}
                          </p>
                        );
                      }
                      // Regular paragraphs
                      if (line.trim()) {
                        return <p key={lineIndex}>{line}</p>;
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            );
          }
        }
        
        // Regular paragraphs
        if (paragraph.trim()) {
          const lines = paragraph.split('\n');
          return (
            <div key={index} className="mb-6 text-gray-700 leading-relaxed">
              {lines.map((line, lineIndex) => {
                // Handle bullet points
                if (line.startsWith('•') || line.startsWith('✅')) {
                  return (
                    <div key={lineIndex} className="flex items-start mb-2">
                      <span className="text-purple-600 mr-2 mt-1">•</span>
                      <span>{line.replace(/^[•✅]\s*/, '')}</span>
                    </div>
                  );
                }
                // Handle quotes
                if (line.startsWith('"') && line.endsWith('"')) {
                  return (
                    <blockquote key={lineIndex} className="italic text-gray-600 border-l-4 border-purple-200 pl-4 my-4">
                      {line}
                    </blockquote>
                  );
                }
                // Regular text
                if (line.trim()) {
                  return <p key={lineIndex} className="mb-2">{line}</p>;
                }
                return null;
              })}
            </div>
          );
        }
        return null;
      });
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
              <FileText className="h-10 w-10 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
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
              className="block text-lg text-gray-700 hover:text-gray-900 transition-colors py-2"
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

      {/* Back to Blog Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/blog')}
          className="text-gray-500 hover:text-gray-600 mb-8 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" style={{ borderColor: '#6458AF', color: '#6458AF' }}>
              Insurance Marketing
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-8 leading-tight">
            {post.title}
          </h1>
          
          {/* Mobile Text Share Button */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => {
                const message = `Hey! I was reading this post and thought it had some good info to read through: ${post.title} - ${window.location.href}`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`sms:?body=${encodedMessage}`, '_self');
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Text this Post to a Friend
            </button>
          </div>
          
          {/* Hero Image */}
          {post.imageUrl && (
            <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              ~6 min read
            </div>
            
            {/* Read Me This Button */}
            <div className="flex gap-3 items-center">
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleReadAloud}
                disabled={!post}
              >
                {isReading ? (
                  isPaused ? (
                    <>
                      <Play className="h-4 w-4" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  )
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    Read Me This
                  </>
                )}
              </Button>
              {isReading && (
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleStopReading}
                >
                  <VolumeX className="h-4 w-4" />
                  Stop
                </Button>
              )}
              {selectedVoice && (selectedVoice.name.includes('Google') || selectedVoice.name.includes('Natural') || selectedVoice.name.includes('Premium')) && (
                <span className="text-xs text-gray-500 ml-2">
                  {selectedVoice.name.includes('Google') ? '🎵 Enhanced Voice' : 
                   selectedVoice.name.includes('Natural') ? '🎵 Natural Voice' :
                   '🎵 Premium Voice'}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.summary}
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {post && post.content ? formatContent(post.content) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Content is loading...</p>
            </div>
          )}
        </div>

        {/* SEO Keywords Display */}
        {(post.onScreenKeywords && post.onScreenKeywords.length > 0) && (
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {post.onScreenKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Call-to-Action Section - Full Width */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your Professional Website?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of insurance agents who trust Landing Pages for Agents to establish their professional online presence.
          </p>
          <Button 
            size="lg"
            className="px-8 py-3 text-white font-semibold"
            style={{ backgroundColor: '#6458AF' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5347A3'} 
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6458AF'}
            onClick={() => setLocation("/start-the-process")}
          >
            Start the Process
          </Button>
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