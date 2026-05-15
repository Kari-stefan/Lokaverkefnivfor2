const db = require("./db");

async function getShows() {
  const q = "SELECT * FROM shows";
  try {
    const result = await db.query(q);
    return result.rows;
  } catch (e) {
    console.error("Gat ekki sótt þætti", e);
    return [];
  }
}

async function getShowById(id) {
  const q = "SELECT * FROM shows WHERE id = $1";
  try {
    const result = await db.query(q, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (e) {
    console.error("Gat ekki sótt þátt", e);
    return null;
  }
}

async function insertShow(showData) {
  const q = `
    INSERT INTO shows (title, year, genre, seasons, image_url, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    showData.title,
    showData.year,
    showData.genre,
    showData.seasons,
    showData.image_url,
    showData.description,
  ];

  try {
    const result = await db.query(q, values);
    return result.rows[0];
  } catch (e) {
    console.error("Gat ekki bætt við þætti", e);
    throw e;
  }
}

async function deleteShow(id) {
  const q = "DELETE FROM shows WHERE id = $1";
  try {
    await db.query(q, [id]);
  } catch (e) {
    console.error("Gat ekki fjarlægt þátt", e);
    throw e;
  }
}

module.exports = {
  getShows,
  getShowById,
  insertShow,
  deleteShow,
};
