import { XMLParser } from "fast-xml-parser";
import { RAILWAY_DOMAIN } from './config.js';
import { cloudflareService } from './cloudflareService.js';

const NAMECHEAP_API_URL = process.env.NAMECHEAP_SANDBOX === "true" 
  ? "https://api.sandbox.namecheap.com/xml.response"
  : "https://api.namecheap.com/xml.response";

const NAMECHEAP_PROXY_URL = process.env.NAMECHEAP_PROXY_URL || "";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

class DomainService {
  private apiUser: string;
  private apiKey: string;
  private userName: string;
  private clientIp: string;

  constructor() {
    this.apiUser = process.env.NAMECHEAP_API_USER || "";
    this.apiKey = process.env.NAMECHEAP_API_KEY || "";
    this.userName = process.env.NAMECHEAP_USERNAME || this.apiUser;
    this.clientIp = process.env.NAMECHEAP_CLIENT_IP || "";

    console.log("🔧 Namecheap API Configuration:");
    console.log("   API URL:", NAMECHEAP_API_URL);
    console.log("   Proxy URL:", NAMECHEAP_PROXY_URL || "Direct connection");
    console.log("   API User:", this.apiUser);
    console.log("   Username:", this.userName);
    console.log("   Client IP:", this.clientIp);
    console.log("   API Key:", this.apiKey ? `${this.apiKey.substring(0, 10)}...` : "NOT SET");
    console.log("   Sandbox Mode:", process.env.NAMECHEAP_SANDBOX);

    if (!this.apiUser || !this.apiKey) {
      console.warn("Namecheap API credentials not configured. Domain features will be disabled.");
    }
  }

  private isConfigured(): boolean {
    return Boolean(this.apiUser && this.apiKey && this.clientIp);
  }

  private async makeRequest(command: string, params: Record<string, string>): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured. Please add Namecheap API credentials.");
    }

    const baseParams = {
      ApiUser: this.apiUser,
      ApiKey: this.apiKey,
      UserName: this.userName,
      ClientIp: this.clientIp,
      Command: command,
    };

    const allParams = { ...baseParams, ...params };

    try {
      let xmlText: string;

      if (NAMECHEAP_PROXY_URL) {
        // Use proxy server (for static IP)
        const response = await fetch(`${NAMECHEAP_PROXY_URL}/namecheap`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: NAMECHEAP_API_URL,
            params: allParams
          })
        });

        if (!response.ok) {
          throw new Error(`Proxy request failed: ${response.statusText}`);
        }

        xmlText = await response.text();
      } else {
        // Direct connection to Namecheap
        const queryString = new URLSearchParams(allParams).toString();
        const url = `${NAMECHEAP_API_URL}?${queryString}`;
        const response = await fetch(url);
        xmlText = await response.text();
      }
      
      const parsed = xmlParser.parse(xmlText);
      const apiResponse = parsed.ApiResponse;
      
      if (apiResponse["@_Status"] === "ERROR") {
        const errors = apiResponse.Errors?.Error;
        const errorMessage = Array.isArray(errors) ? errors[0] : (errors || "Unknown error occurred");
        throw new Error(typeof errorMessage === 'string' ? errorMessage : errorMessage['#text'] || "Unknown error");
      }

      return apiResponse;
    } catch (error: any) {
      console.error("Namecheap API error:", error);
      throw new Error(error.message || "Failed to communicate with domain registrar");
    }
  }

  async checkAvailability(domains: string[]): Promise<{ domain: string; available: boolean; price?: number }[]> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    // Validate TLDs - only .com and .net allowed
    for (const domain of domains) {
      const tld = domain.split('.').pop()?.toLowerCase();
      if (tld !== 'com' && tld !== 'net') {
        throw new Error('Only .com and .net domains are available at this time');
      }
    }

    const domainList = domains.join(",");
    const response = await this.makeRequest("namecheap.domains.check", {
      DomainList: domainList,
    });

    const results: { domain: string; available: boolean; price?: number }[] = [];
    const commandResponse = response.CommandResponse;
    const domainCheckResults = commandResponse?.DomainCheckResult;

    const domainElements = Array.isArray(domainCheckResults) ? domainCheckResults : [domainCheckResults];

    domainElements.forEach((element: any) => {
      if (element) {
        const domain = element["@_Domain"] || "";
        const available = element["@_Available"] === "true";
        
        results.push({
          domain,
          available,
        });
      }
    });

    return results;
  }

  async getPricing(domains: string[]): Promise<{ domain: string; price: number; currency: string; isFree: boolean; isPremium: boolean }[]> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    const results: { domain: string; price: number; currency: string; isFree: boolean; isPremium: boolean }[] = [];
    const FREE_THRESHOLD = 18.00; // Domains ≤$18 are free
    
    try {
      const response = await this.makeRequest("namecheap.users.getPricing", {
        ProductType: "DOMAIN",
        ActionName: "REGISTER",
      });

      const pricingResult = response.CommandResponse?.UserGetPricingResult;
      const productType = pricingResult?.ProductType;
      
      // Find the register category
      const categories = Array.isArray(productType?.ProductCategory) 
        ? productType.ProductCategory 
        : [productType?.ProductCategory];
      
      const registerCategory = categories.find((cat: any) => cat?.["@_Name"] === "register");
      
      if (registerCategory) {
        const products = Array.isArray(registerCategory.Product) 
          ? registerCategory.Product 
          : [registerCategory.Product];

        for (const domain of domains) {
          const tld = domain.split(".").pop() || "com";
          
          // Only allow .com and .net
          if (tld !== 'com' && tld !== 'net') {
            throw new Error('Only .com and .net domains are available at this time');
          }
          
          // Find the product for this TLD
          const product = products.find((p: any) => p?.["@_Name"] === tld);
          
          if (product) {
            const prices = Array.isArray(product.Price) ? product.Price : [product.Price];
            // Get 1-year price
            const yearPrice = prices.find((p: any) => p?.["@_Duration"] === "1");
            
            if (yearPrice) {
              const namecheapCost = parseFloat(yearPrice["@_YourPrice"] || yearPrice["@_Price"] || "15.00");
              
              if (namecheapCost <= FREE_THRESHOLD) {
                // Free domain
                results.push({
                  domain,
                  price: 0,
                  currency: yearPrice["@_Currency"] || "USD",
                  isFree: true,
                  isPremium: false,
                });
              } else {
                // Premium domain - charge Namecheap cost + 40%
                const markup = 1.40;
                results.push({
                  domain,
                  price: parseFloat((namecheapCost * markup).toFixed(2)),
                  currency: yearPrice["@_Currency"] || "USD",
                  isFree: false,
                  isPremium: true,
                });
              }
            } else {
              // Missing pricing data - throw error instead of defaulting to free
              throw new Error(`Unable to retrieve pricing for ${domain}. Please try again.`);
            }
          } else {
            // TLD not found in pricing - should never happen for .com/.net
            throw new Error(`Pricing data not available for ${domain}. Please try again.`);
          }
        }
      } else {
        // Cannot parse pricing response - critical error
        throw new Error('Unable to retrieve domain pricing from registrar. Please try again.');
      }
    } catch (error) {
      console.error("Error fetching pricing:", error);
      // Re-throw instead of defaulting to free
      throw error;
    }

    return results;
  }

  private formatPhoneForNamecheap(phone: string, country: string): string {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // USA-only app, always use country code +1
    // If phone already starts with 1, remove it to avoid duplication
    const phoneWithoutPrefix = cleaned.startsWith('1') ? cleaned.substring(1) : cleaned;
    
    // Return in Namecheap format: +1.PHONENUMBER
    return `+1.${phoneWithoutPrefix}`;
  }

  async registerDomain(
    domain: string,
    years: number,
    contactInfo: {
      firstName: string;
      lastName: string;
      address1: string;
      city: string;
      stateProvince: string;
      postalCode: string;
      country: string;
      phone: string;
      email: string;
    }
  ): Promise<{ success: boolean; orderId?: string; transactionId?: string }> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    // Format phone number for Namecheap (required format: +CountryCode.PhoneNumber)
    const formattedPhone = this.formatPhoneForNamecheap(contactInfo.phone, contactInfo.country);

    const params = {
      DomainName: domain,
      Years: years.toString(),
      
      RegistrantFirstName: contactInfo.firstName,
      RegistrantLastName: contactInfo.lastName,
      RegistrantAddress1: contactInfo.address1,
      RegistrantCity: contactInfo.city,
      RegistrantStateProvince: contactInfo.stateProvince,
      RegistrantPostalCode: contactInfo.postalCode,
      RegistrantCountry: contactInfo.country,
      RegistrantPhone: formattedPhone,
      RegistrantEmailAddress: contactInfo.email,
      
      TechFirstName: contactInfo.firstName,
      TechLastName: contactInfo.lastName,
      TechAddress1: contactInfo.address1,
      TechCity: contactInfo.city,
      TechStateProvince: contactInfo.stateProvince,
      TechPostalCode: contactInfo.postalCode,
      TechCountry: contactInfo.country,
      TechPhone: formattedPhone,
      TechEmailAddress: contactInfo.email,
      
      AdminFirstName: contactInfo.firstName,
      AdminLastName: contactInfo.lastName,
      AdminAddress1: contactInfo.address1,
      AdminCity: contactInfo.city,
      AdminStateProvince: contactInfo.stateProvince,
      AdminPostalCode: contactInfo.postalCode,
      AdminCountry: contactInfo.country,
      AdminPhone: formattedPhone,
      AdminEmailAddress: contactInfo.email,
      
      AuxBillingFirstName: contactInfo.firstName,
      AuxBillingLastName: contactInfo.lastName,
      AuxBillingAddress1: contactInfo.address1,
      AuxBillingCity: contactInfo.city,
      AuxBillingStateProvince: contactInfo.stateProvince,
      AuxBillingPostalCode: contactInfo.postalCode,
      AuxBillingCountry: contactInfo.country,
      AuxBillingPhone: formattedPhone,
      AuxBillingEmailAddress: contactInfo.email,
      
      AddFreeWhoisguard: "yes",
      WGEnabled: "yes",
    };

    const response = await this.makeRequest("namecheap.domains.create", params);
    
    const domainCreateResult = response.CommandResponse?.DomainCreateResult;
    const registered = domainCreateResult?.["@_Registered"] === "true";
    const orderId = domainCreateResult?.["@_OrderID"] || undefined;
    const transactionId = domainCreateResult?.["@_TransactionID"] || undefined;

    return {
      success: registered,
      orderId,
      transactionId,
    };
  }

  async setNameservers(domain: string, nameservers: string[]): Promise<boolean> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    const sld = domain.split(".")[0];
    const tld = domain.split(".").slice(1).join(".");

    const params: Record<string, string> = {
      SLD: sld,
      TLD: tld,
      Nameservers: nameservers.join(","),
    };

    await this.makeRequest("namecheap.domains.dns.setCustom", params);
    return true;
  }

  async getDomainInfo(domain: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    const response = await this.makeRequest("namecheap.domains.getInfo", {
      DomainName: domain,
    });

    const domainInfo = response.CommandResponse?.DomainGetInfoResult;
    
    return {
      domain: domainInfo?.["@_DomainName"],
      status: domainInfo?.["@_Status"],
      isLocked: domainInfo?.Whoisguard?.["@_Enabled"] === "True",
      createdDate: domainInfo?.DomainDetails?.CreatedDate,
      expiresDate: domainInfo?.DomainDetails?.ExpiredDate,
    };
  }

  async getDnsRecords(domain: string): Promise<any[]> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    const sld = domain.split(".")[0];
    const tld = domain.split(".").slice(1).join(".");

    const response = await this.makeRequest("namecheap.domains.dns.getHosts", {
      SLD: sld,
      TLD: tld,
    });

    const hosts = response.CommandResponse?.DomainDNSGetHostsResult?.host;
    
    if (!hosts) {
      return [];
    }

    const hostArray = Array.isArray(hosts) ? hosts : [hosts];
    
    return hostArray.map((host: any) => ({
      recordId: host["@_HostId"],
      name: host["@_Name"],
      type: host["@_Type"],
      address: host["@_Address"],
      mxPref: host["@_MXPref"] || null,
      ttl: host["@_TTL"] || "1800",
    }));
  }

  async setDnsRecords(
    domain: string,
    records: Array<{
      name: string;
      type: string;
      address: string;
      mxPref?: number;
      ttl?: number;
    }>
  ): Promise<boolean> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    // Normalize records: lowercase field names and types
    // EXCEPT: TXT record values must preserve case for validation tokens
    const normalizedRecords = records.map(record => ({
      name: record.name.toLowerCase(),
      type: record.type.toUpperCase(),
      address: record.type.toUpperCase() === 'TXT' ? record.address : record.address.toLowerCase(),
      mxPref: record.mxPref,
      ttl: record.ttl || 300
    }));

    // CRITICAL VALIDATION: Warn if Railway domains are using A records instead of ALIAS/CNAME
    normalizedRecords.forEach(record => {
      if (record.address.includes(RAILWAY_DOMAIN) && record.type === 'A') {
        console.error(`⚠️  CRITICAL: Railway domain detected with A record type! Domain: ${domain}, Record:`, record);
        throw new Error(`Invalid DNS configuration: Railway domains must use ALIAS (for @) or CNAME (for www), not A records`);
      }
      
      // Validate ALIAS/CNAME usage
      if (record.address.includes(RAILWAY_DOMAIN)) {
        if (record.name === '@' && record.type !== 'ALIAS') {
          console.error(`⚠️  Root domain (@) must use ALIAS record, got ${record.type}`);
          throw new Error(`Root domain (@) must use ALIAS record type, not ${record.type}`);
        }
        if (record.name === 'www' && record.type !== 'CNAME') {
          console.error(`⚠️  WWW subdomain must use CNAME record, got ${record.type}`);
          throw new Error(`WWW subdomain must use CNAME record type, not ${record.type}`);
        }
      }
    });

    const sld = domain.split(".")[0];
    const tld = domain.split(".").slice(1).join(".");

    const params: Record<string, string> = {
      SLD: sld,
      TLD: tld,
    };

    normalizedRecords.forEach((record, index) => {
      const i = index + 1;
      params[`HostName${i}`] = record.name;
      params[`RecordType${i}`] = record.type;
      params[`Address${i}`] = record.address;
      params[`TTL${i}`] = record.ttl.toString();
      
      if (record.type === "MX" && record.mxPref !== undefined) {
        params[`MXPref${i}`] = record.mxPref.toString();
      }
    });

    console.log(`📤 Sending ${normalizedRecords.length} records to Namecheap:`);
    normalizedRecords.forEach((r, i) => {
      console.log(`   [${i+1}] ${r.name} (${r.type}) → ${r.address}`);
    });
    const response = await this.makeRequest("namecheap.domains.dns.setHosts", params);
    
    // Check if the operation actually succeeded
    const result = response.CommandResponse?.DomainDNSSetHostsResult;
    const isSuccess = result?.["@_IsSuccess"] === "true";
    
    if (!isSuccess) {
      const errors = response.Errors?.Error;
      const errorMsg = Array.isArray(errors) ? errors.map((e: any) => e['#text'] || e).join(', ') : 
                       (typeof errors === 'object' ? errors['#text'] : errors) ||
                       `Failed to set DNS records for ${domain}`;
      
      console.error(`❌ Namecheap DNS setup failed for ${domain}:`, errorMsg);
      throw new Error(`DNS configuration failed: ${errorMsg}`);
    }
    
    console.log(`✅ DNS records successfully set for ${domain}`);
    return true;
  }

  async addMxRecord(
    domain: string,
    mailServer: string,
    priority: number = 10,
    ttl: number = 1800
  ): Promise<boolean> {
    const existingRecords = await this.getDnsRecords(domain);
    
    const newRecord = {
      name: "@",
      type: "MX",
      address: mailServer,
      mxPref: priority,
      ttl,
    };

    const allRecords = [...existingRecords.map(r => ({
      name: r.name,
      type: r.type,
      address: r.address,
      mxPref: r.mxPref,
      ttl: parseInt(r.ttl),
    })), newRecord];

    return this.setDnsRecords(domain, allRecords);
  }

  async updateMxRecords(
    domain: string,
    mxRecords: Array<{ mailServer: string; priority: number; ttl?: number }>
  ): Promise<boolean> {
    const existingRecords = await this.getDnsRecords(domain);
    
    const nonMxRecords = existingRecords.filter(r => r.type !== "MX");
    
    const newMxRecords = mxRecords.map(mx => ({
      name: "@",
      type: "MX",
      address: mx.mailServer,
      mxPref: mx.priority,
      ttl: mx.ttl || 1800,
    }));

    const allRecords = [...nonMxRecords.map(r => ({
      name: r.name,
      type: r.type,
      address: r.address,
      mxPref: r.mxPref,
      ttl: parseInt(r.ttl),
    })), ...newMxRecords];

    return this.setDnsRecords(domain, allRecords);
  }

  async setupCloudflareForSaaS(domain: string): Promise<{
    customHostnameId: string;
    cnameTarget: string;
    status: string;
    sslStatus: string;
  }> {
    console.log(`🌐 Setting up Cloudflare for SaaS for ${domain}...`);
    
    let cnameTarget = await this.getCloudflareProxyDomain();
    
    const customHostname = await cloudflareService.createCustomHostname(domain, {
      sslMethod: 'txt',
      certificateAuthority: 'google',
      minTlsVersion: '1.2'
    });

    console.log(`✅ Custom hostname created for ${domain}`);
    console.log(`   Hostname ID: ${customHostname.id}`);
    console.log(`   Status: ${customHostname.status}`);
    console.log(`   SSL Status: ${customHostname.ssl.status}`);
    console.log(`   CNAME Target: ${cnameTarget}`);

    return {
      customHostnameId: customHostname.id,
      cnameTarget,
      status: customHostname.status,
      sslStatus: customHostname.ssl.status
    };
  }

  async getCloudflareProxyDomain(): Promise<string> {
    let fallbackOrigin = await cloudflareService.getFallbackOrigin();
    
    if (fallbackOrigin && fallbackOrigin.origin) {
      console.log(`✓ Using existing fallback origin: ${fallbackOrigin.origin}`);
      
      const dnsRecords = await cloudflareService.getDNSRecords(process.env.CLOUDFLARE_ZONE_ID!);
      const zone = await cloudflareService.getZoneDetails();
      const fallbackRecord = dnsRecords.find(r => 
        r.type === 'CNAME' && 
        r.name === `customers.${zone?.name}` && 
        r.proxied === true
      );
      
      if (!fallbackRecord) {
        console.log(`⚠️  Fallback DNS record missing - recreating...`);
        const hostname = await cloudflareService.createFallbackOriginDNS(RAILWAY_DOMAIN);
        return hostname;
      }
      
      return fallbackOrigin.origin;
    }
    
    console.log(`⚠️  No fallback origin configured - setting up...`);
    
    try {
      const fallbackHostname = await cloudflareService.createFallbackOriginDNS(RAILWAY_DOMAIN);
      
      console.log(`📡 Setting fallback origin to: ${fallbackHostname}`);
      await cloudflareService.setFallbackOrigin(fallbackHostname);
      
      console.log(`✅ Fallback origin configured: ${fallbackHostname}`);
      return fallbackHostname;
    } catch (error: any) {
      console.error(`❌ Failed to set up fallback origin:`, error.message);
      throw new Error(`Failed to configure fallback origin: ${error.message}`);
    }
  }

  async configureCloudflareDNS(domain: string, cnameTarget: string): Promise<boolean> {
    if (!this.isConfigured()) {
      throw new Error("Domain service not configured");
    }

    console.log(`📡 Configuring DNS for ${domain} to point to Cloudflare...`);
    console.log(`   Target: ${cnameTarget}`);

    const records = [
      {
        name: '@',
        type: 'ALIAS',
        address: cnameTarget,
        ttl: 300
      },
      {
        name: 'www',
        type: 'CNAME',
        address: cnameTarget,
        ttl: 300
      }
    ];

    let lastError: any = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.setDnsRecords(domain, records);
        console.log(`✅ DNS configured for ${domain} (attempt ${attempt})`);
        return true;
      } catch (error: any) {
        lastError = error;
        console.error(`❌ DNS configuration attempt ${attempt} failed:`, error.message);
        if (attempt < 3) {
          const delay = attempt * 2000;
          console.log(`   Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    console.error(`❌ All DNS configuration attempts failed for ${domain}`);
    throw lastError;
  }

  async checkCloudflareStatus(customHostnameId: string): Promise<{
    hostname: string;
    status: string;
    sslStatus: string;
    isActive: boolean;
    errors: string[];
  }> {
    return await cloudflareService.checkCustomHostnameStatus(customHostnameId);
  }
}

export const domainService = new DomainService();
