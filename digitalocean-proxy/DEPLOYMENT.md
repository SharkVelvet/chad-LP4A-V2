# Deploy Namecheap Proxy to DigitalOcean

This proxy server runs on your DigitalOcean droplet with a **static IP address** that you can whitelist in Namecheap.

## Step 1: Create DigitalOcean Droplet

1. Log into DigitalOcean
2. Click **"Create Droplet"**
3. Choose:
   - **Image**: Ubuntu 22.04 (LTS) x64
   - **Plan**: Basic - $4/month (512MB RAM, 1 CPU)
   - **Datacenter**: Any region (choose closest to your users)
   - **Authentication**: SSH keys (recommended) or password
4. Click **"Create Droplet"**
5. **SAVE YOUR STATIC IP** (e.g., `143.198.123.45`)

## Step 2: SSH Into Your Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

## Step 3: Install Node.js

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v   # Should show 10.x.x
```

## Step 4: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

## Step 5: Upload Proxy Files

**Option A: Using SCP (from your local machine)**

```bash
# From your local machine (in the digitalocean-proxy folder)
scp -r * root@YOUR_DROPLET_IP:/root/namecheap-proxy/
```

**Option B: Manual Upload**

1. On the droplet, create directory:
   ```bash
   mkdir -p /root/namecheap-proxy
   cd /root/namecheap-proxy
   ```

2. Create files manually:
   ```bash
   # Create package.json
   nano package.json
   # Paste the contents from digitalocean-proxy/package.json
   # Press Ctrl+X, then Y, then Enter to save

   # Create server.js
   nano server.js
   # Paste the contents from digitalocean-proxy/server.js
   # Save with Ctrl+X, Y, Enter

   # Create .env file
   nano .env
   # Add this line (replace with your Replit app URL):
   ALLOWED_ORIGIN=https://your-app.replit.app
   # Save with Ctrl+X, Y, Enter
   ```

## Step 6: Install Dependencies

```bash
cd /root/namecheap-proxy
npm install
```

## Step 7: Start the Proxy with PM2

```bash
pm2 start server.js --name namecheap-proxy
pm2 save
pm2 startup
```

## Step 8: Configure Firewall

```bash
# Allow SSH (port 22)
ufw allow 22/tcp

# Allow proxy port (port 3000)
ufw allow 3000/tcp

# Enable firewall
ufw --force enable

# Check status
ufw status
```

## Step 9: Test the Proxy

```bash
# Test health check endpoint
curl http://localhost:3000/health

# Should return: {"status":"ok","timestamp":"..."}
```

From your local machine:
```bash
curl http://YOUR_DROPLET_IP:3000/health
```

## Step 10: Whitelist Your Static IP in Namecheap

1. Log into Namecheap
2. Go to **Profile → Tools → API Access**
3. **Replace** the old Replit IP with your DigitalOcean IP: `YOUR_DROPLET_IP`
4. Save changes

## Step 11: Update Your Replit App

Add this environment variable to your Replit project:

```
NAMECHEAP_PROXY_URL=http://YOUR_DROPLET_IP:3000
```

Your Replit app will automatically use the proxy!

---

## Maintenance Commands

### View Logs
```bash
pm2 logs namecheap-proxy
```

### Restart Proxy
```bash
pm2 restart namecheap-proxy
```

### Stop Proxy
```bash
pm2 stop namecheap-proxy
```

### Check Status
```bash
pm2 status
```

### Update Proxy Code
```bash
cd /root/namecheap-proxy
# Upload new files via SCP or edit manually
pm2 restart namecheap-proxy
```

---

## Security Notes

1. **CORS Protection**: The proxy only accepts requests from your Replit app (configured in `.env`)
2. **Firewall**: Only ports 22 (SSH) and 3000 (proxy) are open
3. **No API Keys**: Your Namecheap API keys stay in Replit (never stored on the proxy)

---

## Troubleshooting

### Proxy not responding
```bash
pm2 status  # Check if running
pm2 logs namecheap-proxy  # View error logs
```

### Test proxy locally
```bash
curl http://localhost:3000/health
```

### Restart everything
```bash
pm2 restart namecheap-proxy
```

---

## Cost

- **DigitalOcean Droplet**: $4/month (smallest size)
- **Data Transfer**: Included (1TB/month)
- **Total**: ~$4/month for unlimited static IP

---

## What This Solves

✅ **Static IP** - Never changes, whitelist once in Namecheap  
✅ **Cheap** - $4/month DigitalOcean droplet  
✅ **Simple** - 30 lines of code, easy to maintain  
✅ **Secure** - CORS protection, firewall configured  
✅ **Reliable** - PM2 auto-restarts if it crashes
