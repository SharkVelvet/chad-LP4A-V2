import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, CheckCircle2, XCircle, Loader2, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DomainAutomationProps {
  pageId: number;
  onDomainRegistered?: (domain: string) => void;
}

type DomainStatus = {
  status: 'idle' | 'checking' | 'registering' | 'configuring_dns' | 'completed' | 'failed';
  domain?: string;
  error?: string;
  progress?: string;
};

export default function DomainAutomation({ pageId, onDomainRegistered }: DomainAutomationProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [domainPrice, setDomainPrice] = useState<number | null>(null);
  const [domainStatus, setDomainStatus] = useState<DomainStatus>({ status: 'idle' });
  const [showRegistrantDialog, setShowRegistrantDialog] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [registrantInfo, setRegistrantInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "US",
  });

  // Poll for domain job status
  useEffect(() => {
    if (domainStatus.status === 'registering' || domainStatus.status === 'configuring_dns') {
      const interval = setInterval(async () => {
        try {
          const res = await apiRequest("GET", `/api/domains/status/${pageId}`, {});
          const status = await res.json();
          
          if (status.status === 'completed') {
            setDomainStatus({
              status: 'completed',
              domain: status.domain,
              progress: 'Domain registered and DNS configured successfully!'
            });
            clearInterval(interval);
            onDomainRegistered?.(status.domain);
            toast({
              title: "Domain Registered!",
              description: `${status.domain} is now live and configured.`,
            });
          } else if (status.status === 'failed') {
            setDomainStatus({
              status: 'failed',
              error: status.error || 'Registration failed',
            });
            clearInterval(interval);
          } else {
            setDomainStatus({
              status: status.currentStep as any,
              domain: status.domain,
              progress: status.message,
            });
          }
        } catch (error) {
          console.error('Failed to poll status:', error);
        }
      }, 3000); // Poll every 3 seconds

      return () => clearInterval(interval);
    }
  }, [domainStatus.status, pageId, onDomainRegistered, toast]);

  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      const baseDomain = query.toLowerCase().replace(/^www\./, "").trim();
      
      // Auto-append .com if no extension provided
      const domain = baseDomain.includes('.') ? baseDomain : `${baseDomain}.com`;
      
      // Validate TLD
      const tld = domain.split('.').pop();
      if (tld !== 'com' && tld !== 'net') {
        throw new Error('Only .com and .net domains are supported');
      }

      const res = await apiRequest("POST", "/api/domains/search", { domain });
      return res.json();
    },
    onSuccess: (result) => {
      setDomainAvailable(result.available);
      setDomainPrice(result.price);
      
      if (!result.available) {
        toast({
          title: "Domain Unavailable",
          description: `${result.domain} is already registered.`,
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Search Failed",
        description: error.message || "Could not check domain availability",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { domain: string; registrant: any }) => {
      const res = await apiRequest("POST", "/api/domains/register", {
        pageId,
        domain: data.domain,
        registrant: data.registrant,
      });
      return res.json();
    },
    onSuccess: (result) => {
      setShowRegistrantDialog(false);
      setDomainStatus({
        status: 'registering',
        domain: result.domain,
        progress: 'Starting domain registration...',
      });
      toast({
        title: "Registration Started",
        description: "Your domain is being registered. This may take a few minutes.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not register domain",
        variant: "destructive",
      });
    },
  });

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setDomainAvailable(null);
    setDomainPrice(null);
    searchMutation.mutate(searchTerm);
  };

  const handleRegister = (domain: string) => {
    setSelectedDomain(domain);
    setShowRegistrantDialog(true);
  };

  const handleSubmitRegistration = () => {
    // Validate required fields
    const required = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'stateProvince', 'postalCode'];
    const missing = required.filter(field => !registrantInfo[field as keyof typeof registrantInfo]);
    
    if (missing.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate({
      domain: selectedDomain,
      registrant: registrantInfo,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="yourdomain.com"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            disabled={searchMutation.isPending}
            data-testid="input-domain-search"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={!searchTerm.trim() || searchMutation.isPending}
          data-testid="button-search-domain"
        >
          {searchMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>

      {/* Search Results */}
      {domainAvailable !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {domainAvailable ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <p className="font-semibold">{searchTerm}</p>
                  <p className="text-sm text-gray-600">
                    {domainAvailable ? 'Available' : 'Already registered'}
                  </p>
                </div>
              </div>
              {domainAvailable && domainPrice !== null && (
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {domainPrice <= 18 ? (
                      <Badge className="bg-green-600">FREE</Badge>
                    ) : (
                      <span className="font-bold text-lg">${domainPrice}/yr</span>
                    )}
                    <Button
                      onClick={() => handleRegister(searchTerm)}
                      disabled={domainStatus.status !== 'idle'}
                      data-testid="button-register-domain"
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Registration Status */}
      {domainStatus.status !== 'idle' && (
        <Card className={
          domainStatus.status === 'completed' ? 'border-green-500 bg-green-50' :
          domainStatus.status === 'failed' ? 'border-red-500 bg-red-50' :
          'border-blue-500 bg-blue-50'
        }>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {domainStatus.status === 'completed' ? (
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              ) : domainStatus.status === 'failed' ? (
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              ) : (
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin flex-shrink-0" />
              )}
              <div className="flex-1">
                <h4 className="font-semibold mb-1">
                  {domainStatus.status === 'completed' && 'Registration Complete!'}
                  {domainStatus.status === 'failed' && 'Registration Failed'}
                  {domainStatus.status === 'registering' && 'Registering Domain...'}
                  {domainStatus.status === 'configuring_dns' && 'Configuring DNS...'}
                </h4>
                <p className="text-sm">
                  {domainStatus.progress || domainStatus.error}
                </p>
                {domainStatus.domain && (
                  <p className="text-sm font-mono mt-1">{domainStatus.domain}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Registrant Information Dialog */}
      <Dialog open={showRegistrantDialog} onOpenChange={setShowRegistrantDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Domain Registration Information</DialogTitle>
            <DialogDescription>
              Please provide your contact information for domain registration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={registrantInfo.firstName}
                  onChange={(e) => setRegistrantInfo({ ...registrantInfo, firstName: e.target.value })}
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={registrantInfo.lastName}
                  onChange={(e) => setRegistrantInfo({ ...registrantInfo, lastName: e.target.value })}
                  data-testid="input-last-name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={registrantInfo.email}
                onChange={(e) => setRegistrantInfo({ ...registrantInfo, email: e.target.value })}
                data-testid="input-email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={registrantInfo.phone}
                onChange={(e) => setRegistrantInfo({ ...registrantInfo, phone: e.target.value })}
                placeholder="+1.5555555555"
                data-testid="input-phone"
              />
            </div>

            <div>
              <Label htmlFor="address1">Address *</Label>
              <Input
                id="address1"
                value={registrantInfo.address1}
                onChange={(e) => setRegistrantInfo({ ...registrantInfo, address1: e.target.value })}
                data-testid="input-address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={registrantInfo.city}
                  onChange={(e) => setRegistrantInfo({ ...registrantInfo, city: e.target.value })}
                  data-testid="input-city"
                />
              </div>
              <div>
                <Label htmlFor="stateProvince">State/Province *</Label>
                <Input
                  id="stateProvince"
                  value={registrantInfo.stateProvince}
                  onChange={(e) => setRegistrantInfo({ ...registrantInfo, stateProvince: e.target.value })}
                  placeholder="CA"
                  data-testid="input-state"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={registrantInfo.postalCode}
                  onChange={(e) => setRegistrantInfo({ ...registrantInfo, postalCode: e.target.value })}
                  data-testid="input-postal-code"
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={registrantInfo.country}
                  onChange={(e) => setRegistrantInfo({ ...registrantInfo, country: e.target.value })}
                  placeholder="US"
                  data-testid="input-country"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowRegistrantDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRegistration}
              disabled={registerMutation.isPending}
              data-testid="button-submit-registration"
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Register Domain'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
