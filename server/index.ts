import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { startDomainWorker, stopDomainWorker } from "./domainWorker";
import * as fs from "fs";
import * as path from "path";

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Serve attached assets statically FIRST, before other middleware
app.use('/attached_assets', express.static('attached_assets', {
  setHeaders: (res, path) => {
    if (path.endsWith('.png')) {
      res.set('Content-Type', 'image/png');
    } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.set('Content-Type', 'image/jpeg');
    }
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Set NODE_ENV to production if not already set
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = "production";
    }

    // In production, serve static files but NOT index.html (let custom domain middleware handle root)
    if (process.env.NODE_ENV === "production") {
      const distPath = path.resolve(import.meta.dirname, "public");
      if (!fs.existsSync(distPath)) {
        throw new Error(`Could not find the build directory: ${distPath}`);
      }
      // Serve all static files but disable auto-serving index.html - custom domain middleware needs to inject page data
      app.use(express.static(distPath, { index: false }));
    }

    const server = await registerRoutes(app);

    // Setup Vite in development mode, or serve fallback index.html in production
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, server);
    } else {
      // Fallback to index.html for client-side routing
      const distPath = path.resolve(import.meta.dirname, "public");
      app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
      });
    }

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Log all errors in production for debugging
      console.error('[ERROR]', status, message, err.stack);
      
      res.status(status).json({ message });
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    });

    // Server configuration for deployment compatibility
    const port = parseInt(process.env.PORT || "5000");
    const host = process.env.HOST || "0.0.0.0";

    server.listen(port, host, () => {
      log(`serving on ${host}:${port} (NODE_ENV: ${process.env.NODE_ENV})`);
      log(`API routes registered and ready`);
      
      // Start domain provisioning worker
      startDomainWorker();
    });

    // Handle server startup errors
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${port} is already in use`);
        process.exit(1);
      } else {
        log(`Server error: ${err.message}`);
        process.exit(1);
      }
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      log('SIGTERM received, shutting down gracefully');
      stopDomainWorker();
      server.close(() => {
        log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      log('SIGINT received, shutting down gracefully');
      stopDomainWorker();
      server.close(() => {
        log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    log(`Failed to start server: ${error}`);
    process.exit(1);
  }
})();
