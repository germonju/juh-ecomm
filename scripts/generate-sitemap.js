import process from 'process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import https from 'https';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchFromEdgeFunction(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Status Code: ${res.statusCode}`));
      }

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

async function generateFiles() {
  console.log('🚀 Starting SEO Files Generation with WWW subdomain...');
  
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // --- 1. DETERMINE EDGE FUNCTION URL ---
  let edgeFunctionUrl = '';
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;

  if (supabaseUrl) {
    const match = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
    if (match && match[1]) {
      const projectRef = match[1];
      edgeFunctionUrl = `https://${projectRef}.supabase.co/functions/v1/generate-sitemap`;
      console.log(`🔗 Edge Function URL: ${edgeFunctionUrl}`);
    }
  }

  // Updated sitemap base URL to include www
  const sitemapUrl = 'https://www.juh-ecomm.fr/sitemap.xml';

  // --- 2. FETCH AND SAVE SITEMAP ---
  if (edgeFunctionUrl) {
    try {
      console.log('Fetching sitemap from Edge Function...');
      const sitemapContent = await fetchFromEdgeFunction(edgeFunctionUrl);
      
      // Ensure the content actually contains www as a secondary check
      if (!sitemapContent.includes('www.juh-ecomm.fr')) {
        console.warn('⚠️ Warning: Edge function response might be missing www subdomain. Please check edge function deployment.');
      }

      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
      console.log('✅ public/sitemap.xml generated dynamically from Edge Function (with WWW).');
    } catch (error) {
      console.error('❌ Failed to fetch sitemap from Edge Function:', error.message);
      console.log('Generating fallback static sitemap with WWW...');
      
      const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.juh-ecomm.fr</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fallbackSitemap);
    }
  } else {
    console.log('⚠️ No Supabase URL found. Cannot fetch dynamic sitemap.');
  }

  // --- 3. GENERATE ROBOTS.TXT ---
  const robotsContent = `User-agent: *
Allow: /

# Block all technical routes
Disallow: /api/
Disallow: /admin/
Disallow: /preview/
Disallow: /_next/
Disallow: /internal/
Disallow: /private/
Disallow: /docs/

# Sitemap
Sitemap: ${sitemapUrl}
`;
  
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
  console.log('✅ public/robots.txt generated');
  console.log('   - Blocked /api/');
  console.log(`   - Sitemap: ${sitemapUrl}`);
}

generateFiles();