# Bonnes pratiques — Améliorations et décisions techniques

> Ce fichier documente les améliorations apportées au projet : quoi, comment, pourquoi.
> Référence pour ne pas régresser et pour justifier les choix futurs.

---

## SEO — HTML statique pré-rendu

**Quoi :** Le script `scripts/inject-social-meta.js` post-traite `dist/` après `vite build` pour injecter `<title>`, `<meta description>`, OG tags, Twitter Card et JSON-LD directement dans le HTML statique.

**Comment :** Étape 4 du pipeline de build. Fetch les articles depuis Supabase, génère un `dist/blog/{slug}/index.html` pour chaque article publié.

**Pourquoi :** React Helmet injecte les metas côté client via JavaScript. Les crawlers sociaux (Facebook, LinkedIn, Slack) et Google n'exécutent pas JS au moment du scraping des previews → les metas sont invisibles. En les bakant dans le HTML statique, les previews fonctionnent et Google indexe correctement.

---

## SEO — Sitemap : ne pas mettre `lastmod` dynamique sur les pages statiques

**Quoi :** `<lastmod>` supprimé des pages statiques dans `scripts/generate-sitemap.js`.

**Comment :** La variable `today` était appliquée à toutes les pages statiques. Supprimée pour les pages statiques, conservée pour les articles blog (calculée depuis `updated_at` en base).

**Pourquoi :** Google ignore les `lastmod` dont il détecte qu'ils ne sont pas fiables. Mettre la date du jour sur des pages qui n'ont pas changé = signal menteur → Google déprioritise tout le sitemap. Pour les articles, `lastmod` reste pertinent car il reflète une vraie modification en base.

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

## Performance — Lazy loading pages

**Quoi :** Toutes les pages sauf `HomePage` sont en `lazy()` dans `App.jsx`.

**Comment :** `import HomePage from '@/pages/HomePage'` (import direct) + `const ContactPage = lazy(() => import(...))` pour toutes les autres.

**Pourquoi :** `HomePage` est critique pour le LCP (Largest Contentful Paint) — son bundle doit être disponible immédiatement. Les autres pages ne sont chargées que quand visitées, réduisant le bundle initial.

---

## Redirect non-www → www

**Quoi :** Redirection 301 `juh-ecomm.fr` → `www.juh-ecomm.fr` gérée par `public/_redirects`.

**Comment :** Ligne dans `_redirects` : `https://juh-ecomm.fr/* https://www.juh-ecomm.fr/:splat 301`

**Pourquoi :** La redirection côté serveur (Cloudflare, 301 permanent) est plus fiable et rapide que la redirection client-side dans `App.jsx` (via `window.location.replace`). Google préfère les 301 pour consolider le PageRank sur l'URL canonique www.

---

## Typographie française

**Quoi :** `src/lib/frenchTypography.js` applique les espaces insécables avant `! ? : ;`

**Comment :** MutationObserver qui surveille les changements DOM et insère ` ` (espace fine insécable) devant les ponctuations doubles.

**Pourquoi :** Règle typographique française obligatoire. Les outils d'édition (Supabase rich text, etc.) ne l'appliquent pas automatiquement.
