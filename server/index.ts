import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
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

    // In production, serve static assets ONLY (not index.html)
    if (process.env.NODE_ENV === "production") {
      const distPath = path.resolve(import.meta.dirname, "public");
      if (!fs.existsSync(distPath)) {
        throw new Error(`Could not find the build directory: ${distPath}`);
      }
      // Only serve /assets/ directory, not root - custom domain middleware needs to inject page data
      app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    }

    const server = await registerRoutes(app);

    // Custom domain handler
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      // Check multiple possible hostname sources
      const hostname = req.hostname || req.get('host')?.split(':')[0];
      const cfHost = req.get('cf-connecting-hostname');
      const xForwardedHost = req.get('x-forwarded-host');
      const actualHostname = cfHost || xForwardedHost || hostname;
      
      // Log hostname detection for debugging
      if (hostname !== 'localhost' && !req.path.startsWith('/api/') && !req.path.startsWith('/attached_assets/')) {
        console.log(`🔍 Custom domain request: hostname="${hostname}", cf-connecting-hostname="${cfHost}", x-forwarded-host="${xForwardedHost}", actual="${actualHostname}"`);
      }
      
      // List of platform domains - requests to these go to the SPA
      const platformDomains = [
        'localhost',
        '127.0.0.1',
        'replit.app',
        'replit.dev',
        'chad-lp4a-v2-production.up.railway.app',
        'landingpagesforagentsfallback.com' // Cloudflare fallback origin - not a custom domain
      ];

      // If this is a platform domain or an API request or static asset, skip custom domain handling
      if (!actualHostname || 
          platformDomains.some(d => actualHostname.includes(d)) || 
          req.path.startsWith('/api/') ||
          req.path.startsWith('/assets/') ||
          req.path.startsWith('/attached_assets/')) {
        return next();
      }

      // This is a custom domain - serve the public page
      try {
        const page = await storage.getPageByDomain(actualHostname);
        
        if (!page) {
          return res.status(404).send(`
            <!DOCTYPE html>
            <html>
              <head><title>Page Not Found</title></head>
              <body style="font-family: system-ui; padding: 40px; text-align: center;">
                <h1>Page Not Found</h1>
                <p>No page is configured for domain: ${actualHostname}</p>
              </body>
            </html>
          `);
        }

        // Get page content and template
        const content = await storage.getPageContent(page.id);
        const template = await storage.getTemplate(page.templateId);

        // Read the built index.html from dist/public
        const indexPath = path.resolve(import.meta.dirname, "public", "index.html");
        let html = fs.readFileSync(indexPath, "utf-8");

        // Inject page data into the HTML
        const pageDataScript = `<script>window.__PAGE_DATA__ = ${JSON.stringify({ page, content, template })};</script>`;
        html = html.replace('</head>', `${pageDataScript}</head>`);

        res.send(html);
      } catch (error) {
        console.error('Custom domain error:', error);
        return next();
      }
    });

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
      server.close(() => {
        log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      log('SIGINT received, shutting down gracefully');
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
