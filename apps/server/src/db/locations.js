// SQL queries for the locations table.
const { pool } = require('./index');

// Turns a database row (snake_case) into the API shape (camelCase).
function toApi(row) {
  return {
    id: Number(row.id),
    deviceId: row.device_id,
    lat: row.lat,
    lng: row.lng,
    recordedAt: row.recorded_at,
    receivedAt: row.received_at,
  };
}

async function insertLocation({ deviceId, lat, lng, recordedAt }) {
  // $1, $2... are placeholders: pg fills them in safely (no SQL injection).
  const { rows } = await pool.query(
    `INSERT INTO locations (device_id, lat, lng, recorded_at)
     VALUES ($1, $2, $3, COALESCE($4, now()))
     RETURNING *`,
    [deviceId, lat, lng, recordedAt ?? null]
  );
  return toApi(rows[0]);
}

async function getLatestLocation(deviceId) {
  const { rows } = await pool.query(
    `SELECT * FROM locations
     WHERE device_id = $1
     ORDER BY recorded_at DESC, id DESC
     LIMIT 1`,
    [deviceId]
  );
  return rows[0] ? toApi(rows[0]) : null;
}

module.exports = { insertLocation, getLatestLocation };
