/**
 * Server Configuration Constants
 */

export const RAILWAY_DOMAIN = 'chad-lp4a-v2-production.up.railway.app';

/**
 * DigitalOcean Droplet IP (Caddy reverse proxy for multi-tenant domains)
 */
export const DROPLET_IP = '134.199.194.110';

/**
 * Create standardized DNS records for DigitalOcean droplet deployment
 * All customer domains point to the Caddy reverse proxy which handles SSL + routing
 */
export function createDropletDnsRecords() {
  return [
    {
      name: "@",
      type: "A",
      address: DROPLET_IP,
      ttl: 300
    },
    {
      name: "www",
      type: "A",
      address: DROPLET_IP,
      ttl: 300
    }
  ];
}

/**
 * Legacy: Create standardized DNS records for Railway deployment
 * NOTE: Not used anymore - all domains go through droplet proxy
 */
export function createRailwayDnsRecords() {
  return [
    {
      name: "www",
      type: "CNAME",
      address: RAILWAY_DOMAIN,
      ttl: 300
    },
    {
      name: "@",
      type: "ALIAS",
      address: RAILWAY_DOMAIN,
      ttl: 300
    }
  ];
}
