# 🚀 FINAL DEPLOYMENT - On-Demand TLS Setup

This is the **final configuration** that will enable full automation for 500+ domains.

---

## Step 1: Update Caddy Proxy (2 minutes)

On the droplet:

```bash
cd /opt/caddy-proxy

# Stop the current proxy
pm2 stop caddy-proxy

# Backup old file
cp server.js server.js.backup

# Copy the new proxy code
# (Upload server-final.js from Replit as server.js)
```

**Option A: Manual paste**
```bash
nano server.js
# Delete everything, paste the content from server-final.js, save
```

**Option B: Use the full script I'll provide below**

---

## Step 2: Update Caddyfile (2 minutes)

```bash
# Backup current Caddyfile
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.backup

# Edit Caddyfile
sudo nano /etc/caddy/Caddyfile
```

**Replace ENTIRE contents with:**

```
{
  email chadlanding@gmail.com
  
  # On-demand TLS configuration
  # Caddy will check the proxy before issuing certificates
  on_demand_tls {
    ask http://localhost:3001/allowlist-check
    interval 2m
    burst 5
  }
}

# Catch-all HTTPS server block
# Accepts any domain and uses on-demand TLS
:443 {
  tls {
    on_demand
  }
  
  reverse_proxy 127.0.0.1:5000 {
    header_up Host {host}
    header_up X-Real-IP {remote_host}
    header_up X-Forwarded-For {remote_host}
    header_up X-Forwarded-Proto {scheme}
  }
}

# HTTP redirect to HTTPS
:80 {
  redir https://{host}{uri} permanent
}
```

Save and exit (Ctrl+X, Y, Enter)

---

## Step 3: Reload Caddy (30 seconds)

```bash
# Reload Caddy with new configuration
sudo systemctl reload caddy

# Check Caddy status
sudo systemctl status caddy

# Should show: active (running)
```

---

## Step 4: Restart Proxy (30 seconds)

```bash
cd /opt/caddy-proxy

# Restart with auth token
CADDY_PROXY_AUTH_TOKEN="999d8902beee7751ab204198cf331956a78ffa877b2f38ba3eee639d61edb2d5" pm2 restart caddy-proxy

# Check logs
pm2 logs caddy-proxy --lines 10
```

You should see:
```
🚀 Caddy Proxy Server (On-Demand TLS) running on port 3001
   Auth token: 999d8902...
   Endpoints:
     - GET  /health              (public)
     - GET  /allowlist-check     (Caddy calls this)
     - POST /allowlist           (authenticated - Replit adds domains)
```

---

## Step 5: Test It! (2 minutes)

### Test 1: Add insurance-999.com to allowlist
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 999d8902beee7751ab204198cf331956a78ffa877b2f38ba3eee639d61edb2d5" \
  -d '{"domain":"insurance-999.com"}' \
  http://localhost:3001/allowlist
```

Expected: `{"success":true,"domain":"insurance-999.com",...}`

### Test 2: Verify allowlist check works
```bash
curl http://localhost:3001/allowlist-check?domain=insurance-999.com
```

Expected: `OK` (with HTTP 200)

### Test 3: Wait 30 seconds, then test HTTPS
```bash
sleep 30
curl -I https://insurance-999.com
```

Expected: `HTTP/2 200` or `HTTP/2 301` (NOT SSL error!)

---

## 🎉 Success Criteria

After deployment, you should be able to:

1. ✅ Register a domain in Replit
2. ✅ Replit calls proxy to add domain to allowlist
3. ✅ Visit domain in browser (HTTP redirects to HTTPS)
4. ✅ Caddy asks proxy "is this domain allowed?"
5. ✅ Proxy says "yes"
6. ✅ Caddy issues SSL certificate from Let's Encrypt
7. ✅ Domain loads with HTTPS! 🎉

**Zero manual steps. Fully automated. 500+ domains.**

---

## Rollback (if needed)

```bash
# Restore old Caddyfile
sudo cp /etc/caddy/Caddyfile.backup /etc/caddy/Caddyfile
sudo systemctl reload caddy

# Restore old proxy
cd /opt/caddy-proxy
cp server.js.backup server.js
pm2 restart caddy-proxy
```
