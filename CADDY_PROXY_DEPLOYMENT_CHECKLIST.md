# 🚀 Caddy Proxy Deployment - Simple Checklist

## What You Need to Do on Your Droplet

This will take **5-10 minutes** and then your full automation will be working.

---

## ✅ Step 1: Generate Auth Token (30 seconds)
On your local machine or droplet:
```bash
openssl rand -hex 32
```
**Copy this token** - you'll need it in steps 3 and 5.

---

## ✅ Step 2: SSH into Droplet (10 seconds)
```bash
ssh root@134.199.194.110
```

---

## ✅ Step 3: Copy Files to Droplet (2 minutes)

### Option A: Manual Copy (easiest)
```bash
# On droplet, create directory
mkdir -p /opt/caddy-proxy
cd /opt/caddy-proxy

# Create package.json
cat > package.json << 'EOF'
{
  "name": "caddy-proxy",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0"
  }
}
EOF
```

Then copy the `server.js` file from `scripts/caddy-proxy/server.js` in this Replit.
You can:
- Copy/paste the file content
- Use `scp` from your local machine
- Or download from your repo if it's on GitHub

---

## ✅ Step 4: Install and Start (2 minutes)
```bash
cd /opt/caddy-proxy

# Install dependencies
npm install

# Install PM2 if needed
npm install -g pm2

# Start the service (replace YOUR_TOKEN with your token from Step 1)
CADDY_PROXY_AUTH_TOKEN="YOUR_TOKEN_HERE" pm2 start server.js --name caddy-proxy

# Save PM2 config
pm2 save

# Enable auto-start on boot
pm2 startup
# Copy/run the command it outputs

# Open firewall
ufw allow 3001/tcp
```

---

## ✅ Step 5: Configure Replit (1 minute)

In your Replit project:

1. Go to **Tools → Secrets** (or the lock icon in the sidebar)
2. Add these two secrets:

**Secret 1:**
- Name: `CADDY_PROXY_URL`
- Value: `http://134.199.194.110:3001`

**Secret 2:**
- Name: `CADDY_PROXY_AUTH_TOKEN`
- Value: `[paste your token from Step 1]`

---

## ✅ Step 6: Test It! (2 minutes)

### Test 1: Health Check
From your local machine or Replit shell:
```bash
curl http://134.199.194.110:3001/health
```
Expected: `{"status":"ok","service":"caddy-proxy"}`

### Test 2: Register a Domain
1. Go to your Replit app
2. Register a test domain (any cheap .com)
3. Watch the logs in Replit
4. You should see: `✅ domain.com added to Caddy allowlist successfully`
5. Wait 1-2 minutes
6. Test: `curl https://yourdomain.com` - should work with SSL! 🎉

---

## 📊 Verification

After deployment, verify:
- [ ] PM2 shows caddy-proxy running: `pm2 status`
- [ ] Health check works: `curl http://134.199.194.110:3001/health`
- [ ] Replit has both secrets configured
- [ ] Test domain registration shows success in logs
- [ ] SSL works on the test domain

---

## 🔧 If Something Goes Wrong

### Check proxy logs:
```bash
pm2 logs caddy-proxy --lines 50
```

### Check if Caddy is running:
```bash
systemctl status caddy
curl http://localhost:2019/config/
```

### Restart the proxy:
```bash
pm2 restart caddy-proxy
```

---

## 🎯 What This Fixes

**Before:** Domains registered successfully, DNS configured ✅, but SSL failed ❌

**After:** Full end-to-end automation:
1. Domain registered via Namecheap ✅
2. DNS auto-configured to droplet ✅
3. Caddy allowlist auto-updated ✅
4. SSL certificate auto-issued ✅
5. **Zero manual steps for 500+ domains!** 🚀

---

## Files Reference

All files are in `scripts/caddy-proxy/`:
- `server.js` - The proxy server (copy this to droplet)
- `package.json` - Dependencies
- `QUICKSTART.md` - Detailed step-by-step guide
- `DEPLOYMENT.md` - Full deployment documentation
- `README.md` - Technical reference

---

**Next:** Follow the steps above and let me know when you're ready to test!
