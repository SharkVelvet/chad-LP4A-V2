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
import { sendCustomerNotification, sendCustomerReceipt, testEmailConnection, sendCustomSolutionInquiry, sendContactFormSubmission } from "./email";
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
      });

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

  // Stripe subscription route for guest checkout
  app.post('/api/create-subscription', async (req, res) => {
    const { email, customerName, couponCode, contractAgreed, disclaimerAgreed } = req.body;
    
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
      console.log('Checking coupon code:', couponCode);
      if (couponCode) {
        try {
          // Try to find as a promotion code first (most common case)
          console.log('Looking up promotion code:', couponCode);
          const promotionCodes = await stripe.promotionCodes.list({
            code: couponCode,
            active: true,
            limit: 1,
          });

          if (promotionCodes.data.length > 0) {
            const promotionCode = promotionCodes.data[0];
            console.log('Found promotion code. Coupon details:', promotionCode.coupon);
            
            // The coupon property contains the full coupon object
            if (promotionCode.coupon && promotionCode.coupon.valid) {
              discountInfo = promotionCode.coupon;
              console.log('Using coupon from promotion code. Amount off:', discountInfo.amount_off, 'Percent off:', discountInfo.percent_off);
            }
          } else {
            console.log('No promotion code found with name:', couponCode);
            // Try direct coupon lookup as fallback
            try {
              const coupon = await stripe.coupons.retrieve(couponCode);
              console.log('Retrieved coupon directly from Stripe:', coupon);
              if (coupon.valid) {
                discountInfo = coupon;
              }
            } catch (directError: any) {
              console.log('Direct coupon lookup also failed:', directError.message);
            }
          }
        } catch (error: any) {
          console.error('Error during coupon lookup:', couponCode, error.message);
        }
      }

      // Calculate discounted amount for first month
      let firstMonthAmount = 3800; // $38 default
      console.log('Original amount (cents):', firstMonthAmount);
      
      if (discountInfo) {
        console.log('Applying discount:', discountInfo);
        if (discountInfo.percent_off) {
          firstMonthAmount = Math.round(firstMonthAmount * (1 - discountInfo.percent_off / 100));
          console.log('Applied percent discount, new amount:', firstMonthAmount);
        } else if (discountInfo.amount_off) {
          firstMonthAmount = Math.max(0, firstMonthAmount - discountInfo.amount_off);
          console.log('Applied amount discount, new amount:', firstMonthAmount);
        }
      } else {
        console.log('No discount applied');
      }
      
      console.log('Final payment intent amount (cents):', firstMonthAmount);

      let paymentIntent;
      if (firstMonthAmount === 0) {
        // For $0 amounts, create a setup intent that REQUIRES payment method collection
        console.log('Creating setup intent for $0 charge - REQUIRING payment method for future billing');
        paymentIntent = await stripe.setupIntents.create({
          customer: customer.id,
          payment_method_types: ['card'],
          usage: 'off_session',
          confirm: false, // Require frontend confirmation with payment method
          metadata: {
            type: 'zero_dollar_setup_required',
            customer_email: email,
            original_amount: '3800',
            discount_applied: discountInfo ? couponCode : 'none',
            requires_payment_method: 'true',
          },
        });
        
        // For zero-dollar payments, we'll manually send receipt since Stripe won't
        console.log('Zero-dollar payment - will send manual receipt after payment method collected');
      } else {
        // Create payment intent for non-zero amounts
        paymentIntent = await stripe.paymentIntents.create({
          amount: firstMonthAmount,
          currency: 'usd',
          customer: customer.id,
          description: 'Planright first month - Website setup and hosting',
          receipt_email: email,
          setup_future_usage: 'off_session',
          payment_method_types: ['card'], // Only allow credit cards
          metadata: {
            type: 'first_month_payment',
            customer_email: email,
            original_amount: '3800',
            discount_applied: discountInfo ? couponCode : 'none',
          },
        });
      }

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
      // IMPORTANT: Force incomplete state to REQUIRE payment method collection even for $0 first payments
      const subscriptionOptions: any = {
        customer: customer.id,
        items: [{
          price: price.id,
        }],
        trial_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // Start billing in 30 days
        collection_method: 'charge_automatically',
        payment_behavior: 'default_incomplete', // Forces payment method requirement
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          first_payment_intent: paymentIntent.id,
          first_payment_amount: firstMonthAmount.toString(),
          requires_payment_method: 'true', // Track that this subscription MUST have payment method
        },
      };

      // Apply coupon to recurring subscription if provided and valid
      // Note: For subscriptions, discounts only apply to ongoing billing, not the first payment
      // The first payment discount is already handled in the payment intent above
      if (discountInfo) {
        subscriptionOptions.discounts = [{
          coupon: discountInfo.id
        }];
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
          paymentAmount: firstMonthAmount / 100, // Convert from cents to dollars for display
          subscriptionId: subscription.id,
          customerInfo: onboardingData.customerInfo,
          contractAgreed: contractAgreed,
          disclaimerAgreed: disclaimerAgreed,
        };

        console.log('Email data being sent:', {
          originalAmount: 3800,
          discountedAmount: firstMonthAmount,
          dollarAmount: firstMonthAmount / 100,
          couponCode: couponCode,
          discountInfo: discountInfo
        });

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
