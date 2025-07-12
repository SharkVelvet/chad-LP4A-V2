import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Lightbulb, TrendingUp, Users, Target, Zap, ArrowRight, FileText } from "lucide-react";

export default function Ideas() {
  const [, navigate] = useLocation();

  const ideaCategories = [
    {
      title: "Marketing Strategies",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-blue-500",
      ideas: [
        {
          title: "Social Media Content Calendar",
          description: "Create engaging posts showcasing client success stories and insurance education",
          difficulty: "Easy",
          impact: "High"
        },
        {
          title: "Local Community Partnerships",
          description: "Partner with local businesses to cross-promote services and build referral networks",
          difficulty: "Medium",
          impact: "High"
        },
        {
          title: "Educational Webinar Series",
          description: "Host monthly webinars on insurance topics to establish thought leadership",
          difficulty: "Medium",
          impact: "Medium"
        }
      ]
    },
    {
      title: "Client Engagement",
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-500",
      ideas: [
        {
          title: "Quarterly Insurance Reviews",
          description: "Schedule regular check-ins to review and update client policies",
          difficulty: "Easy",
          impact: "High"
        },
        {
          title: "Client Appreciation Events",
          description: "Host annual events to thank clients and encourage referrals",
          difficulty: "Medium",
          impact: "Medium"
        },
        {
          title: "Personalized Policy Newsletters",
          description: "Send customized newsletters with policy updates and industry insights",
          difficulty: "Easy",
          impact: "Medium"
        }
      ]
    },
    {
      title: "Business Growth",
      icon: <Target className="h-6 w-6" />,
      color: "bg-red-500",
      ideas: [
        {
          title: "Referral Incentive Program",
          description: "Create a structured program rewarding clients for successful referrals",
          difficulty: "Medium",
          impact: "High"
        },
        {
          title: "Niche Market Specialization",
          description: "Focus on specific demographics or professions for targeted expertise",
          difficulty: "Hard",
          impact: "High"
        },
        {
          title: "Digital Lead Generation",
          description: "Implement online marketing funnels to capture and nurture leads",
          difficulty: "Hard",
          impact: "High"
        }
      ]
    },
    {
      title: "Innovation",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-purple-500",
      ideas: [
        {
          title: "Mobile Insurance App",
          description: "Develop an app for clients to manage policies and file claims easily",
          difficulty: "Hard",
          impact: "High"
        },
        {
          title: "AI-Powered Risk Assessment",
          description: "Use AI tools to provide more accurate and personalized risk evaluations",
          difficulty: "Hard",
          impact: "Medium"
        },
        {
          title: "Virtual Reality Office Tours",
          description: "Offer VR office visits for remote clients to build trust and connection",
          difficulty: "Hard",
          impact: "Low"
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Business Ideas for Insurance Agents</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover innovative strategies and actionable ideas to grow your insurance business, 
            engage clients, and stay ahead of the competition.
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="space-y-12">
          {ideaCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center mb-6">
                <div className={`${category.color} p-3 rounded-lg mr-4`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.ideas.map((idea, ideaIndex) => (
                  <Card key={ideaIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {idea.title}
                        </CardTitle>
                        <div className="flex space-x-2">
                          <Badge className={getDifficultyColor(idea.difficulty)} variant="secondary">
                            {idea.difficulty}
                          </Badge>
                          <Badge className={getImpactColor(idea.impact)} variant="secondary">
                            {idea.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {idea.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full group">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-red-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Implement These Ideas?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start building your professional website today and put these strategies into action 
            with a stunning online presence.
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
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            built by <a href="https://fotype.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-medium">FOTYPE</a> | Copyright © 2025
          </p>
        </div>
      </div>
    </div>
  );
}