/**
 * Railway DNS Helper Functions
 * Extract and format DNS records from Railway API responses
 */

interface RailwayDnsRecord {
  fqdn: string;
  recordType: string;
  requiredValue: string;
  status: string;
}

interface DnsRecord {
  name: string;
  type: string;
  address: string;
  ttl: number;
}

/**
 * Extract DNS records from Railway API response and format for Namecheap
 * @param railwayDnsRecords - DNS records from Railway's customDomainCreate response
 * @param domain - The root domain (e.g., "example.com")
 * @returns Array of DNS records formatted for Namecheap
 */
export function extractDnsRecordsFromRailway(
  railwayDnsRecords: RailwayDnsRecord[],
  domain: string
): DnsRecord[] {
  if (!railwayDnsRecords || railwayDnsRecords.length === 0) {
    console.warn('⚠️  No DNS records provided by Railway, falling back to default Railway domain');
    // Fallback: if Railway doesn't provide DNS records, return empty array
    // The calling code should handle this case
    return [];
  }

  console.log(`📋 Railway provided ${railwayDnsRecords.length} DNS records:`);
  railwayDnsRecords.forEach(record => {
    console.log(`   ${record.fqdn} (${record.recordType}) → ${record.requiredValue} [status: ${record.status}]`);
  });

  const dnsRecords: DnsRecord[] = railwayDnsRecords.map(record => {
    // Determine if this is the root domain or a subdomain
    const isRoot = record.fqdn === domain || record.fqdn === `${domain}.`;
    const name = isRoot ? '@' : record.fqdn.replace(`.${domain}`, '').replace(`.${domain}.`, '');

    return {
      name,
      type: record.recordType,
      address: record.requiredValue,
      ttl: 300
    };
  });

  console.log(`✓ Formatted ${dnsRecords.length} DNS records for Namecheap:`);
  dnsRecords.forEach(r => {
    console.log(`   ${r.name} (${r.type}) → ${r.address}`);
  });

  return dnsRecords;
}

/**
 * Store DNS records for later reuse (e.g., in database)
 */
export function serializeDnsRecords(dnsRecords: DnsRecord[]): Array<{name: string, type: string, address: string}> {
  return dnsRecords.map(({ name, type, address }) => ({
    name,
    type,
    address
  }));
}
