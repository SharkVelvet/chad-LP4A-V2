import axios from 'axios';

const CADDY_PROXY_URL = process.env.CADDY_PROXY_URL || 'http://134.199.194.110:3001';
const CADDY_PROXY_AUTH_TOKEN = process.env.CADDY_PROXY_AUTH_TOKEN;

if (!CADDY_PROXY_AUTH_TOKEN) {
  console.warn('⚠️  CADDY_PROXY_AUTH_TOKEN not set - Caddy integration will not work');
}

export async function addDomainToAllowlist(domain: string): Promise<boolean> {
  if (!CADDY_PROXY_AUTH_TOKEN) {
    throw new Error('CADDY_PROXY_AUTH_TOKEN not configured');
  }

  try {
    console.log(`🔧 Adding domain to Caddy allowlist: ${domain}`);
    
    const response = await axios.post(
      `${CADDY_PROXY_URL}/allowlist`,
      { domain },
      {
        headers: {
          'Authorization': `Bearer ${CADDY_PROXY_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log(`✅ Domain added to Caddy allowlist: ${domain}`, response.data);
    return true;
  } catch (error: any) {
    console.error(`❌ Failed to add domain to Caddy allowlist: ${domain}`, error.response?.data || error.message);
    throw new Error(`Failed to add domain to Caddy allowlist: ${error.message}`);
  }
}

export async function removeDomainFromAllowlist(domain: string): Promise<boolean> {
  if (!CADDY_PROXY_AUTH_TOKEN) {
    throw new Error('CADDY_PROXY_AUTH_TOKEN not configured');
  }

  try {
    console.log(`🔧 Removing domain from Caddy allowlist: ${domain}`);
    
    const response = await axios.delete(
      `${CADDY_PROXY_URL}/allowlist/${domain}`,
      {
        headers: {
          'Authorization': `Bearer ${CADDY_PROXY_AUTH_TOKEN}`
        },
        timeout: 10000
      }
    );

    console.log(`✅ Domain removed from Caddy allowlist: ${domain}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Failed to remove domain from Caddy allowlist: ${domain}`, error.response?.data || error.message);
    return false;
  }
}

export async function checkCaddyHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${CADDY_PROXY_URL}/health`, { timeout: 5000 });
    return response.data?.status === 'ok';
  } catch (error) {
    console.error('❌ Caddy health check failed:', error);
    return false;
  }
}
