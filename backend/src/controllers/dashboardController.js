import pool from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");

    let accountsCount = 0;
    let analyticsCount = 0;

    try {
      const accounts = await pool.query(
        "SELECT COUNT(*) FROM accounts WHERE user_id = $1",
        [req.user.id]
      );
      accountsCount = parseInt(accounts.rows[0].count);
    } catch (e) {
      console.error("Dashboard stats accounts error:", e.message);
    }

    try {
      const analytics = await pool.query(
        "SELECT COUNT(*) FROM analytics WHERE user_id = $1",
        [req.user.id]
      );
      analyticsCount = parseInt(analytics.rows[0].count);
    } catch (e) {
      console.error("Dashboard stats analytics error:", e.message);
    }

    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalAccounts: accountsCount,
      totalAnalytics: analyticsCount,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err.stack || err.message);
    res.status(500).json({ message: "Failed to load stats" });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT provider, followers, likes, shares, created_at FROM analytics WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Recent activity error:", err.message);
    res.status(500).json({ message: "Failed to load activity" });
  }
};

