import { useEffect } from 'react';

export default function AdParamsCapture() {
  useEffect(() => {
    const captureParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const gclid = urlParams.get('gclid');
      const gbraid = urlParams.get('gbraid');

      const setParam = (key, value) => {
        if (value) {
          // Set Cookie (90 days)
          const expiry = new Date();
          expiry.setTime(expiry.getTime() + 90 * 24 * 60 * 60 * 1000);
          document.cookie = `${key}=${value};expires=${expiry.toUTCString()};path=/;SameSite=Lax`;
          
          // Set LocalStorage
          localStorage.setItem(key, value);
        }
      };

      setParam('gclid', gclid);
      setParam('gbraid', gbraid);

      const getStoredParam = (key) => {
        const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
        if (match) return match[2];
        return localStorage.getItem(key);
      };

      // Expose to global window object
      window._adParams = {
        gclid: getStoredParam('gclid') || null,
        gbraid: getStoredParam('gbraid') || null
      };
    };

    captureParams();
  }, []);

  return null;
}