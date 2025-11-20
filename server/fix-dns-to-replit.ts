import axios from 'axios';
import { db } from './db.js';
import { pages } from '@shared/schema.js';
import { eq } from 'drizzle-orm';

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';
const API_TOKEN = process.env.CLOUDFLARE_WORKERS_API_TOKEN!;

// Use the actual Replit deployment URL
const REPLIT_ORIGIN = process.env.REPLIT_DOMAINS?.split(',')[0] || 'e592e125-95d1-4809-aeeb-7c5fafd28272-00-18nxcxp6smxaz.janeway.replit.dev';

const cloudflareApi = axios.create({
  baseURL: CLOUDFLARE_API_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function fixDNSToReplit() {
  try {
    console.log('🔧 Updating r2d2insurance.com DNS to point to Replit...\n');
    console.log(`Target: ${REPLIT_ORIGIN}\n`);

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
      console.log(`🔄 Updating root (@) → ${REPLIT_ORIGIN}`);
      await cloudflareApi.patch(
        `/zones/${page.cloudflareZoneId}/dns_records/${rootRecord.id}`,
        {
          content: REPLIT_ORIGIN,
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
      console.log(`🔄 Updating www → ${REPLIT_ORIGIN}`);
      await cloudflareApi.patch(
        `/zones/${page.cloudflareZoneId}/dns_records/${wwwRecord.id}`,
        {
          content: REPLIT_ORIGIN,
          proxied: true,
        }
      );
      console.log(`   ✅ Updated!\n`);
    }

    console.log('🎉 DNS now points directly to your Replit deployment!');
    console.log('⏳ Wait 1-2 minutes for propagation, then visit:');
    console.log('   https://r2d2insurance.com');

  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fixDNSToReplit();
