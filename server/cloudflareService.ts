import axios from 'axios';

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_WORKERS_API_TOKEN!;
// Use the Caddy proxy on DigitalOcean which handles Host header rewriting and SSL
const CADDY_PROXY_IP = process.env.CADDY_PROXY_IP || '134.199.194.110';
// Replit origin for reference (Caddy proxy forwards to this)
const REPLIT_ORIGIN = 'landing-pages-for-agents-v-2-sharkvelvet.replit.app';

interface CloudflareZone {
  id: string;
  name: string;
  status: string;
  name_servers: string[];
}

interface CloudflareRecord {
  id: string;
  type: string;
  name: string;
  content: string;
  proxied: boolean;
}

const cloudflareApi = axios.create({
  baseURL: CLOUDFLARE_API_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export async function createZone(domain: string): Promise<{
  zoneId: string;
  nameservers: string[];
}> {
  try {
    const response = await cloudflareApi.post('/zones', {
      name: domain,
      jump_start: true,
    });

    if (!response.data.success) {
      throw new Error(`Cloudflare error: ${JSON.stringify(response.data.errors)}`);
    }

    const zone: CloudflareZone = response.data.result;

    return {
      zoneId: zone.id,
      nameservers: zone.name_servers,
    };
  } catch (error: any) {
    console.error('Error creating Cloudflare zone:', error.response?.data || error);
    throw new Error(`Failed to create Cloudflare zone: ${error.message}`);
  }
}

export async function checkZoneStatus(zoneId: string): Promise<{
  status: string;
  nameservers: string[];
}> {
  try {
    const response = await cloudflareApi.get(`/zones/${zoneId}`);

    if (!response.data.success) {
      throw new Error(`Cloudflare error: ${JSON.stringify(response.data.errors)}`);
    }

    const zone: CloudflareZone = response.data.result;

    return {
      status: zone.status,
      nameservers: zone.name_servers,
    };
  } catch (error: any) {
    console.error('Error checking zone status:', error.response?.data || error);
    throw new Error(`Failed to check zone status: ${error.message}`);
  }
}

export async function createDNSRecords(
  zoneId: string,
  domain: string
): Promise<{ success: boolean }> {
  try {
    // Get existing DNS records first
    const response = await cloudflareApi.get(`/zones/${zoneId}/dns_records`);
    const existingRecords = response.data.result || [];

    // Handle root domain (@) record
    const rootRecord = existingRecords.find((r: any) => 
      (r.type === 'CNAME' || r.type === 'A') && (r.name === domain || r.name === '@')
    );
    
    if (rootRecord) {
      // If it's a CNAME, delete and recreate as A record (can't PATCH type change)
      if (rootRecord.type === 'CNAME') {
        console.log(`🗑️  Deleting existing CNAME record for root domain...`);
        await cloudflareApi.delete(`/zones/${zoneId}/dns_records/${rootRecord.id}`);
        
        console.log(`➕ Creating new A record for root domain...`);
        await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
          type: 'A',
          name: '@',
          content: CADDY_PROXY_IP,
          proxied: true,
          ttl: 1,
        });
      } else {
        // It's already an A record, just update the IP
        console.log(`🔄 Updating existing A record for root domain...`);
        await cloudflareApi.patch(`/zones/${zoneId}/dns_records/${rootRecord.id}`, {
          content: CADDY_PROXY_IP,
          proxied: true,
          ttl: 1,
        });
      }
    } else {
      console.log(`➕ Creating new root domain DNS record...`);
      await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
        type: 'A',
        name: '@',
        content: CADDY_PROXY_IP,
        proxied: true,
        ttl: 1,
      });
    }

    // Handle www subdomain record
    const wwwRecord = existingRecords.find((r: any) => 
      (r.type === 'CNAME' || r.type === 'A') && (r.name === `www.${domain}` || r.name === 'www')
    );
    
    if (wwwRecord) {
      // If it's a CNAME, delete and recreate as A record (can't PATCH type change)
      if (wwwRecord.type === 'CNAME') {
        console.log(`🗑️  Deleting existing CNAME record for www subdomain...`);
        await cloudflareApi.delete(`/zones/${zoneId}/dns_records/${wwwRecord.id}`);
        
        console.log(`➕ Creating new A record for www subdomain...`);
        await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
          type: 'A',
          name: 'www',
          content: CADDY_PROXY_IP,
          proxied: true,
          ttl: 1,
        });
      } else {
        // It's already an A record, just update the IP
        console.log(`🔄 Updating existing A record for www subdomain...`);
        await cloudflareApi.patch(`/zones/${zoneId}/dns_records/${wwwRecord.id}`, {
          content: CADDY_PROXY_IP,
          proxied: true,
          ttl: 1,
        });
      }
    } else {
      console.log(`➕ Creating new www subdomain DNS record...`);
      await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
        type: 'A',
        name: 'www',
        content: CADDY_PROXY_IP,
        proxied: true,
        ttl: 1,
      });
    }

    console.log(`✅ DNS records configured pointing to Caddy proxy: ${CADDY_PROXY_IP}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error creating DNS records:', error.response?.data || error);
    throw new Error(`Failed to create DNS records: ${error.message}`);
  }
}

export async function updateDNSRecordsToCaddy(zoneId: string, domain: string): Promise<{ success: boolean }> {
  try {
    // Get existing DNS records
    const response = await cloudflareApi.get(`/zones/${zoneId}/dns_records`);
    const records = response.data.result || [];

    // Update root domain record
    const rootRecord = records.find((r: any) => (r.type === 'CNAME' || r.type === 'A') && r.name === domain);
    if (rootRecord) {
      // If it's a CNAME, delete and recreate as A record
      if (rootRecord.type === 'CNAME') {
        console.log(`🗑️  Deleting existing CNAME record for root domain...`);
        await cloudflareApi.delete(`/zones/${zoneId}/dns_records/${rootRecord.id}`);
        
        console.log(`➕ Creating new A record for root domain...`);
        await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
          type: 'A',
          name: '@',
          content: CADDY_PROXY_IP,
          proxied: true,
          ttl: 1,
        });
      } else {
        // It's already an A record, just update the IP
        await cloudflareApi.patch(`/zones/${zoneId}/dns_records/${rootRecord.id}`, {
          content: CADDY_PROXY_IP,
          proxied: true,
        });
      }
      console.log(`✅ Updated root domain DNS to Caddy proxy`);
    }

    // Update www record
    const wwwRecord = records.find((r: any) => (r.type === 'CNAME' || r.type === 'A') && r.name === `www.${domain}`);
    if (wwwRecord) {
      // If it's a CNAME, delete and recreate as A record
      if (wwwRecord.type === 'CNAME') {
        console.log(`🗑️  Deleting existing CNAME record for www subdomain...`);
        await cloudflareApi.delete(`/zones/${zoneId}/dns_records/${wwwRecord.id}`);
        
        console.log(`➕ Creating new A record for www subdomain...`);
        await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
          type: 'A',
          name: 'www',
          content: CADDY_PROXY_IP,
          proxied: true,
          ttl: 1,
        });
      } else {
        // It's already an A record, just update the IP
        await cloudflareApi.patch(`/zones/${zoneId}/dns_records/${wwwRecord.id}`, {
          content: CADDY_PROXY_IP,
          proxied: true,
        });
      }
      console.log(`✅ Updated www subdomain DNS to Caddy proxy`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error updating DNS records:', error.response?.data || error);
    throw new Error(`Failed to update DNS records: ${error.message}`);
  }
}

export async function setupOriginHostHeader(zoneId: string, domain: string): Promise<{ success: boolean }> {
  try {
    // Caddy proxy handles Host header rewriting - no Cloudflare Worker needed
    // Just enable HTTPS redirect
    await cloudflareApi.patch(`/zones/${zoneId}/settings/always_use_https`, {
      value: 'on',
    });

    console.log(`✅ HTTPS redirect enabled for ${domain} (Caddy proxy handles Host header)`);
    return { success: true };
  } catch (error: any) {
    console.error('Error enabling HTTPS:', error.response?.data || error);
    throw new Error(`Failed to enable HTTPS: ${error.response?.data?.errors?.[0]?.message || error.message}`);
  }
}

export async function setupWWWRedirect(zoneId: string, domain: string): Promise<{ success: boolean }> {
  try {
    const response = await cloudflareApi.post(`/zones/${zoneId}/pagerules`, {
      targets: [
        {
          target: 'url',
          constraint: {
            operator: 'matches',
            value: `${domain}/*`,
          },
        },
      ],
      actions: [
        {
          id: 'forwarding_url',
          value: {
            url: `https://www.${domain}/$1`,
            status_code: 301,
          },
        },
      ],
      priority: 1,
      status: 'active',
    });

    if (!response.data.success) {
      console.warn('Failed to create page rule, might be on free plan:', response.data.errors);
    }

    await cloudflareApi.patch(`/zones/${zoneId}/settings/always_use_https`, {
      value: 'on',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error setting up www redirect:', error.response?.data || error);
    return { success: true };
  }
}

export async function checkSSLStatus(zoneId: string): Promise<{
  status: string;
  certificateStatus: string;
}> {
  try {
    const response = await cloudflareApi.get(`/zones/${zoneId}/ssl/universal/settings`);

    if (!response.data.success) {
      throw new Error(`Cloudflare error: ${JSON.stringify(response.data.errors)}`);
    }

    const sslSettings = response.data.result;

    return {
      status: sslSettings.enabled ? 'active' : 'pending',
      certificateStatus: sslSettings.certificate_authority || 'pending',
    };
  } catch (error: any) {
    console.error('Error checking SSL status:', error.response?.data || error);
    return {
      status: 'pending',
      certificateStatus: 'pending',
    };
  }
}

export async function enableUniversalSSL(zoneId: string): Promise<{ success: boolean }> {
  try {
    await cloudflareApi.patch(`/zones/${zoneId}/settings/ssl`, {
      value: 'flexible',
    });

    await cloudflareApi.patch(`/zones/${zoneId}/settings/always_use_https`, {
      value: 'on',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error enabling SSL:', error.response?.data || error);
    return { success: true };
  }
}

export async function deleteZone(zoneId: string): Promise<{ success: boolean }> {
  try {
    await cloudflareApi.delete(`/zones/${zoneId}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting zone:', error.response?.data || error);
    throw new Error(`Failed to delete zone: ${error.message}`);
  }
}
