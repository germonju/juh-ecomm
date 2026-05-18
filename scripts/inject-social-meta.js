/**
 * Post-build script: for each public route, write dist/{route}/index.html
 * with title, canonical, OG, and Twitter tags baked directly into <head>.
 *
 * Why: social crawlers (Facebook, LinkedIn, WhatsApp, Twitter/X) do not
 * execute JavaScript, so react-helmet tags are invisible to them. This
 * script pre-populates the static HTML so link previews work correctly.
 *
 * Run automatically after `vite build` via the build script in package.json.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const BASE_URL = 'https://www.juh-ecomm.fr';
const OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;
const SITE_NAME = 'Juh Ecomm Data';

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

function buildMetaTags(route) {
  const url = `${BASE_URL}${route.path === '/' ? '' : route.path}`;
  const image = route.ogImage || OG_IMAGE;

  return `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@juh_ecomm" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${image}" />`;
}

function injectIntoHtml(html, route) {
  const metaTags = buildMetaTags(route);

  // Replace the base title with the route-specific one
  let result = html.replace(/<title>[^<]*<\/title>/, '');

  // Strip any existing description/og/twitter tags from the base index.html
  // (there usually aren't any, but be safe)
  result = result.replace(/<meta name="description"[^>]*>/gi, '');
  result = result.replace(/<meta property="og:[^>]*>/gi, '');
  result = result.replace(/<meta name="twitter:[^>]*>/gi, '');
  result = result.replace(/<link rel="canonical"[^>]*>/gi, '');

  // Inject before </head>
  return result.replace('</head>', `${metaTags}\n  </head>`);
}

function run() {
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  let count = 0;

  for (const route of routes) {
    const html = injectIntoHtml(baseHtml, route);

    if (route.path === '/') {
      // Root — overwrite dist/index.html in place
      fs.writeFileSync(indexPath, html);
    } else {
      // Sub-routes — create dist/{route}/index.html
      const routeDir = path.join(distDir, route.path);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    }

    count++;
    console.log(`  ✓ ${route.path}`);
  }

  console.log(`\n✅ Injected social meta tags into ${count} routes.`);
}

run();
