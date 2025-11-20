import { railwayService } from './railwayService';

async function checkRailwayDomains() {
  try {
    console.log('🚂 Fetching Railway custom domains...');
    
    const domains = await railwayService.getCustomDomains();
    
    console.log(`\n✅ Found ${domains.length} custom domain(s):`);
    domains.forEach(d => {
      console.log(`  - ${d.domain} (ID: ${d.id}, Status: ${d.status})`);
    });
    
    const r2d2Domain = domains.find(d => d.domain === 'r2d2insurance.com');
    if (r2d2Domain) {
      console.log('\n🎉 r2d2insurance.com is already in Railway!');
      console.log(`   Status: ${r2d2Domain.status}`);
    } else {
      console.log('\n⚠️  r2d2insurance.com NOT found in Railway');
    }
    
  } catch (error: any) {
    console.error('❌ Error fetching Railway domains:', error.message);
    process.exit(1);
  }
}

checkRailwayDomains();
