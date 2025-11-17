import { cloudflareService } from '../server/cloudflareService.js';

const HOSTNAME_ID = 'a6ff2f39-e069-4106-a8dd-cfa85800ece6';
const DOMAIN = 'vanhaleninsurance.com';
const MAX_CHECKS = 20; // 20 minutes max
const CHECK_INTERVAL = 60000; // 1 minute

async function checkStatus() {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/custom_hostnames/${HOSTNAME_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const data: any = await response.json();
    const result = data.result;
    
    return {
      status: result.status,
      sslStatus: result.ssl?.status,
      verificationErrors: result.ssl?.validation_errors || []
    };
  } catch (error) {
    console.error('❌ Error checking status:', error);
    return null;
  }
}

async function monitor() {
  console.log(`🔍 Monitoring SSL status for ${DOMAIN}...`);
  console.log(`   Checking every minute (max ${MAX_CHECKS} checks)\n`);
  
  for (let i = 1; i <= MAX_CHECKS; i++) {
    const status = await checkStatus();
    
    if (!status) {
      console.log(`[${i}/${MAX_CHECKS}] ❌ Failed to check status`);
    } else {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${i}/${MAX_CHECKS}] ${timestamp} - Status: ${status.status}, SSL: ${status.sslStatus}`);
      
      if (status.status === 'active' && status.sslStatus === 'active') {
        console.log(`\n🎉 SUCCESS! ${DOMAIN} is now active with SSL!`);
        console.log(`   Visit: https://${DOMAIN}`);
        process.exit(0);
      }
      
      if (status.verificationErrors.length > 0) {
        console.log(`   ⚠️  Errors: ${status.verificationErrors.join(', ')}`);
      }
    }
    
    if (i < MAX_CHECKS) {
      await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
    }
  }
  
  console.log(`\n⏰ Timeout after ${MAX_CHECKS} minutes. Status still pending.`);
  process.exit(1);
}

monitor();
