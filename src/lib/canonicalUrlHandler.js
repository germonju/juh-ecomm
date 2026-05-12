/**
 * Utility function to generate canonical URLs
 * Ensures absolute URL with www, no query parameters, and no trailing slashes.
 * 
 * @param {string} pathname - The current route pathname
 * @returns {string} The canonical URL
 */
export const getCanonicalUrl = (pathname) => {
  const baseUrl = 'https://www.juh-ecomm.fr';
  
  if (!pathname) return baseUrl;

  // Strip query parameters and hashes if they somehow got in
  let cleanPath = pathname.split('?')[0].split('#')[0];
  
  // Strip trailing slash if present (except for root)
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // For root path
  if (cleanPath === '/') {
    return baseUrl;
  }
  
  return `${baseUrl}${cleanPath}`;
};