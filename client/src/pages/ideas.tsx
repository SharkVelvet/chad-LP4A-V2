import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Filter, Grid, Eye, Star, FileText, Search, X } from "lucide-react";
import { useState } from "react";
import SplashPagePreview from "@/components/splash-page-preview";

export default function Ideas() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewExample, setPreviewExample] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    "All", "Insurance Agency", "Financial Services", "Real Estate", "Healthcare", 
    "Legal", "Consulting", "Restaurant", "Salon & Spa", "Fitness", "Education", "Non-Profit", "Entertainment"
  ];

  const splashPageExamples = [
    // Template-based examples (first 6)
    {
      title: "Modern Insurance Agent",
      category: "Insurance Agency",
      description: "Clean, professional design with trust-building elements and clear call-to-actions",
      image: "/attached_assets/template1-preview.png",
      features: ["Quote Calculator", "Client Portal", "Policy Finder", "Agent Bio"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Financial Insurance Agent",
      category: "Financial Services", 
      description: "Elegant layout focusing on expertise and client testimonials",
      image: "/attached_assets/template2-preview.png",
      features: ["Investment Tools", "Market Updates", "Consultation Booking", "Resources"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Life Insurance Agent",
      category: "Insurance Agency",
      description: "Warm, family-focused design emphasizing protection and security",
      image: "/attached_assets/template3-preview.png",
      features: ["Coverage Calculator", "Family Protection", "Claims Support", "Educational Content"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Health Insurance Agent",
      category: "Healthcare",
      description: "Medical-themed design with health-focused messaging and easy navigation",
      image: "/attached_assets/template4-preview.png",
      features: ["Plan Comparison", "Provider Network", "Enrollment Help", "Health Resources"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Commercial Insurance Agent",
      category: "Insurance Agency",
      description: "Corporate-style layout targeting business owners and entrepreneurs",
      image: "/attached_assets/template5-preview.png",
      features: ["Risk Assessment", "Industry Solutions", "Claims Management", "Business Tools"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Personal Insurance Agent",
      category: "Financial Services",
      description: "Approachable design with educational focus and success stories",
      image: "/attached_assets/template6-preview.png",
      features: ["Budget Planner", "Goal Setting", "Financial Education", "Success Stories"],
      difficulty: "Professional",
      rating: 5
    },
    // Additional 34 examples with preview images
    {
      title: "Auto Insurance Agent",
      category: "Insurance Agency",
      description: "Vehicle-focused design with instant quotes and coverage comparisons",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Instant Quotes", "Coverage Compare", "Claims Tracker", "Driving Tips"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Home Insurance Agent",
      category: "Real Estate",
      description: "Property protection design with home value tools and coverage options",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Home Valuation", "Coverage Calculator", "Claims Guide", "Safety Tips"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Travel Insurance Agent",
      category: "Insurance Agency",
      description: "Adventure-themed design for travel protection and international coverage",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Trip Protection", "Medical Coverage", "Claim Support", "Travel Alerts"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Disability Insurance Agent",
      category: "Healthcare",
      description: "Supportive design focusing on income protection and disability benefits",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Income Protection", "Benefit Calculator", "Support Resources", "Claims Help"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Workers Comp Insurance Agent",
      category: "Legal",
      description: "Professional design for workplace injury coverage and employer protection",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Workplace Safety", "Injury Claims", "Premium Calculator", "Compliance Tools"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Pet Insurance Agent",
      category: "Insurance Agency",
      description: "Pet-friendly design with veterinary coverage and animal health resources",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Vet Network", "Health Plans", "Emergency Coverage", "Pet Care Tips"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Motorcycle Insurance Agent",
      category: "Insurance Agency",
      description: "Dynamic design for motorcycle coverage with rider safety focus",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Bike Coverage", "Rider Protection", "Gear Discounts", "Safety Courses"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Boat Insurance Agent",
      category: "Insurance Agency",
      description: "Nautical-themed design for watercraft protection and marine coverage",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Marine Coverage", "Boat Valuation", "Safety Equipment", "Weather Alerts"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "RV Insurance Agent",
      category: "Insurance Agency",
      description: "Adventure-focused design for recreational vehicle coverage and travel protection",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["RV Coverage", "Travel Protection", "Roadside Assistance", "Trip Planning"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Farm Insurance Agent",
      category: "Insurance Agency",
      description: "Agricultural design for farm property and livestock protection coverage",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Farm Coverage", "Livestock Protection", "Equipment Insurance", "Weather Protection"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Senior Insurance Agent",
      category: "Healthcare",
      description: "Senior-friendly design with Medicare supplements and retirement planning",
      image: "https://images.unsplash.com/photo-1559757175-3ca99b57eedf?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Medicare Supplements", "Senior Discounts", "Health Plans", "Retirement Planning"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Young Adult Insurance Agent",
      category: "Financial Services",
      description: "Modern design targeting young adults with starter policies and education",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Starter Policies", "Budget Plans", "Education Resources", "Mobile App"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Small Business Insurance Agent",
      category: "Consulting",
      description: "Entrepreneur-focused design for small business protection and liability coverage",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Business Protection", "Liability Coverage", "Risk Assessment", "Growth Planning"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Technology Insurance Agent",
      category: "Consulting",
      description: "Tech-focused design for cyber liability and technology business coverage",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Cyber Protection", "Data Breach Coverage", "Tech Liability", "Digital Assets"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Construction Insurance Agent",
      category: "Consulting",
      description: "Industrial design for construction business coverage and contractor protection",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Contractor Coverage", "Project Insurance", "Equipment Protection", "Worker Safety"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Restaurant Insurance Agent",
      category: "Restaurant",
      description: "Food service design for restaurant liability and business interruption coverage",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Food Service Coverage", "Liability Protection", "Equipment Insurance", "Business Interruption"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Medical Practice Insurance Agent",
      category: "Healthcare",
      description: "Healthcare-focused design for medical malpractice and practice coverage",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Malpractice Coverage", "Practice Protection", "Compliance Tools", "Risk Management"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Fitness Business Insurance Agent",
      category: "Fitness",
      description: "Active design for gym and fitness business liability and equipment coverage",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Fitness Liability", "Equipment Coverage", "Member Protection", "Instructor Insurance"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Retail Insurance Agent",
      category: "Consulting",
      description: "Commercial design for retail business protection and inventory coverage",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Retail Coverage", "Inventory Protection", "Customer Liability", "Business Interruption"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Professional Services Insurance Agent",
      category: "Legal",
      description: "Corporate design for professional liability and errors & omissions coverage",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Professional Liability", "E&O Coverage", "Client Protection", "Practice Management"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Event Insurance Agent",
      category: "Insurance Agency",
      description: "Celebration-themed design for event protection and special occasion coverage",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Event Protection", "Vendor Coverage", "Weather Insurance", "Cancellation Protection"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Student Insurance Agent",
      category: "Education",
      description: "Campus-focused design for student health plans and education coverage",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Student Health Plans", "Campus Coverage", "International Student", "Budget Options"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "International Insurance Agent",
      category: "Insurance Agency",
      description: "Global design for expatriate coverage and international business protection",
      image: "https://images.unsplash.com/photo-1597149962419-0d71ac2c4292?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Global Coverage", "Expat Insurance", "International Health", "Currency Protection"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Non-Profit Insurance Agent",
      category: "Non-Profit",
      description: "Community-focused design for non-profit organization coverage and volunteer protection",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Non-Profit Coverage", "Volunteer Protection", "Event Insurance", "Fundraising Protection"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Entertainment Insurance Agent",
      category: "Entertainment",
      description: "Creative design for entertainment industry coverage and production protection",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Production Insurance", "Equipment Coverage", "Talent Protection", "Event Liability"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Sports Insurance Agent",
      category: "Fitness",
      description: "Athletic design for sports team coverage and athlete protection plans",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Athlete Protection", "Team Coverage", "Sports Equipment", "Injury Insurance"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Beauty Industry Insurance Agent",
      category: "Salon & Spa",
      description: "Elegant design for beauty business liability and professional protection",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Beauty Liability", "Product Coverage", "Client Protection", "Equipment Insurance"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Transportation Insurance Agent",
      category: "Insurance Agency",
      description: "Logistics-focused design for commercial vehicle and transport coverage",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Fleet Coverage", "Cargo Protection", "Driver Insurance", "Route Planning"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Manufacturing Insurance Agent",
      category: "Consulting",
      description: "Industrial design for manufacturing business coverage and equipment protection",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Manufacturing Coverage", "Equipment Protection", "Product Liability", "Worker Safety"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Real Estate Agent Insurance Agent",
      category: "Real Estate",
      description: "Property-focused design for real estate professional coverage and transaction protection",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Professional Liability", "E&O Coverage", "Property Protection", "Client Coverage"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Freelancer Insurance Agent",
      category: "Financial Services",
      description: "Modern design for independent contractor coverage and gig economy protection",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Contractor Coverage", "Gig Protection", "Income Insurance", "Health Plans"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Wedding Insurance Agent",
      category: "Insurance Agency",
      description: "Romantic design for wedding day protection and special event coverage",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Wedding Protection", "Vendor Coverage", "Weather Insurance", "Gift Protection"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Environmental Insurance Agent",
      category: "Insurance Agency",
      description: "Green-focused design for environmental liability and sustainability coverage",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Environmental Liability", "Green Business", "Pollution Coverage", "Sustainability Plans"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Cyber Security Insurance Agent",
      category: "Consulting",
      description: "Tech-security design for cyber liability and data breach protection coverage",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Cyber Liability", "Data Breach Coverage", "Security Assessment", "Recovery Support"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Aviation Insurance Agent",
      category: "Insurance Agency",
      description: "Aviation-themed design for aircraft coverage and pilot protection plans",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Aircraft Coverage", "Pilot Insurance", "Hangar Protection", "Flight Training"],
      difficulty: "Premium",
      rating: 5
    }
  ];

  const filteredExamples = splashPageExamples.filter(example => {
    const matchesCategory = selectedCategory === "All" || example.category === selectedCategory;
    const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Professional": return "bg-blue-100 text-blue-800";
      case "Premium": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 font-bold text-xl">
                <FileText className="h-8 w-8" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the perfect splash page for your business.
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Browse high-quality, professionally-designed splash page examples from various industries. 
            Get inspired and find the perfect style for your business.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search splash pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Grid className="h-4 w-4" />
            <span>View: All</span>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredExamples.length} of {splashPageExamples.length} splash pages
          </div>
        </div>

        {/* Splash Page Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredExamples.map((example, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-60 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge className={getDifficultyColor(example.difficulty)} variant="secondary">
                    {example.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{example.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{example.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {example.features.slice(0, 3).map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {example.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{example.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {example.category}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="group"
                    onClick={() => {
                      // For the first 6 examples, navigate to template preview
                      if (index < 6) {
                        navigate(`/template-preview/${index + 1}`);
                      } else {
                        setPreviewExample(example);
                        setShowPreview(true);
                      }
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-red-50 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to create your own splash page?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Start building your professional website today with our easy-to-use templates and customization tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => navigate('/choose-purpose')}
            >
              Choose Your Template
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3"
              onClick={() => navigate('/')}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Copyright © 2025 Landing Pages for Agents
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && previewExample && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Preview: {previewExample.title}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <SplashPagePreview example={previewExample} />
              <div className="mt-6 text-center">
                <Button
                  onClick={() => {
                    setShowPreview(false);
                    navigate('/choose-purpose');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                >
                  Use This Style - Choose Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}