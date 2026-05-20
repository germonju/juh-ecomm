import React from 'react';
import { Helmet } from 'react-helmet';
import { m } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const PolitiqueConfidentialitePage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - Juh Ecomm Data</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Politique de confidentialité de Juh Ecomm Data. Informations sur la collecte, l'utilisation et la protection de vos données personnelles." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Politique de Confidentialité - Juh Ecomm Data" />
        <meta property="og:description" content="Politique de confidentialité de Juh Ecomm Data. Informations sur la collecte, l'utilisation et la protection de vos données personnelles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Politique de Confidentialité - Juh Ecomm Data" />
        <meta name="twitter:description" content="Politique de confidentialité de Juh Ecomm Data. Informations sur la collecte, l'utilisation et la protection de vos données personnelles." />
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
              Politique de Confidentialité
            </h1>

            <div className="space-y-8 text-slate-300">
              <section>
                <p className="leading-relaxed text-lg">
                  Dernière mise à jour : 5 décembre 2025
                </p>
                <p className="mt-4 leading-relaxed">
                  Juh Ecomm Data s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Données collectées</h2>
                <p className="leading-relaxed mb-4">
                  Nous collectons les données suivantes :
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Données d'identification : nom, prénom, adresse email</li>
                  <li>Données de contact : numéro de téléphone, adresse</li>
                  <li>Données professionnelles : société, fonction, site web</li>
                  <li>Données de navigation : cookies, adresse IP, pages visitées</li>
                  <li>Données de formulaire : messages, demandes d'informations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Finalités du traitement</h2>
                <p className="leading-relaxed mb-4">
                  Vos données sont collectées pour :
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Répondre à vos demandes d'information</li>
                  <li>Établir des devis et propositions commerciales</li>
                  <li>Gérer la relation client</li>
                  <li>Améliorer nos services</li>
                  <li>Analyser le trafic du site web</li>
                  <li>Envoyer des communications marketing (avec votre consentement)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Base légale du traitement</h2>
                <p className="leading-relaxed">
                  Le traitement de vos données personnelles repose sur :
                </p>
                <ul className="mt-4 space-y-2 pl-6 list-disc">
                  <li>Votre consentement (formulaires de contact, newsletter)</li>
                  <li>L'exécution d'un contrat (services commandés)</li>
                  <li>L'intérêt légitime (amélioration de nos services)</li>
                  <li>Les obligations légales (facturation, comptabilité)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Durée de conservation</h2>
                <p className="leading-relaxed">
                  Vos données sont conservées pendant :
                </p>
                <ul className="mt-4 space-y-2 pl-6 list-disc">
                  <li>Prospects : 3 ans à compter du dernier contact</li>
                  <li>Clients : 5 ans après la fin de la relation commerciale</li>
                  <li>Documents comptables : 10 ans</li>
                  <li>Cookies : 13 mois maximum</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Destinataires des données</h2>
                <p className="leading-relaxed">
                  Vos données peuvent être transmises à :
                </p>
                <ul className="mt-4 space-y-2 pl-6 list-disc">
                  <li>Notre équipe interne</li>
                  <li>Nos prestataires techniques (hébergement, CRM, emailing)</li>
                  <li>Nos partenaires commerciaux (avec votre consentement)</li>
                  <li>Les autorités légales (sur demande judiciaire)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Vos droits</h2>
                <p className="leading-relaxed mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement ("droit à l'oubli")</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                  <li>Droit de retirer votre consentement</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Pour exercer vos droits, contactez-nous à : contact@juh-ecomm.fr
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
                <p className="leading-relaxed">
                  Nous utilisons différents types de cookies :
                </p>
                <ul className="mt-4 space-y-2 pl-6 list-disc">
                  <li>Cookies essentiels : nécessaires au fonctionnement du site</li>
                  <li>Cookies analytiques : pour analyser l'utilisation du site (Google Analytics)</li>
                  <li>Cookies marketing : pour personnaliser les publicités (avec votre consentement)</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau de consentement ou les paramètres de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Sécurité</h2>
                <p className="leading-relaxed">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération :
                </p>
                <ul className="mt-4 space-y-2 pl-6 list-disc">
                  <li>Chiffrement SSL/TLS</li>
                  <li>Accès restreint aux données</li>
                  <li>Sauvegardes régulières</li>
                  <li>Hébergement sécurisé</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Modifications</h2>
                <p className="leading-relaxed">
                  Cette politique de confidentialité peut être modifiée à tout moment. La date de dernière mise à jour est indiquée en haut de cette page. Nous vous encourageons à consulter régulièrement cette page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
                <p className="leading-relaxed">
                  Pour toute question concernant cette politique de confidentialité ou l'utilisation de vos données personnelles :
                </p>
                <ul className="mt-4 space-y-2 pl-6">
                  <li>Email : contact@juh-ecomm.fr</li>
                  <li>Téléphone : +33 7 68 93 64 24</li>
                  <li>Adresse : 96 rue Georges Lautrette, 16000 Angoulême France</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Vous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr
                </p>
              </section>
            </div>
          </m.div>
        </div>
      </div>
    </>
  );
};

export default PolitiqueConfidentialitePage;