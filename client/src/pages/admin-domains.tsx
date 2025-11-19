import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface Page {
  id: number;
  userId: number;
  domain: string | null;
  domainStatus: string | null;
  domainVerified: boolean;
  subscriptionStatus: string;
}

export default function AdminDomains() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  if (user?.role !== 'super_admin') {
    navigate('/dashboard');
    return null;
  }

  const { data: pages = [], isLoading: pagesLoading, refetch } = useQuery<Page[]>({
    queryKey: ["/api/admin/all-pages"],
  });

  const fixDnsMutation = useMutation({
    mutationFn: async (domain: string) => {
      const res = await apiRequest("POST", "/api/admin/fix-domain-dns", { domain });
      return res.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "DNS Fixed",
        description: data.message || "Domain DNS has been reconfigured",
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Fix DNS",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const addToCaddyMutation = useMutation({
    mutationFn: async (domain: string) => {
      const res = await apiRequest("POST", "/api/admin/caddy/add-domain", { domain });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Added to Caddy",
        description: "Domain added to Caddy allowlist",
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add to Caddy",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const domainsWithPages = pages.filter(p => p.domain);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Domain Management</h1>
                <p className="text-sm text-gray-500">View and fix domain configurations</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/client-users')}
              >
                Client Users
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Domains ({domainsWithPages.length})</CardTitle>
            <CardDescription>
              Manage customer domains and fix DNS issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pagesLoading ? (
              <div className="text-center py-8">Loading domains...</div>
            ) : domainsWithPages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No domains configured yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Page ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domainsWithPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span>{page.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          page.domainStatus === 'active' ? 'default' :
                          page.domainStatus === 'dns_configured' ? 'secondary' :
                          'outline'
                        }>
                          {page.domainStatus || 'pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {page.domainVerified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">#{page.id}</TableCell>
                      <TableCell className="text-gray-500">#{page.userId}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => fixDnsMutation.mutate(page.domain!)}
                            disabled={fixDnsMutation.isPending}
                            data-testid={`button-fix-dns-${page.domain}`}
                          >
                            {fixDnsMutation.isPending ? (
                              <>
                                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                Fixing...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Fix DNS
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => addToCaddyMutation.mutate(page.domain!)}
                            disabled={addToCaddyMutation.isPending}
                            data-testid={`button-add-caddy-${page.domain}`}
                          >
                            Add to Caddy
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
