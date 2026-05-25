-- Platform Digest table for AI-generated weekly summaries
CREATE TABLE IF NOT EXISTS platform_digests (
  id SERIAL PRIMARY KEY,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]',
  stats JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(week_start, week_end)
);

CREATE INDEX IF NOT EXISTS idx_platform_digests_week ON platform_digests(week_start DESC);
