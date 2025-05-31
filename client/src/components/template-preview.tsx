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

  // Default fallback for other templates
  return (
    <div className={`bg-gray-100 rounded-lg p-8 ${className}`}>
      <div className="text-center text-gray-500">Template Preview</div>
    </div>
  );
}