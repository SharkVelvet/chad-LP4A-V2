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
  // Get unique design configuration for each insurance type
  const getDesignConfig = (title: string) => {
    const configs = {
      "Auto Insurance Agent": { name: "Michael Rodriguez", primaryColor: "bg-blue-600", icon: Car, layout: "modern" },
      "Home Insurance Agent": { name: "Sarah Johnson", primaryColor: "bg-green-600", icon: Home, layout: "classic" },
      "Travel Insurance Agent": { name: "David Chen", primaryColor: "bg-orange-600", icon: Plane, layout: "adventure" },
      "Life Insurance Agent": { name: "Jennifer Williams", primaryColor: "bg-purple-600", icon: Heart, layout: "family" },
      "Health Insurance Agent": { name: "Dr. Robert Martinez", primaryColor: "bg-teal-600", icon: Stethoscope, layout: "medical" },
      "Pet Insurance Agent": { name: "Lisa Thompson", primaryColor: "bg-pink-600", icon: Heart, layout: "playful" },
      "Motorcycle Insurance Agent": { name: "James Wilson", primaryColor: "bg-gray-800", icon: Bike, layout: "edgy" },
      "Boat Insurance Agent": { name: "Captain Maria Garcia", primaryColor: "bg-cyan-600", icon: Anchor, layout: "nautical" },
      "RV Insurance Agent": { name: "Tom Anderson", primaryColor: "bg-amber-600", icon: Truck, layout: "adventure" },
      "Farm Insurance Agent": { name: "Patricia Brown", primaryColor: "bg-yellow-600", icon: Tractor, layout: "rural" },
      "Senior Insurance Agent": { name: "Barbara Davis", primaryColor: "bg-indigo-600", icon: Users, layout: "elegant" },
      "Young Adult Insurance Agent": { name: "Chris Lee", primaryColor: "bg-emerald-600", icon: GraduationCap, layout: "trendy" },
      "Technology Insurance Agent": { name: "Kevin Park", primaryColor: "bg-slate-600", icon: Laptop, layout: "tech" },
      "Construction Insurance Agent": { name: "Michelle Taylor", primaryColor: "bg-orange-700", icon: HardHat, layout: "industrial" },
      "Restaurant Insurance Agent": { name: "Roberto Martinez", primaryColor: "bg-rose-600", icon: Utensils, layout: "hospitality" },
      "Fitness Business Insurance Agent": { name: "Marcus Strong", primaryColor: "bg-lime-600", icon: Dumbbell, layout: "energetic" },
      "Disability Insurance Agent": { name: "Dr. Helen Carter", primaryColor: "bg-violet-600", icon: Heart, layout: "caring" },
      "Workers Comp Insurance Agent": { name: "David Wilson", primaryColor: "bg-stone-600", icon: Shield, layout: "protective" },
      "Small Business Insurance Agent": { name: "Amanda Miller", primaryColor: "bg-sky-600", icon: Building, layout: "professional" },
      "Medical Practice Insurance Agent": { name: "Dr. Sarah Kim", primaryColor: "bg-red-600", icon: Stethoscope, layout: "medical" }
    };
    
    return configs[title as keyof typeof configs] || {
      name: "Alex Thompson",
      primaryColor: "bg-red-600",
      icon: Shield,
      layout: "default"
    };
  };

  const config = getDesignConfig(example.title);
  const IconComponent = config.icon;

  // Different layout styles based on insurance type
  if (config.layout === "modern") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Modern Hero */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <IconComponent className="h-16 w-16 text-white mr-4" />
                  <div>
                    <h1 className="text-4xl font-bold">{config.name}</h1>
                    <p className="text-xl opacity-90">{example.title}</p>
                  </div>
                </div>
                <p className="text-lg mb-8 max-w-lg">{example.description}</p>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Instant Quote
                </Button>
              </div>
              <div className="hidden lg:block">
                <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
                  <Car className="h-32 w-32 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modern Features */}
        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {example.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature}</h3>
                <p className="text-gray-600">Modern solutions for today's drivers</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (config.layout === "classic") {
    return (
      <div className="min-h-screen bg-green-50">
        {/* Classic Header */}
        <div className="bg-white border-b-4 border-green-600">
          <div className="max-w-4xl mx-auto px-6 py-8 text-center">
            <IconComponent className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{config.name}</h1>
            <p className="text-xl text-green-600 font-semibold">{example.title}</p>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
        </div>
        {/* Classic Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-serif text-center text-gray-900 mb-8">Protecting Your Home Since 1995</h2>
            <p className="text-lg text-gray-700 text-center mb-8">{example.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {example.features.map((feature, index) => (
                <div key={index} className="flex items-center p-4 border-l-4 border-green-600 bg-green-50">
                  <Home className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-bold text-lg">{feature}</h3>
                    <p className="text-gray-600">Trusted expertise</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              Protect Your Home Today
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (config.layout === "adventure") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
        {/* Adventure Hero */}
        <div className="relative text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <IconComponent className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-6xl font-bold mb-4">{config.name}</h1>
              <p className="text-2xl mb-6">Adventure Awaits - Travel Protected!</p>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">{example.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full">
                Start Your Journey →
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        {/* Adventure Features */}
        <div className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Travel With Confidence?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {example.features.map((feature, index) => (
                <div key={index} className="flex items-center p-6 bg-orange-50 rounded-2xl">
                  <div className="bg-orange-500 p-3 rounded-full mr-4">
                    <Plane className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{feature}</h3>
                    <p className="text-gray-600">Adventure-ready coverage</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (config.layout === "medical") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Medical Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Stethoscope className="h-8 w-8 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{config.name}</h1>
                  <p className="text-teal-600">{example.title}</p>
                </div>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Get Coverage
              </Button>
            </div>
          </div>
        </div>
        {/* Medical Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Health, Our Priority</h2>
              <p className="text-lg text-gray-700 mb-8">{example.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {example.features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                    <h3 className="font-bold text-lg mb-2">{feature}</h3>
                    <p className="text-gray-600">Professional healthcare coverage</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-teal-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-teal-800 mb-6">Quick Quote</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-3 text-teal-600" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="h-5 w-5 mr-3 text-teal-600" />
                  <span>health@insurance.com</span>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Get Health Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default layout for other types
  return (
    <div className="min-h-screen bg-gray-50">
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
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
              Get Protected
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}