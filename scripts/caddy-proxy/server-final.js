const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
const AUTH_TOKEN = process.env.CADDY_PROXY_AUTH_TOKEN || 'change-this-secret-token';

app.use(express.json());

// In-memory allowlist for allowed domains
let allowedDomains = new Set();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'caddy-proxy',
    allowedDomains: allowedDomains.size
  });
});

// Caddy on-demand TLS "ask" endpoint
// Caddy calls this before issuing a certificate
// Return 200 if domain is allowed, 403 if not
app.get('/allowlist-check', (req, res) => {
  const domain = req.query.domain;
  
  if (!domain) {
    console.log('[Caddy Ask] No domain provided');
    return res.status(400).send('Domain parameter required');
  }

  // Check if domain (or its www variant) is in the allowlist
  const isAllowed = allowedDomains.has(domain) || 
                    allowedDomains.has(domain.replace('www.', '')) ||
                    allowedDomains.has(`www.${domain}`);

  if (isAllowed) {
    console.log(`[Caddy Ask] ✅ Domain allowed: ${domain}`);
    res.status(200).send('OK');
  } else {
    console.log(`[Caddy Ask] ❌ Domain denied: ${domain}`);
    res.status(403).send('Domain not in allowlist');
  }
});

// Add domain to allowlist (called by Replit app)
app.post('/allowlist', (req, res) => {
  try {
    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
      return res.status(401).json({ 
        success: false, 
        error: 'Unauthorized' 
      });
    }

    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ 
        success: false, 
        error: 'Domain is required' 
      });
    }

    console.log(`[Allowlist] Adding domain: ${domain}`);

    // Add domain and www variant
    allowedDomains.add(domain);
    allowedDomains.add(`www.${domain}`);

    console.log(`[Allowlist] ✅ Domain added: ${domain} (total: ${allowedDomains.size})`);

    res.json({ 
      success: true, 
      domain,
      message: 'Domain added to allowlist',
      totalDomains: allowedDomains.size
    });

  } catch (error) {
    console.error('[Allowlist] Error adding domain:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});

// Remove domain from allowlist
app.delete('/allowlist/:domain', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
      return res.status(401).json({ 
        success: false, 
        error: 'Unauthorized' 
      });
    }

    const { domain } = req.params;
    console.log(`[Allowlist] Removing domain: ${domain}`);

    // Remove domain and www variant
    allowedDomains.delete(domain);
    allowedDomains.delete(`www.${domain}`);

    console.log(`[Allowlist] ✅ Domain removed: ${domain} (total: ${allowedDomains.size})`);

    res.json({ 
      success: true, 
      domain,
      message: 'Domain removed from allowlist',
      totalDomains: allowedDomains.size
    });

  } catch (error) {
    console.error('[Allowlist] Error removing domain:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});

// List all allowed domains (for debugging)
app.get('/allowlist', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
      return res.status(401).json({ 
        success: false, 
        error: 'Unauthorized' 
      });
    }

    res.json({ 
      success: true, 
      domains: Array.from(allowedDomains),
      total: allowedDomains.size
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Caddy Proxy Server (On-Demand TLS) running on port ${PORT}`);
  console.log(`   Auth token: ${AUTH_TOKEN.substring(0, 8)}...`);
  console.log(`   Endpoints:`);
  console.log(`     - GET  /health              (public)`);
  console.log(`     - GET  /allowlist-check     (Caddy calls this)`);
  console.log(`     - POST /allowlist           (authenticated - Replit adds domains)`);
  console.log(`     - GET  /allowlist           (authenticated - list domains)`);
  console.log(`     - DEL  /allowlist/:domain   (authenticated - remove domains)`);
});
