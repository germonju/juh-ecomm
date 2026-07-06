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

const AGENT_IA_FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'un agent IA conversationnel connecté à mes données ?",
    answer: "C'est un assistant intelligent, disponible via une simple messagerie (chat écrit ou vocal), branché sur VOS outils : planning, CRM/clients, facturation, base de données et documents internes. Au lieu d'ouvrir cinq logiciels différents pour retrouver une information, vous la demandez en langage naturel et l'agent vous répond instantanément, en s'appuyant sur vos données réelles et en citant ses sources. Contrairement à un chatbot générique, il connaît votre activité et peut agir dessus.",
  },
  {
    question: "À quels outils l'agent peut-il se connecter ?",
    answer: "À la grande majorité des outils du marché dès qu'ils disposent d'une API ou d'un export : agendas (Google Calendar, Outlook), CRM (HubSpot, Pipedrive, Salesforce…), facturation et comptabilité, bases de données (Airtable, Notion, PostgreSQL, Google Sheets), messageries et espaces de documents. Lors du cadrage, nous identifions ensemble vos sources prioritaires et la façon la plus sûre de les connecter.",
  },
  {
    question: "L'agent peut-il vraiment accomplir des tâches, pas seulement répondre ?",
    answer: "Oui. En plus de répondre à vos questions, il peut exécuter des actions que vous lui autorisez : créer un rendez-vous ou un rappel, envoyer un e-mail, générer un devis ou une facture, mettre à jour une fiche client, rédiger un contenu. Vous gardez la main : pour les actions sensibles (envoi, facturation), l'agent prépare et vous validez d'un clic avant exécution.",
  },
  {
    question: "Mes données sont-elles en sécurité et conformes au RGPD ?",
    answer: "La sécurité et la confidentialité sont au cœur du dispositif. L'agent est cloisonné à votre environnement, avec une gestion fine des droits d'accès : il ne voit que ce que vous l'autorisez à voir et ne répond qu'à vous. Les échanges sont chiffrés, aucune donnée n'est utilisée pour entraîner des modèles publics, et l'ensemble est conçu dans le respect du RGPD.",
  },
  {
    question: "Combien de temps faut-il pour le mettre en place ?",
    answer: "Cela dépend du nombre de sources à connecter et des tâches à automatiser. Un premier agent utile — connecté à une ou deux sources clés — se met généralement en place en quelques jours. On démarre sur un périmètre restreint à forte valeur, on valide les résultats, puis on élargit progressivement les connexions et les actions.",
  },
  {
    question: "Pourquoi le tarif est-il sur devis ?",
    answer: "Parce que chaque activité a ses outils, ses données et ses cas d'usage. Le prix dépend du nombre de sources à connecter, de la complexité des tâches à automatiser et du niveau d'intégration souhaité. Après un échange pour comprendre votre fonctionnement, vous recevez un devis détaillé et transparent, sans engagement.",
  },
];

// ---------------------------------------------------------------------------
// Structured data builders
// ---------------------------------------------------------------------------

function buildBreadcrumb(routePath, pageName) {
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: canonicalUrl('/') },
  ];
  if (routePath !== '/') {
    items.push({ '@type': 'ListItem', position: 2, name: pageName, item: canonicalUrl(routePath) });
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

function buildBreadcrumbArticle(slug, title) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: canonicalUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: canonicalUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl(`/blog/${slug}`) },
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

function buildArticleSchema({ title, description, image, publishDate, modifiedDate, slug }) {
  const articleUrl = canonicalUrl(`/blog/${slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    inLanguage: 'fr-FR',
    datePublished: publishDate || undefined,
    dateModified: modifiedDate || publishDate || undefined,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: canonicalUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: canonicalUrl('/'),
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.png` },
    },
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  };
}

// Schema Organization (home uniquement) : association marque ↔ site, logo
// dans les SERP, knowledge graph. Renforce l'E-E-A-T.
const LINKEDIN_URL = 'https://www.linkedin.com/in/julien-germon-27630b141/';

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: canonicalUrl('/'),
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.png` },
    image: OG_IMAGE,
    description: "Expert en tracking server-side, GA4, Google Ads et automatisation e-commerce.",
    sameAs: [LINKEDIN_URL],
    founder: { '@type': 'Person', name: 'Julien Germon', url: LINKEDIN_URL },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: canonicalUrl('/contact'),
      availableLanguage: ['fr'],
    },
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
    h1: 'Expert Tracking Server-Side & Automatisation E-commerce',
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
    path: '/back-office-conciergerie',
    title: `Back Office Conciergerie : Gestion Automatisée | JUH Ecomm Data`,
    description: "Back office sur mesure pour conciergeries : fiches contact automatiques, statistiques temps réel, facturation automatisée, analyse d'annonces et retouche photo.",
    breadcrumbName: 'Back Office Conciergerie',
  },
  {
    path: '/agent-ia-conversationnel',
    title: `Création d'Agent IA Conversationnel sur Mesure | JUH Ecomm Data`,
    description: "Un agent IA conversationnel relié à votre planning, vos clients, votre facturation et votre base de données. Réponses instantanées et tâches accomplies à votre place.",
    breadcrumbName: 'Agent IA Conversationnel',
    faqItems: AGENT_IA_FAQ_ITEMS,
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

// H1 réels des composants React, repris à l'identique pour le corps
// pré-rendu (cohérence entre la vague pré-rendu et la vague rendu JS).
const H1_BY_PATH = {
  '/contact': 'Parlons de votre projet tracking',
  '/audit-google-ads': 'Optimisez vos campagnes avec un Audit Google Ads complet',
  '/gtm-server-side': 'Google Tag Manager Server-Side',
  '/ga4-advanced': 'GA4 Avancé',
  '/shopify': 'Tracking Shopify & E-commerce',
  '/google-my-business': 'Google My Business automatisé',
  '/conversions-offline': 'Conversions Offline Google Ads',
  '/conciergerie': 'Service pour conciergerie : automatisation Airbnb & Booking',
  '/back-office-conciergerie': 'Back office sur mesure pour conciergeries',
  '/agent-ia-conversationnel': 'Votre agent IA conversationnel, relié à toute votre activité',
  '/reponse-leads': 'Réponse Leads',
  '/automatisation-hub': 'Automatisation Hub',
  '/tracking-hub': 'Tracking Hub',
  '/consent-mode': 'Consent Mode V2, CMP et mise en conformité RGPD',
  '/landing-pages': 'Landing Pages Haute Conversion pour Vos Campagnes Publicitaires',
  '/blog': 'Le Blog Expert Data',
};

// Pages exclues de l'indexation. On les pré-rend quand même (avec un
// <meta robots noindex> statique) pour deux raisons :
//   1. garantir le noindex dès le crawl, sans dépendre du rendu JS ;
//   2. donner un fichier statique à CHAQUE route React, ce qui permet de
//      retirer le fallback SPA et de servir une vraie 404 (cf. _redirects).
const NOINDEX_ROUTES = [
  { path: '/api-docs',                  title: `Documentation API | ${SITE_NAME}`,            breadcrumbName: 'API' },
  { path: '/seo-audit',                 title: `Audit SEO | ${SITE_NAME}`,                    breadcrumbName: 'Audit SEO' },
  { path: '/mentions-legales',          title: `Mentions légales | ${SITE_NAME}`,             breadcrumbName: 'Mentions légales' },
  { path: '/politique-confidentialite', title: `Politique de confidentialité | ${SITE_NAME}`, breadcrumbName: 'Politique de confidentialité' },
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
  const url = `${SUPABASE_URL}/rest/v1/articles?status=eq.published&select=slug,meta_title,title,meta_description,image_name,featured_image,publish_date,updated_at&order=publish_date.desc`;
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

// Cloudflare Pages sert chaque route avec un slash final (/foo/) et redirige
// /foo → /foo/ en 308. Canonical, og:url et les URLs JSON-LD doivent donc
// déclarer la version AVEC slash, sinon ils pointent vers une redirection.
function canonicalUrl(routePath) {
  if (routePath === '/') return `${BASE_URL}/`;
  const clean = routePath.endsWith('/') ? routePath : `${routePath}/`;
  return `${BASE_URL}${clean}`;
}

function buildMetaTags({ path: routePath, title, description, ogImage, ogType = 'website', noindex = false }) {
  const url = canonicalUrl(routePath);
  const image = ogImage || OG_IMAGE;
  const safeTitle = escapeAttr(title);
  const safeDesc = escapeAttr(description);
  const safeImage = escapeAttr(image);
  const safeUrl = escapeAttr(url);
  const robotsTag = noindex
    ? '\n    <meta name="robots" content="noindex,follow" />'
    : '';

  return `
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />${robotsTag}
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

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Corps minimal pré-rendu injecté dans #root : H1 + chapô visibles dès le
// crawl (avant exécution du JS). React remplace ce contenu au montage.
// Évite que Google voie une page vide (risque thin-content / soft 404).
function buildPrerenderBody({ heading, lead }) {
  if (!heading) return '';
  const h1 = `<h1>${escapeHtml(heading)}</h1>`;
  const p = lead ? `<p>${escapeHtml(lead)}</p>` : '';
  return `<div data-prerender="seo">${h1}${p}</div>`;
}

function injectIntoHtml(html, routeData, schemas = [], bodyHtml = '') {
  const metaTags = buildMetaTags(routeData);
  const jsonLdTags = schemas.length > 0 ? '\n' + buildJsonLdTags(schemas) : '';

  let result = html.replace(/<title>[^<]*<\/title>/, '');
  result = result.replace(/<meta name="description"[^>]*>/gi, '');
  result = result.replace(/<meta name="robots"[^>]*>/gi, '');
  result = result.replace(/<meta property="og:[^>]*>/gi, '');
  result = result.replace(/<meta name="twitter:[^>]*>/gi, '');
  result = result.replace(/<link rel="canonical"[^>]*>/gi, '');

  result = result.replace('</head>', `${metaTags}${jsonLdTags}\n  </head>`);

  if (bodyHtml) {
    result = result.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  }

  return result;
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
    if (route.path === '/') {
      schemas.push(buildOrganizationSchema());
    }
    if (route.faqItems) {
      schemas.push(buildFaqSchema(route.faqItems));
    }

    const heading = route.h1 || H1_BY_PATH[route.path] || route.breadcrumbName;
    const bodyHtml = buildPrerenderBody({ heading, lead: route.description });
    const html = injectIntoHtml(baseHtml, route, schemas, bodyHtml);

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

  console.log('\n🚫 Pages noindex:');
  for (const route of NOINDEX_ROUTES) {
    const routeData = { ...route, description: route.title, noindex: true };
    const bodyHtml = buildPrerenderBody({ heading: route.breadcrumbName });
    const html = injectIntoHtml(baseHtml, routeData, [], bodyHtml);
    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    count++;
    console.log(`  ✓ ${route.path} (noindex)`);
  }

  // Page 404 statique : servie par Cloudflare Pages avec un vrai HTTP 404
  // pour toute route inconnue (le catch-all SPA a été retiré de _redirects).
  const notFoundHtml = injectIntoHtml(
    baseHtml,
    { path: '/404', title: `Page introuvable (404) | ${SITE_NAME}`, description: "La page demandée n'existe pas ou a été déplacée.", noindex: true },
    [],
    buildPrerenderBody({ heading: 'Page introuvable', lead: "La page demandée n'existe pas ou a été déplacée." }),
  );
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
  console.log('  ✓ /404.html (HTTP 404)');

  // Purge des articles pré-rendus orphelins (dépubliés/supprimés) : on
  // reconstruit dist/blog uniquement à partir des articles publiés.
  const blogDir = path.join(distDir, 'blog');
  if (fs.existsSync(blogDir)) {
    for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        fs.rmSync(path.join(blogDir, entry.name), { recursive: true, force: true });
      }
    }
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
    const modifiedDate = article.updated_at
      ? new Date(article.updated_at).toISOString().split('T')[0]
      : undefined;

    const routeData = {
      path: `/blog/${slug}`,
      title,
      description,
      ogImage,
      ogType: 'article',
    };

    const schemas = [
      buildArticleSchema({ title, description, image: ogImage, publishDate, modifiedDate, slug }),
      buildBreadcrumbArticle(slug, title),
    ];

    const bodyHtml = buildPrerenderBody({ heading: article.title || title, lead: description });
    const html = injectIntoHtml(baseHtml, routeData, schemas, bodyHtml);
    const routeDir = path.join(distDir, 'blog', slug);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);

    count++;
    console.log(`  ✓ /blog/${slug}`);
  }

  console.log(`\n✅ ${count} routes traitées (${routes.length} statiques + ${NOINDEX_ROUTES.length} noindex + ${articles.length} articles blog + 404).`);
}

run();
