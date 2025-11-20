# Landing Pages Proxy Service

Universal reverse proxy for routing custom domains to the Replit deployment.

## Deployment to Railway

1. **Create New Project in Railway:**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or "Empty Project")

2. **Deploy this directory:**
   - If using GitHub: Connect this repo and select the `railway-proxy` directory
   - If using CLI: `cd railway-proxy && railway up`

3. **Add Custom Domain in Railway:**
   - Go to your service settings
   - Click "Networking" → "Add Domain"
   - Add a wildcard domain or generate Railway domain
   - Railway will provide a URL (e.g., `landing-pages-proxy-production.up.railway.app`)

4. **Update DNS Records:**
   - Point all custom domains (CNAME) to the Railway deployment URL
   - The proxy automatically handles all domains

## How It Works

- Accepts requests from ANY custom domain
- Rewrites `Host` header to `landing-pages-for-agents-v-2-sharkvelvet.replit.app`
- Forwards request to Replit deployment
- Preserves original hostname in `X-Forwarded-Host` header
- Supports HTTP and WebSocket connections

## Environment Variables

- `PORT`: Server port (default: 3000, Railway sets this automatically)

## Cost

On Railway Pro plan ($20/month):
- Includes $20 usage credit
- Proxy uses minimal resources (~$2-5/month for moderate traffic)
- No per-domain fees
