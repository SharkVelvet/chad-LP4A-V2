import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Globe, TrendingUp, Shield, Clock, Zap } from "lucide-react";
import templatePreviewImage from "@assets/LD-Internal-1_1753550550673.png";

export default function InternalOne() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold" style={{ color: '#6458AF' }}>AgentLanding</h1>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional landing pages that convert visitors into clients, built specifically for insurance agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Professional Templates Built for Insurance
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Industry-Specific Design</h4>
                    <p className="text-gray-600">Templates designed specifically for insurance agents with trust-building elements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Mobile-First Responsive</h4>
                    <p className="text-gray-600">Perfect display on all devices - desktop, tablet, and mobile</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">SEO Optimized</h4>
                    <p className="text-gray-600">Built-in SEO features to help you rank higher in search results</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative p-8 rounded-lg shadow-2xl" style={{ backgroundColor: '#6458AF' }}>
              <img 
                src={templatePreviewImage} 
                alt="Professional Template Preview - Jake Smith Insurance Agent Landing Page"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="p-8 rounded-lg" style={{ backgroundColor: '#f2f8f0' }}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#92CA7F' }}>
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Lead Generation Focus</h4>
                <p className="text-gray-600">Conversion-optimized forms and call-to-actions that turn visitors into leads</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Generate More Leads, Close More Deals
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Zap className="h-6 w-6 mr-3 mt-1" style={{ color: '#92CA7F' }} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Fast Setup</h4>
                    <p className="text-gray-600">Get your professional page live in under 10 minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 mr-3 mt-1" style={{ color: '#6458AF' }} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact Management</h4>
                    <p className="text-gray-600">Built-in lead capture and management system</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-6 w-6 mr-3 mt-1" style={{ color: '#92CA7F' }} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Domains</h4>
                    <p className="text-gray-600">Use your own domain for professional branding</p>
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
              Professional Templates for Every Insurance Specialty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of industry-specific templates designed to convert visitors into clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Auto Insurance", color: "blue", specialty: "Vehicle Coverage" },
              { title: "Home Insurance", color: "green", specialty: "Property Protection" },
              { title: "Life Insurance", color: "purple", specialty: "Family Security" },
              { title: "Health Insurance", color: "red", specialty: "Medical Coverage" },
              { title: "Business Insurance", color: "orange", specialty: "Commercial Protection" },
              { title: "General Agent", color: "gray", specialty: "Multi-Line Coverage" }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.title}</span>
                    <Badge variant="secondary">{template.specialty}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`h-32 bg-gradient-to-br from-${template.color}-100 to-${template.color}-50 rounded-lg mb-4 flex items-center justify-center`}>
                    <div className={`w-12 h-12 bg-${template.color}-600 rounded-full flex items-center justify-center`}>
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Professional landing page template designed specifically for {template.title.toLowerCase()} agents.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Preview Template
                  </Button>
                </CardContent>
              </Card>
            ))}
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
      <section className="py-20" style={{ backgroundColor: '#6458AF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Generate More Leads?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#e5e1ff' }}>
            Join hundreds of insurance agents who trust AgentLanding to grow their business online.
          </p>
          <Button size="lg" className="px-8 py-4 text-lg hover:bg-gray-100" style={{ backgroundColor: 'white', color: '#6458AF' }}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AgentLanding</h3>
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
            <p>&copy; 2025 AgentLanding. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}