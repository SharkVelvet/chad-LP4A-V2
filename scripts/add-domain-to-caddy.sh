#!/bin/bash
# Script to manually add a domain to Caddy's on-demand TLS allowlist
# Run this on the DigitalOcean droplet (134.199.194.110)

DOMAIN="123456insurance.com"
CADDY_ADMIN_API="http://localhost:2019"

echo "🔧 Adding $DOMAIN to Caddy's on-demand TLS allowlist..."

# Get current Caddy config
echo "📋 Fetching current Caddy configuration..."
CURRENT_CONFIG=$(curl -s "${CADDY_ADMIN_API}/config/apps/tls/automation/on_demand")

if [ -z "$CURRENT_CONFIG" ]; then
  echo "❌ Failed to fetch Caddy configuration. Is Caddy running?"
  exit 1
fi

echo "Current on-demand TLS config: $CURRENT_CONFIG"

# Add domain to the ask endpoint's allowed list
# Method 1: Using PATCH to update the allowed array
echo ""
echo "📝 Adding $DOMAIN and www.$DOMAIN to allowed domains..."

# Create JSON array with both apex and www
DOMAINS_JSON='["'$DOMAIN'","www.'$DOMAIN'"]'

# Use PATCH to add to the allowed list
curl -X PATCH \
  -H "Content-Type: application/json" \
  -d "{\"apps\":{\"tls\":{\"automation\":{\"on_demand\":{\"allowed\":$DOMAINS_JSON}}}}}" \
  "${CADDY_ADMIN_API}/config/"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully added $DOMAIN to Caddy allowlist!"
  echo ""
  echo "🔄 Testing SSL provisioning..."
  echo "   Wait 10 seconds then try: curl -I https://$DOMAIN"
  echo ""
  echo "💡 If it still doesn't work, try accessing the domain in a browser"
  echo "   Caddy will provision the certificate on the first HTTPS request"
else
  echo ""
  echo "❌ Failed to update Caddy configuration"
  echo ""
  echo "🔍 Troubleshooting:"
  echo "   1. Check if Caddy is running: systemctl status caddy"
  echo "   2. Check Caddy logs: journalctl -u caddy -n 50"
  echo "   3. Verify Caddyfile has on_demand_tls enabled"
fi
