#!/usr/bin/env tsx
/**
 * Migrate a specific website from local database to Railway production database
 */

import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../shared/schema.js';
import { eq } from 'drizzle-orm';

const LOCAL_DATABASE_URL = process.env.DATABASE_URL;
const RAILWAY_DATABASE_URL = process.argv[2];

if (!RAILWAY_DATABASE_URL) {
  console.error('Usage: tsx scripts/migrate-website-to-railway.ts <railway-database-url> <domain>');
  console.error('Example: tsx scripts/migrate-website-to-railway.ts "postgresql://..." 2bitsofinsurance.com');
  process.exit(1);
}

const DOMAIN = process.argv[3] || '2bitsofinsurance.com';

async function migrate() {
  // Connect to local database
  const localPool = new Pool({ 
    connectionString: LOCAL_DATABASE_URL,
    ssl: false
  });
  const localDb = drizzle(localPool, { schema });

  // Connect to Railway database
  const railwayPool = new Pool({ 
    connectionString: RAILWAY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const railwayDb = drizzle(railwayPool, { schema });

  try {
    console.log(`\n🔄 Migrating website: ${DOMAIN}\n`);

    // 1. Get website from local database
    const [localWebsite] = await localDb
      .select()
      .from(schema.websites)
      .where(eq(schema.websites.domain, DOMAIN));

    if (!localWebsite) {
      throw new Error(`Website not found for domain: ${DOMAIN}`);
    }

    console.log(`✓ Found website (ID: ${localWebsite.id})`);

    // 2. Get user from local database
    const [localUser] = await localDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, localWebsite.userId));

    if (!localUser) {
      throw new Error(`User not found (ID: ${localWebsite.userId})`);
    }

    console.log(`✓ Found user: ${localUser.email}`);

    // 3. Get website content from local database
    const [localContent] = await localDb
      .select()
      .from(schema.websiteContent)
      .where(eq(schema.websiteContent.websiteId, localWebsite.id));

    console.log(`✓ Found website content`);

    // 4. Check if user exists in Railway, if not create
    let railwayUser = await railwayDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, localUser.email))
      .then(rows => rows[0]);

    if (!railwayUser) {
      console.log(`→ Creating user in Railway...`);
      [railwayUser] = await railwayDb
        .insert(schema.users)
        .values({
          username: localUser.username,
          email: localUser.email,
          password: localUser.password,
          role: localUser.role,
          emailVerified: localUser.emailVerified,
          stripeCustomerId: localUser.stripeCustomerId,
          stripeSubscriptionId: localUser.stripeSubscriptionId
        })
        .returning();
      console.log(`✓ User created (ID: ${railwayUser.id})`);
    } else {
      console.log(`✓ User already exists in Railway (ID: ${railwayUser.id})`);
    }

    // 5. Check if website exists in Railway, if not create
    let railwayWebsite = await railwayDb
      .select()
      .from(schema.websites)
      .where(eq(schema.websites.domain, DOMAIN))
      .then(rows => rows[0]);

    if (!railwayWebsite) {
      console.log(`→ Creating website in Railway...`);
      [railwayWebsite] = await railwayDb
        .insert(schema.websites)
        .values({
          userId: railwayUser.id,
          templateId: localWebsite.templateId,
          name: localWebsite.name,
          domain: localWebsite.domain,
          domainVerified: localWebsite.domainVerified,
          domainStatus: localWebsite.domainStatus,
          domainPreferences: localWebsite.domainPreferences,
          cloudflareZoneId: localWebsite.cloudflareZoneId,
          cloudflareNameservers: localWebsite.cloudflareNameservers,
          subscriptionPlan: localWebsite.subscriptionPlan,
          subscriptionStatus: localWebsite.subscriptionStatus,
          primaryColor: localWebsite.primaryColor,
          isActive: localWebsite.isActive
        })
        .returning();
      console.log(`✓ Website created (ID: ${railwayWebsite.id})`);
    } else {
      console.log(`✓ Website already exists in Railway (ID: ${railwayWebsite.id})`);
    }

    // 6. Check if content exists, if not create
    const existingContent = await railwayDb
      .select()
      .from(schema.websiteContent)
      .where(eq(schema.websiteContent.websiteId, railwayWebsite.id))
      .then(rows => rows[0]);

    if (!existingContent && localContent) {
      console.log(`→ Creating website content in Railway...`);
      await railwayDb
        .insert(schema.websiteContent)
        .values({
          websiteId: railwayWebsite.id,
          businessName: localContent.businessName,
          tagline: localContent.tagline,
          aboutUs: localContent.aboutUs,
          phone: localContent.phone,
          email: localContent.email,
          address: localContent.address,
          heroImage: localContent.heroImage,
          logo: localContent.logo,
          galleryImages: localContent.galleryImages,
          content: localContent.content,
          isPublished: localContent.isPublished,
          maintenanceMode: localContent.maintenanceMode,
          formEnabled: localContent.formEnabled,
          formProvider: localContent.formProvider,
          formEmbedCode: localContent.formEmbedCode
        });
      console.log(`✓ Website content created`);
    } else if (existingContent) {
      console.log(`✓ Website content already exists`);
    }

    console.log(`\n✅ Migration complete!\n`);
    console.log(`Domain: ${DOMAIN}`);
    console.log(`Template: Template ${localWebsite.templateId}`);
    console.log(`User: ${railwayUser.email}`);
    console.log(`\nNext steps:`);
    console.log(`1. Configure Railway to accept custom domain: ${DOMAIN}`);
    console.log(`2. Point ${DOMAIN} DNS to Railway URL`);

  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    throw error;
  } finally {
    await localPool.end();
    await railwayPool.end();
  }
}

migrate().catch(console.error);
