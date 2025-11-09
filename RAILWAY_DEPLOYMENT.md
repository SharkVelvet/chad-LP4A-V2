# Railway Deployment Guide

## Why Railway?

Railway was chosen over Vercel because:
- ✅ Supports traditional Node.js servers with persistent sessions
- ✅ Unlimited custom domains via API
- ✅ $5/month (vs Vercel's $20/month)
- ✅ No code refactoring required
- ✅ Perfect for Express + PostgreSQL apps

## Prerequisites

- GitHub repository with your code (already done: chad-LP4A-V2)
- Railway account (free to create)
- Credit card (for Hobby plan: $5/month)

## Step-by-Step Deployment

### 1. Create Railway Account

1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub account

### 2. Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository: **chad-LP4A-V2**
4. Railway will automatically detect it's a Node.js project

### 3. Add PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will create a PostgreSQL database
4. Copy the `DATABASE_URL` from the database settings (it includes connection pooling by default)

### 4. Configure Environment Variables

Go to your web service → Variables tab and add:

```
DATABASE_URL=[Use the Railway PostgreSQL connection string]
SESSION_SECRET=[any random string, e.g., railway-session-secret-2025]
STRIPE_SECRET_KEY=[your stripe secret key]
VITE_STRIPE_PUBLIC_KEY=[your stripe public key]
NAMECHEAP_API_KEY=[your key]
NAMECHEAP_API_USER=[your user]
NAMECHEAP_USERNAME=[your username]
NAMECHEAP_CLIENT_IP=[your IP]
CLOUDFLARE_API_TOKEN=[your token]
CLOUDFLARE_ACCOUNT_ID=[your account ID]
NAMECHEAP_PROXY_URL=[your proxy URL if using]
PORT=5000
NODE_ENV=production
```

### 5. Deploy

1. Railway will automatically deploy on first push
2. Wait for deployment to complete (2-3 minutes)
3. Click on the deployment URL to test

### 6. Custom Domain Setup (via Railway UI)

For your main platform domain:
1. Go to Settings → Domains
2. Click "Generate Domain" for a free railway.app subdomain
3. Or add your custom domain and configure DNS

### 7. Custom Domain API (for customer domains)

Railway supports adding custom domains programmatically via their API:

```typescript
// Example: Add customer domain to Railway
const response = await fetch('https://backboard.railway.app/graphql/v2', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RAILWAY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      mutation customDomainCreate($input: CustomDomainCreateInput!) {
        customDomainCreate(input: $input) {
          id
          domain
        }
      }
    `,
    variables: {
      input: {
        serviceId: 'your-service-id',
        domain: 'customer-domain.com'
      }
    }
  })
});
```

**Get your Railway API Token:**
1. Go to Account Settings → Tokens
2. Create a new token
3. Add it to your environment variables as `RAILWAY_API_TOKEN`

## Testing Deployment

1. Visit your Railway deployment URL
2. Test login functionality
3. Test template browsing
4. Verify database connections work

## Cost

**Railway Hobby Plan: $5/month**
- Includes $5 usage credit
- Pay extra only if you exceed usage
- Unlimited custom domains
- Always-on instances

## Monitoring

- View logs: Project → Deployments → Click deployment → Logs
- View metrics: Project → Metrics tab
- Set up alerts: Project → Settings → Notifications

## Rollback

If deployment fails:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Redeploy"

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Status Page: https://status.railway.app

## Migration from Vercel

The code is already compatible with Railway - no changes needed! The same codebase that didn't work on Vercel will work perfectly on Railway because Railway supports traditional Node.js servers.
