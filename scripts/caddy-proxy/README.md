# Caddy Management Proxy

A secure proxy service that enables remote management of Caddy's on-demand TLS allowlist from your Replit application.

## Why This Exists

Caddy's Admin API runs on `localhost:2019` for security reasons and cannot be accessed remotely. This proxy:
- Runs on the DigitalOcean droplet alongside Caddy
- Accepts authenticated requests from your Replit app
- Forwards allowlist updates to Caddy's local Admin API
- Enables **fully automated SSL certificate provisioning** for 500+ domains

## Architecture

```
Replit App (domain registration)
    ↓ HTTP POST /allowlist
Caddy Proxy (134.199.194.110:3001) ← You are here
    ↓ HTTP to localhost:2019
Caddy Admin API (localhost only)
    ↓ Issues SSL cert
Let's Encrypt
```

## Security

- **Authentication**: Bearer token required for all requests
- **Firewall**: Port 3001 open (can be restricted to Replit IPs if needed)
- **Localhost only**: Caddy Admin API never exposed externally
- **PM2**: Auto-restart and process supervision

## Files

- `server.js` - Express server that proxies requests to Caddy
- `package.json` - Node.js dependencies
- `ecosystem.config.js` - PM2 configuration
- `QUICKSTART.md` - 5-minute setup guide
- `DEPLOYMENT.md` - Detailed deployment instructions

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup guide.

## API Endpoints

### POST /allowlist
Add a domain to Caddy's allowlist for SSL provisioning.

**Request:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"domain":"example.com"}' \
  http://134.199.194.110:3001/allowlist
```

**Response:**
```json
{
  "success": true,
  "domain": "example.com",
  "message": "Domain added to Caddy allowlist"
}
```

### DELETE /allowlist/:domain
Remove a domain from the allowlist.

**Request:**
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://134.199.194.110:3001/allowlist/example.com
```

### GET /health
Check if the proxy is running.

**Request:**
```bash
curl http://134.199.194.110:3001/health
```

**Response:**
```json
{
  "status": "ok",
  "service": "caddy-proxy"
}
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `CADDY_PROXY_AUTH_TOKEN` - Secret token for authentication (required)
- `NODE_ENV` - Environment (production/development)

## Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs caddy-proxy

# Monitor resources
pm2 monit

# Restart service
pm2 restart caddy-proxy
```

## Support

For issues or questions, check the logs:
```bash
pm2 logs caddy-proxy --lines 100
```
