import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, Cookie, ExternalLink } from 'lucide-react';
import { useDataLayer } from '@/contexts/DataLayerContext';

const Footer = () => {
  const { pushEvent } = useDataLayer();

  const handleSocialClick = (platform) => {
    pushEvent('social_click', {
      platform: platform,
      click_location: 'footer'
    });
  };

  const handlePhoneClick = () => {
    pushEvent('phone_click', {
      phone_number: '+33 7 68 93 64 24',
      click_location: 'footer'
    });
  };

  const handleEmailClick = () => {
    pushEvent('email_click', {
      email_address: 'contact@juh-ecomm.fr',
      click_location: 'footer'
    });
  };

  const handleCookieSettings = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-consent-manager'));
    pushEvent('menu_click', {
      menu_name: 'cookie_settings',
      link_location: 'footer'
    });
  };
  
  const handleSimulateurClick = () => {
    pushEvent('menu_click', {
      menu_name: 'simulateur',
      link_location: 'footer'
    });
  };

  const handleExternalPartnerClick = (partnerName) => {
    pushEvent('external_link_click', {
      partner_name: partnerName,
      link_location: 'footer'
    });
  };

  const serviceLinks = [
    { name: 'Audit Google Ads', path: '/audit-google-ads' },
    { name: 'Consent Mode', path: '/consent-mode' },
    { name: 'Conversions Offline', path: '/conversions-offline' },
    { name: 'GA4 Avancé', path: '/ga4-advanced' },
    { name: 'GTM Server-Side', path: '/gtm-server-side' },
    { name: 'Landing Pages', path: '/landing-pages' },
    { name: 'Shopify Tracking', path: '/shopify' },
    { name: 'Tracking Hub', path: '/tracking-hub' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://horizons-cdn.hostinger.com/a0243299-3f37-4051-bfc2-4b0057952451/8fee8d7d42c2e3c68f9f7b880a71ab17.png" 
                alt="Juh Ecomm Data Logo" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent">
                Juh Ecomm Data
              </span>
            </div>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Expert en tracking e-commerce et automatisation marketing. Optimisez vos données pour maximiser vos performances.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="https://www.linkedin.com/in/julien-germon-27630b141/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-violet-400 transition-colors"
                onClick={() => handleSocialClick('linkedin')}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services Tracking</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Automatisation & Outils</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/automatisation-hub" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                  Automatisation Hub
                </Link>
              </li>
              <li>
                <Link to="/google-my-business" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                  Google My Business
                </Link>
              </li>
              <li>
                <Link to="/reponse-leads" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                  Réponse Leads
                </Link>
              </li>
              <li>
                <Link to="/automatisation/conciergerie" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                  Service pour conciergerie
                </Link>
              </li>
              <li>
                <a 
                  href="https://simulateur.juh-ecomm.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-1.5"
                  onClick={handleSimulateurClick}
                >
                  Simulateur
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.jesuisnumerique.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1.5"
                  onClick={() => handleExternalPartnerClick('Je suis numérique')}
                >
                  https://www.jesuisnumerique.fr
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+33768936424"
                  className="flex items-center space-x-2 text-slate-400 hover:text-lime-400 transition-colors text-sm group"
                  onClick={handlePhoneClick}
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>+33 7 68 93 64 24</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@juh-ecomm.fr"
                  className="flex items-center space-x-2 text-slate-400 hover:text-lime-400 transition-colors text-sm group"
                  onClick={handleEmailClick}
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>contact@juh-ecomm.fr</span>
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-2 text-sm">Informations légales</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/mentions-legales" className="text-slate-400 hover:text-lime-400 transition-colors text-sm">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/politique-confidentialite" className="text-slate-400 hover:text-lime-400 transition-colors text-sm">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleCookieSettings}
                    className="text-slate-400 hover:text-lime-400 transition-colors text-sm flex items-center space-x-2"
                  >
                    <Cookie className="w-3 h-3" />
                    <span>Gérer mes cookies</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Juh Ecomm. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;