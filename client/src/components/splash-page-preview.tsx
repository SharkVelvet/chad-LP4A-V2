import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Star, Shield, Users, Award, Clock, Car, Home, Plane, Heart, Briefcase, Stethoscope, Bike, Anchor, Truck, Tractor, GraduationCap, Baby, Building, Laptop, HardHat, Utensils, Dumbbell, FileText, Globe, TreePine, Zap, Camera } from "lucide-react";

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
  // Get unique color and icon for each insurance type (using Template 1 structure for all)
  const getDesignConfig = (title: string) => {
    const configs = {
      "Auto Insurance Agent": { name: "Michael Rodriguez", primaryColor: "bg-blue-600", icon: Car },
      "Home Insurance Agent": { name: "Sarah Johnson", primaryColor: "bg-green-600", icon: Home },
      "Travel Insurance Agent": { name: "David Chen", primaryColor: "bg-orange-600", icon: Plane },
      "Life Insurance Agent": { name: "Jennifer Williams", primaryColor: "bg-purple-600", icon: Heart },
      "Health Insurance Agent": { name: "Dr. Robert Martinez", primaryColor: "bg-teal-600", icon: Stethoscope },
      "Pet Insurance Agent": { name: "Lisa Thompson", primaryColor: "bg-pink-600", icon: Heart },
      "Motorcycle Insurance Agent": { name: "James Wilson", primaryColor: "bg-gray-800", icon: Bike },
      "Boat Insurance Agent": { name: "Captain Maria Garcia", primaryColor: "bg-cyan-600", icon: Anchor },
      "RV Insurance Agent": { name: "Tom Anderson", primaryColor: "bg-amber-600", icon: Truck },
      "Farm Insurance Agent": { name: "Patricia Brown", primaryColor: "bg-yellow-600", icon: Tractor },
      "Senior Insurance Agent": { name: "Barbara Davis", primaryColor: "bg-indigo-600", icon: Users },
      "Young Adult Insurance Agent": { name: "Chris Lee", primaryColor: "bg-emerald-600", icon: GraduationCap },
      "Technology Insurance Agent": { name: "Kevin Park", primaryColor: "bg-slate-600", icon: Laptop },
      "Construction Insurance Agent": { name: "Michelle Taylor", primaryColor: "bg-orange-700", icon: HardHat },
      "Restaurant Insurance Agent": { name: "Roberto Martinez", primaryColor: "bg-rose-600", icon: Utensils },
      "Fitness Business Insurance Agent": { name: "Marcus Strong", primaryColor: "bg-lime-600", icon: Dumbbell },
      "Disability Insurance Agent": { name: "Dr. Helen Carter", primaryColor: "bg-violet-600", icon: Heart },
      "Workers Comp Insurance Agent": { name: "David Wilson", primaryColor: "bg-stone-600", icon: Shield },
      "Small Business Insurance Agent": { name: "Amanda Miller", primaryColor: "bg-sky-600", icon: Building },
      "Medical Practice Insurance Agent": { name: "Dr. Sarah Kim", primaryColor: "bg-red-600", icon: Stethoscope }
    };
    
    return configs[title as keyof typeof configs] || {
      name: "Alex Thompson",
      primaryColor: "bg-red-600",
      icon: Shield
    };
  };

  const config = getDesignConfig(example.title);
  const IconComponent = config.icon;

  // Template 1 style layout with different colors and icons for each insurance type
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`${config.primaryColor} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <IconComponent className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">{config.name}</h1>
            <p className="text-2xl mb-6">Your Trusted {example.title}</p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">{example.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {config.name}</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience in the insurance industry, I am dedicated to providing 
                personalized coverage solutions that protect what matters most to you and your family.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                My expertise in {example.title.toLowerCase()} allows me to find the right coverage 
                at competitive rates while ensuring exceptional customer service every step of the way.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">500+ Happy Clients</span>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className={`${config.primaryColor} rounded-2xl p-8 text-white`}>
                <h3 className="text-2xl font-bold mb-6">Why Choose Me?</h3>
                <div className="space-y-4">
                  {example.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-white" />
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive insurance solutions tailored to your specific needs and budget.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {example.features.map((feature, index) => {
              const serviceIcons = [Shield, Users, Award, Clock];
              const ServiceIcon = serviceIcons[index % serviceIcons.length];
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className={`${config.primaryColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <ServiceIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature}</h3>
                    <p className="text-gray-600">Professional service you can trust</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Protected?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact me today for a free consultation and personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone className="h-5 w-5" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Mail className="h-5 w-5" />
              <span>{config.name.toLowerCase().replace(' ', '.')}@insurance.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span>Downtown Office</span>
            </div>
          </div>
          <Button size="lg" className={`${config.primaryColor} hover:opacity-90 px-8 py-3`}>
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}