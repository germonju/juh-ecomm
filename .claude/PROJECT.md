# Projet — JUH Ecomm Data

## Identité

| Champ | Valeur |
|---|---|
| URL production | https://www.juh-ecomm.fr |
| Repo GitHub | germonju/juh-ecomm |
| Déploiement | Cloudflare Pages (branche `main`) |
| Auteur | Julien Germon |
| Marque | JUH Ecomm Data |

## Objet du site

Site vitrine de consultance spécialisée en **tracking e-commerce et Google Ads**. Propose des services d'implémentation, d'audit et d'automatisation pour les e-commerçants.

## Services présentés

| Route | Service |
|---|---|
| `/tracking-hub` | Hub tracking — GA4, GTM, conversions |
| `/gtm-server-side` | GTM Server-Side (Addingwell / sst.juh-ecomm.fr) |
| `/ga4-advanced` | Google Analytics 4 avancé |
| `/audit-google-ads` | Audit Google Ads (Search, Shopping, PMax) |
| `/shopify` | Tracking Shopify |
| `/google-my-business` | Visibilité locale GMB |
| `/conversions-offline` | Import conversions offline Google Ads |
| `/consent-mode` | Consent Mode V2 / CMP (Cookiebot, Axeptio) |
| `/conciergerie` | Conciergerie marketing |
| `/reponse-leads` | Automatisation réponse leads |
| `/automatisation-hub` | Workflows Make / automatisation |
| `/landing-pages` | Landing pages haute conversion |
| `/blog` | Blog marketing digital (articles Supabase) |
| `/contact` | Formulaire de contact |

## Stack technique

| Composant | Technologie |
|---|---|
| Framework | React 18 (SPA) |
| Build | Vite |
| UI Components | shadcn/ui (style New York, base neutral) |
| Routing | React Router v6 |
| Base de données | Supabase (articles blog, auth) |
| Hébergement | Cloudflare Pages |
| Tracking | GTM (GTM-N46KWF54) + sGTM via Addingwell |
| Analytics | GA4 |
| Package manager | Bun (CI) / npm (local) |
| CSS | Tailwind CSS |

## Tracking & DataLayer

- Contexte React `DataLayerContext.jsx` alimente `window.dataLayer`
- Pousse automatiquement : `page_view`, `scroll_depth` (25/50/75/90%), `time_on_page`
- Géolocalisation utilisateur via ipapi.co (défaut `FR`)
- Consent Mode V2 géré par `ConsentManager.jsx`
- Capture UTM/GCLID via `AdParamsCapture.jsx`

## Blog

Articles stockés dans Supabase (table `articles`). Champs clés : `slug`, `status`, `publish_date`, `updated_at`, `category`, `content`, `meta_title`, `meta_description`, `image_name`.

L'Edge Function `create-article` (auth via `X-API-Key`) permet la création depuis `blogService.js`.

## CI/CD

Workflow GitHub Actions `.github/workflows/nightly-build.yml` :
- Déclenché chaque nuit à 1h UTC (3h Paris)
- Reconstruit `dist/` complet (HTML statique blog inclus)
- Commit + push vers `main` si changements
- Cloudflare Pages déploie automatiquement sur push `main`

## Pages exclues de l'indexation (noindex)

`/api-docs`, `/seo-audit`, `/mentions-legales`, `/politique-confidentialite`
