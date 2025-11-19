import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const SECTION_KEYS = ["hero", "about", "services", "why-we-serve", "testimonials", "contact", "footer"] as const;
export type SectionKey = typeof SECTION_KEYS[number];

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  locationId: integer("location_id").references(() => locations.id),
  role: text("role").notNull().default("customer"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  status: text("status").notNull().default("active"),
  billingStatus: text("billing_status").notNull().default("current"),
  lastLoginAt: timestamp("last_login_at"),
  otpCode: text("otp_code"),
  otpExpiry: timestamp("otp_expiry"),
  otpAttempts: integer("otp_attempts").default(0),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  previewImage: text("preview_image").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  locationId: integer("location_id").references(() => locations.id),
  templateId: integer("template_id").notNull().references(() => templates.id),
  name: text("name").notNull(),
  domain: text("domain"),
  domainVerified: boolean("domain_verified").notNull().default(false),
  domainStatus: text("domain_status").default("pending"), // pending, propagating, active
  domainPreferences: jsonb("domain_preferences").$type<string[]>(),
  railwayDnsTargets: jsonb("railway_dns_targets").$type<Array<{name: string, type: string, address: string}>>(),
  cloudflareCustomHostnameId: text("cloudflare_custom_hostname_id"),
  cloudflareHostnameStatus: text("cloudflare_hostname_status"),
  cloudflareSslStatus: text("cloudflare_ssl_status"),
  cloudflareCnameTarget: text("cloudflare_cname_target"),
  cloudflareZoneId: text("cloudflare_zone_id"),
  cloudflareNameservers: jsonb("cloudflare_nameservers").$type<string[]>(),
  route53ZoneId: text("route53_zone_id"),
  route53Nameservers: jsonb("route53_nameservers").$type<string[]>(),
  acmCertificateArn: text("acm_certificate_arn"),
  awsCertificateStatus: text("aws_certificate_status"),
  subscriptionPlan: text("subscription_plan").notNull(),
  subscriptionStatus: text("subscription_status").notNull().default("active"),
  primaryColor: text("primary_color").default("#000000"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id").notNull().references(() => pages.id),
  businessName: text("business_name"),
  tagline: text("tagline"),
  aboutUs: text("about_us"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  heroImage: text("hero_image"),
  logo: text("logo"),
  galleryImages: jsonb("gallery_images").$type<string[]>(),
  content: jsonb("content").$type<Record<string, string>>().notNull().default({}),
  hiddenSections: jsonb("hidden_sections").$type<string[]>().notNull().default([]),
  isPublished: boolean("is_published").notNull().default(false),
  maintenanceMode: boolean("maintenance_mode").notNull().default(false),
  publishedAt: timestamp("published_at"),
  formEnabled: boolean("form_enabled").notNull().default(false),
  formProvider: text("form_provider"),
  formEmbedCode: text("form_embed_code"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id").notNull().references(() => pages.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  onScreenKeywords: jsonb("on_screen_keywords").$type<string[]>(),
  offScreenKeywords: jsonb("off_screen_keywords").$type<string[]>(),
  isPublished: boolean("is_published").notNull().default(true),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const customSolutionInquiries = pgTable("custom_solution_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  budgetRange: text("budget_range").notNull(),
  monthlyRetainer: boolean("monthly_retainer").default(false),
  exampleSites: jsonb("example_sites").$type<string[]>(),
  projectDetails: text("project_details").notNull(),
  status: text("status").notNull().default("new"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

// Analytics tracking table
export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  userId: text("user_id"),
  eventType: text("event_type").notNull(), // page_view, click, form_submission, etc.
  eventData: jsonb("event_data").$type<Record<string, any>>(),
  url: text("url").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  country: text("country"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// SEO data tracking table
export const seoData = pgTable("seo_data", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  pageTitle: text("page_title"),
  metaDescription: text("meta_description"),
  keywords: jsonb("keywords").$type<string[]>(),
  searchQuery: text("search_query"),
  referrer: text("referrer"),
  organicTraffic: boolean("organic_traffic").default(false),
  rank: integer("rank"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// Dashboard admin users table
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Domain registrant information (required for Namecheap)
export const domainRegistrants = pgTable("domain_registrants", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id").notNull().references(() => pages.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address1: text("address_1").notNull(),
  address2: text("address_2"),
  city: text("city").notNull(),
  stateProvince: text("state_province").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  clientIp: text("client_ip"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Domain provisioning jobs queue
export const domainJobs = pgTable("domain_jobs", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id").notNull().references(() => pages.id),
  domain: text("domain").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  step: text("step").notNull().default("register"), // register, configure_dns, provision_ssl, complete
  attempts: integer("attempts").notNull().default(0),
  maxAttempts: integer("max_attempts").notNull().default(5),
  lastError: text("last_error"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  scheduledFor: timestamp("scheduled_for"),
});

// Relations
export const locationsRelations = relations(locations, ({ many }) => ({
  users: many(users),
  pages: many(pages),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  location: one(locations, {
    fields: [users.locationId],
    references: [locations.id],
  }),
  pages: many(pages),
}));

export const templatesRelations = relations(templates, ({ many }) => ({
  pages: many(pages),
}));

export const pagesRelations = relations(pages, ({ one, many }) => ({
  user: one(users, {
    fields: [pages.userId],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [pages.locationId],
    references: [locations.id],
  }),
  template: one(templates, {
    fields: [pages.templateId],
    references: [templates.id],
  }),
  content: one(pageContent),
  formSubmissions: many(formSubmissions),
}));

export const pageContentRelations = relations(pageContent, ({ one }) => ({
  page: one(pages, {
    fields: [pageContent.pageId],
    references: [pages.id],
  }),
}));

export const formSubmissionsRelations = relations(formSubmissions, ({ one }) => ({
  page: one(pages, {
    fields: [formSubmissions.pageId],
    references: [pages.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
  createdAt: true,
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  userId: true,
  locationId: true,
  domainVerified: true,
  subscriptionStatus: true,
  primaryColor: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  domain: z.string().optional(),
  domainPreferences: z.array(z.string()).optional(),
});

export const insertPageContentSchema = createInsertSchema(pageContent).omit({
  id: true,
  updatedAt: true,
  publishedAt: true,
}).extend({
  hiddenSections: z.array(z.enum(SECTION_KEYS)).optional(),
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
  updatedAt: true,
});

export const insertCustomSolutionInquirySchema = createInsertSchema(customSolutionInquiries).omit({
  id: true,
  submittedAt: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  timestamp: true,
});

export const insertSeoDataSchema = createInsertSchema(seoData).omit({
  id: true,
  timestamp: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  lastLogin: true,
  createdAt: true,
});

export const insertDomainRegistrantSchema = createInsertSchema(domainRegistrants).omit({
  id: true,
  createdAt: true,
});

export const insertDomainJobSchema = createInsertSchema(domainJobs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type PageContent = typeof pageContent.$inferSelect;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type CustomSolutionInquiry = typeof customSolutionInquiries.$inferSelect;
export type InsertCustomSolutionInquiry = z.infer<typeof insertCustomSolutionInquirySchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type SeoData = typeof seoData.$inferSelect;
export type InsertSeoData = z.infer<typeof insertSeoDataSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type DomainRegistrant = typeof domainRegistrants.$inferSelect;
export type InsertDomainRegistrant = z.infer<typeof insertDomainRegistrantSchema>;
export type DomainJob = typeof domainJobs.$inferSelect;
export type InsertDomainJob = z.infer<typeof insertDomainJobSchema>;
