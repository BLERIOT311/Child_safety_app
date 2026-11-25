// The two Phase 1 routes: receive a position, give the latest position.
const express = require('express');
const { insertLocation, getLatestLocation } = require('../db/locations');

const router = express.Router();

function isNumberInRange(value, min, max) {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

// POST /locations  – the device sends { deviceId, lat, lng, recordedAt? }
router.post('/', async (req, res, next) => {
  try {
    const { deviceId, lat, lng, recordedAt } = req.body ?? {};

    if (typeof deviceId !== 'string' || deviceId.trim() === '') {
      return res.status(400).json({ error: 'deviceId must be a non-empty string' });
    }
    if (!isNumberInRange(lat, -90, 90)) {
      return res.status(400).json({ error: 'lat must be a number between -90 and 90' });
    }
    if (!isNumberInRange(lng, -180, 180)) {
      return res.status(400).json({ error: 'lng must be a number between -180 and 180' });
    }
    if (recordedAt !== undefined && Number.isNaN(Date.parse(recordedAt))) {
      return res.status(400).json({ error: 'recordedAt must be an ISO date string' });
    }

    const saved = await insertLocation({ deviceId: deviceId.trim(), lat, lng, recordedAt });
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// GET /locations/latest?deviceId=...  – the app asks for the newest position
router.get('/latest', async (req, res, next) => {
  try {
    const { deviceId } = req.query;
    if (typeof deviceId !== 'string' || deviceId.trim() === '') {
      return res.status(400).json({ error: 'deviceId query parameter is required' });
    }

    const latest = await getLatestLocation(deviceId.trim());
    if (!latest) {
      return res.status(404).json({ error: 'No location yet for this device' });
    }
    res.json(latest);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
