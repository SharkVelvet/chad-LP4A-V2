# Deploy App to Droplet

## The Problem We're Solving

Your DNS points to the DigitalOcean droplet (134.199.194.110), but the app is running on Replit.

When users visit your custom domains:
1. DNS → Droplet ✅
2. Caddy tries to proxy to `localhost:5000` ❌
3. **No app running on droplet** ❌

**Solution:** Deploy the app TO the droplet.

---

## Quick Deploy (5 Minutes)

### Step 1: Copy Environment Variables to Droplet

```bash
# SSH to droplet
ssh root@134.199.194.110

# Create .env file
nano /opt/.env
```

Paste these environment variables:
```
DATABASE_URL=<your_database_url>
SESSION_SECRET=<your_session_secret>
NAMECHEAP_API_KEY=<value>
NAMECHEAP_API_USER=<value>
NAMECHEAP_USERNAME=<value>
NAMECHEAP_CLIENT_IP=<value>
STRIPE_SECRET_KEY=<value>
VITE_STRIPE_PUBLIC_KEY=<value>
AWS_ACCESS_KEY_ID=<value>
AWS_SECRET_ACCESS_KEY=<value>
CLOUDFLARE_ZONE_ID=<value>
CLOUDFLARE_WORKERS_API_TOKEN=<value>
RAILWAY_API_TOKEN=<value>
RAILWAY_PROJECT_ID=<value>
RAILWAY_SERVICE_ID=<value>
RAILWAY_ENVIRONMENT_ID=<value>
CADDY_PROXY_URL=http://localhost:3001
CADDY_PROXY_AUTH_TOKEN=999d8902beee7751ab204198cf331956a78ffa877b2f38ba3eee639d61edb2d5
NODE_ENV=production
PORT=5000
```

Save (Ctrl+X, Y, Enter)

### Step 2: Install Node.js on Droplet

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Verify
node --version  # Should show v20.x.x
npm --version
```

### Step 3: Deploy App

On Replit, run:
```bash
bash scripts/deploy-to-droplet.sh
```

This will:
1. Build the app
2. Upload it to the droplet
3. Start it with PM2
4. Make it available on port 5000

### Step 4: Verify

On the droplet:
```bash
# Check app is running
pm2 list

# Test locally
curl http://localhost:5000

# Test SSL
curl -I https://evhinsurance.com
```

You should see: `HTTP/2 200` ✅

---

## Manual Deploy (if script doesn't work)

```bash
# On Replit: Build the app
npm run build

# On droplet: Clone repo or copy files
cd /opt
git clone <your-repo> app
cd app

# Install dependencies
npm install --production

# Start with PM2
pm2 start dist/index.js --name app -i 1 --env production --update-env
pm2 save

# Verify
curl http://localhost:5000
```

---

## Troubleshooting

### App won't start
```bash
# Check logs
pm2 logs app

# Check if port 5000 is in use
lsof -i :5000
```

### Still no website
```bash
# Test the flow
curl http://localhost:5000              # Should return HTML
curl -I https://evhinsurance.com         # Should return HTTP/2 200

# Check Caddy
sudo systemctl status caddy
sudo journalctl -u caddy -n 50
```

### Database connection issues
```bash
# Verify DATABASE_URL is set
pm2 env app | grep DATABASE_URL
```

---

## After Deployment

Your architecture will be:
```
User → DNS (evhinsurance.com) → Droplet (134.199.194.110) →
Caddy (on-demand SSL) → App (localhost:5000) → Database
```

Every new domain will work automatically!
