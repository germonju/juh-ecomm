import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const NotFoundPage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <>
      <Helmet>
        <title>Page non trouvée | Juh Ecomm Data</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Page non trouvée | Juh Ecomm Data" />
        <meta property="og:description" content="La page que vous recherchez n'existe pas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Page non trouvée | Juh Ecomm Data" />
        <meta name="twitter:description" content="La page que vous recherchez n'existe pas." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-slate-900 text-white">
        <h1 className="text-6xl md:text-9xl font-bold text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Oups ! Page introuvable</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-md">
          La page que vous recherchez semble avoir été déplacée ou supprimée.
        </p>
        <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold">
          <Link to="/">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;