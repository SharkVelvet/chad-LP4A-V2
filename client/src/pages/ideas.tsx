import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Filter, Grid, Eye, Star, FileText, Search } from "lucide-react";
import { useState } from "react";

export default function Ideas() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All", "Insurance Agency", "Financial Services", "Real Estate", "Healthcare", 
    "Legal", "Consulting", "Restaurant", "Salon & Spa", "Fitness", "Education", "Non-Profit"
  ];

  const splashPageExamples = [
    {
      title: "Modern Insurance Agency",
      category: "Insurance Agency",
      description: "Clean, professional design with trust-building elements and clear call-to-actions",
      image: "/attached_assets/template1-preview.png",
      features: ["Quote Calculator", "Client Portal", "Policy Finder", "Agent Bio"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Financial Advisor Professional",
      category: "Financial Services", 
      description: "Elegant layout focusing on expertise and client testimonials",
      image: "/attached_assets/template2-preview.png",
      features: ["Investment Tools", "Market Updates", "Consultation Booking", "Resources"],
      difficulty: "Premium",
      rating: 5
    },
    {
      title: "Life Insurance Specialist",
      category: "Insurance Agency",
      description: "Warm, family-focused design emphasizing protection and security",
      image: "/attached_assets/template3-preview.png",
      features: ["Coverage Calculator", "Family Protection", "Claims Support", "Educational Content"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Health Insurance Expert",
      category: "Healthcare",
      description: "Medical-themed design with health-focused messaging and easy navigation",
      image: "/attached_assets/template4-preview.png",
      features: ["Plan Comparison", "Provider Network", "Enrollment Help", "Health Resources"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Business Insurance Solutions",
      category: "Insurance Agency",
      description: "Corporate-style layout targeting business owners and entrepreneurs",
      image: "/attached_assets/template5-preview.png",
      features: ["Risk Assessment", "Industry Solutions", "Claims Management", "Business Tools"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Personal Finance Coach",
      category: "Financial Services",
      description: "Approachable design with educational focus and success stories",
      image: "/attached_assets/template6-preview.png",
      features: ["Budget Planner", "Goal Setting", "Financial Education", "Success Stories"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Real Estate Professional",
      category: "Real Estate",
      description: "Property-focused design with listing integration and market insights",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Property Search", "Market Analysis", "Virtual Tours", "Agent Profile"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Medical Practice",
      category: "Healthcare",
      description: "Clean medical design with appointment booking and patient resources",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Online Booking", "Patient Portal", "Health Resources", "Insurance Info"],
      difficulty: "Professional",
      rating: 5
    },
    {
      title: "Legal Services Firm",
      category: "Legal",
      description: "Professional legal design emphasizing expertise and case results",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Case Studies", "Legal Resources", "Consultation Booking", "Attorney Profiles"],
      difficulty: "Premium",
      rating: 4
    },
    {
      title: "Business Consulting",
      category: "Consulting",
      description: "Strategic design showcasing expertise and client success stories",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Strategy Tools", "Case Studies", "ROI Calculator", "Expert Insights"],
      difficulty: "Premium", 
      rating: 5
    },
    {
      title: "Restaurant & Catering",
      category: "Restaurant",
      description: "Appetizing design with menu showcase and online ordering",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Online Menu", "Reservation System", "Photo Gallery", "Special Events"],
      difficulty: "Professional",
      rating: 4
    },
    {
      title: "Beauty Salon & Spa",
      category: "Salon & Spa",
      description: "Luxurious design with service showcase and appointment booking",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=479&h=360&q=80",
      features: ["Service Menu", "Online Booking", "Gallery", "Staff Profiles"],
      difficulty: "Professional",
      rating: 4
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
                <FileText className="h-6 w-6 text-red-600" />
                <span className="text-gray-900">Landing Pages for Agents</span>
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
                    onClick={() => navigate('/template-selection')}
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
              onClick={() => navigate('/template-selection')}
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
            built by <a href="https://fotype.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-medium">FOTYPE</a> | Copyright © 2025
          </p>
        </div>
      </div>
    </div>
  );
}