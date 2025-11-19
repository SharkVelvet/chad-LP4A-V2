# Caddy Proxy Deployment Guide

This proxy enables remote management of Caddy's on-demand TLS allowlist from your Replit application.

## Prerequisites

- DigitalOcean droplet with Caddy installed and running
- Node.js installed on the droplet
- PM2 process manager installed (`npm install -g pm2`)
- SSH access to the droplet

## Installation Steps

### 1. Upload Files to Droplet

```bash
# SSH into your droplet
ssh root@134.199.194.110

# Create directory
mkdir -p /opt/caddy-proxy
cd /opt/caddy-proxy

# Copy the files (use scp or git)
# Option A: Using scp from your local machine
# scp -r scripts/caddy-proxy/* root@134.199.194.110:/opt/caddy-proxy/

# Option B: Create files manually on the droplet
```

### 2. Install Dependencies

```bash
cd /opt/caddy-proxy
npm install
```

### 3. Generate Secure Auth Token

```bash
# Generate a random secure token
openssl rand -hex 32
# Example output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### 4. Configure Environment

```bash
# Create .env file
cat > /opt/caddy-proxy/.env << 'EOF'
PORT=3001
CADDY_PROXY_AUTH_TOKEN=YOUR_SECURE_TOKEN_HERE
NODE_ENV=production
EOF

# Replace YOUR_SECURE_TOKEN_HERE with the token from step 3
nano /opt/caddy-proxy/.env
```

### 5. Configure Firewall

```bash
# Allow port 3001 (Caddy proxy)
ufw allow 3001/tcp

# Verify firewall status
ufw status
```

### 6. Start with PM2

```bash
cd /opt/caddy-proxy

# Start the service
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Enable PM2 to start on system boot
pm2 startup
# Follow the command it outputs (usually involves running a sudo command)
```

### 7. Verify Installation

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs caddy-proxy

# Test health endpoint
curl http://localhost:3001/health

# Test from external (replace with your actual token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"domain":"test.com"}' \
  http://134.199.194.110:3001/allowlist
```

## Configure Replit

Add these secrets to your Replit project:

1. Go to Replit Secrets (Tools > Secrets)
2. Add:
   - Name: `CADDY_PROXY_URL`
   - Value: `http://134.199.194.110:3001`
   
3. Add:
   - Name: `CADDY_PROXY_AUTH_TOKEN`
   - Value: `YOUR_SECURE_TOKEN_HERE` (same as step 3)

## Monitoring

```bash
# View logs
pm2 logs caddy-proxy

# Monitor resource usage
pm2 monit

# Restart service
pm2 restart caddy-proxy

# Stop service
pm2 stop caddy-proxy
```

## Security Notes

- The auth token should be kept secret and never committed to version control
- Consider restricting port 3001 to specific IP addresses if you know your Replit egress IPs
- Monitor logs regularly for unauthorized access attempts
- Rotate the auth token periodically

## Troubleshooting

### Service won't start
```bash
pm2 logs caddy-proxy --lines 100
```

### Can't connect from Replit
```bash
# Check if port is open
netstat -tulpn | grep 3001

# Check firewall
ufw status
```

### Caddy API not responding
```bash
# Check if Caddy is running
systemctl status caddy

# Check Caddy admin API
curl http://localhost:2019/config/
```
