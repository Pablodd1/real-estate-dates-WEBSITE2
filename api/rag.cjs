// RAG search endpoint — queries Supabase knowledge_chunks
// Checks vector cache (query_cache) first for BGE-M3 semantic results,
// falls back to ILIKE text search, and inserts pending queries for
// the local vector search service to process.
const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres.vodhhauwowkalvaxzqyv:RiPGkp2IwchYiY54@aws-1-us-west-2.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 8000,
  query_timeout: 8000,
  max: 2,
  idleTimeoutMillis: 30000,
});

function makeHash(queryText, domain) {
  return crypto.createHash('md5')
    .update(`${queryText.toLowerCase().trim()}|${domain || ''}`)
    .digest('hex');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const startTime = Date.now();

  try {
    // Parse query — support GET (?q=, ?domain=, ?top=) and POST (JSON body)
    let query, domain, topK = 5;
    if (req.method === 'POST' && req.body) {
      query = req.body.query || req.body.q;
      domain = req.body.domain;
      topK = req.body.top || req.body.topK || 5;
    } else {
      query = req.query.q || req.query.query;
      domain = req.query.domain;
      topK = parseInt(req.query.top || req.query.topK || '8');
    }

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Missing query parameter. Use ?q=your search or POST {"query": "..."}' });
    }

    const queryText = query.trim();
    topK = Math.min(Math.max(1, topK), 20);
    const domainFilter = (domain && ['medical', 'legal', 'msk', 'imaging'].includes(domain)) ? domain : null;

    // ── STEP 1: Check vector cache ──────────────────────────────
    const qhash = makeHash(queryText, domainFilter);
    let cacheHit = false;

    try {
      const cacheResult = await pool.query(
        `SELECT result_ids, result_count, timing_ms
         FROM query_cache
         WHERE query_hash = $1 AND expires_at > NOW()`,
        [qhash]
      );

      if (cacheResult.rows.length > 0) {
        cacheHit = true;
        const ids = cacheResult.rows[0].result_ids;

        // Fetch results by ID
        const resultsQuery = await pool.query(
          `SELECT id, domain, category, title, content, source, metadata, created_at
           FROM knowledge_chunks WHERE id = ANY($1)`,
          [ids]
        );

        // Reorder to match cache ID order
        const byId = {};
        resultsQuery.rows.forEach(r => byId[r.id] = r);
        const ordered = ids.map(id => byId[id]).filter(Boolean);

        // Get domain counts for context
        const { rows: counts } = await pool.query(
          `SELECT domain, COUNT(*) FROM knowledge_chunks GROUP BY domain`
        );
        const domainCounts = {};
        for (const row of counts) domainCounts[row.domain] = parseInt(row.count);

        return res.status(200).json({
          query: queryText,
          domain: domainFilter || 'all',
          top_k: topK,
          results_count: ordered.length,
          total_database: Object.values(domainCounts).reduce((a, b) => a + b, 0),
          domain_counts: domainCounts,
          results: ordered.map(row => ({
            id: row.id,
            domain: row.domain,
            category: row.category,
            title: row.title,
            content: row.content ? row.content.substring(0, 800) : '',
            full_content_length: row.content ? row.content.length : 0,
            source: row.source,
            metadata: row.metadata,
            created_at: row.created_at,
          })),
          timing_ms: cacheResult.rows[0].timing_ms,
          search_mode: 'vector (BGE-M3)',
          cached: true,
        });
      }
    } catch (cacheErr) {
      console.error('[rag] Cache check failed, falling back to ILIKE:', cacheErr.message);
    }

    // ── STEP 2: ILIKE fallback ──────────────────────────────────
    const words = queryText.split(/\s+/).filter(w => w.length > 0);
    const likeClauses = words.map((_, i) =>
      `(LOWER(title) LIKE $${i + 1} OR LOWER(content) LIKE $${i + 1})`
    ).join(' AND ');
    const likeValues = words.map(w => `%${w.toLowerCase()}%`);

    let sql, params;
    if (domainFilter) {
      sql = `
        SELECT id, domain, category, title, content, source, metadata, created_at
        FROM knowledge_chunks
        WHERE domain = $${words.length + 1}
          AND (${likeClauses})
        ORDER BY created_at DESC
        LIMIT $${words.length + 2}
      `;
      params = [...likeValues, domainFilter, topK];
    } else {
      sql = `
        SELECT id, domain, category, title, content, source, metadata, created_at
        FROM knowledge_chunks
        WHERE ${likeClauses}
        ORDER BY created_at DESC
        LIMIT $${words.length + 1}
      `;
      params = [...likeValues, topK];
    }

    const { rows } = await pool.query(sql, params);

    const results = rows.map(row => ({
      id: row.id,
      domain: row.domain,
      category: row.category,
      title: row.title,
      content: row.content ? row.content.substring(0, 800) : '',
      full_content_length: row.content ? row.content.length : 0,
      source: row.source,
      metadata: row.metadata,
      created_at: row.created_at,
    }));

    const { rows: counts } = await pool.query(
      `SELECT domain, COUNT(*) FROM knowledge_chunks GROUP BY domain`
    );
    const domainCounts = {};
    for (const row of counts) domainCounts[row.domain] = parseInt(row.count);

    // ── STEP 3: Insert pending query for vector search ──────────
    pool.query(
      `INSERT INTO pending_queries (query_text, domain_filter)
       VALUES ($1, $2)`,
      [queryText, domainFilter]
    ).catch(() => {}); // fire-and-forget — don't block response

    res.status(200).json({
      query: queryText,
      domain: domainFilter || 'all',
      top_k: topK,
      results_count: results.length,
      total_database: Object.values(domainCounts).reduce((a, b) => a + b, 0),
      domain_counts: domainCounts,
      results,
      timing_ms: Date.now() - startTime,
      search_mode: 'text (ILIKE)',
      cached: false,
      note: cacheHit ? null : 'Vector search pending. Future queries will use semantic search.',
    });
  } catch (error) {
    console.error('[rag] Error:', error.message);
    res.status(200).json({
      query: req.query.q || '',
      domain: req.query.domain || 'all',
      top_k: 5,
      results_count: 0,
      error: error.message,
      results: [],
      timing_ms: Date.now() - startTime,
      search_mode: 'text (fallback)',
    });
  }
};
