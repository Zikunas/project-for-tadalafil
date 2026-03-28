import { Router } from "express";
import { getUserByOpenId } from "./db";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { SignJWT } from "jose";
import { ENV } from "./_core/env";
import bcrypt from "bcryptjs";

const router = Router();

/**
 * Helper: derive the session secret key (same as sdk.ts uses for verifySession)
 */
function getSessionSecret() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Use the exported helper from db.ts which handles both live and mock DB
    const user = await getUserByOpenId(username);

    // Check if user exists, is admin, and has a password set
    if (!user || user.role !== "admin" || !user.passwordHash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create session token using jose (same library + same payload shape as sdk.verifySession)
    const issuedAt = Date.now();
    const expiresInMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
    const secretKey = getSessionSecret();

    const token = await new SignJWT({
      openId: user.openId,
      appId: ENV.appId,
      name: user.name || user.openId,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);

    // Set session cookie (same cookie name and options as OAuth flow)
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: expiresInMs });

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
