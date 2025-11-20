# Deploy Railway Proxy Service

## Quick Deploy to Railway

### Option 1: Using Railway CLI (Fastest)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Navigate to proxy directory
cd railway-proxy

# Initialize and deploy
railway init
railway up

# Get the deployment URL
railway domain
```

### Option 2: Using Railway Dashboard

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Create New Project** → **Empty Project**
3. **Add Service** → **GitHub Repo** (or **Empty Service**)
4. **If using Empty Service:**
   - Click on the service
   - Settings → **Source** → **Connect Repo**
   - Select this repository
   - Set **Root Directory**: `railway-proxy`
5. **Settings → Networking:**
   - Click **Generate Domain**
   - Copy the generated URL (e.g., `landing-pages-proxy-production.up.railway.app`)
6. **Save the Railway Proxy URL** - you'll need this for DNS configuration

## After Deployment

Once deployed, Railway will give you a URL like:
`https://landing-pages-proxy-production-abc123.up.railway.app`

**Save this URL** - you'll configure it as an environment variable in your main Replit app.

## Environment Variables in Replit

Add this secret in Replit:
```
RAILWAY_PROXY_URL=landing-pages-proxy-production-abc123.up.railway.app
```

(Without `https://`, just the hostname)

## How It Works

```
Custom Domain (r2d2insurance.com)
          ↓ (DNS CNAME)
Railway Proxy (landing-pages-proxy.up.railway.app)
          ↓ (Host header rewrite)
Replit App (landing-pages-for-agents-v-2-sharkvelvet.replit.app)
```

The proxy automatically:
- Accepts ALL custom domains
- Rewrites Host header to Replit URL
- Forwards traffic seamlessly
- Handles SSL/TLS certificates
