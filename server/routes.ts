import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { setupAdminAuth, isAdminAuthenticated } from "./adminAuth";
import Stripe from "stripe";
import { 
  insertWebsiteSchema, 
  insertWebsiteContentSchema,
  insertBlogPostSchema,
  insertCustomSolutionInquirySchema,
  insertAnalyticsEventSchema,
  insertSeoDataSchema
} from "@shared/schema";
import { sendCustomerNotification, sendCustomerReceipt, testEmailConnection, sendCustomSolutionInquiry } from "./email";
import { validatePassword } from "./passwords";

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

  // Password validation endpoint
  app.post("/api/validate-password", async (req, res) => {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ valid: false, message: "Password is required" });
    }
    
    const isValid = validatePassword(password);
    res.json({ valid: isValid });
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
      const coupon = await stripe.coupons.retrieve(couponCode);
      
      if (!coupon.valid) {
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
      if (error.code === 'resource_missing') {
        return res.status(400).json({ error: 'Invalid coupon code' });
      }
      console.error('Coupon validation error:', error);
      res.status(400).json({ error: 'Unable to validate coupon' });
    }
  });

  // Stripe subscription route for guest checkout
  app.post('/api/create-subscription', async (req, res) => {
    const { email, customerName, couponCode } = req.body;
    
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

      // Apply coupon discount if provided
      let discountInfo = null;
      if (couponCode) {
        try {
          const coupon = await stripe.coupons.retrieve(couponCode);
          if (coupon.valid) {
            discountInfo = coupon;
          }
        } catch (error) {
          console.warn('Invalid coupon code provided:', couponCode);
        }
      }

      // Calculate discounted amount for first month
      let firstMonthAmount = 3800; // $38 default
      if (discountInfo) {
        if (discountInfo.percent_off) {
          firstMonthAmount = Math.round(firstMonthAmount * (1 - discountInfo.percent_off / 100));
        } else if (discountInfo.amount_off) {
          firstMonthAmount = Math.max(0, firstMonthAmount - discountInfo.amount_off);
        }
      }

      // Create payment intent for first month with discount applied
      const paymentIntent = await stripe.paymentIntents.create({
        amount: firstMonthAmount,
        currency: 'usd',
        customer: customer.id,
        description: 'Planright first month - Website setup and hosting',
        receipt_email: email,
        setup_future_usage: 'off_session',
        metadata: {
          type: 'first_month_payment',
          customer_email: email,
          original_amount: '3800',
          discount_applied: discountInfo ? couponCode : 'none',
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
      // The subscription will be created in incomplete state until payment method is attached
      const subscriptionOptions: any = {
        customer: customer.id,
        items: [{
          price: price.id,
        }],
        trial_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // Start billing in 30 days
        collection_method: 'charge_automatically',
        payment_behavior: 'default_incomplete',
        metadata: {
          first_payment_intent: paymentIntent.id,
        },
      };

      // Apply coupon to recurring subscription if provided and valid
      if (discountInfo) {
        subscriptionOptions.coupon = couponCode;
      }

      const subscription = await stripe.subscriptions.create(subscriptionOptions);
      
      // Get stored onboarding data and send customer notification email
      try {
        const onboardingData = (global as any).onboardingData?.get(email) || {};
        console.log('Retrieved onboarding data for email:', email, onboardingData);
        
        const customerData = {
          email: email,
          customerName: customerName,
          templateSelected: onboardingData.templateSelected || 'Not specified',
          domainPreferences: onboardingData.domainPreferences || [],
          paymentAmount: 38, // $38 first month
          subscriptionId: subscription.id,
          customerInfo: onboardingData.customerInfo,
        };

        // Send notification to business owner
        await sendCustomerNotification(customerData);
        
        // Send receipt to customer
        await sendCustomerReceipt(customerData);
        
        // Clean up stored data after sending notification
        if ((global as any).onboardingData) {
          (global as any).onboardingData.delete(email);
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
        errors: []
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
