import { storage } from './storage.js';
import { domainService } from './domainService.js';
import { serializeDnsRecords } from './railwayHelpers.js';

async function fixDomain() {
  const domain = 'test-insurance-2025.com';
  
  console.log(`🔧 Manually fixing ${domain}...`);
  
  try {
    // The DNS target from Railway dashboard screenshot: dxhb9nbw.up.railway.app
    const dnsRecords = [
      {
        name: '@',
        type: 'CNAME',
        address: 'dxhb9nbw.up.railway.app',
        ttl: 300
      }
    ];
    
    console.log(`🌐 Configuring DNS records at Namecheap...`);
    await domainService.setDnsRecords(domain, dnsRecords);
    console.log(`✓ DNS records configured`);
    
    // Update database
    const page = await storage.getPageByDomain(domain);
    if (page) {
      await storage.updatePage(page.id, {
        domainVerified: true,
        domainStatus: 'auto_configured',
        railwayDnsTargets: serializeDnsRecords(dnsRecords)
      } as any);
      console.log(`✓ Database updated`);
    }
    
    console.log(`🎉 Domain fixed successfully!`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

fixDomain();
