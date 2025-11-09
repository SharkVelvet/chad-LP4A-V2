// Production server - serves pre-built static files without vite.config
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set production environment
process.env.NODE_ENV = 'production';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Serve attached assets
app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

// Import routes using tsx
const { register } = await import('tsx/esm/api');
register();

const { registerRoutes } = await import('./routes.ts');
const server = createServer(app);
await registerRoutes(app);

// Error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
  console.error(err);
});

// Serve static files from dist/public
const distPath = path.resolve(process.cwd(), 'dist', 'public');
if (!fs.existsSync(distPath)) {
  throw new Error(`Build directory not found: ${distPath}`);
}

app.use(express.static(distPath));
app.use('*', (_req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

// Start server
const port = parseInt(process.env.PORT || '5000');
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, () => {
  console.log(`🚀 Production server running on ${host}:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down');
  server.close(() => process.exit(0));
});
