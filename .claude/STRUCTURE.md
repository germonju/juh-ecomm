# Structure du projet

## Arborescence racine

```
juh-ecomm/
├── .claude/                    # Fichiers gérés par Claude Code
│   ├── PROJECT.md              # Description du projet
│   ├── STRUCTURE.md            # Ce fichier
│   ├── DEVLOG.md               # Journal horodaté des actions
│   ├── BEST_PRACTICES.md       # Bonnes pratiques acquises
│   ├── scripts/
│   │   └── update-devlog.sh    # Hook auto-mise à jour DEVLOG
│   └── settings.json           # Config hooks Claude Code
├── .github/
│   └── workflows/
│       └── nightly-build.yml   # Build nocturne automatique
├── public/                     # Fichiers statiques servis tels quels
│   ├── _redirects              # Règles Cloudflare Pages (non-www→www, SPA fallback)
│   ├── sitemap.xml             # Généré par scripts/generate-sitemap.js
│   ├── robots.txt              # Généré par scripts/generate-sitemap.js
│   ├── llms.txt                # Généré par tools/generate-llms.js
│   └── images/                 # Images statiques (logos clients, OG, etc.)
├── scripts/                    # Scripts Node.js du pipeline de build
│   ├── generate-sitemap.js     # Étape 2 du build : sitemap.xml + robots.txt
│   ├── inject-social-meta.js   # Étape 4 du build : HTML statique SEO
│   └── validate-sitemap-content.js
├── src/                        # Code source React
├── tools/
│   └── generate-llms.js        # Étape 1 du build : llms.txt
├── dist/                       # Build Vite (committé pour Cloudflare Pages)
├── CLAUDE.md                   # Instructions pour Claude Code
├── package.json
├── vite.config.js
├── tailwind.config.js
└── jsconfig.json               # Alias @/ → src/
```

## Pipeline de build (4 étapes ordonnées)

```
npm run build
  │
  ├── 1. tools/generate-llms.js         → public/llms.txt (erreurs ignorées)
  ├── 2. scripts/generate-sitemap.js    → public/sitemap.xml + public/robots.txt
  ├── 3. vite build                     → dist/ (app React compilée)
  └── 4. scripts/inject-social-meta.js → dist/**/*.html (metas SEO injectées)
```

**Pourquoi le post-build ?** React Helmet injecte les metas côté client, invisible aux crawlers. Le script 4 bake les `<title>`, `<meta>`, OG tags et JSON-LD directement dans le HTML statique.

## src/ — Code source

```
src/
├── App.jsx                     # Routing principal (lazy loading toutes pages sauf HomePage)
├── main.jsx                    # Entry point React
├── index.css                   # Styles globaux Tailwind
├── pages/                      # Une page = un fichier JSX
│   ├── HomePage.jsx            # Chargée immédiatement (critique LCP)
│   ├── BlogPage.jsx            # Liste articles depuis Supabase
│   ├── BlogPostPage.jsx        # Article individuel avec SEO dynamique
│   └── [14 autres pages de service]
├── components/
│   ├── ui/                     # shadcn/ui (style New York, base neutral)
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ConsentManager.jsx      # RGPD / Consent Mode V2
│   ├── AdParamsCapture.jsx     # Capture UTM + GCLID
│   ├── HeroIllustrations.jsx   # SVG animés (~38 ko)
│   └── ServicePageTemplate.jsx # Template réutilisable pages service
├── contexts/
│   ├── DataLayerContext.jsx    # GTM dataLayer (page_view, scroll, time_on_page)
│   └── SupabaseAuthContext.jsx
├── hooks/
│   ├── ScrollTrackingHook.js
│   └── use-mobile.jsx
└── lib/
    ├── customSupabaseClient.js # Client Supabase (clé anon publique intentionnelle)
    ├── blogService.js          # CRUD articles + Edge Function create-article
    ├── frenchTypography.js     # MutationObserver → espaces insécables FR
    ├── canonicalUrl.js
    └── utils.js
```

## Routes de l'application

| Route | Page | Lazy ? | Indexée ? |
|---|---|---|---|
| `/` | HomePage | Non | Oui |
| `/contact` | ContactPage | Oui | Oui |
| `/tracking-hub` | TrackingHubPage | Oui | Oui |
| `/gtm-server-side` | GtmServerSidePage | Oui | Oui |
| `/ga4-advanced` | Ga4AdvancedPage | Oui | Oui |
| `/audit-google-ads` | AuditGoogleAdsPage | Oui | Oui |
| `/shopify` | ShopifyPage | Oui | Oui |
| `/google-my-business` | GoogleMyBusinessPage | Oui | Oui |
| `/conversions-offline` | ConversionsOfflinePage | Oui | Oui |
| `/consent-mode` | ConsentModePage | Oui | Oui |
| `/conciergerie` | ConciergeriePage | Oui | Oui |
| `/reponse-leads` | ReponseLeadsPage | Oui | Oui |
| `/automatisation-hub` | AutomatisationHubPage | Oui | Oui |
| `/landing-pages` | LandingPagesPage | Oui | Oui |
| `/blog` | BlogPage | Oui | Oui |
| `/blog/:slug` | BlogPostPage | Oui | Oui |
| `/api-docs` | ApiDocsPage | Oui | **Non** |
| `/mentions-legales` | MentionsLegalesPage | Oui | **Non** |
| `/politique-confidentialite` | PolitiqueConfidentialitePage | Oui | **Non** |
| `/seo-audit` | SeoAuditPage | Oui | **Non** |

## Fichiers de configuration clés

| Fichier | Rôle |
|---|---|
| `vite.config.js` | Alias `@/` → `src/`, port 8080 |
| `jsconfig.json` | Alias `@/` pour l'IDE |
| `components.json` | Config shadcn/ui |
| `public/_redirects` | Cloudflare : non-www→www (301) + SPA fallback |
| `.nvmrc` | Version Node.js de référence |
| `bun.lock` | Lock file Bun (utilisé en CI) |
