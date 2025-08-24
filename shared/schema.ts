import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
  locationId: integer("location_id").notNull().references(() => locations.id),
  role: text("role").notNull().default("employee"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
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

export const websites = pgTable("websites", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  templateId: integer("template_id").notNull().references(() => templates.id),
  domain: text("domain"),
  domainPreferences: jsonb("domain_preferences").$type<string[]>(),
  subscriptionPlan: text("subscription_plan").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const websiteContent = pgTable("website_content", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").notNull().references(() => websites.id),
  businessName: text("business_name"),
  tagline: text("tagline"),
  aboutUs: text("about_us"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  heroImage: text("hero_image"),
  logo: text("logo"),
  galleryImages: jsonb("gallery_images").$type<string[]>(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").notNull().references(() => websites.id),
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

// Relations
export const locationsRelations = relations(locations, ({ many }) => ({
  users: many(users),
  websites: many(websites),
}));

export const usersRelations = relations(users, ({ one }) => ({
  location: one(locations, {
    fields: [users.locationId],
    references: [locations.id],
  }),
}));

export const templatesRelations = relations(templates, ({ many }) => ({
  websites: many(websites),
}));

export const websitesRelations = relations(websites, ({ one, many }) => ({
  location: one(locations, {
    fields: [websites.locationId],
    references: [locations.id],
  }),
  template: one(templates, {
    fields: [websites.templateId],
    references: [templates.id],
  }),
  content: one(websiteContent),
  formSubmissions: many(formSubmissions),
}));

export const websiteContentRelations = relations(websiteContent, ({ one }) => ({
  website: one(websites, {
    fields: [websiteContent.websiteId],
    references: [websites.id],
  }),
}));

export const formSubmissionsRelations = relations(formSubmissions, ({ one }) => ({
  website: one(websites, {
    fields: [formSubmissions.websiteId],
    references: [websites.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
});

export const insertWebsiteSchema = createInsertSchema(websites).omit({
  id: true,
  createdAt: true,
});

export const insertWebsiteContentSchema = createInsertSchema(websiteContent).omit({
  id: true,
  updatedAt: true,
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

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Template = typeof templates.$inferSelect;
export type Website = typeof websites.$inferSelect;
export type InsertWebsite = z.infer<typeof insertWebsiteSchema>;
export type WebsiteContent = typeof websiteContent.$inferSelect;
export type InsertWebsiteContent = z.infer<typeof insertWebsiteContentSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type CustomSolutionInquiry = typeof customSolutionInquiries.$inferSelect;
export type InsertCustomSolutionInquiry = z.infer<typeof insertCustomSolutionInquirySchema>;
