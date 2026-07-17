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
│   ├── _redirects              # 301 anciennes URLs → silos (pas de SPA fallback ; non-www→www dans _middleware.js)
│   ├── sitemap.xml             # Généré par scripts/generate-sitemap.js
│   ├── robots.txt              # Généré par scripts/generate-sitemap.js
│   ├── llms.txt                # Généré par tools/generate-llms.js
│   └── images/                 # Images statiques (logos clients, OG, etc.)
├── functions/                  # Cloudflare Pages Functions (middleware edge)
│   └── _middleware.js          # Cookie restore Addingwell (_aw_master_id, 390j)
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
│   └── [15 autres pages de service]
├── components/
│   ├── ui/                     # shadcn/ui (style New York, base neutral)
│   ├── Header.jsx              # Nav 2 silos (Tracking & Data / Automatisation & IA)
│   ├── Footer.jsx
│   ├── SeoHead.jsx            # Balises SEO (title/desc/canonical/OG/robots) depuis meta.config
│   ├── Breadcrumb.jsx         # Fil d'Ariane visuel reflétant le silo
│   ├── ConsentManager.jsx      # RGPD / Consent Mode V2
│   ├── AdParamsCapture.jsx     # Capture UTM + GCLID
│   ├── HeroIllustrations.jsx   # SVG animés (~38 ko)
│   └── ServicePageTemplate.jsx # Template réutilisable pages service
├── seo/
│   └── meta.config.js         # SOURCE UNIQUE des meta SEO par route (title/desc/h1/silo/noindex)
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

## Routes de l'application — architecture en 2 silos

Toutes les pages sont en `lazy()` sauf HomePage (critique LCP). Les anciennes URLs
plates sont redirigées en 301 vers les nouvelles (cf. `public/_redirects`).

| Route | Page | Indexée ? |
|---|---|---|
| `/` | HomePage | Oui |
| `/contact` | ContactPage | Oui |
| `/a-propos` | AProposPage | **Non** (placeholder) |
| `/realisations` | RealisationsPage | **Non** (placeholder) |
| **Silo 1 — `/tracking-data/`** | | |
| `/tracking-data` | TrackingHubPage (hub) | Oui |
| `/tracking-data/gtm-server-side` | GtmServerSidePage | Oui |
| `/tracking-data/ga4` | Ga4AdvancedPage | Oui |
| `/tracking-data/tracking-ecommerce-shopify` | ShopifyPage | Oui |
| `/tracking-data/audit-google-ads` | AuditGoogleAdsPage | Oui |
| `/tracking-data/conversions-offline` | ConversionsOfflinePage | Oui |
| `/tracking-data/consent-mode` | ConsentModePage | Oui |
| `/tracking-data/landing-pages` | LandingPagesPage | Oui |
| **Silo 2 — `/automatisation-ia/`** | | |
| `/automatisation-ia` | AutomatisationHubPage (hub) | Oui |
| `/automatisation-ia/agent-ia-conversationnel` | AgentIaPage | Oui |
| `/automatisation-ia/reponse-leads` | ReponseLeadsPage | Oui |
| `/automatisation-ia/google-my-business` | GoogleMyBusinessPage | Oui |
| `/automatisation-ia/conciergerie` | ConciergeriePage | Oui |
| `/automatisation-ia/back-office` | BackOfficeConciergeriePage | Oui |
| `/automatisation-ia/facturation-relances` | FacturationRelancesPage | **Non** (placeholder) |
| `/automatisation-ia/prise-rdv-devis` | PriseRdvDevisPage | **Non** (placeholder) |
| `/automatisation-ia/angouleme` | AngoulemePage | **Non** (placeholder, landing SEO local) |
| `/blog` + `/blog/:slug` | BlogPage / BlogPostPage | Oui |
| `/api-docs`, `/seo-audit`, `/mentions-legales`, `/politique-confidentialite` | — | **Non** |

> Les 5 placeholders sont en `noindex` (contenu `[À RÉDIGER]`) et exclus du sitemap
> tant qu'ils ne sont pas rédigés. Retirer le `noindex` dans `src/seo/meta.config.js`
> une fois le contenu écrit → la page rejoint automatiquement le sitemap.

## Fichiers de configuration clés

| Fichier | Rôle |
|---|---|
| `vite.config.js` | Alias `@/` → `src/`, port 8080 |
| `jsconfig.json` | Alias `@/` pour l'IDE |
| `components.json` | Config shadcn/ui |
| `public/_redirects` | Cloudflare : 301 anciennes URLs plates → silos (non-www→www géré dans `functions/_middleware.js`) |
| `.nvmrc` | Version Node.js de référence |
| `bun.lock` | Lock file Bun (utilisé en CI) |
