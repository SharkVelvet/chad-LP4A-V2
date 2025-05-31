import { Card } from "@/components/ui/card";

interface TemplatePreviewProps {
  templateSlug: string;
  className?: string;
}

export default function TemplatePreview({ templateSlug, className = "" }: TemplatePreviewProps) {
  if (templateSlug === "modern-business") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="text-red-600 font-bold text-lg">PROCUREX</div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Home</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
          <button className="bg-red-600 text-white px-4 py-1 rounded text-sm">Get Quote</button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">John Smith</h1>
            <p className="text-xl text-gray-300 mb-4">President of Financial Corp.</p>
            <p className="text-gray-400 mb-6 max-w-2xl">
              Providing expert financial consultation and business strategy solutions 
              for over 15 years. Trusted by Fortune 500 companies.
            </p>
            <div className="flex space-x-4">
              <button className="bg-red-600 px-6 py-2 rounded">Schedule Consultation</button>
              <button className="border border-gray-400 px-6 py-2 rounded">Learn More</button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">About John Smith</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-gray-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Professional Excellence</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-gray-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Industry Leadership</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-gray-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Client Success</h3>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Financial Services & Products</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="text-center p-4">
                <div className="w-8 h-8 bg-red-600 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-sm mb-1">Service {i}</h3>
                <p className="text-xs text-gray-600">Description</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center">Client Testimonials</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white p-4 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <div>
                    <div className="font-semibold text-sm">Client Name</div>
                    <div className="text-xs text-gray-500">Company</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">"Excellent service and results..."</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="px-6 py-8 bg-gray-800 text-white">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Schedule Visit</h2>
              <div className="bg-white text-black p-4 rounded">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="text-xs text-gray-600">Available for consultations</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-2 text-sm">
                <div>Phone: (555) 123-4567</div>
                <div>Email: john@financialcorp.com</div>
                <div>Address: 123 Business Ave</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white px-6 py-4 text-center text-xs">
          © 2024 Financial Corp. All rights reserved.
        </div>
      </div>
    );
  }

  if (templateSlug === "restaurant-food") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="text-green-600 font-bold text-lg">BUSINESS PRO</div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Home</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
          <button className="bg-green-600 text-white px-4 py-1 rounded text-sm">Get Quote</button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-900 to-emerald-800 text-white px-6 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">Michael Johnson</h1>
            <p className="text-xl text-green-300 mb-4">Senior Business Consultant</p>
            <p className="text-green-400 mb-6 max-w-2xl">
              Delivering strategic business solutions and growth strategies for enterprises. 
              Specialized in operational excellence and market expansion.
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 px-6 py-2 rounded">Schedule Meeting</button>
              <button className="border border-green-400 px-6 py-2 rounded">Learn More</button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">About Michael Johnson</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-green-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Strategic Planning</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-green-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Business Growth</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-green-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Market Analysis</h3>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Consulting Services & Solutions</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="text-center p-4">
                <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-sm mb-1">Service {i}</h3>
                <p className="text-xs text-gray-600">Professional guidance</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center">Client Success Stories</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white p-4 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <div>
                    <div className="font-semibold text-sm">Client Name</div>
                    <div className="text-xs text-gray-500">Company</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">"Outstanding consulting results..."</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="px-6 py-8 bg-green-800 text-white">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Schedule Consultation</h2>
              <div className="bg-white text-black p-4 rounded">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="text-xs text-gray-600">Available for consultations</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-2 text-sm">
                <div>Phone: (555) 123-4567</div>
                <div>Email: michael@businesspro.com</div>
                <div>Address: 456 Business Center</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-green-900 text-white px-6 py-4 text-center text-xs">
          © 2024 Business Pro. All rights reserved.
        </div>
      </div>
    );
  }

  if (templateSlug === "retail-store") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="text-purple-600 font-bold text-lg">PINNACLE</div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Home</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
          <button className="bg-purple-600 text-white px-4 py-1 rounded text-sm">Book Call</button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white px-6 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">Sarah Williams</h1>
            <p className="text-xl text-purple-300 mb-4">Executive Leadership Coach</p>
            <p className="text-purple-400 mb-6 max-w-2xl">
              Empowering leaders and executives to reach their full potential through personalized coaching, 
              strategic thinking, and transformational leadership development.
            </p>
            <div className="flex space-x-4">
              <button className="bg-purple-600 px-6 py-2 rounded">Start Coaching</button>
              <button className="border border-purple-400 px-6 py-2 rounded">View Approach</button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">About Sarah Williams</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-purple-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Leadership Development</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-purple-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Executive Coaching</h3>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="w-full h-24 bg-purple-200 rounded mb-3"></div>
              <h3 className="font-semibold text-sm">Team Building</h3>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Leadership Coaching & Development</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="text-center p-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-sm mb-1">Program {i}</h3>
                <p className="text-xs text-gray-600">Executive guidance</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center">Leadership Success Stories</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white p-4 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <div>
                    <div className="font-semibold text-sm">Executive Name</div>
                    <div className="text-xs text-gray-500">Fortune 500 CEO</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">"Transformative leadership coaching..."</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="px-6 py-8 bg-purple-800 text-white">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Schedule Session</h2>
              <div className="bg-white text-black p-4 rounded">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Tue - Thu</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="text-xs text-gray-600">Executive coaching sessions</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
              <div className="space-y-2 text-sm">
                <div>Phone: (555) 987-6543</div>
                <div>Email: sarah@pinnaclecoach.com</div>
                <div>Address: 789 Executive Plaza</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-purple-900 text-white px-6 py-4 text-center text-xs">
          © 2024 Pinnacle Coaching. All rights reserved.
        </div>
      </div>
    );
  }

  // Default fallback for other templates
  return (
    <div className={`bg-gray-100 rounded-lg p-8 ${className}`}>
      <div className="text-center text-gray-500">Template Preview</div>
    </div>
  );
}