import { domainService } from '../server/domainService.js';
import { cloudflareService } from '../server/cloudflareService.js';

const FALLBACK_DOMAIN = 'landingpagesforagentsfallback.com';
const RAILWAY_TARGET = 'chad-lp4a-v2-production.up.railway.app';

async function setupFallbackOrigin() {
  try {
    console.log('🚀 Setting up fallback origin domain...\n');
    
    // Step 1: Check if we already own the domain
    console.log(`1️⃣  Checking ${FALLBACK_DOMAIN}...`);
    try {
      const availabilityResults = await domainService.checkAvailability([FALLBACK_DOMAIN]);
      const isAvailable = availabilityResults[0]?.available;
      
      if (!isAvailable) {
        console.log(`   ✅ Domain already owned - proceeding with configuration\n`);
      } else {
        // Step 2: Purchase domain
        console.log(`   ✅ Available! Purchasing domain...`);
        await domainService.registerDomain(FALLBACK_DOMAIN, 1, {
          firstName: 'Chad',
          lastName: 'Admin',
          address1: '123 Main St',
          city: 'New York',
          stateProvince: 'NY',
          postalCode: '10001',
          country: 'US',
          phone: '5555555555',
          email: 'admin@landingpagesforagents.com'
        });
        console.log(`   ✅ Domain purchased successfully!\n`);
      }
    } catch (error: any) {
      // If error contains "not available", we likely already own it
      if (error.message?.includes('not available')) {
        console.log(`   ✅ Domain already owned - proceeding with configuration\n`);
      } else {
        throw error;
      }
    }
    
    // Step 3: Configure DNS to point to Railway
    console.log(`2️⃣  Configuring DNS records...`);
    await domainService.setDnsRecords(FALLBACK_DOMAIN, [
      { name: '@', type: 'ALIAS', address: RAILWAY_TARGET, ttl: 300 },
      { name: 'www', type: 'CNAME', address: RAILWAY_TARGET, ttl: 300 }
    ]);
    console.log(`   ✅ DNS configured to point to Railway\n`);
    
    // Step 4: Wait for DNS propagation
    console.log(`3️⃣  Waiting 30 seconds for DNS propagation...`);
    await new Promise(resolve => setTimeout(resolve, 30000));
    console.log(`   ✅ DNS should be propagated\n`);
    
    // Step 5: Set as Cloudflare fallback origin
    console.log(`4️⃣  Setting as Cloudflare fallback origin...`);
    const result = await cloudflareService.setFallbackOrigin(FALLBACK_DOMAIN);
    if (!result) {
      throw new Error('Failed to set Cloudflare fallback origin');
    }
    console.log(`   ✅ Fallback origin configured!\n`);
    
    console.log('✅ SUCCESS! Fallback origin is ready.');
    console.log(`   Domain: ${FALLBACK_DOMAIN}`);
    console.log(`   Target: ${RAILWAY_TARGET}`);
    console.log(`\n🎉 Customer domains can now be activated automatically!`);
    
  } catch (error: any) {
    console.error('\n❌ Setup failed:', error.message);
    if (error.response) {
      console.error('   Response:', error.response);
    }
    process.exit(1);
  }
}

setupFallbackOrigin();
