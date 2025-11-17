const PROXY_URL = 'http://134.199.194.110:3000/namecheap';
const domain = 'insurance-test-2028.com';
const SLD = 'insurance-test-2028';
const TLD = 'com';

const params = new URLSearchParams({
  Command: 'namecheap.domains.dns.setHosts',
  SLD,
  TLD,
  'HostName1': '@',
  'RecordType1': 'CNAME',
  'Address1': 'chad-lp4a-v2-production.up.railway.app',
  'TTL1': '300',
  'HostName2': 'www',
  'RecordType2': 'CNAME',
  'Address2': 'chad-lp4a-v2-production.up.railway.app',
  'TTL2': '300'
});

console.log(`🌐 Setting DNS for ${domain}...`);

try {
  const response = await fetch(`${PROXY_URL}?${params}`);
  const text = await response.text();
  
  if (text.includes('<ErrCount>0</ErrCount>') && text.includes('SUCCESS')) {
    console.log('✅ DNS records set successfully!');
    console.log(`Both @ and www.${domain} now point to Railway`);
    console.log('Site will be live with HTTPS in 15-30 minutes');
  } else {
    console.log('Response:', text.substring(0, 500));
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}
