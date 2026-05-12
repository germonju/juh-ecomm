import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDataLayer } from '@/contexts/DataLayerContext';

export const useScrollTracking = () => {
  const { pushEvent } = useDataLayer();
  const location = useLocation();
  const trackedDepths = useRef(new Set());
  const timeIntervals = useRef(new Set());
  const maxScrollDepth = useRef(0);
  const startTime = useRef(Date.now());

  // Track CTA Clicks
  const trackCtaClick = (ctaPosition, ctaText) => {
    pushEvent('cta_click', {
      cta_position: ctaPosition,
      cta_text: ctaText,
      page_path: location.pathname
    });
  };

  // Track FAQ Interactions
  const trackFaqToggle = (questionTitle, isOpen) => {
    if (isOpen) {
      pushEvent('faq_open', {
        question_title: questionTitle,
        page_path: location.pathname
      });
    }
  };

  // Track Specific Section Views (using Intersection Observer in the component is better usually, 
  // but here we can expose a helper to be called onInView)
  const trackSectionView = (sectionName) => {
    pushEvent('section_view', {
      section_name: sectionName,
      page_path: location.pathname
    });
  };

  useEffect(() => {
    // Reset refs on route change
    trackedDepths.current = new Set();
    timeIntervals.current = new Set();
    maxScrollDepth.current = 0;
    startTime.current = Date.now();

    // Scroll Depth Tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
      
      // Update max depth
      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent;
      }

      // Check milestones
      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          pushEvent('scroll_milestone', {
            depth_percentage: milestone,
            page_path: location.pathname
          });
        }
      });
    };

    // Time on Page Tracking
    const timeInterval = setInterval(() => {
      const timeElapsed = Math.floor((Date.now() - startTime.current) / 1000);
      
      [30, 60, 120].forEach(milestone => {
        if (timeElapsed >= milestone && !timeIntervals.current.has(milestone)) {
          timeIntervals.current.add(milestone);
          pushEvent('time_on_page_milestone', {
            seconds: milestone,
            page_path: location.pathname
          });
        }
      });
    }, 5000); // Check every 5 seconds

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, [location.pathname, pushEvent]);

  return {
    trackCtaClick,
    trackFaqToggle,
    trackSectionView
  };
};

export default useScrollTracking;