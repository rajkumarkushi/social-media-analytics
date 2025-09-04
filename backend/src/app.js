import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
// Cookies and JSON parsing must be before routes
app.use(cookieParser());
app.use(express.json());

// CORS: allow one or more frontend origins with credentials
const ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
const isLoopbackOrigin = (origin) => /^(https?:\/\/(localhost|127\.0\.0\.1))(\:\d+)?$/.test(origin || "");
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (isLoopbackOrigin(origin)) return callback(null, true); // any localhost/127.0.0.1 + any port
    if (ALLOWED_ORIGINS.length && ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// Handle CORS preflight manually to avoid path-to-regexp issues
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    const requestOrigin = req.headers.origin;
    const allowOrigin = (isLoopbackOrigin(requestOrigin) || (ALLOWED_ORIGINS.length && ALLOWED_ORIGINS.includes(requestOrigin)))
      ? requestOrigin
      : (ALLOWED_ORIGINS[0] || "");
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
export default app;
