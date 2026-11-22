# SafeTag – Child safety app

A parent opens the app, sees where the child is, and gets warned if the child
leaves a safe area.

| Folder | What's inside |
|---|---|
| `apps/mobile/` | React Native + Expo app (Android first) |
| `apps/server/` | Express + PostgreSQL backend |
| `firmware/` | ESP32 + SIM868 code (PlatformIO) |
| `docs/` | Requirements, API contract, diagrams |

- Plan and MVP scope: [`docs/requirements.md`](docs/requirements.md)
- API: [`docs/api.md`](docs/api.md)
- Run the server: [`apps/server/README.md`](apps/server/README.md)

## Status
- [x] Phase 1 – Server: receive a position, give the latest position
- [ ] Phase 2 – App: map with a marker
- [ ] Phase 3 – Real device
- [ ] Phase 4 – Login, safe zones, push alerts
- [ ] Phase 5 – Release (Render/Railway + Google Play closed testing)
