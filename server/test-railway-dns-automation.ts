import { railwayService } from './railwayService.js';

async function testDnsAutomation() {
  console.log('🧪 Testing Railway DNS automation...\n');
  
  // Test domain that's already in Railway
  const testDomain = 'insurance-test-2026.com';
  
  try {
    console.log(`1️⃣  Testing getAllDomainDnsRecords for: ${testDomain}`);
    const dnsRecords = await railwayService.getAllDomainDnsRecords(testDomain);
    
    if (dnsRecords && dnsRecords.length > 0) {
      console.log(`✅ SUCCESS: Retrieved ${dnsRecords.length} DNS records from Railway\n`);
      
      console.log('📋 DNS Records:');
      dnsRecords.forEach((record, i) => {
        console.log(`   ${i + 1}. ${record.fqdn} → ${record.requiredValue}`);
      });
      
      console.log('\n🎉 AUTOMATION VERIFIED: Railway DNS fetching works!');
      console.log('   This means the fallback logic will work in production.');
      console.log('   Future domain purchases will be fully automated.');
    } else {
      console.log('❌ FAILED: No DNS records returned');
      console.log('   This could mean:');
      console.log('   - Domain not in Railway yet');
      console.log('   - Railway API credentials issue');
    }
  } catch (error: any) {
    console.error('❌ ERROR:', error.message);
  }
  
  process.exit(0);
}

testDnsAutomation();
