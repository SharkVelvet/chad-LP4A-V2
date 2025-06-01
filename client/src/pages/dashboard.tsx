import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Website = {
  id: number;
  locationId: number;
  templateId: number;
  domain: string | null;
  subscriptionPlan: string;
  content?: WebsiteContent;
};

type WebsiteContent = {
  id: number;
  websiteId: number;
  businessName: string | null;
  tagline: string | null;
  aboutUs: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  heroImage: string | null;
  logo: string | null;
  galleryImages: string[] | null;
};

type FormSubmission = {
  id: number;
  websiteId: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  submittedAt: string;
};

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");

  const { data: website, isLoading: websiteLoading } = useQuery<Website>({
    queryKey: ["/api/website"],
  });

  const { data: formSubmissions, isLoading: submissionsLoading } = useQuery<FormSubmission[]>({
    queryKey: ["/api/form-submissions"],
  });

  const updateContentMutation = useMutation({
    mutationFn: async (data: Partial<WebsiteContent>) => {
      const res = await apiRequest("PUT", "/api/website/content", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/website"] });
      toast({
        title: "Content Updated",
        description: "Your website content has been successfully updated.",
      });
    },
  });

  const updateSubmissionStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/form-submissions/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/form-submissions"] });
    },
  });

  const handleContentUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contentData = {
      businessName: formData.get("businessName") as string,
      tagline: formData.get("tagline") as string,
      aboutUs: formData.get("aboutUs") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
    };
    updateContentMutation.mutate(contentData);
  };

  const handleStatusChange = (submissionId: number, status: string) => {
    updateSubmissionStatusMutation.mutate({ id: submissionId, status });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (websiteLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <p className="text-gray-600 mb-4">
              Ready to get your website? Choose a template, tell us your preferred domains, and we'll build it for you.
            </p>
            <div className="space-y-2">
              <Button onClick={() => window.location.href = "/templates"}>
                Choose Template
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const content = website.content || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">LocationSite Dashboard</h1>
              <Badge variant="secondary">Location ID: {user?.locationId}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              {website.domain && (
                <a 
                  href={`https://${website.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-blue-700 flex items-center space-x-1"
                >
                  <span>View Live Site</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="forms">Form Submissions</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Text Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Website Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContentUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        defaultValue={content.businessName || ""}
                        placeholder="Your Business Name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        name="tagline"
                        defaultValue={content.tagline || ""}
                        placeholder="Your business tagline"
                      />
                    </div>

                    <div>
                      <Label htmlFor="aboutUs">About Us</Label>
                      <Textarea
                        id="aboutUs"
                        name="aboutUs"
                        rows={4}
                        defaultValue={content.aboutUs || ""}
                        placeholder="Tell customers about your business..."
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Contact Information</Label>
                      <Input
                        name="phone"
                        defaultValue={content.phone || ""}
                        placeholder="Phone Number"
                      />
                      <Input
                        name="email"
                        type="email"
                        defaultValue={content.email || ""}
                        placeholder="Email Address"
                      />
                      <Input
                        name="address"
                        defaultValue={content.address || ""}
                        placeholder="Business Address"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={updateContentMutation.isPending}
                    >
                      {updateContentMutation.isPending ? "Updating..." : "Update Content"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Image Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Website Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Hero Section Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      {content.heroImage ? (
                        <img
                          src={content.heroImage}
                          alt="Hero image"
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-gray-500">No image uploaded</span>
                        </div>
                      )}
                      <Button variant="outline" size="sm">
                        Upload Hero Image
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Business Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      {content.logo ? (
                        <img
                          src={content.logo}
                          alt="Logo"
                          className="w-24 h-24 object-contain mx-auto mb-3"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">Logo</span>
                        </div>
                      )}
                      <Button variant="outline" size="sm">
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Gallery Images</Label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {content.galleryImages?.slice(0, 2).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                      )) || (
                        <>
                          <div className="w-full h-24 bg-gray-100 rounded-lg border flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No image</span>
                          </div>
                          <div className="w-full h-24 bg-gray-100 rounded-lg border flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No image</span>
                          </div>
                        </>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Add Gallery Images
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Form Submissions Tab */}
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <p className="text-gray-600">Messages received through your website contact form</p>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : formSubmissions?.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No form submissions yet.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formSubmissions?.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{submission.name}</TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>{submission.subject || "—"}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={submission.status === "new" ? "default" : 
                                      submission.status === "replied" ? "secondary" : "outline"}
                            >
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(submission.id, 
                                submission.status === "new" ? "replied" : "new")}
                            >
                              {submission.status === "new" ? "Mark Replied" : "Mark New"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings">
            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Website URL</Label>
                    <div className="flex">
                      <span className="px-4 py-2 bg-gray-50 border border-r-0 border-border rounded-l-lg text-gray-600">
                        https://
                      </span>
                      <Input
                        readOnly
                        className="rounded-l-none bg-gray-50 text-gray-600"
                        value={website.domain || "Domain not assigned yet"}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Current Template</Label>
                    <div className="p-4 border border-border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-12 bg-blue-200 rounded" />
                        <div>
                          <h4 className="font-medium">Template #{website.templateId}</h4>
                          <p className="text-sm text-gray-600">Selected template</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Subscription Plan</Label>
                    <div className="p-4 border border-border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium capitalize">{website.subscriptionPlan} Plan</h4>
                          <p className="text-sm text-gray-600">Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${website.subscriptionPlan === "professional" ? "49" : "29"}/month
                          </div>
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            Upgrade
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button variant="destructive" size="sm">
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
