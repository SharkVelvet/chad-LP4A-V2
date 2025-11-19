import { domainService } from '../server/domainService.js';

const FALLBACK_DOMAIN = 'landingpagesforagentsfallback.com';
const DROPLET_IP = '134.199.194.110';

async function updateFallbackOrigin() {
  try {
    console.log('🚀 Updating fallback origin to point to DigitalOcean droplet...\n');
    
    console.log(`Configuring DNS for ${FALLBACK_DOMAIN} → ${DROPLET_IP}`);
    await domainService.setDnsRecords(FALLBACK_DOMAIN, [
      { name: '@', type: 'A', address: DROPLET_IP, ttl: 300 },
      { name: 'www', type: 'A', address: DROPLET_IP, ttl: 300 }
    ]);
    console.log(`✅ DNS updated to point to droplet!\n`);
    
    console.log('🎉 SUCCESS! Fallback origin now points to DigitalOcean.');
    console.log(`   All customer domains will now route to the droplet automatically!`);
    
  } catch (error: any) {
    console.error('\n❌ Update failed:', error.message);
    process.exit(1);
  }
}

updateFallbackOrigin();
