-- One row per position sent by a device.
CREATE TABLE IF NOT EXISTS locations (
  id          BIGSERIAL PRIMARY KEY,             -- auto-increasing row number
  device_id   TEXT NOT NULL,                     -- which SafeTag sent it
  lat         DOUBLE PRECISION NOT NULL CHECK (lat BETWEEN -90 AND 90),
  lng         DOUBLE PRECISION NOT NULL CHECK (lng BETWEEN -180 AND 180),
  recorded_at TIMESTAMPTZ NOT NULL,              -- when the GPS fix was taken
  received_at TIMESTAMPTZ NOT NULL DEFAULT now() -- when the server got it
);

-- Makes "latest position for this device" fast.
CREATE INDEX IF NOT EXISTS locations_device_recorded_idx
  ON locations (device_id, recorded_at DESC);
