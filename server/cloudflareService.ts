import axios from 'axios';

interface CloudflareConfig {
  apiToken: string;
  accountId: string;
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

class CloudflareService {
  private apiToken: string;
  private accountId: string;
  private baseUrl = 'https://api.cloudflare.com/client/v4';

  constructor() {
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN || '';
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '';

    if (!this.apiToken || !this.accountId) {
      console.warn('⚠️ Cloudflare API credentials not configured');
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json'
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
      const existingRecords = await this.getDNSRecords(zoneId);
      const existingRecord = existingRecords.find(
        r => r.type === type && r.name === name
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
