import fetch from 'node-fetch';

const NAMECHEAP_API_URL = process.env.NAMECHEAP_PROXY_URL || 'http://134.199.194.110:3000';
const domain = 'insurance-test-2028.com';

const dnsRecords = [
  { name: '@', type: 'CNAME', address: 'chad-lp4a-v2-production.up.railway.app', ttl: 300 },
  { name: 'www', type: 'CNAME', address: 'chad-lp4a-v2-production.up.railway.app', ttl: 300 }
];

console.log(`🌐 Configuring DNS for ${domain}...`);
console.log('Records to set:', JSON.stringify(dnsRecords, null, 2));

try {
  const response = await fetch(`${NAMECHEAP_API_URL}/set-dns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, records: dnsRecords })
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('✅ DNS records configured successfully!');
    console.log('Your domain will be live in 15-30 minutes at:');
    console.log(`  - https://${domain}`);
    console.log(`  - https://www.${domain}`);
  } else {
    console.error('❌ Failed:', result.message || result.error);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
