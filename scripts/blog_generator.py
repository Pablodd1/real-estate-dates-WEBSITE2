#!/usr/bin/env python3
"""
SEO Blog Article Generator
Picks topics from RAG knowledge chunks, generates SEO-optimized articles
with llama3.1, and saves them to the blog_posts table.

Uses markdown output (not JSON) — far more reliable with smaller LLMs.

Usage:
  python3 blog_generator.py [--domain medical|legal] [--slug custom-slug]
"""
import argparse, hashlib, json, re, sys, time, requests, psycopg2
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
LLM_MODEL = 'llama3.1:8b'

def get_conn():
    return psycopg2.connect(
        host=SUPABASE['host'], port=SUPABASE['port'],
        user=SUPABASE['user'], password=SUPABASE['password'],
        dbname=SUPABASE['db'], connect_timeout=10,
        cursor_factory=RealDictCursor,
    )

# ── Topic Selection ───────────────────────────────────────────────
def pick_topic(conn, domain=None):
    cur = conn.cursor()
    if domain:
        cur.execute("""
            SELECT DISTINCT category, domain, COUNT(*) as cnt
            FROM knowledge_chunks WHERE domain = %s
            GROUP BY category, domain ORDER BY cnt DESC LIMIT 5
        """, [domain])
    else:
        cur.execute("""
            SELECT DISTINCT category, domain, COUNT(*) as cnt
            FROM knowledge_chunks
            GROUP BY category, domain ORDER BY cnt DESC LIMIT 5
        """)
    topics = cur.fetchall()
    cur.close()
    return topics

def get_topic_content(conn, category, domain, limit=5):
    cur = conn.cursor()
    cur.execute("""
        SELECT id, title, content, source, domain, category
        FROM knowledge_chunks
        WHERE category = %s AND domain = %s
        ORDER BY created_at DESC LIMIT %s
    """, [category, domain, limit])
    rows = cur.fetchall()
    cur.close()
    return rows

# ── Markdown Parsing ───────────────────────────────────────────────
def make_slug(title):
    return re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')[:80]

def parse_markdown_article(text):
    """Parse llama3.1's markdown output into structured fields."""
    lines = text.strip().split('\n')

    # --- Title: First # heading ---
    title = ''
    for line in lines:
        m = re.match(r'^#\s+(.+?)\s*(?:#+)?$', line.strip())
        if m:
            title = m.group(1).strip()
            break
    if not title:
        title = 'Real Estate Knowledge: Expert Insights'

    # --- Tags: Look for "Tags:" or "Keywords:" line ---
    tags = []
    for line in lines:
        if re.match(r'^(?:Tags|Keywords|SEO Keywords)\s*:', line, re.IGNORECASE):
            tag_text = re.sub(r'^.*?:\s*', '', line, flags=re.IGNORECASE)
            tags = [t.strip().strip('#"').strip() for t in re.split(r'[,#]', tag_text) if t.strip()]
            break

    # --- Excerpt: First paragraph after title (non-heading, non-empty) ---
    excerpt = ''
    past_title = False
    for line in lines:
        stripped = line.strip()
        if re.match(r'^#\s+', stripped):
            past_title = True
            continue
        if not past_title:
            continue
        if stripped and not stripped.startswith('##') and not stripped.startswith('**'):
            excerpt = stripped[:300]
            break
    if not excerpt:
        excerpt = title

    # --- Content: Full body, convert markdown to HTML ---
    body_lines = []
    past_meta = False
    for line in lines:
        stripped = line.strip()
        if re.match(r'^(?:Tags|Keywords|SEO Keywords)\s*:', stripped, re.IGNORECASE):
            continue
        if re.match(r'^#\s+', stripped):
            past_meta = True
            body_lines.append(f'<h1>{stripped.lstrip("#").strip()}</h1>')
        elif re.match(r'^##\s+', stripped):
            body_lines.append(f'<h2>{stripped.lstrip("#").strip()}</h2>')
        elif re.match(r'^###\s+', stripped):
            body_lines.append(f'<h3>{stripped.lstrip("#").strip()}</h3>')
        elif stripped.startswith('**') and stripped.endswith('**'):
            body_lines.append(f'<strong>{stripped.strip("*")}</strong>')
        elif stripped.startswith('- ') or stripped.startswith('* '):
            body_lines.append(f'<li>{stripped[2:]}</li>')
        elif stripped and past_meta:
            if stripped.startswith('<li>'):
                body_lines.append(stripped)
            else:
                body_lines.append(f'<p>{stripped}</p>')

    # Wrap consecutive <li> in <ul>
    html_parts = []
    li_buffer = []
    for bl in body_lines:
        if bl.startswith('<li>'):
            li_buffer.append(bl)
        else:
            if li_buffer:
                html_parts.append('<ul>' + ''.join(li_buffer) + '</ul>')
                li_buffer = []
            html_parts.append(bl)
    if li_buffer:
        html_parts.append('<ul>' + ''.join(li_buffer) + '</ul>')
    content_html = '\n'.join(html_parts)

    # Word count from original markdown
    word_count = len(re.findall(r'\b\w+\b', text))

    return {
        'title': title,
        'excerpt': excerpt,
        'content': content_html,
        'tags': tags[:5],
        'word_count': word_count,
    }

# ── Generation ─────────────────────────────────────────────────────
def generate_article(topic_data, domain):
    """Generate article with llama3.1 — markdown output, no JSON."""
    context_parts = []
    for r in topic_data[:3]:
        excerpt = r['content'][:500] if r['content'] else ''
        context_parts.append(f"### {r['title']}\nSource: {r['source']}\n{excerpt}\n")
    context = '\n'.join(context_parts)

    prompt = f"""You are a professional content writer. Write a blog article (800-1200 words) in MARKDOWN format using ONLY the reference material below.

Domain: {domain}
Category: {topic_data[0]['category'] if topic_data else 'general'}

--- Reference Material ---
{context}
--- End Reference ---

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

# [SEO-Optimized Title Here — 50-65 chars]

[First paragraph — compelling opening with a hook, statistic, or scenario. This will be the excerpt.]

## [Key Subheading 1]

[2-3 paragraphs with bullet points where appropriate]

## [Key Subheading 2]

[2-3 paragraphs with bullet points where appropriate]

## [Key Subheading 3]

[2-3 paragraphs wrapping up with actionable takeaways]

Tags: keyword1, keyword2, keyword3

RULES:
- Write ONLY in plain markdown — no JSON, no code blocks
- Use ## for subheadings, bullet points with -
- Bold important terms with **term**
- Keep paragraphs short (2-4 sentences)
- Include a brief disclaimer at end if legal/medical content
- 800-1200 words total
- DO NOT wrap your response in ``` or any code blocks — just the markdown"""

    resp = requests.post(f"{OLLAMA_URL}/api/generate", json={
        "model": LLM_MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.75, "num_predict": 3000},
    }, timeout=180)
    resp.raise_for_status()
    response_text = resp.json()["response"]

    # Strip any code block markers the model might add despite instructions
    response_text = re.sub(r'^```\w*\n?', '', response_text.strip())
    response_text = re.sub(r'\n?```$', '', response_text.strip())

    # Parse markdown into structured fields
    article = parse_markdown_article(response_text)
    article['slug'] = make_slug(article['title'])
    article['domain'] = domain
    article['category'] = topic_data[0]['category'] if topic_data else 'general'
    article['source_chunks'] = [r['id'] for r in topic_data]

    return article

# ── Save ───────────────────────────────────────────────────────────
def save_article(conn, article):
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO blog_posts (slug, title, excerpt, content, category, domain, tags, source_chunks, word_count, published)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, TRUE)
        ON CONFLICT (slug) DO NOTHING
        RETURNING id
    """, [
        article['slug'], article['title'], article['excerpt'], article['content'],
        article['category'], article['domain'], json.dumps(article['tags']),
        json.dumps(article['source_chunks']), article['word_count'],
    ])
    row = cur.fetchone()
    conn.commit()
    cur.close()
    return row

# ── Main ───────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--domain', choices=['medical', 'legal', 'msk', 'imaging'])
    parser.add_argument('--slug')
    args = parser.parse_args()

    domain = args.domain or 'legal'
    print(f"[Blog Generator] Domain: {domain}, Model: {LLM_MODEL} (markdown mode)")

    conn = get_conn()
    try:
        print("Picking topic...")
        topics = pick_topic(conn, domain)
        if not topics:
            print("No topics found!")
            return

        best = topics[0]
        print(f"  Selected: {best['category']} ({best['cnt']} chunks)")

        print("Loading reference content...")
        refs = get_topic_content(conn, best['category'], best['domain'])
        print(f"  Loaded {len(refs)} reference chunks")

        print(f"Generating article with {LLM_MODEL}...")
        t0 = time.time()
        article = generate_article(refs, domain)
        elapsed = int(time.time() - t0)
        print(f"  Generated in {elapsed}s — Title: {article['title']}")
        print(f"  Words: {article['word_count']}, Tags: {article['tags']}")

        row = save_article(conn, article)
        if row:
            print(f"Saved! ID={row['id']}, slug={article['slug']}")
        else:
            print(f"Already exists: {article['slug']}")
    finally:
        conn.close()

if __name__ == '__main__':
    main()
