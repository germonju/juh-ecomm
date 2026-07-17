/**
 * SOURCE UNIQUE DE VÉRITÉ — meta SEO par route.
 *
 * Ce module est un objet de données PUR (aucun JSX, aucune API navigateur)
 * afin d'être importable à la fois par :
 *   - Node   → scripts/inject-social-meta.js (bake le HTML statique)
 *   - Node   → scripts/generate-sitemap.js (dérive les URLs indexables)
 *   - Vite   → src/components/SeoHead.jsx (React Helmet, DOM hydraté)
 *   - Vite   → src/components/Breadcrumb.jsx (fil d'Ariane visuel)
 *   - Vite   → index.html (title de base, gardé synchronisé manuellement)
 *
 * Règle : plus AUCUN <title>/<meta description>/canonical écrit en dur ailleurs.
 * Une seule édition ici = title/description/canonical alignés sur les deux
 * vagues d'indexation (HTML baké + rendu JS). Fin du bug des titres divergents.
 *
 * Architecture en 2 silos étanches :
 *   - Silo 1 « Tracking & Data »   → /tracking-data/*   (hub = /tracking-data)
 *   - Silo 2 « Automatisation & IA »→ /automatisation-ia/* (hub = /automatisation-ia)
 * Le champ `silo` (= path du hub) alimente le breadcrumb (Accueil → Hub → Page).
 *
 * Contrainte titre : viser 50-60 caractères, mot-clé principal en tête.
 * Suffixe de marque standardisé : « | Juh Ecomm Data ».
 *
 * `noindex: true` → <meta robots="noindex,follow">, exclu du sitemap. Utilisé
 * pour les pages légales ET les placeholders non encore rédigés. RETIRER le
 * noindex (et la page rejoint le sitemap automatiquement) une fois le contenu écrit.
 */

export const SITE_NAME = 'Juh Ecomm Data';
export const BASE_URL = 'https://www.juh-ecomm.fr';
export const OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;
export const TWITTER_SITE = '@juh_ecomm';

const B = ' | Juh Ecomm Data';

// Paths des hubs de silo (utilisés comme valeur du champ `silo`).
export const SILO_TRACKING = '/tracking-data';
export const SILO_AUTOMATISATION = '/automatisation-ia';

/**
 * Clé = pathname de la route (sans slash final, '/' pour la home).
 * Champs :
 *   title           <title> + og:title + twitter:title (≤60 car.)
 *   description     meta description + og/twitter (≤155 car.)
 *   h1              titre H1 pré-rendu (cohérence crawl/rendu JS)
 *   breadcrumbName  libellé du fil d'Ariane
 *   silo?           path du hub de silo (pour le breadcrumb Accueil → Hub → Page)
 *   ogImage?        surcharge de l'image OG (défaut : OG_IMAGE)
 *   ogType?         'website' (défaut) | 'article'
 *   faqKey?         clé FAQ pré-rendue (voir scripts/inject-social-meta.js)
 *   noindex?        true → <meta robots="noindex,follow">, exclu du sitemap
 *   placeholder?    true → page à rédiger (info interne, implique noindex)
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
  '/a-propos': {
    title: `À propos — Julien Germon${B}`,
    description: "Julien Germon, expert tracking, data et automatisation pour e-commerçants et TPE. Parcours, expertise et approche.",
    h1: 'À propos',
    breadcrumbName: 'À propos',
  },

  // === SILO 1 — Tracking & Data ===
  '/tracking-data': {
    title: `Tracking & Data : GA4, GTM & Conversions${B}`,
    description: "Centralisez votre tracking : GA4, GTM Server-Side, Google Ads et conversions. Des données fiables pour une stratégie data-driven performante.",
    h1: 'Tracking & Data',
    breadcrumbName: 'Tracking & Data',
  },
  '/tracking-data/gtm-server-side': {
    title: `GTM Server-Side : Tracking Cookieless RGPD${B}`,
    description: "Implémentez GTM Server-Side pour améliorer votre tracking RGPD. Réduisez la dépendance aux cookies tiers et améliorez la qualité de vos données.",
    h1: 'Google Tag Manager Server-Side',
    breadcrumbName: 'GTM Server-Side',
    silo: SILO_TRACKING,
    faqKey: 'gtm',
  },
  '/tracking-data/ga4': {
    title: `GA4 Avancé : Analytics & Audiences${B}`,
    description: "Maîtrisez Google Analytics 4 avancé pour exploiter vos données. Configurations avancées, audiences personnalisées et insights actionnables.",
    h1: 'GA4 Avancé',
    breadcrumbName: 'GA4 Avancé',
    silo: SILO_TRACKING,
  },
  '/tracking-data/tracking-ecommerce-shopify': {
    title: `Tracking Shopify GA4 & Google Ads${B}`,
    description: "Optimisez votre boutique Shopify avec notre expertise. Intégrations Google Ads, GA4, tracking avancé et stratégie de croissance pour maximiser vos ventes.",
    h1: 'Tracking Shopify & E-commerce',
    breadcrumbName: 'Tracking Shopify',
    silo: SILO_TRACKING,
  },
  '/tracking-data/audit-google-ads': {
    title: `Audit Google Ads : ROI & Performance${B}`,
    description: "Audit complet de votre compte Google Ads : Search, Shopping, PMax. Identifiez les gaspillages et boostez votre rentabilité e-commerce.",
    h1: 'Optimisez vos campagnes avec un Audit Google Ads complet',
    breadcrumbName: 'Audit Google Ads',
    silo: SILO_TRACKING,
  },
  '/tracking-data/conversions-offline': {
    title: `Conversions Offline Google Ads & GA4${B}`,
    description: "Tracez vos conversions offline avec Google Ads et GA4. Connectez vos ventes en magasin à vos campagnes digitales pour une vision 360° de votre ROI.",
    h1: 'Conversions Offline Google Ads',
    breadcrumbName: 'Conversions Offline',
    silo: SILO_TRACKING,
    faqKey: 'conversions',
  },
  '/tracking-data/consent-mode': {
    title: `Consent Mode V2 & CMP : Conformité RGPD${B}`,
    description: "Mise en conformité RGPD avec Google Consent Mode V2. Audit, installation de CMP (Cookiebot, Axeptio...) et configuration GTM pour respecter la vie privée.",
    h1: 'Consent Mode V2, CMP et mise en conformité RGPD',
    breadcrumbName: 'Consent Mode V2',
    silo: SILO_TRACKING,
  },
  '/tracking-data/landing-pages': {
    title: `Landing Pages Haute Conversion & A/B Test${B}`,
    description: "Créez des landing pages haute conversion avec notre expertise. Designs optimisés, copywriting persuasif et tests A/B pour maximiser vos taux de conversion.",
    h1: 'Landing Pages Haute Conversion pour Vos Campagnes Publicitaires',
    breadcrumbName: 'Landing Pages',
    silo: SILO_TRACKING,
  },
  '/tracking-data/pilotage-a-la-marge': {
    title: `Pilotage à la marge (POAS) plutôt que ROAS${B}`,
    description: "Arrêtez de piloter au ROAS : optimisez Google Ads sur la marge (POAS) et donnez à l'algorithme le vrai KPI de rentabilité — le profit.",
    h1: 'Pilotez vos campagnes à la marge, pas au ROAS',
    breadcrumbName: 'Pilotage à la marge',
    silo: SILO_TRACKING,
  },

  // === SILO 2 — Automatisation & IA ===
  '/automatisation-ia': {
    title: `Automatisation & IA pour TPE & E-commerce${B}`,
    description: "Automatisez votre activité avec des workflows et des agents IA : facturation, relances, prise de RDV, avis clients. Gagnez du temps au quotidien.",
    h1: 'Automatisation & IA',
    breadcrumbName: 'Automatisation & IA',
  },
  '/automatisation-ia/agent-ia-conversationnel': {
    title: `Agent IA Conversationnel sur Mesure${B}`,
    description: "Un agent IA conversationnel relié à votre planning, vos clients, votre facturation et votre base de données. Réponses instantanées et tâches accomplies à votre place.",
    h1: 'Votre agent IA conversationnel, relié à toute votre activité',
    breadcrumbName: 'Agent IA Conversationnel',
    silo: SILO_AUTOMATISATION,
    faqKey: 'agentIa',
  },
  '/automatisation-ia/reponse-leads': {
    title: `Réponse Leads : Automatisation Prospection${B}`,
    description: "Automatisez la gestion de vos leads. Réponses instantanées, qualification automatique et suivi personnalisé pour maximiser votre taux de conversion.",
    h1: 'Réponse Leads',
    breadcrumbName: 'Réponse Leads',
    silo: SILO_AUTOMATISATION,
  },
  '/automatisation-ia/google-my-business': {
    title: `Google My Business : Visibilité Locale${B}`,
    description: "Optimisez votre fiche Google My Business pour augmenter votre visibilité locale. Attirez plus de clients et améliorez votre présence sur Google Maps.",
    h1: 'Google My Business automatisé',
    breadcrumbName: 'Google My Business',
    silo: SILO_AUTOMATISATION,
  },
  '/automatisation-ia/conciergerie': {
    title: `Conciergerie Airbnb & Booking Automatisée${B}`,
    description: "Automatisez votre conciergerie Airbnb & Booking : fiches contact, planning, facturation et relances clients. Gagnez du temps sur la gestion quotidienne.",
    h1: 'Service pour conciergerie : automatisation Airbnb & Booking',
    breadcrumbName: 'Conciergerie',
    silo: SILO_AUTOMATISATION,
  },
  '/automatisation-ia/back-office': {
    title: `Back Office Conciergerie Automatisé${B}`,
    description: "Back office sur mesure pour conciergeries : fiches contact automatiques, statistiques temps réel, facturation automatisée, analyse d'annonces et retouche photo.",
    h1: 'Back office sur mesure pour conciergeries',
    breadcrumbName: 'Back Office',
    silo: SILO_AUTOMATISATION,
  },
  '/automatisation-ia/facturation-relances': {
    title: `Automatisation Facturation & Relances${B}`,
    description: "Automatisez la facturation et les relances clients : devis, factures et rappels de paiement générés et envoyés sans effort manuel.",
    h1: 'Automatisation de la facturation et des relances',
    breadcrumbName: 'Facturation & Relances',
    silo: SILO_AUTOMATISATION,
  },
  '/automatisation-ia/prise-rdv-devis': {
    title: `Automatisation Prise de RDV & Devis${B}`,
    description: "Automatisez la prise de rendez-vous et la génération de devis pour vos prospects, disponible 24h/24 sans intervention manuelle.",
    h1: 'Automatisation de la prise de RDV et des devis',
    breadcrumbName: 'Prise de RDV & Devis',
    silo: SILO_AUTOMATISATION,
  },
  '/automatisation-ia/angouleme': {
    title: `Automatisation & IA pour TPE à Angoulême${B}`,
    description: "Automatisation et agents IA pour les TPE et commerces d'Angoulême et de Charente. Gagnez du temps sur vos tâches répétitives.",
    h1: 'Automatisation & IA pour les TPE à Angoulême',
    breadcrumbName: 'Angoulême',
    silo: SILO_AUTOMATISATION,
  },

  // === Blog (intouché) ===
  '/blog': {
    title: `Blog Marketing Digital & Data E-commerce${B}`,
    description: "Guides experts sur Google Ads, GA4, GTM et e-commerce. Cas d'études et stratégies pour optimiser votre performance digitale.",
    h1: 'Le Blog Expert Data',
    breadcrumbName: 'Blog',
  },

  // === Pages noindex (légales / techniques) ===
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
