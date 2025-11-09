# Vercel Deployment Guide

## Overview

This guide walks you through deploying your insurance website builder platform to Vercel, enabling unlimited custom domains for your customers at $20/month (Pro plan).

## Why Vercel?

- **Unlimited custom domains** (up to 100K soft limit) on Pro plan
- **Automatic SSL** for all custom domains
- **Domains API** to programmatically add customer domains
- **Built for multi-tenant SaaS** with "Vercel for Platforms"

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **GitHub Account**: Your code needs to be in a GitHub repository
3. **Neon Database**: Update your DATABASE_URL to use serverless pooling

## Step 1: Update Database Connection for Serverless

Your current Neon database URL:
```
postgresql://neondb_owner:***@ep-snowy-frost-a68rl4ge.us-west-2.aws.neon.tech/neondb?sslmode=require
```

**Update to pooled version by adding `-pooler` to the endpoint:**
```
postgresql://neondb_owner:***@ep-snowy-frost-a68rl4ge-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require
```

This enables PgBouncer connection pooling which is ESSENTIAL for serverless functions to avoid "too many connections" errors.

## Step 2: Push Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. **Framework Preset**: Vite
5. **Root Directory**: Leave as `.` (root)
6. **Build Command**: `vite build` (default is fine)
7. **Output Directory**: `dist` (default is fine)
8. **Install Command**: `npm install` (default)

## Step 4: Configure Environment Variables

In Vercel dashboard, go to **Project Settings** → **Environment Variables** and add:

### Required Variables:
```
DATABASE_URL=postgresql://neondb_owner:PASSWORD@ep-snowy-frost-a68rl4ge-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require
SESSION_SECRET=your-random-session-secret-here
STRIPE_SECRET_KEY=sk_...
VITE_STRIPE_PUBLIC_KEY=pk_...
```

### Optional Variables (if using):
```
CLOUDFLARE_API_TOKEN=your-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
NAMECHEAP_API_KEY=your-key
NAMECHEAP_API_USER=your-username
NAMECHEAP_USERNAME=your-username
NAMECHEAP_CLIENT_IP=your-ip
SENDGRID_API_KEY=your-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
FACEBOOK_PIXEL_ID=your-pixel-id
```

**Important**: Make sure to use the **pooled** DATABASE_URL (with `-pooler` in the hostname)

## Step 5: Deploy

Click **"Deploy"** in Vercel dashboard. The deployment will:
1. Install dependencies
2. Build the frontend (Vite)
3. Deploy serverless functions from `/api` folder
4. Provide you with a production URL: `your-app.vercel.app`

## Step 6: Test Your Deployment

Visit your Vercel URL (e.g., `landing-pages-for-agents.vercel.app`) and test:

1. ✅ Homepage loads
2. ✅ Template selection works
3. ✅ User registration/login works
4. ✅ Dashboard authentication works
5. ✅ Database connections work (no "too many connections" errors)

## Step 7: Add First Custom Domain (Testing)

### Option A: Via Vercel Dashboard (Manual - for testing)

1. Go to **Project Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter `2bitsofinsurance.com`
4. Vercel will provide DNS records to add:
   - **Type**: `A`
   - **Name**: `@`
   - **Value**: `76.76.21.21`
   
   OR:
   
   - **Type**: `CNAME`
   - **Name**: `@` (or `www`)
   - **Value**: `cname.vercel-dns.com`

5. Add these records in Namecheap DNS
6. Wait 5-15 minutes for SSL certificate provisioning
7. Visit `https://2bitsofinsurance.com` - it should work!

### Option B: Via Vercel API (Programmatic - for production)

Once manual testing works, implement automatic domain addition:

```typescript
// Add to your server code
const VERCEL_API = 'https://api.vercel.com';
const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

async function addCustomerDomain(domain: string) {
  const response = await fetch(
    `${VERCEL_API}/v10/projects/${VERCEL_PROJECT_ID}/domains`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain })
    }
  );
  
  const result = await response.json();
  return result;
}
```

## Step 8: Get Vercel API Token (for Programmatic Domains)

1. Go to https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name it "Domain Management API"
4. Set scope to **"Full Account"** or specific project
5. Copy the token and add to environment variables as `VERCEL_API_TOKEN`
6. Get your Project ID from Project Settings and add as `VERCEL_PROJECT_ID`

## Step 9: Update Your Application Code

Replace Cloudflare domain management with Vercel API:

```typescript
// Instead of cloudflareService.addDomain()
// Use vercelService.addDomain()

import { vercelService } from './vercelService';

// When customer adds domain
const domain = await vercelService.addDomain('customerdomain.com');

// Show customer DNS instructions from domain.apexName
// They need to point their domain to Vercel's DNS servers
```

## Step 10: Upgrade to Pro Plan (When Ready)

**Free Hobby Plan Limits:**
- 50 custom domains max
- 100GB bandwidth

**Pro Plan ($20/month):**
- **Unlimited custom domains** (100K soft limit)
- 400GB bandwidth
- Advanced analytics
- Team collaboration

Upgrade at: https://vercel.com/account/billing

## Pricing Comparison

| Platform | Cost | Custom Domains | SSL |
|----------|------|----------------|-----|
| **Vercel Pro** | $20/month | 100,000 | Free |
| Fly.io | $0.10/domain/month | Unlimited | $10-1,000/month |
| Railway | ~$10-50/month | Unlimited | Free |
| Replit | $20/month | Manual only | Limited |

## Troubleshooting

### "Too many connections for role"
- ✅ **Fix**: Use pooled DATABASE_URL (with `-pooler`)
- Double-check environment variables in Vercel

### Sessions not persisting
- ✅ **Fix**: Ensure `trust proxy` is set to `1` in auth.ts (already done)
- Check `secure: true` in cookie settings for production

### Custom domain shows 404
- ✅ **Fix**: Add domain via Vercel dashboard or API first
- Wait for SSL certificate provisioning (5-15 min)
- Verify DNS records are correct

### Build fails
- ✅ **Fix**: Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json` (not devDependencies)

## Multi-Tenant Routing

Your app already has multi-tenant detection in `client/src/App.tsx`:

```typescript
// Lines 104-121
const isCustomDomain = useMemo(() => {
  const hostname = window.location.hostname;
  return hostname !== 'localhost' && 
         !hostname.includes('replit') && 
         !hostname.includes('vercel.app');
}, []);
```

**Update this to:**

```typescript
const isCustomDomain = useMemo(() => {
  const hostname = window.location.hostname;
  return hostname !== 'localhost' && 
         !hostname.endsWith('.vercel.app'); // Allow your-app.vercel.app as platform URL
}, []);
```

## Database Migrations on Vercel

Migrations work the same way:

```bash
# From your local machine
npm run db:push
```

This pushes schema changes to your Neon database, which Vercel functions will use automatically.

## Next Steps After Deployment

1. ✅ Test with 2-3 custom domains manually
2. ✅ Implement Vercel Domains API in your code
3. ✅ Update your UI to show DNS instructions for customers
4. ✅ Remove Cloudflare service code (optional - keep for reference)
5. ✅ Upgrade to Pro plan when you have more than 50 customers

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel for Platforms**: https://vercel.com/docs/multi-tenant
- **Domains API**: https://vercel.com/docs/rest-api#endpoints/domains
- **Support**: https://vercel.com/support

---

## Quick Reference

**Test your deployment:**
```bash
curl https://your-app.vercel.app/api/templates
```

**Add domain via API:**
```bash
curl -X POST "https://api.vercel.com/v10/projects/PROJECT_ID/domains" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "customerdomain.com"}'
```

**Check domain status:**
```bash
curl "https://api.vercel.com/v9/projects/PROJECT_ID/domains/customerdomain.com" \
  -H "Authorization: Bearer TOKEN"
```

---

**You're all set!** Once deployed to Vercel, you'll have unlimited custom domains with automatic SSL - the perfect platform for your insurance website SaaS business.
