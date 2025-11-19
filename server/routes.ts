import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import multer from "multer";
import * as XLSX from "xlsx";
import { storage } from "./storage.js";
import { setupAuth } from "./auth.js";
import { setupAdminAuth, isAdminAuthenticated } from "./adminAuth.js";
import Stripe from "stripe";
import { z } from "zod";
import { 
  insertPageSchema, 
  insertPageContentSchema,
  insertBlogPostSchema,
  insertCustomSolutionInquirySchema,
  insertAnalyticsEventSchema,
  insertSeoDataSchema
} from "../shared/schema.js";
import { sendCustomerNotification, sendCustomerReceipt, testEmailConnection, sendCustomSolutionInquiry, sendContactFormSubmission } from "./email.js";
import { validatePassword } from "./passwords.js";
import { domainService } from "./domainService.js";
import { cloudflareService } from "./cloudflareService.js";
import { railwayService } from "./railwayService.js";
import { addDomainToAllowlist } from "./caddyService.js";
import { RAILWAY_DOMAIN, createRailwayDnsRecords } from "./config.js";
import { extractDnsRecordsFromRailway, serializeDnsRecords } from "./railwayHelpers.js";

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Initialize Stripe only if the secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets
  app.use('/attached_assets', express.static('attached_assets'));

  // Setup authentication routes
  setupAuth(app);
  setupAdminAuth(app);

  // TEMPORARY: Download endpoint for backend transfer to droplet
  app.get("/api/__download-backend__", async (req, res) => {
    const fs = await import('fs');
    const path = await import('path');
    const backendPath = path.resolve(import.meta.dirname, "../dist/index.js");
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Content-Disposition', 'attachment; filename="index.js"');
    res.sendFile(backendPath);
  });

  // Public API - Get page by custom domain (no authentication required)
  app.get("/api/public/page-by-domain/:domain", async (req, res) => {
    try {
      // Set cache-control headers to bypass Cloudflare cache for dynamic content
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      const domain = req.params.domain;
      const page = await storage.getPageByDomain(domain);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found for this domain" });
      }

      // Get page content
      const content = await storage.getPageContent(page.id);
      
      // Get template information
      const template = await storage.getTemplate(page.templateId);

      res.json({ 
        page,
        content,
        template
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Email config debug endpoint
  app.get("/api/debug/email-config", async (req, res) => {
    res.json({
      isReplitEnvironment: !!process.env.REPLIT_CONNECTORS_HOSTNAME,
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailAppPassword: !!process.env.GMAIL_APP_PASSWORD,
      hasOAuthClientId: !!process.env.GMAIL_OAUTH_CLIENT_ID,
      hasOAuthClientSecret: !!process.env.GMAIL_OAUTH_CLIENT_SECRET,
      hasOAuthRefreshToken: !!process.env.GMAIL_OAUTH_REFRESH_TOKEN,
      gmailUserValue: process.env.GMAIL_USER ? process.env.GMAIL_USER.substring(0, 3) + '***' : 'not set',
      nodeEnv: process.env.NODE_ENV
    });
  });

  // Password validation endpoint
  app.post("/api/validate-password", async (req, res) => {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ valid: false, message: "Password is required" });
    }
    
    const isValid = validatePassword(password);
    res.json({ valid: isValid });
  });

  // Database migration endpoint (create tables)
  app.post("/api/admin/migrate-database", async (req, res) => {
    try {
      const { execSync } = await import('child_process');
      
      // Run drizzle push to create tables
      execSync('npm run db:push -- --force', { 
        stdio: 'inherit',
        env: process.env 
      });
      
      res.json({ 
        success: true,
        message: "Database tables created successfully"
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: `Error migrating database: ${error.message}` 
      });
    }
  });

  // Database seed endpoint (one-time use to populate templates)
  app.post("/api/admin/seed-database", async (req, res) => {
    try {
      const { templateSeedData } = await import('./seed-data.js');
      
      // Check if templates already exist
      const existingTemplates = await storage.getAllTemplates();
      
      if (existingTemplates && existingTemplates.length > 0) {
        return res.status(400).json({ 
          message: "Templates already exist. Database has already been seeded.",
          count: existingTemplates.length 
        });
      }
      
      // Map seed data to InsertTemplate format (remove id, convert property names)
      const templatesToInsert = templateSeedData.map(t => ({
        name: t.name,
        slug: t.slug,
        description: t.description,
        category: t.category,
        previewImage: t.preview_image,
        isActive: t.is_active
      }));
      
      // Bulk insert templates (with conflict handling)
      await storage.createTemplatesBulk(templatesToInsert);
      
      res.json({ 
        success: true,
        message: `Successfully seeded database with ${templatesToInsert.length} templates`,
        count: templatesToInsert.length
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: `Error seeding database: ${error.message}` 
      });
    }
  });

  // Create admin user endpoint (one-time use)
  app.post("/api/admin/create-admin-user", async (req, res) => {
    try {
      // Check if admin user already exists
      const existingUser = await storage.getUserByEmail('chad@fotype.com');
      
      if (existingUser) {
        return res.status(400).json({ 
          message: "Admin user already exists",
          username: existingUser.username,
          email: existingUser.email
        });
      }
      
      // Create admin user (passwordless - uses email OTP)
      const user = await storage.createUser({
        username: 'chad',
        email: 'chad@fotype.com',
        password: '', // Empty password for OTP-based authentication
        role: 'admin'
      });
      
      res.json({ 
        success: true,
        message: "Admin user created successfully. Use email OTP to login.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        loginInstructions: {
          url: "https://chad-lp4a-v2-production.up.railway.app/login",
          email: "chad@fotype.com",
          method: "Enter your email and you'll receive a verification code"
        }
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: `Error creating admin user: ${error.message}` 
      });
    }
  });

  // Facebook Pixel ID endpoint
  app.get("/api/facebook-pixel-id", async (req, res) => {
    const pixelId = process.env.FACEBOOK_PIXEL_ID || '';
    res.json({ pixelId });
  });

  // Location routes
  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await storage.getAllLocations();
      res.json(locations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Template routes
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Page routes - multi-page support
  // Get all pages for current user
  app.get("/api/pages", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pages = await storage.getUserPages(req.user.id);
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get a specific page by ID
  app.get("/api/pages/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const page = await storage.getPage(parseInt(req.params.id));
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      // Verify ownership
      if (page.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const content = await storage.getPageContent(page.id);
      res.json({ ...page, content });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new page
  app.post("/api/pages", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { templateId, name, subscriptionPlan, domainPreferences } = insertPageSchema.parse(req.body);

      // Super admins get unlimited free pages for testing
      const isSuperAdmin = req.user.role === 'admin' || req.user.role === 'super_admin';
      
      const page = await storage.createPage({
        userId: req.user.id,
        templateId,
        name,
        subscriptionPlan,
        domainPreferences,
        // Auto-activate subscription for super admins
        ...(isSuperAdmin && { subscriptionStatus: 'active' })
      } as any);

      // Create default content
      await storage.createPageContent({
        pageId: page.id,
        businessName: "",
        tagline: "",
        aboutUs: "",
        phone: "",
        email: req.user.email,
        address: "",
      });

      res.status(201).json(page);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Helper function to normalize domain names
  function normalizeDomain(domain: string | null | undefined): string {
    if (!domain) return '';
    return domain.trim().toLowerCase()
      .replace(/^https?:\/\//, '')  // Remove protocol
      .replace(/^www\./, '')         // Remove www prefix
      .replace(/\/$/, '');            // Remove trailing slash
  }

  // Helper function to ensure domains are registered with Railway
  async function ensureRailwayDomains(domain: string): Promise<void> {
    if (!railwayService.isConfigured()) {
      console.log('⚠️  Railway not configured - skipping domain registration');
      return;
    }

    try {
      const normalizedDomain = normalizeDomain(domain);
      if (!normalizedDomain) return;

      const wwwDomain = `www.${normalizedDomain}`;
      
      console.log(`🚂 Registering domains with Railway: ${normalizedDomain} and ${wwwDomain}`);
      
      // Register both root and www subdomain (idempotent - Railway handles duplicates)
      await railwayService.addCustomDomain(normalizedDomain);
      await railwayService.addCustomDomain(wwwDomain);
      
      console.log(`✅ Domains ${normalizedDomain} and ${wwwDomain} registered with Railway`);
    } catch (error: any) {
      console.error(`⚠️  Railway domain registration failed: ${error.message}`);
      // Continue anyway - domain saved to DB, admin can manually add to Railway if needed
    }
  }

  // Update page settings
  app.put("/api/pages/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const updateData = insertPageSchema.partial().parse(req.body);
      
      // Always register domain with Railway when domain is provided (idempotent)
      // This handles: new domains, manual connections, re-saves, updates, etc.
      // We don't check if the domain changed - Railway registration is idempotent and
      // this ensures manually-connected domains get registered even on re-saves
      const normalizedDomain = normalizeDomain(updateData.domain || page.domain);
      
      if (normalizedDomain) {
        await ensureRailwayDomains(normalizedDomain);
      }
      
      const updatedPage = await storage.updatePage(pageId, updateData);
      
      res.json(updatedPage);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a page
  app.delete("/api/pages/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      await storage.deletePage(pageId);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Page content routes
  app.put("/api/pages/:id/content", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const contentData = insertPageContentSchema.partial().parse(req.body);
      const updatedContent = await storage.updatePageContent(pageId, contentData);
      
      res.json(updatedContent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update flexible content by ID
  app.patch("/api/pages/:id/content/:contentId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const contentId = req.params.contentId;
      const { value } = req.body;

      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const updatedContent = await storage.updateFlexibleContent(pageId, contentId, value);
      
      res.json(updatedContent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update hidden sections
  app.patch("/api/pages/:id/hidden-sections", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const { hiddenSections } = req.body;

      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const updatedContent = await storage.updatePageContent(pageId, { hiddenSections });
      
      res.json(updatedContent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Publish page content
  app.post("/api/pages/:id/publish", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const publishedContent = await storage.publishPageContent(pageId);
      res.json(publishedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Unpublish page content
  app.post("/api/pages/:id/unpublish", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const unpublishedContent = await storage.unpublishPageContent(pageId);
      res.json(unpublishedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Set maintenance mode
  app.post("/api/pages/:id/maintenance", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const { enabled } = req.body;
      
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const updatedContent = await storage.setMaintenanceMode(pageId, enabled);
      res.json(updatedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Enable form embedding
  app.post("/api/pages/:id/enable-form", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const updatedContent = await storage.enableFormEmbed(pageId);
      res.json(updatedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Save form embed configuration
  app.post("/api/pages/:id/save-form", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const { formProvider, formEmbedCode } = req.body;
      
      if (!formProvider || !formEmbedCode) {
        return res.status(400).json({ message: "Form provider and embed code are required" });
      }

      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const updatedContent = await storage.saveFormEmbed(pageId, formProvider, formEmbedCode);
      res.json(updatedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Disable form embedding
  app.post("/api/pages/:id/disable-form", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const pageId = parseInt(req.params.id);
      const page = await storage.getPage(pageId);
      
      if (!page || page.userId !== req.user.id) {
        return res.status(404).json({ message: "Page not found" });
      }

      const updatedContent = await storage.disableFormEmbed(pageId);
      res.json(updatedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Domain routes
  // Check domain availability
  app.post("/api/domains/check-availability", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domains, pageId } = req.body;
      
      if (!domains || !Array.isArray(domains) || domains.length === 0) {
        return res.status(400).json({ message: "Domains array is required" });
      }
      
      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      // Verify the user owns an active paid page
      const page = await storage.getPage(pageId);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      if (page.userId !== req.user.id) {
        return res.status(403).json({ message: "You do not own this page" });
      }
      if (page.subscriptionStatus !== 'active') {
        return res.status(403).json({ message: "You must have an active page subscription to search for domains" });
      }

      const results = await domainService.checkAvailability(domains);
      res.json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get domain pricing
  app.post("/api/domains/pricing", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domains, pageId } = req.body;
      
      if (!domains || !Array.isArray(domains) || domains.length === 0) {
        return res.status(400).json({ message: "Domains array is required" });
      }
      
      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      // Verify the user owns an active paid page
      const page = await storage.getPage(pageId);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      if (page.userId !== req.user.id) {
        return res.status(403).json({ message: "You do not own this page" });
      }
      if (page.subscriptionStatus !== 'active') {
        return res.status(403).json({ message: "You must have an active page subscription to view domain pricing" });
      }

      const pricing = await domainService.getPricing(domains);
      res.json(pricing);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Complete domain registration after successful payment
  app.post("/api/domains/complete-purchase", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      if (!stripe) {
        return res.status(500).json({ message: "Stripe not configured" });
      }

      // Verify the payment session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session.payment_status !== 'paid') {
        return res.status(400).json({ message: "Payment not completed" });
      }

      // Extract domain purchase details from session metadata
      const { domain, years, pageId, contactInfo } = session.metadata as any;
      const parsedContactInfo = JSON.parse(contactInfo || '{}');
      
      if (!domain || !parsedContactInfo) {
        return res.status(400).json({ message: "Invalid session data" });
      }

      // Verify user ownership
      if (session.metadata?.userId !== req.user.id.toString()) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Now register the domain with Namecheap (payment already collected)
      const result = await domainService.registerDomain(domain, parseInt(years) || 1, parsedContactInfo);

      if (result.success && pageId) {
        try {
          console.log(`🌐 Setting up Cloudflare for SaaS for ${domain}...`);
          
          const cloudflareResult = await domainService.setupCloudflareForSaaS(domain);
          
          console.log(`🌐 Configuring DNS to point to Cloudflare...`);
          await domainService.configureCloudflareDNS(domain, cloudflareResult.cnameTarget);
          
          console.log(`✅ Domain ${domain} configured with Cloudflare for SaaS (HTTP validation - automatic)`);
          
          await storage.updatePage(parseInt(pageId), { 
            domain, 
            domainVerified: false,
            domainStatus: 'pending',
            cloudflareCustomHostnameId: cloudflareResult.customHostnameId,
            cloudflareHostnameStatus: cloudflareResult.status,
            cloudflareSslStatus: cloudflareResult.sslStatus,
            cloudflareCnameTarget: cloudflareResult.cnameTarget
          } as any);
          
          await storage.ensurePageContent(parseInt(pageId));
          
        } catch (error: any) {
          console.error(`⚠️  Cloudflare/DNS setup failed: ${error.message}`);
          
          await storage.updatePage(parseInt(pageId), { 
            domain, 
            domainVerified: false,
            domainStatus: 'pending'
          } as any);
          
          await storage.ensurePageContent(parseInt(pageId));
        }
      }

      res.json(result);
    } catch (error: any) {
      console.error("Domain registration error:", error);
      
      // Map common Namecheap errors to user-friendly messages
      const errorMessage = error.message || "Failed to register domain";
      
      if (errorMessage.includes("Domain not available")) {
        return res.status(409).json({ message: "This domain is no longer available" });
      }
      if (errorMessage.includes("Invalid contact")) {
        return res.status(400).json({ message: "Invalid contact information provided" });
      }
      if (errorMessage.includes("Insufficient funds")) {
        return res.status(402).json({ message: "Insufficient funds in domain registrar account" });
      }
      
      res.status(500).json({ message: errorMessage });
    }
  });

  // Get domain info
  app.get("/api/domains/:domain/info", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      const info = await domainService.getDomainInfo(domain);
      res.json(info);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Set nameservers for a domain
  app.post("/api/domains/:domain/nameservers", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      const { nameservers } = req.body;

      if (!nameservers || !Array.isArray(nameservers)) {
        return res.status(400).json({ message: "Nameservers array is required" });
      }

      const success = await domainService.setNameservers(domain, nameservers);
      res.json({ success });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get DNS records for a domain
  app.get("/api/domains/:domain/dns", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      
      // Verify user owns a page with this domain
      const pages = await storage.getUserPages(req.user.id);
      const ownsDomain = pages.some(w => w.domain === domain);
      
      if (!ownsDomain) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      const records = await domainService.getDnsRecords(domain);
      res.json(records);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Set DNS records for a domain
  app.post("/api/domains/:domain/dns", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      const { records } = req.body;

      if (!records || !Array.isArray(records)) {
        return res.status(400).json({ message: "Records array is required" });
      }

      // Verify user owns a page with this domain
      const pages = await storage.getUserPages(req.user.id);
      const page = pages.find(w => w.domain === domain);
      
      if (!page) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      const success = await domainService.setDnsRecords(domain, records);
      
      // Update domain status to 'propagating' after DNS configuration
      if (success) {
        await storage.updatePage(page.id, { domainStatus: 'propagating' });
      }
      
      res.json({ success });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Check DNS propagation status
  app.get("/api/domains/:domain/verify", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      
      // Verify user owns a page with this domain
      const pages = await storage.getUserPages(req.user.id);
      const page = pages.find(w => w.domain === domain);
      
      if (!page) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      // Use DNS lookup to check if domain resolves
      const dns = await import('dns').then(m => m.promises);
      let isActive = false;
      
      try {
        // Try to resolve the domain - if it resolves, DNS has propagated
        await dns.resolve(domain);
        isActive = true;
        
        // Update status to active if it was propagating
        if (page.domainStatus === 'propagating') {
          await storage.updatePage(page.id, { domainStatus: 'active' });
        }
      } catch {
        // Domain doesn't resolve yet, still propagating
        isActive = false;
      }

      res.json({ 
        isActive, 
        status: isActive ? 'active' : page.domainStatus || 'pending' 
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Retry Railway registration only (for testing/debugging)
  app.post("/api/domains/:domain/retry-railway", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;

      // Verify user owns a page with this domain
      const pages = await storage.getUserPages(req.user.id);
      const page = pages.find(w => w.domain === domain);
      
      if (!page) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      if (!railwayService.isConfigured()) {
        return res.status(500).json({ message: "Railway API not configured" });
      }

      console.log(`🔄 Retrying Railway registration for: ${domain}`);
      
      try {
        const result = await railwayService.addCustomDomain(domain);
        console.log(`✅ Railway registration successful for ${domain}`);
        
        res.json({
          success: true,
          message: `Railway registration successful for ${domain}`,
          railwayDomain: result
        });
      } catch (error: any) {
        console.error(`❌ Railway registration failed: ${error.message}`);
        res.status(500).json({ 
          success: false,
          message: error.message 
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin endpoint to force DNS reconfiguration
  app.post("/api/admin/domains/:domain/force-fix-dns", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.sendStatus(403);
    }

    try {
      const { domain } = req.params;
      console.log(`🔧 ADMIN: Force fixing DNS for ${domain}...`);

      // Configure DNS records
      const dnsRecords = createRailwayDnsRecords();
      await domainService.setDnsRecords(domain, dnsRecords);
      console.log(`✅ DNS records updated to ALIAS/CNAME`);

      res.json({ 
        success: true, 
        message: "DNS records forcefully updated",
        records: dnsRecords
      });
    } catch (error: any) {
      console.error("Force DNS fix error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Complete domain setup (Cloudflare for SaaS + DNS)
  // Auto-configure DNS for purchased domain
  app.post("/api/domains/:domain/auto-configure", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain} = req.params;
      
      const page = await storage.getPageByDomain(domain);
      if (!page) {
        return res.status(404).json({ message: "Page not found for this domain" });
      }
      
      if (page.userId !== req.user.id) {
        return res.status(403).json({ message: "You do not own this domain" });
      }

      console.log(`🚀 Auto-configuring ${domain} with Cloudflare for SaaS...`);

      let cloudflareResult;
      let cnameTarget;

      if (page.cloudflareCustomHostnameId && page.cloudflareCnameTarget) {
        console.log(`✓ Using existing Cloudflare custom hostname: ${page.cloudflareCustomHostnameId}`);
        
        const hostname = await cloudflareService.getCustomHostname(page.cloudflareCustomHostnameId);
        
        cloudflareResult = {
          customHostnameId: page.cloudflareCustomHostnameId,
          cnameTarget: page.cloudflareCnameTarget,
          status: hostname?.status || page.cloudflareHostnameStatus || 'pending',
          sslStatus: hostname?.ssl?.status || page.cloudflareSslStatus || 'pending_validation'
        };
        cnameTarget = page.cloudflareCnameTarget;
      } else {
        console.log(`🌐 Creating new Cloudflare custom hostname for ${domain}...`);
        try {
          cloudflareResult = await domainService.setupCloudflareForSaaS(domain);
          cnameTarget = cloudflareResult.cnameTarget;
        } catch (error: any) {
          // Handle duplicate custom hostname error (Code: 1406 or 1408)
          if (error.message && (error.message.includes('1406') || error.message.includes('1408') || error.message.includes('Duplicate custom hostname'))) {
            console.log(`ℹ️  Custom hostname already exists for ${domain}, fetching existing one...`);
            
            // Fetch the existing custom hostname
            const existingHostname = await cloudflareService.findExistingCustomHostname(domain);
            
            if (!existingHostname) {
              throw new Error('Duplicate custom hostname found but could not retrieve it');
            }
            
            cloudflareResult = {
              customHostnameId: existingHostname.id,
              cnameTarget: existingHostname.ownership_verification?.value || `landingpagesforagentsfallback.com`,
              status: existingHostname.status || 'pending',
              sslStatus: existingHostname.ssl?.status || 'pending_validation'
            };
            cnameTarget = cloudflareResult.cnameTarget;
            
            console.log(`✓ Retrieved existing custom hostname: ${existingHostname.id}`);
          } else {
            throw error;
          }
        }
      }

      console.log(`🌐 Configuring DNS to point to Cloudflare...`);
      await domainService.configureCloudflareDNS(domain, cnameTarget);
      console.log(`✓ DNS configured (HTTP validation - automatic)`);

      await storage.updatePage(page.id, { 
        domainVerified: false,
        domainStatus: 'auto_configured',
        cloudflareCustomHostnameId: cloudflareResult.customHostnameId,
        cloudflareHostnameStatus: cloudflareResult.status,
        cloudflareSslStatus: cloudflareResult.sslStatus,
        cloudflareCnameTarget: cnameTarget
      } as any);
      console.log(`✓ Domain configured with Cloudflare for SaaS`);

      res.json({ 
        success: true, 
        message: "Domain automatically configured with Cloudflare. SSL certificate will be issued shortly.",
        status: cloudflareResult.status,
        sslStatus: cloudflareResult.sslStatus
      });
    } catch (error: any) {
      console.error("Auto-configure error:", error);
      res.status(500).json({ message: error.message || "Failed to auto-configure domain" });
    }
  });

  // Check Cloudflare custom hostname status
  app.get("/api/domains/:domain/cloudflare-status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      
      const page = await storage.getPageByDomain(domain);
      if (!page) {
        return res.status(404).json({ message: "Page not found for this domain" });
      }
      
      if (page.userId !== req.user.id) {
        return res.status(403).json({ message: "You do not own this domain" });
      }

      if (!page.cloudflareCustomHostnameId) {
        return res.json({
          success: false,
          message: "Cloudflare custom hostname not configured"
        });
      }

      console.log(`🔍 Checking Cloudflare status for ${domain}...`);
      
      const status = await domainService.checkCloudflareStatus(page.cloudflareCustomHostnameId);
      
      const isActive = status.isActive;
      
      console.log(`   Hostname status: ${status.status}`);
      console.log(`   SSL status: ${status.sslStatus}`);
      console.log(`   Is active: ${isActive ? '✅' : '⏳'}`);
      
      if (isActive && !page.domainVerified) {
        await storage.updatePage(page.id, {
          domainVerified: true,
          domainStatus: 'active',
          cloudflareHostnameStatus: status.status,
          cloudflareSslStatus: status.sslStatus
        } as any);
        console.log(`✅ Domain ${domain} marked as verified and active`);
      } else if (status.status !== page.cloudflareHostnameStatus || status.sslStatus !== page.cloudflareSslStatus) {
        await storage.updatePage(page.id, {
          cloudflareHostnameStatus: status.status,
          cloudflareSslStatus: status.sslStatus
        } as any);
      }
      
      res.json({
        success: true,
        isActive,
        status: status.status,
        sslStatus: status.sslStatus,
        errors: status.errors,
        message: isActive 
          ? 'Domain is active with HTTPS' 
          : 'Domain is pending SSL certificate issuance (usually takes 15-30 minutes)'
      });
    } catch (error: any) {
      console.error("Cloudflare status check error:", error);
      res.status(500).json({ message: error.message || "Failed to check Cloudflare status" });
    }
  });

  // Verify DNS records are actually set at Namecheap
  app.get("/api/domains/:domain/verify-dns", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      
      const page = await storage.getPageByDomain(domain);
      if (!page) {
        return res.status(404).json({ message: "Page not found for this domain" });
      }
      
      if (page.userId !== req.user.id) {
        return res.status(403).json({ message: "You do not own this domain" });
      }

      console.log(`🔍 Verifying DNS records for ${domain}...`);
      
      const actualRecords = await domainService.getDnsRecords(domain);
      
      const expectedTarget = page.cloudflareCnameTarget || RAILWAY_DOMAIN;
      
      const hasWwwCname = actualRecords.some(r => 
        r.name === 'www' && 
        r.type === 'CNAME' && 
        r.address.toLowerCase().includes(expectedTarget.toLowerCase())
      );
      
      const hasRootRecord = actualRecords.some(r => 
        r.name === '@' && 
        (r.type === 'ALIAS' || r.type === 'A')
      );
      
      const isConfigured = hasWwwCname && hasRootRecord;
      
      console.log(`   www CNAME: ${hasWwwCname ? '✅' : '❌'}`);
      console.log(`   Root record: ${hasRootRecord ? '✅' : '❌'}`);
      
      res.json({
        success: true,
        isConfigured,
        records: actualRecords,
        hasWwwCname,
        hasRootRecord,
        message: isConfigured 
          ? 'DNS records are properly configured' 
          : 'DNS records are missing or incorrect'
      });
    } catch (error: any) {
      console.error("DNS verification error:", error);
      res.status(500).json({ message: error.message || "Failed to verify DNS" });
    }
  });

  app.post("/api/domains/:domain/setup-complete", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      const { deploymentDomain } = req.body;

      if (!deploymentDomain) {
        return res.status(400).json({ message: "Deployment domain is required" });
      }

      // Verify user owns a page with this domain
      const pages = await storage.getUserPages(req.user.id);
      const page = pages.find(w => w.domain === domain);
      
      if (!page) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      console.log(`🔧 Starting complete domain setup for: ${domain}`);

      // Step 1: Register domain with Railway (both root and www) for automatic SSL
      if (railwayService.isConfigured()) {
        try {
          const wwwDomain = `www.${domain}`;
          console.log(`🚂 Registering ${domain} and ${wwwDomain} with Railway...`);
          await railwayService.addCustomDomain(domain);
          await railwayService.addCustomDomain(wwwDomain);
          console.log(`✓ Railway registration complete - SSL will be auto-generated`);
        } catch (error: any) {
          console.error(`⚠️  Railway registration failed: ${error.message}`);
          // Continue with DNS setup even if Railway fails
        }
      } else {
        console.log('⚠️  Railway not configured - skipping Railway registration');
      }

      // Step 2: Configure DNS records via Namecheap to point directly to Railway
      console.log(`📝 Setting up DNS records for ${domain}...`);
      
      // Railway DNS configuration:
      // - Root domain (@): ALIAS record pointing to Railway deployment
      // - www subdomain: CNAME pointing to Railway deployment domain
      const dnsRecords = [
        {
          name: '@',
          type: 'ALIAS',
          address: deploymentDomain,
          ttl: 300
        },
        {
          name: 'www',
          type: 'CNAME',
          address: deploymentDomain,
          ttl: 300
        }
      ];

      await domainService.setDnsRecords(domain, dnsRecords);
      console.log(`✓ DNS records configured to point to Railway`);

      // Step 3: Update page with configuration and status
      await storage.updatePage(page.id, { 
        domainStatus: 'propagating',
        cloudflareZoneId: null,
        cloudflareNameservers: null
      } as any);

      console.log(`✅ Complete domain setup finished for: ${domain}`);
      console.log(`   Railway will auto-generate SSL certificates within 5-10 minutes`);

      res.json({
        success: true,
        message: 'Domain successfully connected! Railway will generate SSL certificates automatically within 5-10 minutes.',
        dnsRecords: dnsRecords.map(r => ({
          type: r.type,
          name: r.name === '@' ? domain : `${r.name}.${domain}`,
          value: r.address
        })),
        instructions: [
          'DNS records have been automatically configured',
          'Railway is generating SSL certificates (5-10 minutes)',
          'Your domain will be fully secure once DNS propagates (up to 24 hours)'
        ]
      });
    } catch (error: any) {
      console.error('Domain setup error:', error.message);
      res.status(500).json({ message: error.message });
    }
  });


  // Update MX records for a domain
  app.post("/api/domains/:domain/mx-records", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      const { mxRecords } = req.body;

      if (!mxRecords || !Array.isArray(mxRecords)) {
        return res.status(400).json({ message: "MX records array is required" });
      }

      // Verify user owns a page with this domain
      const pages = await storage.getUserPages(req.user.id);
      const ownsDomain = pages.some(w => w.domain === domain);
      
      if (!ownsDomain) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      // Validate MX record structure
      for (const record of mxRecords) {
        if (!record.mailServer || typeof record.priority !== 'number') {
          return res.status(400).json({ 
            message: "Each MX record must have mailServer and priority" 
          });
        }
      }

      const success = await domainService.updateMxRecords(domain, mxRecords);
      res.json({ success });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Add a single MX record to a domain
  app.post("/api/domains/:domain/mx-records/add", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      const { mailServer, priority = 10, ttl = 1800 } = req.body;

      if (!mailServer) {
        return res.status(400).json({ message: "Mail server is required" });
      }

      // Verify user owns a page with this domain
      const pages = await storage.getUserPages(req.user.id);
      const ownsDomain = pages.some(w => w.domain === domain);
      
      if (!ownsDomain) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      const success = await domainService.addMxRecord(domain, mailServer, priority, ttl);
      res.json({ success });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Test email connection
  app.get('/api/test-email', async (req, res) => {
    try {
      const isConnected = await testEmailConnection();
      if (isConnected) {
        res.json({ success: true, message: 'Email connection successful' });
      } else {
        res.status(500).json({ success: false, message: 'Email connection failed' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Store customer onboarding data
  app.post('/api/store-onboarding-data', async (req, res) => {
    const { email, templateSelected, domainPreferences, customerInfo } = req.body;
    
    // Store this data temporarily (you could use a simple in-memory store or database)
    // For now, we'll store it in a simple object
    if (!(global as any).onboardingData) {
      (global as any).onboardingData = new Map();
    }
    
    (global as any).onboardingData.set(email, {
      templateSelected,
      domainPreferences,
      customerInfo,
      timestamp: new Date(),
    });
    
    res.json({ success: true });
  });

  // Create promotion code for existing coupon
  app.post('/api/create-promotion-code', async (req, res) => {
    const { couponId, code } = req.body;
    
    if (!couponId || !code) {
      return res.status(400).json({ error: 'Coupon ID and promotion code are required' });
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Payment processing not configured' });
    }

    try {
      const promotionCode = await stripe.promotionCodes.create({
        coupon: couponId,
        code: code,
        active: true,
      });
      
      res.json({
        success: true,
        promotionCode: {
          id: promotionCode.id,
          code: promotionCode.code,
          coupon: promotionCode.coupon,
        }
      });
    } catch (error: any) {
      console.error('Error creating promotion code:', error);
      res.status(400).json({ error: error.message });
    }
  });

  // Validate Stripe coupon code
  app.post('/api/validate-coupon', async (req, res) => {
    const { couponCode } = req.body;
    
    if (!couponCode) {
      return res.status(400).json({ error: 'Coupon code is required' });
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Payment processing not configured' });
    }

    try {
      console.log('Attempting to retrieve coupon:', couponCode);
      
      // First try as a promotion code (customer-facing code)
      try {
        const promotionCodes = await stripe.promotionCodes.list({
          code: couponCode,
          limit: 1,
        });
        
        if (promotionCodes.data.length > 0) {
          const promotionCode = promotionCodes.data[0];
          const coupon = await stripe.coupons.retrieve(promotionCode.coupon.id);
          
          if (coupon.valid && promotionCode.active) {
            console.log('Found valid promotion code:', promotionCode.code);
            return res.json({
              valid: true,
              coupon: {
                id: coupon.id,
                name: coupon.name,
                percent_off: coupon.percent_off,
                amount_off: coupon.amount_off,
                currency: coupon.currency,
              }
            });
          }
        }
      } catch (promoError) {
        console.log('No promotion code found, trying as direct coupon ID...');
      }
      
      // If no promotion code found, try as direct coupon ID
      const coupon = await stripe.coupons.retrieve(couponCode);
      console.log('Retrieved coupon directly:', JSON.stringify(coupon, null, 2));
      
      if (!coupon.valid) {
        console.log('Coupon is invalid or expired');
        return res.status(400).json({ error: 'Invalid or expired coupon' });
      }

      res.json({
        valid: true,
        coupon: {
          id: coupon.id,
          name: coupon.name,
          percent_off: coupon.percent_off,
          amount_off: coupon.amount_off,
          currency: coupon.currency,
        }
      });
    } catch (error: any) {
      console.error('Coupon validation error details:', {
        code: error.code,
        message: error.message,
        type: error.type,
        requested_coupon: couponCode
      });
      
      if (error.code === 'resource_missing') {
        return res.status(400).json({ error: 'Invalid coupon code - not found in your Stripe account' });
      }
      res.status(400).json({ error: 'Unable to validate coupon' });
    }
  });

  // Check promotion code unlimited status and create new unlimited coupon if needed
  app.post('/api/make-coupon-unlimited', async (req, res) => {
    const { promoCodeId } = req.body;
    
    if (!promoCodeId) {
      return res.status(400).json({ error: 'Promotion code ID is required' });
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Payment processing not configured' });
    }

    try {
      console.log('Checking promotion code:', promoCodeId);
      
      // Get the promotion code and underlying coupon
      const promotionCode = await stripe.promotionCodes.retrieve(promoCodeId);
      const originalCoupon = await stripe.coupons.retrieve(promotionCode.coupon.id);
      
      console.log('Original coupon details:', {
        id: originalCoupon.id,
        max_redemptions: originalCoupon.max_redemptions,
        times_redeemed: originalCoupon.times_redeemed
      });
      
      // Check if coupon is already unlimited
      if (originalCoupon.max_redemptions === null) {
        return res.json({
          success: true,
          message: 'Coupon is already unlimited',
          status: 'already_unlimited',
          coupon: {
            id: originalCoupon.id,
            name: originalCoupon.name,
            max_redemptions: originalCoupon.max_redemptions,
            times_redeemed: originalCoupon.times_redeemed,
          }
        });
      }
      
      // Create a new unlimited coupon with same properties
      const couponParams: any = {
        duration: originalCoupon.duration,
        // max_redemptions omitted = unlimited
      };
      
      if (originalCoupon.name) {
        couponParams.name = `${originalCoupon.name} (Unlimited)`;
      }
      if (originalCoupon.percent_off) {
        couponParams.percent_off = originalCoupon.percent_off;
      }
      if (originalCoupon.amount_off) {
        couponParams.amount_off = originalCoupon.amount_off;
      }
      if (originalCoupon.currency) {
        couponParams.currency = originalCoupon.currency;
      }
      if (originalCoupon.duration_in_months) {
        couponParams.duration_in_months = originalCoupon.duration_in_months;
      }
      
      const newUnlimitedCoupon = await stripe.coupons.create(couponParams);
      
      // Create a new promotion code for the unlimited coupon
      const newPromoCode = await stripe.promotionCodes.create({
        coupon: newUnlimitedCoupon.id,
        code: `${promotionCode.code}_UNLIMITED`,
        active: true,
        // max_redemptions omitted = unlimited
      });
      
      console.log('Created new unlimited promotion code:', newPromoCode.code);
      
      res.json({
        success: true,
        message: 'Created new unlimited coupon and promotion code',
        status: 'created_unlimited',
        original: {
          coupon_id: originalCoupon.id,
          promo_code: promotionCode.code,
          max_redemptions: originalCoupon.max_redemptions
        },
        new: {
          coupon_id: newUnlimitedCoupon.id,
          promo_code: newPromoCode.code,
          promo_id: newPromoCode.id,
          max_redemptions: null
        }
      });
    } catch (error: any) {
      console.error('Error handling unlimited coupon request:', error);
      
      if (error.code === 'resource_missing') {
        return res.status(400).json({ error: 'Promotion code not found in your Stripe account' });
      }
      
      res.status(500).json({ error: error.message || 'Unable to process coupon request' });
    }
  });

  // Create Stripe Checkout Session for page purchase
  app.post('/api/create-checkout-session', async (req, res) => {
    const { templateId } = req.body;
    
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const user = req.user as any;
    
    if (!templateId) {
      return res.status(400).json({ error: 'Template ID is required' });
    }

    // Super admins get free pages without payment - create page directly
    const isSuperAdmin = user.role === 'admin' || user.role === 'super_admin';
    
    if (isSuperAdmin) {
      try {
        console.log(`🎉 Super admin ${user.email} bypassing payment for template ${templateId}`);
        
        // Get template name
        const template = await storage.getTemplate(templateId);
        const templateName = template?.name || 'Unknown Template';
        
        // Create page directly with active subscription
        const page = await storage.createPage({
          userId: user.id,
          templateId,
          name: `${templateName} - ${new Date().toLocaleDateString()}`,
          subscriptionPlan: 'standard',
          subscriptionStatus: 'active'
        } as any);

        // Create default content
        await storage.createPageContent({
          pageId: page.id,
          businessName: "",
          tagline: "",
          aboutUs: "",
          phone: "",
          email: user.email,
          address: "",
        });

        console.log(`✓ Page ${page.id} created for super admin without payment`);

        // Return success with page ID - frontend will redirect appropriately
        const baseUrl = process.env.NODE_ENV === 'production' 
          ? `https://${process.env.REPLIT_DEV_DOMAIN}`
          : `http://localhost:${process.env.PORT || 5000}`;

        return res.json({ 
          url: `${baseUrl}/dashboard?new_page=${page.id}`,
          isSuperAdmin: true,
          pageId: page.id
        });
      } catch (error: any) {
        console.error('Super admin page creation error:', error);
        return res.status(500).json({ error: error.message });
      }
    }

    // Regular users go through Stripe checkout
    if (!stripe) {
      return res.status(500).json({ error: 'Payment processing not configured' });
    }

    try {
      // Get or create Stripe customer
      let customer;
      const existingCustomers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });
      
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: user.email,
          name: user.username || user.email,
        });
      }

      const baseUrl = process.env.NODE_ENV === 'production' 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : `http://localhost:${process.env.PORT || 5000}`;

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Page Setup - First Month',
                description: '$38 first month, then $18/month thereafter',
              },
              unit_amount: 3800, // $38 in cents
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/payment-processing?session_id={CHECKOUT_SESSION_ID}&templateId=${templateId}`,
        cancel_url: `${baseUrl}/templates/client-acquisition?cancelled=true`,
        metadata: {
          templateId: templateId.toString(),
          userId: user.id.toString(),
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error('Stripe Checkout Session error:', error);
      return res.status(400).json({ error: error.message });
    }
  });

  // Create Stripe Checkout Session for domain purchase
  app.post('/api/create-domain-checkout-session', async (req, res) => {
    const { domain, years = 1, pageId, contactInfo } = req.body;
    
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const user = req.user as any;
    
    if (!domain || !contactInfo || !pageId) {
      return res.status(400).json({ error: 'Domain, contact information, and page are required' });
    }

    // Verify the user owns a page and it's been paid for
    const page = await storage.getPage(pageId);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    if (page.userId !== user.id) {
      return res.status(403).json({ error: 'You do not own this page' });
    }
    if (page.subscriptionStatus !== 'active') {
      return res.status(403).json({ error: 'You must have an active page subscription before purchasing a domain' });
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Payment processing not configured' });
    }

    try {
      // Get the current price for this domain
      const pricing = await domainService.getPricing([domain]);
      if (pricing.length === 0) {
        return res.status(400).json({ error: 'Unable to get domain pricing' });
      }
      
      const domainPrice = pricing[0];
      
      // If domain is FREE, register it directly without payment
      if (domainPrice.isFree) {
        const result = await domainService.registerDomain(domain, years, contactInfo);
        
        if (result.success) {
          // Automatically configure DNS to point to DigitalOcean droplet (Caddy proxy)
          try {
            console.log(`🌐 Auto-configuring DNS for ${domain} → DigitalOcean droplet...`);
            
            // CRITICAL: Switch from parking nameservers to Namecheap Basic DNS
            // This is required for custom DNS records to actually work
            await domainService.setDefaultNameservers(domain);
            
            // Point both @ and www to the droplet IP
            await domainService.setDnsRecords(domain, [
              {
                name: '@',
                type: 'A',
                address: '134.199.194.110',
                ttl: 300
              },
              {
                name: 'www',
                type: 'A',
                address: '134.199.194.110',
                ttl: 300
              }
            ]);
            
            console.log(`✅ DNS auto-configured! Caddy proxy will auto-provision SSL.`);
            
            // Add domain to Caddy's on-demand TLS allowlist
            const caddyResult = await addDomainToAllowlist(domain);
            if (!caddyResult.success) {
              console.warn(`⚠️  Failed to add ${domain} to Caddy allowlist: ${caddyResult.error}`);
            }
            
            // Update page with successful domain configuration
            await storage.updatePage(pageId, { 
              domain, 
              domainVerified: false,
              domainStatus: 'dns_configured'
            } as any);
            
            return res.json({ 
              success: true, 
              isFree: true,
              message: 'Domain registered and DNS auto-configured! Your site will be live in 5-15 minutes with automatic SSL.',
              domain,
              dnsConfigured: true
            });
          } catch (error: any) {
            console.error(`⚠️  DNS configuration failed: ${error.message}`);
          }
          
          // Fallback: Update page with the purchased domain
          await storage.updatePage(pageId, { 
            domain, 
            domainVerified: false,
            domainStatus: 'pending'
          } as any);
          return res.json({ 
            success: true, 
            isFree: true,
            message: 'Domain registered successfully for free!',
            domain 
          });
        } else {
          return res.status(400).json({ error: 'Failed to register domain with registrar' });
        }
      }
      
      // Premium domain - create Stripe checkout
      const totalAmount = Math.round(domainPrice.price * 100); // Convert to cents

      // Get or create Stripe customer
      let customer;
      const existingCustomers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });
      
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: user.email,
          name: user.username || user.email,
        });
      }

      const baseUrl = process.env.NODE_ENV === 'production' 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : `http://localhost:${process.env.PORT || 5000}`;

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: domainPrice.currency.toLowerCase(),
              product_data: {
                name: `Domain Registration: ${domain}`,
                description: `${years} year${years > 1 ? 's' : ''} registration`,
              },
              unit_amount: totalAmount,
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/domain-payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/dashboard?domain_cancelled=true`,
        metadata: {
          domain,
          years: years.toString(),
          userId: user.id.toString(),
          pageId: pageId?.toString() || '',
          contactInfo: JSON.stringify(contactInfo),
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error('Stripe Domain Checkout Session error:', error);
      return res.status(400).json({ error: error.message });
    }
  });

  // Endpoint to update subscription with payment method after successful payment
  app.post('/api/update-subscription-payment', async (req, res) => {
    const { subscriptionId, paymentIntentId } = req.body;
    
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured' });
    }

    try {
      // Retrieve the payment intent to get the payment method
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (!paymentIntent.payment_method) {
        return res.status(400).json({ error: 'Payment method not found' });
      }

      // Update the subscription with the payment method
      await stripe.subscriptions.update(subscriptionId, {
        default_payment_method: paymentIntent.payment_method as string,
      });

      console.log(`Updated subscription ${subscriptionId} with payment method ${paymentIntent.payment_method}`);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error updating subscription payment method:', error);
      res.status(400).json({ error: error.message });
    }
  });

  // Blog routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ========== SECURE ADMIN DASHBOARD ROUTES ==========
  
  // Analytics routes
  app.get("/api/admin/analytics", isAdminAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const events = await storage.getAnalyticsEvents(limit);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/analytics/by-type/:eventType", isAdminAuthenticated, async (req, res) => {
    try {
      const events = await storage.getAnalyticsEventsByType(req.params.eventType);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/analytics/track", async (req, res) => {
    try {
      const eventData = insertAnalyticsEventSchema.parse(req.body);
      const event = await storage.createAnalyticsEvent({
        ...eventData,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent') || null,
      });
      res.status(201).json(event);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // SEO data routes
  app.get("/api/admin/seo", isAdminAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const seoData = await storage.getSeoData(limit);
      res.json(seoData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/seo/by-url", isAdminAuthenticated, async (req, res) => {
    try {
      const url = req.query.url as string;
      if (!url) {
        return res.status(400).json({ message: "URL parameter is required" });
      }
      const seoData = await storage.getSeoDataByUrl(url);
      res.json(seoData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/seo/track", async (req, res) => {
    try {
      const seoData = insertSeoDataSchema.parse(req.body);
      const data = await storage.createSeoData(seoData);
      res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Form submissions routes (secure dashboard access)
  app.get("/api/admin/form-submissions", isAdminAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getAllCustomSolutionInquiries();
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/admin/form-submissions/:id/status", isAdminAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const submission = await storage.updateCustomSolutionInquiryStatus(id, status);
      res.json(submission);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Dashboard analytics summary
  app.get("/api/admin/dashboard-summary", isAdminAuthenticated, async (req, res) => {
    try {
      const [recentEvents, recentSeo, recentSubmissions] = await Promise.all([
        storage.getAnalyticsEvents(50),
        storage.getSeoData(50),
        storage.getAllCustomSolutionInquiries()
      ]);

      // Calculate basic analytics
      const pageViews = recentEvents.filter(e => e.eventType === 'page_view').length;
      const uniqueVisitors = new Set(recentEvents.map(e => e.sessionId)).size;
      const organicTraffic = recentSeo.filter(s => s.organicTraffic).length;
      const pendingSubmissions = recentSubmissions.filter(s => s.status === 'new').length;

      res.json({
        pageViews,
        uniqueVisitors,
        organicTraffic,
        pendingSubmissions,
        totalSubmissions: recentSubmissions.length,
        recentEvents: recentEvents.slice(0, 10),
        recentSubmissions: recentSubmissions.slice(0, 5)
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Custom solution inquiries - UPDATED to email chad@fotype.com
  app.post("/api/custom-solution-inquiries", async (req, res) => {
    try {
      const inquiryData = insertCustomSolutionInquirySchema.parse(req.body);
      
      // Store inquiry in secure database
      const inquiry = await storage.createCustomSolutionInquiry(inquiryData);
      
      // Send email notification to chad@fotype.com
      try {
        await sendCustomSolutionInquiry({
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          company: inquiry.company,
          budgetRange: inquiry.budgetRange,
          exampleSites: inquiry.exampleSites || [],
          projectDetails: inquiry.projectDetails,
        });
        console.log('Custom solution inquiry email sent to chad@fotype.com');
      } catch (emailError) {
        console.error('Failed to send custom solution inquiry email:', emailError);
        // Don't fail the request if email fails - data is still securely stored
      }
      
      res.status(201).json({ success: true, inquiry });
    } catch (error: any) {
      console.error('Error creating custom solution inquiry:', error);
      res.status(400).json({ message: error.message });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "Name, email, and message are required" 
        });
      }
      
      // Send email notification to chad@landingpagesforagents.com
      const emailSent = await sendContactFormSubmission({
        name,
        email,
        phone: phone || null,
        message,
      });
      
      if (emailSent) {
        res.status(201).json({ 
          success: true, 
          message: "Thank you for contacting us! We'll get back to you soon." 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "There was an error sending your message. Please try again." 
        });
      }
    } catch (error: any) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred. Please try again later." 
      });
    }
  });

  // Fix existing failed subscriptions
  app.post('/api/fix-failed-subscriptions', async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured' });
    }

    try {
      const results = {
        processed: 0,
        fixed: 0,
        failed: 0,
        errors: [] as string[]
      };

      // Get subscriptions with payment issues
      const incompleteSubscriptions = await stripe.subscriptions.list({
        status: 'incomplete',
        limit: 100,
      });

      const pastDueSubscriptions = await stripe.subscriptions.list({
        status: 'past_due',
        limit: 100,
      });

      const allProblemSubscriptions = [...incompleteSubscriptions.data, ...pastDueSubscriptions.data];

      for (const subscription of allProblemSubscriptions) {
        results.processed++;
        
        try {
          // Find the first month payment intent for this customer
          const paymentIntents = await stripe.paymentIntents.list({
            customer: subscription.customer as string,
            limit: 20,
          });

          // Look for the $38 first month payment that succeeded
          const firstMonthPayment = paymentIntents.data.find(pi => 
            pi.amount === 3800 && 
            pi.status === 'succeeded'
          );

          if (!firstMonthPayment || !firstMonthPayment.payment_method) {
            results.errors.push(`No valid payment method found for customer ${subscription.customer}`);
            results.failed++;
            continue;
          }

          // Update the subscription with the payment method
          await stripe.subscriptions.update(subscription.id, {
            default_payment_method: firstMonthPayment.payment_method as string,
          });

          // Try to pay any failed invoices
          const invoices = await stripe.invoices.list({
            customer: subscription.customer as string,
            status: 'open',
            limit: 5,
          });

          for (const invoice of invoices.data) {
            if ((invoice as any).subscription === subscription.id) {
              try {
                await stripe.invoices.pay(invoice.id!);
                console.log(`Paid invoice ${invoice.id} for subscription ${subscription.id}`);
              } catch (payError: any) {
                console.log(`Failed to pay invoice ${invoice.id}: ${payError.message}`);
              }
            }
          }

          results.fixed++;
          console.log(`Fixed subscription ${subscription.id} for customer ${subscription.customer}`);

        } catch (error: any) {
          results.errors.push(`Error fixing subscription ${subscription.id}: ${error.message}`);
          results.failed++;
        }
      }

      res.json({
        success: true,
        results: results
      });

    } catch (error: any) {
      console.error('Error in fix-failed-subscriptions:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Get all client users (customers and admins, excluding super admins)
  app.get("/api/admin/client-users", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const sortBy = req.query.sortBy as string | undefined;
      const sortDir = req.query.sortDir as 'asc' | 'desc' | undefined;
      
      // Validate sortDir
      const validSortDir = sortDir === 'asc' || sortDir === 'desc' ? sortDir : undefined;
      
      const clients = await storage.getAllClientUsers(sortBy, validSortDir);
      res.json(clients);
    } catch (error: any) {
      console.error('Error fetching client users:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Impersonate a user (cannot impersonate other super admins)
  app.post("/api/admin/impersonate/:userId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const targetUserId = parseInt(req.params.userId);
      const targetUser = await storage.getUser(targetUserId);

      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Prevent impersonating other super admins
      if (targetUser.role === 'super_admin') {
        return res.status(403).json({ error: "Cannot impersonate other super admins" });
      }

      // Store original admin info in session before impersonating
      const originalAdminId = req.user.id;

      // Log the user in as the target user
      req.login(targetUser, (err) => {
        if (err) {
          console.error('Impersonation login error:', err);
          return res.status(500).json({ error: "Failed to impersonate user" });
        }
        
        // Set impersonation flags AFTER login
        req.session.originalAdminId = originalAdminId;
        req.session.isImpersonating = true;
        
        // Save session explicitly
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error('Session save error:', saveErr);
          }
          res.json({ success: true, user: targetUser });
        });
      });
    } catch (error: any) {
      console.error('Error impersonating user:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Stop impersonating and return to admin account
  app.post("/api/admin/stop-impersonating", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const originalAdminId = req.session.originalAdminId;
      
      if (!originalAdminId || !req.session.isImpersonating) {
        return res.status(400).json({ error: "Not currently impersonating" });
      }

      // Get the original admin user
      const adminUser = await storage.getUser(originalAdminId);
      
      if (!adminUser) {
        return res.status(404).json({ error: "Original admin user not found" });
      }

      // Log back in as the admin
      req.login(adminUser, (err) => {
        if (err) {
          console.error('Error returning to admin account:', err);
          return res.status(500).json({ error: "Failed to return to admin account" });
        }
        
        // Clear impersonation flags AFTER login
        delete req.session.originalAdminId;
        delete req.session.isImpersonating;
        
        // Save session explicitly
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error('Session save error:', saveErr);
          }
          res.json({ success: true, user: adminUser });
        });
      });
    } catch (error: any) {
      console.error('Error stopping impersonation:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get impersonation status
  app.get("/api/admin/impersonation-status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.json({ isImpersonating: false });
    }

    const isImpersonating = req.session.isImpersonating === true;
    
    if (isImpersonating) {
      res.json({
        isImpersonating: true,
        impersonatedUser: {
          id: req.user.id,
          username: req.user.username,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
        }
      });
    } else {
      res.json({ isImpersonating: false });
    }
  });

  // Super Admin: Create a new user with optional template/website
  app.post("/api/admin/create-user", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      // Validate request body with Zod
      const createUserRequestSchema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        templateId: z.string().optional().transform((val) => {
          if (!val || val === '' || val === 'none') return undefined;
          const parsed = parseInt(val, 10);
          if (isNaN(parsed)) throw new Error("templateId must be a valid number");
          return parsed;
        }),
      });

      const validationResult = createUserRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
      }

      const { firstName, lastName, email, templateId } = validationResult.data;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      const result = await storage.createUserWithOptionalWebsite({
        firstName,
        lastName,
        email,
        templateId,
      });

      res.json({
        success: true,
        user: result.user,
        websiteCreated: result.websiteCreated,
      });
    } catch (error: any) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Get all pages (for domain management)
  app.get("/api/admin/all-pages", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const pages = await storage.getAllPages();
      res.json(pages);
    } catch (error: any) {
      console.error('Error fetching all pages:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Fix domain auto-configuration (fetch Railway DNS targets)
  app.post("/api/admin/fix-domain/:domain", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const { domain } = req.params;
      
      console.log(`🔧 ADMIN: Fixing domain configuration for ${domain}...`);

      // Find the page with this domain
      const page = await storage.getPageByDomain(domain);
      if (!page) {
        return res.status(404).json({ error: "Page not found for this domain" });
      }

      if (!railwayService.isConfigured()) {
        return res.status(500).json({ error: "Railway API not configured" });
      }

      // Try to get DNS targets from Railway (domain should already be registered there)
      const wwwDomain = `www.${domain}`;
      console.log(`🚂 Fetching DNS targets from Railway for: ${domain} and ${wwwDomain}`);
      
      let rootDomainResult, wwwDomainResult;
      
      try {
        rootDomainResult = await railwayService.addCustomDomain(domain);
        console.log(`✓ ${domain} registered/verified with Railway`);
      } catch (error: any) {
        if (error.message?.includes('not available') || error.message?.includes('already exists')) {
          console.log(`ℹ️  ${domain} already registered with Railway, trying to fetch existing...`);
          rootDomainResult = { domain, id: 'existing', status: undefined };
        } else {
          throw error;
        }
      }
      
      try {
        wwwDomainResult = await railwayService.addCustomDomain(wwwDomain);
        console.log(`✓ ${wwwDomain} registered/verified with Railway`);
      } catch (error: any) {
        if (error.message?.includes('not available') || error.message?.includes('already exists')) {
          console.log(`ℹ️  ${wwwDomain} already registered with Railway`);
          wwwDomainResult = { domain: wwwDomain, id: 'existing', status: undefined };
        } else {
          throw error;
        }
      }

      // Extract DNS targets from Railway response
      let dnsRecords = [];
      if (rootDomainResult.status?.dnsRecords && rootDomainResult.status.dnsRecords.length > 0) {
        console.log(`✓ Railway provided fresh DNS targets`);
        const allRailwayRecords = [
          ...(rootDomainResult.status?.dnsRecords || []),
          ...(wwwDomainResult.status?.dnsRecords || [])
        ];
        dnsRecords = extractDnsRecordsFromRailway(allRailwayRecords, domain);

        // Configure DNS records
        console.log(`🌐 Updating DNS records at Namecheap for ${domain}...`);
        await domainService.setDnsRecords(domain, dnsRecords);
        console.log(`✓ DNS records updated`);

        // Update database with Railway DNS targets
        await storage.updatePage(page.id, { 
          domainVerified: true,
          domainStatus: 'auto_configured',
          railwayDnsTargets: serializeDnsRecords(dnsRecords)
        } as any);
        console.log(`✓ Database updated with Railway DNS targets`);

        res.json({ 
          success: true, 
          message: `Fixed ${domain} - DNS targets captured and configured`,
          dnsRecords
        });
      } else {
        // Railway didn't provide DNS targets
        console.error(`❌ Railway didn't provide DNS targets for ${domain}`);
        console.log(`   The domain exists in Railway but no verification targets were returned`);
        console.log(`   You may need to REMOVE the domain from Railway dashboard and re-add it`);
        
        res.status(500).json({ 
          error: 'Railway did not provide DNS verification targets. Try removing and re-adding the domain in Railway dashboard, then run this again.'
        });
      }
    } catch (error: any) {
      console.error('Error fixing domain:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Create a page for an existing user
  app.post("/api/admin/create-page-for-user", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const createPageSchema = z.object({
        userId: z.number().or(z.string().transform(Number)),
        templateId: z.number().or(z.string().transform(Number)),
        pageName: z.string().optional(),
        subscriptionPlan: z.string().optional().default('free'),
      });

      const validationResult = createPageSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
      }

      const { userId, templateId, pageName, subscriptionPlan } = validationResult.data;

      // Verify user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify template exists
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }

      // Create page
      const page = await storage.createPage({
        userId,
        templateId,
        name: pageName || `${template.name} - ${new Date().toLocaleDateString()}`,
        subscriptionPlan,
        subscriptionStatus: 'active',
      });

      // Create default page content
      await storage.createPageContent({
        pageId: page.id,
        businessName: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Your Business',
        tagline: 'Your tagline here',
        content: {},
        hiddenSections: [],
        isPublished: true,
      });

      res.json({
        success: true,
        page,
        template,
        user: { id: user.id, email: user.email, username: user.username }
      });
    } catch (error: any) {
      console.error('Error creating page for user:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Register all existing domains with Railway
  app.post("/api/admin/register-domains-railway", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      if (!railwayService.isConfigured()) {
        return res.status(500).json({ error: "Railway API not configured" });
      }

      // Get all pages with domains
      const allUsers = await storage.getAllUsers();
      const results = {
        total: 0,
        successful: 0,
        failed: 0,
        details: [] as Array<{ domain: string; status: string; error?: string }>,
      };

      for (const user of allUsers) {
        const pages = await storage.getUserPages(user.id);
        
        for (const page of pages) {
          if (page.domain) {
            results.total += 2; // root and www
            
            // Register root domain
            try {
              await railwayService.addCustomDomain(page.domain);
              results.successful++;
              results.details.push({ domain: page.domain, status: 'success' });
            } catch (error: any) {
              results.failed++;
              results.details.push({ domain: page.domain, status: 'failed', error: error.message });
            }
            
            // Register www subdomain
            try {
              const wwwDomain = `www.${page.domain}`;
              await railwayService.addCustomDomain(wwwDomain);
              results.successful++;
              results.details.push({ domain: wwwDomain, status: 'success' });
            } catch (error: any) {
              results.failed++;
              results.details.push({ domain: `www.${page.domain}`, status: 'failed', error: error.message });
            }
          }
        }
      }

      res.json(results);
    } catch (error: any) {
      console.error('Error registering domains with Railway:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Migrate existing domains from Cloudflare to Railway direct DNS
  app.post("/api/admin/migrate-domains-from-cloudflare", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const deploymentDomain = req.body.deploymentDomain || 'chad-lp4a-v2-production.up.railway.app';
      
      // Get all pages with domains
      const allUsers = await storage.getAllUsers();
      const results = {
        total: 0,
        successful: 0,
        failed: 0,
        skipped: 0,
        details: [] as Array<{ domain: string; status: string; error?: string; message?: string }>,
      };

      for (const user of allUsers) {
        const pages = await storage.getUserPages(user.id);
        
        for (const page of pages) {
          if (!page.domain) continue;
          
          const domain = page.domain;
          results.total++;
          
          try {
            console.log(`🔄 Migrating ${domain} from Cloudflare to Railway...`);
            
            // Step 1: Clear Cloudflare metadata
            await storage.updatePage(page.id, { 
              cloudflareZoneId: null,
              cloudflareNameservers: null,
              domainStatus: 'migrating'
            } as any);
            
            // Step 2: Register with Railway (both root and www)
            if (railwayService.isConfigured()) {
              try {
                await railwayService.addCustomDomain(domain);
                await railwayService.addCustomDomain(`www.${domain}`);
                console.log(`  ✓ Registered with Railway`);
              } catch (error: any) {
                if (!error.message.includes('already exists')) {
                  throw error;
                }
                console.log(`  ℹ Already registered with Railway`);
              }
            }
            
            // Step 3: Set DNS records via Namecheap to point to Railway
            const dnsRecords = [
              { name: '@', type: 'ALIAS', address: deploymentDomain, ttl: 300 },
              { name: 'www', type: 'CNAME', address: deploymentDomain, ttl: 300 }
            ];
            
            await domainService.setDnsRecords(domain, dnsRecords);
            console.log(`  ✓ DNS records updated to point to Railway`);
            
            // Step 4: Update page status
            await storage.updatePage(page.id, { 
              domainStatus: 'propagating'
            } as any);
            
            results.successful++;
            results.details.push({ 
              domain, 
              status: 'success',
              message: 'Migrated to Railway DNS. SSL will be generated within 5-10 minutes after DNS propagates.'
            });
            
            console.log(`  ✅ Migration complete for ${domain}`);
            
          } catch (error: any) {
            console.error(`  ❌ Migration failed for ${domain}:`, error.message);
            results.failed++;
            results.details.push({ domain, status: 'failed', error: error.message });
          }
        }
      }

      res.json({
        ...results,
        instructions: [
          'Domains have been migrated from Cloudflare to Railway direct DNS',
          'Railway will automatically generate SSL certificates within 5-10 minutes',
          'DNS propagation may take up to 24 hours',
          'Check Railway dashboard to verify SSL certificate status'
        ]
      });
    } catch (error: any) {
      console.error('Error migrating domains:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Bulk upload users from Excel file
  app.post("/api/admin/bulk-upload-users", upload.single('file'), async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Parse Excel file
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      if (!data || data.length === 0) {
        return res.status(400).json({ error: "Excel file is empty" });
      }

      const results = {
        total: data.length,
        successful: 0,
        failed: 0,
        errors: [] as Array<{ row: number; email: string; error: string }>,
      };

      // Process each row
      for (let i = 0; i < data.length; i++) {
        const row: any = data[i];
        const rowNumber = i + 2; // +2 because Excel is 1-indexed and row 1 is header

        try {
          // Extract data from row (case-insensitive column names)
          const email = row['Email'] || row['email'] || row['EMAIL'];
          const firstName = row['First Name'] || row['first name'] || row['FIRST NAME'] || row['FirstName'] || '';
          const lastName = row['Last Name'] || row['last name'] || row['LAST NAME'] || row['LastName'] || '';
          const templateValue = row['Template'] || row['template'] || row['TEMPLATE'] || '';

          // Validate email is present
          if (!email || typeof email !== 'string' || !email.includes('@')) {
            results.failed++;
            results.errors.push({
              row: rowNumber,
              email: email || 'N/A',
              error: 'Invalid or missing email address',
            });
            continue;
          }

          // Check if user already exists
          const existingUser = await storage.getUserByEmail(email);
          if (existingUser) {
            results.failed++;
            results.errors.push({
              row: rowNumber,
              email,
              error: 'User with this email already exists',
            });
            continue;
          }

          // Parse template ID
          let templateId: number | undefined = undefined;
          if (templateValue) {
            const parsedTemplate = parseInt(String(templateValue), 10);
            if (!isNaN(parsedTemplate) && parsedTemplate > 0) {
              templateId = parsedTemplate;
            }
          }

          // Create user
          await storage.createUserWithOptionalWebsite({
            firstName: String(firstName).trim() || email.split('@')[0],
            lastName: String(lastName).trim() || '',
            email: String(email).trim(),
            templateId,
          });

          results.successful++;
        } catch (error: any) {
          results.failed++;
          results.errors.push({
            row: rowNumber,
            email: row['Email'] || row['email'] || 'N/A',
            error: error.message || 'Unknown error',
          });
        }
      }

      res.json(results);
    } catch (error: any) {
      console.error('Error processing bulk upload:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Admin: Reset domain status to pending (for testing)
  app.post("/api/admin/domains/:domain/reset-status", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const { domain } = req.params;
      const page = await storage.getPageByDomain(domain);
      
      if (!page) {
        return res.status(404).json({ error: "Page not found for this domain" });
      }

      await storage.updatePage(page.id, { 
        domainStatus: 'pending',
        domainVerified: false
      } as any);

      console.log(`✓ Reset ${domain} status to 'pending'`);
      res.json({ success: true, message: "Domain status reset to pending" });
    } catch (error: any) {
      console.error('Error resetting domain status:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Update user status
  app.patch("/api/admin/users/:userId/status", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const userId = parseInt(req.params.userId);
      
      const updateStatusSchema = z.object({
        status: z.enum(['active', 'inactive']),
      });

      const validationResult = updateStatusSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
      }

      const { status } = validationResult.data;
      const updatedUser = await storage.updateUser(userId, { status });
      res.json({ success: true, user: updatedUser });
    } catch (error: any) {
      console.error('Error updating user status:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Super Admin: Update user billing status
  app.patch("/api/admin/users/:userId/billing-status", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: "Forbidden: Super admin access required" });
    }

    try {
      const userId = parseInt(req.params.userId);
      
      const updateBillingStatusSchema = z.object({
        billingStatus: z.enum(['current', 'past_due']),
      });

      const validationResult = updateBillingStatusSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
      }

      const { billingStatus } = validationResult.data;
      
      // Get user info before updating
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update billing status
      const updatedUser = await storage.updateUser(userId, { billingStatus });

      // Send email notification if set to past_due
      if (billingStatus === 'past_due') {
        const { sendAccountSuspensionEmail } = await import('./emailService.js');
        try {
          await sendAccountSuspensionEmail(user.email, user.firstName);
          console.log(`Account suspension email sent to ${user.email}`);
        } catch (emailError) {
          console.error('Failed to send suspension email:', emailError);
          // Don't fail the request if email fails
        }
      }

      res.json({ success: true, user: updatedUser });
    } catch (error: any) {
      console.error('Error updating user billing status:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Manual Caddy allowlist management endpoint (for fixing existing domains)
  app.post('/api/admin/caddy/add-domain', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    
    const user = req.user as any;
    if (user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Super admin access required' });
    }
    
    const { domain } = req.body;
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }
    
    try {
      const result = await addDomainToAllowlist(domain);
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Fix DNS for existing domain (switch to Namecheap Basic DNS and re-apply DNS records)
  app.post('/api/admin/fix-domain-dns', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    
    const user = req.user as any;
    if (user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Super admin access required' });
    }
    
    const { domain } = req.body;
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }
    
    try {
      console.log(`🔧 Fixing DNS for ${domain}...`);
      
      // Step 1: Switch to Namecheap Basic DNS
      await domainService.setDefaultNameservers(domain);
      
      // Step 2: Re-apply DNS records to droplet
      await domainService.setDnsRecords(domain, [
        {
          name: '@',
          type: 'A',
          address: '134.199.194.110',
          ttl: 300
        },
        {
          name: 'www',
          type: 'A',
          address: '134.199.194.110',
          ttl: 300
        }
      ]);
      
      // Step 3: Add to Caddy allowlist
      const caddyResult = await addDomainToAllowlist(domain);
      
      console.log(`✅ DNS fixed for ${domain}`);
      
      return res.json({
        success: true,
        message: `DNS fixed for ${domain}. Site should be live in 5-15 minutes.`,
        caddyAllowlist: caddyResult.success
      });
    } catch (error: any) {
      console.error(`❌ Failed to fix DNS for ${domain}:`, error);
      return res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
