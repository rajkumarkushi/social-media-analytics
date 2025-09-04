import pool from "../config/db.js";

export const addAnalyticsService = async (userId, { provider, followers, likes, shares }) => {
  const result = await pool.query(
    "INSERT INTO analytics (user_id, provider, followers, likes, shares) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, provider, followers, likes, shares]
  );
  return result.rows[0];
};

export const getAnalyticsService = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM analytics WHERE user_id = $1 ORDER BY created_at ASC",
    [userId]
  );
  return result.rows;
};
