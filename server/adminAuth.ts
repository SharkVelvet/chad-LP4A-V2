import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage.js";
import { AdminUser as SelectAdminUser } from "../shared/schema.js";

declare global {
  namespace Express {
    interface User extends SelectAdminUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Middleware to check if user is authenticated admin (includes both admin and super_admin)
export function isAdminAuthenticated(req: any, res: any, next: any) {
  if (!req.isAuthenticated() || !req.user || (req.user.role !== 'admin' && req.user.role !== 'super_admin')) {
    return res.status(401).json({ message: "Unauthorized - Admin access required" });
  }
  next();
}

// Middleware to check if user is super admin (highest privileges)
export function isSuperAdminAuthenticated(req: any, res: any, next: any) {
  if (!req.isAuthenticated() || !req.user || req.user.role !== 'super_admin') {
    return res.status(403).json({ message: "Forbidden - Super Admin access required" });
  }
  next();
}

export function setupAdminAuth(app: Express) {
  // Admin authentication strategy (separate namespace)
  passport.use(
    "admin-local",
    new LocalStrategy(async (username, password, done) => {
      const adminUser = await storage.getAdminUserByUsername(username);
      if (!adminUser || !adminUser.isActive || !(await comparePasswords(password, adminUser.password))) {
        return done(null, false);
      } else {
        // Update last login
        await storage.updateAdminUserLastLogin(adminUser.id);
        return done(null, adminUser);
      }
    })
  );

  // Admin login route
  app.post("/api/admin/login", passport.authenticate("admin-local"), (req, res) => {
    res.status(200).json({ 
      success: true, 
      user: { 
        id: req.user.id, 
        username: req.user.username, 
        email: req.user.email, 
        role: req.user.role 
      } 
    });
  });

  // Admin logout route
  app.post("/api/admin/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });

  // Get current admin user
  app.get("/api/admin/user", isAdminAuthenticated, (req, res) => {
    res.json({ 
      id: req.user.id, 
      username: req.user.username, 
      email: req.user.email, 
      role: req.user.role,
      lastLogin: req.user.lastLogin
    });
  });

  // Create first admin user (only if no admin users exist)
  app.post("/api/admin/setup", async (req, res) => {
    try {
      const existingAdmins = await storage.getAllAdminUsers();
      if (existingAdmins.length > 0) {
        return res.status(400).json({ message: "Admin users already exist" });
      }

      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
      }

      const hashedPassword = await hashPassword(password);
      const adminUser = await storage.createAdminUser({
        username,
        email,
        password: hashedPassword,
        role: "admin",
        isActive: true,
      });

      res.status(201).json({ 
        success: true, 
        message: "Admin user created successfully",
        user: { 
          id: adminUser.id, 
          username: adminUser.username, 
          email: adminUser.email 
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}

export { hashPassword, comparePasswords };