import { domainService } from '../server/domainService.js';

async function addTxtRecord() {
  try {
    console.log('🔧 Adding TXT validation record to vanhaleninsurance.com...');
    
    await domainService.setDnsRecords('vanhaleninsurance.com', [
      { name: '@', type: 'ALIAS', address: 'customers.testingthisrailway.com', ttl: 300 },
      { name: 'www', type: 'CNAME', address: 'customers.testingthisrailway.com', ttl: 300 },
      { name: '_cf-custom-hostname', type: 'TXT', address: '0041c861-b4ef-4a6b-839b-b7fbd85507f0', ttl: 300 }
    ]);

    console.log('✅ DNS records updated successfully!');
    console.log('   - @ (ALIAS) → customers.testingthisrailway.com');
    console.log('   - www (CNAME) → customers.testingthisrailway.com');
    console.log('   - _cf-custom-hostname (TXT) → 0041c861-b4ef-4a6b-839b-b7fbd85507f0');
    console.log('\n⏳ Waiting 5-10 minutes for Cloudflare to validate...');
  } catch (error) {
    console.error('❌ Failed to add TXT record:', error);
    process.exit(1);
  }
}

addTxtRecord();
