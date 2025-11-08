import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

// Security: Only allow requests from your Replit app
const corsOptions = {
  origin: ALLOWED_ORIGIN === '*' ? '*' : ALLOWED_ORIGIN.split(','),
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Namecheap API proxy endpoint
app.post('/namecheap', async (req, res) => {
  try {
    const { url, params } = req.body;

    if (!url || !params) {
      return res.status(400).json({ 
        error: 'Missing required fields: url and params' 
      });
    }

    // Forward request to Namecheap
    const response = await axios.get(url, { params });

    // Return the XML response
    res.set('Content-Type', 'application/xml');
    res.send(response.data);

  } catch (error) {
    console.error('Proxy error:', error.message);
    
    if (error.response) {
      // Namecheap returned an error
      res.status(error.response.status).send(error.response.data);
    } else {
      // Network or other error
      res.status(500).json({ 
        error: 'Proxy request failed',
        message: error.message 
      });
    }
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Namecheap proxy server running on port ${PORT}`);
  console.log(`Allowed origins: ${ALLOWED_ORIGIN}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
