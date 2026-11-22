// Starts the SafeTag server.
require('dotenv').config(); // loads values from .env into process.env
const express = require('express');
const { pool } = require('./db');
const locationsRouter = require('./routes/locations');

const app = express();
app.use(express.json()); // lets us read JSON request bodies

// Quick check that the server and database are alive.
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch {
    res.status(503).json({ ok: false, error: 'database unreachable' });
  }
});

app.use('/locations', locationsRouter);

// Unknown address
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Any error not handled above ends up here.
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Body must be valid JSON' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`SafeTag server listening on http://localhost:${PORT}`));
