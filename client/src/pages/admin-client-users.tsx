import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

type ClientUser = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: string | null;
  templateName: string | null;
  createdAt: string;
};

export default function AdminClientUsers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  if (user?.role !== 'super_admin') {
    navigate('/dashboard');
    return null;
  }

  const { data: clients = [], isLoading } = useQuery<ClientUser[]>({
    queryKey: ["/api/admin/client-users"],
  });

  const impersonateMutation = useMutation({
    mutationFn: async (userId: number) => {
      const res = await apiRequest("POST", `/api/admin/impersonate/${userId}`, {});
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data.user);
      toast({
        title: "Impersonation Active",
        description: `You are now logged in as ${data.user.email}. Refresh to see their dashboard.`,
      });
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Impersonation Failed",
        description: error.message || "Could not impersonate this user.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-border h-16">
        <div className="h-full px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Super Admin - Client Users</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Client Users
          </h2>
          <p className="text-gray-600">Manage and support your customer accounts</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Stripe Subscription</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No client users found
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id} data-testid={`client-row-${client.id}`}>
                      <TableCell className="font-medium">
                        {client.firstName || <span className="text-gray-400 italic">Not set</span>}
                      </TableCell>
                      <TableCell>
                        {client.lastName || <span className="text-gray-400 italic">Not set</span>}
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>
                        {client.stripeSubscriptionId ? (
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {client.subscriptionStatus || 'active'}
                            </Badge>
                            <div className="text-xs text-gray-500 truncate max-w-[200px]">
                              {client.stripeSubscriptionId}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No subscription</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {client.templateName || <span className="text-gray-400 italic">No template</span>}
                      </TableCell>
                      <TableCell>
                        {client.role === 'super_admin' ? (
                          <Badge variant="secondary">Super Admin</Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => impersonateMutation.mutate(client.id)}
                            disabled={impersonateMutation.isPending}
                            data-testid={`button-impersonate-${client.id}`}
                          >
                            {impersonateMutation.isPending ? (
                              <>
                                <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                                Impersonating...
                              </>
                            ) : (
                              <>
                                <UserCircle className="h-3 w-3 mr-2" />
                                Impersonate
                              </>
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
