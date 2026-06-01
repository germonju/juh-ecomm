/**
 * Post-build script: for each public route, write dist/{route}/index.html
 * with title, canonical, OG, and Twitter tags baked directly into <head>.
 *
 * Why: social crawlers and Google do not execute JavaScript, so react-helmet
 * tags are invisible to them. This script pre-populates the static HTML so
 * link previews and indexation work correctly for all pages including blog posts.
 *
 * Run automatically after `vite build` via the build script in package.json.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const BASE_URL = 'https://www.juh-ecomm.fr';
const OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;
const SITE_NAME = 'Juh Ecomm Data';

// Supabase credentials (same as generate-sitemap.js)
const SUPABASE_URL = 'https://altplorphoohlgjmonbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdHBsb3JwaG9vaGxnam1vbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjgwNzAsImV4cCI6MjA4MDU0NDA3MH0.1ZbFI32wZsdSZ5EQ1vomEFLofggBC-CGWybj_n76ZhE';

const routes = [
  {
    path: '/',
    title: `Expert Tracking Server-Side & Automatisation E-commerce | ${SITE_NAME}`,
    description: "Expert en tracking et data pour votre croissance. Implémentation GTM Server-Side, GA4, Google Ads et automatisation e-commerce. +10 ans d'expérience.",
  },
  {
    path: '/contact',
    title: `Contactez JUH Ecomm Data | ${SITE_NAME}`,
    description: "Contactez notre équipe d'experts JUH Ecomm Data. Discutez de votre stratégie marketing et découvrez comment nous pouvons accélérer votre croissance e-commerce.",
  },
  {
    path: '/audit-google-ads',
    title: `Audit Google Ads Expert | Optimisation ROI & Performance | ${SITE_NAME}`,
    description: "Audit complet de votre compte Google Ads (Search, Shopping, PMax). Identifiez les gaspillages budgétaires et boostez votre rentabilité e-commerce ou leadgen.",
  },
  {
    path: '/gtm-server-side',
    title: `GTM Server-Side | ${SITE_NAME}`,
    description: "Implémentez GTM Server-Side pour améliorer votre tracking et conformité RGPD. Réduisez la dépendance aux cookies tiers et augmentez la qualité de vos données.",
  },
  {
    path: '/ga4-advanced',
    title: `GA4 Avancé | ${SITE_NAME}`,
    description: "Maîtrisez Google Analytics 4 avancé pour exploiter tout le potentiel de vos données. Configurations avancées, audiences personnalisées et insights actionnables.",
  },
  {
    path: '/shopify',
    title: `Shopify Optimisé | ${SITE_NAME}`,
    description: "Optimisez votre boutique Shopify avec notre expertise. Intégrations Google Ads, GA4, tracking avancé et stratégie de croissance pour maximiser vos ventes.",
  },
  {
    path: '/google-my-business',
    title: `Google My Business Optimisé | ${SITE_NAME}`,
    description: "Optimisez votre fiche Google My Business pour augmenter votre visibilité locale. Attirez plus de clients et améliorez votre présence en ligne sur Google Maps.",
  },
  {
    path: '/conversions-offline',
    title: `Conversions Offline | ${SITE_NAME}`,
    description: "Tracez vos conversions offline avec Google Ads et GA4. Connectez vos ventes en magasin à vos campagnes digitales pour une vision 360° de votre ROI.",
  },
  {
    path: '/conciergerie',
    title: `Service Conciergerie Marketing | ${SITE_NAME}`,
    description: "Maîtrisez votre stratégie marketing avec notre service de conciergerie. Pilotage expert, optimisation continue et résultats mesurables pour votre croissance e-commerce.",
    ogImage: `${BASE_URL}/images/conciergerie-og.jpg`,
  },
  {
    path: '/reponse-leads',
    title: `Réponse Leads - Automatisation Prospection | ${SITE_NAME}`,
    description: "Automatisez la gestion de vos leads. Réponses instantanées, qualification automatique et suivi personnalisé pour maximiser votre taux de conversion.",
  },
  {
    path: '/automatisation-hub',
    title: `Automatisation Marketing Hub | ${SITE_NAME}`,
    description: "Automatisez votre marketing avec notre hub complet. Workflows intelligents, optimisation continue et gain de temps pour accélérer votre croissance.",
  },
  {
    path: '/tracking-hub',
    title: `Tracking Hub Complet | ${SITE_NAME}`,
    description: "Centralisez votre tracking avec notre hub complet. Maîtrisez Google Analytics 4, GTM et vos données de conversion pour une stratégie data-driven optimale.",
  },
  {
    path: '/consent-mode',
    title: `Consent Mode V2 & CMP - Conformité RGPD | ${SITE_NAME}`,
    description: "Mise en conformité RGPD avec Google Consent Mode V2. Audit, installation de CMP (Cookiebot, Axeptio...) et configuration GTM pour respecter la vie privée.",
  },
  {
    path: '/landing-pages',
    title: `Landing Pages Haute Conversion | ${SITE_NAME}`,
    description: "Créez des landing pages haute conversion avec notre expertise. Designs optimisés, copywriting persuasif et tests A/B pour maximiser vos taux de conversion.",
  },
  {
    path: '/blog',
    title: `Blog Marketing Digital | ${SITE_NAME}`,
    description: "Découvrez nos guides complets sur Google Ads, GA4, GTM et e-commerce. Conseils d'experts, cas d'études et stratégies pour optimiser votre performance digitale.",
  },
  {
    path: '/seo-audit',
    title: `Audit SEO Complet · Analyse technique & Articles | ${SITE_NAME}`,
    description: "Outil d'audit SEO complet : analyse technique du site et vérification du contenu des articles de blog.",
  },
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
  const url = `${SUPABASE_URL}/rest/v1/articles?status=eq.published&select=slug,meta_title,title,meta_description,image_name,featured_image&order=publish_date.desc`;
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

function escapeAttr(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildMetaTags({ path: routePath, title, description, ogImage, ogType = 'website' }) {
  const url = `${BASE_URL}${routePath === '/' ? '' : routePath}`;
  const image = ogImage || OG_IMAGE;
  const safeTitle = escapeAttr(title);
  const safeDesc = escapeAttr(description);
  const safeImage = escapeAttr(image);
  const safeUrl = escapeAttr(url);

  return `
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />
    <link rel="canonical" href="${safeUrl}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:locale" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@juh_ecomm" />
    <meta name="twitter:url" content="${safeUrl}" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${safeImage}" />`;
}

function injectIntoHtml(html, routeData) {
  const metaTags = buildMetaTags(routeData);

  let result = html.replace(/<title>[^<]*<\/title>/, '');
  result = result.replace(/<meta name="description"[^>]*>/gi, '');
  result = result.replace(/<meta property="og:[^>]*>/gi, '');
  result = result.replace(/<meta name="twitter:[^>]*>/gi, '');
  result = result.replace(/<link rel="canonical"[^>]*>/gi, '');

  return result.replace('</head>', `${metaTags}\n  </head>`);
}

async function run() {
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  let count = 0;

  // Static routes
  for (const route of routes) {
    const html = injectIntoHtml(baseHtml, route);

    if (route.path === '/') {
      fs.writeFileSync(indexPath, html);
    } else {
      const routeDir = path.join(distDir, route.path);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    }

    count++;
    console.log(`  ✓ ${route.path}`);
  }

  // Blog post routes — fetched from Supabase
  console.log('\n📝 Articles de blog:');
  const articles = await fetchPublishedArticles();

  for (const article of articles) {
    const slug = article.slug;
    if (!slug) continue;

    const title = article.meta_title || article.title || SITE_NAME;
    const description = article.meta_description || title;
    const ogImage = article.image_name
      ? `${BASE_URL}/images/blog/${article.image_name}.webp`
      : (article.featured_image || OG_IMAGE);

    const routeData = {
      path: `/blog/${slug}`,
      title,
      description,
      ogImage,
      ogType: 'article',
    };

    const html = injectIntoHtml(baseHtml, routeData);
    const routeDir = path.join(distDir, 'blog', slug);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);

    count++;
    console.log(`  ✓ /blog/${slug}`);
  }

  console.log(`\n✅ Injected social meta tags into ${count} routes (${routes.length} static + ${articles.length} blog posts).`);
}

run();
