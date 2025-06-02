interface TemplatePreviewProps {
  templateSlug: string;
  className?: string;
}

export default function TemplatePreview({ templateSlug, className = "" }: TemplatePreviewProps) {
  // Template 1: Restaurant/Food template
  if (templateSlug === "restaurant-food") {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div className={`bg-white ${className}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-orange-600">Smith Financial</div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-700 hover:text-orange-600 transition-colors">Services</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="text-gray-700 hover:text-orange-600 transition-colors">Testimonials</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-r from-orange-50 to-red-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Expert Financial Planning Services</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your financial future with personalized strategies, expert guidance, and proven results that help you achieve your goals.
              </p>
              <button className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors text-lg font-semibold">
                Get Started Today
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive financial solutions tailored to your needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-orange-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Planning</h3>
                <p className="text-gray-600">Strategic portfolio management to maximize your returns while minimizing risk through diversified investment strategies.</p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-orange-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Retirement Planning</h3>
                <p className="text-gray-600">Secure your future with comprehensive retirement strategies designed to ensure financial independence.</p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-orange-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Planning</h3>
                <p className="text-gray-600">Optimize your tax strategy with expert guidance to minimize liabilities and maximize savings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About John Smith</h2>
                <p className="text-lg text-gray-600 mb-6">
                  With over 15 years of experience in financial planning and investment management, John Smith has helped hundreds of clients achieve their financial goals.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Specializing in comprehensive financial strategies, John provides personalized solutions that align with each client's unique circumstances and long-term objectives.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">500+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">15+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="John Smith" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Real stories from satisfied clients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b332647c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Sarah Johnson" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">CEO, TechStart Inc.</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"John's expertise in financial planning transformed our business operations and significantly improved our bottom line."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Michael Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-500">CFO, Global Ventures</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"The investment strategies provided have consistently delivered exceptional returns for our portfolio."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Emily Rodriguez" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-gray-500">President, Innovate Corp</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"Professional, knowledgeable, and always available when we need guidance on complex financial decisions."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600">Ready to take control of your financial future?</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-orange-600 rounded mr-4"></div>
                    <span className="text-gray-600">john.smith@financialexpert.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-orange-600 rounded mr-4"></div>
                    <span className="text-gray-600">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-orange-600 rounded mr-4"></div>
                    <span className="text-gray-600">123 Financial District, Suite 100, New York, NY 10004</span>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6">
                  <div>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent" />
                  </div>
                  <div>
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent" />
                  </div>
                  <div>
                    <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent" />
                  </div>
                  <div>
                    <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-600 mb-4 md:mb-0">
                © 2024 Smith Financial. All rights reserved.
              </div>
              <div className="text-gray-600">
                Powered by <span className="font-semibold">Plan|right</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Template 2: Retail/Store template
  if (templateSlug === "retail-store") {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div className={`bg-white ${className}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">Smith Financial</div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">Your Financial Success Starts Here</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Expert financial planning and investment management services designed to help you achieve your long-term financial goals with confidence.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Schedule Consultation
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial Planning" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive financial solutions for your future</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Management</h3>
                <p className="text-gray-600 mb-6">Professional portfolio management with diversified investment strategies tailored to your risk tolerance and financial goals.</p>
                <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Learn More →</a>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-green-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Retirement Planning</h3>
                <p className="text-gray-600 mb-6">Comprehensive retirement strategies including 401(k) optimization, IRA planning, and income replacement strategies.</p>
                <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Learn More →</a>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-purple-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Strategy</h3>
                <p className="text-gray-600 mb-6">Strategic tax planning to minimize your tax burden while maximizing your investment returns and savings potential.</p>
                <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Learn More →</a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="John Smith" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet John Smith</h2>
                <p className="text-lg text-gray-600 mb-6">
                  A Certified Financial Planner with over 15 years of experience helping individuals and families achieve their financial goals through strategic planning and investment management.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  John's approach combines technical expertise with personalized service, ensuring that each client receives strategies tailored to their unique financial situation and objectives.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-gray-600">Satisfied Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">$50M+</div>
                    <div className="text-gray-600">Assets Under Management</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
              <p className="text-xl text-gray-600">Hear from clients who achieved their financial goals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b332647c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Sarah Johnson" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">CEO, TechStart Inc.</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"John's investment strategies have consistently outperformed market benchmarks and helped secure our company's financial future."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Michael Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-500">CFO, Global Ventures</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"The retirement planning service exceeded our expectations. We feel confident about our financial future thanks to John's expertise."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Emily Rodriguez" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-gray-500">President, Innovate Corp</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"Professional, knowledgeable, and always available. John has transformed our approach to financial planning and investment."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Financial Journey</h2>
              <p className="text-xl text-gray-600">Get in touch to schedule your complimentary consultation</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-4"></div>
                    <span className="text-gray-600">john.smith@financialexpert.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-4"></div>
                    <span className="text-gray-600">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-4"></div>
                    <span className="text-gray-600">123 Financial District, Suite 100, New York, NY 10004</span>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6">
                  <div>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                  <div>
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                  <div>
                    <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                  <div>
                    <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-600 mb-4 md:mb-0">
                © 2024 Smith Financial. All rights reserved.
              </div>
              <div className="text-gray-600">
                Powered by <span className="font-semibold">Plan|right</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Template 3: Business consulting template with modern design
  if (templateSlug === "business-consulting") {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div className={`bg-white ${className}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-900">Smith Financial</div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-gray-700 hover:text-blue-900 transition-colors">Home</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-700 hover:text-blue-900 transition-colors">Services</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 hover:text-blue-900 transition-colors">About</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="text-gray-700 hover:text-blue-900 transition-colors">Testimonials</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-700 hover:text-blue-900 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Strategic Financial Solutions for <span className="text-blue-900">Your Success</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your financial future with expert guidance, innovative strategies, and personalized solutions designed to help you achieve your most ambitious goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
                    Get Started Today
                  </button>
                  <button className="border border-blue-900 text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-900 hover:text-white transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial Planning" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-blue-900">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive financial solutions tailored to your unique needs and objectives
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-blue-900 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Planning</h3>
                <p className="text-gray-600 mb-6">Strategic portfolio management and investment advice to maximize your returns while minimizing risk.</p>
                <a href="#contact" className="text-blue-900 font-semibold hover:text-blue-800 transition-colors">Learn More →</a>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-green-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Retirement Planning</h3>
                <p className="text-gray-600 mb-6">Secure your future with comprehensive retirement strategies and long-term financial planning.</p>
                <a href="#contact" className="text-blue-900 font-semibold hover:text-blue-800 transition-colors">Learn More →</a>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-purple-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Optimization</h3>
                <p className="text-gray-600 mb-6">Minimize your tax burden with smart strategies and expert guidance on tax-efficient investing.</p>
                <a href="#contact" className="text-blue-900 font-semibold hover:text-blue-800 transition-colors">Learn More →</a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="John Smith" 
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About John Smith</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  With over 15 years of experience in financial planning and investment management, John Smith has helped hundreds of clients achieve their financial goals. His expertise spans across investment planning, retirement strategies, and tax optimization.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  John holds a CFA designation and is committed to providing personalized financial solutions that align with each client's unique circumstances and objectives.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900">500+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900">$50M+</div>
                    <div className="text-gray-600">Assets Managed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Real stories from real people who achieved their financial goals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b332647c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Sarah Johnson" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-gray-600 text-sm">CEO, TechStart Inc.</div>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"John's investment strategies helped us grow our portfolio by 40% in just two years. His expertise is unmatched."</p>
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Michael Chen" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Michael Chen</div>
                    <div className="text-gray-600 text-sm">CFO, Global Ventures</div>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"The retirement planning service exceeded our expectations. We're now confident about our financial future."</p>
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Emily Rodriguez" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                    <div className="text-gray-600 text-sm">President, Innovate Corp</div>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"Professional, knowledgeable, and always available. John transformed our approach to financial planning."</p>
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-300">Ready to take control of your financial future? Let's start the conversation.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-4"></div>
                    <span>john.smith@financialexpert.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-4"></div>
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-4"></div>
                    <span>123 Financial District, Suite 100, New York, NY 10004</span>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6">
                  <div>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none" />
                  </div>
                  <div>
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none" />
                  </div>
                  <div>
                    <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-600 mb-4 md:mb-0">
                © 2024 Smith Financial. All rights reserved.
              </div>
              <div className="text-gray-600">
                Powered by <span className="font-semibold">Plan|right</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Default fallback for other templates
  return (
    <div className={`bg-gray-100 border rounded-lg p-8 text-center ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Template Preview</h3>
      <p className="text-gray-600">Template "{templateSlug}" not found</p>
    </div>
  );
}