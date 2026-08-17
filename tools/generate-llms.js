#!/usr/bin/env node

/**
 * Génère public/llms.txt — l'index du site destiné aux LLM et aux moteurs
 * de recherche conversationnels (format llmstxt.org : H1, résumé, sections H2
 * de liens annotés).
 *
 * Source unique : src/seo/meta.config.js (titres, descriptions, silos, noindex),
 * exactement comme scripts/generate-sitemap.js et scripts/inject-social-meta.js.
 * Les articles publiés sont récupérés depuis Supabase, comme pour le sitemap.
 *
 * Historique : ce script parsait auparavant les balises <Helmet> des composants
 * de page. Depuis la centralisation des metas dans meta.config.js, ces balises
 * ont disparu des pages et le fichier généré ne contenait plus que des entrées
 * « Untitled Page » sur des URLs inventées (/gtmserverside…). D'où la réécriture.
 *
 * Lancé en première étape de `npm run build` (échec non bloquant).
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { META, BASE_URL, SITE_NAME, SILO_TRACKING, SILO_AUTOMATISATION } from '../src/seo/meta.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mêmes credentials publics que scripts/generate-sitemap.js (clé anon, lecture seule).
const SUPABASE_URL = 'https://altplorphoohlgjmonbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdHBsb3JwaG9vaGxnam1vbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjgwNzAsImV4cCI6MjA4MDU0NDA3MH0.1ZbFI32wZsdSZ5EQ1vomEFLofggBC-CGWybj_n76ZhE';

const SITE_SUMMARY =
  "Consultance en tracking e-commerce et automatisation : GTM (Web & Server-Side), GA4, Google Ads, conversions offline, conformité RGPD, agents IA et workflows pour e-commerçants et TPE.";

const BRAND_SUFFIX = ` | ${SITE_NAME}`;

// Cloudflare Pages sert les routes avec un slash final : on déclare la version
// canonique directement pour éviter une redirection 308 sur chaque lien.
function absoluteUrl(routePath) {
  const url = `${BASE_URL}${routePath === '/' ? '' : routePath}`;
  return url.endsWith('/') ? url : `${url}/`;
}

function cleanTitle(title) {
  return title.endsWith(BRAND_SUFFIX) ? title.slice(0, -BRAND_SUFFIX.length) : title;
}

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
        catch { reject(new Error('Invalid JSON')); }
      });
    }).on('error', reject);
  });
}

async function fetchPublishedArticles() {
  const url = `${SUPABASE_URL}/rest/v1/articles?status=eq.published&select=slug,title,meta_title,meta_description,publish_date&order=publish_date.desc`;
  try {
    return await fetchJson(url, {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    });
  } catch (err) {
    console.warn(`  ⚠️ Articles non récupérés: ${err.message}`);
    return [];
  }
}

// Une entrée de liste llms.txt : « - [Titre](url): description ».
function entry({ title, url, description }) {
  const desc = (description || '').replace(/\s+/g, ' ').trim();
  return `- [${title}](${url})${desc ? `: ${desc}` : ''}`;
}

function pageEntries(predicate) {
  return Object.entries(META)
    .filter(([, meta]) => !meta.noindex)
    .filter(([routePath, meta]) => predicate(routePath, meta))
    .map(([routePath, meta]) => entry({
      title: cleanTitle(meta.title),
      url: absoluteUrl(routePath),
      description: meta.description,
    }));
}

function buildLlmsTxt(articles) {
  const sections = [];

  // Pages transverses : ni hub de silo, ni page de silo, ni blog.
  const general = pageEntries((routePath, meta) =>
    !meta.silo &&
    routePath !== SILO_TRACKING &&
    routePath !== SILO_AUTOMATISATION &&
    routePath !== '/blog',
  );
  if (general.length) sections.push(`## Pages principales\n\n${general.join('\n')}`);

  const tracking = pageEntries((routePath, meta) => routePath === SILO_TRACKING || meta.silo === SILO_TRACKING);
  if (tracking.length) sections.push(`## Tracking & Data\n\n${tracking.join('\n')}`);

  const automatisation = pageEntries((routePath, meta) => routePath === SILO_AUTOMATISATION || meta.silo === SILO_AUTOMATISATION);
  if (automatisation.length) sections.push(`## Automatisation & IA\n\n${automatisation.join('\n')}`);

  const blogIndex = META['/blog'];
  const blogEntries = [];
  if (blogIndex && !blogIndex.noindex) {
    blogEntries.push(entry({
      title: cleanTitle(blogIndex.title),
      url: absoluteUrl('/blog'),
      description: blogIndex.description,
    }));
  }
  for (const a of articles) {
    blogEntries.push(entry({
      title: cleanTitle(a.meta_title || a.title || a.slug),
      url: absoluteUrl(`/blog/${a.slug}`),
      description: a.meta_description,
    }));
  }
  if (blogEntries.length) sections.push(`## Blog\n\n${blogEntries.join('\n')}`);

  return `# ${SITE_NAME}\n\n> ${SITE_SUMMARY}\n\n${sections.join('\n\n')}\n`;
}

async function main() {
  console.log('🤖 Génération de llms.txt...');

  const articles = await fetchPublishedArticles();
  const content = buildLlmsTxt(articles);

  const outputPath = path.join(__dirname, '..', 'public', 'llms.txt');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');

  const staticCount = Object.values(META).filter(m => !m.noindex).length;
  console.log(`✅ llms.txt généré (${staticCount} pages + ${articles.length} articles)`);
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  main().catch((err) => {
    console.error(`❌ llms.txt non généré: ${err.message}`);
    process.exit(1);
  });
}
