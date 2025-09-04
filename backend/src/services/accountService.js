import pool from "../config/db.js";

export const addAccountService = async (userId, { provider, accountId, accountName }) => {
  const result = await pool.query(
    "INSERT INTO social_accounts (user_id, provider, account_id, account_name) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, provider, accountId, accountName]
  );
  return result.rows[0];
};

export const getAccountsService = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM social_accounts WHERE user_id = $1",
    [userId]
  );
  return result.rows;
};

export const deleteAccountService = async (userId, accountId) => {
  await pool.query("DELETE FROM social_accounts WHERE id = $1 AND user_id = $2", [
    accountId,
    userId,
  ]);
};
