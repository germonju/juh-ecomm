import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { META } from '../src/seo/meta.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://www.juh-ecomm.fr';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

// lastmod FIGÉ des pages statiques. Ne PAS utiliser la date de build : le rebuild
// nocturne ferait avancer lastmod chaque nuit sans changement réel de contenu,
// signal de fraîcheur que Google finit par ignorer. À bumper à la main quand une
// page statique change vraiment. Les articles gardent leur updated_at (dynamique).
const STATIC_LASTMOD = '2026-07-17';

// Hardcoded credentials — same as customSupabaseClient.js
const SUPABASE_URL = 'https://altplorphoohlgjmonbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdHBsb3JwaG9vaGxnam1vbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjgwNzAsImV4cCI6MjA4MDU0NDA3MH0.1ZbFI32wZsdSZ5EQ1vomEFLofggBC-CGWybj_n76ZhE';

// Pages statiques indexables DÉRIVÉES de la source unique src/seo/meta.config.js
// (exclut les entrées noindex : pages légales + placeholders non rédigés). Une
// nouvelle page indexable dans META rejoint donc automatiquement le sitemap.
// changefreq/priority : hint par page, valeur par défaut sinon.
const SITEMAP_HINTS = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/tracking-data': { changefreq: 'monthly', priority: '0.9' },
  '/tracking-data/specialiste-google-tag-manager': { changefreq: 'monthly', priority: '0.9', lastmod: '2026-08-17' },
  '/automatisation-ia': { changefreq: 'monthly', priority: '0.9' },
  '/blog': { changefreq: 'daily', priority: '0.9' },
};
const DEFAULT_HINT = { changefreq: 'monthly', priority: '0.8' };
const STATIC_PAGES = Object.entries(META)
  .filter(([, m]) => !m.noindex)
  .map(([routePath]) => ({
    loc: `${BASE_URL}${routePath === '/' ? '' : routePath}`,
    ...(SITEMAP_HINTS[routePath] || DEFAULT_HINT),
  }));

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

// Cloudflare Pages sert les routes avec un slash final (/foo/) et redirige
// /foo → /foo/ en 308. Le sitemap doit donc déclarer la version AVEC slash
// pour éviter une redirection sur chaque URL et un conflit de canonical.
function withSlash(url) {
  return url.endsWith('/') ? url : `${url}/`;
}

function buildSitemap(staticPages, articles) {
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticPages.map(p => `  <url>
    <loc>${withSlash(p.loc)}</loc>
    <lastmod>${p.lastmod || STATIC_LASTMOD}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

  const articleEntries = articles.map(a => {
    const lastmod = (a.updated_at || a.publish_date || today).split('T')[0];
    return `  <url>
    <loc>${withSlash(`${BASE_URL}/blog/${a.slug}`)}</loc>
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
