import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';
import { getMeta, SITE_NAME, OG_IMAGE, TWITTER_SITE } from '@/seo/meta.config';

/**
 * Balises SEO d'une route, lues depuis la SOURCE UNIQUE src/seo/meta.config.js.
 * Rend EXACTEMENT le même title/description/canonical/OG/Twitter que le HTML
 * pré-rendu par scripts/inject-social-meta.js → aucun flip entre les deux
 * vagues d'indexation (crawl statique puis rendu JS).
 *
 * Usage : <SeoHead route="/gtm-server-side" />
 * Sans prop `route`, la route courante (useLocation) est utilisée.
 * Le JSON-LD propre à une page reste géré par la page elle-même (Helmet séparé).
 */
const SeoHead = ({ route }) => {
  const location = useLocation();
  const path = route || location.pathname;
  const meta = getMeta(path);
  if (!meta) return null;

  const canonical = getCanonicalUrl(path);
  const { title, description, ogImage, ogType = 'website', noindex } = meta;
  const image = ogImage || OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {image === OG_IMAGE && <meta property="og:image:width" content="1200" />}
      {image === OG_IMAGE && <meta property="og:image:height" content="630" />}
      {image === OG_IMAGE && <meta property="og:image:type" content="image/jpeg" />}
      <meta property="og:locale" content="fr_FR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_SITE} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SeoHead;
