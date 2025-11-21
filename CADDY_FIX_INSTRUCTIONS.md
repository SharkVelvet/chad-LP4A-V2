# URGENT: Fix Caddy Proxy Routing for Custom Domains

## Problem
Your custom domains (like 867insurance.com) show "content cannot be displayed" because the Caddy server is trying to proxy to `localhost:5000` instead of your Replit app.

## Solution
Update the Caddyfile on your DigitalOcean server (134.199.194.110) to route traffic to the Replit app.

## Instructions

### Option 1: SSH and Update Manually (5 minutes)

1. **SSH into your DigitalOcean server:**
   ```bash
   ssh root@134.199.194.110
   ```

2. **Backup the current Caddyfile:**
   ```bash
   sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.backup
   ```

3. **Edit the Caddyfile:**
   ```bash
   sudo nano /etc/caddy/Caddyfile
   ```

4. **Replace the `reverse_proxy` line** (around line 20) from:
   ```
   reverse_proxy 127.0.0.1:5000 {
     header_up Host {host}
     header_up X-Real-IP {remote_host}
     header_up X-Forwarded-For {remote_host}
     header_up X-Forwarded-Proto {scheme}
   }
   ```
   
   **To this:**
   ```
   reverse_proxy https://landing-pages-for-agents-v-2-sharkvelvet.replit.app {
     header_up Host landing-pages-for-agents-v-2-sharkvelvet.replit.app
     header_up X-Forwarded-Host {host}
     header_up X-Forwarded-For {remote_host}
     header_up X-Forwarded-Proto {scheme}
   }
   ```

5. **Save and exit** (Ctrl+O, Enter, Ctrl+X in nano)

6. **Reload Caddy:**
   ```bash
   sudo systemctl reload caddy
   ```

7. **Verify Caddy is running:**
   ```bash
   sudo systemctl status caddy
   ```

### Option 2: Copy Complete File (Easier)

1. **SSH into your DigitalOcean server:**
   ```bash
   ssh root@134.199.194.110
   ```

2. **Backup and replace:**
   ```bash
   sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.backup
   ```

3. **Copy the fixed Caddyfile** from `scripts/caddy-proxy/Caddyfile.fixed` in this Replit to `/etc/caddy/Caddyfile` on the server

4. **Reload Caddy:**
   ```bash
   sudo systemctl reload caddy
   ```

## Verification

After updating, test your domain:

1. **Wait 2-5 minutes** for DNS to fully propagate
2. **Visit:** https://867insurance.com
3. **Expected result:** Your Replit app should load with SSL certificate

## What Changed?

- **Before:** Caddy → localhost:5000 (nothing listening) → ❌
- **After:** Caddy → Replit App URL → ✅

The key changes:
1. Backend URL: `https://landing-pages-for-agents-v-2-sharkvelvet.replit.app`
2. Host header rewrite: Tells Replit which app to route to
3. X-Forwarded-Host: Preserves original custom domain for your app logic

## Current Status

✅ DNS records created (867insurance.com → 134.199.194.110)
✅ Domain added to Caddy allowlist
✅ SSL certificates will auto-issue via Let's Encrypt
❌ **BLOCKING:** Caddyfile needs this update to route traffic properly

Once you make this change, all custom domains will work immediately!
