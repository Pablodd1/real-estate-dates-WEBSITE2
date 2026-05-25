// Health check + RAG stats endpoint
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres.vodhhauwowkalvaxzqyv:RiPGkp2IwchYiY54@aws-1-us-west-2.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 8000,
  idleTimeoutMillis: 30000,
});

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        `SELECT domain, COUNT(*) as count
         FROM knowledge_chunks
         GROUP BY domain
         ORDER BY COUNT(*) DESC`
      );

      const domains = {};
      let total = 0;
      for (const row of rows) {
        domains[row.domain] = parseInt(row.count);
        total += parseInt(row.count);
      }

      // Sample categories per domain
      const { rows: cats } = await client.query(
        `SELECT domain, category, COUNT(*) as count
         FROM knowledge_chunks
         GROUP BY domain, category
         ORDER BY domain, COUNT(*) DESC`
      );

      const categories = {};
      for (const row of cats) {
        if (!categories[row.domain]) categories[row.domain] = [];
        if (categories[row.domain].length < 8) {
          categories[row.domain].push({ category: row.category, count: parseInt(row.count) });
        }
      }

      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        rag: {
          total_chunks: total,
          domains,
          categories,
          embedding_model: 'bge-m3',
          embedding_dim: 1024,
          search_modes: ['text', 'vector']
        },
        platforms: {
          'real-estate-dates': {
            url: 'https://realestatedates.realty',
            type: 'Web App (React SPA)',
            features: ['Pipeline Matching', 'Chat', 'Happy Hour', 'Profile']
          },
          'aims-medical': {
            url: 'https://aims-final-edition-production.up.railway.app',
            type: 'EHR Platform (Express + React)',
            features: [
              'Medical Scribe', 'SOAP Notes', 'Telemedicine',
              'Lab Interpreter', 'Patient Management', 'Billing'
            ]
          },
          'attorney-immigration-rag': {
            type: 'RAG System (Supabase + Ollama)',
            features: [
              'Case Management', '3-Agent Pipeline',
              'Document Generation', 'Credibility Assessment',
              'Vector Search', 'Legal Knowledge Base'
            ]
          }
        }
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(200).json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
      error: error.message,
      rag: { total_chunks: 'unknown', domains: {}, note: 'Database unreachable from Vercel edge. RAG runs locally.' },
      platforms: {
        'real-estate-dates': { url: 'https://realestatedates.realty', type: 'Web App (React SPA)' },
        'aims-medical': { url: 'https://aims-final-edition-production.up.railway.app', type: 'EHR Platform' },
        'attorney-immigration-rag': { type: 'RAG System (requires local Ollama)' }
      }
    });
  }
};
