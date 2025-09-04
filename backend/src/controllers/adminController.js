import pool from "../config/db.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, is_admin FROM users ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("getAllUsers error:", err.stack || err.message);
    res.status(500).json({ message: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
