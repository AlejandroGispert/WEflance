import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_ISSUER = "YAR solutions";

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_CONFIG = {
  httpOnly: true, // Prevents client-side scripts from accessing the cookie
  secure: isProduction, // Ensures cookies are only sent over HTTPS in production
  sameSite: isProduction ? "none" : "lax", // Allows the cookie to be sent with cross-origin requests in production
  maxAge: 3600000, // 1 hour
  path: "/", // Cookie is available on all paths
  domain: process.env.COOKIE_DOMAIN || undefined, // Use a domain if specified, otherwise defaults to undefined
};
class AuthService {
  async login(email, password) {
    try {
      if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return { success: false, message: "Invalid password" };
      }

      const token = this.generateToken(user.id, user.roleName);

      let redirectUrl;
      switch (user.roleName) {
        case "Admin":
          redirectUrl = "/api/admin";
          break;
        case "Developer":
          redirectUrl = "/api/dev";
          break;
        case "Client":
          redirectUrl = "/api/client";
          break;
        default:
          redirectUrl = "/";
      }

      return {
        success: true,
        message: "Login successful",
        role: user.roleName,
        user,
        token,
        cookieConfig: COOKIE_CONFIG,
        redirectUrl,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred during login",
        error: error.message,
      };
    }
  }

  generateToken(userId, role) {
    return jwt.sign(
      {
        sub: userId,
        role: role,
        iat: Math.floor(Date.now() / 1000),
        sessionId: this.generateSessionId(userId),
        iss: JWT_ISSUER,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );
  }

  generateSessionId(userId) {
    return `${userId}-${Date.now()}`;
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return error;
    }
  }
}

export default new AuthService();
