import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

export default function HomePage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      
      if (result.valid) {
        // Store authentication in localStorage
        localStorage.setItem("planright_authenticated", "true");
        setLocation("/template-selection");
      } else {
        toast({
          title: "Access Denied",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to validate password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main Explanation Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FOTYPE Website Builder for Agents
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your professional Agent splash page in just a few simple steps
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Process Steps */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Choose Your Template</h3>
                    <p className="text-gray-600">Pick one of 6 professionally designed templates built specifically for Insurance Agents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Select Your Domain</h3>
                    <p className="text-gray-600">Choose your preferred domain name (URL address) for your website - We take care of purchasing this for you</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Go Live</h3>
                    <p className="text-gray-600">FOTYPE will work with you to get your content updated to your specific needs and have your page live within 3 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Access Card */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Ready to Get Started?
                </CardTitle>
                <p className="text-gray-600 mt-2">Enter your access password to begin building your website</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter access password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Checking..." : "Access Builder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-6 text-center">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                Have your webpage live within 48 to 72 hours!
              </p>
              <p className="text-xl font-semibold text-red-600">
                Some, the same day!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}