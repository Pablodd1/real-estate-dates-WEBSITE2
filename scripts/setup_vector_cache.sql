-- Vector Search Cache Tables for Real Estate Dates Website
-- Run against Supabase postgres DB

-- Pending queries awaiting vector search by local service
CREATE TABLE IF NOT EXISTS pending_queries (
  id SERIAL PRIMARY KEY,
  query_text TEXT NOT NULL,
  domain_filter TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE
);

-- Cached vector search results (24h expiry)
CREATE TABLE IF NOT EXISTS query_cache (
  id SERIAL PRIMARY KEY,
  query_text TEXT NOT NULL,
  query_hash TEXT NOT NULL UNIQUE,
  domain_filter TEXT,
  result_ids JSONB NOT NULL,
  result_count INTEGER NOT NULL,
  timing_ms INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_query_cache_hash ON query_cache(query_hash);
CREATE INDEX IF NOT EXISTS idx_query_cache_expires ON query_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_pending_queries_unprocessed 
  ON pending_queries(processed, created_at) 
  WHERE processed = FALSE;
