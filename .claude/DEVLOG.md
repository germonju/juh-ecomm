# DEVLOG — Journal des actions

> Mis à jour automatiquement après chaque commit/push.
> Format : date, branche, commit, contexte.

---

## 2026-06-09 — Session : Indexation GSC + consolidation repo

### Problèmes identifiés

1. **GitHub Actions en échec quotidien** — `oven-sh/setup-bun@v1` incompatible Node.js 24 (deadline GitHub : 16 juin 2026)
2. **Indexation Google Search Console dégradée** — build nocturne planté → articles blog sans HTML statique → Google voit la coquille SPA
3. **Deux repos GitHub** — `juh-ecomm` (travail local) et `juh-ecommerce-studio` (Lovable original) — Cloudflare Pages déployait depuis le mauvais repo

### Actions réalisées

#### `76717c8` — fix: workflow Node.js 24 + sitemap lastmod statique *(branche seo-fixes)*
- `oven-sh/setup-bun@v1` → `@v2`
- `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` ajouté en env workflow
- Suppression `<lastmod>today</lastmod>` sur les pages statiques du sitemap

#### `b6c6deb` — Merge seo-fixes → main *(main)*
- Merge des fixes dans main pour que le cron GitHub Actions les prenne en compte

#### `94375f5` — fix: forcer remote URL avec GITHUB_TOKEN *(main)*
- Ajout `git remote set-url origin https://x-access-token:${GITHUB_TOKEN}@github.com/${{ github.repository }}.git`
- Tentative de résolution du 403 push (cause réelle = mauvais repo)

#### `6dcf403` — fix: ajouter permissions contents:write au job *(main)*
- `permissions: contents: write` ajouté au job GitHub Actions
- Le GITHUB_TOKEN était en lecture seule par défaut

### Consolidation repo (opérations GitHub/Cloudflare)

- Diagnostic : `juh-ecommerce-studio` avait 0 commit exclusif vs `juh-ecomm` (4 commits d'avance)
- Cloudflare Pages déconnecté de `juh-ecommerce-studio`, reconnecté à `juh-ecomm`
- Remote `lovable` supprimé du git local
- `juh-ecommerce-studio` archivé sur GitHub
- Un seul repo actif : **germonju/juh-ecomm**

---

#### 2026-06-09 17:30 — `main`
- 83c6e49 feat: cookie restore Addingwell via Cloudflare Pages middleware
