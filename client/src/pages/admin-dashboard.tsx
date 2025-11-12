import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Users, Eye, FileText, LogOut, Shield, TrendingUp, Calendar } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface DashboardSummary {
  pageViews: number;
  uniqueVisitors: number;
  organicTraffic: number;
  pendingSubmissions: number;
  totalSubmissions: number;
  recentEvents: any[];
  recentSubmissions: any[];
}

interface FormSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budgetRange: string;
  projectDetails: string;
  status: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const queryClient = useQueryClient();

  // Check if user is authenticated
  const { data: adminUser, isLoading: userLoading } = useQuery({
    queryKey: ["/api/admin/user"],
    retry: false,
  });

  // Get dashboard summary
  const { data: summary, isLoading: summaryLoading } = useQuery<DashboardSummary>({
    queryKey: ["/api/admin/dashboard-summary"],
    enabled: !!adminUser,
  });

  // Get form submissions
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery<FormSubmission[]>({
    queryKey: ["/api/admin/form-submissions"],
    enabled: !!adminUser,
  });

  // Get analytics data
  const { data: analytics = [], isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/admin/analytics"],
    enabled: !!adminUser && selectedTab === "analytics",
  });

  // Get SEO data
  const { data: seoData = [], isLoading: seoLoading } = useQuery({
    queryKey: ["/api/admin/seo"],
    enabled: !!adminUser && selectedTab === "seo",
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("/api/admin/logout", { method: "POST" }),
    onSuccess: () => {
      window.location.href = "/admin/login";
    },
  });

  // Update submission status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      apiRequest(`/api/admin/form-submissions/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/form-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard-summary"] });
    },
  });

  // Redirect if not authenticated
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <div>Verifying credentials...</div>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    window.location.href = "/admin/login";
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {adminUser.username}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="seo">SEO Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{summary.pageViews}</div>
                    <p className="text-xs text-muted-foreground">Recent activity</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{summary.uniqueVisitors}</div>
                    <p className="text-xs text-muted-foreground">Unique sessions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{summary.organicTraffic}</div>
                    <p className="text-xs text-muted-foreground">From search engines</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{summary.pendingSubmissions}</div>
                    <p className="text-xs text-muted-foreground">Need review</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Submissions */}
            {summary?.recentSubmissions && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Form Submissions</CardTitle>
                  <CardDescription>Latest inquiries from your page</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {summary.recentSubmissions.map((submission: any) => (
                      <div key={submission.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{submission.name}</p>
                          <p className="text-sm text-gray-500">{submission.email}</p>
                          <p className="text-xs text-gray-400">{formatDate(submission.submittedAt)}</p>
                        </div>
                        <Badge variant={submission.status === 'new' ? 'destructive' : 'secondary'}>
                          {submission.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Submissions</CardTitle>
                <CardDescription>Manage custom page inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div>Loading submissions...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.name}</TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>{submission.company || "—"}</TableCell>
                          <TableCell>{submission.budgetRange}</TableCell>
                          <TableCell>
                            <Badge variant={submission.status === 'new' ? 'destructive' : 'secondary'}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                          <TableCell>
                            <Select
                              value={submission.status}
                              onValueChange={(value) => 
                                updateStatusMutation.mutate({ id: submission.id, status: value })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Events</CardTitle>
                <CardDescription>User interactions and page views</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <div>Loading analytics...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Type</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Session ID</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analytics.slice(0, 50).map((event: any) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <Badge variant="outline">{event.eventType}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{event.url}</TableCell>
                          <TableCell className="font-mono text-xs">{event.sessionId.slice(0, 8)}...</TableCell>
                          <TableCell>{event.country || "—"}</TableCell>
                          <TableCell>{formatDate(event.timestamp)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Data</CardTitle>
                <CardDescription>Search engine optimization tracking</CardDescription>
              </CardHeader>
              <CardContent>
                {seoLoading ? (
                  <div>Loading SEO data...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>URL</TableHead>
                        <TableHead>Page Title</TableHead>
                        <TableHead>Search Query</TableHead>
                        <TableHead>Organic</TableHead>
                        <TableHead>Rank</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {seoData.slice(0, 50).map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell className="max-w-xs truncate">{item.url}</TableCell>
                          <TableCell>{item.pageTitle || "—"}</TableCell>
                          <TableCell>{item.searchQuery || "—"}</TableCell>
                          <TableCell>
                            <Badge variant={item.organicTraffic ? "default" : "secondary"}>
                              {item.organicTraffic ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.rank || "—"}</TableCell>
                          <TableCell>{formatDate(item.timestamp)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}