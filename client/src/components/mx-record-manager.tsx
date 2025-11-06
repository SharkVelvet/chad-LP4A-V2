import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface MxRecord {
  recordId?: string;
  name: string;
  type: string;
  address: string;
  mxPref: number | null;
  ttl: string;
}

interface MxRecordManagerProps {
  domain: string;
}

export function MxRecordManager({ domain }: MxRecordManagerProps) {
  const { toast } = useToast();
  const [newMailServer, setNewMailServer] = useState("");
  const [newPriority, setNewPriority] = useState("10");

  // Fetch DNS records
  const { data: dnsRecords = [], isLoading, error } = useQuery<MxRecord[]>({
    queryKey: ["/api/domains", domain, "dns"],
    queryFn: async () => {
      const response = await fetch(`/api/domains/${domain}/dns`);
      if (!response.ok) {
        throw new Error("Failed to fetch DNS records");
      }
      return response.json();
    },
    enabled: !!domain,
  });

  // Get only MX records
  const mxRecords = dnsRecords.filter(record => record.type === "MX");

  // Update MX records mutation
  const updateMxMutation = useMutation({
    mutationFn: async (records: Array<{ mailServer: string; priority: number; ttl?: number }>) => {
      return apiRequest("POST", `/api/domains/${domain}/mx-records`, { mxRecords: records });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/domains", domain, "dns"] });
      toast({
        title: "MX Records Updated",
        description: "Your email server settings have been saved.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update MX records",
        variant: "destructive",
      });
    },
  });

  // Add MX record mutation
  const addMxMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/domains/${domain}/mx-records/add`, {
        mailServer: newMailServer,
        priority: parseInt(newPriority),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/domains", domain, "dns"] });
      setNewMailServer("");
      setNewPriority("10");
      toast({
        title: "MX Record Added",
        description: "New mail server has been added.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Add Failed",
        description: error.message || "Failed to add MX record",
        variant: "destructive",
      });
    },
  });

  const handleRemoveMxRecord = (mailServer: string) => {
    const remainingRecords = mxRecords
      .filter(r => r.address !== mailServer)
      .map(r => ({
        mailServer: r.address,
        priority: r.mxPref || 10,
        ttl: parseInt(r.ttl),
      }));
    
    updateMxMutation.mutate(remainingRecords);
  };

  const handleAddMxRecord = () => {
    if (!newMailServer) {
      toast({
        title: "Invalid Input",
        description: "Please enter a mail server address",
        variant: "destructive",
      });
      return;
    }

    addMxMutation.mutate();
  };

  if (!domain) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email (MX) Records
          </CardTitle>
          <CardDescription>
            Link a domain to manage email settings
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email (MX) Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to load DNS records. Please check your API credentials.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email (MX) Records
        </CardTitle>
        <CardDescription>
          Configure mail servers for {domain}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current MX Records */}
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading DNS records...</div>
        ) : mxRecords.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Current MX Records</h4>
            {mxRecords.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                data-testid={`mx-record-${index}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-semibold">
                    {record.mxPref || 10}
                  </div>
                  <div>
                    <p className="font-medium">{record.address}</p>
                    <p className="text-xs text-gray-500">
                      Priority: {record.mxPref || 10} | TTL: {record.ttl}s
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMxRecord(record.address)}
                  disabled={updateMxMutation.isPending}
                  data-testid={`button-remove-mx-${index}`}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-1">No MX records configured</p>
            <p className="text-sm text-gray-500">Add a mail server below to receive emails</p>
          </div>
        )}

        {/* Add New MX Record */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-sm font-semibold">Add New MX Record</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="mail-server">Mail Server</Label>
              <Input
                id="mail-server"
                placeholder="mail.yourdomain.com"
                value={newMailServer}
                onChange={(e) => setNewMailServer(e.target.value)}
                data-testid="input-mail-server"
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                max="100"
                placeholder="10"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                data-testid="input-priority"
              />
            </div>
          </div>
          <Button
            onClick={handleAddMxRecord}
            disabled={addMxMutation.isPending || !newMailServer}
            className="w-full"
            data-testid="button-add-mx-record"
          >
            <Plus className="h-4 w-4 mr-2" />
            {addMxMutation.isPending ? "Adding..." : "Add MX Record"}
          </Button>
        </div>

        {/* Common Email Provider Templates */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-semibold">Popular Email Providers</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNewMailServer("smtp.google.com");
                setNewPriority("1");
              }}
              data-testid="button-preset-google"
            >
              Google Workspace
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNewMailServer("mx1.privateemail.com");
                setNewPriority("10");
              }}
              data-testid="button-preset-namecheap"
            >
              Namecheap Private Email
            </Button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">About MX Records</p>
              <p className="text-xs">
                MX records tell email servers where to deliver mail for your domain. 
                Lower priority numbers are tried first. Changes may take up to 30 minutes to take effect.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
