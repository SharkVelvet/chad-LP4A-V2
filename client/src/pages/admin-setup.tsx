import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const setupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SetupForm = z.infer<typeof setupSchema>;

export default function AdminSetup() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  
  const form = useForm<SetupForm>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const setupMutation = useMutation({
    mutationFn: async (data: Omit<SetupForm, "confirmPassword">) => {
      const response = await apiRequest("/api/admin/setup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: () => {
      setSuccess(true);
      setError("");
    },
    onError: (error: any) => {
      setError(error.message || "Failed to create admin user");
    },
  });

  const onSubmit = (data: SetupForm) => {
    setError("");
    const { confirmPassword, ...submitData } = data;
    setupMutation.mutate(submitData);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Setup Complete!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your admin account has been created successfully.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  You can now sign in to the admin dashboard with your credentials.
                </p>
                <Button 
                  onClick={() => window.location.href = "/admin/login"}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Setup
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create the first admin account for your dashboard
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create Admin Account</CardTitle>
            <CardDescription>
              This account will have full access to analytics, SEO data, and form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Choose a username"
                          disabled={setupMutation.isPending}
                        />
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
                        <Input
                          {...field}
                          type="email"
                          placeholder="admin@yourcompany.com"
                          disabled={setupMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Choose a strong password"
                          disabled={setupMutation.isPending}
                        />
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
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm your password"
                          disabled={setupMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={setupMutation.isPending}
                >
                  {setupMutation.isPending ? "Creating Account..." : "Create Admin Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="font-medium text-yellow-800">Security Notice</p>
            <p className="text-yellow-700">
              This setup page will be disabled after creating the first admin account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}