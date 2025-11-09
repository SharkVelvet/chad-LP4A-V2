import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes.js';

// Create Express app instance
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Register routes only once
let routesInitialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize routes once
  if (!routesInitialized) {
    await registerRoutes(app);
    routesInitialized = true;
  }

  // Handle the request with Express
  // @ts-ignore - Express types are compatible with Vercel
  return app(req, res);
}
