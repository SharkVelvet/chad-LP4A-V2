import { railwayService } from './railwayService.js';
import { storage } from './storage.js';
import { domainService } from './domainService.js';
import { extractDnsRecordsFromRailway, serializeDnsRecords } from './railwayHelpers.js';

async function fixDomain() {
  const domain = 'vanhaleninsurance.com';
  const wwwDomain = 'www.vanhaleninsurance.com';
  
  console.log(`🔧 Fetching fresh DNS targets for ${domain}...`);
  
  try {
    // Add domains to Railway (will get fresh DNS targets since user just re-added them)
    console.log(`🚂 Calling Railway API for ${domain}...`);
    const rootResult = await railwayService.addCustomDomain(domain);
    console.log('✓ Root domain API call complete');
    
    console.log(`🚂 Calling Railway API for ${wwwDomain}...`);
    const wwwResult = await railwayService.addCustomDomain(wwwDomain);
    console.log('✓ WWW domain API call complete');
    
    // Extract DNS records
    if (rootResult.status?.dnsRecords && rootResult.status.dnsRecords.length > 0) {
      console.log(`✓ Railway provided ${rootResult.status.dnsRecords.length} DNS records for root`);
      console.log(`✓ Railway provided ${wwwResult.status?.dnsRecords?.length || 0} DNS records for www`);
      
      const allRecords = [
        ...(rootResult.status?.dnsRecords || []),
        ...(wwwResult.status?.dnsRecords || [])
      ];
      
      const dnsRecords = extractDnsRecordsFromRailway(allRecords, domain);
      console.log(`📋 Extracted ${dnsRecords.length} DNS records:`, dnsRecords);
      
      // Update database
      const page = await storage.getPageByDomain(domain);
      if (page) {
        await storage.updatePage(page.id, {
          domainVerified: true,
          domainStatus: 'auto_configured',
          railwayDnsTargets: serializeDnsRecords(dnsRecords)
        } as any);
        console.log('✅ Database updated with Railway DNS targets');
      } else {
        console.error('❌ Page not found in database for this domain');
      }
      
      // Update DNS at Namecheap
      console.log('🌐 Updating DNS records at Namecheap...');
      await domainService.setDnsRecords(domain, dnsRecords);
      console.log('✅ DNS records updated at Namecheap');
      
      console.log('🎉 Domain fixed successfully!');
    } else {
      console.error('❌ Railway did not provide DNS targets');
      console.log('Response:', JSON.stringify(rootResult, null, 2));
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  }
  
  process.exit(0);
}

fixDomain();
