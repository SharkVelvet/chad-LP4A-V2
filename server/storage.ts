import { 
  users, 
  locations, 
  templates, 
  websites, 
  websiteContent,
  blogPosts,
  customSolutionInquiries,
  analyticsEvents,
  seoData,
  adminUsers,
  type User, 
  type InsertUser,
  type Location,
  type InsertLocation,
  type Template,
  type Website,
  type InsertWebsite,
  type WebsiteContent,
  type InsertWebsiteContent,
  type BlogPost,
  type InsertBlogPost,
  type CustomSolutionInquiry,
  type InsertCustomSolutionInquiry,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type SeoData,
  type InsertSeoData,
  type AdminUser,
  type InsertAdminUser,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User>;

  // Location management
  getLocation(id: number): Promise<Location | undefined>;
  getLocationByCode(code: string): Promise<Location | undefined>;
  getAllLocations(): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;

  // Template management
  getAllTemplates(): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;

  // Website management
  getWebsiteByLocationId(locationId: number): Promise<Website | undefined>;
  getUserWebsites(userId: number): Promise<Website[]>;
  getWebsite(id: number): Promise<Website | undefined>;
  createWebsite(website: InsertWebsite): Promise<Website>;
  updateWebsite(websiteId: number, data: Partial<InsertWebsite>): Promise<Website>;
  updateWebsiteDomain(websiteId: number, domain: string): Promise<Website>;
  deleteWebsite(websiteId: number): Promise<void>;

  // Website content management
  getWebsiteContent(websiteId: number): Promise<WebsiteContent | undefined>;
  createWebsiteContent(content: InsertWebsiteContent): Promise<WebsiteContent>;
  updateWebsiteContent(websiteId: number, content: Partial<InsertWebsiteContent>): Promise<WebsiteContent>;
  publishWebsiteContent(websiteId: number): Promise<WebsiteContent>;

  // Blog management
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;

  // Custom solution inquiries
  createCustomSolutionInquiry(inquiry: InsertCustomSolutionInquiry): Promise<CustomSolutionInquiry>;
  getAllCustomSolutionInquiries(): Promise<CustomSolutionInquiry[]>;
  updateCustomSolutionInquiryStatus(id: number, status: string): Promise<CustomSolutionInquiry>;

  // Analytics management
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(limit?: number): Promise<AnalyticsEvent[]>;
  getAnalyticsEventsByDateRange(startDate: Date, endDate: Date): Promise<AnalyticsEvent[]>;
  getAnalyticsEventsByType(eventType: string): Promise<AnalyticsEvent[]>;

  // SEO data management
  createSeoData(seoData: InsertSeoData): Promise<SeoData>;
  getSeoData(limit?: number): Promise<SeoData[]>;
  getSeoDataByUrl(url: string): Promise<SeoData[]>;
  getSeoDataByDateRange(startDate: Date, endDate: Date): Promise<SeoData[]>;

  // Admin user management
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUserLastLogin(id: number): Promise<AdminUser>;
  getAllAdminUsers(): Promise<AdminUser[]>;

  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId 
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Location management
  async getLocation(id: number): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.id, id));
    return location || undefined;
  }

  async getLocationByCode(code: string): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.code, code));
    return location || undefined;
  }

  async getAllLocations(): Promise<Location[]> {
    return await db.select().from(locations).where(eq(locations.isActive, true));
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const [newLocation] = await db
      .insert(locations)
      .values(location)
      .returning();
    return newLocation;
  }

  // Template management
  async getAllTemplates(): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.isActive, true));
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template || undefined;
  }

  // Website management
  async getWebsiteByLocationId(locationId: number): Promise<Website | undefined> {
    const [website] = await db.select().from(websites).where(eq(websites.locationId, locationId));
    return website || undefined;
  }

  async createWebsite(website: InsertWebsite): Promise<Website> {
    const websiteData = {
      userId: website.userId,
      locationId: website.locationId || null,
      templateId: website.templateId,
      name: website.name,
      subscriptionPlan: website.subscriptionPlan,
      subscriptionStatus: website.subscriptionStatus || 'active',
      domain: website.domain || null,
      domainVerified: website.domainVerified || false,
      domainPreferences: website.domainPreferences || null,
      primaryColor: website.primaryColor || '#000000',
      isActive: website.isActive !== undefined ? website.isActive : true
    } as any;
    
    const [newWebsite] = await db
      .insert(websites)
      .values(websiteData)
      .returning();
    return newWebsite;
  }

  async updateWebsiteDomain(websiteId: number, domain: string): Promise<Website> {
    const [website] = await db
      .update(websites)
      .set({ domain })
      .where(eq(websites.id, websiteId))
      .returning();
    return website;
  }

  async getUserWebsites(userId: number): Promise<Website[]> {
    return await db.select().from(websites).where(eq(websites.userId, userId));
  }

  async getWebsite(id: number): Promise<Website | undefined> {
    const [website] = await db.select().from(websites).where(eq(websites.id, id));
    return website || undefined;
  }

  async updateWebsite(websiteId: number, data: Partial<InsertWebsite>): Promise<Website> {
    const updateData = { ...data, updatedAt: new Date() } as any;
    const [website] = await db
      .update(websites)
      .set(updateData)
      .where(eq(websites.id, websiteId))
      .returning();
    return website;
  }

  async deleteWebsite(websiteId: number): Promise<void> {
    await db.delete(websites).where(eq(websites.id, websiteId));
  }

  // Website content management
  async getWebsiteContent(websiteId: number): Promise<WebsiteContent | undefined> {
    const [content] = await db.select().from(websiteContent).where(eq(websiteContent.websiteId, websiteId));
    return content || undefined;
  }

  async createWebsiteContent(content: InsertWebsiteContent): Promise<WebsiteContent> {
    const contentData = {
      websiteId: content.websiteId,
      businessName: content.businessName || null,
      tagline: content.tagline || null,
      aboutUs: content.aboutUs || null,
      phone: content.phone || null,
      email: content.email || null,
      address: content.address || null,
      heroImage: content.heroImage || null,
      logo: content.logo || null,
      galleryImages: content.galleryImages || null
    };
    
    const [newContent] = await db
      .insert(websiteContent)
      .values(contentData)
      .returning();
    return newContent;
  }

  async updateWebsiteContent(websiteId: number, content: Partial<InsertWebsiteContent>): Promise<WebsiteContent> {
    const updateData = { ...content, updatedAt: new Date() } as any;
    const [updatedContent] = await db
      .update(websiteContent)
      .set(updateData)
      .where(eq(websiteContent.websiteId, websiteId))
      .returning();
    return updatedContent;
  }

  async publishWebsiteContent(websiteId: number): Promise<WebsiteContent> {
    const [publishedContent] = await db
      .update(websiteContent)
      .set({ isPublished: true, publishedAt: new Date(), updatedAt: new Date() })
      .where(eq(websiteContent.websiteId, websiteId))
      .returning();
    return publishedContent;
  }

  // Blog management
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(and(eq(blogPosts.id, id), eq(blogPosts.isPublished, true)));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const updateData = { ...post, updatedAt: new Date() };
    const [updatedPost] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  // Custom solution inquiries
  async createCustomSolutionInquiry(inquiry: InsertCustomSolutionInquiry): Promise<CustomSolutionInquiry> {
    const [newInquiry] = await db
      .insert(customSolutionInquiries)
      .values(inquiry)
      .returning();
    return newInquiry;
  }

  async getAllCustomSolutionInquiries(): Promise<CustomSolutionInquiry[]> {
    return await db.select().from(customSolutionInquiries).orderBy(desc(customSolutionInquiries.submittedAt));
  }

  async updateCustomSolutionInquiryStatus(id: number, status: string): Promise<CustomSolutionInquiry> {
    const [updatedInquiry] = await db
      .update(customSolutionInquiries)
      .set({ status })
      .where(eq(customSolutionInquiries.id, id))
      .returning();
    return updatedInquiry;
  }

  // Analytics management
  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [newEvent] = await db
      .insert(analyticsEvents)
      .values(event)
      .returning();
    return newEvent;
  }

  async getAnalyticsEvents(limit: number = 1000): Promise<AnalyticsEvent[]> {
    return await db.select().from(analyticsEvents).orderBy(desc(analyticsEvents.timestamp)).limit(limit);
  }

  async getAnalyticsEventsByDateRange(startDate: Date, endDate: Date): Promise<AnalyticsEvent[]> {
    return await db.select().from(analyticsEvents)
      .where(and(
        eq(analyticsEvents.timestamp, startDate),
        eq(analyticsEvents.timestamp, endDate)
      ))
      .orderBy(desc(analyticsEvents.timestamp));
  }

  async getAnalyticsEventsByType(eventType: string): Promise<AnalyticsEvent[]> {
    return await db.select().from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, eventType))
      .orderBy(desc(analyticsEvents.timestamp));
  }

  // SEO data management
  async createSeoData(seoDataInput: InsertSeoData): Promise<SeoData> {
    const [newSeoData] = await db
      .insert(seoData)
      .values(seoDataInput)
      .returning();
    return newSeoData;
  }

  async getSeoData(limit: number = 1000): Promise<SeoData[]> {
    return await db.select().from(seoData).orderBy(desc(seoData.timestamp)).limit(limit);
  }

  async getSeoDataByUrl(url: string): Promise<SeoData[]> {
    return await db.select().from(seoData)
      .where(eq(seoData.url, url))
      .orderBy(desc(seoData.timestamp));
  }

  async getSeoDataByDateRange(startDate: Date, endDate: Date): Promise<SeoData[]> {
    return await db.select().from(seoData)
      .where(and(
        eq(seoData.timestamp, startDate),
        eq(seoData.timestamp, endDate)
      ))
      .orderBy(desc(seoData.timestamp));
  }

  // Admin user management
  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user || undefined;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return user || undefined;
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const [user] = await db
      .insert(adminUsers)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateAdminUserLastLogin(id: number): Promise<AdminUser> {
    const [user] = await db
      .update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, id))
      .returning();
    return user;
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers).where(eq(adminUsers.isActive, true));
  }
}

export const storage = new DatabaseStorage();
