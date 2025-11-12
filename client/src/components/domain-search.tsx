import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, XCircle, ShoppingCart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DomainSearchProps {
  pageId: number;
  onDomainPurchased: (domain: string) => void;
}

type DomainResult = {
  domain: string;
  available: boolean;
  price?: number;
  isFree?: boolean;
  isPremium?: boolean;
};

export default function DomainSearch({ pageId, onDomainPurchased }: DomainSearchProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [showUnavailableWarning, setShowUnavailableWarning] = useState(false);
  const [contactInfo, setContactInfo] = useState({
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

  const searchMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      const baseDomain = searchQuery.toLowerCase().replace(/^www\./, "").replace(/\s+/g, "");
      
      // Extract TLD if provided
      const hasExtension = baseDomain.includes(".");
      let domainsToCheck: string[] = [];
      
      if (hasExtension) {
        const tld = baseDomain.split('.').pop();
        // Only allow .com and .net
        if (tld !== 'com' && tld !== 'net') {
          throw new Error('Only .com and .net domains are available at this time');
        }
        domainsToCheck = [baseDomain];
      } else {
        // If no extension provided, check both .com and .net
        domainsToCheck = [
          `${baseDomain}.com`,
          `${baseDomain}.net`,
        ];
      }

      // Check availability
      const availabilityRes = await apiRequest("POST", "/api/domains/check-availability", { domains: domainsToCheck, pageId });
      const availabilityResults: DomainResult[] = await availabilityRes.json();

      // Get pricing for available domains
      const availableDomains = availabilityResults.filter(r => r.available).map(r => r.domain);
      if (availableDomains.length > 0) {
        const pricingRes = await apiRequest("POST", "/api/domains/pricing", { domains: availableDomains, pageId });
        const pricingResults: { domain: string; price: number; currency: string; isFree?: boolean; isPremium?: boolean }[] = await pricingRes.json();

        // Merge pricing into availability results
        return availabilityResults.map(result => {
          const pricing = pricingResults.find(p => p.domain === result.domain);
          return {
            ...result,
            price: pricing?.price || 0,
            isFree: pricing?.isFree || false,
            isPremium: pricing?.isPremium || false,
          };
        });
      }

      return availabilityResults;
    },
    onSuccess: (results: DomainResult[]) => {
      setSearchResults(results);
      if (results.every((r) => !r.available)) {
        setShowUnavailableWarning(true);
      } else {
        setShowUnavailableWarning(false);
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

  const purchaseMutation = useMutation({
    mutationFn: async (data: { domain: string; contactInfo: any }) => {
      const res = await apiRequest("POST", "/api/create-domain-checkout-session", {
        domain: data.domain,
        years: 1,
        pageId,
        contactInfo: data.contactInfo,
      });
      return res.json();
    },
    onSuccess: (result) => {
      if (result.isFree && result.success) {
        // Free domain registered successfully!
        toast({
          title: "FREE Domain Registered!",
          description: `${result.domain} has been successfully registered at no charge.`,
        });
        setShowPurchaseDialog(false);
        setSelectedDomain(null);
        setSearchResults([]);
        setSearchTerm("");
        if (result.domain) {
          onDomainPurchased(result.domain);
        }
      } else if (result.url) {
        // Premium domain - redirect to Stripe Checkout
        window.location.href = result.url;
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "Unable to register domain. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Registration Error",
        description: error.message || "Failed to register domain",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast({
        title: "Enter a Domain",
        description: "Please enter a domain name to search.",
        variant: "destructive",
      });
      return;
    }
    setShowUnavailableWarning(false);
    searchMutation.mutate(searchTerm);
  };

  const handlePurchase = (domain: string) => {
    setSelectedDomain(domain);
    setShowPurchaseDialog(true);
  };

  const getSelectedDomainPrice = () => {
    if (!selectedDomain) return 15.00;
    const result = searchResults.find(r => r.domain === selectedDomain);
    return result?.price || 15.00;
  };

  const isSelectedDomainFree = () => {
    if (!selectedDomain) return false;
    const result = searchResults.find(r => r.domain === selectedDomain);
    return result?.isFree || false;
  };

  const handleSubmitPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDomain) return;

    // Validate all required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'stateProvince', 'postalCode', 'country'];
    const missingFields = requiredFields.filter((field) => !contactInfo[field as keyof typeof contactInfo]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    purchaseMutation.mutate({
      domain: selectedDomain,
      contactInfo,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search for a Domain</CardTitle>
          <CardDescription>Find and register the perfect domain for your page</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <Label htmlFor="domain-search">Domain Name</Label>
              <div className="flex gap-2">
                <Input
                  id="domain-search"
                  placeholder="yourbusiness.com"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-domain-search"
                />
                <Button type="submit" disabled={searchMutation.isPending} data-testid="button-search-domain">
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
              <p className="text-xs text-gray-500 mt-1">
                Enter a domain name (e.g., "mybusiness"). <span className="font-semibold text-green-600">FREE .com and .net domains included with your page!</span> Only .com and .net extensions are available.
              </p>
            </div>
          </form>

          {searchResults.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="font-medium mb-3">Search Results</h3>
              {searchResults.map((result) => (
                <div
                  key={result.domain}
                  className="flex items-center justify-between p-3 border rounded-lg"
                  data-testid={`domain-result-${result.domain}`}
                >
                  <div className="flex items-center gap-3">
                    {result.available ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{result.domain}</p>
                      <p className="text-sm text-gray-500">
                        {result.available ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {result.available && (
                      <>
                        {result.isFree ? (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white">
                            FREE
                          </Badge>
                        ) : result.isPremium ? (
                          <>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                              Premium
                            </Badge>
                            <Badge variant="secondary">
                              ${result.price?.toFixed(2)}/year
                            </Badge>
                          </>
                        ) : (
                          <Badge variant="secondary">
                            ${result.price?.toFixed(2) || "0.00"}/year
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handlePurchase(result.domain)}
                          data-testid={`button-purchase-${result.domain}`}
                          className={result.isFree ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {result.isFree ? "Register FREE" : "Purchase"}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={(open) => {
        setShowPurchaseDialog(open);
        if (!open) {
          purchaseMutation.reset();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register {selectedDomain}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitPurchase} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={contactInfo.firstName}
                  onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                  data-testid="input-firstname"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={contactInfo.lastName}
                  onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                  data-testid="input-lastname"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                data-testid="input-contact-email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="8434699528"
                data-testid="input-contact-phone"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your 10-digit phone number (US country code will be added automatically)</p>
            </div>

            <div>
              <Label htmlFor="address1">Address *</Label>
              <Input
                id="address1"
                required
                value={contactInfo.address1}
                onChange={(e) => setContactInfo({ ...contactInfo, address1: e.target.value })}
                data-testid="input-address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  value={contactInfo.city}
                  onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                  data-testid="input-city"
                />
              </div>
              <div>
                <Label htmlFor="stateProvince">State/Province *</Label>
                <Input
                  id="stateProvince"
                  required
                  value={contactInfo.stateProvince}
                  onChange={(e) => setContactInfo({ ...contactInfo, stateProvince: e.target.value })}
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
                  required
                  value={contactInfo.postalCode}
                  onChange={(e) => setContactInfo({ ...contactInfo, postalCode: e.target.value })}
                  data-testid="input-postal"
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  required
                  value={contactInfo.country}
                  onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
                  placeholder="US"
                  data-testid="input-country"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total (1 year registration)</span>
                {isSelectedDomainFree() ? (
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">FREE</span>
                    <p className="text-xs text-gray-600">Included with your subscription</p>
                  </div>
                ) : (
                  <span className="text-xl font-bold">${getSelectedDomainPrice().toFixed(2)}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Free WHOIS privacy protection included. Professional Landing Pages for Insurance Agents partners with Namecheap for domain registration. You will receive domain-related emails directly from Namecheap, separate from your Landing Pages for Agents communications.
              </p>
              <Button
                type="submit"
                className="w-full"
                disabled={purchaseMutation.isPending}
                data-testid="button-submit-purchase"
              >
                {purchaseMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Registration...
                  </>
                ) : (
                  isSelectedDomainFree() ? "Register FREE Domain" : "Complete Purchase"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Domain Unavailable Warning Dialog */}
      <Dialog open={showUnavailableWarning} onOpenChange={setShowUnavailableWarning}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-domain-unavailable">
          <div className="flex flex-col items-center text-center space-y-4 py-4">
            <div className="rounded-full bg-red-100 p-4">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-3">
                Sorry - Domain Not Available
              </h3>
              <p className="text-red-700 text-base">
                The domain name you searched for is not available at this time. Please try a different name or variation.
              </p>
            </div>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSearchResults([]);
                setShowUnavailableWarning(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              data-testid="button-try-again"
            >
              Try Another Search
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
