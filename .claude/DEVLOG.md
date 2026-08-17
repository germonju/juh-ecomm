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

---

## 2026-06-12 — Session : Fix redirection SEO non-www → www

### Problème identifié

**142 pages non indexées** en Google Search Console avec le motif **"Autre page avec balise canonique correcte"**.

Cause racine : la règle dans `public/_redirects` utilisait une URL absolue comme source :
```
https://juh-ecomm.fr/* https://www.juh-ecomm.fr/:splat 301
```
Cloudflare Pages **n'accepte pas les URLs absolues comme source** dans `_redirects` — seuls les chemins relatifs (`/path/*`) sont valides. La règle était donc ignorée silencieusement.

Conséquence : Google crawlait les deux versions (www et non-www), voyait les canoniques correctes pointant vers www, et marquait les URLs non-www comme "détectées non indexées". La redirection JS dans `App.jsx` (`window.location.replace`) ne suffit pas car Google peut crawlait les deux versions avant l'exécution du JS.

### Diagnostic

- Vérification `curl -I http://juh-ecomm.fr/blog/` → 301 vers `https://juh-ecomm.fr/blog/` (sans www = redirection HTTP→HTTPS de Cloudflare, pas la nôtre)
- Le middleware `functions/_middleware.js` existant gérait uniquement les cookies Addingwell — aucune logique de redirection de domaine

### Action réalisée

#### `5a36f31` — fix: redirection 301 non-www → www via middleware Cloudflare Pages *(main)*
- **`functions/_middleware.js`** : ajout en tête de `onRequest` d'une détection `url.hostname === 'juh-ecomm.fr'` → `Response.redirect(url.toString(), 301)` vers www. S'exécute côté Workers avant tout rendu HTML.
- **`public/_redirects`** : suppression de la règle invalide, remplacement par un commentaire explicatif.

### Vérification

```bash
curl -I https://juh-ecomm.fr/blog/
# HTTP/2 301 — location: https://www.juh-ecomm.fr/blog/ ✅
```

### Prochaines étapes SEO

- Demander une revalidation dans Search Console sur la propriété `juh-ecomm.fr` (sans www)
- Les pages "Autre page avec balise canonique correcte" disparaîtront progressivement au fil des re-crawls (délai : quelques semaines)
- Les ~110 pages "Sans objet" (non crawlées) se résoudront d'elles-mêmes une fois Google stabilisé sur www

#### 2026-07-01 11:23 — `main`
- 7a2e9cf perf(seo): cache assets immuable, schema Organization, HSTS, H1 synchronisés

#### 2026-07-03 17:07 — `main`
- 154c60c feat: nouvelle page service back office conciergerie

#### 2026-07-03 17:09 — `main`
- f5728a2 docs: mise à jour DEVLOG

#### 2026-07-03 17:17 — `main`
- aa40bdb style(back-office): repasse UI/UX homogène avec le reste du site

#### 2026-07-03 17:41 — `main`
- e62ae47 feat(back-office): hero animé, mockup produit fidèle, grille 4x2

#### 2026-07-03 21:55 — `main`
- 5cddf10 fix(seo): canonical client avec trailing slash + 301 anciennes URLs

#### 2026-07-06 12:59 — `main`
- 3855db4 feat: nouvelle page service Agent IA conversationnel

#### 2026-07-06 13:08 — `main`
- dc3c2c0 fix: remplace les logos CDN Hostinger morts (404) par des assets locaux

#### 2026-07-06 13:13 — `main`
- ba97bb7 build: régénère dist/ (page Agent IA + fix logos CDN + articles à jour)

#### 2026-07-06 13:39 — `main`
- 3e78620 feat(conciergerie): section agent IA (WhatsApp + assistant environnement)

#### 2026-07-16 02:45 — `main`
- bc2ddcc style(agent-ia): design futuriste + corrections d'espacement

#### 2026-07-17 17:01 — `main`
- baebe80 build: régénère dist/ après merge des builds nocturnes

#### 2026-07-17 17:18 — `main`
- 7689e7d feat(a-propos): photo + fond futuriste + parcours réel + schéma Person

#### 2026-07-17 17:28 — `main`
- cfaed04 feat(a-propos): animation Data → Blockchain → IA (SVG/CSS)

#### 2026-07-17 17:35 — `main`
- 7d4e08f feat(tracking-data): nouvelle page Pilotage à la marge (POAS)

#### 2026-07-17 17:46 — `main`
- 1d27b67 feat: animation À propos plus futuriste + page Pilotage à la marge au modèle service

#### 2026-07-17 17:59 — `main`
- 10f73f4 feat(agent-ia): chat fictif cyclant sur 12 exemples

#### 2026-07-17 18:14 — `main`
- 6387bfe fix(seo): image d'aperçu réseaux sociaux (og:image) fiable partout

#### 2026-07-18 01:38 — `main`
- 05c3c9c fix: typographie française (espaces insécables) + schéma agent IA lisible sur mobile

#### 2026-08-17 10:47 — `main`
- cc744f6 feat(tracking-data): page Spécialiste Google Tag Manager + refonte À propos

#### 2026-08-17 10:49 — `main`
- b17e75f build: régénère dist/ (page Spécialiste GTM, À propos, llms.txt)
