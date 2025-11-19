#!/bin/bash

# EMERGENCY FIX: Point Caddy to Railway app

echo "🚨 FIXING CADDY CONFIGURATION"
echo "Problem: Caddy proxies to localhost:5000 but app is on Railway"
echo "Solution: Update Caddy to proxy to Railway"

ssh -o StrictHostKeyChecking=no root@134.199.194.110 << 'ENDSSH'

# Backup current config
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.backup-$(date +%s)

# Create new Caddyfile that proxies to Railway
sudo tee /etc/caddy/Caddyfile > /dev/null << 'ENDOFFILE'
{
  email chadlanding@gmail.com
  
  on_demand_tls {
    ask http://127.0.0.1:3001/allowlist-check
  }
}

# Catch-all HTTPS - proxy to Railway app
:443 {
  tls {
    on_demand
  }
  
  reverse_proxy https://chad-lp4a-v2-production.up.railway.app {
    header_up Host {host}
    header_up X-Real-IP {remote_host}
    header_up X-Forwarded-For {remote_host}
    header_up X-Forwarded-Proto {scheme}
    
    transport http {
      tls
      tls_server_name chad-lp4a-v2-production.up.railway.app
    }
  }
}

# HTTP redirect
:80 {
  redir https://{host}{uri} permanent
}
ENDOFFILE

# Reload Caddy
echo "Reloading Caddy..."
sudo systemctl reload caddy

# Check status
sudo systemctl status caddy --no-pager

echo "✅ Caddy now proxies to Railway!"
echo "Testing..."

# Add domain to allowlist
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 999d8902beee7751ab204198cf331956a78ffa877b2f38ba3eee639d61edb2d5" \
  -d '{"domain":"evhinsurance.com"}' \
  http://localhost:3001/allowlist

echo ""
echo "Waiting 10 seconds for SSL..."
sleep 10

# Test
curl -I https://evhinsurance.com 2>&1 | head -5

ENDSSH

echo ""
echo "🎉 DONE! Visit https://evhinsurance.com in your browser"
