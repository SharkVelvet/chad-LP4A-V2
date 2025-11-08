# Namecheap Proxy Solution for Static IP

## The Problem

Namecheap requires IP whitelisting for API access. Replit uses **dynamic IPs** that change frequently, breaking your domain registration features whenever the IP changes.

## The Solution

Deploy a lightweight Node.js proxy on **DigitalOcean** ($4/month) which provides a **static IP address** that never changes.

```
Your Replit App → DigitalOcean Proxy (Static IP) → Namecheap API
```

## What's Included

### Proxy Server Files
- `server.js` - Simple Express server that forwards requests (30 lines)
- `package.json` - Dependencies (Express, CORS, Axios)
- `ecosystem.config.cjs` - PM2 process manager config
- `.env.example` - Environment variables template

### Documentation
- `DEPLOYMENT.md` - Complete step-by-step deployment guide

## Quick Start

### 1. Deploy to DigitalOcean (15 minutes)

Follow the complete instructions in `DEPLOYMENT.md`:
1. Create a $4/month droplet
2. Install Node.js and PM2
3. Upload these files
4. Start the proxy
5. Get your static IP

### 2. Configure Namecheap

Whitelist your DigitalOcean static IP in Namecheap:
- Go to Namecheap → Profile → Tools → API Access
- Replace the old Replit IP with your DigitalOcean IP
- Save

### 3. Configure Replit

Add ONE environment variable to your Replit project:
```
NAMECHEAP_PROXY_URL=http://YOUR_DROPLET_IP:3000
```

**That's it!** Your app will automatically use the proxy.

## How It Works

### Without Proxy (Current - Broken)
```
Replit (IP: 34.148.226.28) → Namecheap API ❌
        ↓ IP changes
Replit (IP: 35.123.45.67) → Namecheap API ❌ (not whitelisted)
```

### With Proxy (Solution)
```
Replit (any IP) → DigitalOcean (IP: 143.198.123.45) → Namecheap API ✅
     ↓ IP changes
Replit (new IP) → DigitalOcean (IP: 143.198.123.45) → Namecheap API ✅
```

The DigitalOcean IP **never changes**, so Namecheap whitelist stays valid forever.

## Cost

- **DigitalOcean Droplet**: $4/month
- **Data Transfer**: FREE (1TB included)
- **Total**: **$4/month** for unlimited requests

## Security Features

✅ **CORS Protection** - Only your Replit app can use the proxy  
✅ **Firewall** - Only ports 22 (SSH) and 3000 (proxy) open  
✅ **No Secret Storage** - API keys stay in Replit (never on proxy)  
✅ **Request Validation** - Malformed requests rejected  

## Monitoring

Check proxy health anytime:
```bash
curl http://YOUR_DROPLET_IP:3000/health
```

View logs:
```bash
ssh root@YOUR_DROPLET_IP
pm2 logs namecheap-proxy
```

## Maintenance

The proxy requires **zero maintenance**:
- PM2 auto-restarts if it crashes
- No updates needed (stable dependencies)
- Set it and forget it

## Need Help?

1. Read `DEPLOYMENT.md` for step-by-step instructions
2. Test the proxy: `curl http://YOUR_IP:3000/health`
3. Check logs: `pm2 logs namecheap-proxy`

---

**Questions?** The deployment guide covers everything from droplet creation to testing.
