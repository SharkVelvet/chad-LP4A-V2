const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const NAMECHEAP_API_URL = 'https://api.namecheap.com/xml.response';

app.post('/namecheap-proxy', async (req, res) => {
  try {
    const { method = 'GET', params, data } = req.body;
    
    let url = NAMECHEAP_API_URL;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url = `${NAMECHEAP_API_URL}?${queryString}`;
    }

    const config = {
      method: method.toLowerCase(),
      url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    if (data && method.toUpperCase() === 'POST') {
      config.data = data;
    }

    const response = await axios(config);
    
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Relay error:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'namecheap-relay' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Namecheap relay running on port ${PORT}`);
});
