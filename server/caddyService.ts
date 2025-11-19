/**
 * Caddy API Service
 * Manages domain allowlist for on-demand TLS certificate provisioning
 */

import { DROPLET_IP } from './config';

const CADDY_ADMIN_API = `http://${DROPLET_IP}:2019`;

export interface CaddyDomainResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Add a domain to Caddy's on-demand TLS allowlist
 * This enables automatic SSL certificate provisioning for the domain
 */
export async function addDomainToAllowlist(domain: string): Promise<CaddyDomainResult> {
  try {
    console.log(`📋 Adding ${domain} to Caddy allowlist...`);
    
    // First, get the current allowed list
    let currentAllowed: string[] = [];
    try {
      const getCurrentResponse = await fetch(`${CADDY_ADMIN_API}/config/apps/tls/automation/on_demand/allowed`);
      if (getCurrentResponse.ok) {
        currentAllowed = await getCurrentResponse.json();
      }
    } catch (e) {
      console.log('No existing allowed list found, creating new one');
    }
    
    // Add both apex and www if not already present
    const domainsToAdd = [domain, `www.${domain}`];
    const newAllowed = Array.from(new Set([...currentAllowed, ...domainsToAdd])); // Remove duplicates
    
    // Use PATCH to update the Caddy configuration
    const response = await fetch(`${CADDY_ADMIN_API}/config/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apps: {
          tls: {
            automation: {
              on_demand: {
                allowed: newAllowed
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to add ${domain} to Caddy allowlist:`, errorText);
      return {
        success: false,
        error: `Caddy API error: ${response.status} - ${errorText}`
      };
    }

    console.log(`✅ ${domain} added to Caddy allowlist (total: ${newAllowed.length} domains)`);
    return {
      success: true,
      message: `Domain ${domain} added to Caddy allowlist for SSL provisioning`
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
 * Remove a domain from Caddy's allowlist
 */
export async function removeDomainFromAllowlist(domain: string): Promise<CaddyDomainResult> {
  try {
    console.log(`🗑️  Removing ${domain} from Caddy allowlist...`);
    
    const response = await fetch(`${CADDY_ADMIN_API}/config/apps/tls/automation/on_demand/allowed`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([domain, `www.${domain}`])
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to remove ${domain} from Caddy allowlist:`, errorText);
      return {
        success: false,
        error: `Caddy API error: ${response.status} - ${errorText}`
      };
    }

    console.log(`✅ ${domain} removed from Caddy allowlist`);
    return {
      success: true,
      message: `Domain ${domain} removed from Caddy allowlist`
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
 * Check Caddy server health
 */
export async function checkCaddyHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${CADDY_ADMIN_API}/config/`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  } catch (error) {
    console.error('Caddy health check failed:', error);
    return false;
  }
}
