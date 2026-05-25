#!/usr/bin/env python3
"""
Vector Search Service
Polls Supabase for pending queries, runs BGE-M3 embedding + pgvector cosine
similarity search, caches results. Designed as long-lived background process.

Tech: Ollama BGE-M3 (1024-dim embeddings) + Supabase pgvector
"""
import hashlib, json, sys, time, requests, psycopg2
from psycopg2.extras import RealDictCursor

# ── Config ────────────────────────────────────────────────────────
SUPABASE = {
    'host': 'aws-1-us-west-2.pooler.supabase.com',
    'port': 6543,
    'user': 'postgres.vodhhauwowkalvaxzqyv',
    'password': 'RiPGkp2IwchYiY54',
    'db': 'postgres',
}
OLLAMA_URL = 'http://localhost:11434'
BGE_MODEL = 'bge-m3:latest'
TOP_K = 8
POLL_INTERVAL = 2
MAX_RUNTIME = 3600

def get_conn():
    return psycopg2.connect(
        host=SUPABASE['host'], port=SUPABASE['port'],
        user=SUPABASE['user'], password=SUPABASE['password'],
        dbname=SUPABASE['db'], connect_timeout=10,
    )

# ── BGE-M3 Embedding ──────────────────────────────────────────────
def get_embedding(text: str) -> list:
    resp = requests.post(f"{OLLAMA_URL}/api/embeddings", json={
        "model": BGE_MODEL, "prompt": text,
    }, timeout=30)
    resp.raise_for_status()
    emb = resp.json()["embedding"]
    return emb

# ── Vector Search ──────────────────────────────────────────────────
def vector_search(conn, embedding: list, domain: str = None):
    emb_str = f"[{','.join(str(x) for x in embedding)}]"
    if domain:
        query = """
            SELECT id, domain, category, title, content, source,
                   1 - (embedding <=> %s::vector) AS similarity
            FROM knowledge_chunks
            WHERE domain = %s
            ORDER BY embedding <=> %s::vector
            LIMIT %s
        """
        params = [emb_str, domain, emb_str, TOP_K]
    else:
        query = """
            SELECT id, domain, category, title, content, source,
                   1 - (embedding <=> %s::vector) AS similarity
            FROM knowledge_chunks
            ORDER BY embedding <=> %s::vector
            LIMIT %s
        """
        params = [emb_str, emb_str, TOP_K]
    
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(query, params)
    results = cur.fetchall()
    cur.close()
    return results

# ── Cache Helpers ──────────────────────────────────────────────────
def qhash(text: str, domain: str) -> str:
    return hashlib.md5(f"{text.lower().strip()}|{domain or ''}".encode()).hexdigest()

def cache_results(conn, query_text, domain_filter, results, timing_ms):
    qh = qhash(query_text, domain_filter)
    ids = [r['id'] for r in results]
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO query_cache (query_text, query_hash, domain_filter,
                                 result_ids, result_count, timing_ms)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (query_hash)
        DO UPDATE SET result_ids = EXCLUDED.result_ids,
                      result_count = EXCLUDED.result_count,
                      timing_ms = EXCLUDED.timing_ms,
                      created_at = NOW(),
                      expires_at = NOW() + INTERVAL '24 hours'
    """, [query_text, qh, domain_filter, json.dumps(ids), len(results), timing_ms])
    cur.close()
    conn.commit()

def lookup_cache(conn, query_text, domain_filter):
    qh = qhash(query_text, domain_filter)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("""
        SELECT result_ids, result_count, timing_ms
        FROM query_cache
        WHERE query_hash = %s AND expires_at > NOW()
    """, [qh])
    row = cur.fetchone()
    cur.close()
    return dict(row) if row else None

# ── Process Pending ────────────────────────────────────────────────
def process_pending(conn):
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("""
        SELECT id, query_text, domain_filter
        FROM pending_queries
        WHERE processed = FALSE
        ORDER BY created_at
        LIMIT 10
    """)
    rows = cur.fetchall()
    cur.close()
    
    if not rows:
        return 0
    
    for row in rows:
        qid, qtext, domain = row['id'], row['query_text'], row.get('domain_filter')
        if lookup_cache(conn, qtext, domain):
            cur = conn.cursor()
            cur.execute("UPDATE pending_queries SET processed = TRUE WHERE id = %s", [qid])
            cur.close()
            conn.commit()
            continue
        
        try:
            t0 = time.time()
            emb = get_embedding(qtext)
            results = vector_search(conn, emb, domain)
            elapsed = int((time.time() - t0) * 1000)
            cache_results(conn, qtext, domain, results, elapsed)
            
            cur = conn.cursor()
            cur.execute("UPDATE pending_queries SET processed = TRUE WHERE id = %s", [qid])
            cur.close()
            conn.commit()
            
            preview = qtext[:60] + '...' if len(qtext) > 60 else qtext
            print(f"OK [{elapsed}ms] '{preview}' -> {len(results)} results")
        except Exception as e:
            print(f"ERR query {qid}: {e}", file=sys.stderr)
    
    return len(rows)

# ── Main ───────────────────────────────────────────────────────────
def main():
    print(f"Vector Search Service — BGE-M3 via Ollama {OLLAMA_URL}")
    print(f"Poll interval: {POLL_INTERVAL}s, max runtime: {MAX_RUNTIME}s")
    
    try:
        r = requests.get(f"{OLLAMA_URL}/api/tags", timeout=5)
        models = [m['name'] for m in r.json().get('models', [])]
        if BGE_MODEL not in models:
            print(f"ERROR: {BGE_MODEL} not in Ollama. Available: {models}")
            sys.exit(1)
        print(f"OK: Ollama reachable, {BGE_MODEL} available")
    except Exception as e:
        print(f"ERROR: Cannot reach Ollama at {OLLAMA_URL}: {e}")
        sys.exit(1)
    
    start = time.time()
    conn = get_conn()
    processed_total = 0
    
    try:
        while time.time() - start < MAX_RUNTIME:
            count = process_pending(conn)
            processed_total += count
            if count == 0:
                time.sleep(POLL_INTERVAL)
    except KeyboardInterrupt:
        print(f"\nShutdown. Processed {processed_total} queries.")
    finally:
        conn.close()

if __name__ == '__main__':
    main()
