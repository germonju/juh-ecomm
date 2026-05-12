export function getCanonicalUrl(pathname, searchParams) {
  const baseUrl = 'https://www.juh-ecomm.fr';
  
  // Remove trailing slashes from pathname (except if it's just '/')
  let cleanPath = pathname;
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Since the requirement is to remove specific query parameters and preserve 
  // dynamic route params (which are part of pathname), we can just return 
  // the base URL + cleaned pathname, effectively stripping all query params 
  // from the canonical URL as per best SEO practices.
  return `${baseUrl}${cleanPath}`;
}