import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Globe, Users, Shield } from "lucide-react";

type Location = {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
};

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  const [loginData, setLoginData] = useState({ username: "", password: "", locationId: "" });
  const [registerData, setRegisterData] = useState({ 
    username: "", 
    email: "",
    password: "", 
    locationId: "" 
  });

  const { data: locations, isLoading: locationsLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate("/templates");
    }
  }, [user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      username: loginData.username,
      password: loginData.password,
      locationId: parseInt(loginData.locationId),
    } as any);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
      locationId: parseInt(registerData.locationId),
      role: "employee",
    } as any);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">LocationSite Pro</h1>
            <p className="text-gray-600">Multi-Location Website Management</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Access Your Account</CardTitle>
              <CardDescription>
                Sign in to manage your location's website or register for a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        placeholder="Enter your username"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-location">Location</Label>
                      <Select 
                        value={loginData.locationId} 
                        onValueChange={(value) => setLoginData({ ...loginData, locationId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations?.map((location) => (
                            <SelectItem key={location.id} value={location.id.toString()}>
                              {location.name} ({location.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending || locationsLoading}
                    >
                      {loginMutation.isPending ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        type="text"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        placeholder="Choose a username"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        placeholder="Create a password"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-location">Location</Label>
                      <Select 
                        value={registerData.locationId} 
                        onValueChange={(value) => setRegisterData({ ...registerData, locationId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations?.map((location) => (
                            <SelectItem key={location.id} value={location.id.toString()}>
                              {location.name} ({location.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerMutation.isPending || locationsLoading}
                    >
                      {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Column - Hero Section */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center text-white">
        <div className="max-w-lg text-center">
          <h2 className="text-4xl font-bold mb-6">
            Professional Websites for Every Location
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Empower your business locations with beautiful, customizable websites that drive results.
          </p>
          
          <div className="grid grid-cols-2 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <Building2 className="h-6 w-6 text-blue-200 mt-1" />
              <div>
                <h3 className="font-semibold">Multi-Location</h3>
                <p className="text-sm text-blue-100">Manage 150+ locations</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Globe className="h-6 w-6 text-blue-200 mt-1" />
              <div>
                <h3 className="font-semibold">Custom Domains</h3>
                <p className="text-sm text-blue-100">Professional web presence</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="h-6 w-6 text-blue-200 mt-1" />
              <div>
                <h3 className="font-semibold">Easy Management</h3>
                <p className="text-sm text-blue-100">Intuitive content editor</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-blue-200 mt-1" />
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-sm text-blue-100">Enterprise-grade platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
