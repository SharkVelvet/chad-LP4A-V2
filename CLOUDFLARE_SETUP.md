# Cloudflare Integration for Custom Domains

## Overview

Your platform now supports customer custom domains with automatic SSL/HTTPS using Cloudflare. This enables customers to use their own domain names (like `2bitsofinsurance.com`) without any subdomains or platform branding, with fully automated SSL certificates.

## How It Works

```
Customer Domain (2bitsofinsurance.com)
    ↓
Cloudflare (Handles SSL + Proxying)
    ↓
Your Published Replit App
    ↓
Detects domain & serves correct website
```

**Customer Experience:**
- Visits `https://2bitsofinsurance.com` ← Their own domain
- Sees 🔒 Secure HTTPS connection
- Views their insurance agent website
- Zero indication it's hosted on your platform

## Setup Requirements

### 1. Create a Cloudflare Account

1. Go to [https://cloudflare.com](https://cloudflare.com)
2. Sign up for a **free account**
3. No credit card required for basic features

### 2. Get Cloudflare API Credentials

**Step 1: Get Account ID**
1. Log into Cloudflare dashboard
2. Click on any domain (or create a dummy one)
3. Scroll down in right sidebar
4. Copy the **Account ID**

**Step 2: Create API Token**
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Click **"Use template"** next to "Edit zone DNS"
4. Configure permissions:
   - **Zone** → **DNS** → **Edit**
   - **Zone** → **Zone** → **Read**
   - **Account** → **Zone** → **Read**
5. Under **Zone Resources:**
   - Select: **Include** → **All zones**
6. Click **"Continue to summary"**
7. Click **"Create Token"**
8. **Copy the token immediately** (you can't see it again!)

### 3. Add Secrets to Replit

Add these environment variables to your Replit deployment:

```bash
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

**How to add:**
1. Open your Replit project
2. Click **"Secrets"** tab (lock icon in left sidebar)
3. Add both secrets
4. Restart your deployment

### 4. Get Your Published Replit Domain

After publishing your app, you'll get a deployment URL like:
- `your-app-username.replit.app` or
- `some-unique-id.replit.app`

**You'll need this domain** - it's what Cloudflare will proxy to.

## Domain Setup Flow

When a customer purchases a domain through your platform:

### Automatic Process:

1. **Domain Registration** (Namecheap)
   - Customer purchases `2bitsofinsurance.com`
   - Domain registered via Namecheap API

2. **Cloudflare Configuration** (Automatic)
   - Domain added to your Cloudflare account as a "zone"
   - DNS records created:
     - `2bitsofinsurance.com` → Points to your Replit app
     - `www.2bitsofinsurance.com` → Points to your Replit app
   - SSL certificate auto-generated (within 15 min to 24 hrs)
   - Cloudflare proxy enabled (orange cloud)

3. **Nameserver Update** (Automatic)
   - Namecheap nameservers changed to Cloudflare's:
     - `nash.ns.cloudflare.com`
     - `olga.ns.cloudflare.com`
     - (or similar - varies by zone)

4. **Propagation** (24-48 hours max, usually faster)
   - DNS changes propagate globally
   - SSL certificate activates
   - Domain becomes live with HTTPS

### Manual Trigger (Developer/Admin):

If you need to manually set up Cloudflare for a domain:

```javascript
// API call from frontend
POST /api/domains/:domain/cloudflare/setup
{
  "replitDeploymentDomain": "your-app.replit.app"
}
```

This endpoint:
- Creates Cloudflare zone
- Sets up DNS records
- Updates Namecheap nameservers
- Stores zone info in database

## Checking Status

Check Cloudflare status for a domain:

```javascript
GET /api/domains/:domain/cloudflare/status
```

Response:
```json
{
  "exists": true,
  "active": true,
  "nameservers": ["nash.ns.cloudflare.com", "olga.ns.cloudflare.com"],
  "sslStatus": "active"
}
```

**Status Meanings:**
- `exists: false` → Domain not added to Cloudflare yet
- `active: false` → Nameservers not updated yet (still propagating)
- `active: true` → Everything working! Domain should be live
- `sslStatus: "active"` → SSL certificate is live

## Testing

### 1. Test in Development

You can test the public website viewer locally by temporarily modifying `client/src/App.tsx`:

```typescript
// Temporarily set to true to test
const isCustomDomain = true; // Change from automatic detection
```

This will show the public website view instead of the dashboard.

### 2. Test After Publishing

1. Publish your app
2. Set up a test domain in Cloudflare
3. Visit the domain - you should see:
   - 🔒 HTTPS/SSL
   - The customer's website (not the platform dashboard)
   - No errors or warnings

## Troubleshooting

### "Cloudflare API credentials not configured"

**Cause:** Missing environment variables

**Fix:**
1. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to Secrets
2. Restart the deployment

### Domain shows "Website Not Found"

**Cause:** Domain not in database or wrong hostname

**Fix:**
1. Check database: Does website have `domain` field set?
2. Check exact domain spelling (no www prefix in database)
3. Verify domain ownership in code

### SSL certificate not working

**Cause:** Certificate still generating or nameservers not updated

**Fix:**
1. Wait 15 minutes - 24 hours for SSL generation
2. Verify nameservers point to Cloudflare:
   ```bash
   dig NS 2bitsofinsurance.com
   ```
3. Should show Cloudflare nameservers

### "Record already exists" error

**Cause:** Trying to recreate existing DNS records

**Fix:** This is now handled automatically! The code is idempotent and will update existing records instead of creating duplicates.

## Cost

**Cloudflare:**
- Free tier works perfectly for this use case
- Includes unlimited SSL certificates
- No cost per domain

**Your Platform:**
- No additional hosting costs
- One Replit deployment serves all customer domains
- Cloudflare proxies handle traffic routing

## Architecture Benefits

✅ **Scalability:** One app, unlimited customer domains  
✅ **SSL/HTTPS:** Automatic, free, and maintained by Cloudflare  
✅ **Professional:** Customers use their own domains  
✅ **Security:** Cloudflare DDoS protection included  
✅ **Performance:** Cloudflare CDN speeds up loading  
✅ **Simple:** Fully automated setup process  

## Next Steps

1. **Publish your Replit app** (if not already done)
2. **Set up Cloudflare account** and get API credentials
3. **Add secrets to Replit** deployment
4. **Test with a domain** to verify the flow works
5. **Update customer onboarding** to explain domain setup time (DNS propagation)

## Support

If you encounter issues:
1. Check Cloudflare dashboard for zone status
2. Verify API token has correct permissions
3. Check Replit logs for Cloudflare API errors
4. Ensure published deployment domain is correct
