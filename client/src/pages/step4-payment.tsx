import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Shield, Check, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SubscriptionForm from '@/components/subscription-form';

export default function Step4Payment() {
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { user, isLoading, registerMutation } = useAuth();

  const form = useForm({
    resolver: zodResolver(insertUserSchema.extend({
      confirmPassword: insertUserSchema.shape.password,
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleGoBack = () => {
    navigate("/step3");
  };

  const handlePaymentSuccess = () => {
    navigate("/dashboard");
  };

  const onRegisterSubmit = (data: any) => {
    registerMutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
      locationId: 1, // Default location for new users
    }, {
      onSuccess: () => {
        setShowAuthForm(false);
      },
    });
  };

  // Show auth form if user is not logged in
  if (!isLoading && !user && !showAuthForm) {
    setShowAuthForm(true);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleGoBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Plan|right Splash Page Onboarding</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Step 4 of 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h2>
          <p className="text-gray-600">Secure payment to start your website setup and subscription.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            {showAuthForm ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Create Your Account
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Please create an account to complete your subscription setup.
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirm password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating Account..." : "Create Account & Continue"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Billing Schedule</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• <strong>Today:</strong> $38 (Planright first month)</li>
                      <li>• <strong>Every 30 days:</strong> $18 (Planright renewal)</li>
                      <li>• <strong>Total contract:</strong> 12 months</li>
                    </ul>
                  </div>

                  {user && (
                    <SubscriptionForm 
                      plan="planright-website"
                      onSuccess={handlePaymentSuccess}
                      isLoading={isProcessing}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Website Setup & First Month</h4>
                      <p className="text-sm text-gray-600">Domain, hosting, setup, content work</p>
                    </div>
                    <div className="text-xl font-bold">$38</div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Monthly Renewal (11 months)</h4>
                      <p className="text-sm text-gray-600">Domain & hosting maintenance</p>
                    </div>
                    <div className="text-xl font-bold">$18/month</div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total First Payment</span>
                      <span>$38</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      You will only be charged $38 today. Your card will be automatically charged $18 every 30 days starting from today's date.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure & Protected
                  </h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li className="flex items-center">
                      <Check className="h-3 w-3 mr-2" />
                      256-bit SSL encryption
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 mr-2" />
                      PCI DSS compliant
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 mr-2" />
                      Your data is never stored
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}