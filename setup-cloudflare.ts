import { cloudflareService } from './server/cloudflareService.js';
import { domainService } from './server/domainService.js';
import { db } from './server/db.js';
import { websites } from './shared/schema.js';
import { eq } from 'drizzle-orm';

const domain = '2bitsofinsurance.com';
const replitDeploymentDomain = 'landing-pages-for-agents-v2-2-sharkvelvet.replit.app';

async function setupCloudflare() {
  try {
    console.log(`Setting up Cloudflare for ${domain}...`);
    
    // Find the website
    const [website] = await db.select().from(websites).where(eq(websites.domain, domain));
    
    if (!website) {
      console.error(`Website with domain ${domain} not found!`);
      process.exit(1);
    }
    
    console.log(`Found website ID: ${website.id}`);
    
    // Setup domain in Cloudflare
    console.log('Creating Cloudflare zone and DNS records...');
    const result = await cloudflareService.setupDomainForReplit(domain, replitDeploymentDomain);
    
    console.log('Cloudflare setup successful!');
    console.log('Zone ID:', result.zone.id);
    console.log('Nameservers:', result.nameservers);
    
    // Update Namecheap nameservers
    console.log('Updating Namecheap nameservers...');
    await domainService.setNameservers(domain, result.nameservers);
    
    console.log('Nameservers updated successfully!');
    
    // Update website in database
    console.log('Updating database...');
    await db.update(websites)
      .set({
        domainStatus: 'propagating',
        cloudflareZoneId: result.zone.id,
        cloudflareNameservers: result.nameservers
      })
      .where(eq(websites.id, website.id));
    
    console.log('✅ All done! Domain setup complete.');
    console.log('\nNext steps:');
    console.log('- DNS will propagate within 24 hours (usually much faster)');
    console.log('- SSL certificate will be generated automatically');
    console.log(`- Visit https://${domain} in 15-30 minutes to see your website!`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error setting up Cloudflare:', error.message);
    console.error(error);
    process.exit(1);
  }
}

setupCloudflare();
