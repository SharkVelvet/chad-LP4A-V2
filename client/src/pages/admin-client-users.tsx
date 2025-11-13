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
import { Users, UserCircle, Loader2, UserPlus, Upload, FileSpreadsheet, CheckCircle, XCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState, Fragment } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type ClientUser = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  status: string;
  billingStatus: string;
  lastLoginAt: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: string | null;
  templateName: string | null;
  pageCount: number;
  createdAt: string;
};

type Template = {
  id: number;
  name: string;
  slug: string;
  category: string;
};

type BulkUploadResult = {
  total: number;
  successful: number;
  failed: number;
  errors: Array<{ row: number; email: string; error: string }>;
};

export default function AdminClientUsers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResults, setUploadResults] = useState<BulkUploadResult | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [pastDueConfirmation, setPastDueConfirmation] = useState<{ open: boolean; userId: number; userEmail: string }>({
    open: false,
    userId: 0,
    userEmail: '',
  });
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

  const bulkUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/admin/bulk-upload-users', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Upload failed');
      }
      
      return res.json();
    },
    onSuccess: (data: BulkUploadResult) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/client-users"] });
      setUploadResults(data);
      setSelectedFile(null);
      
      toast({
        title: "Bulk Upload Complete",
        description: `Successfully created ${data.successful} users. ${data.failed} failed.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Bulk Upload Failed",
        description: error.message || "Could not upload file.",
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/client-users"] });
      toast({
        title: "Status Updated",
        description: "User status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update status.",
        variant: "destructive",
      });
    },
  });

  const updateBillingStatusMutation = useMutation({
    mutationFn: async ({ userId, billingStatus }: { userId: number; billingStatus: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}/billing-status`, { billingStatus });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/client-users"] });
      toast({
        title: "Billing Status Updated",
        description: "User has been notified via email about their account status.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update billing status.",
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

          <div className="flex gap-2">
            <Dialog open={isBulkUploadOpen} onOpenChange={(open) => {
              setIsBulkUploadOpen(open);
              if (!open) {
                setSelectedFile(null);
                setUploadResults(null);
              }
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid="button-bulk-upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Bulk Upload Users</DialogTitle>
                  <DialogDescription>
                    Upload an Excel file (.xlsx or .xls) with user data. Only Email is required.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Excel File Columns</Label>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <div className="font-semibold mb-2">Expected columns:</div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li><strong>Email</strong> (required)</li>
                        <li>First Name (optional)</li>
                        <li>Last Name (optional)</li>
                        <li>Template (optional - template ID number)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setUploadResults(null);
                        }
                      }}
                      data-testid="input-bulk-upload-file"
                    />
                    {selectedFile && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileSpreadsheet className="h-4 w-4" />
                        {selectedFile.name}
                      </div>
                    )}
                  </div>

                  {uploadResults && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="text-sm text-gray-600">Total</div>
                          <div className="text-2xl font-bold">{uploadResults.total}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Successful
                          </div>
                          <div className="text-2xl font-bold text-green-600">{uploadResults.successful}</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded">
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            Failed
                          </div>
                          <div className="text-2xl font-bold text-red-600">{uploadResults.failed}</div>
                        </div>
                      </div>

                      {uploadResults.errors.length > 0 && (
                        <div className="space-y-2">
                          <div className="font-semibold text-sm">Errors:</div>
                          <div className="max-h-40 overflow-y-auto space-y-2">
                            {uploadResults.errors.map((error, idx) => (
                              <Alert key={idx} variant="destructive">
                                <AlertDescription className="text-sm">
                                  <strong>Row {error.row}:</strong> {error.email} - {error.error}
                                </AlertDescription>
                              </Alert>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsBulkUploadOpen(false);
                      setSelectedFile(null);
                      setUploadResults(null);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedFile) {
                        bulkUploadMutation.mutate(selectedFile);
                      }
                    }}
                    disabled={!selectedFile || bulkUploadMutation.isPending}
                    data-testid="button-upload"
                  >
                    {bulkUploadMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Users
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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
                          <SelectItem value="none">None - user will choose later</SelectItem>
                          {templates
                            .sort((a, b) => a.id - b.id)
                            .map((template) => (
                              <SelectItem key={template.id} value={template.id.toString()}>
                                {template.id} - {template.name}
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
                    <Fragment key={client.id}>
                    <TableRow data-testid={`client-row-${client.id}`}>
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
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setExpandedRowId(expandedRowId === client.id ? null : client.id)}
                            data-testid={`button-settings-${client.id}`}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
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
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRowId === client.id && (
                      <TableRow>
                        <TableCell colSpan={6} className="bg-gray-50 p-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-sm font-medium">Account Status</Label>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {client.status === 'active' ? 'Account is active' : 'Account is inactive'}
                                  </p>
                                </div>
                                <Switch
                                  checked={client.status === 'active'}
                                  onCheckedChange={(checked) => {
                                    updateStatusMutation.mutate({
                                      userId: client.id,
                                      status: checked ? 'active' : 'inactive',
                                    });
                                  }}
                                  data-testid={`switch-status-${client.id}`}
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-sm font-medium">Billing Status</Label>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {client.billingStatus === 'current' ? 'Billing is current' : 'Payment past due'}
                                  </p>
                                </div>
                                <Switch
                                  checked={client.billingStatus === 'current'}
                                  onCheckedChange={(checked) => {
                                    if (!checked) {
                                      setPastDueConfirmation({
                                        open: true,
                                        userId: client.id,
                                        userEmail: client.email,
                                      });
                                    } else {
                                      updateBillingStatusMutation.mutate({
                                        userId: client.id,
                                        billingStatus: 'current',
                                      });
                                    }
                                  }}
                                  data-testid={`switch-billing-${client.id}`}
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">Pages</Label>
                                <p className="text-lg font-semibold mt-1">{client.pageCount}</p>
                                <p className="text-xs text-gray-500">Total pages in dashboard</p>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Last Login</Label>
                                <p className="text-sm mt-1">
                                  {client.lastLoginAt 
                                    ? new Date(client.lastLoginAt).toLocaleString() 
                                    : 'Never logged in'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    </Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={pastDueConfirmation.open} onOpenChange={(open) => setPastDueConfirmation({ ...pastDueConfirmation, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Account as Past Due?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                You are about to mark this account as <strong>Past Due</strong>:
              </p>
              <p className="font-medium">{pastDueConfirmation.userEmail}</p>
              <p className="text-yellow-600 font-medium">
                ⚠️ This will send an email notification to the user about their account suspension.
              </p>
              <p>
                All of their pages will be redirected to a suspension notice until billing is resolved.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPastDueConfirmation({ open: false, userId: 0, userEmail: '' })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                updateBillingStatusMutation.mutate({
                  userId: pastDueConfirmation.userId,
                  billingStatus: 'past_due',
                });
                setPastDueConfirmation({ open: false, userId: 0, userEmail: '' });
              }}
              className="bg-red-600 hover:bg-red-700"
              data-testid="confirm-past-due"
            >
              Confirm & Send Email
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
