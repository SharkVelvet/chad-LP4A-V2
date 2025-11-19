const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const AUTH_TOKEN = process.env.CADDY_PROXY_AUTH_TOKEN || 'change-this-secret-token';
const CADDY_ADMIN_URL = 'http://localhost:2019';

app.use(express.json());

// In-memory allowlist (synced with Caddy)
let allowedDomains = new Set();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'caddy-proxy',
    allowedDomains: allowedDomains.size
  });
});

// Initialize: Load existing allowed domains from Caddy
async function initializeAllowlist() {
  try {
    const response = await axios.get(`${CADDY_ADMIN_URL}/config/apps/tls/automation/on_demand`);
    if (response.data && response.data.allowed) {
      allowedDomains = new Set(response.data.allowed);
      console.log(`[Caddy Proxy] Loaded ${allowedDomains.size} domains from Caddy`);
    }
  } catch (error) {
    console.log('[Caddy Proxy] No existing allowlist found, starting fresh');
  }
}

// Add domain to Caddy's on-demand TLS allowlist
app.post('/allowlist', async (req, res) => {
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

    console.log(`[Caddy Proxy] Adding domain to allowlist: ${domain}`);

    // Add to our in-memory set
    allowedDomains.add(domain);
    allowedDomains.add(`www.${domain}`);

    // Update Caddy's allowlist
    const allowedArray = Array.from(allowedDomains);
    
    const response = await axios.patch(
      `${CADDY_ADMIN_URL}/config/apps/tls/automation/on_demand/allowed`,
      allowedArray,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`[Caddy Proxy] ✅ Domain added to allowlist: ${domain} (total: ${allowedArray.length})`);

    res.json({ 
      success: true, 
      domain,
      message: 'Domain added to Caddy allowlist',
      totalDomains: allowedArray.length
    });

  } catch (error) {
    console.error('[Caddy Proxy] Error adding domain to allowlist:', error.message);
    if (error.response) {
      console.error('[Caddy Proxy] Caddy response:', error.response.status, error.response.data);
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.response?.data 
    });
  }
});

// Remove domain from allowlist
app.delete('/allowlist/:domain', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
      return res.status(401).json({ 
        success: false, 
        error: 'Unauthorized' 
      });
    }

    const { domain } = req.params;
    console.log(`[Caddy Proxy] Removing domain from allowlist: ${domain}`);

    // Remove from our in-memory set
    allowedDomains.delete(domain);
    allowedDomains.delete(`www.${domain}`);

    // Update Caddy's allowlist
    const allowedArray = Array.from(allowedDomains);
    
    const response = await axios.patch(
      `${CADDY_ADMIN_URL}/config/apps/tls/automation/on_demand/allowed`,
      allowedArray,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`[Caddy Proxy] ✅ Domain removed: ${domain} (total: ${allowedArray.length})`);

    res.json({ 
      success: true, 
      domain,
      message: 'Domain removed from allowlist',
      totalDomains: allowedArray.length
    });

  } catch (error) {
    console.error('[Caddy Proxy] Error removing domain:', error.message);
    if (error.response) {
      console.error('[Caddy Proxy] Caddy response:', error.response.status, error.response.data);
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.response?.data 
    });
  }
});

// List all allowed domains
app.get('/allowlist', async (req, res) => {
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

// Start server and initialize
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Caddy Proxy Server v2 running on port ${PORT}`);
  console.log(`   Auth token configured: ${AUTH_TOKEN.substring(0, 8)}...`);
  console.log(`   Caddy Admin API: ${CADDY_ADMIN_URL}`);
  
  // Initialize allowlist from Caddy
  await initializeAllowlist();
});
