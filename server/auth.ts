import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { generateOTP, getOTPExpiry, sendOTPEmail } from "./emailService";

declare global {
  namespace Express {
    interface User extends SelectUser {}
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

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'your-session-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create user with hashed password but not verified yet
      const user = await storage.createUser({
        username,
        email,
        password: await hashPassword(password),
        role: "customer",
      });

      // Generate and store OTP
      const otpCode = generateOTP();
      const otpExpiry = getOTPExpiry();
      
      await storage.updateUser(user.id, {
        otpCode,
        otpExpiry,
        otpAttempts: 0,
      });

      // Send OTP email
      await sendOTPEmail(email, otpCode, 'signup');

      res.status(200).json({ 
        message: "Verification code sent to your email",
        userId: user.id,
        email: user.email,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(500).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      // Try to find user by username first, then by email
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.getUserByEmail(username);
      }
      
      if (!user || !(await comparePasswords(password, user.password))) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Generate and store OTP
      const otpCode = generateOTP();
      const otpExpiry = getOTPExpiry();
      
      await storage.updateUser(user.id, {
        otpCode,
        otpExpiry,
        otpAttempts: 0,
      });

      // Send OTP email
      await sendOTPEmail(user.email, otpCode, 'login');

      res.status(200).json({ 
        message: "Verification code sent to your email",
        userId: user.id,
        email: user.email,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: error.message || "Login failed" });
    }
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  app.post("/api/verify-otp", async (req, res, next) => {
    try {
      const { userId, otpCode } = req.body;

      if (!userId || !otpCode) {
        return res.status(400).json({ message: "User ID and OTP code are required" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if OTP has expired
      if (!user.otpExpiry || new Date() > new Date(user.otpExpiry)) {
        return res.status(400).json({ message: "Verification code has expired" });
      }

      // Check if too many attempts
      if (user.otpAttempts && user.otpAttempts >= 3) {
        return res.status(400).json({ message: "Too many failed attempts. Please request a new code." });
      }

      // Verify OTP code
      if (user.otpCode !== otpCode) {
        await storage.updateUser(userId, {
          otpAttempts: (user.otpAttempts || 0) + 1,
        });
        return res.status(400).json({ message: "Invalid verification code" });
      }

      // OTP is valid - mark user as verified and clear OTP data
      await storage.updateUser(userId, {
        emailVerified: true,
        otpCode: null,
        otpExpiry: null,
        otpAttempts: 0,
      });

      // Log the user in
      req.login(user, (err) => {
        if (err) {
          console.error("Login error after OTP verification:", err);
          return next(err);
        }
        res.status(200).json({ 
          message: "Verification successful",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      });
    } catch (error: any) {
      console.error("OTP verification error:", error);
      res.status(500).json({ message: error.message || "Verification failed" });
    }
  });

  app.post("/api/resend-otp", async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate new OTP
      const otpCode = generateOTP();
      const otpExpiry = getOTPExpiry();
      
      await storage.updateUser(userId, {
        otpCode,
        otpExpiry,
        otpAttempts: 0,
      });

      // Send OTP email
      await sendOTPEmail(user.email, otpCode, user.emailVerified ? 'login' : 'signup');

      res.status(200).json({ message: "New verification code sent to your email" });
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      res.status(500).json({ message: error.message || "Failed to resend code" });
    }
  });
}
