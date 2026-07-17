/**
 * SOURCE UNIQUE DE VÉRITÉ — meta SEO par route.
 *
 * Ce module est un objet de données PUR (aucun JSX, aucune API navigateur)
 * afin d'être importable à la fois par :
 *   - Node   → scripts/inject-social-meta.js (bake le HTML statique)
 *   - Vite   → src/components/SeoHead.jsx (React Helmet, DOM hydraté)
 *   - Vite   → index.html (title de base, gardé synchronisé manuellement)
 *
 * Règle : plus AUCUN <title>/<meta description>/canonical écrit en dur ailleurs.
 * Une seule édition ici = title/description/canonical alignés sur les deux
 * vagues d'indexation (HTML baké + rendu JS). Fin du bug des titres divergents.
 *
 * Contrainte titre : viser 50-60 caractères, mot-clé principal en tête.
 * Suffixe de marque standardisé : « | Juh Ecomm Data ».
 */

export const SITE_NAME = 'Juh Ecomm Data';
export const BASE_URL = 'https://www.juh-ecomm.fr';
export const OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;
export const TWITTER_SITE = '@juh_ecomm';

const B = ' | Juh Ecomm Data';

/**
 * Clé = pathname de la route (sans slash final, '/' pour la home).
 * Champs :
 *   title           <title> + og:title + twitter:title (≤60 car.)
 *   description     meta description + og/twitter (≤155 car.)
 *   h1              titre H1 pré-rendu (cohérence crawl/rendu JS)
 *   breadcrumbName  libellé du fil d'Ariane (JSON-LD BreadcrumbList)
 *   ogImage?        surcharge de l'image OG (défaut : OG_IMAGE)
 *   ogType?         'website' (défaut) | 'article'
 *   faqKey?         clé FAQ pré-rendue (voir scripts/inject-social-meta.js)
 *   noindex?        true → <meta robots="noindex,follow">, exclu du sitemap
 */
export const META = {
  '/': {
    title: `Expert Tracking & Automatisation E-commerce${B}`,
    description: "Expert en tracking et data pour votre croissance. Implémentation GTM Server-Side, GA4, Google Ads et automatisation e-commerce. +10 ans d'expérience.",
    h1: 'Expert Tracking Server-Side & Automatisation E-commerce',
    breadcrumbName: 'Accueil',
  },
  '/contact': {
    title: `Contactez un Expert Tracking & Data${B}`,
    description: "Contactez JUH Ecomm Data pour discuter de votre stratégie tracking, GA4 et GTM Server-Side. Nos experts vous répondent rapidement.",
    h1: 'Parlons de votre projet tracking',
    breadcrumbName: 'Contact',
  },
  '/tracking-hub': {
    title: `Tracking Hub : GA4, GTM & Conversions${B}`,
    description: "Centralisez votre tracking avec notre hub complet. Maîtrisez Google Analytics 4, GTM et vos données de conversion pour une stratégie data-driven optimale.",
    h1: 'Tracking Hub',
    breadcrumbName: 'Tracking Hub',
  },
  '/gtm-server-side': {
    title: `GTM Server-Side : Tracking Cookieless RGPD${B}`,
    description: "Implémentez GTM Server-Side pour améliorer votre tracking RGPD. Réduisez la dépendance aux cookies tiers et améliorez la qualité de vos données.",
    h1: 'Google Tag Manager Server-Side',
    breadcrumbName: 'GTM Server-Side',
    faqKey: 'gtm',
  },
  '/ga4-advanced': {
    title: `GA4 Avancé : Analytics & Audiences${B}`,
    description: "Maîtrisez Google Analytics 4 avancé pour exploiter vos données. Configurations avancées, audiences personnalisées et insights actionnables.",
    h1: 'GA4 Avancé',
    breadcrumbName: 'GA4 Avancé',
  },
  '/shopify': {
    title: `Tracking Shopify GA4 & Google Ads${B}`,
    description: "Optimisez votre boutique Shopify avec notre expertise. Intégrations Google Ads, GA4, tracking avancé et stratégie de croissance pour maximiser vos ventes.",
    h1: 'Tracking Shopify & E-commerce',
    breadcrumbName: 'Shopify',
  },
  '/audit-google-ads': {
    title: `Audit Google Ads : ROI & Performance${B}`,
    description: "Audit complet de votre compte Google Ads : Search, Shopping, PMax. Identifiez les gaspillages et boostez votre rentabilité e-commerce.",
    h1: 'Optimisez vos campagnes avec un Audit Google Ads complet',
    breadcrumbName: 'Audit Google Ads',
  },
  '/conversions-offline': {
    title: `Conversions Offline Google Ads & GA4${B}`,
    description: "Tracez vos conversions offline avec Google Ads et GA4. Connectez vos ventes en magasin à vos campagnes digitales pour une vision 360° de votre ROI.",
    h1: 'Conversions Offline Google Ads',
    breadcrumbName: 'Conversions Offline',
    faqKey: 'conversions',
  },
  '/consent-mode': {
    title: `Consent Mode V2 & CMP : Conformité RGPD${B}`,
    description: "Mise en conformité RGPD avec Google Consent Mode V2. Audit, installation de CMP (Cookiebot, Axeptio...) et configuration GTM pour respecter la vie privée.",
    h1: 'Consent Mode V2, CMP et mise en conformité RGPD',
    breadcrumbName: 'Consent Mode V2',
  },
  '/landing-pages': {
    title: `Landing Pages Haute Conversion & A/B Test${B}`,
    description: "Créez des landing pages haute conversion avec notre expertise. Designs optimisés, copywriting persuasif et tests A/B pour maximiser vos taux de conversion.",
    h1: 'Landing Pages Haute Conversion pour Vos Campagnes Publicitaires',
    breadcrumbName: 'Landing Pages',
  },
  '/automatisation-hub': {
    title: `Automatisation Marketing : Workflows & Make${B}`,
    description: "Automatisez votre marketing avec notre hub complet. Workflows intelligents, optimisation continue et gain de temps pour accélérer votre croissance.",
    h1: 'Automatisation Hub',
    breadcrumbName: 'Automatisation Hub',
  },
  '/agent-ia-conversationnel': {
    title: `Agent IA Conversationnel sur Mesure${B}`,
    description: "Un agent IA conversationnel relié à votre planning, vos clients, votre facturation et votre base de données. Réponses instantanées et tâches accomplies à votre place.",
    h1: 'Votre agent IA conversationnel, relié à toute votre activité',
    breadcrumbName: 'Agent IA Conversationnel',
    faqKey: 'agentIa',
  },
  '/reponse-leads': {
    title: `Réponse Leads : Automatisation Prospection${B}`,
    description: "Automatisez la gestion de vos leads. Réponses instantanées, qualification automatique et suivi personnalisé pour maximiser votre taux de conversion.",
    h1: 'Réponse Leads',
    breadcrumbName: 'Réponse Leads',
  },
  '/google-my-business': {
    title: `Google My Business : Visibilité Locale${B}`,
    description: "Optimisez votre fiche Google My Business pour augmenter votre visibilité locale. Attirez plus de clients et améliorez votre présence sur Google Maps.",
    h1: 'Google My Business automatisé',
    breadcrumbName: 'Google My Business',
  },
  '/conciergerie': {
    title: `Conciergerie Airbnb & Booking Automatisée${B}`,
    description: "Automatisez votre conciergerie Airbnb & Booking : fiches contact, planning, facturation et relances clients. Gagnez du temps sur la gestion quotidienne.",
    h1: 'Service pour conciergerie : automatisation Airbnb & Booking',
    breadcrumbName: 'Conciergerie',
    ogImage: `${BASE_URL}/images/conciergerie-og.jpg`,
  },
  '/back-office-conciergerie': {
    title: `Back Office Conciergerie Automatisé${B}`,
    description: "Back office sur mesure pour conciergeries : fiches contact automatiques, statistiques temps réel, facturation automatisée, analyse d'annonces et retouche photo.",
    h1: 'Back office sur mesure pour conciergeries',
    breadcrumbName: 'Back Office Conciergerie',
  },
  '/blog': {
    title: `Blog Marketing Digital & Data E-commerce${B}`,
    description: "Guides experts sur Google Ads, GA4, GTM et e-commerce. Cas d'études et stratégies pour optimiser votre performance digitale.",
    h1: 'Le Blog Expert Data',
    breadcrumbName: 'Blog',
  },

  // --- Pages noindex (exclues du sitemap, pré-rendues avec robots noindex) ---
  '/api-docs': {
    title: `Documentation API${B}`,
    description: "Documentation technique de l'API JUH Ecomm Data.",
    breadcrumbName: 'API',
    noindex: true,
  },
  '/seo-audit': {
    title: `Audit SEO${B}`,
    description: "Outil d'audit SEO interne.",
    breadcrumbName: 'Audit SEO',
    noindex: true,
  },
  '/mentions-legales': {
    title: `Mentions légales${B}`,
    description: "Mentions légales du site JUH Ecomm Data.",
    breadcrumbName: 'Mentions légales',
    noindex: true,
  },
  '/politique-confidentialite': {
    title: `Politique de confidentialité${B}`,
    description: "Politique de confidentialité et traitement des données personnelles.",
    breadcrumbName: 'Politique de confidentialité',
    noindex: true,
  },
};

/** Normalise un pathname (retire le slash final) et renvoie l'entrée META. */
export function getMeta(pathname) {
  if (!pathname) return META['/'];
  let key = pathname.split('?')[0].split('#')[0];
  if (key.length > 1 && key.endsWith('/')) key = key.slice(0, -1);
  return META[key] || null;
}
