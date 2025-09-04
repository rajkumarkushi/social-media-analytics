import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/db.js";

// Load env vars (in case not already loaded in server.js)
dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔹 Fetch user details from DB
      const result = await pool.query(
        "SELECT id, name, email, is_admin FROM users WHERE id = $1",
        [decoded.id]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = result.rows[0]; // { id, name, email, is_admin }
      next();
    } catch (err) {
      console.error("Auth error:", err.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
