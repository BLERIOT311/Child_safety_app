# SafeTag – API contract

Base URL (local): `http://localhost:3000`

## `GET /health`
Checks the server and database are up.

Response `200`: `{ "ok": true }`

## `POST /locations`
Called by the device (or by you with fake data) to send a position.

Body (JSON):
```json
{ "deviceId": "safetag-001", "lat": 48.8566, "lng": 2.3522, "recordedAt": "2026-11-22T10:42:00Z" }
```
- `deviceId` – text, required
- `lat` – number between -90 and 90, required
- `lng` – number between -180 and 180, required
- `recordedAt` – ISO date, optional (defaults to the time the server received it)

Response `201`: the stored row.
Response `400`: `{ "error": "..." }` if the body is invalid.

## `GET /locations/latest?deviceId=safetag-001`
Called by the app (polling every 5–10 s) to get the newest position.

Response `200`:
```json
{ "id": 7, "deviceId": "safetag-001", "lat": 48.8566, "lng": 2.3522,
  "recordedAt": "2026-11-22T10:42:00.000Z", "receivedAt": "2026-11-22T10:42:01.123Z" }
```
Response `404`: `{ "error": "No location yet for this device" }`

## Coming in Phase 4
- `POST /auth/register`, `POST /auth/login`
- `GET/POST/PATCH/DELETE /geofences`
