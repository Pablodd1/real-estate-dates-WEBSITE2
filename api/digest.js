// API endpoint: latest platform digest
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
    const limit = Math.min(parseInt(req.query.limit || '1'), 10);
    
    const { rows } = await pool.query(
      `SELECT id, week_start, week_end, title, summary, highlights, stats, created_at
       FROM platform_digests
       ORDER BY week_start DESC
       LIMIT $1`,
      [limit]
    );

    res.status(200).json({
      count: rows.length,
      digests: rows,
    });
  } catch (e) {
    console.error('[digest]', e.message);
    res.status(200).json({ count: 0, digests: [], error: e.message });
  }
};
