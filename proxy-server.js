const http = require('http');
const httpProxy = require('http-proxy');

const REPLIT_ORIGIN = 'landing-pages-for-agents-v-2-sharkvelvet.replit.app';
const PORT = process.env.PORT || 3000;

// Create proxy server
const proxy = httpProxy.createProxyServer({
  target: `https://${REPLIT_ORIGIN}`,
  changeOrigin: true,
  secure: true,
  ws: true,
  xfwd: true,
});

proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (!res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway');
  }
});

proxy.on('proxyReq', (proxyReq, req) => {
  const originalHost = req.headers.host || '';
  proxyReq.setHeader('Host', REPLIT_ORIGIN);
  proxyReq.setHeader('X-Forwarded-Host', originalHost);
  console.log(`Proxying: ${originalHost}${req.url} -> ${REPLIT_ORIGIN}${req.url}`);
});

const server = http.createServer((req, res) => proxy.web(req, res));
server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Railway Proxy running on port ${PORT}`);
  console.log(`📡 Forwarding to: ${REPLIT_ORIGIN}`);
});
