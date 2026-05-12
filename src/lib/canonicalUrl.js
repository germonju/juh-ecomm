/**
 * Utility function to generate canonical URLs
 * @param {string} pathname - The current route pathname
 * @param {URLSearchParams} [searchParams] - Optional search parameters (currently unused as we strip them for canonicals)
 * @returns {string} The canonical URL
 */
export const getCanonicalUrl = (pathname, searchParams) => {
  const baseUrl = 'https://www.juh-ecomm.fr';
  
  // Strip trailing slash if present (except for root)
  let path = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  
  // For root path
  if (path === '/') {
    return baseUrl;
  }
  
  // Return base url + path (query params are ignored by default for canonicals in this logic)
  return `${baseUrl}${path}`;
};