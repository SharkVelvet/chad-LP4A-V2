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
        <div className="bg-amber-50 border-b px-6 py-3 flex items-center justify-between">
          <div className="text-amber-800 font-bold text-lg">BELLA VISTA</div>
          <div className="flex space-x-4 text-sm text-amber-700">
            <span>Menu</span>
            <span>About</span>
            <span>Location</span>
            <span>Contact</span>
          </div>
          <button className="bg-amber-600 text-white px-4 py-1 rounded text-sm">Reserve Table</button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-white px-6 py-16">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-5xl font-bold mb-4">Authentic Italian Cuisine</h1>
            <p className="text-xl text-amber-100 mb-6">
              Experience the finest Italian dining with fresh ingredients and traditional recipes passed down through generations.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-amber-600 px-8 py-3 rounded-lg">View Menu</button>
              <button className="border border-amber-300 px-8 py-3 rounded-lg">Book Now</button>
            </div>
          </div>
        </div>

        {/* Featured Dishes */}
        <div className="px-6 py-12 bg-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Signature Dishes</h2>
          <div className="grid grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="text-center">
                <div className="w-full h-48 bg-amber-100 rounded-lg mb-4"></div>
                <h3 className="font-bold text-lg mb-2">Pasta Primavera</h3>
                <p className="text-gray-600 text-sm mb-2">Fresh seasonal vegetables with homemade pasta</p>
                <p className="text-amber-600 font-bold">$24.95</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-12 bg-amber-50">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 1985, Bella Vista has been serving authentic Italian cuisine to our community for over three decades.
              </p>
              <p className="text-gray-700">
                Our chefs use only the finest imported ingredients and traditional cooking methods to bring you the taste of Italy.
              </p>
            </div>
            <div>
              <div className="w-full h-64 bg-amber-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="px-6 py-12 bg-amber-800 text-white">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
              <div className="space-y-2">
                <div>123 Italian Way, Food District</div>
                <div>Phone: (555) 123-PASTA</div>
                <div>Email: info@bellavista.com</div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Hours</h2>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>5:00 PM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span>5:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>4:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-amber-900 text-white px-6 py-4 text-center text-xs">
          © 2024 Bella Vista Restaurant. All rights reserved.
        </div>
      </div>
    );
  }

  if (templateSlug === "retail-store") {
    return (
      <div className={`bg-white border rounded-lg overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-blue-50 border-b px-6 py-3 flex items-center justify-between">
          <div className="text-blue-800 font-bold text-lg">URBAN STYLE</div>
          <div className="flex space-x-4 text-sm text-blue-700">
            <span>Shop</span>
            <span>Collections</span>
            <span>Sale</span>
            <span>About</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Cart (0)</button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-6 py-16">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">Spring Collection 2024</h1>
            <p className="text-xl text-blue-100 mb-6">
              Discover the latest trends in fashion with our curated collection of premium clothing and accessories.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 px-8 py-3 rounded-lg">Shop Now</button>
              <button className="border border-blue-300 px-8 py-3 rounded-lg">View Lookbook</button>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="px-6 py-12 bg-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="w-full h-48 bg-blue-100 rounded-lg mb-3 group-hover:bg-blue-200 transition-colors"></div>
                <h3 className="font-semibold mb-1">Premium Jacket</h3>
                <p className="text-gray-600 text-sm mb-1">Comfortable & Stylish</p>
                <p className="text-blue-600 font-bold">$89.99</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 py-12 bg-blue-50">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-3 gap-8">
            {['Men', 'Women', 'Accessories'].map((category, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="w-full h-40 bg-blue-200 rounded-lg mb-4 group-hover:bg-blue-300 transition-colors"></div>
                <h3 className="font-bold text-xl">{category}</h3>
                <p className="text-blue-600">Shop Collection</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Store */}
        <div className="px-6 py-12 bg-white">
          <div className="grid grid-cols-2 gap-12">
            <div className="w-full h-64 bg-blue-200 rounded-lg"></div>
            <div>
              <h2 className="text-3xl font-bold mb-6">About Urban Style</h2>
              <p className="text-gray-700 mb-4">
                We're passionate about bringing you the latest fashion trends at affordable prices. Our carefully curated collections feature high-quality pieces for every occasion.
              </p>
              <p className="text-gray-700 mb-6">
                From casual everyday wear to elegant evening attire, find your perfect style with us.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded">Learn More</button>
            </div>
          </div>
        </div>

        {/* Store Info */}
        <div className="px-6 py-12 bg-blue-800 text-white">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Store Location</h2>
              <div className="space-y-2 text-sm">
                <div>456 Fashion Avenue</div>
                <div>Style District, City</div>
                <div>Phone: (555) FASHION</div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Store Hours</h2>
              <div className="space-y-1 text-sm">
                <div>Monday - Saturday: 10 AM - 9 PM</div>
                <div>Sunday: 11 AM - 7 PM</div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Services</h2>
              <div className="space-y-1 text-sm">
                <div>• Personal Styling</div>
                <div>• Alterations</div>
                <div>• Gift Cards</div>
                <div>• Online Orders</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-900 text-white px-6 py-4 text-center text-xs">
          © 2024 Urban Style. All rights reserved.
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