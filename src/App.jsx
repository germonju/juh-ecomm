
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { DataLayerProvider } from '@/contexts/DataLayerContext';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ConsentManager from '@/components/ConsentManager';
import AdParamsCapture from '@/components/AdParamsCapture';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ContactPage from '@/pages/ContactPage';
import AuditGoogleAdsPage from '@/pages/AuditGoogleAdsPage';
import GtmServerSidePage from '@/pages/GtmServerSidePage';
import Ga4AdvancedPage from '@/pages/Ga4AdvancedPage';
import ShopifyPage from '@/pages/ShopifyPage';
import GoogleMyBusinessPage from '@/pages/GoogleMyBusinessPage';
import ConversionsOfflinePage from '@/pages/ConversionsOfflinePage';
import ConciergeriePage from '@/pages/ConciergeriePage';
import ReponseLeadsPage from '@/pages/ReponseLeadsPage';
import AutomatisationHubPage from '@/pages/AutomatisationHubPage';
import TrackingHubPage from '@/pages/TrackingHubPage';
import ConsentModePage from '@/pages/ConsentModePage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ApiDocsPage from '@/pages/ApiDocsPage';
import MentionsLegalesPage from '@/pages/MentionsLegalesPage';
import PolitiqueConfidentialitePage from '@/pages/PolitiqueConfidentialitePage';
import SeoAuditPage from '@/pages/SeoAuditPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LandingPagesPage from '@/pages/LandingPagesPage';

function App() {
  // Domain redirect logic: automatically redirect non-www "juh-ecomm.fr" to "www.juh-ecomm.fr"
  // This performs a client-side 301-style redirect to ensure consistent URL structure
  // and avoid duplicate content issues for SEO.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'juh-ecomm.fr') {
        const newUrl = window.location.protocol + '//www.' + hostname + window.location.pathname + window.location.search;
        window.location.replace(newUrl);
      }
    }
  }, []);

  // Set document language to French on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'fr';
    }
  }, []);

  return (
    <Router>
      <AdParamsCapture />
      <SupabaseAuthProvider>
        <DataLayerProvider>
          <ScrollToTop />
          <ConsentManager />
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/audit-google-ads" element={<AuditGoogleAdsPage />} />
                <Route path="/gtm-server-side" element={<GtmServerSidePage />} />
                <Route path="/ga4-advanced" element={<Ga4AdvancedPage />} />
                <Route path="/shopify" element={<ShopifyPage />} />
                <Route path="/google-my-business" element={<GoogleMyBusinessPage />} />
                <Route path="/conversions-offline" element={<ConversionsOfflinePage />} />
                <Route path="/conciergerie" element={<ConciergeriePage />} />
                <Route path="/reponse-leads" element={<ReponseLeadsPage />} />
                <Route path="/automatisation-hub" element={<AutomatisationHubPage />} />
                <Route path="/tracking-hub" element={<TrackingHubPage />} />
                <Route path="/consent-mode" element={<ConsentModePage />} />
                <Route path="/landing-pages" element={<LandingPagesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/api-docs" element={<ApiDocsPage />} />
                <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
                <Route path="/seo-audit" element={<SeoAuditPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </DataLayerProvider>
      </SupabaseAuthProvider>
    </Router>
  );
}

export default App;
