import { createClient } from 'jsr:@supabase/supabase-js@2';

const BASE_URL = 'https://www.juh-ecomm.fr';

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

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );

    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, publish_date, updated_at')
      .eq('status', 'published')
      .order('publish_date', { ascending: false });

    if (error) throw error;

    const today = new Date().toISOString().split('T')[0];

    const staticEntries = STATIC_PAGES.map((p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

    const articleEntries = (articles ?? []).map((a) => {
      const lastmod = (a.updated_at || a.publish_date || today).split('T')[0];
      return `  <url>
    <loc>${BASE_URL}/blog/${a.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${articleEntries}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('Sitemap error:', err);
    return new Response('Internal Server Error', { status: 500, headers: CORS_HEADERS });
  }
});
