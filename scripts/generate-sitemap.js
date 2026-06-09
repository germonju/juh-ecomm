import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://www.juh-ecomm.fr';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

// Hardcoded credentials — same as customSupabaseClient.js
const SUPABASE_URL = 'https://altplorphoohlgjmonbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdHBsb3JwaG9vaGxnam1vbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjgwNzAsImV4cCI6MjA4MDU0NDA3MH0.1ZbFI32wZsdSZ5EQ1vomEFLofggBC-CGWybj_n76ZhE';

// Static pages — noindex pages (api-docs, seo-audit, mentions-legales, politique-confidentialite) sont exclus
const STATIC_PAGES = [
  { loc: `${BASE_URL}/`,                    changefreq: 'weekly',  priority: '1.0' },
  { loc: `${BASE_URL}/contact`,             changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/tracking-hub`,        changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/gtm-server-side`,     changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/ga4-advanced`,        changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/audit-google-ads`,    changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/shopify`,             changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/google-my-business`,  changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/conversions-offline`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/consent-mode`,        changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/conciergerie`,        changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/reponse-leads`,       changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/automatisation-hub`,  changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/landing-pages`,       changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/blog`,                changefreq: 'daily',   priority: '0.9' },
];

function fetchJson(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Invalid JSON')); }
      });
    }).on('error', reject);
  });
}

async function fetchPublishedArticles() {
  const url = `${SUPABASE_URL}/rest/v1/articles?status=eq.published&select=slug,publish_date,updated_at&order=publish_date.desc`;
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  };
  try {
    const articles = await fetchJson(url, headers);
    console.log(`  ✓ ${articles.length} articles récupérés depuis Supabase`);
    return articles;
  } catch (err) {
    console.warn(`  ⚠️ Articles non récupérés: ${err.message}`);
    return [];
  }
}

function buildSitemap(staticPages, articles) {
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticPages.map(p => `  <url>
    <loc>${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

  const articleEntries = articles.map(a => {
    const lastmod = (a.updated_at || a.publish_date || today).split('T')[0];
    return `  <url>
    <loc>${BASE_URL}/blog/${a.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${articleEntries}
</urlset>`;
}

async function generateFiles() {
  console.log('🚀 Génération du sitemap...');

  const publicDir = path.join(__dirname, '../public');
  fs.mkdirSync(publicDir, { recursive: true });

  console.log('\n📋 Articles de blog:');
  const articles = await fetchPublishedArticles();

  const sitemap = buildSitemap(STATIC_PAGES, articles);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`\n✅ sitemap.xml généré (${STATIC_PAGES.length} pages + ${articles.length} articles)`);

  const robotsContent = `User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /preview/
Disallow: /internal/
Disallow: /private/

Sitemap: ${SITEMAP_URL}
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
  console.log('✅ robots.txt généré');
}

generateFiles();
