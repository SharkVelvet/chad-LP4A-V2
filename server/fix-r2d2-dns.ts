import axios from 'axios';
import { db } from './db.js';
import { pages } from '@shared/schema.js';
import { eq } from 'drizzle-orm';

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';
const API_TOKEN = process.env.CLOUDFLARE_WORKERS_API_TOKEN!;
const FALLBACK_ORIGIN = 'landingpagesforagentsfallback.com';

const cloudflareApi = axios.create({
  baseURL: CLOUDFLARE_API_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function fixR2D2DNS() {
  try {
    console.log('🔧 Fixing r2d2insurance.com DNS records...\n');

    // Get page data
    const [page] = await db
      .select()
      .from(pages)
      .where(eq(pages.domain, 'r2d2insurance.com'));

    if (!page) {
      throw new Error('Page not found for r2d2insurance.com');
    }

    console.log(`✅ Found page ID ${page.id}`);
    console.log(`   Zone ID: ${page.cloudflareZoneId}\n`);

    if (!page.cloudflareZoneId) {
      throw new Error('No Cloudflare zone ID found');
    }

    // Get existing DNS records
    const { data: recordsResponse } = await cloudflareApi.get(
      `/zones/${page.cloudflareZoneId}/dns_records`
    );

    const records = recordsResponse.result || [];
    console.log(`📋 Found ${records.length} existing DNS records\n`);

    // Update or create @ record
    const rootRecord = records.find((r: any) => r.name === 'r2d2insurance.com' && r.type === 'CNAME');
    
    if (rootRecord) {
      console.log(`🔄 Updating root (@) record...`);
      console.log(`   Old target: ${rootRecord.content}`);
      console.log(`   New target: ${FALLBACK_ORIGIN}`);
      
      await cloudflareApi.patch(
        `/zones/${page.cloudflareZoneId}/dns_records/${rootRecord.id}`,
        {
          content: FALLBACK_ORIGIN,
          proxied: true,
        }
      );
      console.log(`   ✅ Updated!\n`);
    } else {
      console.log(`➕ Creating root (@) record → ${FALLBACK_ORIGIN}`);
      await cloudflareApi.post(`/zones/${page.cloudflareZoneId}/dns_records`, {
        type: 'CNAME',
        name: '@',
        content: FALLBACK_ORIGIN,
        proxied: true,
        ttl: 1,
      });
      console.log(`   ✅ Created!\n`);
    }

    // Update or create www record
    const wwwRecord = records.find((r: any) => r.name === 'www.r2d2insurance.com' && r.type === 'CNAME');
    
    if (wwwRecord) {
      console.log(`🔄 Updating www record...`);
      console.log(`   Old target: ${wwwRecord.content}`);
      console.log(`   New target: ${FALLBACK_ORIGIN}`);
      
      await cloudflareApi.patch(
        `/zones/${page.cloudflareZoneId}/dns_records/${wwwRecord.id}`,
        {
          content: FALLBACK_ORIGIN,
          proxied: true,
        }
      );
      console.log(`   ✅ Updated!\n`);
    } else {
      console.log(`➕ Creating www record → ${FALLBACK_ORIGIN}`);
      await cloudflareApi.post(`/zones/${page.cloudflareZoneId}/dns_records`, {
        type: 'CNAME',
        name: 'www',
        content: FALLBACK_ORIGIN,
        proxied: true,
        ttl: 1,
      });
      console.log(`   ✅ Created!\n`);
    }

    console.log('🎉 DNS records updated successfully!');
    console.log('⏳ Changes may take a few minutes to propagate.');
    console.log('\nNext steps:');
    console.log('1. Wait 2-5 minutes for DNS propagation');
    console.log('2. Visit https://r2d2insurance.com');
    console.log('3. You should see your website instead of Railway 404!');

  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fixR2D2DNS();
