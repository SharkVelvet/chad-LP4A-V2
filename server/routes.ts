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
import { sendCustomerNotification } from "./email";

// Initialize Stripe only if the secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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

  // Get website for current user's location
  app.get("/api/website", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    try {
      const website = await storage.getWebsiteByLocationId(req.user.locationId);
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      // Get content too
      const content = await storage.getWebsiteContent(website.id);
      res.json({ ...website, content });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
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

  // Store customer onboarding data
  app.post('/api/store-onboarding-data', async (req, res) => {
    const { email, templateSelected, domainPreferences, customerInfo } = req.body;
    
    // Store this data temporarily (you could use a simple in-memory store or database)
    // For now, we'll store it in a simple object
    if (!global.onboardingData) {
      global.onboardingData = new Map();
    }
    
    global.onboardingData.set(email, {
      templateSelected,
      domainPreferences,
      customerInfo,
      timestamp: new Date(),
    });
    
    res.json({ success: true });
  });

  // Stripe subscription route for guest checkout
  app.post('/api/create-subscription', async (req, res) => {
    const { email, customerName } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: { message: 'Email is required for receipts' } });
    }

    if (!stripe) {
      return res.status(500).json({ 
        error: { message: 'Payment processing requires valid Stripe API keys. Please contact support.' } 
      });
    }

    try {
      const customer = await stripe.customers.create({
        email: email,
        name: customerName || 'Website Customer',
      });

      // Create payment intent for first month ($38)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 3800, // $38 for first month
        currency: 'usd',
        customer: customer.id,
        description: 'Planright first month - Website setup and hosting',
        receipt_email: email,
        metadata: {
          type: 'first_month_payment',
          customer_email: email,
        },
      });

      // First create a product
      const product = await stripe.products.create({
        name: 'Planright Website Service',
      });

      // Then create a price for the product
      const price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: 1800, // $18 for ongoing months
        recurring: {
          interval: 'month',
        },
        product: product.id,
      });

      // Create the ongoing subscription starting next month ($18/month)
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: price.id,
        }],
        trial_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // Start billing in 30 days
      });
      
      // Get stored onboarding data and send customer notification email
      try {
        const onboardingData = global.onboardingData?.get(email) || {};
        
        await sendCustomerNotification({
          email: email,
          customerName: customerName,
          templateSelected: onboardingData.templateSelected,
          domainPreferences: onboardingData.domainPreferences,
          paymentAmount: 3800, // $38 first month
          subscriptionId: subscription.id,
          customerInfo: onboardingData.customerInfo,
        });
        
        // Clean up stored data after sending notification
        if (global.onboardingData) {
          global.onboardingData.delete(email);
        }
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the payment if email fails
      }

      res.send({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error('Stripe error:', error);
      return res.status(400).send({ error: { message: error.message } });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
