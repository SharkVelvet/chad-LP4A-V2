import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Shield, Users, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OTPVerification from "@/components/otp-verification";

export default function AuthPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState("");
  const [registerData, setRegisterData] = useState({ 
    username: "", 
    email: ""
  });
  const [otpData, setOtpData] = useState<{ userId: number; email: string; type: 'signup' | 'login' } | null>(null);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await apiRequest("POST", "/api/login", data);
      return res.json();
    },
    onSuccess: (data) => {
      // OTP sent, show verification screen
      setOtpData({ userId: data.userId, email: data.email, type: 'login' });
      toast({
        title: "Code Sent",
        description: "Check your email for the verification code",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Could not send verification code",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { username: string; email: string }) => {
      const res = await apiRequest("POST", "/api/register", data);
      return res.json();
    },
    onSuccess: (data) => {
      // OTP sent, show verification screen
      setOtpData({ userId: data.userId, email: data.email, type: 'signup' });
      toast({
        title: "Code Sent",
        description: "Check your email for the verification code",
      });
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
    loginMutation.mutate({ email: loginEmail });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      username: registerData.username,
      email: registerData.email,
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
            <p className="text-gray-600 mt-2">Enter your email to receive a login code</p>
          </div>

          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>We'll send a verification code to your email</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="login-email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="pl-10"
                          required
                          data-testid="input-login-email"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loginMutation.isPending}
                      data-testid="button-login"
                    >
                      {loginMutation.isPending ? "Sending code..." : "Send Login Code"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create a new account - no password needed</CardDescription>
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
                        placeholder="Choose a username"
                        required
                        data-testid="input-register-username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="register-email"
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="pl-10"
                          required
                          data-testid="input-register-email"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={registerMutation.isPending}
                      data-testid="button-register"
                    >
                      {registerMutation.isPending ? "Creating account..." : "Create Account"}
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
            <h2 className="text-4xl font-bold mb-4">Build Your Professional Page</h2>
            <p className="text-xl text-blue-100">
              Choose from professional templates and create a stunning online presence in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Templates</h3>
              <p className="text-sm text-blue-100">Professional designs ready to customize</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Email Login</h3>
              <p className="text-sm text-blue-100">Simple, secure, passwordless access</p>
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
