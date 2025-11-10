import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage.js";
import { setupAuth } from "./auth.js";
import { setupAdminAuth, isAdminAuthenticated } from "./adminAuth.js";
import Stripe from "stripe";
import { 
  insertWebsiteSchema, 
  insertWebsiteContentSchema,
  insertBlogPostSchema,
  insertCustomSolutionInquirySchema,
  insertAnalyticsEventSchema,
  insertSeoDataSchema
} from "../shared/schema.js";
import { sendCustomerNotification, sendCustomerReceipt, testEmailConnection, sendCustomSolutionInquiry, sendContactFormSubmission } from "./email.js";
import { validatePassword } from "./passwords.js";
import { domainService } from "./domainService.js";
import { cloudflareService } from "./cloudflareService.js";

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

  // Public API - Get website by custom domain (no authentication required)
  app.get("/api/public/website-by-domain/:domain", async (req, res) => {
    try {
      const domain = req.params.domain;
      const website = await storage.getWebsiteByDomain(domain);
      
      if (!website) {
        return res.status(404).json({ message: "Website not found for this domain" });
      }

      // Get website content
      const content = await storage.getWebsiteContent(website.id);
      
      // Get template information
      const template = await storage.getTemplate(website.templateId);

      res.json({ 
        website,
        content,
        template
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
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
      const bcrypt = await import('bcryptjs');
      
      // Check if admin user already exists
      const existingUser = await storage.getUserByEmail('chad@fotype.com');
      
      if (existingUser) {
        return res.status(400).json({ 
          message: "Admin user already exists",
          username: existingUser.username,
          email: existingUser.email
        });
      }
      
      // Create admin user
      const hashedPassword = await bcrypt.default.hash('password', 10);
      const user = await storage.createUser({
        username: 'testtwo',
        email: 'chad@fotype.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      res.json({ 
        success: true,
        message: "Admin user created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        credentials: {
          username: 'testtwo',
          password: 'password'
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

  // Website routes - multi-website support
  // Get all websites for current user
  app.get("/api/websites", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websites = await storage.getUserWebsites(req.user.id);
      res.json(websites);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get a specific website by ID
  app.get("/api/websites/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const website = await storage.getWebsite(parseInt(req.params.id));
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      // Verify ownership
      if (website.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const content = await storage.getWebsiteContent(website.id);
      res.json({ ...website, content });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new website
  app.post("/api/websites", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { templateId, name, subscriptionPlan, domainPreferences } = insertWebsiteSchema.parse(req.body);

      const website = await storage.createWebsite({
        userId: req.user.id,
        templateId,
        name,
        subscriptionPlan,
        domainPreferences,
      } as any);

      // Create default content
      await storage.createWebsiteContent({
        websiteId: website.id,
        businessName: "",
        tagline: "",
        aboutUs: "",
        phone: "",
        email: req.user.email,
        address: "",
      });

      res.status(201).json(website);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update website settings
  app.put("/api/websites/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const updateData = insertWebsiteSchema.partial().parse(req.body);
      const updatedWebsite = await storage.updateWebsite(websiteId, updateData);
      
      res.json(updatedWebsite);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a website
  app.delete("/api/websites/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      await storage.deleteWebsite(websiteId);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Website content routes
  app.put("/api/websites/:id/content", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const contentData = insertWebsiteContentSchema.partial().parse(req.body);
      const updatedContent = await storage.updateWebsiteContent(websiteId, contentData);
      
      res.json(updatedContent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update flexible content by ID
  app.patch("/api/websites/:id/content/:contentId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const contentId = req.params.contentId;
      const { value } = req.body;

      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const updatedContent = await storage.updateFlexibleContent(websiteId, contentId, value);
      
      res.json(updatedContent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Publish website content
  app.post("/api/websites/:id/publish", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const publishedContent = await storage.publishWebsiteContent(websiteId);
      res.json(publishedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Unpublish website content
  app.post("/api/websites/:id/unpublish", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const unpublishedContent = await storage.unpublishWebsiteContent(websiteId);
      res.json(unpublishedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Set maintenance mode
  app.post("/api/websites/:id/maintenance", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const { enabled } = req.body;
      
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const updatedContent = await storage.setMaintenanceMode(websiteId, enabled);
      res.json(updatedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Enable form embedding
  app.post("/api/websites/:id/enable-form", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const updatedContent = await storage.enableFormEmbed(websiteId);
      res.json(updatedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Save form embed configuration
  app.post("/api/websites/:id/save-form", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const { formProvider, formEmbedCode } = req.body;
      
      if (!formProvider || !formEmbedCode) {
        return res.status(400).json({ message: "Form provider and embed code are required" });
      }

      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const updatedContent = await storage.saveFormEmbed(websiteId, formProvider, formEmbedCode);
      res.json(updatedContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Disable form embedding
  app.post("/api/websites/:id/disable-form", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const websiteId = parseInt(req.params.id);
      const website = await storage.getWebsite(websiteId);
      
      if (!website || website.userId !== req.user.id) {
        return res.status(404).json({ message: "Website not found" });
      }

      const updatedContent = await storage.disableFormEmbed(websiteId);
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
      const { domains, websiteId } = req.body;
      
      if (!domains || !Array.isArray(domains) || domains.length === 0) {
        return res.status(400).json({ message: "Domains array is required" });
      }
      
      if (!websiteId) {
        return res.status(400).json({ message: "Website ID is required" });
      }

      // Verify the user owns an active paid website
      const website = await storage.getWebsite(websiteId);
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }
      if (website.userId !== req.user.id) {
        return res.status(403).json({ message: "You do not own this website" });
      }
      if (website.subscriptionStatus !== 'active') {
        return res.status(403).json({ message: "You must have an active website subscription to search for domains" });
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
      const { domains, websiteId } = req.body;
      
      if (!domains || !Array.isArray(domains) || domains.length === 0) {
        return res.status(400).json({ message: "Domains array is required" });
      }
      
      if (!websiteId) {
        return res.status(400).json({ message: "Website ID is required" });
      }

      // Verify the user owns an active paid website
      const website = await storage.getWebsite(websiteId);
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }
      if (website.userId !== req.user.id) {
        return res.status(403).json({ message: "You do not own this website" });
      }
      if (website.subscriptionStatus !== 'active') {
        return res.status(403).json({ message: "You must have an active website subscription to view domain pricing" });
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
      const { domain, years, websiteId, contactInfo } = session.metadata as any;
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

      if (result.success && websiteId) {
        // Update website with the purchased domain
        await storage.updateWebsite(parseInt(websiteId), { domain, domainVerified: false } as any);
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
      
      // Verify user owns a website with this domain
      const websites = await storage.getUserWebsites(req.user.id);
      const ownsDomain = websites.some(w => w.domain === domain);
      
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

      // Verify user owns a website with this domain
      const websites = await storage.getUserWebsites(req.user.id);
      const website = websites.find(w => w.domain === domain);
      
      if (!website) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      const success = await domainService.setDnsRecords(domain, records);
      
      // Update domain status to 'propagating' after DNS configuration
      if (success) {
        await storage.updateWebsite(website.id, { domainStatus: 'propagating' });
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
      
      // Verify user owns a website with this domain
      const websites = await storage.getUserWebsites(req.user.id);
      const website = websites.find(w => w.domain === domain);
      
      if (!website) {
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
        if (website.domainStatus === 'propagating') {
          await storage.updateWebsite(website.id, { domainStatus: 'active' });
        }
      } catch {
        // Domain doesn't resolve yet, still propagating
        isActive = false;
      }

      res.json({ 
        isActive, 
        status: isActive ? 'active' : website.domainStatus || 'pending' 
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Cloudflare integration routes
  app.post("/api/domains/:domain/cloudflare/setup", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      const { replitDeploymentDomain } = req.body;

      if (!replitDeploymentDomain) {
        return res.status(400).json({ message: "Replit deployment domain is required" });
      }

      // Verify user owns a website with this domain
      const websites = await storage.getUserWebsites(req.user.id);
      const website = websites.find(w => w.domain === domain);
      
      if (!website) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      // Setup domain in Cloudflare
      const result = await cloudflareService.setupDomainForReplit(domain, replitDeploymentDomain);

      // Update Namecheap nameservers to point to Cloudflare
      await domainService.setNameservers(domain, result.nameservers);

      // Update website with Cloudflare information and status
      await storage.updateWebsite(website.id, { 
        domainStatus: 'propagating',
        cloudflareZoneId: result.zone.id,
        cloudflareNameservers: result.nameservers
      } as any);

      res.json({
        success: true,
        zone: result.zone,
        nameservers: result.nameservers,
        dnsRecords: result.dnsRecords
      });
    } catch (error: any) {
      console.error('Cloudflare setup error:', error.message);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/domains/:domain/cloudflare/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { domain } = req.params;
      
      // Verify user owns a website with this domain
      const websites = await storage.getUserWebsites(req.user.id);
      const website = websites.find(w => w.domain === domain);
      
      if (!website) {
        return res.status(403).json({ message: "You don't own this domain" });
      }

      const status = await cloudflareService.getZoneStatus(domain);
      res.json(status);
    } catch (error: any) {
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

      // Verify user owns a website with this domain
      const websites = await storage.getUserWebsites(req.user.id);
      const ownsDomain = websites.some(w => w.domain === domain);
      
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

      // Verify user owns a website with this domain
      const websites = await storage.getUserWebsites(req.user.id);
      const ownsDomain = websites.some(w => w.domain === domain);
      
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

  // Create Stripe Checkout Session for website purchase
  app.post('/api/create-checkout-session', async (req, res) => {
    const { templateId } = req.body;
    
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const user = req.user as any;
    
    if (!templateId) {
      return res.status(400).json({ error: 'Template ID is required' });
    }

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
                name: 'Website Setup - First Month',
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
    const { domain, years = 1, websiteId, contactInfo } = req.body;
    
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const user = req.user as any;
    
    if (!domain || !contactInfo || !websiteId) {
      return res.status(400).json({ error: 'Domain, contact information, and website are required' });
    }

    // Verify the user owns a website and it's been paid for
    const website = await storage.getWebsite(websiteId);
    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }
    if (website.userId !== user.id) {
      return res.status(403).json({ error: 'You do not own this website' });
    }
    if (website.subscriptionStatus !== 'active') {
      return res.status(403).json({ error: 'You must have an active website subscription before purchasing a domain' });
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
          // Update website with the purchased domain
          await storage.updateWebsite(websiteId, { domain, domainVerified: false } as any);
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
          websiteId: websiteId?.toString() || '',
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

  const httpServer = createServer(app);

  return httpServer;
}
