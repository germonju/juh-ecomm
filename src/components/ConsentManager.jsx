import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ConsentManager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consentState, setConsentState] = useState({
    functional: true,
    analytics: false,
    advertising: false
  });

  // Helper to set cookie
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  // Helper to get cookie
  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // Generate UUID v4
  const generateUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Log Consent to Webhook
  const logConsent = (action, analytics, advertising, isUpdate) => {
    // Get or create cmp_uid
    let uid = getCookie('cmp_uid');
    if (!uid) {
      uid = generateUUID();
      setCookie('cmp_uid', uid, 395);
    }

    const payload = {
      timestamp: new Date().toISOString(),
      consent_id: uid,
      action: action,
      functional: true,
      analytics: analytics,
      advertising: advertising,
      cmp_version: "1.0",
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      is_update: isUpdate
    };

		fetch('https://n8n.srv954228.hstgr.cloud/webhook/cdcf07ba-7440-4c88-949b-0f74786cc9f0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => {
      // Silent error handling for non-blocking experience
      console.warn('CMP Logging failed', err);
    });
  };

  // Parse cookie string to object
  const parseConsentCookie = (cookieStr) => {
    if (!cookieStr) return null;
    const pairs = cookieStr.split(',');
    const result = {};
    pairs.forEach(pair => {
      const [key, value] = pair.split(':');
      result[key] = value === 'true';
    });
    return result;
  };

  // Push consent update to dataLayer
  const updateGtmConsent = (consents) => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    
    const consentMode = {
      'functionality_storage': 'granted',
      'security_storage': 'granted',
      'personalization_storage': 'granted', // Mapping personalization to functional/default for this 3-toggle setup
      'analytics_storage': consents.analytics ? 'granted' : 'denied',
      'ad_storage': consents.advertising ? 'granted' : 'denied',
      'ad_user_data': consents.advertising ? 'granted' : 'denied',
      'ad_personalization': consents.advertising ? 'granted' : 'denied',
    };
    
    gtag('consent', 'update', consentMode);
    
    // Also push a custom event for easy triggering in GTM
    window.dataLayer.push({
      event: 'consent_update',
      ...consentMode
    });
  };

  useEffect(() => {
    // Initialize Default Consent
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    
    // Initialize default consent (denied by default except functional)
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted',
      'personalization_storage': 'granted',
      'wait_for_update': 500
    });

    // Check for existing cookie
    const existingCookie = getCookie('cookie-consent-status');
    
    if (existingCookie) {
      const savedConsents = parseConsentCookie(existingCookie);
      if (savedConsents) {
        setConsentState(savedConsents);
        updateGtmConsent(savedConsents);
      }
    } else {
      // No cookie, show popup
      // Small delay for animation
      setTimeout(() => setIsVisible(true), 500);
    }

    // Event listener for footer link
    const handleOpen = () => {
      setIsVisible(true);
      const existing = getCookie('cookie-consent-status');
      if (existing) {
        setConsentState(parseConsentCookie(existing));
      }
      setShowDetails(true); // When reopening, showing details is often helpful
    };

    window.addEventListener('open-consent-manager', handleOpen);
    return () => window.removeEventListener('open-consent-manager', handleOpen);
  }, []);

  const handleAcceptAll = () => {
    const isUpdate = !!getCookie('cookie-consent-status');
    const newConsents = { functional: true, analytics: true, advertising: true };
    setConsentState(newConsents);
    
    const cookieValue = `functional:true,analytics:true,advertising:true`;
    setCookie('cookie-consent-status', cookieValue, 182);
    updateGtmConsent(newConsents);
    
    logConsent('accept_all', true, true, isUpdate);
    
    setIsVisible(false);
  };

  const handleRefuseAll = () => {
    const isUpdate = !!getCookie('cookie-consent-status');
    const newConsents = { functional: true, analytics: false, advertising: false };
    setConsentState(newConsents);
    
    const cookieValue = `functional:true,analytics:false,advertising:false`;
    setCookie('cookie-consent-status', cookieValue, 182);
    updateGtmConsent(newConsents);
    
    logConsent('reject_all', false, false, isUpdate);
    
    setIsVisible(false);
  };

  const handleSaveChoices = () => {
    const isUpdate = !!getCookie('cookie-consent-status');
    
    const cookieValue = `functional:${consentState.functional},analytics:${consentState.analytics},advertising:${consentState.advertising}`;
    setCookie('cookie-consent-status', cookieValue, 182);
    updateGtmConsent(consentState);
    
    logConsent('custom', consentState.analytics, consentState.advertising, isUpdate);
    
    setIsVisible(false);
  };

  const toggleConsent = (key) => {
    if (key === 'functional') return; // Always true
    setConsentState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] flex items-center justify-center"
            onClick={() => !getCookie('cookie-consent-status') ? null : setIsVisible(false)} // Only clickable if consent already exists
          >

            {/* Popup */}
            <m.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#1a1a2e] text-white p-6 rounded-[12px] shadow-2xl border border-slate-700 w-[90%] md:w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                  <img 
                    src="https://horizons-cdn.hostinger.com/a0243299-3f37-4051-bfc2-4b0057952451/8fee8d7d42c2e3c68f9f7b880a71ab17.png" 
                    alt="Juh Ecomm Data Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent">
                      Juh Ecomm Data
                    </span>
                    <h2 className="text-md sm:text-xl font-bold text-white">Paramètres de confidentialité</h2>
                  </div>
                </div>
                {getCookie('cookie-consent-status') && (
                  <button onClick={() => setIsVisible(false)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Nous utilisons des cookies pour optimiser votre expérience, analyser notre trafic et personnaliser nos publicités. 
                Certains cookies sont essentiels au fonctionnement du site, tandis que d'autres nous aident à nous améliorer. 
                Vous pouvez modifier vos choix à tout moment.
              </p>

              {!showDetails ? (
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <button
                    onClick={handleRefuseAll}
                    className="px-6 py-3 rounded-[8px] border border-slate-600 hover:border-slate-500 hover:bg-slate-800 text-slate-300 transition-all font-medium text-sm"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-6 py-3 rounded-[8px] border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:bg-cyan-950/30 transition-all font-medium text-sm"
                  >
                    Choisir
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 rounded-[8px] bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white shadow-lg shadow-cyan-900/20 transition-all font-bold text-sm flex-1"
                  >
                    Tout Accepter
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Toggles */}
                  <div className="space-y-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    
                    {/* Functional */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-white block">Cookies Fonctionnels</span>
                        <span className="text-xs text-slate-400">Nécessaires au fonctionnement du site</span>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-600/50 cursor-not-allowed">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition shadow" />
                      </div>
                    </div>

                    <div className="h-px bg-slate-800" />

                    {/* Analytics */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-white block">Cookies Analytiques</span>
                        <span className="text-xs text-slate-400">Pour comprendre comment vous utilisez le site</span>
                      </div>
                      <button
                        onClick={() => toggleConsent('analytics')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${consentState.analytics ? 'bg-cyan-600' : 'bg-slate-700'}`}
                      >
                        <span className={`${consentState.analytics ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition shadow`} />
                      </button>
                    </div>

                    <div className="h-px bg-slate-800" />

                    {/* Advertising */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-white block">Cookies Publicitaires</span>
                        <span className="text-xs text-slate-400">Pour des publicités personnalisées</span>
                      </div>
                      <button
                        onClick={() => toggleConsent('advertising')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${consentState.advertising ? 'bg-violet-600' : 'bg-slate-700'}`}
                      >
                        <span className={`${consentState.advertising ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition shadow`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setShowDetails(false)}
                      className="px-6 py-3 rounded-[8px] border border-slate-600 hover:bg-slate-800 text-slate-300 transition-all font-medium text-sm"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSaveChoices}
                      className="flex-1 px-6 py-3 rounded-[8px] bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white shadow-lg transition-all font-bold text-sm"
                    >
                      Confirmer mes choix
                    </button>
                  </div>
                </div>
              )}
            </m.div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsentManager;