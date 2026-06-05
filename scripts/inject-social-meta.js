/**
 * Post-build script: for each public route, write dist/{route}/index.html
 * with title, canonical, OG, Twitter tags, and JSON-LD structured data
 * baked directly into <head>.
 *
 * Why: social crawlers and Google do not execute JavaScript, so react-helmet
 * tags are invisible to them. This script pre-populates the static HTML so
 * link previews, indexation, and rich snippets work correctly for all pages.
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
const AUTHOR_NAME = 'JUH Ecomm Data';

// Supabase credentials (same as generate-sitemap.js)
const SUPABASE_URL = 'https://altplorphoohlgjmonbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdHBsb3JwaG9vaGxnam1vbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjgwNzAsImV4cCI6MjA4MDU0NDA3MH0.1ZbFI32wZsdSZ5EQ1vomEFLofggBC-CGWybj_n76ZhE';

// ---------------------------------------------------------------------------
// FAQ data — mirrored from React components (GtmServerSidePage, ConversionsOfflinePage)
// ---------------------------------------------------------------------------

const GTM_FAQ_ITEMS = [
  {
    question: "Le tracking Server-Side est-il conforme au RGPD ?",
    answer: "Absolument. En réalité, le Server-Side améliore votre conformité RGPD. Contrairement au tracking client-side où les données partent directement du navigateur vers des tiers (Google, Facebook), le Server-Side agit comme un filtre. Vous décidez exactement quelles données sont transmises, vous pouvez anonymiser les adresses IP et supprimer les données personnelles (PII) avant qu'elles ne soient partagées.",
  },
  {
    question: "Est-ce que cela remplace Google Tag Manager classique ?",
    answer: "Non, cela le complète. Vous continuerez d'utiliser votre conteneur Web GTM pour collecter les actions sur votre site (clics, vues). Ce conteneur enverra ensuite les données à votre conteneur Serveur GTM au lieu de les envoyer directement aux plateformes publicitaires. Les deux travaillent en tandem.",
  },
  {
    question: "Quel est l'impact sur la vitesse de mon site ?",
    answer: "L'impact est très positif. En déplaçant les scripts tiers (Facebook Pixel, Google Ads, TikTok, etc.) du navigateur de l'utilisateur vers le serveur, vous réduisez considérablement la quantité de JavaScript à charger et à exécuter côté client. Cela améliore le temps de chargement, le score Core Web Vitals et l'expérience utilisateur mobile.",
  },
  {
    question: "Le Server-Side fonctionne-t-il avec Shopify ?",
    answer: "Oui, parfaitement. Shopify est l'une des meilleures plateformes pour implémenter le Server-Side. Nous pouvons configurer des webhooks et utiliser les événements natifs de Shopify pour alimenter le conteneur serveur, garantissant une fiabilité des données proche de 100% pour les achats et les ajouts au panier.",
  },
  {
    question: "Combien coûte l'hébergement du serveur GTM ?",
    answer: "Le coût dépend du volume de trafic. Pour la plupart des sites e-commerce moyens, via une solution gérée comme AddingWell (recommandée), le coût démarre autour de 90€/mois. Si vous hébergez directement sur Google Cloud Platform, les coûts peuvent être variables mais Google offre un niveau gratuit généreux pour les petits sites.",
  },
  {
    question: "Ai-je besoin de développeurs pour la maintenance ?",
    answer: "Une fois l'infrastructure en place, la maintenance quotidienne est minime. Cependant, le Server-Side est techniquement plus complexe que le Client-Side. C'est pourquoi je propose une formation de vos équipes ou un forfait de maintenance pour gérer les mises à jour des API et s'assurer que le flux de données reste constant.",
  },
  {
    question: "Puis-je voir la différence de données entre Client et Server ?",
    answer: "Oui. Pendant la phase de mise en place, nous configurons souvent un 'double tracking' temporaire ou utilisons les outils de test pour comparer les volumes. On constate généralement une récupération de 15 à 30% de conversions supplémentaires qui étaient auparavant perdues à cause des AdBlockers ou des restrictions de navigateur.",
  },
];

const CONVERSIONS_FAQ_ITEMS = [
  {
    question: "Est-ce compatible avec mon CRM ?",
    answer: "Oui, la solution est compatible avec 99% des CRM du marché (HubSpot, Salesforce, Pipedrive, Zoho...) tant qu'ils permettent l'export de données ou disposent d'une API. Même un simple Google Sheets ou Airtable fonctionne parfaitement.",
  },
  {
    question: "Faut-il modifier mon site web ?",
    answer: "Les modifications sont minimes. Il suffit généralement d'ajouter un petit script de tracking et un champ caché dans vos formulaires pour capturer le paramètre GCLID de Google.",
  },
  {
    question: "Combien de temps avant de voir les résultats ?",
    answer: "La mise en place technique est rapide (quelques jours). Ensuite, l'algorithme de Google Ads a besoin de 2 à 4 semaines d'apprentissage avec les nouvelles données de conversion pour optimiser pleinement vos campagnes.",
  },
  {
    question: "Est-ce rétroactif ?",
    answer: "Google Ads permet d'importer des conversions jusqu'à 90 jours en arrière. Si vous avez déjà stocké les GCLID dans votre base de données, nous pourrons récupérer cet historique pour accélérer l'apprentissage de l'algorithme.",
  },
  {
    question: "Quel budget Google Ads minimum est requis ?",
    answer: "Il n'y a pas de minimum budgétaire strict, mais pour que l'optimisation soit efficace, il est recommandé d'avoir un volume suffisant de conversions (idéalement au moins 15 à 30 conversions qualifiées par mois).",
  },
  {
    question: "Est-ce conforme au RGPD ?",
    answer: "Absolument. Nous traitons des données 'First Party' que vos utilisateurs vous ont confiées. Les identifiants sont envoyés de manière sécurisée et hachée à Google, strictement dans le but de mesurer la performance publicitaire, en conformité avec les directives de Google et du RGPD.",
  },
];

// ---------------------------------------------------------------------------
// Structured data builders
// ---------------------------------------------------------------------------

function buildBreadcrumb(routePath, pageName) {
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
  ];
  if (routePath !== '/') {
    items.push({ '@type': 'ListItem', position: 2, name: pageName, item: `${BASE_URL}${routePath}` });
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

function buildBreadcrumbArticle(slug, title) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: `${BASE_URL}/blog/${slug}` },
    ],
  };
}

function buildFaqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

function buildArticleSchema({ title, description, image, publishDate, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: publishDate || undefined,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.png` },
    },
    url: `${BASE_URL}/blog/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${slug}` },
  };
}

function buildJsonLdTags(schemas) {
  return schemas
    .map(s => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n');
}

// ---------------------------------------------------------------------------
// Titres synchronisés avec les balises <title> des composants React (Helmet).
// Descriptions limitées à 155 caractères max pour éviter la troncature Google.
// Les pages noindex (seo-audit, mentions-legales, politique-confidentialite, api-docs) sont exclues.
// ---------------------------------------------------------------------------

const routes = [
  {
    path: '/',
    title: `Expert Tracking Server-Side & Automatisation E-commerce | ${SITE_NAME}`,
    description: "Expert en tracking et data pour votre croissance. Implémentation GTM Server-Side, GA4, Google Ads et automatisation e-commerce. +10 ans d'expérience.",
    breadcrumbName: 'Accueil',
  },
  {
    path: '/contact',
    title: `Contactez JUH Ecomm Data | ${SITE_NAME}`,
    description: "Contactez JUH Ecomm Data pour discuter de votre stratégie tracking, GA4 et GTM Server-Side. Nos experts vous répondent rapidement.",
    breadcrumbName: 'Contact',
  },
  {
    path: '/audit-google-ads',
    title: `Audit Google Ads Expert : ROI & Performance | JUH Ecomm`,
    description: "Audit complet de votre compte Google Ads : Search, Shopping, PMax. Identifiez les gaspillages et boostez votre rentabilité e-commerce.",
    breadcrumbName: 'Audit Google Ads',
  },
  {
    path: '/gtm-server-side',
    title: `GTM Server-Side : Tracking Cookieless & RGPD | JUH Ecomm`,
    description: "Implémentez GTM Server-Side pour améliorer votre tracking RGPD. Réduisez la dépendance aux cookies tiers et améliorez la qualité de vos données.",
    breadcrumbName: 'GTM Server-Side',
    faqItems: GTM_FAQ_ITEMS,
  },
  {
    path: '/ga4-advanced',
    title: `GA4 Avancé : Analytics, Audiences & Reporting | JUH Ecomm`,
    description: "Maîtrisez Google Analytics 4 avancé pour exploiter vos données. Configurations avancées, audiences personnalisées et insights actionnables.",
    breadcrumbName: 'GA4 Avancé',
  },
  {
    path: '/shopify',
    title: `Shopify Tracking GA4 & Google Ads Expert | JUH Ecomm Data`,
    description: "Optimisez votre boutique Shopify avec notre expertise. Intégrations Google Ads, GA4, tracking avancé et stratégie de croissance pour maximiser vos ventes.",
    breadcrumbName: 'Shopify',
  },
  {
    path: '/google-my-business',
    title: `Google My Business : Visibilité Locale Expert | JUH Ecomm`,
    description: "Optimisez votre fiche Google My Business pour augmenter votre visibilité locale. Attirez plus de clients et améliorez votre présence sur Google Maps.",
    breadcrumbName: 'Google My Business',
  },
  {
    path: '/conversions-offline',
    title: `Conversions Offline Google Ads & GA4 | JUH Ecomm Data`,
    description: "Tracez vos conversions offline avec Google Ads et GA4. Connectez vos ventes en magasin à vos campagnes digitales pour une vision 360° de votre ROI.",
    breadcrumbName: 'Conversions Offline',
    faqItems: CONVERSIONS_FAQ_ITEMS,
  },
  {
    path: '/conciergerie',
    title: `Conciergerie Marketing : Pilotage Expert | JUH Ecomm Data`,
    description: "Service de conciergerie marketing : pilotage expert de vos campagnes Google Ads, GA4 et tracking. Résultats mesurables pour votre croissance.",
    breadcrumbName: 'Conciergerie',
    ogImage: `${BASE_URL}/images/conciergerie-og.jpg`,
  },
  {
    path: '/reponse-leads',
    title: `Réponse Leads - Automatisation Prospection | ${SITE_NAME}`,
    description: "Automatisez la gestion de vos leads. Réponses instantanées, qualification automatique et suivi personnalisé pour maximiser votre taux de conversion.",
    breadcrumbName: 'Réponse Leads',
  },
  {
    path: '/automatisation-hub',
    title: `Automatisation Marketing : Workflows & Make | JUH Ecomm`,
    description: "Automatisez votre marketing avec notre hub complet. Workflows intelligents, optimisation continue et gain de temps pour accélérer votre croissance.",
    breadcrumbName: 'Automatisation Hub',
  },
  {
    path: '/tracking-hub',
    title: `Tracking Hub : GA4, GTM & Conversions Expert | JUH Ecomm`,
    description: "Centralisez votre tracking avec notre hub complet. Maîtrisez Google Analytics 4, GTM et vos données de conversion pour une stratégie data-driven optimale.",
    breadcrumbName: 'Tracking Hub',
  },
  {
    path: '/consent-mode',
    title: `Consent Mode V2 & CMP - Conformité RGPD | ${SITE_NAME}`,
    description: "Mise en conformité RGPD avec Google Consent Mode V2. Audit, installation de CMP (Cookiebot, Axeptio...) et configuration GTM pour respecter la vie privée.",
    breadcrumbName: 'Consent Mode V2',
  },
  {
    path: '/landing-pages',
    title: `Landing Pages Haute Conversion & A/B Testing | JUH Ecomm`,
    description: "Créez des landing pages haute conversion avec notre expertise. Designs optimisés, copywriting persuasif et tests A/B pour maximiser vos taux de conversion.",
    breadcrumbName: 'Landing Pages',
  },
  {
    path: '/blog',
    title: `Blog Marketing Digital | ${SITE_NAME}`,
    description: "Guides experts sur Google Ads, GA4, GTM et e-commerce. Cas d'études et stratégies pour optimiser votre performance digitale.",
    breadcrumbName: 'Blog',
  },
];

// ---------------------------------------------------------------------------
// Supabase fetch
// ---------------------------------------------------------------------------

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
  const url = `${SUPABASE_URL}/rest/v1/articles?status=eq.published&select=slug,meta_title,title,meta_description,image_name,featured_image,publish_date&order=publish_date.desc`;
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

// ---------------------------------------------------------------------------
// HTML injection
// ---------------------------------------------------------------------------

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

function injectIntoHtml(html, routeData, schemas = []) {
  const metaTags = buildMetaTags(routeData);
  const jsonLdTags = schemas.length > 0 ? '\n' + buildJsonLdTags(schemas) : '';

  let result = html.replace(/<title>[^<]*<\/title>/, '');
  result = result.replace(/<meta name="description"[^>]*>/gi, '');
  result = result.replace(/<meta property="og:[^>]*>/gi, '');
  result = result.replace(/<meta name="twitter:[^>]*>/gi, '');
  result = result.replace(/<link rel="canonical"[^>]*>/gi, '');

  return result.replace('</head>', `${metaTags}${jsonLdTags}\n  </head>`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run() {
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  let count = 0;

  console.log('📄 Pages statiques:');
  for (const route of routes) {
    const schemas = [buildBreadcrumb(route.path, route.breadcrumbName)];
    if (route.faqItems) {
      schemas.push(buildFaqSchema(route.faqItems));
    }

    const html = injectIntoHtml(baseHtml, route, schemas);

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
    const publishDate = article.publish_date
      ? new Date(article.publish_date).toISOString().split('T')[0]
      : undefined;

    const routeData = {
      path: `/blog/${slug}`,
      title,
      description,
      ogImage,
      ogType: 'article',
    };

    const schemas = [
      buildArticleSchema({ title, description, image: ogImage, publishDate, slug }),
      buildBreadcrumbArticle(slug, title),
    ];

    const html = injectIntoHtml(baseHtml, routeData, schemas);
    const routeDir = path.join(distDir, 'blog', slug);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);

    count++;
    console.log(`  ✓ /blog/${slug}`);
  }

  console.log(`\n✅ ${count} routes traitées (${routes.length} statiques + ${articles.length} articles blog).`);
}

run();
