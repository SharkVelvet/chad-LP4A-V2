import { cloudflareService } from '../server/cloudflareService.js';
import { domainService } from '../server/domainService.js';

const CUSTOM_HOSTNAME_ID = 'a29239c1-4a49-41f8-b7ed-cf91b9c3510d';
const DOMAIN = 'vanhaleninsurance.com';

async function addTxtRecords() {
  try {
    console.log(`🔍 Fetching custom hostname details from Cloudflare...`);
    
    const hostname = await cloudflareService.getCustomHostname(CUSTOM_HOSTNAME_ID);
    
    if (!hostname) {
      throw new Error('Custom hostname not found');
    }
    
    console.log(`   Status: ${hostname.status}`);
    console.log(`   SSL Status: ${hostname.ssl?.status}\n`);
    
    if (!hostname.ssl?.validation_records || hostname.ssl.validation_records.length === 0) {
      console.log('⚠️  No TXT validation records found. SSL might be using HTTP validation instead.');
      return;
    }
    
    console.log(`📝 Found ${hostname.ssl.validation_records.length} validation record(s)\n`);
    
    const txtRecords: Array<{ name: string; value: string }> = [];
    
    for (const record of hostname.ssl.validation_records) {
      if (record.txt_name && record.txt_value) {
        const name = record.txt_name.replace(`.${DOMAIN}`, '');
        txtRecords.push({
          name,
          value: record.txt_value
        });
        console.log(`   [TXT] ${name} = ${record.txt_value.substring(0, 40)}...`);
      }
    }
    
    if (txtRecords.length === 0) {
      console.log('⚠️  No TXT records extracted');
      return;
    }
    
    console.log(`\n🌐 Adding TXT records to Namecheap DNS for ${DOMAIN}...`);
    
    const currentRecords = await domainService.getDnsRecords(DOMAIN);
    const txtRecordsToAdd = txtRecords.map(txt => ({
      name: txt.name,
      type: 'TXT' as const,
      address: txt.value,
      ttl: 300
    }));
    
    await domainService.setDnsRecords(DOMAIN, [...currentRecords, ...txtRecordsToAdd]);
    
    console.log(`✅ SUCCESS! TXT validation records added to DNS`);
    console.log(`   SSL certificate should be issued within 5-15 minutes\n`);
    
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    throw error;
  }
}

addTxtRecords();
