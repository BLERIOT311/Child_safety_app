// Database connection shared by the whole server.
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Copy .env.example to .env and fill it in.');
}

// A pool keeps a few connections open and reuses them.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = { pool };
