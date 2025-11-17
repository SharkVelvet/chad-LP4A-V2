import axios from 'axios';

interface CloudflareConfig {
  apiToken: string;
  accountId: string;
  zoneId: string;
}

interface CloudflareZone {
  id: string;
  name: string;
  status: string;
  name_servers: string[];
}

interface DNSRecord {
  id: string;
  type: string;
  name: string;
  content: string;
  proxied: boolean;
}

interface CustomHostname {
  id: string;
  hostname: string;
  status: string;
  ssl: {
    id: string;
    status: string;
    method: string;
    type: string;
    certificate_authority: string;
    validation_records?: Array<{
      txt_name?: string;
      txt_value?: string;
      http_url?: string;
      http_body?: string;
    }>;
  };
  ownership_verification?: {
    type: string;
    name: string;
    value: string;
  };
  ownership_verification_http?: {
    http_url: string;
    http_body: string;
  };
  created_at: string;
  verification_errors?: string[];
}

interface FallbackOrigin {
  origin: string;
  status: string;
  errors: string[];
}

class CloudflareService {
  private apiToken: string;
  private accountId: string;
  private zoneId: string;
  private baseUrl = 'https://api.cloudflare.com/client/v4';

  constructor() {
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN || '';
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '';
    this.zoneId = process.env.CLOUDFLARE_ZONE_ID || '';

    if (!this.apiToken || !this.accountId || !this.zoneId) {
      console.warn('⚠️ Cloudflare API credentials not fully configured');
      console.log('Required: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_ZONE_ID');
    } else {
      console.log('✓ Cloudflare for SaaS configured with Zone ID:', this.zoneId);
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json'
    };
  }

  async createCustomHostname(
    hostname: string,
    options: {
      sslMethod?: 'http' | 'txt' | 'email';
      certificateAuthority?: 'google' | 'letsencrypt' | 'digicert';
      customOriginServer?: string;
      customOriginSni?: string;
      minTlsVersion?: '1.0' | '1.1' | '1.2' | '1.3';
    } = {}
  ): Promise<CustomHostname> {
    try {
      const {
        sslMethod = 'http',
        certificateAuthority = 'google',
        customOriginServer,
        customOriginSni,
        minTlsVersion = '1.2'
      } = options;

      const payload: any = {
        hostname,
        ssl: {
          method: sslMethod,
          type: 'dv',
          settings: {
            http2: 'on',
            min_tls_version: minTlsVersion,
            tls_1_3: 'on'
          },
          bundle_method: 'ubiquitous',
          wildcard: false
        }
      };

      if (customOriginServer) {
        payload.custom_origin_server = customOriginServer;
        payload.custom_origin_sni = customOriginSni || customOriginServer;
      }

      console.log(`📡 Creating custom hostname for ${hostname}...`);
      
      const response = await axios.post(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames`,
        payload,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        const errorDetails = JSON.stringify(response.data.errors);
        console.error(`❌ Cloudflare API error:`, response.data.errors);
        throw new Error(`Cloudflare error: ${errorDetails}`);
      }

      const result = response.data.result;
      console.log(`✅ Custom hostname created: ${hostname} (ID: ${result.id})`);
      console.log(`   Status: ${result.status}, SSL Status: ${result.ssl.status}`);
      
      return this.formatCustomHostname(result);
    } catch (error: any) {
      const errorData = error.response?.data;
      const errorMessage = errorData?.errors?.[0]?.message || error.message;
      const errorCode = errorData?.errors?.[0]?.code || 'unknown';
      
      console.error('❌ Error creating custom hostname:', {
        hostname,
        errorCode,
        errorMessage,
        fullError: errorData
      });
      
      if (errorCode === 1415 || errorMessage.includes('already exists')) {
        const existing = await this.getCustomHostnameByHostname(hostname);
        if (existing) {
          console.log(`ℹ️ Hostname ${hostname} already exists, returning existing record`);
          return existing;
        }
      }
      
      throw new Error(`Failed to create custom hostname: ${errorMessage} (Code: ${errorCode})`);
    }
  }

  async getCustomHostname(hostnameId: string): Promise<CustomHostname | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames/${hostnameId}`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        return null;
      }

      return this.formatCustomHostname(response.data.result);
    } catch (error: any) {
      console.error('Error fetching custom hostname:', error.response?.data || error.message);
      return null;
    }
  }

  async getCustomHostnameByHostname(hostname: string): Promise<CustomHostname | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames?hostname=${hostname}`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success || response.data.result.length === 0) {
        return null;
      }

      return this.formatCustomHostname(response.data.result[0]);
    } catch (error: any) {
      console.error('Error searching for custom hostname:', error.response?.data || error.message);
      return null;
    }
  }

  async listCustomHostnames(page: number = 1, perPage: number = 50): Promise<CustomHostname[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames?page=${page}&per_page=${perPage}`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        return [];
      }

      return response.data.result.map((h: any) => this.formatCustomHostname(h));
    } catch (error: any) {
      console.error('Error listing custom hostnames:', error.response?.data || error.message);
      return [];
    }
  }

  async deleteCustomHostname(hostnameId: string): Promise<boolean> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames/${hostnameId}`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        console.error('Failed to delete custom hostname:', response.data.errors);
        return false;
      }

      console.log(`✅ Deleted custom hostname ID: ${hostnameId}`);
      return true;
    } catch (error: any) {
      console.error('Error deleting custom hostname:', error.response?.data || error.message);
      return false;
    }
  }

  async updateCustomHostname(
    hostnameId: string,
    updates: {
      sslMethod?: 'http' | 'txt' | 'email';
      customOriginServer?: string;
      customOriginSni?: string;
    }
  ): Promise<CustomHostname | null> {
    try {
      const payload: any = {};

      if (updates.sslMethod) {
        payload.ssl = {
          method: updates.sslMethod,
          type: 'dv'
        };
      }

      if (updates.customOriginServer) {
        payload.custom_origin_server = updates.customOriginServer;
        payload.custom_origin_sni = updates.customOriginSni || updates.customOriginServer;
      }

      const response = await axios.patch(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames/${hostnameId}`,
        payload,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        console.error('Failed to update custom hostname:', response.data.errors);
        return null;
      }

      console.log(`✅ Updated custom hostname ID: ${hostnameId}`);
      return this.formatCustomHostname(response.data.result);
    } catch (error: any) {
      console.error('Error updating custom hostname:', error.response?.data || error.message);
      return null;
    }
  }

  async setFallbackOrigin(origin: string): Promise<FallbackOrigin | null> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames/fallback_origin`,
        { origin },
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        console.error('Failed to set fallback origin:', response.data.errors);
        return null;
      }

      console.log(`✅ Set fallback origin to: ${origin}`);
      return response.data.result;
    } catch (error: any) {
      console.error('Error setting fallback origin:', error.response?.data || error.message);
      return null;
    }
  }

  async getFallbackOrigin(): Promise<FallbackOrigin | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames/fallback_origin`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        return null;
      }

      return response.data.result;
    } catch (error: any) {
      console.error('Error getting fallback origin:', error.response?.data || error.message);
      return null;
    }
  }

  async getZoneDetails(): Promise<{ id: string; name: string; status: string } | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/zones/${this.zoneId}`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        return null;
      }

      const zone = response.data.result;
      return {
        id: zone.id,
        name: zone.name,
        status: zone.status
      };
    } catch (error: any) {
      console.error('Error getting zone details:', error.response?.data || error.message);
      return null;
    }
  }

  async createFallbackOriginDNS(railwayDomain: string): Promise<string> {
    try {
      const zone = await this.getZoneDetails();
      if (!zone) {
        throw new Error('Could not get zone details');
      }

      const fallbackHostname = `customers.${zone.name}`;
      
      console.log(`📡 Creating fallback origin DNS record: ${fallbackHostname} → ${railwayDomain}`);
      
      await this.createOrUpdateDNSRecord(
        this.zoneId,
        'CNAME',
        'customers',
        railwayDomain,
        true
      );

      console.log(`✅ Fallback origin DNS record created at customers.${zone.name}`);
      return fallbackHostname;
    } catch (error: any) {
      console.error('Error creating fallback origin DNS:', error.response?.data || error.message);
      throw error;
    }
  }

  private formatCustomHostname(data: any): CustomHostname {
    return {
      id: data.id,
      hostname: data.hostname,
      status: data.status,
      ssl: {
        id: data.ssl?.id || '',
        status: data.ssl?.status || 'pending_validation',
        method: data.ssl?.method || 'http',
        type: data.ssl?.type || 'dv',
        certificate_authority: data.ssl?.certificate_authority || 'google',
        validation_records: data.ssl?.validation_records || []
      },
      ownership_verification: data.ownership_verification,
      ownership_verification_http: data.ownership_verification_http,
      created_at: data.created_at,
      verification_errors: data.verification_errors || []
    };
  }

  async checkCustomHostnameStatus(hostnameId: string): Promise<{
    hostname: string;
    status: string;
    sslStatus: string;
    isActive: boolean;
    validationRecords?: Array<{
      type: string;
      name?: string;
      value?: string;
      url?: string;
      body?: string;
    }>;
    errors: string[];
  }> {
    const hostname = await this.getCustomHostname(hostnameId);
    
    if (!hostname) {
      return {
        hostname: '',
        status: 'not_found',
        sslStatus: 'not_found',
        isActive: false,
        errors: ['Hostname not found']
      };
    }

    const validationRecords: Array<any> = [];

    if (hostname.ownership_verification) {
      validationRecords.push({
        type: 'txt',
        name: hostname.ownership_verification.name,
        value: hostname.ownership_verification.value
      });
    }

    if (hostname.ownership_verification_http) {
      validationRecords.push({
        type: 'http',
        url: hostname.ownership_verification_http.http_url,
        body: hostname.ownership_verification_http.http_body
      });
    }

    if (hostname.ssl.validation_records) {
      hostname.ssl.validation_records.forEach(record => {
        if (record.txt_name && record.txt_value) {
          validationRecords.push({
            type: 'txt',
            name: record.txt_name,
            value: record.txt_value
          });
        }
        if (record.http_url && record.http_body) {
          validationRecords.push({
            type: 'http',
            url: record.http_url,
            body: record.http_body
          });
        }
      });
    }

    return {
      hostname: hostname.hostname,
      status: hostname.status,
      sslStatus: hostname.ssl.status,
      isActive: hostname.status === 'active' && hostname.ssl.status === 'active',
      validationRecords,
      errors: hostname.verification_errors || []
    };
  }

  async addZone(domain: string): Promise<CloudflareZone> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/zones`,
        {
          name: domain,
          account: {
            id: this.accountId
          },
          jump_start: true
        },
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        const errorDetails = JSON.stringify(response.data.errors);
        console.error(`❌ Cloudflare API error:`, response.data.errors);
        throw new Error(`Cloudflare error: ${errorDetails}`);
      }

      const zone = response.data.result;
      console.log(`✅ Added zone ${domain} to Cloudflare (ID: ${zone.id})`);
      
      return {
        id: zone.id,
        name: zone.name,
        status: zone.status,
        name_servers: zone.name_servers
      };
    } catch (error: any) {
      const errorData = error.response?.data;
      const errorMessage = errorData?.errors?.[0]?.message || error.message;
      const errorCode = errorData?.errors?.[0]?.code || 'unknown';
      
      console.error('❌ Error adding Cloudflare zone:', {
        domain,
        errorCode,
        errorMessage,
        fullError: errorData
      });
      
      if (errorCode === 1061 || errorMessage.includes('already exists')) {
        throw new Error(`Domain ${domain} already exists in Cloudflare. Please remove it first or contact support.`);
      }
      
      throw new Error(`Failed to add domain to Cloudflare: ${errorMessage} (Code: ${errorCode})`);
    }
  }

  async getZone(domain: string): Promise<CloudflareZone | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/zones?name=${domain}`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success || response.data.result.length === 0) {
        return null;
      }

      const zone = response.data.result[0];
      return {
        id: zone.id,
        name: zone.name,
        status: zone.status,
        name_servers: zone.name_servers
      };
    } catch (error: any) {
      console.error('Error fetching Cloudflare zone:', error.response?.data || error.message);
      return null;
    }
  }

  async createOrUpdateDNSRecord(
    zoneId: string,
    type: string,
    name: string,
    content: string,
    proxied: boolean = true
  ): Promise<DNSRecord> {
    try {
      const zone = await this.getZoneDetails();
      if (!zone) {
        throw new Error('Could not get zone details');
      }
      
      const fullName = name.includes('.') ? name : `${name}.${zone.name}`;
      
      const existingRecords = await this.getDNSRecords(zoneId);
      const existingRecord = existingRecords.find(
        r => r.type === type && (r.name === name || r.name === fullName)
      );

      if (existingRecord) {
        if (existingRecord.content === content && existingRecord.proxied === proxied) {
          console.log(`✓ DNS record already exists and is correct: ${name} → ${content}`);
          return existingRecord;
        }

        const response = await axios.patch(
          `${this.baseUrl}/zones/${zoneId}/dns_records/${existingRecord.id}`,
          {
            type,
            name,
            content,
            proxied,
            ttl: 1
          },
          { headers: this.getHeaders() }
        );

        if (!response.data.success) {
          throw new Error(`Cloudflare error: ${JSON.stringify(response.data.errors)}`);
        }

        const record = response.data.result;
        console.log(`✅ Updated ${type} record: ${name} → ${content} (Proxied: ${proxied})`);
        
        return {
          id: record.id,
          type: record.type,
          name: record.name,
          content: record.content,
          proxied: record.proxied
        };
      }

      const response = await axios.post(
        `${this.baseUrl}/zones/${zoneId}/dns_records`,
        {
          type,
          name,
          content,
          proxied,
          ttl: 1
        },
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        throw new Error(`Cloudflare error: ${JSON.stringify(response.data.errors)}`);
      }

      const record = response.data.result;
      console.log(`✅ Created ${type} record: ${name} → ${content} (Proxied: ${proxied})`);
      
      return {
        id: record.id,
        type: record.type,
        name: record.name,
        content: record.content,
        proxied: record.proxied
      };
    } catch (error: any) {
      console.error('Error creating/updating DNS record:', error.response?.data || error.message);
      throw new Error(`Failed to create/update DNS record: ${error.message}`);
    }
  }

  async getDNSRecords(zoneId: string): Promise<DNSRecord[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/zones/${zoneId}/dns_records`,
        { headers: this.getHeaders() }
      );

      if (!response.data.success) {
        return [];
      }

      return response.data.result.map((record: any) => ({
        id: record.id,
        type: record.type,
        name: record.name,
        content: record.content,
        proxied: record.proxied
      }));
    } catch (error: any) {
      console.error('Error fetching DNS records:', error.response?.data || error.message);
      return [];
    }
  }

  async setupDomainForReplit(domain: string, replitDeploymentDomain: string): Promise<{
    zone: CloudflareZone;
    nameservers: string[];
    dnsRecords: DNSRecord[];
  }> {
    try {
      let zone = await this.getZone(domain);
      
      if (!zone) {
        zone = await this.addZone(domain);
      }

      const dnsRecords: DNSRecord[] = [];

      const rootRecord = await this.createOrUpdateDNSRecord(
        zone.id,
        'CNAME',
        domain,
        replitDeploymentDomain,
        true
      );
      dnsRecords.push(rootRecord);

      const wwwRecord = await this.createOrUpdateDNSRecord(
        zone.id,
        'CNAME',
        `www.${domain}`,
        replitDeploymentDomain,
        true
      );
      dnsRecords.push(wwwRecord);

      console.log(`✅ Domain ${domain} configured in Cloudflare with SSL proxy enabled`);
      console.log(`📋 Nameservers to set in Namecheap:`, zone.name_servers);

      return {
        zone,
        nameservers: zone.name_servers,
        dnsRecords
      };
    } catch (error: any) {
      console.error('Error setting up domain in Cloudflare:', error.message);
      throw error;
    }
  }

  async getZoneStatus(domain: string): Promise<{
    exists: boolean;
    active: boolean;
    nameservers: string[];
    sslStatus: string;
  }> {
    try {
      const zone = await this.getZone(domain);
      
      if (!zone) {
        return {
          exists: false,
          active: false,
          nameservers: [],
          sslStatus: 'not_configured'
        };
      }

      return {
        exists: true,
        active: zone.status === 'active',
        nameservers: zone.name_servers,
        sslStatus: zone.status === 'active' ? 'active' : 'pending'
      };
    } catch (error: any) {
      console.error('Error checking zone status:', error.message);
      return {
        exists: false,
        active: false,
        nameservers: [],
        sslStatus: 'error'
      };
    }
  }
}

export const cloudflareService = new CloudflareService();
