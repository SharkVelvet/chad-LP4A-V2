import axios from 'axios';

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';
const API_TOKEN = process.env.CLOUDFLARE_WORKERS_API_TOKEN!;
// Use the production Replit deployment URL
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
    await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
      type: 'CNAME',
      name: '@',
      content: REPLIT_ORIGIN,
      proxied: true,
      ttl: 1,
    });

    await cloudflareApi.post(`/zones/${zoneId}/dns_records`, {
      type: 'CNAME',
      name: 'www',
      content: REPLIT_ORIGIN,
      proxied: true,
      ttl: 1,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error creating DNS records:', error.response?.data || error);
    throw new Error(`Failed to create DNS records: ${error.message}`);
  }
}

export async function setupOriginHostHeader(zoneId: string, domain: string): Promise<{ success: boolean }> {
  try {
    // Use http_request_transform phase with set_header action (requires Zone-level Rulesets:Edit permission)
    await cloudflareApi.put(`/zones/${zoneId}/rulesets/phases/http_request_transform/entrypoint`, {
      description: `Host header override for custom domains`,
      kind: 'zone',
      name: 'default',
      phase: 'http_request_transform',
      rules: [
        {
          action: 'rewrite',
          action_parameters: {
            headers: {
              Host: {
                operation: 'set',
                value: REPLIT_ORIGIN,
              },
            },
          },
          expression: `(http.host eq "${domain}" or http.host eq "www.${domain}")`,
          description: `Override Host header for ${domain} to ${REPLIT_ORIGIN}`,
          enabled: true,
        },
      ],
    });

    await cloudflareApi.patch(`/zones/${zoneId}/settings/always_use_https`, {
      value: 'on',
    });

    console.log(`✅ Host header override configured for ${domain}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error setting up origin host header:', error.response?.data || error);
    throw new Error(`Failed to configure Host header: ${error.response?.data?.errors?.[0]?.message || error.message}`);
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
