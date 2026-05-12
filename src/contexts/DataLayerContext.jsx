import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const DataLayerContext = createContext();

export const useDataLayer = () => {
  const context = useContext(DataLayerContext);
  if (!context) {
    throw new Error('useDataLayer must be used within DataLayerProvider');
  }
  return context;
};

export const DataLayerProvider = ({ children }) => {
  const location = useLocation();
  const pageLoadTime = useRef(Date.now());
  const scrollDepthTracked = useRef(new Set());
  const userCountryRef = useRef('FR'); // Default to FR as requested

  useEffect(() => {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Fetch user country from API
    const fetchUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          if (data.country_code) {
            userCountryRef.current = data.country_code;
            window.userCountry = data.country_code; // Set global window variable
          }
        }
      } catch (error) {
        // Fail silently and keep default 'FR'
        console.warn('Unable to fetch user country, defaulting to FR');
        userCountryRef.current = 'FR';
        window.userCountry = 'FR';
      }
    };

    // Call the fetch function - non-blocking
    fetchUserCountry();
  }, []);

  useEffect(() => {
    pushEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href
    });

    pageLoadTime.current = Date.now();
    scrollDepthTracked.current.clear();

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      const thresholds = [25, 50, 75, 90];
      thresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !scrollDepthTracked.current.has(threshold)) {
          scrollDepthTracked.current.add(threshold);
          pushEvent('scroll_depth', {
            scroll_percentage: threshold,
            page_path: location.pathname
          });
        }
      });
    };

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - pageLoadTime.current) / 1000);
      pushEvent('time_on_page', {
        time_seconds: timeOnPage,
        page_path: location.pathname
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  const pushEvent = (eventName, eventData = {}) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        timestamp: new Date().toISOString(),
        user_country: userCountryRef.current, // Add user_country to ALL events
        ...eventData
      });
      console.log('DataLayer Event:', eventName, { ...eventData, user_country: userCountryRef.current });
    }
  };

  return (
    <DataLayerContext.Provider value={{ pushEvent }}>
      {children}
    </DataLayerContext.Provider>
  );
};