#!/bin/bash

# FINAL FIX: Tell Caddy to use Railway's domain in the Host header

echo "🔧 FINAL FIX: Updating Caddy to use Railway's Host header"

ssh -o StrictHostKeyChecking=no root@134.199.194.110 << 'ENDSSH'

# Create new Caddyfile
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
    # CRITICAL: Use Railway's domain in Host header so Railway recognizes the request
    header_up Host chad-lp4a-v2-production.up.railway.app
    header_up X-Real-IP {remote_host}
    header_up X-Forwarded-For {remote_host}
    header_up X-Forwarded-Proto {scheme}
    header_up X-Forwarded-Host {host}
    
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
sudo systemctl reload caddy

echo "✅ Caddy updated!"
echo "Testing in 5 seconds..."
sleep 5

# Add domain to allowlist if not already there
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 999d8902beee7751ab204198cf331956a78ffa877b2f38ba3eee639d61edb2d5" \
  -d '{"domain":"evhinsurance.com"}' \
  http://localhost:3001/allowlist 2>&1 | head -3

echo ""
sleep 5

# Test
echo "Testing https://evhinsurance.com..."
curl -I https://evhinsurance.com 2>&1 | head -10

ENDSSH

echo ""
echo "🎉 DONE! Try https://evhinsurance.com in your browser now!"
