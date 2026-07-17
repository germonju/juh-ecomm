# Bonnes pratiques — Améliorations et décisions techniques

> Ce fichier documente les améliorations apportées au projet : quoi, comment, pourquoi.
> Référence pour ne pas régresser et pour justifier les choix futurs.

---

## SEO — HTML statique pré-rendu

**Quoi :** Le script `scripts/inject-social-meta.js` post-traite `dist/` après `vite build` pour injecter `<title>`, `<meta description>`, OG tags, Twitter Card et JSON-LD directement dans le HTML statique.

**Comment :** Étape 4 du pipeline de build. Fetch les articles depuis Supabase, génère un `dist/blog/{slug}/index.html` pour chaque article publié.

**Pourquoi :** React Helmet injecte les metas côté client via JavaScript. Les crawlers sociaux (Facebook, LinkedIn, Slack) et Google n'exécutent pas JS au moment du scraping des previews → les metas sont invisibles. En les bakant dans le HTML statique, les previews fonctionnent et Google indexe correctement.

---

## SEO — Sitemap : `lastmod` figé (jamais la date de build) sur les pages statiques

**Quoi :** Les pages statiques utilisent une constante `STATIC_LASTMOD` figée dans `scripts/generate-sitemap.js`, au lieu de la date du jour.

**Comment :** La variable `today` était appliquée à toutes les pages statiques (le rebuild nocturne la faisait donc avancer chaque nuit). Remplacée par `p.lastmod || STATIC_LASTMOD` (constante à bumper à la main quand une page change vraiment). Les articles blog gardent leur `lastmod` dynamique (calculé depuis `updated_at`).

**Pourquoi :** Google ignore les `lastmod` qu'il détecte non fiables. Mettre la date du build (qui avance chaque nuit) sur des pages inchangées = signal menteur → déprioritisation du sitemap. Une date figée reflète la dernière vraie modification ; pour les articles, `updated_at` reste pertinent.

---

## CI/CD — GitHub Actions : Node.js 24

**Quoi :** Workflow `.github/workflows/nightly-build.yml` migré vers Node.js 24.

**Comment :**
- `oven-sh/setup-bun@v1` → `@v2` (compilé pour Node.js 24)
- `env: FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'` au niveau workflow
- `permissions: contents: write` ajouté au job (GITHUB_TOKEN en lecture seule par défaut)

**Pourquoi :** GitHub force Node.js 24 sur tous les runners à partir du 16 juin 2026. Les actions compilées pour Node.js 20 crashent. Sans `contents: write`, le GITHUB_TOKEN ne peut pas pousser de commits.

---

## CI/CD — Remote URL explicite pour le push

**Quoi :** `git remote set-url origin https://x-access-token:${GITHUB_TOKEN}@github.com/${{ github.repository }}.git` ajouté avant le push.

**Comment :** Dans l'étape "Commit et push", avant `git push origin main`.

**Pourquoi :** Le projet avait deux remotes (`origin` = juh-ecomm, `lovable` = juh-ecommerce-studio). Dans certains contextes Actions, le remote pointait vers le mauvais repo causant un 403. Forcer l'URL via `github.repository` garantit que le push va toujours au bon endroit.

---

## Architecture — Repo unique

**Quoi :** Un seul repo GitHub : `germonju/juh-ecomm`. Cloudflare Pages déploie depuis ce repo.

**Comment :** Comparaison des deux repos (diff + log exclusifs), migration Cloudflare Pages, suppression remote `lovable`, archivage `juh-ecommerce-studio`.

**Pourquoi :** Il existait deux repos (Lovable original + fork local). Cloudflare déployait depuis l'ancien repo Lovable pendant que tout le travail se faisait dans le fork → les corrections ne partaient pas en prod. Un seul repo évite cette confusion.

---

## SEO — Source unique de vérité pour les meta (`src/seo/meta.config.js` + `SeoHead`)

**Quoi :** Toutes les meta SEO (title, description, canonical, OG, Twitter, robots, h1, breadcrumb, silo) vivent dans un seul objet `META` indexé par route dans `src/seo/meta.config.js`.

**Comment :** Trois consommateurs lisent cette source unique :
- `scripts/inject-social-meta.js` (baker du HTML statique) importe `META` ;
- `src/components/SeoHead.jsx` (`<SeoHead route="..." />`) rend le `<Helmet>` depuis `META` ;
- `index.html` (title de base) est aligné manuellement (ne peut pas importer de JS).
`scripts/generate-sitemap.js` dérive aussi ses URLs indexables de `META` (exclut `noindex`).

**Pourquoi :** Avant, le `<title>` de la home existait en 3 versions divergentes (index.html, baker, Helmet). Google « flippait » entre elles. Avec une source unique, le HTML pré-rendu (1ʳᵉ vague de crawl) et le DOM hydraté (rendu JS) portent des balises **identiques par construction** — plus aucun flip. Une seule édition met tout à jour.

---

## SEO — Architecture en 2 silos étanches + 301

**Quoi :** Deux silos thématiques : `/tracking-data/*` (Tracking & Data, national/technique) et `/automatisation-ia/*` (Automatisation & IA, local + national). Pages ombrelle `/a-propos` et `/realisations` en pont. Blog **intouché** (`/blog/*`).

**Comment :** Routing silo dans `App.jsx`, meta/breadcrumb dérivés du champ `silo` de `META`, breadcrumb visuel (`Breadcrumb.jsx`) + JSON-LD `BreadcrumbList` à 3 niveaux (Accueil → Hub → Page). Nav Header/Footer réorganisée en 2 silos. Chaque ancienne URL plate → 301 vers la nouvelle dans `public/_redirects` (redirections héritées repointées vers les cibles finales pour éviter les chaînes 301).

**Pourquoi :** Séparer deux univers d'expertise pour concentrer la pertinence thématique (maillage dense intra-silo, quasi nul inter-silos). Les 301 préservent le peu d'équité SEO des anciennes URLs. Le blog n'est pas déplacé (il rank déjà) : silotage par maillage + breadcrumb, zéro 301 sur son contenu.

**Règle :** liens denses **à l'intérieur** de chaque silo ; ponts inter-silos uniquement via home, `/a-propos`, `/realisations`. Les nouvelles pages sans contenu sont des placeholders **noindex** (exclus du sitemap) tant qu'elles ne sont pas rédigées.

---

## Performance — Lazy loading pages

**Quoi :** Toutes les pages sauf `HomePage` sont en `lazy()` dans `App.jsx`.

**Comment :** `import HomePage from '@/pages/HomePage'` (import direct) + `const ContactPage = lazy(() => import(...))` pour toutes les autres.

**Pourquoi :** `HomePage` est critique pour le LCP (Largest Contentful Paint) — son bundle doit être disponible immédiatement. Les autres pages ne sont chargées que quand visitées, réduisant le bundle initial.

---

## Redirect non-www → www (Cloudflare Pages)

**Quoi :** Redirection 301 `juh-ecomm.fr` → `www.juh-ecomm.fr` gérée par `functions/_middleware.js` (Cloudflare Workers).

**Comment :**
```js
// Dans onRequest(), avant await next()
const url = new URL(request.url);
if (url.hostname === 'juh-ecomm.fr') {
  url.hostname = 'www.juh-ecomm.fr';
  return Response.redirect(url.toString(), 301);
}
```

**Pourquoi :** Cloudflare Pages `_redirects` **n'accepte pas les URLs absolues comme source** — une règle `https://juh-ecomm.fr/* ...` est silencieusement ignorée. Pour rediriger entre hostnames, il faut passer par un middleware Pages Function (Workers). La redirection client-side JS (`window.location.replace`) ne suffit pas pour Google qui peut crawler les deux versions avant l'exécution du JS — résultat : motif "Autre page avec balise canonique correcte" en Search Console.

---

## Typographie française

**Quoi :** `src/lib/frenchTypography.js` applique les espaces insécables avant `! ? : ;`

**Comment :** MutationObserver qui surveille les changements DOM et insère ` ` (espace fine insécable) devant les ponctuations doubles.

**Pourquoi :** Règle typographique française obligatoire. Les outils d'édition (Supabase rich text, etc.) ne l'appliquent pas automatiquement.

---

## Indexation : trailing slash, vraie 404 et corps pré-rendu (Cloudflare Pages + SPA)

**Quoi :** Trois correctifs structurels d'indexation appliqués à `scripts/inject-social-meta.js`, `scripts/generate-sitemap.js` et `public/_redirects`.

**Comment :**
1. **Trailing slash** — canonical, `og:url`, URLs JSON-LD et `<loc>` du sitemap se terminent désormais par `/` (helpers `canonicalUrl()` / `withSlash()`). Cloudflare Pages sert `/foo/index.html` à `/foo/` et redirige `/foo` → `/foo/` en 308 ; déclarer la version sans slash faisait pointer chaque canonical et chaque URL du sitemap vers une redirection.
2. **Vraie 404** — retrait du fallback SPA `/* /index.html 200` dans `_redirects` + génération de `dist/404.html`. Toutes les routes React (y compris les 4 pages noindex) sont désormais pré-rendues en fichier statique, donc seules les URLs réellement inconnues tombent sur la 404 (HTTP 404 natif Cloudflare Pages). Avant, toute URL erronée renvoyait 200 + la home = soft 404.
3. **Corps minimal pré-rendu** — `buildPrerenderBody()` injecte `<h1>` + chapô dans `<div id="root">` (vide auparavant). React utilise `createRoot` (pas `hydrateRoot`) → le contenu est remplacé au montage, aucun mismatch d'hydratation. Évite que Google voie une page vide au premier crawl (risque thin-content / soft 404 sur les 130+ articles).

Bonus : pages noindex pré-rendues avec `<meta robots noindex>` statique, purge des articles orphelins dans `dist/blog/`, `dateModified` + `inLanguage` ajoutés au JSON-LD `Article`.

**Pourquoi :** La home s'indexait mais pas les pages internes ni les articles. Cause : canonical/sitemap pointaient vers des 308, soft 404 généralisé, et `#root` vide rendu uniquement côté JS. Ces trois défauts se combinaient pour bloquer/retarder l'indexation. Voir [[project_seo_redirect]].
