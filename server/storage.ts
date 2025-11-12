import { 
  users, 
  locations, 
  templates, 
  pages, 
  pageContent,
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
  type InsertTemplate,
  type Page,
  type InsertPage,
  type PageContent,
  type InsertPageContent,
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
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db.js";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(userId: number, data: Partial<User>): Promise<User>;
  updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User>;

  // Location management
  getLocation(id: number): Promise<Location | undefined>;
  getLocationByCode(code: string): Promise<Location | undefined>;
  getAllLocations(): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;

  // Template management
  getAllTemplates(): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  createTemplatesBulk(templates: InsertTemplate[]): Promise<void>;

  // Page management
  getPageByLocationId(locationId: number): Promise<Page | undefined>;
  getUserPages(userId: number): Promise<Page[]>;
  getPage(id: number): Promise<Page | undefined>;
  getPageByDomain(domain: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(pageId: number, data: Partial<InsertPage>): Promise<Page>;
  updatePageDomain(pageId: number, domain: string): Promise<Page>;
  deletePage(pageId: number): Promise<void>;

  // Page content management
  getPageContent(pageId: number): Promise<PageContent | undefined>;
  createPageContent(content: InsertPageContent): Promise<PageContent>;
  updatePageContent(pageId: number, content: Partial<InsertPageContent>): Promise<PageContent>;
  updateFlexibleContent(pageId: number, contentId: string, value: string): Promise<PageContent>;
  publishPageContent(pageId: number): Promise<PageContent>;

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

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(data as any)
      .where(eq(users.id, userId))
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

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const [newTemplate] = await db.insert(templates).values(template).returning();
    return newTemplate;
  }

  async createTemplatesBulk(templateList: InsertTemplate[]): Promise<void> {
    if (templateList.length === 0) return;
    await db.insert(templates).values(templateList).onConflictDoNothing({ target: templates.slug });
  }

  // Page management
  async getPageByLocationId(locationId: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.locationId, locationId));
    return page || undefined;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const pageData = {
      userId: page.userId,
      locationId: page.locationId || null,
      templateId: page.templateId,
      name: page.name,
      subscriptionPlan: page.subscriptionPlan,
      subscriptionStatus: page.subscriptionStatus || 'active',
      domain: page.domain || null,
      domainVerified: page.domainVerified || false,
      domainPreferences: page.domainPreferences || null,
      primaryColor: page.primaryColor || '#000000',
      isActive: page.isActive !== undefined ? page.isActive : true
    } as any;
    
    const [newPage] = await db
      .insert(pages)
      .values(pageData)
      .returning();
    return newPage;
  }

  async updatePageDomain(pageId: number, domain: string): Promise<Page> {
    const [page] = await db
      .update(pages)
      .set({ domain })
      .where(eq(pages.id, pageId))
      .returning();
    return page;
  }

  async getUserPages(userId: number): Promise<Page[]> {
    const pagesData = await db.select().from(pages).where(eq(pages.userId, userId));
    
    // Fetch content for each page
    const pagesWithContent = await Promise.all(
      pagesData.map(async (page) => {
        const content = await this.getPageContent(page.id);
        return {
          ...page,
          content
        };
      })
    );
    
    return pagesWithContent as any;
  }

  async getPage(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPageByDomain(domain: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.domain, domain));
    return page || undefined;
  }

  async updatePage(pageId: number, data: Partial<InsertPage>): Promise<Page> {
    const updateData = { ...data, updatedAt: new Date() } as any;
    const [page] = await db
      .update(pages)
      .set(updateData)
      .where(eq(pages.id, pageId))
      .returning();
    return page;
  }

  async deletePage(pageId: number): Promise<void> {
    await db.delete(pages).where(eq(pages.id, pageId));
  }

  // Page content management
  async getPageContent(pageId: number): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContent).where(eq(pageContent.pageId, pageId));
    return content || undefined;
  }

  async createPageContent(content: InsertPageContent): Promise<PageContent> {
    const contentData = {
      pageId: content.pageId,
      businessName: content.businessName || null,
      tagline: content.tagline || null,
      aboutUs: content.aboutUs || null,
      phone: content.phone || null,
      email: content.email || null,
      address: content.address || null,
      heroImage: content.heroImage || null,
      logo: content.logo || null,
      galleryImages: content.galleryImages || null,
      content: content.content || {}  // Initialize flexible content field
    };
    
    const [newContent] = await db
      .insert(pageContent)
      .values(contentData)
      .returning();
    return newContent;
  }

  async updatePageContent(pageId: number, content: Partial<InsertPageContent>): Promise<PageContent> {
    const updateData = { ...content, updatedAt: new Date() } as any;
    const [updatedContent] = await db
      .update(pageContent)
      .set(updateData)
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return updatedContent;
  }

  async updateFlexibleContent(pageId: number, contentId: string, value: string): Promise<PageContent> {
    // Get current content
    const currentContent = await this.getPageContent(pageId);
    const flexibleContent = (currentContent?.content as Record<string, string>) || {};
    
    // Update the specific content ID
    flexibleContent[contentId] = value;
    
    // Save back to database
    const [updatedContent] = await db
      .update(pageContent)
      .set({ content: flexibleContent, updatedAt: new Date() })
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return updatedContent;
  }

  async publishPageContent(pageId: number): Promise<PageContent> {
    const [publishedContent] = await db
      .update(pageContent)
      .set({ isPublished: true, publishedAt: new Date(), updatedAt: new Date() })
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return publishedContent;
  }

  async unpublishPageContent(pageId: number): Promise<PageContent> {
    const [unpublishedContent] = await db
      .update(pageContent)
      .set({ isPublished: false, updatedAt: new Date() })
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return unpublishedContent;
  }

  async setMaintenanceMode(pageId: number, enabled: boolean): Promise<PageContent> {
    const [updatedContent] = await db
      .update(pageContent)
      .set({ maintenanceMode: enabled, updatedAt: new Date() })
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return updatedContent;
  }

  async enableFormEmbed(pageId: number): Promise<PageContent> {
    const [updatedContent] = await db
      .update(pageContent)
      .set({ formEnabled: true, updatedAt: new Date() })
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return updatedContent;
  }

  async saveFormEmbed(pageId: number, formProvider: string, formEmbedCode: string): Promise<PageContent> {
    const [updatedContent] = await db
      .update(pageContent)
      .set({ 
        formProvider, 
        formEmbedCode,
        updatedAt: new Date() 
      })
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return updatedContent;
  }

  async disableFormEmbed(pageId: number): Promise<PageContent> {
    const [updatedContent] = await db
      .update(pageContent)
      .set({ 
        formEnabled: false,
        formProvider: null,
        formEmbedCode: null,
        updatedAt: new Date() 
      })
      .where(eq(pageContent.pageId, pageId))
      .returning();
    return updatedContent;
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
