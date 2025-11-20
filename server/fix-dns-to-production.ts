import axios from 'axios';
import { db } from './db.js';
import { pages } from '@shared/schema.js';
import { eq } from 'drizzle-orm';

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';
const API_TOKEN = process.env.CLOUDFLARE_WORKERS_API_TOKEN!;

// Use the production Replit URL
const PRODUCTION_URL = 'landing-pages-for-agents-v-2-sharkvelvet.replit.app';

const cloudflareApi = axios.create({
  baseURL: CLOUDFLARE_API_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function fixDNSToProduction() {
  try {
    console.log('🔧 Updating r2d2insurance.com DNS to production URL...\n');
    console.log(`Target: ${PRODUCTION_URL}\n`);

    const [page] = await db
      .select()
      .from(pages)
      .where(eq(pages.domain, 'r2d2insurance.com'));

    if (!page?.cloudflareZoneId) {
      throw new Error('Page or zone ID not found');
    }

    // Get existing DNS records
    const { data: recordsResponse } = await cloudflareApi.get(
      `/zones/${page.cloudflareZoneId}/dns_records`
    );

    const records = recordsResponse.result || [];

    // Update root record
    const rootRecord = records.find((r: any) => 
      r.name === 'r2d2insurance.com' && r.type === 'CNAME'
    );
    
    if (rootRecord) {
      console.log(`🔄 Updating root (@) → ${PRODUCTION_URL}`);
      await cloudflareApi.patch(
        `/zones/${page.cloudflareZoneId}/dns_records/${rootRecord.id}`,
        {
          content: PRODUCTION_URL,
          proxied: true,
        }
      );
      console.log(`   ✅ Updated!\n`);
    }

    // Update www record
    const wwwRecord = records.find((r: any) => 
      r.name === 'www.r2d2insurance.com' && r.type === 'CNAME'
    );
    
    if (wwwRecord) {
      console.log(`🔄 Updating www → ${PRODUCTION_URL}`);
      await cloudflareApi.patch(
        `/zones/${page.cloudflareZoneId}/dns_records/${wwwRecord.id}`,
        {
          content: PRODUCTION_URL,
          proxied: true,
        }
      );
      console.log(`   ✅ Updated!\n`);
    }

    console.log('🎉 DNS now points to your production deployment!');
    console.log('⏳ Wait 1-2 minutes, then visit: https://r2d2insurance.com');

  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fixDNSToProduction();
