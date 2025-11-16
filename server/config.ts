/**
 * Server Configuration Constants
 */

export const RAILWAY_DOMAIN = 'chad-lp4a-v2-production.up.railway.app';

/**
 * Create standardized DNS records for Railway deployment
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
