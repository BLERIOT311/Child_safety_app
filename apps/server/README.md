# SafeTag server (Phase 1)

Express + PostgreSQL. Receives positions from the device and gives the latest
one to the app. See [`docs/api.md`](../../docs/api.md) for the routes.

## Run it locally
1. Create the database (once):
   ```bash
   createdb safetag
   ```
2. Set up your config:
   ```bash
   cp .env.example .env
   ```
   Edit `DATABASE_URL` in `.env` to match your PostgreSQL user and password.
3. Install and create the tables:
   ```bash
   npm install
   npm run migrate
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Try it with a fake position
```bash
curl -X POST http://localhost:3000/locations -H "Content-Type: application/json" -d '{"deviceId":"safetag-001","lat":48.8566,"lng":2.3522}'
```
```bash
curl "http://localhost:3000/locations/latest?deviceId=safetag-001"
```
