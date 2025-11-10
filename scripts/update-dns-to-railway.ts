#!/usr/bin/env tsx
/**
 * Update Cloudflare DNS to point to Railway
 */

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ZONE_ID = '1e0ab3f7cc056c06589bf0432a81fbb6';
const DOMAIN = '2bitsofinsurance.com';
const RAILWAY_URL = 'chad-lp4a-v2-production.up.railway.app';

async function updateDNS() {
  if (!CLOUDFLARE_API_TOKEN) {
    throw new Error('CLOUDFLARE_API_TOKEN not found');
  }

  console.log(`\n🔄 Updating DNS for ${DOMAIN} to point to Railway...\n`);

  // 1. Get existing DNS records
  const listResponse = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=${DOMAIN}`,
    {
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const listData: any = await listResponse.json();
  
  if (!listData.success) {
    throw new Error(`Failed to list DNS records: ${JSON.stringify(listData.errors)}`);
  }

  // 2. Delete existing A/CNAME records for root domain
  for (const record of listData.result) {
    if ((record.type === 'A' || record.type === 'CNAME') && record.name === DOMAIN) {
      console.log(`→ Deleting existing ${record.type} record: ${record.content}`);
      const deleteResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${record.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const deleteData: any = await deleteResponse.json();
      if (deleteData.success) {
        console.log(`✓ Deleted ${record.type} record`);
      }
    }
  }

  // 3. Create CNAME record pointing to Railway
  console.log(`→ Creating CNAME record pointing to ${RAILWAY_URL}...`);
  
  const createResponse = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'CNAME',
        name: DOMAIN,
        content: RAILWAY_URL,
        ttl: 1, // Auto
        proxied: true, // Enable Cloudflare proxy for SSL
      }),
    }
  );

  const createData: any = await createResponse.json();
  
  if (!createData.success) {
    throw new Error(`Failed to create CNAME record: ${JSON.stringify(createData.errors)}`);
  }

  console.log(`✓ CNAME record created`);
  console.log(`\n✅ DNS updated successfully!\n`);
  console.log(`${DOMAIN} → ${RAILWAY_URL}`);
  console.log(`\nCloudflare proxy: ENABLED (SSL/HTTPS automatic)`);
  console.log(`\nNote: DNS propagation may take a few minutes.`);
  console.log(`\nNext step: Add custom domain in Railway dashboard:`);
  console.log(`  1. Go to Railway → chad-LP4A-V2 → Settings → Domains`);
  console.log(`  2. Click "+ Custom Domain"`);
  console.log(`  3. Enter: ${DOMAIN}`);
  console.log(`  4. Click "Add Domain"`);
}

updateDNS().catch(console.error);
