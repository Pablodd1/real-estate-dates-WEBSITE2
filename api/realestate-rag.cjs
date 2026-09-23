// Real Estate RAG API — serves real estate knowledge to the dating app
// Queries the unified knowledge_chunks via ILIKE + vector cache check
const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres.vodhhauwowkalvaxzqyv:RiPGkp2IwchYiY54@aws-1-us-west-2.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 8000,
  query_timeout: 8000,
  max: 2,
});

function makeHash(queryText, domain) {
  return crypto.createHash('md5')
    .update(`${queryText.toLowerCase().trim()}|${domain || ''}`)
    .digest('hex');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const startTime = Date.now();

  try {
    let queryText, domainFilter = null, topK = 5;
    if (req.method === 'POST' && req.body) {
      queryText = req.body.query || req.body.q || '';
      domainFilter = req.body.domain || null;
      topK = Math.min(req.body.top || 5, 10);
    } else {
      queryText = req.query.q || '';
      domainFilter = req.query.domain || null;
      topK = Math.min(parseInt(req.query.top || '5'), 10);
    }

    if (!queryText.trim()) {
      return res.status(400).json({ error: 'Missing query' });
    }

    queryText = queryText.trim();

    // Try vector cache
    let cacheHit = false;
    try {
      const qhash = makeHash(queryText, domainFilter);
      const cacheResult = await pool.query(
        `SELECT result_ids, result_count, timing_ms
         FROM query_cache
         WHERE query_hash = $1 AND expires_at > NOW()`,
        [qhash]
      );
      if (cacheResult.rows.length > 0) {
        cacheHit = true;
        const ids = cacheResult.rows[0].result_ids;
        const { rows } = await pool.query(
          `SELECT id, domain, category, title, content, source, created_at
           FROM knowledge_chunks WHERE id = ANY($1)`,
          [ids]
        );
        const byId = {};
        rows.forEach(r => byId[r.id] = r);
        const ordered = ids.map(id => byId[id]).filter(Boolean);

        return res.status(200).json({
          query: queryText,
          results: ordered.map(r => ({
            id: r.id, domain: r.domain, title: r.title,
            content: (r.content || '').substring(0, 600),
            source: r.source, category: r.category,
          })),
          timing_ms: cacheResult.rows[0].timing_ms,
          search_mode: 'vector (BGE-M3)',
        });
      }
    } catch (e) {
      console.error('[realestate-rag] cache check failed:', e.message);
    }

    // ILIKE fallback
    const words = queryText.split(/\s+/).filter(w => w.length > 0);
    const likeClauses = words.map((_, i) =>
      `(LOWER(title) LIKE $${i + 1} OR LOWER(content) LIKE $${i + 1})`
    ).join(' AND ');
    const likeValues = words.map(w => `%${w.toLowerCase()}%`);

    let sql, params;
    if (domainFilter) {
      sql = `SELECT id, domain, category, title, content, source, created_at
             FROM knowledge_chunks
             WHERE domain = $${words.length + 1} AND (${likeClauses})
             ORDER BY created_at DESC LIMIT $${words.length + 2}`;
      params = [...likeValues, domainFilter, topK];
    } else {
      sql = `SELECT id, domain, category, title, content, source, created_at
             FROM knowledge_chunks
             WHERE ${likeClauses}
             ORDER BY created_at DESC LIMIT $${words.length + 1}`;
      params = [...likeValues, topK];
    }

    const { rows } = await pool.query(sql, params);

    // Insert pending for vector search
    pool.query(
      `INSERT INTO pending_queries (query_text, domain_filter) VALUES ($1, $2)`,
      [queryText, domainFilter]
    ).catch(() => {});

    res.status(200).json({
      query: queryText,
      results: rows.map(r => ({
        id: r.id, domain: r.domain, title: r.title,
        content: (r.content || '').substring(0, 600),
        source: r.source, category: r.category,
      })),
      timing_ms: Date.now() - startTime,
      search_mode: 'text (ILIKE)',
    });
  } catch (error) {
    console.error('[realestate-rag]', error.message);
    res.status(200).json({
      query: req.query.q || '',
      results: [],
      error: error.message,
    });
  }
};
