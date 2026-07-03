/**
 * Utility function to generate canonical URLs
 * Ensures absolute URL with www, no query parameters, WITH trailing slash.
 *
 * IMPORTANT — trailing slash : Cloudflare Pages sert chaque route pré-rendue
 * sous /foo/ et redirige /foo → /foo/ en 308. Le sitemap et le HTML statique
 * (scripts/inject-social-meta.js) déclarent donc la version AVEC slash.
 * Le canonical côté client DOIT faire de même : un canonical sans slash
 * pointerait vers une URL qui redirige, signal contradictoire pour Google
 * (cause directe de « Explorée, actuellement non indexée » en Search Console).
 *
 * @param {string} pathname - The current route pathname
 * @returns {string} The canonical URL
 */
export const getCanonicalUrl = (pathname) => {
  const baseUrl = 'https://www.juh-ecomm.fr';

  if (!pathname) return `${baseUrl}/`;

  // Strip query parameters and hashes if they somehow got in
  let cleanPath = pathname.split('?')[0].split('#')[0];

  // For root path
  if (cleanPath === '/' || cleanPath === '') {
    return `${baseUrl}/`;
  }

  // Ensure trailing slash (matches server redirects, sitemap and static HTML)
  if (!cleanPath.endsWith('/')) {
    cleanPath = `${cleanPath}/`;
  }

  return `${baseUrl}${cleanPath}`;
};
