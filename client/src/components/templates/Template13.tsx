import { MapPin, Phone, Mail } from "lucide-react";

interface Template13Props {
  className?: string;
}

export default function Template13({ className = "" }: Template13Props) {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`bg-white ${className}`} style={{ scrollBehavior: 'smooth' }}>
      {/* Header - Exact match to image */}
      <div className="bg-white border-b px-8 py-6 flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900">Delta Life</div>
          <div className="text-sm text-gray-600">A Premier Houston Insurance Group</div>
        </div>
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-8 text-gray-700">
            <a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className="hover:text-gray-900 cursor-pointer">Solutions</a>
            <a href="#training" onClick={(e) => handleSmoothScroll(e, 'training')} className="hover:text-gray-900 cursor-pointer">Training</a>
            <a href="#support" onClick={(e) => handleSmoothScroll(e, 'support')} className="hover:text-gray-900 cursor-pointer">Support</a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-gray-900 cursor-pointer">About</a>
          </div>
          <button 
            onClick={(e) => handleSmoothScroll(e, 'contact')} 
            className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Section - Exact 2-column layout from image */}
      <div className="px-8 py-20">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Left side - Content exactly as in image */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
              The Career Path You<br />
              Have Always Wanted is<br />
              Right Here!
            </h1>
            <p className="text-gray-600 text-[15px] leading-7 mb-8">
              Join Houston's premier insurance team and accelerate your career as 
              an independent agent. At Delta Life, we provide the training, leads, 
              support, and earning potential you need to thrive in the insurance 
              industry—without the risk of going it alone.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={(e) => handleSmoothScroll(e, 'contact')} 
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors"
              >
                Join Our Team
              </button>
              <button 
                onClick={(e) => handleSmoothScroll(e, 'about')} 
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded text-sm font-medium transition-colors"
              >
                Why Choose Us
              </button>
            </div>
          </div>
          
          {/* Right side - Image card exactly as in layout */}
          <div className="relative">
            <img 
              src="/attached_assets/plr-recruiting-1_1758659740352.jpg" 
              alt="Father and child spending quality time together" 
              className="w-[520px] h-[360px] rounded-xl shadow-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Statistics Section - Gray background with 3 columns exactly like image */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-semibold text-red-600 mb-2">78%</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Agent Success Rate</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our proven mentorship and ongoing support programs ensure agents thrive and maintain long-lasting, profitable careers.
              </p>
            </div>
            
            <div>
              <div className="text-4xl font-semibold text-red-600 mb-2">67%</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Revenue Growth in Year One</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                New agents experience substantial earnings increases through our advanced training programs and exclusive lead systems.
              </p>
            </div>
            
            <div>
              <div className="text-4xl font-semibold text-red-600 mb-2">85%</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Market Penetration</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Wide-reaching market presence spanning numerous states with diverse product offerings and industry-leading commission structures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Top Agents Choose Delta Life Section - Centered text exactly like image */}
      <div id="about" className="px-8 py-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Why Top Agents Choose Delta Life</h2>
          <p className="text-gray-600 text-[15px] leading-7 max-w-2xl mx-auto">
            We provide everything you need to accelerate your insurance career, from comprehensive 
            training and warm leads to ongoing mentorship and cutting-edge technology support.
          </p>
        </div>
      </div>

      {/* Comprehensive Training Programs Section - Bottom section with images */}
      <div id="training" className="px-8 py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left side - Image grid exactly like in image */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/attached_assets/plr-recruiting-1_1758659740352.jpg" 
                alt="Professional training environment" 
                className="w-full h-32 object-cover rounded-lg"
              />
              <img 
                src="/attached_assets/plr-recruiting-1_1758659740352.jpg" 
                alt="Insurance team collaboration" 
                className="w-full h-20 object-cover rounded-lg"
              />
            </div>
            <div className="mt-8">
              <img 
                src="/attached_assets/plr-recruiting-1_1758659740352.jpg" 
                alt="Success celebration" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Right side - Content exactly as in image */}
          <div className="text-left">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">Comprehensive Training Programs</h3>
            <p className="text-gray-600 text-[15px] leading-7">
              Our industry-leading training programs are designed to accelerate your success in the insurance industry. From product knowledge to sales techniques, we provide the comprehensive education you need to excel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}