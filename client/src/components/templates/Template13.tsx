interface Template13Props {
  className?: string;
}

export default function Template13({ className = "" }: Template13Props) {
  return (
    <div className={`bg-white ${className}`}>
      {/* Section 1: Hero Section - Exact match to screenshot */}
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

      {/* Section 2: Statistics Section - Exact match to screenshot */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-red-600 mb-4">78%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Agent Success Rate</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our proven mentorship and ongoing support programs ensure agents thrive and maintain long-lasting, profitable careers.
              </p>
            </div>
            
            <div>
              <div className="text-6xl font-bold text-red-600 mb-4">67%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Revenue Growth in Year One</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                New agents experience substantial earnings increases through our advanced training programs and exclusive lead systems.
              </p>
            </div>
            
            <div>
              <div className="text-6xl font-bold text-red-600 mb-4">85%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Penetration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Wide-reaching market presence spanning numerous states with diverse product offerings and industry-leading commission structures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Why Top Agents Choose Delta Life */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main heading and description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Top Agents Choose Delta Life</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              We provide everything you need to accelerate your insurance career, from comprehensive training and warm leads to ongoing mentorship and cutting-edge technology support.
            </p>
          </div>

          {/* Training Programs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Image */}
            <div>
              <img 
                src="/attached_assets/Screenshot 2025-09-23 at 4.49.47 PM_1758660690654.png" 
                alt="Team meeting and collaboration" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Right side - Training Programs */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-6">Comprehensive Training Programs</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Sales Training</h4>
                  <p className="text-gray-600">Master proven sales techniques and objection handling strategies.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Product Knowledge</h4>
                  <p className="text-gray-600">Deep understanding of insurance products and market positioning.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Technology Training</h4>
                  <p className="text-gray-600">Learn to leverage cutting-edge tools and CRM systems effectively.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Resources Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Resources */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-6">Advanced Resources & Career Support</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Warm Lead Pipeline</h4>
                  <p className="text-gray-600">Pre-qualified leads delivered directly to you with automated follow-up support.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Marketing Resources</h4>
                  <p className="text-gray-600">Professional marketing materials and company-branded digital assets at your disposal.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Mentorship</h4>
                  <p className="text-gray-600">Regular coaching and mentorship from experienced industry professionals.</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div>
              <img 
                src="/attached_assets/Screenshot 2025-09-23 at 4.49.47 PM_1758660690654.png" 
                alt="Overhead view of team collaboration" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Meet Mandy */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Main heading and description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Mandy</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              The leader behind Delta Life's success and your future mentor in building an exceptional insurance career.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Photo */}
            <div className="text-center">
              <img 
                src="/attached_assets/Screenshot 2025-09-23 at 4.49.53 PM_1758660712149.png" 
                alt="Mandy Johnson, Licensed Agent" 
                className="w-80 h-auto mx-auto rounded-lg"
              />
            </div>
            
            {/* Right side - Bio and achievements */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-2">Mandy Johnson</h3>
              <p className="text-gray-600 mb-6">Licensed Agent 15+ years</p>
              
              <p className="text-gray-700 leading-relaxed mb-8">
                With over 15 years in the insurance industry, Mandy has built Delta Life into Houston's most successful independent marketing organization. Starting as a new agent herself, she understands the challenges you face and has developed the proven systems that have launched hundreds of successful insurance careers. Her passion for mentoring agents and building lasting relationships has made her one of the most respected leaders in the industry.
              </p>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Awards & Accomplishments</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900">Top Producer Award 2023</h5>
                    <p className="text-gray-600 text-sm">Leading regional performance in agent development and team growth</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900">Mentor of the Year 2022</h5>
                    <p className="text-gray-600 text-sm">Recognized for exceptional agent training and career development programs</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900">Million Dollar Club</h5>
                    <p className="text-gray-600 text-sm">Five consecutive years achieving million-dollar team production</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900">Leadership Excellence Award</h5>
                    <p className="text-gray-600 text-sm">Honored for building the largest independent agent network in Texas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}