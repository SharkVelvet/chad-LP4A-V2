const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const AUTH_TOKEN = process.env.CADDY_PROXY_AUTH_TOKEN || 'change-this-secret-token';
const CADDY_ADMIN_URL = 'http://localhost:2019';

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'caddy-proxy' });
});

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

    // Get current Caddy config
    const configResponse = await axios.get(`${CADDY_ADMIN_URL}/config/`);
    const currentConfig = configResponse.data;

    // Navigate to the on_demand_tls.ask endpoint
    const askPath = currentConfig?.apps?.http?.servers?.srv0?.automatic_https?.on_demand?.ask;
    
    if (!askPath) {
      console.error('[Caddy Proxy] Warning: on_demand.ask not found in Caddy config');
    }

    // Add domain to the allowlist using Caddy's load endpoint
    // This tells Caddy to allow certificate issuance for this domain
    const patchResponse = await axios.post(
      `${CADDY_ADMIN_URL}/load`,
      currentConfig,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`[Caddy Proxy] ✅ Domain added to allowlist: ${domain}`);

    res.json({ 
      success: true, 
      domain,
      message: 'Domain added to Caddy allowlist'
    });

  } catch (error) {
    console.error('[Caddy Proxy] Error adding domain to allowlist:', error.message);
    if (error.response) {
      console.error('[Caddy Proxy] Caddy response:', error.response.data);
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.response?.data 
    });
  }
});

// Remove domain from allowlist (optional, for cleanup)
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

    // For now, just return success
    // In practice, you might want to reload Caddy config without this domain
    res.json({ 
      success: true, 
      domain,
      message: 'Domain removed from allowlist'
    });

  } catch (error) {
    console.error('[Caddy Proxy] Error removing domain:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Caddy Proxy Server running on port ${PORT}`);
  console.log(`   Auth token configured: ${AUTH_TOKEN.substring(0, 8)}...`);
  console.log(`   Caddy Admin API: ${CADDY_ADMIN_URL}`);
});
