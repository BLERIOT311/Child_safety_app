// Runs every .sql file in /migrations, in name order, once each.
// Usage: npm run migrate
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./index');

const MIGRATIONS_DIR = path.join(__dirname, '..', '..', 'migrations');

async function migrate() {
  // Table that remembers which migrations already ran.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name   TEXT PRIMARY KEY,
      ran_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);

  const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort();
  const { rows } = await pool.query('SELECT name FROM schema_migrations');
  const done = new Set(rows.map((r) => r.name));

  for (const file of files) {
    if (done.has(file)) continue;
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.log(`Applied ${file}`);
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(`Migration ${file} failed: ${err.message}`);
    } finally {
      client.release();
    }
  }
  console.log('Migrations up to date.');
}

migrate()
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
