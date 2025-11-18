/**
 * Manual fix for insuranceoninsurance.com
 * This applies the new Railway automation to fix the domain
 */

import { railwayService } from './server/railwayService.js';
import { domainService } from './server/domainService.js';

const domain = 'insuranceoninsurance.com';

async function fixDomain() {
  console.log('🔧 Fixing insuranceoninsurance.com with Railway automation...\n');

  try {
    // Step 1: Add domain to Railway
    console.log('Step 1: Adding domain + www to Railway...');
    await railwayService.addCustomDomain(domain);
    await railwayService.addCustomDomain(`www.${domain}`);
    console.log('✅ Added to Railway\n');

    // Step 2: Get Railway DNS records (with retry)
    console.log('Step 2: Getting Railway CNAME target...');
    const dnsRecords = await railwayService.getAllDomainDnsRecords(domain, 5, 3000);
    
    if (dnsRecords && dnsRecords.length > 0) {
      console.log(`✅ Got ${dnsRecords.length} DNS records from Railway`);
      
      const cnameRecord = dnsRecords.find(r => 
        r.recordType === 'CNAME' && r.requiredValue
      );
      
      if (cnameRecord) {
        const railwayTarget = cnameRecord.requiredValue;
        console.log(`🎯 Railway CNAME target: ${railwayTarget}\n`);
        
        // Step 3: Configure DNS in Namecheap
        console.log('Step 3: Configuring DNS in Namecheap...');
        await domainService.setDnsRecords(domain, [
          {
            name: '@',
            type: 'ALIAS',
            address: railwayTarget,
            ttl: 300
          },
          {
            name: 'www',
            type: 'CNAME',
            address: railwayTarget,
            ttl: 300
          }
        ]);
        console.log('✅ DNS configured!\n');
        
        console.log('🎉 SUCCESS! insuranceoninsurance.com is now configured.');
        console.log('   Domain will be live in 5-30 minutes after DNS propagation.');
      } else {
        console.log('⚠️  No CNAME record found from Railway yet');
      }
    } else {
      console.log('⚠️  Railway has not generated DNS records yet');
      console.log('   You may need to wait a few minutes and run this script again');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

fixDomain().catch(console.error);
