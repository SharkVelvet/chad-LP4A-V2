interface TemplatePreviewProps {
  templateSlug: string;
  className?: string;
}

export default function TemplatePreview({ templateSlug, className = "" }: TemplatePreviewProps) {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (templateSlug === "financial-services") {
    return (
      <div className={`bg-white ${className}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-800">John Smith</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Your Financial Future Starts Here
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Expert financial planning and investment guidance to help you achieve your goals and secure your future.
                </p>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
                  Schedule Consultation
                </button>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Free Financial Assessment</h3>
                <p className="text-gray-600 mb-6">Get personalized advice for your financial situation</p>
                <form className="space-y-4">
                  <input type="text" placeholder="Name" className="w-full px-4 py-3 border rounded-lg" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
                  <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border rounded-lg" />
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Get Free Assessment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="John Smith" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">About John Smith</h2>
                <p className="text-gray-600 mb-6">
                  With over 15 years of experience in financial planning and wealth management, 
                  I help individuals and families navigate complex financial decisions to build 
                  lasting wealth and security.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h4 className="font-semibold">15+ Years</h4>
                    <p className="text-sm text-gray-600">Experience</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👥</span>
                    </div>
                    <h4 className="font-semibold">500+ Clients</h4>
                    <p className="text-sm text-gray-600">Served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  icon: "💰",
                  title: "Investment Planning",
                  description: "Strategic investment advice tailored to your risk tolerance and goals."
                },
                {
                  icon: "🏠",
                  title: "Retirement Planning", 
                  description: "Comprehensive retirement strategies to ensure financial security."
                },
                {
                  icon: "🛡️",
                  title: "Insurance Review",
                  description: "Protection planning for life, health, and property insurance needs."
                },
                {
                  icon: "📈",
                  title: "Tax Planning",
                  description: "Tax-efficient strategies to minimize your tax burden legally."
                },
                {
                  icon: "🎓",
                  title: "Education Funding",
                  description: "529 plans and education savings strategies for your children's future."
                },
                {
                  icon: "📋",
                  title: "Estate Planning",
                  description: "Wealth transfer and estate planning to protect your legacy."
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="px-6 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600">Ready to take control of your financial future? Get in touch today.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      📞
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-600">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      ✉️
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">john@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      📍
                    </div>
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-gray-600">123 Business St, Suite 100<br />City, State 12345</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Send Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Plan|right</div>
              <div className="text-gray-400">© 2024 John Smith. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (templateSlug === "restaurant-food") {
    return (
      <div className={`bg-white ${className}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-800">John Smith</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div id="home" className="px-6 py-20 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Delicious Food, Exceptional Service
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Experience the finest dining with our carefully crafted menu featuring fresh, local ingredients 
              and traditional recipes passed down through generations.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors">
                View Menu
              </button>
              <button className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-600 hover:text-white transition-colors">
                Reserve Table
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About Our Restaurant</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 1995, our family-owned restaurant has been serving the community with 
                  authentic flavors and warm hospitality. We pride ourselves on using only the 
                  freshest ingredients sourced from local farms and suppliers.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <h4 className="font-semibold">Fresh Daily</h4>
                    <p className="text-sm text-gray-600">Ingredients</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👨‍🍳</span>
                    </div>
                    <h4 className="font-semibold">Expert Chefs</h4>
                    <p className="text-sm text-gray-600">Culinary Masters</p>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Restaurant Interior" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div id="services" className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Specialties</h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  title: "Signature Pizza",
                  description: "Wood-fired pizza with fresh mozzarella and basil",
                  price: "$18"
                },
                {
                  image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  title: "Grilled Salmon",
                  description: "Fresh Atlantic salmon with seasonal vegetables",
                  price: "$24"
                },
                {
                  image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  title: "Pasta Carbonara",
                  description: "Traditional Italian pasta with pancetta and egg",
                  price: "$16"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <span className="text-lg font-bold text-orange-600">{item.price}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="px-6 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Visit Us Today</h2>
              <p className="text-gray-600">Come experience our warm atmosphere and delicious cuisine</p>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Location & Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                      📍
                    </div>
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-gray-600">123 Food Street<br />City, State 12345</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                      📞
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-600">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                      🕒
                    </div>
                    <div>
                      <div className="font-medium">Hours</div>
                      <div className="text-gray-600">Mon-Sun: 11AM - 10PM</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Make Reservation</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Party Size</option>
                    <option>2 People</option>
                    <option>4 People</option>
                    <option>6 People</option>
                    <option>8+ People</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    Reserve Table
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Plan|right</div>
              <div className="text-gray-400">© 2024 John Smith. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (templateSlug === "retail-store") {
    return (
      <div className={`bg-white ${className}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-800">John Smith</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div id="home" className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6">
                  Professional Business Consulting
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Transform your business with strategic consulting, expert guidance, and innovative solutions designed to drive growth and success.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
                    Get Started
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Free Business Consultation</h3>
                <p className="text-blue-100 mb-6">Discover opportunities for growth in your business</p>
                <form className="space-y-4">
                  <input type="text" placeholder="Company Name" className="w-full px-4 py-3 rounded-lg text-gray-900" />
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg text-gray-900" />
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg text-gray-900" />
                  <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors">
                    Schedule Free Consultation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="John Smith" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">About John Smith</h2>
                <p className="text-gray-600 mb-6">
                  With over 15 years of experience in business consulting and strategic planning, 
                  I help companies optimize their operations, increase profitability, and scale 
                  effectively in today's competitive market.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💼</span>
                    </div>
                    <h4 className="font-semibold">15+ Years</h4>
                    <p className="text-sm text-gray-600">Consulting Experience</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="font-semibold">200+ Projects</h4>
                    <p className="text-sm text-gray-600">Successfully Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  icon: "💼",
                  title: "Business Consulting",
                  description: "Strategic business advice tailored to your industry and goals."
                },
                {
                  icon: "📊",
                  title: "Market Analysis",
                  description: "Comprehensive market research and competitive analysis."
                },
                {
                  icon: "🚀",
                  title: "Growth Strategy",
                  description: "Scalable growth plans to expand your business effectively."
                },
                {
                  icon: "💡",
                  title: "Innovation Consulting",
                  description: "Technology and innovation strategies for digital transformation."
                },
                {
                  icon: "👥",
                  title: "Team Development",
                  description: "Leadership training and team building programs."
                },
                {
                  icon: "📈",
                  title: "Performance Optimization",
                  description: "Process improvement and operational efficiency consulting."
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <div className="mt-4 flex items-center text-blue-600">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Professional service</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="px-6 py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-600">Ready to take your business to the next level? Contact us today.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      📞
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-600">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      ✉️
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">john@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      📍
                    </div>
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-gray-600">123 Business St, Suite 100<br />City, State 12345</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Send Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Plan|right</div>
              <div className="text-gray-400">© 2024 John Smith. All rights reserved.</div>
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