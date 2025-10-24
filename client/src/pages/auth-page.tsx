import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Globe, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OTPVerification from "@/components/otp-verification";

export default function AuthPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ username: "", password: "", siteType: "" });
  const [registerData, setRegisterData] = useState({ 
    username: "", 
    email: "",
    password: "", 
    siteType: "" 
  });
  const [otpData, setOtpData] = useState<{ userId: number; email: string; type: 'signup' | 'login' } | null>(null);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      // Redirect to dashboard
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", data);
      return res.json();
    },
    onSuccess: (data) => {
      // OTP sent, show verification screen
      setOtpData({ userId: data.userId, email: data.email, type: 'login' });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { username: string; email: string; password: string }) => {
      const res = await apiRequest("POST", "/api/register", data);
      return res.json();
    },
    onSuccess: (data) => {
      // OTP sent, show verification screen
      setOtpData({ userId: data.userId, email: data.email, type: 'signup' });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.siteType) {
      return; // Site type is required
    }
    
    // Store site type selection for later use
    localStorage.setItem('selectedSiteType', loginData.siteType);
    
    loginMutation.mutate({
      username: loginData.username,
      password: loginData.password,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.siteType) {
      return; // Site type is required
    }
    
    // Store site type selection for later use
    localStorage.setItem('selectedSiteType', registerData.siteType);
    
    registerMutation.mutate({
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
    });
  };

  const handleOTPVerified = () => {
    // After OTP verification, user is logged in, navigate to dashboard
    window.location.href = '/dashboard';
  };

  // Show OTP verification screen if OTP data is set
  if (otpData) {
    return (
      <OTPVerification
        userId={otpData.userId}
        email={otpData.email}
        type={otpData.type}
        onVerified={handleOTPVerified}
      />
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
            <p className="text-gray-600 mt-2">Sign in to create your website</p>
          </div>

          <Tabs defaultValue="register" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-site-type">What type of site are you interested in?</Label>
                      <Select value={loginData.siteType} onValueChange={(value) => setLoginData({ ...loginData, siteType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select site type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-page">Splash Page</SelectItem>
                          <SelectItem value="full-site">Full Site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loginMutation.isPending || !loginData.siteType}
                    >
                      {loginMutation.isPending ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create a new account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        type="text"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-site-type">What type of site are you interested in?</Label>
                      <Select value={registerData.siteType} onValueChange={(value) => setRegisterData({ ...registerData, siteType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select site type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-page">Splash Page</SelectItem>
                          <SelectItem value="full-site">Full Site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={registerMutation.isPending || !registerData.siteType}
                    >
                      {registerMutation.isPending ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
        <div className="text-center text-white max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">Build Your Professional Website</h2>
            <p className="text-xl text-blue-100">
              Choose from professional templates and create a stunning online presence in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Single Page</h3>
              <p className="text-sm text-blue-100">Perfect for businesses, portfolios, and landing pages</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Full Site</h3>
              <p className="text-sm text-blue-100">Complete websites with multiple pages and features</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Multi-tenant</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}