import { 
  users, 
  locations, 
  templates, 
  websites, 
  websiteContent, 
  formSubmissions,
  type User, 
  type InsertUser,
  type Location,
  type InsertLocation,
  type Template,
  type Website,
  type InsertWebsite,
  type WebsiteContent,
  type InsertWebsiteContent,
  type FormSubmission,
  type InsertFormSubmission
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
  createWebsite(website: InsertWebsite): Promise<Website>;
  updateWebsiteDomain(websiteId: number, domain: string): Promise<Website>;

  // Website content management
  getWebsiteContent(websiteId: number): Promise<WebsiteContent | undefined>;
  createWebsiteContent(content: InsertWebsiteContent): Promise<WebsiteContent>;
  updateWebsiteContent(websiteId: number, content: Partial<InsertWebsiteContent>): Promise<WebsiteContent>;

  // Form submissions
  getFormSubmissions(websiteId: number): Promise<FormSubmission[]>;
  createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission>;
  updateFormSubmissionStatus(id: number, status: string): Promise<FormSubmission>;

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
      locationId: website.locationId,
      templateId: website.templateId,
      subscriptionPlan: website.subscriptionPlan,
      domain: website.domain || null,
      domainPreferences: website.domainPreferences || null,
      isActive: website.isActive !== undefined ? website.isActive : true
    };
    
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
    const updateData = { ...content, updatedAt: new Date() };
    const [updatedContent] = await db
      .update(websiteContent)
      .set(updateData)
      .where(eq(websiteContent.websiteId, websiteId))
      .returning();
    return updatedContent;
  }

  // Form submissions
  async getFormSubmissions(websiteId: number): Promise<FormSubmission[]> {
    return await db
      .select()
      .from(formSubmissions)
      .where(eq(formSubmissions.websiteId, websiteId))
      .orderBy(desc(formSubmissions.submittedAt));
  }

  async createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission> {
    const [newSubmission] = await db
      .insert(formSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async updateFormSubmissionStatus(id: number, status: string): Promise<FormSubmission> {
    const [submission] = await db
      .update(formSubmissions)
      .set({ status })
      .where(eq(formSubmissions.id, id))
      .returning();
    return submission;
  }
}

export const storage = new DatabaseStorage();
