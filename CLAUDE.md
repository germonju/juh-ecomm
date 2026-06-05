# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Développement
npm run dev          # Serveur Vite sur le port 8080 (vite.config.js) / 3000 (script package.json)

# Build complet (4 étapes enchaînées)
npm run build        # generate-llms.js → generate-sitemap.js → vite build → inject-social-meta.js

# Utilitaires standalone
npm run generate-sitemap   # Génère public/sitemap.xml et public/robots.txt (interroge Supabase)
npm run lint               # ESLint (mode quiet — erreurs seulement)
npm run preview            # Prévisualise le build sur le port 3000
```

**Pas de tests automatisés** dans ce projet.

## Architecture

Site vitrine React SPA (www.juh-ecomm.fr) — consultance tracking e-commerce et Google Ads.

### Pipeline de build SEO (critique)

Le build est un pipeline en 4 étapes ordonnées :

1. **`tools/generate-llms.js`** — génère `public/llms.txt` (erreurs ignorées)
2. **`scripts/generate-sitemap.js`** — appelle l'API REST Supabase pour récupérer les articles publiés, écrit `public/sitemap.xml` et `public/robots.txt`
3. **`vite build`** — compile l'app React dans `dist/`
4. **`scripts/inject-social-meta.js`** — post-traitement de `dist/` : pour chaque route, écrit les balises `<title>`, `<meta description>`, Open Graph et Twitter Card directement dans le HTML statique. Également pré-rend le HTML statique des articles blog dans `dist/blog/{slug}/index.html`

**Raison :** `react-helmet` injecte les metas côté client — invisible aux crawlers sociaux et à Google. Le script post-build les bake dans le HTML statique pour que l'indexation et les previews fonctionnent.

### Routing et lazy loading (`src/App.jsx`)

Toutes les pages sont en `lazy()` sauf `HomePage` (critique pour le LCP). La redirection non-www → www se fait côté client dans `useEffect`.

### Supabase

Credentials anon publics hardcodés dans trois fichiers : `src/lib/customSupabaseClient.js`, `scripts/generate-sitemap.js`, `scripts/inject-social-meta.js`. C'est une clé anon (lecture publique) — intentionnel.

**Table principale :** `articles` avec champs `slug`, `status`, `publish_date`, `updated_at`, `category`, `content`.

**Edge Function :** `create-article` (authentifiée via header `X-API-Key`) — accessible depuis `src/lib/blogService.js`.

### Tracking / DataLayer (`src/contexts/DataLayerContext.jsx`)

Contexte React qui alimente `window.dataLayer` (GTM-N46KWF54, servi via sst.juh-ecomm.fr par Addingwell). Pousse automatiquement `page_view`, `scroll_depth` (25/50/75/90 %) et `time_on_page` sur chaque changement de route. Enrichit tous les événements avec `user_country` (géoloc via ipapi.co, défaut `FR`).

### Composants

- `src/components/ui/` — composants shadcn/ui (style New York, couleur base neutral)
- `src/components/ConsentManager.jsx` — gestion RGPD / Consent Mode
- `src/components/AdParamsCapture.jsx` — capture des paramètres UTM et GCLID
- `src/components/HeroIllustrations.jsx` — illustrations SVG animées (large fichier, ~38 ko)
- `src/lib/frenchTypography.js` — utilitaire MutationObserver qui applique les règles typographiques françaises (espaces insécables avant `! ? : ;`)

### Alias de chemin

`@/` → `src/` (configuré dans `vite.config.js` et `jsconfig.json`)

### CI/CD

Un workflow GitHub Actions (`.github/workflows/nightly-build.yml`) rebuild et commit `dist/` chaque nuit à 1h UTC (3h Paris) pour maintenir le HTML statique des articles blog à jour. Package manager dans le workflow : **Bun** (`bun install --frozen-lockfile`, `bun run build`). En local, utiliser **npm** (présence d'un `package-lock.json` absent — utiliser `bun.lock` → préférer `bun` si disponible).

### Pages sans indexation

`/api-docs`, `/seo-audit`, `/mentions-legales`, `/politique-confidentialite` ont un tag `noindex` et sont exclus du sitemap.
