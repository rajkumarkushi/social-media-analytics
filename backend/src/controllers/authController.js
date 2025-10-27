import { register, login as loginService } from "../services/authService.js";
import jwt from "jsonwebtoken";
// import redis from "../config/redis.js";

// Helper functions
const generateAccessToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, is_admin: Boolean(user.is_admin) }, process.env.JWT_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, is_admin: Boolean(user.is_admin) }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

// Controller: Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Replace this with real DB check
  const isAdmin = String(email).toLowerCase() === "rajkumarkushi864@gmail.com";
  const user = { id: 1, email, is_admin: isAdmin }; // example user with admin flag

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // store refresh token in Redis
  await redis.set(`refresh:${user.id}`, refreshToken, "EX", 7 * 24 * 60 * 60);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // set true if using https
    sameSite: "lax", // allow cross-site on top-level navigation
    path: "/",
  });

  res.json({ accessToken });
};

// Controller: Refresh Token
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const storedToken = await redis.get(`refresh:${decoded.id}`);

    if (storedToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken({ id: decoded.id, email: decoded.email, is_admin: decoded.is_admin });
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Controller: Logout
export const logoutUser = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      await redis.del(`refresh:${decoded.id}`);
    } catch (err) {
      console.error("Logout token error", err.message);
    }
  }

  res.clearCookie("refreshToken", { path: "/" });
  res.json({ message: "Logged out" });
};

// Controller: Register
export const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
