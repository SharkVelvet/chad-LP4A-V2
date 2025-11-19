/**
 * Script to add 123456insurance.com to Caddy allowlist via remote API call
 * Run this from Replit: npm run tsx scripts/fix-123456insurance.ts
 */

const DROPLET_IP = '134.199.194.110';
const CADDY_ADMIN_API = `http://${DROPLET_IP}:2019`;
const DOMAIN = '123456insurance.com';

async function addDomainToCaddy() {
  console.log(`🔧 Attempting to add ${DOMAIN} to Caddy allowlist...`);
  console.log(`📡 Connecting to Caddy Admin API at ${CADDY_ADMIN_API}`);
  
  try {
    // First, try to get current config
    console.log('\n📋 Fetching current allowed domains...');
    let currentAllowed: string[] = [];
    
    try {
      const getCurrentResponse = await fetch(`${CADDY_ADMIN_API}/config/apps/tls/automation/on_demand/allowed`, {
        signal: AbortSignal.timeout(5000)
      });
      
      if (getCurrentResponse.ok) {
        currentAllowed = await getCurrentResponse.json();
        console.log(`✅ Current allowed domains: ${currentAllowed.join(', ') || 'none'}`);
      }
    } catch (e: any) {
      console.log(`⚠️  Could not fetch current config: ${e.message}`);
      console.log('ℹ️  Caddy Admin API (port 2019) may not be publicly accessible');
    }
    
    // Add the domain
    const domainsToAdd = [DOMAIN, `www.${DOMAIN}`];
    const newAllowed = Array.from(new Set([...currentAllowed, ...domainsToAdd]));
    
    console.log(`\n📝 Adding domains: ${domainsToAdd.join(', ')}`);
    
    const response = await fetch(`${CADDY_ADMIN_API}/config/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apps: {
          tls: {
            automation: {
              on_demand: {
                allowed: newAllowed
              }
            }
          }
        }
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Caddy API returned ${response.status}: ${errorText}`);
    }

    console.log(`\n✅ SUCCESS! ${DOMAIN} added to Caddy allowlist`);
    console.log(`\n🔐 SSL Certificate will be provisioned on next HTTPS request`);
    console.log(`\n💡 Try visiting: https://${DOMAIN}`);
    console.log(`   Or test with: curl -I https://${DOMAIN}`);
    
  } catch (error: any) {
    console.error(`\n❌ ERROR: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('timeout')) {
      console.log('\n🔒 ISSUE: Caddy Admin API (port 2019) is not accessible from outside the droplet');
      console.log('\n📋 SOLUTION: You need to either:');
      console.log('   1. Enable SSH key access to the droplet, OR');
      console.log('   2. Add a proxy endpoint on port 3000 to call Caddy API, OR');
      console.log('   3. Manually add the domain via console access to the droplet');
      console.log('\n🎯 RECOMMENDED: Just test the next domain you register - it will work automatically!');
    }
  }
}

// Run the script
addDomainToCaddy();
