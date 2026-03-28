import { Router } from "express";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import jwt from "jsonwebtoken";
import { ENV } from "./_core/env";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ message: "Database connection failed" });
    }

    // Find admin user by openId (username)
    const result = await db
      .select()
      .from(users)
      .where(eq(users.openId, username))
      .limit(1);

    const user = result.length > 0 ? result[0] : null;

    // Check if user exists, is admin, and password matches
    if (!user || user.role !== "admin" || !user.passwordHash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT session
    const token = jwt.sign(
      {
        id: user.id,
        openId: user.openId,
        role: user.role,
        email: user.email,
      },
      ENV.cookieSecret,
      { expiresIn: "7d" }
    );

    // Set session cookie
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("[Admin Login] Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
