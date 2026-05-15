const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

pool.on("error", (err) => {
  console.error("gagnagrunnur er ekki tengdur almenilega", err);
  process.exit(-1);
});

async function query(q, values = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    console.error("Villa í query", e);
    throw e;
  } finally {
    client.release();
  }
}

module.exports = {
  query,
};
