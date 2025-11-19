#!/bin/bash
# Script to check Caddy configuration for on-demand TLS
# Run this on the DigitalOcean droplet to verify setup

CADDY_ADMIN_API="http://localhost:2019"

echo "🔍 Checking Caddy Configuration..."
echo ""

# Check if Caddy is running
if systemctl is-active --quiet caddy; then
  echo "✅ Caddy is running"
else
  echo "❌ Caddy is NOT running"
  echo "   Start it with: systemctl start caddy"
  exit 1
fi

echo ""
echo "📋 Caddyfile location:"
echo "/etc/caddy/Caddyfile"
echo ""

# Show current Caddyfile
echo "📄 Current Caddyfile:"
echo "===================="
cat /etc/caddy/Caddyfile
echo "===================="
echo ""

# Check Admin API
echo "🔌 Checking Caddy Admin API..."
HEALTH=$(curl -s "${CADDY_ADMIN_API}/config/" 2>&1)

if [ $? -eq 0 ]; then
  echo "✅ Caddy Admin API is accessible"
else
  echo "❌ Caddy Admin API is NOT accessible"
  echo "   Make sure Caddy is running and Admin API is enabled"
  exit 1
fi

echo ""
echo "🔐 Current On-Demand TLS Configuration:"
echo "======================================="
curl -s "${CADDY_ADMIN_API}/config/apps/tls/automation/on_demand" | jq '.' 2>/dev/null || echo "No on-demand TLS config found (or jq not installed)"
echo "======================================="
echo ""

echo "🌐 Currently allowed domains:"
echo "============================="
curl -s "${CADDY_ADMIN_API}/config/apps/tls/automation/on_demand/allowed" | jq -r '.[]' 2>/dev/null || echo "No allowed domains configured (or jq not installed)"
echo "============================="
echo ""

echo "📊 Recent Caddy logs (last 30 lines):"
echo "======================================"
journalctl -u caddy -n 30 --no-pager
echo "======================================"
