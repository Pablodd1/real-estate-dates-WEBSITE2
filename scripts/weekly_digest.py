#!/usr/bin/env python3
"""
Weekly AI Platform Digest Generator
Queries Supabase for this week's platform stats, generates a professional
summary with llama3.1, and saves it to the platform_digests table.

Run manually or via cron. Output is a clean digest for the website.
"""
import json, sys, time, requests, psycopg2
from datetime import date, timedelta

# ── Config ────────────────────────────────────────────────────────
SUPABASE = {
    'host': 'aws-1-us-west-2.pooler.supabase.com',
    'port': 6543,
    'user': 'postgres.vodhhauwowkalvaxzqyv',
    'password': 'RiPGkp2IwchYiY54',
    'db': 'postgres',
}
OLLAMA_URL = 'http://localhost:11434'
LLM_MODEL = 'llama3.1:8b'

def get_conn():
    return psycopg2.connect(
        host=SUPABASE['host'], port=SUPABASE['port'],
        user=SUPABASE['user'], password=SUPABASE['password'],
        dbname=SUPABASE['db'], connect_timeout=10,
    )

# ── Analytics Queries ─────────────────────────────────────────────
def gather_stats(conn, week_start, week_end):
    stats = {}
    
    # Knowledge chunk counts by domain
    cur = conn.cursor()
    cur.execute("SELECT domain, COUNT(*) FROM knowledge_chunks GROUP BY domain ORDER BY count DESC")
    stats['knowledge_by_domain'] = {r[0]: r[1] for r in cur.fetchall()}
    cur.close()

    # Total chunks
    stats['total_knowledge_chunks'] = sum(stats['knowledge_by_domain'].values())

    # Vector search queries this week (from pending_queries — already processed)
    cur = conn.cursor()
    cur.execute("""
        SELECT COUNT(*) FROM pending_queries
        WHERE created_at >= %s AND created_at < %s
    """, [week_start, week_end])
    stats['vector_queries_this_week'] = cur.fetchone()[0]
    cur.close()

    # Cache hits this week
    cur = conn.cursor()
    cur.execute("""
        SELECT COUNT(*) FROM query_cache
        WHERE created_at >= %s AND created_at < %s
    """, [week_start, week_end])
    stats['cache_entries_this_week'] = cur.fetchone()[0]
    cur.close()

    # Digest count
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM platform_digests")
    stats['total_digests'] = cur.fetchone()[0]
    cur.close()

    # Date range
    stats['week_start'] = str(week_start)
    stats['week_end'] = str(week_end)

    return stats

# ── LLM Generation ─────────────────────────────────────────────────
def generate_digest(stats):
    kb = stats['knowledge_by_domain']
    kb_list = '\n'.join(f"  - {domain}: {count:,} documents" for domain, count in kb.items())

    prompt = f"""You are a technical platform reporter. Write a concise weekly digest for the "Real Estate Dates x AI RAG Platform".

This week's data (week ending {stats['week_end']}):

Knowledge Base:
{kb_list}
Total: {stats['total_knowledge_chunks']:,} documents

Activity:
- {stats['vector_queries_this_week']} semantic vector searches processed
- {stats['cache_entries_this_week']} search results cached
- {stats['total_digests']} previous digests published

Write a digest with:
1. A 4-6 word title (professional, not clickbaity)
2. A 2-3 sentence overview of what happened this week
3. 2-3 "Highlights" bullet points (1 sentence each) about the most notable stats or trends
4. Keep total under 120 words. Be factual and professional.

Respond as JSON:
{{"title": "...", "summary": "...", "highlights": ["...", "..."]}}"""

    resp = requests.post(f"{OLLAMA_URL}/api/generate", json={
        "model": LLM_MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.7, "num_predict": 500},
    }, timeout=120)
    resp.raise_for_status()
    text = resp.json()["response"]
    
    # Extract JSON from model response
    start = text.find('{')
    end = text.rfind('}') + 1
    if start >= 0 and end > start:
        result = json.loads(text[start:end])
    else:
        raise ValueError(f"No JSON found in model response: {text[:200]}")
    
    return result

# ── Main ───────────────────────────────────────────────────────────
def main():
    today = date.today()
    week_start = today - timedelta(days=7)
    week_end = today

    print(f"Generating digest for {week_start} → {week_end}")

    conn = get_conn()
    try:
        # Check if already exists
        cur = conn.cursor()
        cur.execute("""
            SELECT id FROM platform_digests
            WHERE week_start = %s AND week_end = %s
        """, [week_start, week_end])
        if cur.fetchone():
            print(f"Digest for {week_start}→{week_end} already exists. Skipping.")
            cur.close()
            return
        cur.close()

        print("Gathering stats...")
        stats = gather_stats(conn, week_start, week_end)

        print(f"Generating digest with {LLM_MODEL}...")
        digest = generate_digest(stats)
        print(f"  Title: {digest['title']}")
        print(f"  Highlights: {len(digest.get('highlights', []))} items")

        # Insert
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO platform_digests (week_start, week_end, title, summary, highlights, stats)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, [
            week_start, week_end, digest['title'], digest['summary'],
            json.dumps(digest.get('highlights', [])), json.dumps(stats),
        ])
        conn.commit()
        cur.close()

        print("Digest saved to platform_digests.")
    finally:
        conn.close()

if __name__ == '__main__':
    main()
