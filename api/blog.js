// API endpoint: blog posts
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres.vodhhauwowkalvaxzqyv:RiPGkp2IwchYiY54@aws-1-us-west-2.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 8000,
  query_timeout: 8000,
  max: 2,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const slug = req.query.slug;
    const domain = req.query.domain;
    const limit = Math.min(parseInt(req.query.limit || '20'), 50);

    let rows;

    if (slug) {
      // Single post
      const result = await pool.query(
        'SELECT * FROM blog_posts WHERE slug = $1 AND published = TRUE',
        [slug]
      );
      rows = result.rows;
    } else if (domain) {
      const result = await pool.query(
        `SELECT id, slug, title, excerpt, category, domain, tags, word_count, created_at
         FROM blog_posts
         WHERE published = TRUE AND domain = $1
         ORDER BY created_at DESC
         LIMIT $2`,
        [domain, limit]
      );
      rows = result.rows;
    } else {
      const result = await pool.query(
        `SELECT id, slug, title, excerpt, category, domain, tags, word_count, created_at
         FROM blog_posts
         WHERE published = TRUE
         ORDER BY created_at DESC
         LIMIT $1`,
        [limit]
      );
      rows = result.rows;
    }

    // Parse tags JSON
    rows = rows.map(r => ({ ...r, tags: typeof r.tags === 'string' ? JSON.parse(r.tags || '[]') : (r.tags || []) }));

    res.status(200).json({
      count: rows.length,
      posts: rows,
    });
  } catch (e) {
    console.error('[blog]', e.message);
    res.status(200).json({ count: 0, posts: [], error: e.message });
  }
};
