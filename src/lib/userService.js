const db = require("./db");

async function createUser(username, password) {
  const q =
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
  try {
    const result = await db.query(q, [username, password]);
    return result.rows[0];
  } catch (e) {
    console.error("Gat gertnotanda:", e);
    throw e;
  }
}

async function getUserByUsername(username) {
  const q = "SELECT * FROM users WHERE username = $1";
  try {
    const result = await db.query(q, [username]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (e) {
    console.error("Gat ekki nað notanda:", e);
    throw e;
  }
}

async function getUserById(id) {
  const q = "SELECT * FROM users WHERE id = $1";
  try {
    const result = await db.query(q, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (e) {
    console.error("Gat ekki náð  notanda eftir ID:", e);
    throw e;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
};
