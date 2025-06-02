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

  // Template 3: Clean modern template with green theme
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
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-2xl font-light text-gray-900">Smith Financial</div>
              </div>
              <nav className="hidden md:flex space-x-12">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-gray-600 hover:text-emerald-600 transition-colors font-light">Home</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-600 hover:text-emerald-600 transition-colors font-light">Services</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-600 hover:text-emerald-600 transition-colors font-light">About</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="text-gray-600 hover:text-emerald-600 transition-colors font-light">Testimonials</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-600 hover:text-emerald-600 transition-colors font-light">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-6xl font-light text-gray-900 mb-8 leading-tight">
                  Smart Financial
                  <br />
                  <span className="text-emerald-600">Solutions</span>
                </h1>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                  Thoughtful financial planning that grows with your life. We believe in simple, transparent strategies that deliver lasting results.
                </p>
                <button className="bg-emerald-600 text-white px-8 py-3 hover:bg-emerald-700 transition-colors font-light">
                  Start Planning
                </button>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-emerald-50 to-teal-50"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial Growth" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-light text-gray-900 mb-6">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                Clear, straightforward financial services designed to help you reach your goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 mx-auto mb-8 flex items-center justify-center">
                  <div className="w-8 h-8 bg-emerald-600"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Investment Planning</h3>
                <p className="text-gray-600 font-light leading-relaxed">Build a diversified portfolio that aligns with your risk tolerance and financial timeline through thoughtful investment strategies.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 mx-auto mb-8 flex items-center justify-center">
                  <div className="w-8 h-8 bg-emerald-600"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Retirement Planning</h3>
                <p className="text-gray-600 font-light leading-relaxed">Create a sustainable retirement income plan with clear milestones and regular progress reviews to keep you on track.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 mx-auto mb-8 flex items-center justify-center">
                  <div className="w-8 h-8 bg-emerald-600"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Financial Planning</h3>
                <p className="text-gray-600 font-light leading-relaxed">Comprehensive financial planning that covers budgeting, debt management, and goal-setting for your unique situation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-light text-gray-900 mb-8">Meet John Smith</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                  With over 15 years of experience in financial planning, John believes in building long-term relationships based on trust and transparency. His approach focuses on understanding your unique situation and creating strategies that evolve with your life.
                </p>
                <p className="text-lg text-gray-600 mb-12 leading-relaxed font-light">
                  John holds certifications in financial planning and continues his education to stay current with industry best practices. He's committed to providing clear, honest advice that puts your interests first.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-light text-emerald-600">500+</div>
                    <div className="text-gray-600 font-light">Clients Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-emerald-600">15+</div>
                    <div className="text-gray-600 font-light">Years Experience</div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="John Smith" 
                  className="w-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-light text-gray-900 mb-6">What Clients Say</h2>
              <p className="text-lg text-gray-600 font-light">Honest feedback from people we've helped</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b332647c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Sarah Johnson" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-light text-gray-900">Sarah Johnson</div>
                    <div className="text-emerald-600 text-sm font-light">CEO, TechStart Inc.</div>
                  </div>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">"John's straightforward approach helped us understand our options clearly. His advice has been invaluable for our financial planning."</p>
              </div>
              <div className="bg-white p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Michael Chen" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-light text-gray-900">Michael Chen</div>
                    <div className="text-emerald-600 text-sm font-light">CFO, Global Ventures</div>
                  </div>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">"Working with John feels like having a trusted friend who happens to be excellent with finances. He explains everything clearly."</p>
              </div>
              <div className="bg-white p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Emily Rodriguez" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-light text-gray-900">Emily Rodriguez</div>
                    <div className="text-emerald-600 text-sm font-light">President, Innovate Corp</div>
                  </div>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">"John's patient guidance helped us navigate complex financial decisions with confidence. Highly recommend his services."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-light text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 font-light">Ready to start your financial journey?</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded mr-6"></div>
                    <span className="text-gray-600 font-light">john.smith@financialexpert.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded mr-6"></div>
                    <span className="text-gray-600 font-light">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded mr-6"></div>
                    <span className="text-gray-600 font-light">123 Financial District, Suite 100, New York, NY 10004</span>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6">
                  <div>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-light" />
                  </div>
                  <div>
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-light" />
                  </div>
                  <div>
                    <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-light" />
                  </div>
                  <div>
                    <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none font-light"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700 transition-colors font-light">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-600 mb-4 md:mb-0 font-light">
                © 2024 Smith Financial. All rights reserved.
              </div>
              <div className="text-gray-600 font-light">
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