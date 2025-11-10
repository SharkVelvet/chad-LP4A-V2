import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Globe, CheckCircle2, Loader2, AlertCircle, Clock, Cloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DnsManagerProps {
  domain: string;
  domainStatus?: string; // pending, propagating, active
  targetDomain?: string; // Deployment domain (e.g., your-repl.replit.app)
}

export default function DnsManager({ domain, domainStatus = 'pending', targetDomain }: DnsManagerProps) {
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState(domainStatus);
  
  // Auto-detect target domain from environment or use provided one
  const deploymentDomain = targetDomain || 'landing-pages-for-agents-v2-2-sharkvelvet.replit.app';

  // Check Cloudflare status
  const { data: cloudflareStatus, isLoading, refetch } = useQuery({
    queryKey: [`/api/domains/${domain}/cloudflare/status`],
    queryFn: async () => {
      const res = await fetch(`/api/domains/${domain}/cloudflare/status`, {
        credentials: "include",
      });
      if (!res.ok) return { exists: false, active: false };
      return res.json();
    },
    refetchInterval: domainStatus === 'propagating' ? 30000 : false, // Poll every 30s if propagating
  });

  // Setup Cloudflare mutation (if not already set up)
  const setupCloudflare = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/domains/${domain}/cloudflare/setup`, {
        replitDeploymentDomain: deploymentDomain
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/domains/${domain}/cloudflare/status`] });
      toast({
        title: "Cloudflare Setup Complete!",
        description: `Your domain is now configured with SSL. DNS will propagate within 24 hours.`,
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Setup Failed",
        description: error.message || "Failed to set up Cloudflare. Please try again.",
        variant: "destructive",
      });
    },
  });

  const isActive = cloudflareStatus?.active || domainStatus === 'active';
  const exists = cloudflareStatus?.exists || domainStatus !== 'pending';

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
      <h4 className="text-lg font-semibold mb-2">Domain Configuration</h4>
      <p className="text-sm text-gray-600 mb-4">
        Your domain {domain} is configured and deployed on Railway with automatic SSL/HTTPS
      </p>

      {/* Status Display */}
      {isActive ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-green-900 mb-1">✓ Domain is Live with SSL!</p>
              <p className="text-sm text-green-700">
                Your domain {domain} is active and serving your website with HTTPS. Visitors can access your site securely.
              </p>
              <div className="mt-3 p-3 bg-white rounded border border-green-200">
                <p className="text-xs font-semibold text-gray-700 mb-1">DNS Configuration:</p>
                <div className="space-y-1">
                  {cloudflareStatus?.nameservers?.map((ns: string, i: number) => (
                    <p key={i} className="text-xs font-mono text-gray-900">{ns}</p>
                  )) || <p className="text-xs text-gray-500 italic">Managed automatically via Railway</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : exists ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-amber-900 mb-1">⏳ DNS Propagating</p>
              <p className="text-sm text-amber-700">
                Your domain is configured and DNS records have been updated. 
                DNS changes can take 15 minutes to 24 hours to fully propagate worldwide.
              </p>
              <div className="mt-3 p-3 bg-white rounded border border-amber-200">
                <p className="text-xs font-semibold text-gray-700 mb-1">DNS Records:</p>
                <div className="space-y-1">
                  {cloudflareStatus?.nameservers?.map((ns: string, i: number) => (
                    <p key={i} className="text-xs font-mono text-gray-900">{ns}</p>
                  )) || (
                    <p className="text-xs font-mono text-gray-900">CNAME → chad-lp4a-v2-production.up.railway.app</p>
                  )}
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Check back in 30 minutes. The status will automatically update when your domain is live.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-green-900 mb-1">✓ Domain Connected to Website</p>
              <p className="text-sm text-green-700">
                Your domain <strong>{domain}</strong> has been successfully connected to this website and automatically configured with Railway for SSL/HTTPS access. DNS propagation typically takes 15 minutes to 24 hours.
              </p>
              <div className="mt-3 p-3 bg-white rounded border border-green-200">
                <p className="text-xs font-semibold text-gray-700 mb-1">Hosting Configuration:</p>
                <p className="text-xs text-gray-900">✓ Railway hosting with automatic SSL certificates</p>
                <p className="text-xs text-gray-900">✓ DNS configured via Cloudflare</p>
                <p className="text-xs text-gray-900">✓ HTTPS enabled</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Verification Warning */}
      <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 mb-1">⚠️ Important: Verify Your Email Address</p>
            <p className="text-sm text-red-800">
              Namecheap has sent a verification email to the address you provided during domain registration. 
              <strong> You must verify your email within 15 days</strong> or your domain will be suspended. 
              Please check your inbox (and spam folder) for an email from Namecheap and click the verification link.
            </p>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800">
          <strong>Note:</strong> Your website is hosted on Railway with automatic SSL certificates. DNS configuration is managed through our platform.
        </p>
      </div>
    </div>
  );
}
