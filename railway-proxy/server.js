const http = require('http');
const httpProxy = require('http-proxy');

const REPLIT_ORIGIN = 'landing-pages-for-agents-v-2-sharkvelvet.replit.app';
const PORT = process.env.PORT || 3000;

// Create proxy server
const proxy = httpProxy.createProxyServer({
  target: `https://${REPLIT_ORIGIN}`,
  changeOrigin: true,
  secure: true,
  ws: true, // Support WebSocket connections
  xfwd: true, // Add X-Forwarded-* headers
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  
  if (!res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway: Unable to reach origin server');
  }
});

// Modify headers before forwarding
proxy.on('proxyReq', (proxyReq, req, res, options) => {
  // Get the original hostname from the request
  const originalHost = req.headers.host || '';
  
  // Rewrite Host header to Replit deployment URL
  proxyReq.setHeader('Host', REPLIT_ORIGIN);
  
  // Preserve original hostname for the app to detect custom domain
  proxyReq.setHeader('X-Forwarded-Host', originalHost);
  proxyReq.setHeader('X-Original-URL', `${req.headers['x-forwarded-proto'] || 'https'}://${originalHost}${req.url}`);
  
  console.log(`Proxying: ${originalHost}${req.url} -> ${REPLIT_ORIGIN}${req.url}`);
});

// Create HTTP server
const server = http.createServer((req, res) => {
  proxy.web(req, res);
});

// Handle WebSocket upgrades
server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Railway Proxy Server running on port ${PORT}`);
  console.log(`📡 Forwarding all traffic to: ${REPLIT_ORIGIN}`);
  console.log(`✅ Ready to handle custom domains`);
});
