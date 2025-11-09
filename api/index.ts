import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Serve attached assets statically
app.use('/attached_assets', express.static(path.join(__dirname, '../attached_assets'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.png')) {
      res.set('Content-Type', 'image/png');
    } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.set('Content-Type', 'image/jpeg');
    }
  }
}));

// Initialize routes
let routesRegistered = false;
const routesPromise = registerRoutes(app).then(() => {
  routesRegistered = true;
  console.log('API routes registered and ready');
}).catch((error) => {
  console.error(`Failed to register routes: ${error}`);
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error(err);
});

// Serve static files for SPA (catch-all route)
app.use(express.static(path.join(__dirname, '../dist/public')));
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Export for Vercel serverless
export default async (req: Request, res: Response) => {
  // Wait for routes to be registered
  if (!routesRegistered) {
    await routesPromise;
  }
  
  return app(req, res);
};
