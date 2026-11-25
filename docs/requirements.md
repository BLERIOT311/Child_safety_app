# SafeTag – Requirements (MVP)

## Goal
A parent opens the app, sees where the child is, and gets warned if the child
leaves a safe area.

## Stack
- **Mobile app:** React Native + Expo (Expo Router), Android first
- **Server:** Node.js + Express (JavaScript)
- **Database:** PostgreSQL
- **Device:** ESP32 + SIM868 (GPS + GSM), PlatformIO firmware
- **Maps:** Google Maps
- **Updates:** polling every 5–10 s (no Socket.IO in the MVP)

## MVP features
1. The device sends its position to the server every few seconds.
2. The server stores it in PostgreSQL.
3. The app shows the latest position on Google Maps.
4. Simple login (email + password).
5. Safe zones, set up on the map by the parent:
   - Tap a spot on the map to place the zone centre (pin).
   - Slider to set the radius (50 m – 1 km); the circle updates live.
   - Drag the pin to move the zone.
   - Name it ("School", "Home").
   - Save: centre, radius and name are sent to the server and stored.
   - Toggle on/off (e.g. pause during holidays).
   - Edit or delete later.
6. Alerts: on every new position the server checks if it is inside each active
   zone. Inside → outside sends a push notification
   ("Your child left School at 10:42"); outside → inside sends "Back in School".

## Out of scope for now
- Several children per parent
- Location history / replay
- SOS button, battery level
- Socket.IO live updates
- iPhone / App Store (add after the Android MVP works)

## Build order
| Phase | What you build | Done when… |
|---|---|---|
| 0. Setup | Node.js, Git, VS Code, PostgreSQL, Android Studio (emulator) | `node -v` and `git -v` work |
| 1. Server | Express + PostgreSQL, 2 routes: receive a position, give the latest position | A fake position sent in comes back out. No hardware needed |
| 2. App | React Native screen with a map and a marker | The marker shows the fake position from the server |
| 3. Real device | SIM868 sends real GPS positions to the server | Walking around moves the marker |
| 4. Safety | Login + safe zone + push notification | Leaving the zone triggers an alert |
| 5. Release | Server online (Render or Railway) + Android build | App is in Google Play closed testing |

## Reminders
- Google Play needs **12 testers for 14 days** before public release. Collect
  15–20 Gmail addresses early.
- Phase 1–2 need no hardware, so device/power-supply problems don't block the
  software work.
