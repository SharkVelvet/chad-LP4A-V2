interface Template13Props {
  className?: string;
}

export default function Template13({ className = "" }: Template13Props) {
  return (
    <div className={`bg-white ${className}`}>
      {/* Hero Section - Exact match to screenshot */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content exactly as in screenshot */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Career Path You<br />
              Have Always Wanted is<br />
              Right Here!
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Join Houston's premier insurance team and accelerate your career as an independent agent. At Delta Life, we provide the training, leads, support, and earning potential you need to thrive in the insurance industry—without the risk of going it alone.
            </p>
            
            <div className="flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-base font-medium transition-colors">
                Join Our Team
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded text-base font-medium transition-colors">
                Why Choose Us
              </button>
            </div>
          </div>
          
          {/* Right side - Image exactly as in screenshot */}
          <div className="relative">
            <img 
              src="/attached_assets/Screenshot 2025-09-23 at 4.49.31 PM_1758660646144.png" 
              alt="Father and child spending quality time together" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}