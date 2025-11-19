/**
 * Caddy API Service
 * Manages domain allowlist for on-demand TLS certificate provisioning via proxy
 */

import { CADDY_PROXY_URL, CADDY_PROXY_AUTH_TOKEN } from './config';

export interface CaddyDomainResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Add a domain to Caddy's on-demand TLS allowlist via proxy
 * This enables automatic SSL certificate provisioning for the domain
 */
export async function addDomainToAllowlist(domain: string): Promise<CaddyDomainResult> {
  try {
    console.log(`📋 Adding ${domain} to Caddy allowlist via proxy...`);
    
    if (!CADDY_PROXY_AUTH_TOKEN) {
      console.error('❌ CADDY_PROXY_AUTH_TOKEN not configured!');
      return {
        success: false,
        error: 'Caddy proxy auth token not configured'
      };
    }
    
    // Call the Caddy proxy to add the domain
    const response = await fetch(`${CADDY_PROXY_URL}/allowlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CADDY_PROXY_AUTH_TOKEN}`
      },
      body: JSON.stringify({ domain })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(`❌ Failed to add ${domain} to Caddy allowlist:`, responseData);
      return {
        success: false,
        error: responseData.error || `Proxy error: ${response.status}`
      };
    }

    console.log(`✅ ${domain} added to Caddy allowlist successfully`);
    return {
      success: true,
      message: responseData.message || `Domain ${domain} added to Caddy allowlist for SSL provisioning`
    };
  } catch (error: any) {
    console.error(`❌ Error adding ${domain} to Caddy allowlist:`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Remove a domain from Caddy's allowlist via proxy
 */
export async function removeDomainFromAllowlist(domain: string): Promise<CaddyDomainResult> {
  try {
    console.log(`🗑️  Removing ${domain} from Caddy allowlist via proxy...`);
    
    if (!CADDY_PROXY_AUTH_TOKEN) {
      console.error('❌ CADDY_PROXY_AUTH_TOKEN not configured!');
      return {
        success: false,
        error: 'Caddy proxy auth token not configured'
      };
    }
    
    const response = await fetch(`${CADDY_PROXY_URL}/allowlist/${domain}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${CADDY_PROXY_AUTH_TOKEN}`
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(`❌ Failed to remove ${domain} from Caddy allowlist:`, responseData);
      return {
        success: false,
        error: responseData.error || `Proxy error: ${response.status}`
      };
    }

    console.log(`✅ ${domain} removed from Caddy allowlist`);
    return {
      success: true,
      message: responseData.message || `Domain ${domain} removed from Caddy allowlist`
    };
  } catch (error: any) {
    console.error(`❌ Error removing ${domain} from Caddy allowlist:`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Check Caddy proxy health
 */
export async function checkCaddyHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${CADDY_PROXY_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  } catch (error) {
    console.error('Caddy proxy health check failed:', error);
    return false;
  }
}
