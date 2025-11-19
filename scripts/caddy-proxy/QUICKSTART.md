# Caddy Proxy - Quick Setup Guide

## 🚀 5-Minute Setup

### Step 1: Generate Auth Token
```bash
# On your local machine or the droplet
openssl rand -hex 32
```
Copy the output - this is your `CADDY_PROXY_AUTH_TOKEN`

### Step 2: SSH to Droplet
```bash
ssh root@134.199.194.110
```

### Step 3: Quick Install
```bash
# Create directory
mkdir -p /opt/caddy-proxy
cd /opt/caddy-proxy

# Download files (from this repo)
# You can use scp, git clone, or paste the files manually

# Create package.json
cat > package.json << 'EOF'
{
  "name": "caddy-proxy",
  "version": "1.0.0",
  "description": "Proxy server for remote Caddy Admin API management",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0"
  }
}
EOF

# Create server.js (copy from scripts/caddy-proxy/server.js in this repo)
# OR download it:
# wget https://raw.githubusercontent.com/YOUR_REPO/main/scripts/caddy-proxy/server.js

# Install dependencies
npm install

# Set environment variable
export CADDY_PROXY_AUTH_TOKEN="paste-your-token-from-step-1"

# Test it works
node server.js
# You should see: 🚀 Caddy Proxy Server running on port 3001
# Press Ctrl+C to stop
```

### Step 4: Start with PM2
```bash
# Install PM2 if not already installed
npm install -g pm2

# Start the service
CADDY_PROXY_AUTH_TOKEN="your-token-here" pm2 start server.js --name caddy-proxy

# Save PM2 config
pm2 save

# Enable auto-start on boot
pm2 startup
# Follow the command it outputs
```

### Step 5: Configure Firewall
```bash
# Allow port 3001
ufw allow 3001/tcp

# Verify
ufw status
```

### Step 6: Test from Replit
```bash
# Back on your local machine / Replit shell
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"domain":"test.com"}' \
  http://134.199.194.110:3001/allowlist

# Expected response:
# {"success":true,"domain":"test.com","message":"Domain added to Caddy allowlist"}
```

### Step 7: Add Secrets to Replit
1. In Replit, go to **Tools → Secrets**
2. Add two secrets:
   - `CADDY_PROXY_URL` = `http://134.199.194.110:3001`
   - `CADDY_PROXY_AUTH_TOKEN` = `your-token-from-step-1`

### Step 8: Test End-to-End
1. In your Replit app, register a new domain
2. Watch the logs - you should see: `✅ domain.com added to Caddy allowlist successfully`
3. Wait 1-2 minutes for SSL to provision
4. Test: `curl https://domain.com`

## 🔧 Troubleshooting

### Check if proxy is running
```bash
pm2 status
pm2 logs caddy-proxy
```

### Test health endpoint
```bash
curl http://localhost:3001/health
# Should return: {"status":"ok","service":"caddy-proxy"}
```

### Check Caddy Admin API
```bash
curl http://localhost:2019/config/
# Should return Caddy configuration JSON
```

### View logs
```bash
pm2 logs caddy-proxy --lines 100
```

### Restart service
```bash
pm2 restart caddy-proxy
```

## 📝 Notes

- The proxy runs on port **3001**
- Caddy Admin API is on port **2019** (localhost only)
- The auth token should be kept secret
- PM2 will auto-restart the service if it crashes
- Logs are stored in `~/.pm2/logs/`
