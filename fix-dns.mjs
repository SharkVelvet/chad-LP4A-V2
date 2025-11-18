import { domainService } from './server/domainService.js';

const domain = 'insuranceoninsurance.com';

console.log('⚙️  Configuring DNS for insuranceoninsurance.com...\n');

domainService.setDnsRecords(domain, [
  {
    name: '@',
    type: 'A',
    address: '76.76.21.21',
    ttl: 300
  },
  {
    name: 'www',
    type: 'CNAME',
    address: 'chad-lp4a-v2-production.up.railway.app',
    ttl: 300
  }
])
.then(() => {
  console.log('✅ DNS configured successfully!');
  console.log('   @ → A 76.76.21.21');
  console.log('   www → CNAME chad-lp4a-v2-production.up.railway.app');
  console.log('\n🎉 Domain will be live in 5-15 minutes after DNS propagation!');
  console.log('\n📝 Next: Verify insuranceoninsurance.com is added in Railway dashboard');
})
.catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
