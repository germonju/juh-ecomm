import React from 'react';
import { Helmet } from 'react-helmet';
import { m } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const MentionsLegalesPage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <>
      <Helmet>
        <title>Mentions Légales - Juh Ecomm Data</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Mentions légales du site Juh Ecomm Data. Informations sur l'éditeur, l'hébergement et les conditions d'utilisation du site." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Mentions Légales - Juh Ecomm Data" />
        <meta property="og:description" content="Mentions légales du site Juh Ecomm Data. Informations sur l'éditeur, l'hébergement et les conditions d'utilisation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Mentions Légales - Juh Ecomm Data" />
        <meta name="twitter:description" content="Mentions légales du site Juh Ecomm Data. Informations sur l'éditeur, l'hébergement et les conditions d'utilisation." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Mentions Légales
            </h1>

            <div className="space-y-8 text-slate-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Éditeur du site</h2>
                <p className="leading-relaxed">
                  Le site juh-ecomm.fr est édité par :
                </p>
                <ul className="mt-4 space-y-2 pl-6">
                  <li>Raison sociale : Juh Ecomm Data</li>
                  <li>Forme juridique : Auto Entreprise</li>
                  <li>SIRET : 752 258 285 00028</li>
                  <li>Siège social : 96, rue Georges Lautrette, 16000 Angoulême, France</li>
                  <li>Email : contact@juh-ecomm.fr</li>
                  <li>Téléphone : +33 7 68 93 64 24</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Directeur de publication</h2>
                <p className="leading-relaxed">
                  Le directeur de la publication du site est : Julien Germon
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Hébergement</h2>
                <p className="leading-relaxed">
                  Le site est hébergé par :
                </p>
                <ul className="mt-4 space-y-2 pl-6">
                  <li>Hostinger International Ltd.</li>
                  <li>61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
                  <li>Site web : www.hostinger.fr</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Propriété intellectuelle</h2>
                <p className="leading-relaxed">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="mt-4 leading-relaxed">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
                <p className="leading-relaxed">
                  Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. Pour plus d'informations, consultez notre{' '}
                  <a href="/politique-confidentialite" className="text-cyan-400 hover:text-cyan-300 underline">
                    politique de confidentialité
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Données personnelles</h2>
                <p className="leading-relaxed">
                  Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p className="mt-4 leading-relaxed">
                  Pour exercer ces droits, contactez-nous à : contact@juhecommdata.fr
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation de responsabilité</h2>
                <p className="leading-relaxed">
                  Juh Ecomm Data ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Droit applicable</h2>
                <p className="leading-relaxed">
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </section>
            </div>
          </m.div>
        </div>
      </div>
    </>
  );
};

export default MentionsLegalesPage;