import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Globe, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DnsManagerProps {
  domain: string;
  targetDomain?: string; // For CNAME record (e.g., your-repl.replit.app)
}

type DnsRecord = {
  recordId: string;
  name: string;
  type: string;
  address: string;
  ttl: string;
};

export default function DnsManager({ domain, targetDomain }: DnsManagerProps) {
  const { toast } = useToast();
  const [isConfiguring, setIsConfiguring] = useState(false);
  
  // Auto-detect target domain from environment or use provided one
  const deploymentDomain = targetDomain || window.location.hostname;

  // Fetch current DNS records
  const { data: dnsRecords = [], isLoading, refetch } = useQuery<DnsRecord[]>({
    queryKey: [`/api/domains/${domain}/dns`],
    queryFn: async () => {
      const res = await fetch(`/api/domains/${domain}/dns`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch DNS records");
      return res.json();
    },
  });

  // Set DNS records mutation
  const setDnsMutation = useMutation({
    mutationFn: async (records: any[]) => {
      const res = await apiRequest("POST", `/api/domains/${domain}/dns`, { records });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/domains/${domain}/dns`] });
      toast({
        title: "DNS Updated",
        description: "Your domain is now pointing to your website. Changes may take 24-48 hours to fully propagate.",
      });
      setIsConfiguring(false);
    },
    onError: (error: any) => {
      toast({
        title: "DNS Update Failed",
        description: error.message || "Failed to update DNS records. Please try again.",
        variant: "destructive",
      });
    },
  });

  const hasCnameRecord = dnsRecords.some(r => r.type === "CNAME" && r.name === "@");
  const cnameRecord = dnsRecords.find(r => r.type === "CNAME" && r.name === "@");
  const isPointingToWebsite = cnameRecord?.address.toLowerCase().includes(deploymentDomain.toLowerCase());

  const handleConfigureDns = () => {
    // Get all existing records except @ CNAME
    const otherRecords = dnsRecords.filter(r => !(r.type === "CNAME" && r.name === "@"));
    
    // Add the new CNAME record pointing to deployment domain
    const newRecords = [
      ...otherRecords.map(r => ({
        name: r.name,
        type: r.type,
        address: r.address,
        ttl: parseInt(r.ttl) || 1800,
      })),
      {
        name: "@",
        type: "CNAME",
        address: deploymentDomain,
        ttl: 1800,
      },
    ];

    setDnsMutation.mutate(newRecords);
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold mb-2">Connect Your Domain to This Website</h4>
      <p className="text-sm text-gray-600 mb-4">
        Configure your domain to display this website when visitors go to {domain}
      </p>

      {/* Status Display */}
      {hasCnameRecord && isPointingToWebsite ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 mb-1">✓ Domain is Connected!</p>
              <p className="text-sm text-green-700">
                Your domain {domain} is pointing to your website at {deploymentDomain}. Visitors can now access your site at this domain.
              </p>
              <p className="text-xs text-green-600 mt-2">
                Note: DNS changes can take up to 24-48 hours to fully propagate worldwide.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-blue-900 mb-1">Domain Not Connected</p>
              <p className="text-sm text-blue-700 mb-3">
                Your domain is not currently pointing to this website. Click the button below to configure it automatically to {deploymentDomain}.
              </p>
              <Button
                onClick={handleConfigureDns}
                disabled={setDnsMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-configure-dns"
              >
                {setDnsMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Configuring DNS...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Connect Domain to Website
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Current DNS Records */}
      <div className="mt-4">
        <h5 className="text-sm font-semibold text-gray-700 mb-3">Current DNS Records:</h5>
        {dnsRecords.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No DNS records configured</p>
        ) : (
          <div className="space-y-2">
            {dnsRecords.map((record, index) => (
              <div
                key={`${record.recordId}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded text-sm font-mono"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="font-mono">
                    {record.type}
                  </Badge>
                  <span className="text-gray-600">{record.name || "@"}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-900 font-medium">{record.address}</span>
                </div>
                {record.type === "CNAME" && record.name === "@" && record.address.toLowerCase().includes(deploymentDomain.toLowerCase()) && (
                  <Badge className="bg-green-500">Active</Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800">
          <strong>Note:</strong> All DNS configuration is managed automatically through our platform. You don't need to log into Namecheap or any other registrar.
        </p>
      </div>
    </div>
  );
}
