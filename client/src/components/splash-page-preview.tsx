import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Star, Shield, Users, Award, Clock } from "lucide-react";

interface SplashPagePreviewProps {
  example: {
    title: string;
    category: string;
    description: string;
    features: string[];
    difficulty: string;
    rating: number;
  };
}

export default function SplashPagePreview({ example }: SplashPagePreviewProps) {
  const getAgentName = (title: string) => {
    const specialties = {
      "Auto Insurance Agent": "Michael Rodriguez",
      "Home Insurance Agent": "Sarah Johnson", 
      "Travel Insurance Agent": "David Chen",
      "Life Insurance Agent": "Jennifer Williams",
      "Health Insurance Agent": "Robert Martinez",
      "Pet Insurance Agent": "Lisa Thompson",
      "Motorcycle Insurance Agent": "James Wilson",
      "Boat Insurance Agent": "Maria Garcia",
      "RV Insurance Agent": "Thomas Anderson",
      "Farm Insurance Agent": "Patricia Brown",
      "Senior Insurance Agent": "Barbara Davis",
      "Young Adult Insurance Agent": "Christopher Lee",
      "Commercial Insurance Agent": "Amanda Miller",
      "Technology Insurance Agent": "Kevin Park",
      "Construction Insurance Agent": "Michelle Taylor"
    };
    return specialties[title as keyof typeof specialties] || "Alex Thompson";
  };

  const getSpecialtyColor = (category: string) => {
    const colors = {
      "Insurance Agency": "bg-red-600",
      "Healthcare": "bg-blue-600", 
      "Real Estate": "bg-green-600",
      "Financial Services": "bg-purple-600",
      "Legal": "bg-gray-600",
      "Consulting": "bg-orange-600"
    };
    return colors[category as keyof typeof colors] || "bg-red-600";
  };

  const agentName = getAgentName(example.title);
  const colorClass = getSpecialtyColor(example.category);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <div className={`${colorClass} text-white py-16 px-8 text-center relative`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{agentName}</h1>
          <p className="text-xl mb-4">{example.title}</p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{example.description}</p>
          <div className="mt-6 flex justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
              Get Free Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Me?</h2>
          <p className="text-lg text-gray-600">Professional insurance services tailored to your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {example.features.map((feature, index) => {
            const icons = [Clock, Users, Award, Shield];
            const IconComponent = icons[index % icons.length];
            
            return (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className={`${colorClass} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                  <p className="text-sm text-gray-600">Professional service you can trust</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="h-5 w-5" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="h-5 w-5" />
              <span>{agentName.toLowerCase().replace(' ', '.')}@insurance.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span>Downtown Office</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className={`${colorClass} hover:opacity-90 px-8`}>
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Learn More
            </Button>
          </div>

          <div className="mt-6 flex justify-center items-center gap-1">
            {[1,2,3,4,5].map((star) => (
              <Star 
                key={star} 
                className={`h-5 w-5 ${star <= example.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-gray-600">({example.rating}/5 rating)</span>
          </div>
        </div>
      </div>
    </div>
  );
}