import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCircle, Loader2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";

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

type Template = {
  id: number;
  name: string;
  slug: string;
  category: string;
};

export default function AdminClientUsers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    templateId: '',
  });

  if (user?.role !== 'super_admin') {
    navigate('/dashboard');
    return null;
  }

  const { data: clients = [], isLoading } = useQuery<ClientUser[]>({
    queryKey: ["/api/admin/client-users"],
  });

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: { firstName: string; lastName: string; email: string; templateId?: string }) => {
      const res = await apiRequest("POST", "/api/admin/create-user", userData);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/client-users"] });
      const message = data.websiteCreated 
        ? "User and website created successfully. They can now log in using OTP."
        : "User created successfully. They can now log in using OTP.";
      toast({
        title: "Success",
        description: message,
      });
      setIsDialogOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', templateId: '' });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Create User",
        description: error.message || "Could not create the user.",
        variant: "destructive",
      });
    },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    createUserMutation.mutate(formData);
  };

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
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Client Users
            </h2>
            <p className="text-gray-600">Manage and support your customer accounts</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-user">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. Optionally assign a template to comp them a free website.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      data-testid="input-firstName"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      data-testid="input-lastName"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      data-testid="input-email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="template">Template (Optional)</Label>
                    <Select
                      value={formData.templateId}
                      onValueChange={(value) => setFormData({ ...formData, templateId: value })}
                    >
                      <SelectTrigger data-testid="select-template">
                        <SelectValue placeholder="None - user will choose later" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            Template {template.id} - {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Select a template to automatically create a free website for this user
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createUserMutation.isPending} data-testid="button-submit-user">
                    {createUserMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create User'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
