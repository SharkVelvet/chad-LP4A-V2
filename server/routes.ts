import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import Stripe from "stripe";
import { 
  insertWebsiteSchema, 
  insertWebsiteContentSchema, 
  insertFormSubmissionSchema 
} from "@shared/schema";

// Initialize Stripe only if the secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

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

  // Website routes
  app.get("/api/website", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const website = await storage.getWebsiteByLocationId(req.user.locationId);
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      const content = await storage.getWebsiteContent(website.id);
      res.json({ ...website, content });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/website", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { templateId, domainPreferences, subscriptionPlan } = insertWebsiteSchema.parse(req.body);
      
      // Check if website already exists for this location
      const existingWebsite = await storage.getWebsiteByLocationId(req.user.locationId);
      if (existingWebsite) {
        return res.status(400).json({ message: "Website already exists for this location" });
      }

      const website = await storage.createWebsite({
        locationId: req.user.locationId,
        templateId,
        domainPreferences,
        subscriptionPlan,
      });

      // Create default content
      await storage.createWebsiteContent({
        websiteId: website.id,
        businessName: "",
        tagline: "",
        aboutUs: "",
        phone: "",
        email: "",
        address: "",
      });

      res.status(201).json(website);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Website content routes
  app.put("/api/website/content", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const website = await storage.getWebsiteByLocationId(req.user.locationId);
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      const contentData = insertWebsiteContentSchema.partial().parse(req.body);
      const updatedContent = await storage.updateWebsiteContent(website.id, contentData);
      
      res.json(updatedContent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Form submission routes
  app.get("/api/form-submissions", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const website = await storage.getWebsiteByLocationId(req.user.locationId);
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      const submissions = await storage.getFormSubmissions(website.id);
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/form-submissions", async (req, res) => {
    try {
      const submissionData = insertFormSubmissionSchema.parse(req.body);
      const submission = await storage.createFormSubmission(submissionData);
      res.status(201).json(submission);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/form-submissions/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const submission = await storage.updateFormSubmissionStatus(parseInt(id), status);
      res.json(submission);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Stripe subscription route
  app.post('/api/create-subscription', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    if (!stripe) {
      return res.status(500).json({ 
        error: { message: 'Payment processing not configured. Please contact support.' } 
      });
    }

    let user = req.user;

    if (user.stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        const invoice = subscription.latest_invoice;
        
        res.send({
          subscriptionId: subscription.id,
          clientSecret: typeof invoice === 'object' && invoice?.payment_intent && 
            typeof invoice.payment_intent === 'object' ? 
            invoice.payment_intent.client_secret : null,
        });
        return;
      } catch (error: any) {
        return res.status(400).send({ error: { message: error.message } });
      }
    }
    
    if (!user.email) {
      return res.status(400).json({ error: { message: 'No user email on file' } });
    }

    try {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });

      const { plan = 'basic' } = req.body;
      const priceId = plan === 'professional' ? 
        process.env.STRIPE_PROFESSIONAL_PRICE_ID : 
        process.env.STRIPE_BASIC_PRICE_ID;

      if (!priceId) {
        return res.status(500).json({ error: { message: 'Stripe price ID not configured' } });
      }

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      await storage.updateUserStripeInfo(user.id, customer.id, subscription.id);
      
      const invoice = subscription.latest_invoice;
      res.send({
        subscriptionId: subscription.id,
        clientSecret: typeof invoice === 'object' && invoice?.payment_intent && 
          typeof invoice.payment_intent === 'object' ? 
          invoice.payment_intent.client_secret : null,
      });
    } catch (error: any) {
      return res.status(400).send({ error: { message: error.message } });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
